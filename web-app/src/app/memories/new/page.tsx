import { Camera, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        back to timeline
      </Link>

      <form action="" className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          {/* small hack so we don~t use an ugly file picker */}
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <Camera className="h-4 w-4" />
            Add media
          </label>
          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input type="checkbox" name="isPublic" id="isPublic" value="true"               className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            />
            Make memory public
          </label>
        </div>
        {/* separeted from label so it doesn't break design */}
        <input type="file" name="" id="media" className="invisible h-0 w-0" />

        <textarea
          name="content"
          spellCheck={false}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Add pictures, videos or write a few words about this memory you would like to remember..."
        />
      </form>
    </div>
  )
}
