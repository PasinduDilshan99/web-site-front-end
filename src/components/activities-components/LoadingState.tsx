import React from "react";

interface LoadingStateProps {
  activityId: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ activityId }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading activity details...</p>
        <p className="text-sm text-gray-500 mt-2">Activity ID: {activityId}</p>
      </div>
    </div>
  );
};

export default LoadingState;
