"use client";
import React, { useEffect, useRef } from "react";

interface NavBarContainerProps {
  children: React.ReactNode;
  isScrolled: boolean;
}

const NavBarContainer: React.FC<NavBarContainerProps> = ({ children, isScrolled }) => {
  // Add useRef to track the container for better cleanup
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is outside any nav-dropdown element
      if (!target.closest(".nav-dropdown")) {
        // You could dispatch a custom event here if needed
        // For example: window.dispatchEvent(new Event('closeAllNavDropdowns'));
        // But current implementation in child components is fine
      }
    };

    // Add event listener with capture phase for better performance
    document.addEventListener("mousedown", handleClickOutside, true);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  // Optional: Add a small performance optimization for scroll events
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Scroll-related logic if needed in the future
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="nav-container">
      {children}
    </div>
  );
};

export default NavBarContainer;