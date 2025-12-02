"use client";
import React from "react";
import Link from "next/link";
import { NavBarItem } from "@/types/nav-bar-types";
import { getVisibleSubmenus } from "@/utils/utils";

interface DesktopDropdownProps {
  item: NavBarItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const DesktopDropdown: React.FC<DesktopDropdownProps> = ({
  item,
  isOpen,
  onToggle,
  onClose,
}) => {
  const visibleSubmenus = getVisibleSubmenus(item);

  return (
    <div className="relative group nav-dropdown">
      <button
        onClick={onToggle}
        className="relative font-medium transition-colors duration-300 group px-3 py-2 rounded-lg flex items-center space-x-1"
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
          className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #8B5FBF 0%, #E9B949 100%)",
          }}
        ></span>
      </button>

      {/* Dropdown Submenu */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 w-56 rounded-lg shadow-xl border backdrop-blur-sm z-50"
          style={{
            backgroundColor: "rgba(255, 251, 250, 0.98)",
            borderColor: "rgba(139, 95, 191, 0.3)",
          }}
        >
          <div className="py-2">
            {visibleSubmenus.map((submenu) => (
              <Link
                key={submenu.id}
                href={submenu.linkUrl}
                className="flex items-center space-x-3 px-4 py-3 transition-colors duration-300 group"
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
                {submenu.iconClass && (
                  <i
                    className={`${submenu.iconClass} w-4 h-4 text-current`}
                  ></i>
                )}
                <div className="flex-1">
                  <div className="font-medium">{submenu.name}</div>
                  {submenu.description && (
                    <div className="text-xs opacity-70 mt-1">
                      {submenu.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopDropdown;