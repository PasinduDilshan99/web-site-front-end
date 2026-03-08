'use client'

import { COMPANY_NAME } from "@/utils/constant"
import Link from "next/link"
import { JSX, useEffect, useState } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

interface Turtle {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  flip: boolean
}



/* ── Mini SVG sea turtle — head pointing UP, swims bottom → top ──────
   Body is vertical. Head at top, tail at bottom, flippers on left/right.
   `flip` mirrors left↔right so turtles vary slightly.                   */
const SeaTurtle = ({ size, flip }: { size: number; flip: boolean }) => (
  <svg
    width={size * 0.75}
    height={size}
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.55 }}
  >
    {/* ── Head (top) ── */}
    <ellipse cx="30" cy="9" rx="8" ry="9" fill="#0f766e" />
    {/* Nostrils */}
    <circle cx="27" cy="6" r="1" fill="#0d9488" />
    <circle cx="33" cy="6" r="1" fill="#0d9488" />
    {/* Eyes */}
    <circle cx="23" cy="10" r="2" fill="#134e4a" />
    <circle cx="37" cy="10" r="2" fill="#134e4a" />
    <circle cx="23.8" cy="9.2" r="0.8" fill="#5eead4" />
    <circle cx="37.8" cy="9.2" r="0.8" fill="#5eead4" />

    {/* ── Neck connector ── */}
    <rect x="25" y="16" width="10" height="6" rx="3" fill="#0f766e" />

    {/* ── Body ── */}
    <ellipse cx="30" cy="45" rx="17" ry="22" fill="#0f766e" />

    {/* ── Shell ── */}
    <ellipse cx="30" cy="44" rx="13" ry="18" fill="#14b8a6" />
    {/* Shell centre plate */}
    <ellipse cx="30" cy="44" rx="7" ry="10" fill="#0d9488" />
    {/* Shell ridge lines */}
    <line x1="30" y1="26" x2="30" y2="62" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="17" y1="44" x2="43" y2="44" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="19" y1="32" x2="41" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    <line x1="41" y1="32" x2="19" y2="56" stroke="#0f766e" strokeWidth="0.8" />

    {/* ── Front flippers (upper sides) ── */}
    <ellipse cx="10" cy="33" rx="7" ry="4" fill="#0d9488" transform="rotate(-40 10 33)" />
    <ellipse cx="50" cy="33" rx="7" ry="4" fill="#0d9488" transform="rotate(40 50 33)" />

    {/* ── Rear flippers (lower sides) ── */}
    <ellipse cx="11" cy="57" rx="6" ry="3.5" fill="#0d9488" transform="rotate(30 11 57)" />
    <ellipse cx="49" cy="57" rx="6" ry="3.5" fill="#0d9488" transform="rotate(-30 49 57)" />

    {/* ── Tail (bottom) ── */}
    <ellipse cx="30" cy="69" rx="3.5" ry="5" fill="#0f766e" />
  </svg>
)

