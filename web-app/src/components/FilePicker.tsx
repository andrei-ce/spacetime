'use client'

import { ChangeEvent, useState } from 'react'

// as explained in memories/new/page.tsx, we want to encapsulate components that need interactivity. In this case the onChange listener

export function FilePicker() {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)

  function onFilePicked(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (!files) {
      return
    }

    if (files[0].type.startsWith('image/')) {
      setFileType('img')
    } else if (files[0].type.startsWith('video/')) {
      setFileType('video')
    } else return

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <div>
      <input
        onChange={onFilePicked}
        accept="image/*, video/*"
        type="file"
        name="coverURL"
        id="media"
        className="invisible h-0 w-0"
      />
      {preview && fileType === 'img' && (
        // this preview image resides in the client's machine, not on a remote server, so it doesn't make sense to use <Image/> to optimize this
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
      {preview && fileType === 'video' && (
        <video
          src={preview}
          controls={false}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </div>
  )
}
