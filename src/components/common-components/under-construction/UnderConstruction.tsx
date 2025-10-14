"use client";

import React, { useState, useEffect } from "react";

interface ConstructionPageProps {
  email?: string;
  launchDate?: string;
}

export default function UnderConstructionPage({
  email = "hello@felicita.com",
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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-32 right-10 w-32 h-32 sm:w-48 sm:h-48 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8 sm:mb-12 animate-fadeInDown">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
            Felicita
          </h1>
          <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main heading */}
        <div
          className="mb-6 sm:mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Were Building Something
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-400">
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
              className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <p className="text-base sm:text-lg text-gray-400">
            Launching {launchDate}
            <span className="inline-block w-8">{dots}</span>
          </p>
        </div>

        {/* Newsletter signup */}
        <div
          className="mb-10 sm:mb-14 animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            Get notified when we launch
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              console.log("Email:", formData.get("email"));
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 sm:px-6 py-3 rounded-lg bg-white/10 border border-amber-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap shadow-lg shadow-amber-500/50"
            >
              Notify Me
            </button>
          </form>
        </div>

        {/* Footer contact */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
          <p className="text-gray-400 text-xs sm:text-sm">
            Questions?{" "}
            <a
              href={`mailto:${email}`}
              className="text-amber-400 hover:text-amber-300 transition-colors underline"
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
