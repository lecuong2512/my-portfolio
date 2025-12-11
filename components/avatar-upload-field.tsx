"use client"

import { ImageUpload } from "./image-upload"

interface AvatarUploadFieldProps {
  defaultValue?: string
}

export function AvatarUploadField({ defaultValue }: AvatarUploadFieldProps) {
  function handleUploadComplete(url: string) {
    const input = document.getElementById("avatar") as HTMLInputElement
    if (input) {
      input.value = url
      // Dispatch input event to notify form of change
      input.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }

  return (
    <div>
      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
        Avatar URL
      </label>
      <input
        id="avatar"
        name="avatar"
        type="text"
        defaultValue={defaultValue || ""}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="mt-1 text-sm text-gray-500">Or upload an image below</p>
      <ImageUpload
        onUploadComplete={handleUploadComplete}
        currentImage={defaultValue}
      />
    </div>
  )
}

