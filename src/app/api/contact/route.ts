import { NextRequest, NextResponse } from 'next/server'
import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { createAdminClient } from '@/lib/supabase/admin'

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
        // Don't block the submission if database insert fails
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Don't block the submission if database fails
    }

    // Email to you (site owner)
    const ownerEmailPromise = mg.messages.create(DOMAIN, {
      from: `${fullName} <${FROM_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      'h:Reply-To': email,
      subject: `New contact form submission from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><strong>Newsletter:</strong> ${subscribedToNewsletter ? 'Yes, subscribed' : 'No'}</p>
      `,
      text: `New Contact Form Submission\n\nFrom: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}\n\nNewsletter: ${subscribedToNewsletter ? 'Yes, subscribed' : 'No'}`,
    })

    // Confirmation email to the person who submitted the form
    const confirmationEmailPromise = mg.messages.create(DOMAIN, {
      from: `Matt Edmundson <${FROM_EMAIL}>`,
      to: email,
      subject: 'Thanks for getting in touch!',
      html: `
        <h2>Thanks for reaching out, ${firstName}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Here's a copy of your message:</strong></p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 15px; margin-left: 0; color: #555;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>Matt Edmundson</p>
      `,
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
