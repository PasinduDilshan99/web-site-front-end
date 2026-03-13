'use client'

import React, { useEffect, useState } from 'react'

interface Turtle {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  flip: boolean
}

const SeaTurtle = ({ size, flip }: { size: number; flip: boolean }) => (
  <svg
    width={size * 0.75}
    height={size}
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? 'scaleX(-1)' : undefined, opacity: 0.5 }}
  >
    {/* Head */}
    <ellipse cx="30" cy="9" rx="8" ry="9" fill="#0f766e" />
    <circle cx="27" cy="6" r="1" fill="#0d9488" />
    <circle cx="33" cy="6" r="1" fill="#0d9488" />
    <circle cx="23" cy="10" r="2" fill="#134e4a" />
    <circle cx="37" cy="10" r="2" fill="#134e4a" />
    <circle cx="23.8" cy="9.2" r="0.8" fill="#5eead4" />
    <circle cx="37.8" cy="9.2" r="0.8" fill="#5eead4" />
    {/* Neck */}
    <rect x="25" y="16" width="10" height="6" rx="3" fill="#0f766e" />
    {/* Body */}
    <ellipse cx="30" cy="45" rx="17" ry="22" fill="#0f766e" />
    {/* Shell */}
    <ellipse cx="30" cy="44" rx="13" ry="18" fill="#14b8a6" />
    <ellipse cx="30" cy="44" rx="7" ry="10" fill="#0d9488" />
    <line x1="30" y1="26" x2="30" y2="62" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="17" y1="44" x2="43" y2="44" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="19" y1="32" x2="41" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    <line x1="41" y1="32" x2="19" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    {/* Front flippers */}
    <ellipse cx="10" cy="33" rx="7" ry="4" fill="#0d9488" transform="rotate(-40 10 33)" />
    <ellipse cx="50" cy="33" rx="7" ry="4" fill="#0d9488" transform="rotate(40 50 33)" />
    {/* Rear flippers */}
    <ellipse cx="11" cy="57" rx="6" ry="3.5" fill="#0d9488" transform="rotate(30 11 57)" />
    <ellipse cx="49" cy="57" rx="6" ry="3.5" fill="#0d9488" transform="rotate(-30 49 57)" />
    {/* Tail */}
    <ellipse cx="30" cy="69" rx="3.5" ry="5" fill="#0f766e" />
  </svg>
)

const Page = () => {
  const [turtles, setTurtles] = useState<Turtle[]>([])

  useEffect(() => {
    setTurtles(
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        x: Math.random() * 88 + 2,
        size: Math.random() * 22 + 18,
        delay: Math.random() * 6,
        duration: Math.random() * 10 + 14,
        flip: Math.random() > 0.5,
      }))
    )
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── Swimming turtles background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {turtles.map((t) => (
          <div
            key={t.id}
            style={{
              position: 'absolute',
              left: `${t.x}%`,
              bottom: `-${t.size * 2}px`,
              animation: `turtle-swim ${t.duration}s ${t.delay}s ease-in-out infinite`,
            }}
          >
            <SeaTurtle size={t.size} flip={t.flip} />
          </div>
        ))}
      </div>

      {/* ── Page content goes here ── */}
      <div className="relative z-10">
        page
      </div>

      {/* ── Keyframes ── */}
      <style jsx global>{`
        @keyframes turtle-swim {
          0%   { transform: translateY(0)      rotate(0deg);  opacity: 0; }
          8%   { opacity: 1; }
          20%  { transform: translateY(-20vh)  rotate(4deg); }
          40%  { transform: translateY(-40vh)  rotate(-4deg); }
          60%  { transform: translateY(-60vh)  rotate(3deg); }
          80%  { transform: translateY(-80vh)  rotate(-3deg); opacity: 0.8; }
          95%  { opacity: 0; }
          100% { transform: translateY(-105vh) rotate(0deg);  opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </div>
  )
}

export default Page