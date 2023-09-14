import Link from 'next/link'
import nlwLogo from '../assets/nlw-logo.svg'
import Image from 'next/image'

interface HeroProps {
  isAuth: boolean
}

export function Hero({ isAuth }: HeroProps) {
  return (
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
      {isAuth ? (
        <Link
          className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:animate-ping-slow hover:bg-green-600"
          href="/memories/new"
        >
          Register a memory{' '}
        </Link>
      ) : (
        <Link
          className="inline-block rounded-full bg-blue-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black  hover:bg-blue-600"
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
        >
          Create an account
        </Link>
      )}
    </div>
  )
}
