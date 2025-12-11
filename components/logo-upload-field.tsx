"use client"

import { ImageUpload } from "./image-upload"

interface LogoUploadFieldProps {
  defaultValue?: string
}

export function LogoUploadField({ defaultValue }: LogoUploadFieldProps) {
  function handleUploadComplete(url: string) {
    const input = document.getElementById("logo") as HTMLInputElement
    if (input) {
      input.value = url
      // Dispatch input event to notify form of change
      input.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }

  return (
    <div>
      <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
        Logo URL
      </label>
      <input
        id="logo"
        name="logo"
        type="text"
        defaultValue={defaultValue || ""}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="mt-1 text-sm text-gray-500">Or upload a logo image below</p>
      <ImageUpload
        onUploadComplete={handleUploadComplete}
        currentImage={defaultValue}
        isLogo={true}
      />
    </div>
  )
}
