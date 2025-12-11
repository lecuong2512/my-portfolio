"use client"

import { useState } from "react"

interface AudioUploadFieldProps {
  defaultValue?: string
}

export function AudioUploadField({ defaultValue }: AudioUploadFieldProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ALLOWED_FORMATS = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac']

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("audio/")) {
      setError("Please select an audio file")
      return
    }

    // Validate file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !ALLOWED_FORMATS.includes(fileExtension)) {
      setError(`Invalid audio format. Allowed: ${ALLOWED_FORMATS.join(', ')}`)
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB")
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("fileType", "audio")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Upload failed")
      }

      const data = await response.json()
      const input = document.getElementById("backgroundMusic") as HTMLInputElement
      if (input) {
        input.value = data.url
        input.dispatchEvent(new Event("input", { bubbles: true }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label htmlFor="backgroundMusic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Background Music URL
      </label>
      <input
        id="backgroundMusic"
        name="backgroundMusic"
        type="text"
        defaultValue={defaultValue || ""}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-2">Or upload an audio file:</p>
      <label className="block">
        <span className="sr-only">Choose audio file</span>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 disabled:opacity-50"
        />
      </label>
      {uploading && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {defaultValue && (
        <audio controls className="mt-2 w-full max-w-md dark:bg-gray-700" src={defaultValue}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  )
}

