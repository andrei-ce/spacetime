import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamJuree,
} from 'next/font/google'

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
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baijam.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
