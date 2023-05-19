export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* LEFT */}
      <div className="by-16 relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28">
        {/* BLUR top 1/2 pushed down 50%, and translate-y-1/2 pushed it up 50% relative to the element size */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
        {/* STRIPES */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes " />
      </div>
      {/* RIGHT */}
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            You haven&apos;t created any memory yet.
            <a
              href="#"
              className="block underline hover:cursor-pointer hover:text-gray-50"
            >
              Start here!
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
