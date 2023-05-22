import getUser from '@/lib/auth'
import { LogOut } from 'lucide-react'
import Image from 'next/image'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      {/* because this image is not stored in our app, next asks for a w and h to be loaded (not shown!) */}
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />
      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a href="#" className="block text-red-400 hover:text-red-300">
          Logout <LogOut className="inline" size={14} />
        </a>
      </p>
    </div>
  )
}
