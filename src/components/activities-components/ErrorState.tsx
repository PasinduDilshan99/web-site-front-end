import React from "react";

interface ErrorStateProps {
  error: string;
  activityId: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, activityId }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Unable to Load Activity
        </h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-sm text-gray-500 mb-4">Activity ID: {activityId}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
