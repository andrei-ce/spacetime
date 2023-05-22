import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/api'

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  const registerResponse = await api.post('/register', { code })

  const { token } = registerResponse.data

  const redirectURL = new URL('/', req.url)

  const cookieExpirationSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    // Path=/ means that all routes begining in / can access this cookie (i.e. all routes can access this cookie)
    // max-age=2592000 to expire in 1 month, in seconds
    headers: {
      'Set-Cookie': `NWLtoken=${token}; Path=/; max-age=${cookieExpirationSeconds.toString()};`,
    },
    // on production we should add the Secure=true, for secure https cookies
  })
}
