// components/TopBar.tsx
"use client";
import React, { useEffect, useState } from "react";
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

interface Turtle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  flip: boolean;
}

const SeaTurtle = ({ size, flip }: { size: number; flip: boolean }) => (
  <svg
    width={size * 0.75}
    height={size}
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.4 }}
  >
    {/* Head - Lighter colors */}
    <ellipse cx="30" cy="9" rx="8" ry="9" fill="#2aa39b" />  {/* Lighter teal head */}
    <circle cx="27" cy="6" r="1" fill="#5eead4" />          {/* Brighter eye */}
    <circle cx="33" cy="6" r="1" fill="#5eead4" />          {/* Brighter eye */}
    <circle cx="23" cy="10" r="2" fill="#115e59" />         {/* Lighter dark spot */}
    <circle cx="37" cy="10" r="2" fill="#115e59" />         {/* Lighter dark spot */}
    <circle cx="23.8" cy="9.2" r="0.8" fill="#99f6e4" />    {/* Brighter highlight */}
    <circle cx="37.8" cy="9.2" r="0.8" fill="#99f6e4" />    {/* Brighter highlight */}
    
    {/* Neck - Lighter */}
    <rect x="25" y="16" width="10" height="6" rx="3" fill="#2aa39b" />
    
    {/* Body - Lighter */}
    <ellipse cx="30" cy="45" rx="17" ry="22" fill="#2aa39b" />
    
    {/* Shell - Lighter and brighter */}
    <ellipse cx="30" cy="44" rx="13" ry="18" fill="#2dd4bf" />  {/* Brighter outer shell */}
    <ellipse cx="30" cy="44" rx="7" ry="10" fill="#14b8a6" />   {/* Lighter inner shell */}
    
    {/* Shell pattern lines - Lighter stroke */}
    <line x1="30" y1="26" x2="30" y2="62" stroke="#115e59" strokeWidth="1.2" />
    <line x1="17" y1="44" x2="43" y2="44" stroke="#115e59" strokeWidth="1.2" />
    <line x1="19" y1="32" x2="41" y2="56" stroke="#115e59" strokeWidth="0.8" />
    <line x1="41" y1="32" x2="19" y2="56" stroke="#115e59" strokeWidth="0.8" />
    
    {/* Front flippers - Lighter */}
    <ellipse cx="10" cy="33" rx="7" ry="4" fill="#14b8a6" transform="rotate(-40 10 33)" />
    <ellipse cx="50" cy="33" rx="7" ry="4" fill="#14b8a6" transform="rotate(40 50 33)" />
    
    {/* Rear flippers - Lighter */}
    <ellipse cx="11" cy="57" rx="6" ry="3.5" fill="#14b8a6" transform="rotate(30 11 57)" />
    <ellipse cx="49" cy="57" rx="6" ry="3.5" fill="#14b8a6" transform="rotate(-30 49 57)" />
    
    {/* Tail - Lighter */}
    <ellipse cx="30" cy="69" rx="3.5" ry="5" fill="#2aa39b" />
  </svg>
);

const TopBar: React.FC<TopBarProps> = ({
  address = COMPANY_ADDRESS,
  phoneNumber = COMPANY_CONTACT_NUMBER,
}) => {
  const [turtles, setTurtles] = useState<Turtle[]>([]);

  useEffect(() => {
    setTurtles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        size: Math.random() * 15 + 10,
        delay: Math.random() * 15,
        duration: Math.random() * 15 + 60, // Slower: 20-35 seconds
        flip: Math.random() > 0.5,
      })),
    );
  }, []);

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
        background: "linear-gradient(160deg, #0a2a3a 0%, #0d3d4f 30%, #0e5a5e 60%, #0f7a6e 100%)",
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

      {/* Swimming Turtles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {turtles.map((t) => (
          <div
            key={t.id}
            style={{
              position: "absolute",
              left: `${t.x}%`,
              top: `-${t.size * 2}px`,
              animation: `topbar-turtle-swim ${t.duration}s ${t.delay}s ease-in-out infinite`,
            }}
          >
            <SeaTurtle size={t.size} flip={t.flip} />
          </div>
        ))}
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
              xmlns="http://www.w3.org/2000/svg"
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
                xmlns="http://www.w3.org/2000/svg"
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

      {/* Keyframes for animations */}
      <style jsx global>{`
        @keyframes topbar-turtle-swim {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.3;
          }
          25% {
            transform: translateY(25vh) rotate(3deg);
          }
          50% {
            transform: translateY(50vh) rotate(-3deg);
          }
          75% {
            transform: translateY(75vh) rotate(2deg);
            opacity: 0.3;
          }
          95% {
            opacity: 0;
          }
          100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
        }
        @keyframes topbar-orb-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, 15px) scale(1.1);
          }
        }
        @keyframes topbar-orb-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-25px, -20px) scale(1.08);
          }
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