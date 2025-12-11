"use client"

import { useState } from "react"

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  currentImage?: string
  isLogo?: boolean
}

export function ImageUpload({ onUploadComplete, currentImage, isLogo }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !ALLOWED_FORMATS.includes(fileExtension)) {
      setError(`Invalid image format. Allowed: ${ALLOWED_FORMATS.join(', ')}`)
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("fileType", isLogo ? "logo" : "image")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Upload failed")
      }

      const data = await response.json()
      onUploadComplete(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mt-2">
      <label className="block">
        <span className="sr-only">Choose image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
      </label>
      {uploading && (
        <p className="mt-2 text-sm text-gray-600">Uploading...</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      {currentImage && (
        <img
          src={currentImage}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover rounded"
        />
      )}
    </div>
  )
}
