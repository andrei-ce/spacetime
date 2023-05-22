import nlwLogo from '../assets/nlw-logo.svg'
import Image from 'next/image'

export function Hero() {
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
      <a
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:animate-ping-slow hover:bg-green-600"
        href="#"
      >
        Register a memory{' '}
      </a>
    </div>
  )
}
