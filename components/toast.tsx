"use client"

import { useState, useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type]

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  }[type]

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up`}>
      <span className="text-xl font-bold">{icon}</span>
      <span>{message}</span>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null)

  const showToast = (message: string, type: "success" | "error" | "info" = "info", duration = 3000) => {
    setToast({ message, type, duration })
  }

  const hideToast = () => {
    setToast(null)
  }

  return {
    toast,
    showToast,
    hideToast,
  }
}
