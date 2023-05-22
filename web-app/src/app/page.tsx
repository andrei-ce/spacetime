import { cookies } from 'next/headers'
import { Copyright } from '@/components/Copyright'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { Profile } from '@/components/Profile'

export default function Home() {
  const isAuth = cookies().has('NWLtoken')

  return (
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
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
