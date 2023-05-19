import { User } from 'lucide-react' // phosphor is not updated with
import nlwLogo from '../assets/nlw-logo.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* LEFT */}
      <div className="by-16 relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        {/* BLUR top 1/2 pushed down 50%, and translate-y-1/2 pushed it up 50% relative to the element size */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
        {/* STRIPES */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes " />
        {/* PROFILE (small) */}
        <a href="#" className="flex items-center gap-3 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline transition-colors hover:text-gray-50">
              Create an account
            </span>{' '}
            and save your memories!
          </p>
        </a>

        {/* HERO */}
        <div className="space-y-5">
          <Image src={nlwLogo} alt="NLW Spacetime" />
          <div className="max-w-[420px] space-y-1">
            <h1 className="text-5xl font-bold leading-tight text-gray-50">
              Your time capsule{' '}
            </h1>
            <p className="text-lg leading-relaxed">
              Collect remarkable memories in your journey and share them (if you
              want) with the world!
            </p>
          </div>
          <a
            className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:animate-ping-slow hover:bg-green-600"
            href="#"
          >
            Register a memory{' '}
          </a>
        </div>

        {/* COPYRIGHT */}
        <div className="text-sm leading-relaxed text-gray-200">
          Made with 💜 during NLW from{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-gray-100"
            href="https://rocketseat.com.br"
          >
            Rocketseat
          </a>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            You haven&apos;t created any memory yet.
            <a
              href="#"
              className="block underline transition-colors hover:cursor-pointer hover:text-gray-50"
            >
              Start here!
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
