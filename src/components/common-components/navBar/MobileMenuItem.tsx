"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NavBarItem } from "@/types/nav-bar-types";
import { getVisibleSubmenus } from "@/utils/utils";

interface MobileMenuItemProps {
  item: NavBarItem;
  onClose: () => void;
  isScrolled?: boolean;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ 
  item, 
  onClose, 
  isScrolled = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleSubmenus = getVisibleSubmenus(item);
  const hasSubmenu = visibleSubmenus.length > 0;

  // Styles based on scrolled state
  const containerClasses = isScrolled 
    ? "border-b border-gray-100 last:border-b-0"
    : "border-b border-gray-100 last:border-b-0";
  
  const buttonClasses = isScrolled
    ? "flex items-center justify-between w-full px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-sm"
    : "flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm";

  const linkClasses = isScrolled
    ? "block px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-sm"
    : "block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm";

  const submenuContainerClasses = isScrolled
    ? "pl-4 mt-1 space-y-1"
    : "pl-6 mt-2 space-y-1";

  const submenuLinkClasses = isScrolled
    ? "flex items-center space-x-2 px-3 py-1.5 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-xs"
    : "flex items-center space-x-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-sm";

  if (hasSubmenu) {
    return (
      <div className={containerClasses}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={buttonClasses}
          style={{ color: "#5A4D75" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#8B5FBF";
            e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
            e.currentTarget.style.borderColor = "rgba(139, 95, 191, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#5A4D75";
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <span>{item.name}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Mobile Submenu Items */}
        {isExpanded && (
          <div className={submenuContainerClasses}>
            {visibleSubmenus.map((submenu) => (
              <Link
                key={submenu.id}
                href={submenu.linkUrl}
                className={submenuLinkClasses}
                style={{ color: "#5A4D75" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#8B5FBF";
                  e.currentTarget.style.backgroundColor =
                    "rgba(139, 95, 191, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(139, 95, 191, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#5A4D75";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "transparent";
                }}
                onClick={() => {
                  onClose();
                  setIsExpanded(false);
                }}
              >
                {submenu.iconClass && (
                  <i className={`${submenu.iconClass} w-3 h-3`}></i>
                )}
                <div>
                  <div>{submenu.name}</div>
                  {submenu.description && !isScrolled && (
                    <div className="text-xs opacity-70 mt-1">
                      {submenu.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <Link
        href={item.linkUrl}
        className={linkClasses}
        style={{ color: "#5A4D75" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#8B5FBF";
          e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
          e.currentTarget.style.borderColor = "rgba(139, 95, 191, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#5A4D75";
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "transparent";
        }}
        onClick={onClose}
      >
        {item.name}
      </Link>
    </div>
  );
};

export default MobileMenuItem;