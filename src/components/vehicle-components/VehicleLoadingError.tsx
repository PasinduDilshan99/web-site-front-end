// components/vehicle-components/VehiclesLoadingError.tsx
import React from "react";

interface VehiclesLoadingErrorProps {
  onRetry: () => void;
  message?: string;
}

const VehiclesLoadingError: React.FC<VehiclesLoadingErrorProps> = ({
  onRetry,
  message = "Couldn't fetch vehicles.",
}) => {
  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-teal-50 via-cyan-50 to-seaBlue-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="cursor-pointer px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default VehiclesLoadingError;