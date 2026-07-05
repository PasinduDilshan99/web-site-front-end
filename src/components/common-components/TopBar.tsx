// components/TopBar.tsx
"use client";
import React from "react";
import {
  COMPANY_LONGITUDE,
  COMPANY_LATITUDE,
  COMPANY_ADDRESS,
  COMPANY_CONTACT_NUMBER,
} from "@/utils/constant";

interface TopBarProps {
  address?: string;
  phoneNumber?: string;
}

const SeaTurtle = () => (
  /*
    Original turtle SVG is ~60w x 80h (vertical, head at top).
    We rotate it 90deg clockwise so head faces right.
    After rotation a 60×80 shape becomes 80×60 in screen space.
    We give the viewBox generous padding so nothing is clipped:
    viewBox="-20 -20 120 120" centers the original 60×80 shape
    and leaves plenty of room for flippers that stick out.
    Rendered size: width=90 height=68 keeps it compact for the topbar.
  */
  <svg
    width="90"
    height="50"
    viewBox="-20 -20 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.5, overflow: "visible" }}
  >
    {/*
      rotate(90, 30, 40) — rotate 90deg clockwise around the
      original turtle's center (cx≈30, cy≈40).
      Head (which was at y≈9) now points to the right (+x).
    */}
    <g transform="rotate(90, 30, 40)">

      {/* Rear flippers — behind body */}
      <ellipse
        cx="13" cy="58" rx="7" ry="3.5"
        fill="#14b8a6"
        style={{
          transformOrigin: "18px 55px",
          animation: "flipper-rear-left 1.1s ease-in-out infinite",
        }}
      />
      <ellipse
        cx="47" cy="58" rx="7" ry="3.5"
        fill="#14b8a6"
        style={{
          transformOrigin: "42px 55px",
          animation: "flipper-rear-right 1.1s ease-in-out infinite",
        }}
      />

      {/* Body */}
      <ellipse cx="30" cy="45" rx="17" ry="22" fill="#2aa39b" />

      {/* Front flippers */}
      <ellipse
        cx="10" cy="33" rx="8" ry="3.5"
        fill="#14b8a6"
        style={{
          transformOrigin: "17px 36px",
          animation: "flipper-front-left 1.1s ease-in-out infinite",
        }}
      />
      <ellipse
        cx="50" cy="33" rx="8" ry="3.5"
        fill="#14b8a6"
        style={{
          transformOrigin: "43px 36px",
          animation: "flipper-front-right 1.1s ease-in-out infinite",
        }}
      />

      {/* Shell outer */}
      <ellipse cx="30" cy="44" rx="13" ry="18" fill="#2dd4bf" />
      {/* Shell inner */}
      <ellipse cx="30" cy="44" rx="7" ry="10" fill="#14b8a6" />
      {/* Shell pattern */}
      <line x1="30" y1="26" x2="30" y2="62" stroke="#115e59" strokeWidth="1.2" />
      <line x1="17" y1="44" x2="43" y2="44" stroke="#115e59" strokeWidth="1.2" />
      <line x1="19" y1="32" x2="41" y2="56" stroke="#115e59" strokeWidth="0.8" />
      <line x1="41" y1="32" x2="19" y2="56" stroke="#115e59" strokeWidth="0.8" />

      {/* Neck */}
      <rect x="25" y="16" width="10" height="6" rx="3" fill="#2aa39b" />

      {/* Head */}
      <ellipse cx="30" cy="9" rx="8" ry="9" fill="#2aa39b" />
      <circle cx="27" cy="6" r="1" fill="#5eead4" />
      <circle cx="33" cy="6" r="1" fill="#5eead4" />
      <circle cx="23" cy="10" r="2" fill="#115e59" />
      <circle cx="37" cy="10" r="2" fill="#115e59" />
      <circle cx="23.8" cy="9.2" r="0.8" fill="#99f6e4" />
      <circle cx="37.8" cy="9.2" r="0.8" fill="#99f6e4" />

      {/* Tail */}
      <ellipse cx="30" cy="69" rx="3.5" ry="5" fill="#2aa39b" />
    </g>
  </svg>
);

const TopBar: React.FC<TopBarProps> = ({
  address = COMPANY_ADDRESS,
  phoneNumber = COMPANY_CONTACT_NUMBER,
}) => {
  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`;
  };

  const handleAddressClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const destination = `${COMPANY_LATITUDE},${COMPANY_LONGITUDE}`;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div
      className="hidden lg:block w-full border-b overflow-hidden relative"
      style={{
        background:
          "linear-gradient(160deg, #0a2a3a 0%, #0d3d4f 30%, #0e5a5e 60%, #0f7a6e 100%)",
        borderColor: "rgba(20,184,166,0.18)",
      }}
    >
      {/* Deep ocean gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
            animation: "topbar-orb-1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, #0891b2 0%, transparent 70%)",
            animation: "topbar-orb-2 22s ease-in-out infinite",
          }}
        />
      </div>

      {/* Single turtle walking left → right */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-60%)",
            animation: "topbar-turtle-walk-ltr 70s 1s linear infinite",
          }}
        >
          <SeaTurtle />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-8">
          <button
            onClick={handlePhoneClick}
            className="cursor-pointer flex items-center gap-1.5 text-xs tracking-wide hover:opacity-80 transition-all duration-200 hover:scale-105 group"
            style={{ color: "#ccfbf1" }}
            aria-label="Call us"
          >
            <svg
              className="w-3 h-3 flex-shrink-0 transition-transform duration-200 group-hover:rotate-12"
              fill="none"
              stroke="#5eead4"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{phoneNumber}</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddressClick}
              className="cursor-pointer flex items-center gap-1.5 text-xs tracking-wide hover:opacity-80 transition-all duration-200 hover:scale-105 group"
              style={{ color: "#ccfbf1" }}
              aria-label="Get directions"
            >
              <svg
                className="w-3 h-3 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                stroke="#5eead4"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{address}</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ── Flipper animations ──────────────────────────────── */
        @keyframes flipper-front-left {
          0%, 100% { transform: rotate(0deg); }
          50%       { transform: rotate(45deg); }
        }
        @keyframes flipper-front-right {
          0%, 100% { transform: rotate(0deg); }
          50%       { transform: rotate(-45deg); }
        }
        @keyframes flipper-rear-left {
          0%, 100% { transform: rotate(0deg); }
          50%       { transform: rotate(-38deg); }
        }
        @keyframes flipper-rear-right {
          0%, 100% { transform: rotate(0deg); }
          50%       { transform: rotate(38deg); }
        }

        /* ── Turtle travel: left → right, slow ──────────────── */
        @keyframes topbar-turtle-walk-ltr {
          0%   { left: -8%;  opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { left: 103%; opacity: 0; }
        }

        /* ── Background orbs ────────────────────────────────── */
        @keyframes topbar-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(20px, 15px) scale(1.1); }
        }
        @keyframes topbar-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-25px, -20px) scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TopBar;