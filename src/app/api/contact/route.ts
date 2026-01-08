import { NextRequest, NextResponse } from 'next/server'
import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { createAdminClient } from '@/lib/supabase/admin'
import { getContactConfirmationEmail } from '@/lib/email-templates/contact-confirmation'
import { getContactNotificationEmail } from '@/lib/email-templates/contact-notification'

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
})

const DOMAIN = process.env.MAILGUN_DOMAIN || ''
const FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL || ''
const RECIPIENT_EMAIL = process.env.CONTACT_FORM_RECIPIENT || ''

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  message: string
  subscribedToNewsletter?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()
    const { firstName, lastName, email, message, subscribedToNewsletter } = data

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const fullName = `${firstName} ${lastName}`

    // Save to Supabase database
    try {
      const supabase = createAdminClient()
      const { error: dbError } = await supabase.from('aurion_contact').insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        company: null,
        phone: null,
        message: message,
        subscribed_to_newsletter: subscribedToNewsletter || false,
      })

      if (dbError) {
        console.error('Failed to save contact to database:', dbError)
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
    }

    // Email to you (site owner)
    const ownerEmailPromise = mg.messages.create(DOMAIN, {
      from: `${fullName} <${FROM_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      'h:Reply-To': email,
      subject: `New contact form submission from ${fullName}`,
      html: getContactNotificationEmail({
        firstName,
        lastName,
        email,
        message,
        subscribedToNewsletter: subscribedToNewsletter || false,
      }),
      text: `New Contact Form Submission\n\nFrom: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}\n\nNewsletter: ${subscribedToNewsletter ? 'Yes, subscribed' : 'No'}`,
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
    console.error('Error sending email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to send message: ${errorMessage}` },
      { status: 500 }
    )
  }
}
