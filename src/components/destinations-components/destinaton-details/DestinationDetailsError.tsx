import React from 'react';

interface DestinationDetailsErrorProps {
  error: string | null;
}

const DestinationDetailsError: React.FC<DestinationDetailsErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-500"
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Error Loading Destination
        </h2>
        <p className="text-gray-600">{error || "Destination not found"}</p>
      </div>
    </div>
  );
};

export default DestinationDetailsError;