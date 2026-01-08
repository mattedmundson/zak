import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

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

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${beehiivToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Beehiiv API error:', errorData)
      return NextResponse.json({
        subscribed: false,
        error: 'Could not verify subscription status',
      })
    }

    const data = await response.json()
    const subscriptions = data.data || []
    const isSubscribed = subscriptions.some(
      (sub: { status: string }) =>
        sub.status === 'active' || sub.status === 'validating'
    )

    return NextResponse.json({ subscribed: isSubscribed })
  } catch (error) {
    console.error('Newsletter check error:', error)
    return NextResponse.json({
      subscribed: false,
      error: 'Could not verify subscription status',
    })
  }
}
