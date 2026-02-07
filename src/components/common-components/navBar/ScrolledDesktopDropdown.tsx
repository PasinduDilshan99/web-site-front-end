"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarItem } from "@/types/nav-bar-types";
import { getVisibleSubmenus } from "@/utils/utils";

interface ScrolledDesktopDropdownProps {
  item: NavBarItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isActive: boolean;
}

const ScrolledDesktopDropdown: React.FC<ScrolledDesktopDropdownProps> = ({
  item,
  isOpen,
  onToggle,
  onClose,
  isActive,
}) => {
  const pathname = usePathname();
  const visibleSubmenus = getVisibleSubmenus(item);

  const isSubmenuActive = (linkUrl: string) => {
    if (pathname === linkUrl) return true;
    if (pathname?.startsWith(linkUrl) && linkUrl !== '/') return true;
    return false;
  };

  return (
    <div className="relative group nav-dropdown">
      <button
        onClick={onToggle}
        className="relative font-medium transition-colors duration-300 group px-2 py-1 rounded-md text-sm flex items-center space-x-1"
        style={{
          color: isActive || isOpen ? "#0ea5e9" : "#075985",
          backgroundColor: isOpen || isActive ? "rgba(14, 165, 233, 0.08)" : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!isOpen && !isActive) {
            e.currentTarget.style.color = "#0ea5e9";
            e.currentTarget.style.backgroundColor = "rgba(14, 165, 233, 0.08)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen && !isActive) {
            e.currentTarget.style.color = "#075985";
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        <span>{item.name}</span>
        {isActive && !isOpen && (
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 ml-1"></div>
        )}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
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
        {isActive && (
          <span
            className="absolute left-0 -bottom-1.5 w-full h-0.5 rounded-full"
            style={{
              background: "linear-gradient(90deg, #0ea5e9 0%, #0d9488 100%)",
            }}
          ></span>
        )}
      </button>

      {/* Dropdown Submenu for Scrolled Nav */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1 w-48 rounded-lg shadow-xl border backdrop-blur-sm z-50"
          style={{
            backgroundColor: "rgba(248, 250, 252, 0.98)",
            borderColor: "rgba(14, 165, 233, 0.3)",
          }}
        >
          <div className="py-1">
            {visibleSubmenus.map((submenu) => {
              const submenuIsActive = isSubmenuActive(submenu.linkUrl);
              
              return (
                <Link
                  key={submenu.id}
                  href={submenu.linkUrl}
                  className="flex items-center space-x-2 px-3 py-2 transition-colors duration-300 text-sm"
                  style={{
                    color: submenuIsActive ? "#0ea5e9" : "#075985",
                    backgroundColor: submenuIsActive ? "rgba(14, 165, 233, 0.08)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!submenuIsActive) {
                      e.currentTarget.style.color = "#0ea5e9";
                      e.currentTarget.style.backgroundColor =
                        "rgba(14, 165, 233, 0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submenuIsActive) {
                      e.currentTarget.style.color = "#075985";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  onClick={onClose}
                >
                  {submenu.iconClass && (
                    <i className={`${submenu.iconClass} w-3 h-3`}></i>
                  )}
                  <span className="flex-1">{submenu.name}</span>
                  {submenuIsActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrolledDesktopDropdown;