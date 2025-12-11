"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  fallbackClassName?: string
}

export function SafeImage({ 
  src, 
  alt, 
  fill, 
  width, 
  height, 
  className,
  fallbackClassName 
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null)

  // Check if URL looks like an image URL
  const checkIfImageUrl = (url: string): boolean => {
    // Check for image file extensions
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)(\?|$)/i
    if (imageExtensions.test(url)) {
      return true
    }

    // Check if URL contains common image-related paths
    const imagePaths = ['/image', '/img', '/photo', '/picture', '/media', '/uploads']
    const lowerUrl = url.toLowerCase()
    if (imagePaths.some(path => lowerUrl.includes(path))) {
      return true
    }

    // Check if URL ends with common image patterns
    if (lowerUrl.match(/\/[^\/]+\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)/i)) {
      return true
    }

    // If URL looks like a product/page URL (contains /product/, /page/, etc.), it's likely not an image
    const nonImagePatterns = ['/product/', '/page/', '/post/', '/article/', '/blog/']
    if (nonImagePatterns.some(pattern => lowerUrl.includes(pattern))) {
      return false
    }

    // For local URLs (starting with /), assume they might be images
    if (url.startsWith('/')) {
      return true
    }

    // Default: try to load it, but be cautious
    return true
  }

  useEffect(() => {
    setIsValidImage(checkIfImageUrl(src))
  }, [src])

  const handleError = () => {
    setHasError(true)
  }

  // Show fallback if URL doesn't look like an image
  if (isValidImage === false) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${fill ? 'absolute inset-0' : ''} ${className || fallbackClassName || ''}`}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
      </div>
    )
  }

  // Show fallback if image failed to load
  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${fill ? 'absolute inset-0' : ''} ${className || fallbackClassName || ''}`}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">Image unavailable</span>
      </div>
    )
  }

  // Use regular img tag for URLs that might be problematic (like product pages)
  // This avoids Next.js Image optimization issues
  const isProblematicUrl = src.includes('/product/') || src.includes('/page/') || src.includes('/post/')
  
  if (isProblematicUrl) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={handleError}
        style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
      />
    )
  }

  // Use Next.js Image for valid image URLs
  try {
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          onError={handleError}
          unoptimized={src.includes('.webp') || src.includes('.svg')}
        />
      )
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        unoptimized={src.includes('.webp') || src.includes('.svg')}
      />
    )
  } catch (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${fill ? 'absolute inset-0' : ''} ${className || fallbackClassName || ''}`}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">Image unavailable</span>
      </div>
    )
  }
}

