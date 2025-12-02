import React, { ReactNode } from 'react';

interface GradientScrollContainerProps {
  children: ReactNode;
  className?: string;
  maxHeight?: string;
  hideScrollbar?: boolean;
}

const GradientScrollContainer: React.FC<GradientScrollContainerProps> = ({
  children,
  className = '',
  maxHeight = '400px',
  hideScrollbar = false,
}) => {
  return (
    <div
      className={`gradient-scrollbar overflow-auto ${hideScrollbar ? 'scrollbar-hide' : ''} ${className}`}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};

export default GradientScrollContainer;