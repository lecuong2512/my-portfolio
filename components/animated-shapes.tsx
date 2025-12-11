"use client"

import { useEffect, useRef } from "react"

export default function AnimatedShapes() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      // map to small rotation/translation
      el.style.setProperty('--mx', String((x * 12).toFixed(2) + 'deg'))
      el.style.setProperty('--my', String((y * -8).toFixed(2) + 'deg'))
      el.style.setProperty('--tx', String((x * -12).toFixed(2) + 'px'))
      el.style.setProperty('--ty', String((y * -12).toFixed(2) + 'px'))
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div aria-hidden className="scene" ref={containerRef} style={{'--mx': '0deg' as any, '--my': '0deg' as any, '--tx': '0px' as any, '--ty': '0px' as any}}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* subtle large blurred blob */}
        <div className="animated-shape shape-2 shape-rot shape-blur shape-circle" style={{width: 420, height: 380, background: 'radial-gradient(circle at 30% 20%, rgba(139,92,246,0.18), rgba(59,130,246,0.06))', left: '-80px', top: '-60px', position: 'absolute', transform: 'translateZ(-80px)'}} />

        {/* small accent circle */}
        <div className="animated-shape shape-1 shape-circle" style={{width: 84, height:84, background: 'linear-gradient(135deg, rgba(16,185,129,0.16), rgba(234,179,8,0.16))', right: '40px', top: '80px', position: 'absolute', transform: 'translateZ(10px)'}} />

        {/* rotated translucent square */}
        <div className="animated-shape shape-3" style={{width: 120, height:120, background: 'linear-gradient(90deg, rgba(236,72,153,0.08), rgba(99,102,241,0.06))', left: '60%', bottom: '20%', position: 'absolute', borderRadius: 16, transform: 'translateZ(20px) rotateZ(12deg)'}} />

        {/* floating tiny dots */}
        <div style={{position: 'absolute', left: '10%', bottom: '10%'}}>
          <div className="animated-shape shape-1 shape-circle" style={{width: 10, height:10, background: 'rgba(59,130,246,0.9)'}} />
        </div>
      </div>
    </div>
  )
}
