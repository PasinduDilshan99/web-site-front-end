'use client'
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      <div className="text-center w-full max-w-lg">
        {/* Main logo/title - Responsive sizing */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse">
            Felicita
          </h1>
          <div className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 animate-fade-in-up">
            Loading your experience...
          </div>
        </div>

        {/* Animated circles - Responsive sizing */}
        <div className="flex justify-center space-x-1 sm:space-x-2 md:space-x-3 mb-6 sm:mb-8 md:mb-10">
          <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>

        {/* Progress bar - Responsive width */}
        <div className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 mx-auto bg-gray-200 rounded-full h-2 sm:h-2.5 md:h-3 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full animate-progress"></div>
        </div>

        {/* Floating particles - Responsive */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Mobile: 3 particles, Tablet: 4 particles, Desktop: 5 particles */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4 hidden sm:block"></div>
          <div className="particle particle-5 hidden md:block"></div>
          <div className="particle particle-6 hidden lg:block"></div>
          <div className="particle particle-7 hidden xl:block"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 100%;
            transform: translateX(-100%);
          }
          100% {
            width: 100%;
            transform: translateX(0%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-mobile {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(90deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          background: linear-gradient(45deg, #8b5cf6, #6366f1);
          border-radius: 50%;
          animation: float 3s ease-in-out infinite;
          opacity: 0.6;
        }

        /* Mobile particles - smaller and fewer */
        @media (max-width: 640px) {
          .particle {
            width: 4px;
            height: 4px;
            animation-name: float-mobile;
          }
        }

        /* Tablet and larger particles */
        @media (min-width: 641px) {
          .particle {
            width: 6px;
            height: 6px;
          }
        }

        /* Desktop particles - larger */
        @media (min-width: 1024px) {
          .particle {
            width: 8px;
            height: 8px;
          }
        }

        /* Particle positions - responsive */
        .particle-1 {
          top: 15%;
          left: 10%;
          animation-delay: 0s;
          animation-duration: 3s;
        }

        .particle-2 {
          top: 70%;
          left: 15%;
          animation-delay: 0.5s;
          animation-duration: 2.5s;
        }

        .particle-3 {
          top: 25%;
          right: 12%;
          animation-delay: 1s;
          animation-duration: 3.5s;
        }

        .particle-4 {
          bottom: 25%;
          right: 20%;
          animation-delay: 1.5s;
          animation-duration: 2.8s;
        }

        .particle-5 {
          bottom: 15%;
          left: 25%;
          animation-delay: 2s;
          animation-duration: 3.2s;
        }

        .particle-6 {
          top: 45%;
          left: 8%;
          animation-delay: 0.8s;
          animation-duration: 2.7s;
        }

        .particle-7 {
          top: 55%;
          right: 8%;
          animation-delay: 1.2s;
          animation-duration: 3.1s;
        }

        /* Responsive breakpoint specific optimizations */
        
        /* Mobile (320px - 640px) */
        @media (max-width: 640px) {
          .particle-1 { top: 20%; left: 15%; }
          .particle-2 { top: 65%; left: 20%; }
          .particle-3 { top: 30%; right: 15%; }
        }

        /* Tablet (641px - 768px) */
        @media (min-width: 641px) and (max-width: 768px) {
          .particle-4 { bottom: 30%; right: 25%; }
        }

        /* Laptop (769px - 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .particle-5 { bottom: 20%; left: 30%; }
        }

        /* Desktop (1025px+) */
        @media (min-width: 1025px) {
          .particle-6 { top: 40%; left: 5%; }
          .particle-7 { top: 60%; right: 5%; }
        }
      `}</style>
    </div>
  );
};

export default Loading;