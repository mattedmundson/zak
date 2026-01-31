import { NextRequest, NextResponse } from 'next/server'
import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { createAdminClient } from '@/lib/supabase/admin'
import { getContactConfirmationEmail } from '@/lib/email-templates/contact-confirmation'
import { getContactNotificationEmail } from '@/lib/email-templates/contact-notification'

// Minimum time (in ms) a human would need to fill out the form
const MIN_SUBMISSION_TIME_MS = 3000

// Lazy initialization of Mailgun client to avoid build-time errors
function getMailgunClient() {
  const mailgun = new Mailgun(formData)
  return mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
  })
}

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone?: string
  message: string
  subscribedToNewsletter?: boolean
  _honeypot?: string
  _formLoadTime?: number
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()
    const { firstName, lastName, email, company, phone, message, subscribedToNewsletter } = data

    // Spam protection: Check honeypot field (should be empty)
    if (data._honeypot) {
      // Return fake success to not inform bots
      return NextResponse.json({
        success: true,
        message: "Your message has been sent. We'll be in touch soon!",
      })
    }

    // Spam protection: Check submission time (reject if too fast)
    if (data._formLoadTime) {
      const submissionTime = Date.now() - data._formLoadTime
      if (submissionTime < MIN_SUBMISSION_TIME_MS) {
        // Return fake success to not inform bots
        return NextResponse.json({
          success: true,
          message: "Your message has been sent. We'll be in touch soon!",
        })
      }
    }

    // Validate required fields
    if (!firstName?.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    }
    if (!lastName?.trim()) {
      return NextResponse.json({ error: 'Last name is required' }, { status: 400 })
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    if (!company?.trim()) {
      return NextResponse.json({ error: 'Company is required' }, { status: 400 })
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const normalizedEmail = email.toLowerCase().trim()
    const fullName = `${firstName} ${lastName}`

    // Check if contact already exists
    const { data: existingContact } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (existingContact) {
      // Create activity with the form message for existing contact
      await supabase.from('activities').insert({
        contact_id: existingContact.id,
        activity_type: 'form_submission',
        content: message.trim(),
        source: 'contact_form',
        metadata: {
          company: company.trim(),
          has_phone: !!phone,
          is_repeat: true,
          site: 'mattedmundson.com',
        },
      })

      // Check if contact has a company linked - if not, create one
      const { data: existingCompanyLink } = await supabase
        .from('contact_companies')
        .select('id')
        .eq('contact_id', existingContact.id)
        .maybeSingle()

      if (!existingCompanyLink && company) {
        const companyName = company.trim()

        // Check if company exists
        const { data: existingCompanyRecord } = await supabase
          .from('companies')
          .select('id')
          .ilike('name', companyName)
          .maybeSingle()

        let companyId: string | undefined

        if (existingCompanyRecord) {
          companyId = existingCompanyRecord.id
        } else {
          // Create new company
          const { data: newCompany } = await supabase
            .from('companies')
            .insert({
              name: companyName,
              company_type: 'brand',
              created_at: new Date().toISOString(),
            })
            .select('id')
            .single()

          if (newCompany) {
            companyId = newCompany.id
          }
        }

        // Link contact to company
        if (companyId) {
          await supabase.from('contact_companies').insert({
            contact_id: existingContact.id,
            company_id: companyId,
            relationship_type: 'employee',
            is_primary: true,
          })
        }
      }

      // Update follow_up flag to ensure they get attention
      await supabase
        .from('contacts')
        .update({
          follow_up: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingContact.id)
    } else {
      // Create new contact
      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .insert({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: normalizedEmail,
          phone: phone?.trim() || null,
          contact_type: 'lead',
          lead_source: 'contact_form',
          follow_up: true,
          archived: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select('id')
        .single()

      if (contactError) {
        console.error('Failed to create contact:', contactError)
        return NextResponse.json(
          { error: 'Failed to submit form. Please try again.' },
          { status: 500 }
        )
      }

      // Create or find company and link to contact
      const companyName = company.trim()

      // Check if company exists (case-insensitive)
      const { data: existingCompanyRecord } = await supabase
        .from('companies')
        .select('id')
        .ilike('name', companyName)
        .maybeSingle()

      let companyId: string | undefined

      if (existingCompanyRecord) {
        companyId = existingCompanyRecord.id
      } else {
        // Create new company
        const { data: newCompany, error: companyError } = await supabase
          .from('companies')
          .insert({
            name: companyName,
            company_type: 'brand',
            created_at: new Date().toISOString(),
          })
          .select('id')
          .single()

        if (companyError) {
          console.error('Failed to create company:', companyError)
        } else {
          companyId = newCompany.id
        }
      }

      // Link contact to company
      if (companyId) {
        await supabase.from('contact_companies').insert({
          contact_id: contact.id,
          company_id: companyId,
          relationship_type: 'employee',
          is_primary: true,
        })
      }

      // Create contact email record
      await supabase.from('contact_emails').insert({
        contact_id: contact.id,
        email: normalizedEmail,
        email_type: 'work',
        is_primary: true,
      })

      // Create activity with the form message
      await supabase.from('activities').insert({
        contact_id: contact.id,
        activity_type: 'form_submission',
        content: message.trim(),
        source: 'contact_form',
        metadata: {
          company: companyName,
          has_phone: !!phone,
          site: 'mattedmundson.com',
        },
      })
    }

    // Send emails (keeping existing Mailgun functionality)
    const mg = getMailgunClient()
    const DOMAIN = process.env.MAILGUN_DOMAIN || ''
    const FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL || ''
    const RECIPIENT_EMAIL = process.env.CONTACT_FORM_RECIPIENT || ''

    // Email to site owner
    const ownerEmailPromise = mg.messages.create(DOMAIN, {
      from: `${fullName} <${FROM_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      'h:Reply-To': email,
      subject: `New contact form submission from ${fullName}`,
      html: getContactNotificationEmail({
        firstName,
        lastName,
        email,
        company,
        phone,
        message,
        subscribedToNewsletter: subscribedToNewsletter || false,
      }),
      text: `New Contact Form Submission\n\nFrom: ${fullName}\nEmail: ${email}\nCompany: ${company}${phone ? `\nPhone: ${phone}` : ''}\n\nMessage:\n${message}\n\nNewsletter: ${subscribedToNewsletter ? 'Yes, subscribed' : 'No'}`,
    })

    // Confirmation email to the person who submitted the form
    const confirmationEmailPromise = mg.messages.create(DOMAIN, {
      from: `Matt Edmundson <${FROM_EMAIL}>`,
      to: email,
      subject: 'Thanks for getting in touch!',
      html: getContactConfirmationEmail({
        firstName,
        message,
      }),
      text: `Thanks for reaching out, ${firstName}!\n\nI've received your message and will get back to you as soon as possible.\n\nHere's a copy of your message:\n\n${message}\n\nBest regards,\nMatt Edmundson`,
    })

    await Promise.all([ownerEmailPromise, confirmationEmailPromise])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to send message: ${errorMessage}` },
      { status: 500 }
    )
  }
}
