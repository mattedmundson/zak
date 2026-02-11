import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Minimum time (in ms) a human would need to fill out the form
const MIN_SUBMISSION_TIME_MS = 2000

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'website', signupPage, _honeypot, _formLoadTime } = await request.json()

    // Spam protection: honeypot field (should be empty)
    if (_honeypot) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed to newsletter!' })
    }

    // Spam protection: reject if submitted too fast
    if (_formLoadTime && Date.now() - _formLoadTime < MIN_SUBMISSION_TIME_MS) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed to newsletter!' })
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    const beehiivToken = process.env.BEEHIIV_API_TOKEN
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID

    if (!beehiivToken || !publicationId) {
      console.error('Missing Beehiiv configuration')
      return NextResponse.json(
        { error: 'Newsletter service configuration error' },
        { status: 500 }
      )
    }

    const subscriptionData = {
      email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: source,
      utm_medium: 'website',
      utm_campaign: 'newsletter_signup',
      referring_site: signupPage || request.headers.get('referer') || undefined,
    }

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${beehiivToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Beehiiv API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Save to zaks_leads for tracked form sources
    if (source === 'recipe_book_launch' || source === 'newsletter_form') {
      try {
        const supabase = createAdminClient()
        await supabase.from('zaks_leads').insert({
          email,
          form_source: source,
        })
      } catch (dbError) {
        console.error('Failed to save to zaks_leads:', dbError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        id: data.data?.id,
        status: data.data?.status,
      },
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
