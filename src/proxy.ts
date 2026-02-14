import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // If user already has a currency preference, don't override it
  if (request.cookies.get('currency')) {
    return NextResponse.next()
  }

  const country = request.headers.get('x-vercel-ip-country') ?? ''
  const currency = country === 'GB' ? 'gbp' : 'usd'

  const response = NextResponse.next()
  response.cookies.set('currency', currency, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  return response
}
