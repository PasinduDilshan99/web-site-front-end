'use client'

import { COMPANY_NAME } from "@/utils/constant"
import { JSX, useEffect, useState } from "react"

interface GlobalErrorProps {
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

export default function GlobalError({ error, reset }: GlobalErrorProps): JSX.Element {
  const [turtles, setTurtles] = useState<Turtle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTurtles(
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        x: Math.random() * 88 + 2,
        size: Math.random() * 22 + 18,      // 18–40px
        delay: Math.random() * 6,
        duration: Math.random() * 10 + 14,  // 14–24s — slow, graceful
        flip: Math.random() > 0.5,
      }))
    )
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <html lang="en">
      <body>
        {/* ── All styles inline — Tailwind/CSS may not be available in global error ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            overflow: "hidden",
            background:
              "linear-gradient(160deg, #0a2a3a 0%, #0d3d4f 30%, #0e5a5e 60%, #0f7a6e 100%)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* ── Gradient orbs ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-128px",
                left: "-128px",
                width: "480px",
                height: "480px",
                borderRadius: "50%",
                opacity: 0.2,
                background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
                animation: "orb-drift-1 18s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-160px",
                right: "-160px",
                width: "560px",
                height: "560px",
                borderRadius: "50%",
                opacity: 0.15,
                background: "radial-gradient(circle, #0891b2 0%, transparent 70%)",
                animation: "orb-drift-2 22s ease-in-out infinite",
              }}
            />
            {/* Critical error warm orb */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "60%",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                opacity: 0.12,
                background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)",
                animation: "orb-drift-3 14s ease-in-out infinite",
              }}
            />
          </div>

          {/* ── Swimming turtles ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
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
                {/* Upward-facing sea turtle — head at top, tail at bottom, all inline */}
                <svg
                  width={t.size * 0.75}
                  height={t.size}
                  viewBox="0 0 60 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: t.flip ? "scaleX(-1)" : undefined,
                    opacity: 0.5,
                  }}
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
              </div>
            ))}
          </div>

          {/* ── Ocean waves ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              pointerEvents: "none",
            }}
          >
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              style={{ width: "100%", animation: "wave-slide 8s linear infinite" }}
            >
              <path
                d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
                fill="rgba(20,184,166,0.12)"
              />
            </svg>
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              style={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                animation: "wave-slide 12s linear infinite reverse",
              }}
            >
              <path
                d="M0,80 C360,20 720,100 1080,40 C1260,20 1380,60 1440,80 L1440,120 L0,120 Z"
                fill="rgba(6,182,212,0.08)"
              />
            </svg>
          </div>

          {/* ── Main content ── */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
              maxWidth: "560px",
              width: "100%",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Icon — bobs gently */}
            <div
              style={{
                position: "relative",
                marginBottom: "32px",
                animation: "gentle-bob 4s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, rgba(244,63,94,0.18), rgba(20,184,166,0.1))",
                  border: "1px solid rgba(244,63,94,0.28)",
                  boxShadow:
                    "0 0 50px rgba(244,63,94,0.12), inset 0 0 20px rgba(20,184,166,0.05)",
                }}
              >
                <div
                  style={{
                    width: "88px",
                    height: "88px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, rgba(244,63,94,0.22), rgba(14,116,144,0.2))",
                    border: "1px solid rgba(244,63,94,0.35)",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #9f1239, #0e7490)",
                      boxShadow: "0 8px 32px rgba(159,18,57,0.4)",
                    }}
                  >
                    {/* Critical / explosion icon */}
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Pulse ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1px solid rgba(244,63,94,0.28)",
                  animation: "ping-ring 3s ease-out infinite",
                }}
              />
            </div>

            {/* Heading */}
            <div
              style={{
                fontSize: "clamp(52px, 10vw, 80px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "12px",
                background:
                  "linear-gradient(135deg, #fb7185 0%, #5eead4 55%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 28px rgba(244,63,94,0.28))",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease",
              }}
            >
              Critical Error
            </div>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(167,243,208,0.65)",
                maxWidth: "380px",
                marginBottom: "12px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.8s 0.22s ease, transform 0.8s 0.22s ease",
              }}
            >
              A critical error has disrupted the voyage. Our team has been
              alerted — please try again or reload the page.
            </p>

            {/* Status pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
                padding: "6px 16px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 500,
                background: "rgba(244,63,94,0.1)",
                border: "1px solid rgba(244,63,94,0.25)",
                color: "#fda4af",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s 0.32s ease",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#fb7185",
                  animation: "pulse-dot 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              Global Application Error
              {error.digest && (
                <span style={{ color: "rgba(253,164,175,0.45)" }}>
                  · {error.digest}
                </span>
              )}
            </div>

            {/* Dev error details */}
            {/* {process.env.NODE_ENV === "development" && (
              <details
                style={{
                  marginBottom: "24px",
                  textAlign: "left",
                  width: "100%",
                  maxWidth: "440px",
                  borderRadius: "12px",
                  background: "rgba(20,184,166,0.06)",
                  border: "1px solid rgba(20,184,166,0.15)",
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 0.8s 0.38s ease",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    padding: "12px 16px",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#fda4af",
                    userSelect: "none",
                  }}
                >
                  Error Details (dev only)
                </summary>
                <p
                  style={{
                    padding: "0 16px 16px",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    color: "rgba(167,243,208,0.6)",
                    lineHeight: 1.6,
                    wordBreak: "break-all",
                    margin: 0,
                  }}
                >
                  {error.message}
                </p>
              </details>
            )} */}

            {/* Try Again button */}
            <div
              style={{
                marginBottom: "36px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.8s 0.44s ease, transform 0.8s 0.44s ease",
              }}
            >
              <button
                type="button"
                onClick={() => reset()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 36px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "white",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #9f1239, #0e7490)",
                  boxShadow: "0 4px 24px rgba(159,18,57,0.35)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(159,18,57,0.5)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow =
                    "0 4px 24px rgba(159,18,57,0.35)"
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>

            {/* Footer tagline */}
            <div
              style={{
                paddingTop: "20px",
                borderTop: "1px solid rgba(20,184,166,0.15)",
                width: "100%",
                maxWidth: "360px",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s 0.6s ease",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "rgba(94,234,212,0.35)",
                }}
              >
                {COMPANY_NAME}
              </span>
              <span
                style={{
                  margin: "0 8px",
                  fontSize: "11px",
                  color: "rgba(94,234,212,0.2)",
                }}
              >
                —
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontStyle: "italic",
                  fontWeight: 600,
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
          <style>{`
            @keyframes turtle-swim {
              0%   { transform: translateY(0)      rotate(0deg);   opacity: 0; }
              8%   { opacity: 1; }
              20%  { transform: translateY(-20vh)  rotate(4deg); }
              40%  { transform: translateY(-40vh)  rotate(-4deg); }
              60%  { transform: translateY(-60vh)  rotate(3deg); }
              80%  { transform: translateY(-80vh)  rotate(-3deg); opacity: 0.8; }
              95%  { opacity: 0; }
              100% { transform: translateY(-105vh) rotate(0deg);   opacity: 0; }
            }
            @keyframes orb-drift-1 {
              0%, 100% { transform: translate(0,0) scale(1); }
              50%       { transform: translate(40px,30px) scale(1.1); }
            }
            @keyframes orb-drift-2 {
              0%, 100% { transform: translate(0,0) scale(1); }
              50%       { transform: translate(-50px,-40px) scale(1.08); }
            }
            @keyframes orb-drift-3 {
              0%, 100% { transform: translate(0,0) scale(1); }
              50%       { transform: translate(20px,-30px) scale(1.12); }
            }
            @keyframes gentle-bob {
              0%, 100% { transform: translateY(0); }
              50%       { transform: translateY(-10px); }
            }
            @keyframes ping-ring {
              0%   { transform: scale(1);   opacity: 0.5; }
              80%  { transform: scale(1.5); opacity: 0; }
              100% { transform: scale(1.5); opacity: 0; }
            }
            @keyframes wave-slide {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes pulse-dot {
              0%, 100% { opacity: 1;   transform: scale(1); }
              50%       { opacity: 0.5; transform: scale(0.8); }
            }
            @media (prefers-reduced-motion: reduce) {
              * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
            }
          `}</style>
        </div>
      </body>
    </html>
  )
}