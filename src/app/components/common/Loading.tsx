import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  variant?: "spinner" | "dots" | "pulse" | "bars";
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "md",
  fullScreen = false,
  variant = "spinner",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textSizeClasses = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base lg:text-lg",
    lg: "text-base sm:text-lg lg:text-xl",
    xl: "text-lg sm:text-xl lg:text-2xl",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50"
    : "w-full";

  const minHeightClasses = fullScreen ? "" : "min-h-[300px] sm:min-h-[400px]";

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 border-r-amber-600 animate-spin"></div>
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-purple-600 to-amber-600 rounded-full animate-bounce"></div>
    </div>
  );

  const renderPulse = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-purple-600 to-amber-600 animate-pulse`}
      ></div>
      <div
        className={`${sizeClasses[size]} absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-amber-600 animate-ping opacity-75`}
      ></div>
    </div>
  );

  const renderBars = () => (
    <div className="flex items-end space-x-1 sm:space-x-2">
      <div className="w-2 sm:w-3 lg:w-4 h-8 sm:h-10 lg:h-12 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t animate-pulse [animation-delay:-0.4s]"></div>
      <div className="w-2 sm:w-3 lg:w-4 h-12 sm:h-14 lg:h-16 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t animate-pulse [animation-delay:-0.2s]"></div>
      <div className="w-2 sm:w-3 lg:w-4 h-6 sm:h-8 lg:h-10 bg-gradient-to-t from-purple-600 to-amber-600 rounded-t animate-pulse"></div>
      <div className="w-2 sm:w-3 lg:w-4 h-10 sm:h-12 lg:h-14 bg-gradient-to-t from-amber-600 to-purple-600 rounded-t animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 sm:w-3 lg:w-4 h-8 sm:h-10 lg:h-12 bg-gradient-to-t from-purple-400 to-amber-400 rounded-t animate-pulse [animation-delay:-0.1s]"></div>
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
      default:
        return renderSpinner();
    }
  };

  return (
    <div
      className={`${containerClasses} ${minHeightClasses} flex items-center justify-center`}
    >
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4">
        {renderVariant()}
        {message && (
          <p
            className={`${textSizeClasses[size]} font-medium bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent text-center animate-pulse`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
