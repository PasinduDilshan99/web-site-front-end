"use client";

import React from 'react';
import AirplaneScrollAnimation from './AirplaneScrollAnimation';

interface AirplaneScrollWrapperProps {
  children: React.ReactNode;
}

const AirplaneScrollWrapper: React.FC<AirplaneScrollWrapperProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Page content with normal z-index */}
      <div className="relative">
        {children}
      </div>
      
      {/* Airplane animation with higher z-index */}
      <div className="fixed inset-0 -z-1 pointer-events-none">
        <AirplaneScrollAnimation />
      </div>
    </div>
  );
};

export default AirplaneScrollWrapper;