import React from "react";

interface VehicleDetailsLoadingErrorProps {
  onRetry: () => void;
  message?: string;
}

const VehicleDetailsLoadingError: React.FC<VehicleDetailsLoadingErrorProps> = ({
  onRetry,
  message = "Couldn't fetch vehicle information.",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl mb-6">🚗❌</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailsLoadingError;