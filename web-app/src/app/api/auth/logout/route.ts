import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  const redirectURL = new URL('/', req.url)

  return NextResponse.redirect(redirectURL, {
    // there is no Delete-Cookie header, so we set the cookie to anything and max-age to 0
    headers: {
      'Set-Cookie': `NLWtoken=; Path=/; max-age=0;`,
    },
    // on production we should add the Secure=true, for secure https cookies
  })
}
