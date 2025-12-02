"use client";
import React from "react";
import Link from "next/link";
import { NavBarItem } from "@/types/nav-bar-types";
import { getVisibleSubmenus, hasSubmenus } from "@/utils/utils";

interface MoreDropdownProps {
  items: NavBarItem[];
  isOpen: boolean;
  onToggle: () => void;
  activeDropdown: number | null;
  onActiveDropdownChange: (id: number | null) => void;
  onClose: () => void;
  isScrolled?: boolean;
}

const MoreDropdown: React.FC<MoreDropdownProps> = ({
  items,
  isOpen,
  onToggle,
  activeDropdown,
  onActiveDropdownChange,
  onClose,
  isScrolled = false,
}) => {
  const handleNestedToggle = (itemId: number) => {
    onActiveDropdownChange(activeDropdown === itemId ? null : itemId);
  };

  // Styles based on scrolled state
  const dropdownButtonClasses = isScrolled
    ? "relative font-medium transition-colors duration-300 group px-2 py-1 rounded-md text-sm flex items-center space-x-1"
    : "relative font-medium transition-colors duration-300 group px-3 py-2 rounded-lg flex items-center space-x-1";

  const dropdownMenuClasses = isScrolled
    ? "absolute right-0 top-full mt-1 w-40 rounded-lg shadow-xl border backdrop-blur-sm z-50"
    : "absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl border backdrop-blur-sm z-50";

  const nestedDropdownClasses = isScrolled
    ? "absolute left-full top-0 ml-1 w-40 rounded-lg shadow-xl border backdrop-blur-sm z-50"
    : "absolute left-full top-0 ml-1 w-48 rounded-lg shadow-xl border backdrop-blur-sm z-50";

  return (
    <div className="relative group nav-dropdown">
      <button
        onClick={onToggle}
        className={dropdownButtonClasses}
        style={{
          color: "#5A4D75",
          backgroundColor: isOpen ? "rgba(139, 95, 191, 0.08)" : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.color = "#8B5FBF";
            e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.color = "#5A4D75";
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        <span>More</span>
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
        {!isScrolled && (
          <span
            className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #8B5FBF 0%, #E9B949 100%)",
            }}
          ></span>
        )}
      </button>

      {/* More Dropdown Menu */}
      {isOpen && (
        <div
          className={dropdownMenuClasses}
          style={{
            backgroundColor: "rgba(255, 251, 250, 0.98)",
            borderColor: "rgba(139, 95, 191, 0.3)",
          }}
        >
          <div className={isScrolled ? "py-1" : "py-2"}>
            {items.map((item) => {
              const hasSubmenu = hasSubmenus(item);

              if (hasSubmenu) {
                return (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNestedToggle(item.id)}
                      className="flex items-center justify-between w-full px-4 py-2 transition-colors duration-300 group"
                      style={{
                        color: "#5A4D75",
                        backgroundColor:
                          activeDropdown === item.id
                            ? "rgba(139, 95, 191, 0.08)"
                            : "transparent",
                      }}
                    >
                      <span className={isScrolled ? "text-sm" : ""}>
                        {item.name}
                      </span>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Nested submenu in More dropdown */}
                    {activeDropdown === item.id && (
                      <div
                        className={nestedDropdownClasses}
                        style={{
                          backgroundColor: "rgba(255, 251, 250, 0.98)",
                          borderColor: "rgba(139, 95, 191, 0.3)",
                        }}
                      >
                        <div className={isScrolled ? "py-1" : "py-2"}>
                          {getVisibleSubmenus(item).map((submenu) => (
                            <Link
                              key={submenu.id}
                              href={submenu.linkUrl}
                              className="flex items-center space-x-2 px-4 py-2 transition-colors duration-300"
                              style={{
                                color: "#5A4D75",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#8B5FBF";
                                e.currentTarget.style.backgroundColor =
                                  "rgba(139, 95, 191, 0.08)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#5A4D75";
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                              }}
                              onClick={onClose}
                            >
                              {submenu.iconClass && (
                                <i
                                  className={`${submenu.iconClass} w-3 h-3`}
                                ></i>
                              )}
                              <span className={isScrolled ? "text-sm" : ""}>
                                {submenu.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.linkUrl}
                  className="block px-4 py-2 transition-colors duration-300"
                  style={{
                    color: "#5A4D75",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#8B5FBF";
                    e.currentTarget.style.backgroundColor =
                      "rgba(139, 95, 191, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5A4D75";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={onClose}
                >
                  <span className={isScrolled ? "text-sm" : ""}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreDropdown;