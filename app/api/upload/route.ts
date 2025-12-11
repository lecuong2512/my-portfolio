import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { auth } from "@/auth"

// Allowed file extensions
const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
const ALLOWED_AUDIO_EXTENSIONS = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac']

function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

function generateRandomString(length: number = 16): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const fileType = formData.get("fileType") as string // "image", "audio", or "logo"

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    const fileExtension = getFileExtension(file.name)
    const isImage = file.type.startsWith("image/")
    const isAudio = file.type.startsWith("audio/")
    
    // Validate file type by extension
    if (fileType === "logo" && !isImage) {
      return NextResponse.json(
        { error: "Logo must be an image file" },
        { status: 400 }
      )
    }

    if (fileType === "audio" && !isAudio) {
      return NextResponse.json(
        { error: "File must be an audio file (mp3, wav, ogg, m4a, flac, aac)" },
        { status: 400 }
      )
    }

    if ((fileType === "image" || fileType === "logo") && !isImage) {
      return NextResponse.json(
        { error: "File must be an image file (jpg, png, gif, webp, svg)" },
        { status: 400 }
      )
    }

    // Validate file extension
    if (isImage && !ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { error: `Invalid image format. Allowed: ${ALLOWED_IMAGE_EXTENSIONS.join(', ')}` },
        { status: 400 }
      )
    }

    if (isAudio && !ALLOWED_AUDIO_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { error: `Invalid audio format. Allowed: ${ALLOWED_AUDIO_EXTENSIONS.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB for images, 10MB for audio)
    const maxSize = isImage ? 5 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      const maxSizeMB = isImage ? 5 : 10
      return NextResponse.json(
        { error: `File size exceeds ${maxSizeMB}MB limit.` },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create filename based on type
    let filename: string
    if (fileType === "logo") {
      // Logo uses fixed name pattern: logo_[timestamp].[ext]
      filename = `logo_${Date.now()}.${fileExtension}`
    } else {
      // Other files use random string: [random16chars].[ext]
      filename = `${generateRandomString(16)}.${fileExtension}`
    }

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads")
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Save file
    const filepath = join(uploadsDir, filename)
    await writeFile(filepath, buffer)

    // Return public URL
    const publicUrl = `/uploads/${filename}`
    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}
