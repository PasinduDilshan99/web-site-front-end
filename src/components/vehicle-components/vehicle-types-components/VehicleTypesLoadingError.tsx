// components/vehicle-types-components/VehicleTypesLoadingError.tsx
import React from "react";

interface VehicleTypesLoadingErrorProps {
  onRetry: () => void;
  message?: string;
}

const VehicleTypesLoadingError: React.FC<VehicleTypesLoadingErrorProps> = ({
  onRetry,
  message = "Couldn't fetch vehicle types.",
}) => {
  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 min-h-screen flex items-center justify-center">
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
          className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default VehicleTypesLoadingError;