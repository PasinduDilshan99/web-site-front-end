"use client";
import React, { JSX, useEffect, useState } from "react";
import {
  COMPANY_CONTACT_NUMBER,
  COMPANY_CONTACT_NUMBER_LINK,
  COMPANY_INFO_EMAIL,
  COMPANY_LATITUDE,
  COMPANY_LOCATION,
  COMPANY_LONGITUDE,
  COMPANY_NAME,
} from "@/utils/constant";
import { FooterService } from "@/services/footerService";
import {
  FooterData,
  FooterSection,
  FooterSocialMedia,
  FooterOtherLink,
} from "@/types/footer-types";
import FooterLoading from "./FooterLoading";
import Image from "next/image";

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
    <ellipse
      cx="10"
      cy="33"
      rx="7"
      ry="4"
      fill="#0d9488"
      transform="rotate(-40 10 33)"
    />
    <ellipse
      cx="50"
      cy="33"
      rx="7"
      ry="4"
      fill="#0d9488"
      transform="rotate(40 50 33)"
    />
    {/* Rear flippers */}
    <ellipse
      cx="11"
      cy="57"
      rx="6"
      ry="3.5"
      fill="#0d9488"
      transform="rotate(30 11 57)"
    />
    <ellipse
      cx="49"
      cy="57"
      rx="6"
      ry="3.5"
      fill="#0d9488"
      transform="rotate(-30 49 57)"
    />
    {/* Tail */}
    <ellipse cx="30" cy="69" rx="3.5" ry="5" fill="#0f766e" />
  </svg>
);

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [turtles, setTurtles] = useState<Turtle[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const { data: footerData, error } =
          await FooterService.fetchFooterData();

        if (error) {
          setError(error);
        } else {
          setFooterData(footerData);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError("Something went wrong while fetching footer data");
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();

    setTurtles(
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        x: Math.random() * 88 + 2,
        size: Math.random() * 22 + 18,
        delay: Math.random() * 6,
        duration: Math.random() * 10 + 14,
        flip: Math.random() > 0.5,
      })),
    );
  }, []);

  const groupedSections = footerData?.sections.reduce(
    (acc, section) => {
      if (!acc[section.title]) {
        acc[section.title] = {
          ...section,
          subItems: [],
        };
      }
      acc[section.title].subItems.push(...section.subItems);
      return acc;
    },
    {} as Record<string, FooterSection>,
  );

  const uniqueSections = groupedSections ? Object.values(groupedSections) : [];

  const copyrightText = footerData?.others.find(
    (item) => item.name.toLowerCase() === "copyright",
  );

  const otherLinks =
    footerData?.others.filter(
      (item) => item.name.toLowerCase() !== "copyright",
    ) || [];

  const getSocialIcon = (name: string) => {
    const iconMap: Record<string, JSX.Element> = {
      Facebook: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      Instagram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      YouTube: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      Twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      LinkedIn: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    };
    return iconMap[name] || iconMap.Facebook;
  };

  if (loading) {
    return <FooterLoading />;
  }

  if (error || !footerData) {
    return;
  }

  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0a2a3a 0%, #0d3d4f 30%, #0e5a5e 60%, #0f7a6e 100%)",
      }}
    >
      {/* ── Deep ocean gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
            animation: "footer-orb-1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #0891b2 0%, transparent 70%)",
            animation: "footer-orb-2 22s ease-in-out infinite",
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

      {/* ── Ocean floor wave ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          className="w-full"
          style={{ animation: "footer-wave 10s linear infinite" }}
        >
          <path
            d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z"
            fill="rgba(20,184,166,0.08)"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo & Company Name */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12rounded-xl flex items-center justify-center shadow-lg">
                <Image src="/logo.png" alt="logo" width={2000} height={2000} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{COMPANY_NAME}</h2>
                <p className="text-xs text-sky-300 uppercase tracking-wider font-medium">
                  TRAVEL EXPERTS
                </p>
              </div>
            </div>

            {/* Company Description */}
            <p className="text-teal-100/70 text-sm leading-relaxed">
              Discover Sri Lanka with our expertly curated tours. We offer
              unforgettable travel experiences with personalized service and
              attention to detail.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={COMPANY_CONTACT_NUMBER_LINK}
                className="flex items-center space-x-3 text-sm text-teal-100/70 hover:text-teal-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-sky-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{COMPANY_CONTACT_NUMBER}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO_EMAIL}`}
                className="flex items-center space-x-3 text-sm text-teal-100/70 hover:text-teal-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-sky-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{COMPANY_INFO_EMAIL}</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${COMPANY_LATITUDE},${COMPANY_LONGITUDE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-teal-100/70 hover:text-teal-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-sky-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{COMPANY_LOCATION}</span>
              </a>
            </div>
          </div>

          {/* Dynamic Sections */}
          {uniqueSections
            .filter((section) => section.status === "ACTIVE")
            .map((section) => (
              <div key={section.id} className="lg:col-span-1">
                <h3
                  className="text-lg font-semibold text-white mb-6 pb-3"
                  style={{ borderBottom: "1px solid rgba(20,184,166,0.25)" }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.subItems
                    .filter((item) => item.status === "ACTIVE")
                    .map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.linkUrl}
                          className="text-teal-100/60 hover:text-teal-300 transition-all duration-200 text-sm flex items-center group"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          {item.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div
        className="relative z-10"
        style={{ borderTop: "1px solid rgba(20,184,166,0.18)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright Text */}
            <div className="text-teal-100/40 text-sm text-center md:text-left">
              {copyrightText?.description ||
                `© ${currentYear} ${COMPANY_NAME}. All rights reserved.`}
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {otherLinks
                .filter((link) => link.status === "ACTIVE")
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.linkUrl}
                    className="text-teal-100/40 hover:text-teal-300 transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </a>
                ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer text-teal-100/40 hover:text-teal-300 transition-colors duration-200 text-sm flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              Back to Top
            </button>
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style jsx global>{`
        @keyframes turtle-swim {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          20% {
            transform: translateY(-20vh) rotate(4deg);
          }
          40% {
            transform: translateY(-40vh) rotate(-4deg);
          }
          60% {
            transform: translateY(-60vh) rotate(3deg);
          }
          80% {
            transform: translateY(-80vh) rotate(-3deg);
            opacity: 0.8;
          }
          95% {
            opacity: 0;
          }
          100% {
            transform: translateY(-105vh) rotate(0deg);
            opacity: 0;
          }
        }
        @keyframes footer-orb-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 20px) scale(1.1);
          }
        }
        @keyframes footer-orb-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, -30px) scale(1.08);
          }
        }
        @keyframes footer-wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
