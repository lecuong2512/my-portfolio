"use client"

import { useEffect, useState, useRef } from "react"

interface BackgroundMusicProps {
  musicUrl?: string | null
  enabled?: boolean
}

export function BackgroundMusic({ musicUrl, enabled = true }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeSrc, setIframeSrc] = useState<string>("")

  function isDirectAudio(url: string) {
    return /\.(mp3|wav|ogg|m4a|flac|aac)(?:\?|$)/i.test(url)
  }

  function extractYouTubeId(url: string) {
    const ytMatch = url.match(/[?&]v=([\w-]{11})/) || url.match(/youtu\.be\/([\w-]{11})/)
    return ytMatch ? ytMatch[1] : null
  }

  function extractSpotifyTrackId(url: string) {
    const m = url.match(/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/)
    return m ? m[1] : null
  }

  function detectProvider(url: string) {
    if (isDirectAudio(url)) return "audio"
    if (/youtube\.com|youtu\.be/.test(url)) return "youtube"
    if (/open\.spotify\.com/.test(url)) return "spotify"
    if (/soundcloud\.com/.test(url)) return "soundcloud"
    return "iframe"
  }

  function getEmbedUrl(url: string, provider: string) {
    try {
      if (provider === "youtube") {
        const id = extractYouTubeId(url)
        if (!id) return ""
        // autoplay=1 & loop requires playlist param
        return `https://www.youtube.com/embed/${id}?autoplay=1&controls=0&loop=1&playlist=${id}&mute=0&enablejsapi=1`
      }

      if (provider === "spotify") {
        const id = extractSpotifyTrackId(url)
        if (!id) return ""
        return `https://open.spotify.com/embed/track/${id}?utm_source=generator&autoplay=true`
      }

      if (provider === "soundcloud") {
        // include api=1 to enable widget messaging
        return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false&api=1`
      }

      // fallback: try using the provided URL as an iframe src
      return url
    } catch (e) {
      console.error("getEmbedUrl error", e)
      return ""
    }
  }

  useEffect(() => {
    if (!musicUrl || !enabled) {
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
      setIframeSrc("")
      return
    }

    const provider = detectProvider(musicUrl)
    if (provider === "audio") {
      const audio = audioRef.current
      if (!audio) return
      audio.volume = 0.3 // 30% volume
      audio.load()
    } else {
      // Clear iframe until user toggles play
      setIframeSrc("")
    }
  }, [musicUrl, enabled])

  // Helper to send provider-specific postMessage commands to the iframe
  function sendMessageToIframe(provider: string, command: string) {
    const iframe = iframeRef.current
    if (!iframe || !iframe.contentWindow) return

    try {
      if (provider === "youtube") {
        // YouTube iframe API expects a JSON string with event command
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*')
      } else if (provider === "soundcloud") {
        // SoundCloud Widget API accepts simple method messages
        iframe.contentWindow.postMessage(JSON.stringify({ method: command }), '*')
      } else if (provider === "spotify") {
        // Spotify embed does not provide a documented postMessage play/pause control for anonymous embeds.
        // Best-effort: attempt a message, but fallback to toggling src.
        iframe.contentWindow.postMessage(JSON.stringify({ type: command }), '*')
      } else {
        // generic iframe, nothing to do
      }
    } catch (e) {
      console.warn('sendMessageToIframe failed', e)
    }
  }

  const togglePlay = () => {
    if (!musicUrl || !enabled) return

    const provider = detectProvider(musicUrl)

    if (provider === "audio") {
      const audio = audioRef.current
      if (!audio) return

      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.error("Play failed:", error)
              setIsPlaying(false)
            })
        }
      }
    } else {
      // iframe based providers: try to control via postMessage if possible
      if (isPlaying) {
        // attempt to pause via postMessage first
        sendMessageToIframe(provider, provider === 'youtube' ? 'pauseVideo' : 'pause')
        // if provider doesn't support message, remove src as fallback
        setTimeout(() => setIframeSrc("") , 200)
        setIsPlaying(false)
      } else {
        const embed = getEmbedUrl(musicUrl, provider)
        if (embed) {
          setIframeSrc(embed)
          // give iframe a moment to load then attempt to play via postMessage
          setTimeout(() => sendMessageToIframe(provider, provider === 'youtube' ? 'playVideo' : 'play'), 500)
          setIsPlaying(true)
        }
      }
    }
  }

  if (!musicUrl || !enabled) return null

  const provider = detectProvider(musicUrl)

  return (
    <>
      <style>{`
        @keyframes bar-middle {
          0%, 100% {
            height: 0.75rem;
          }
          50% {
            height: 0.25rem;
          }
        }
        
        @keyframes bar-sides {
          0%, 100% {
            height: 0.25rem;
          }
          50% {
            height: 0.75rem;
          }
        }
        
        @keyframes rainbow-spin {
          0% {
            border-color: #ef4444;
          }
          14% {
            border-color: #f97316;
          }
          28% {
            border-color: #eab308;
          }
          42% {
            border-color: #22c55e;
          }
          57% {
            border-color: #3b82f6;
          }
          71% {
            border-color: #8b5cf6;
          }
          85% {
            border-color: #ec4899;
          }
          100% {
            border-color: #ef4444;
          }
        }
        
        .music-bar-middle {
          animation: bar-middle 1.2s ease-in-out infinite;
        }
        
        .music-bar-side {
          animation: bar-sides 1.2s ease-in-out infinite;
        }
        
        .rainbow-border {
          animation: rainbow-spin 3s linear infinite;
        }
      `}</style>
      {provider === "audio" ? (
        <audio
          ref={audioRef}
          loop
          preload="auto"
          src={musicUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      ) : (
        // only render iframe when iframeSrc is set (user requested play)
        iframeSrc ? (
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title="background-music-player"
            style={{ display: "none" }}
            allow="autoplay; encrypted-media"
            onLoad={() => {
              // try to trigger play command after iframe loads
              const p = detectProvider(musicUrl)
              sendMessageToIframe(p, p === 'youtube' ? 'playVideo' : 'play')
            }}
          />
        ) : null
      )}
      <button
        onClick={togglePlay}
        className={`bg-transparent border-2 text-white p-1.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center gap-1 w-8 h-8 rainbow-border ${
          !isPlaying ? "opacity-60" : ""
        }`}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
      >
        <div className={`w-0.5 bg-blue-600 rounded-full transition-all duration-300 ${isPlaying ? "music-bar-side" : "h-1"}`} />
        <div className={`w-0.5 bg-blue-600 rounded-full transition-all duration-300 ${isPlaying ? "music-bar-middle" : "h-1.5"}`} />
        <div className={`w-0.5 bg-blue-600 rounded-full transition-all duration-300 ${isPlaying ? "music-bar-side" : "h-1"}`} />
      </button>
    </>
  )
}
