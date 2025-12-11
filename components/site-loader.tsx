"use client"

import { useEffect, useState } from "react"

export default function SiteLoader() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    try {
      if (typeof window === "undefined") return
      const seen = sessionStorage.getItem("siteSeen")
      if (seen) return
      setVisible(true)

      let mounted = true
      // slowly increase to 85-92% while page loads
      const tick = () => {
        setProgress((p) => {
          if (!mounted) return p
          const next = p + Math.floor(Math.random() * 8) + 4
          return Math.min(next, 92)
        })
      }

      const interval = window.setInterval(tick, 220)

      const finish = () => {
        if (!mounted) return
        window.clearInterval(interval)
        setProgress(100)
        // short delay so the user sees 100%
        setTimeout(() => {
          if (!mounted) return
          setVisible(false)
          try { sessionStorage.setItem("siteSeen", "1") } catch {}
        }, 360)
      }

      // If the window load event fires, finish quickly
      if (document.readyState === "complete") {
        finish()
      } else {
        window.addEventListener("load", finish, { once: true })
        // fallback: ensure we finish after 3s
        const fallback = window.setTimeout(finish, 3000)
        // cleanup will clear this
        ;(finish as any)._fallback = fallback
      }

      return () => {
        mounted = false
        window.clearInterval(interval)
        try {
          const fb = (finish as any)._fallback
          if (fb) window.clearTimeout(fb)
        } catch {}
      }
    } catch (e) {
      // on any error, don't block the app
      setVisible(false)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl px-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 animate-bounce-slow shadow-lg" />
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">Loading portfolio — {progress}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
