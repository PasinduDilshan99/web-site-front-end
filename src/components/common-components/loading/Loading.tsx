import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  variant?: "spinner" | "dots" | "pulse" | "bars" | "progress";
  brandName?: string;
  showProgressBar?: boolean;
  showParticles?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "md",
  fullScreen = false,
  variant = "spinner",
  brandName = "Felicita",
  showProgressBar = false,
  showParticles = false,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textSizeClasses = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base md:text-lg",
    lg: "text-base sm:text-lg md:text-xl lg:text-2xl",
    xl: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
  };

  const brandSizeClasses = {
    sm: "text-2xl sm:text-3xl",
    md: "text-3xl sm:text-4xl md:text-5xl",
    lg: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    xl: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-gradient-to-br from-purple-50 to-indigo-100 z-50"
    : "w-full bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg";

  const minHeightClasses = fullScreen ? "min-h-screen" : "min-h-[300px] md:min-h-[400px]";

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 border-r-indigo-600 animate-spin"></div>
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-2 sm:space-x-3">
      <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-purple-500 rounded-full animate-bounce [animation-delay:0ms]"></div>
      <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-indigo-500 rounded-full animate-bounce [animation-delay:150ms]"></div>
      <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-purple-500 rounded-full animate-bounce [animation-delay:300ms]"></div>
    </div>
  );

  const renderPulse = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse`}
      ></div>
      <div
        className={`${sizeClasses[size]} absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-ping opacity-75`}
      ></div>
    </div>
  );

  const renderBars = () => (
    <div className="flex items-end space-x-1 sm:space-x-2">
      <div className="w-2 sm:w-3 md:w-4 h-8 sm:h-10 md:h-12 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t animate-pulse [animation-delay:-0.4s]"></div>
      <div className="w-2 sm:w-3 md:w-4 h-12 sm:h-14 md:h-16 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t animate-pulse [animation-delay:-0.2s]"></div>
      <div className="w-2 sm:w-3 md:w-4 h-6 sm:h-8 md:h-10 bg-gradient-to-t from-purple-600 to-indigo-600 rounded-t animate-pulse"></div>
      <div className="w-2 sm:w-3 md:w-4 h-10 sm:h-12 md:h-14 bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 sm:w-3 md:w-4 h-8 sm:h-10 md:h-12 bg-gradient-to-t from-purple-400 to-indigo-400 rounded-t animate-pulse [animation-delay:-0.1s]"></div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 mx-auto bg-gray-200 rounded-full h-2 sm:h-2.5 md:h-3 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full animate-progress"></div>
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "bars":
        return renderBars();
      case "progress":
        return renderProgressBar();
      default:
        return renderSpinner();
    }
  };

  const renderParticles = () => {
    if (!showParticles) return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4 hidden sm:block"></div>
        <div className="particle particle-5 hidden md:block"></div>
        <div className="particle particle-6 hidden lg:block"></div>
        <div className="particle particle-7 hidden xl:block"></div>
      </div>
    );
  };

  return (
    <div
      className={`${containerClasses} ${minHeightClasses} flex items-center justify-center px-4 relative`}
    >
      {renderParticles()}
      
      <div className="text-center w-full max-w-lg relative z-10">
        {/* Brand Name Section */}
        {brandName && (
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h1 className={`${brandSizeClasses[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse`}>
              {brandName}
            </h1>
            {message && (
              <div className={`mt-2 sm:mt-3 md:mt-4 ${textSizeClasses[size]} text-gray-600 animate-fade-in-up`}>
                {message}
              </div>
            )}
          </div>
        )}

        {/* Loading Animation */}
        <div className="flex justify-center items-center mb-4 sm:mb-6 md:mb-8">
          {variant !== "progress" && renderVariant()}
        </div>

        {/* Progress Bar (if enabled) */}
        {showProgressBar && (
          <div className="mb-4 sm:mb-6 md:mb-8">
            {variant === "progress" ? renderProgressBar() : renderProgressBar()}
          </div>
        )}

        {/* Fallback Message without Brand */}
        {!brandName && message && (
          <p className={`${textSizeClasses[size]} font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-center animate-pulse`}>
            {message}
          </p>
        )}
      </div>

      {/* Inline Styles for Animations */}
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
        @media (max-width: 640px) {
          .particle-1 { top: 20%; left: 15%; }
          .particle-2 { top: 65%; left: 20%; }
          .particle-3 { top: 30%; right: 15%; }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .particle-4 { bottom: 30%; right: 25%; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .particle-5 { bottom: 20%; left: 30%; }
        }

        @media (min-width: 1025px) {
          .particle-6 { top: 40%; left: 5%; }
          .particle-7 { top: 60%; right: 5%; }
        }
      `}</style>
    </div>
  );
};

export default Loading;