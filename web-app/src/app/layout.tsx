import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamJuree,
} from 'next/font/google'

import './globals.css'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Copyright } from '@/components/Copyright'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' }) // flex means it adapts to font weight
const baijam = BaiJamJuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-baijam',
})

export const metadata = {
  title: 'Timecapsule',
  description: 'Your timecapsule into the most remarkable moments',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuth = cookies().has('NLWtoken')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baijam.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* LEFT */}
          <div className="by-16 relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* BLUR top 1/2 pushed down 50%, and translate-y-1/2 pushed it up 50% relative to the element size */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            {/* STRIPES ELEMENT */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes " />
            {isAuth ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>
          {/* RIGHT */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {/*  this is the content of the page, which is always on the RHS and is not part of the layout */}
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
