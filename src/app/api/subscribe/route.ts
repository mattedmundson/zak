import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'website', signupPage } = await request.json()

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
