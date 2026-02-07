"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarItem } from "@/types/nav-bar-types";
import { getVisibleSubmenus } from "@/utils/utils";

interface DesktopDropdownProps {
  item: NavBarItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isActive: boolean;
}

const DesktopDropdown: React.FC<DesktopDropdownProps> = ({
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
        className="relative font-medium transition-colors duration-300 group px-3 py-2 rounded-lg flex items-center space-x-1"
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
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
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
        <span
          className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 rounded-full ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
          style={{
            background: "linear-gradient(90deg, #0ea5e9 0%, #0d9488 100%)",
          }}
        ></span>
      </button>

      {/* Dropdown Submenu */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 w-56 rounded-lg shadow-xl border backdrop-blur-sm z-50"
          style={{
            backgroundColor: "rgba(248, 250, 252, 0.98)",
            borderColor: "rgba(14, 165, 233, 0.3)",
          }}
        >
          <div className="py-2">
            {visibleSubmenus.map((submenu) => {
              const submenuIsActive = isSubmenuActive(submenu.linkUrl);
              
              return (
                <Link
                  key={submenu.id}
                  href={submenu.linkUrl}
                  className={`flex items-center space-x-3 px-4 py-3 transition-colors duration-300 group ${
                    submenuIsActive ? "active-submenu" : ""
                  }`}
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
                    <i
                      className={`${submenu.iconClass} w-4 h-4 text-current`}
                    ></i>
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{submenu.name}</div>
                    {submenu.description && (
                      <div className="text-xs text-sky-600 mt-1">
                        {submenu.description}
                      </div>
                    )}
                  </div>
                  {submenuIsActive && (
                    <div className="w-1 h-1 rounded-full bg-sky-500"></div>
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

export default DesktopDropdown;