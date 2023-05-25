'use client'

import { Camera } from 'lucide-react'
import { FilePicker } from './FilePicker'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateNewMemory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // 1. get all values
    const formData = new FormData(e.currentTarget) // e.target gets the element that triggered the event. e.currentTarget gets the value of the element that we attached the listener to. In this case the value of the whole form (all values)

    // console.log(Array.from(formData.entries()))

    // 2. hasMedia ? save url
    const fileToUpload = formData.get('coverURL')
    let coverUrl = ''
    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)
      console.log(uploadResponse.data)
      coverUrl = uploadResponse.data.fileUrl
    }

    // 3. get token from cookies to link memory to user
    const token = Cookie.get('NLWtoken')
    // const token = cookies().get('NLWtoken') --> the next/headers.cookies() can't be accessed with 'use strict'

    // 4. save memory on BE (if !hasMedia save empry string)
    const postMemoryResponse = await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    router.push('/')
    return postMemoryResponse
  }

  return (
    <form
      onSubmit={handleCreateNewMemory}
      className="flex flex-1 flex-col gap-2"
    >
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
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Make memory public
        </label>
      </div>

      {/* separeted from label so it doesn't break design */}
      <FilePicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Add pictures, videos or write a few words about this memory you would like to remember..."
      />
      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Save
      </button>
    </form>
  )
}
