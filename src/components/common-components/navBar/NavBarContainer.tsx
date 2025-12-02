"use client";
import React, { useEffect } from "react";

interface NavBarContainerProps {
  children: React.ReactNode;
  isScrolled: boolean;
}

const NavBarContainer: React.FC<NavBarContainerProps> = ({ children, isScrolled }) => {
  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".nav-dropdown")) {
        // All dropdown closing logic is now handled in individual components
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return <>{children}</>;
};

export default NavBarContainer;