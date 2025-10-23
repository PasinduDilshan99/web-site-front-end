import React from 'react';

const DestinationDetailsLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading destination details...</p>
      </div>
    </div>
  );
};

export default DestinationDetailsLoading;