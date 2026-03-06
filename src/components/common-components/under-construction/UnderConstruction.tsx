"use client";

import { COMPANY_INFO_EMAIL, COMPANY_NAME } from "@/utils/constant";
import React, { useState, useEffect } from "react";

interface ConstructionPageProps {
  email?: string;
  launchDate?: string;
}

export default function UnderConstructionPage({
  email = COMPANY_INFO_EMAIL,
  launchDate = "Coming Soon",
}: ConstructionPageProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-950 via-blue-950 to-teal-950 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-32 right-10 w-32 h-32 sm:w-48 sm:h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8 sm:mb-12 animate-fadeInDown">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
            {COMPANY_NAME}
          </h1>
          <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main heading */}
        <div
          className="mb-6 sm:mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            We&apos;re Building Something
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">
              {" "}
              Special
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Our team is working hard to create an amazing experience for you
          </p>
        </div>

        {/* Loading animation */}
        <div
          className="mb-10 sm:mb-14 animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex justify-center gap-2 mb-6">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 bg-teal-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 bg-teal-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <p className="text-base sm:text-lg text-gray-400">
            Launching {launchDate}
            <span className="inline-block w-8">{dots}</span>
          </p>
        </div>

        {/* Footer contact */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
          <p className="text-gray-400 text-xs sm:text-sm">
            Questions?{" "}
            <a
              href={`mailto:${email}`}
              className="text-teal-400 hover:text-blue-300 transition-colors underline"
            >
              {email}
            </a>
          </p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
