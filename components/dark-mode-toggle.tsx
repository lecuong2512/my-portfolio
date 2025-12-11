"use client"

import { useEffect, useState } from "react"

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if dark mode is enabled in localStorage or system preference
    const isDarkMode = localStorage.getItem("darkMode") === "true" ||
      (!localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem("darkMode", String(newDarkMode))

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center justify-center p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label="Toggle dark mode"
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <svg 
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 ${
            isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM13 11a1 1 0 110 2h-1a1 1 0 110-2h1zm4 0a1 1 0 110 2h-1a1 1 0 110-2h1zM9 18a1 1 0 011-1h1a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 110 2h1a1 1 0 110-2h-1zM5 9a1 1 0 100 2h1a1 1 0 100-2H5z" clipRule="evenodd" />
        </svg>

        {/* Moon icon */}
        <svg 
          className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-blue-400/0 group-hover:from-amber-400/20 group-hover:via-amber-400/10 group-hover:to-blue-400/20 transition-all duration-300" />
    </button>
  )
}
