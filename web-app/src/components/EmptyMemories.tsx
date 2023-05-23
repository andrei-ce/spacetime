import Link from "next/link";

export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        You haven&apos;t created any memory yet.
        <Link
          href="memories/new"
          className="block underline transition-colors hover:cursor-pointer hover:text-gray-50"
        >
          Start here!
        </Link>
      </p>
    </div>
  )
}