export default function Error({ error, reset }: ErrorProps): JSX.Element {
  const [turtles, setTurtles] = useState<Turtle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTurtles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 88 + 2,
        size: Math.random() * 22 + 18,      // 18–40px — charming but not distracting
        delay: Math.random() * 6,
        duration: Math.random() * 10 + 14,  // 14–24s — slow, graceful swim upward
        flip: Math.random() > 0.5,
      }))
    )
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0a2a3a 0%, #0d3d4f 30%, #0e5a5e 60%, #0f7a6e 100%)",
      }}
    >
      {/* ── Gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
            animation: "orb-drift-1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #0891b2 0%, transparent 70%)",
            animation: "orb-drift-2 22s ease-in-out infinite",
          }}
        />
        {/* Warm red-tinted orb */}
        <div
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)",
            animation: "orb-drift-3 16s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Swimming turtles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {turtles.map((t) => (
          <div
            key={t.id}
            style={{
              position: "absolute",
              left: `${t.x}%`,
              bottom: `-${t.size * 2}px`,
              animation: `turtle-swim ${t.duration}s ${t.delay}s ease-in-out infinite`,
            }}
          >
            <SeaTurtle size={t.size} flip={t.flip} />
          </div>
        ))}
      </div>

      {/* ── Ocean floor waves ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ animation: "wave-slide 8s linear infinite" }}
        >
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            fill="rgba(20,184,166,0.12)"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full absolute bottom-0"
          style={{ animation: "wave-slide 12s linear infinite reverse" }}
        >
          <path
            d="M0,80 C360,20 720,100 1080,40 C1260,20 1380,60 1440,80 L1440,120 L0,120 Z"
            fill="rgba(6,182,212,0.08)"
          />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl w-full"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Warning icon — bobs gently */}
        <div
          className="relative mb-8"
          style={{ animation: "gentle-bob 4s ease-in-out infinite" }}
        >
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(20,184,166,0.1))",
              border: "1px solid rgba(244,63,94,0.25)",
              boxShadow:
                "0 0 40px rgba(244,63,94,0.1), inset 0 0 20px rgba(20,184,166,0.05)",
            }}
          >
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(244,63,94,0.2), rgba(14,116,144,0.2))",
                border: "1px solid rgba(244,63,94,0.3)",
              }}
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #be123c, #0e7490)",
                  boxShadow: "0 8px 32px rgba(190,18,60,0.35)",
                }}
              >
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Pulse ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(244,63,94,0.25)",
              animation: "ping-ring 3s ease-out infinite",
            }}
          />
        </div>

        {/* Heading */}
        <div
          className="text-6xl sm:text-7xl font-black tracking-tighter leading-none select-none mb-3"
          style={{
            background:
              "linear-gradient(135deg, #fb7185 0%, #5eead4 60%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 24px rgba(244,63,94,0.3))",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease",
          }}
        >
          Oops!
        </div>

        <h2
          className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug"
          style={{
            letterSpacing: "-0.02em",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease",
          }}
        >
          Something Went Wrong
        </h2>

        <p
          className="text-sm sm:text-base max-w-sm leading-relaxed mb-3"
          style={{
            color: "rgba(167,243,208,0.65)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s 0.28s ease, transform 0.8s 0.28s ease",
          }}
        >
          An unexpected wave hit us. Don&apos;t worry — our crew is on it.
          Try again or head back to shore.
        </p>

        {/* Status pill */}
        <div
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs sm:text-sm font-medium"
          style={{
            background: "rgba(244,63,94,0.1)",
            border: "1px solid rgba(244,63,94,0.25)",
            color: "#fda4af",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s 0.35s ease",
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-rose-400"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          Application Error
          {error.digest && (
            <span style={{ color: "rgba(253,164,175,0.5)" }}>
              · {error.digest}
            </span>
          )}
        </div>

        {/* Dev error details */}
        {/* {process.env.NODE_ENV === "development" && (
          <details
            className="mb-6 text-left w-full max-w-md rounded-xl text-xs sm:text-sm"
            style={{
              background: "rgba(20,184,166,0.06)",
              border: "1px solid rgba(20,184,166,0.15)",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s 0.4s ease",
            }}
          >
            <summary
              className="cursor-pointer px-4 py-3 font-semibold select-none rounded-xl"
              style={{ color: "#fda4af" }}
            >
              Error Details (dev only)
            </summary>
            <p
              className="px-4 pb-4 break-all leading-relaxed font-mono"
              style={{ color: "rgba(167,243,208,0.6)" }}
            >
              {error.message}
            </p>
          </details>
        )} */}

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s 0.45s ease, transform 0.8s 0.45s ease",
          }}
        >
          {/* Try Again — primary */}
          <button
            type="button"
            onClick={() => reset()}
            className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #be123c, #0e7490)",
              boxShadow: "0 4px 24px rgba(190,18,60,0.3)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(190,18,60,0.5)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 24px rgba(190,18,60,0.3)")
            }
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </button>

          {/* Go Home — secondary */}
          <Link
            href="/"
            className="group flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "rgba(20,184,166,0.08)",
              border: "1px solid rgba(20,184,166,0.35)",
              color: "#5eead4",
              boxShadow: "0 2px 12px rgba(20,184,166,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(20,184,166,0.16)"
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(20,184,166,0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(20,184,166,0.08)"
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(20,184,166,0.1)"
            }}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </Link>
        </div>

        {/* Divider + tagline */}
        <div
          className="pt-6 w-full max-w-sm text-center"
          style={{
            borderTop: "1px solid rgba(20,184,166,0.15)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s 0.6s ease",
          }}
        >
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{ color: "rgba(94,234,212,0.35)", letterSpacing: "0.18em" }}
          >
            {COMPANY_NAME}
          </span>
          <span className="mx-2 text-xs" style={{ color: "rgba(94,234,212,0.2)" }}>
            —
          </span>
          <span
            className="text-xs font-semibold italic"
            style={{
              background: "linear-gradient(90deg, #5eead4, #22d3ee, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            See More. Feel More. Live More.
          </span>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style jsx global>{`
        @keyframes turtle-swim {
          0%   { transform: translateY(0)      rotate(0deg);   opacity: 0; }
          8%   { opacity: 1; }
          /* gentle side-to-side waggle as they swim up */
          20%  { transform: translateY(-20vh)  rotate(4deg); }
          40%  { transform: translateY(-40vh)  rotate(-4deg); }
          60%  { transform: translateY(-60vh)  rotate(3deg); }
          80%  { transform: translateY(-80vh)  rotate(-3deg); opacity: 0.8; }
          95%  { opacity: 0; }
          100% { transform: translateY(-105vh) rotate(0deg);   opacity: 0; }
        }
        @keyframes orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.1); }
        }
        @keyframes orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -40px) scale(1.08); }
        }
        @keyframes orb-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.12); }
        }
        @keyframes gentle-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ping-ring {
          0% { transform: scale(1); opacity: 0.5; }
          80% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes wave-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </div>
  )
}