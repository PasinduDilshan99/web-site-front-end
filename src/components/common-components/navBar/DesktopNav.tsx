"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavBarItem } from "@/types/nav-bar-types";
import { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import DesktopDropdown from "./DesktopDropdown";
import MoreDropdown from "./MoreDropdown";
import UserDropdown from "./UserDropdown";

interface DesktopNavProps {
  visibleItems: NavBarItem[];
  moreItems: NavBarItem[];
  user: User | null;
  companyName: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onCloseAll: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  visibleItems,
  moreItems,
  user,
  companyName,
  onCloseAll,
}) => {
  const { logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const handleDropdownToggle = (itemId: number) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
    setIsMoreDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsMoreDropdownOpen(false);
    onCloseAll();
  };

  return (
    <>
      <div className="flex items-center">
        <Link
          href="/"
          className="text-xl font-bold bg-clip-text text-transparent hover:transition-all duration-300"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage =
              "linear-gradient(135deg, #7A4FA8 0%, #D4A73A 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundImage =
              "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)";
          }}
          onClick={closeAllDropdowns}
        >
          {companyName}
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-1 nav-dropdown">
        {visibleItems.map((item) => {
          const hasSubmenu =
            item.submenus &&
            item.submenus.filter((sub) => sub.status === "VISIBLE").length > 0;

          if (hasSubmenu) {
            return (
              <DesktopDropdown
                key={item.id}
                item={item}
                isOpen={activeDropdown === item.id}
                onToggle={() => handleDropdownToggle(item.id)}
                onClose={closeAllDropdowns}
              />
            );
          }

          return (
            <Link
              key={item.id}
              href={item.linkUrl}
              className="relative font-medium transition-colors duration-300 group px-3 py-2 rounded-lg"
              style={{ color: "#5A4D75" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#8B5FBF";
                e.currentTarget.style.backgroundColor =
                  "rgba(139, 95, 191, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#5A4D75";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={closeAllDropdowns}
            >
              {item.name}
              <span
                className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #8B5FBF 0%, #E9B949 100%)",
                }}
              ></span>
            </Link>
          );
        })}

        {/* More Dropdown */}
        {moreItems.length > 0 && (
          <MoreDropdown
            items={moreItems}
            isOpen={isMoreDropdownOpen}
            onToggle={() => {
              setIsMoreDropdownOpen(!isMoreDropdownOpen);
              setActiveDropdown(null);
            }}
            activeDropdown={activeDropdown}
            onActiveDropdownChange={setActiveDropdown}
            onClose={closeAllDropdowns}
          />
        )}
      </div>

      {/* User Auth Section - Desktop */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <UserDropdown
            user={user}
            onLogout={logout}
            onCloseAll={closeAllDropdowns}
          />
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-md font-medium transition-all duration-300 border text-xs"
              style={{
                color: "#8B5FBF",
                backgroundColor: "transparent",
                borderColor: "rgba(139, 95, 191, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.backgroundColor = "#8B5FBF";
                e.currentTarget.style.borderColor = "#8B5FBF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#8B5FBF";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(139, 95, 191, 0.3)";
              }}
              onClick={closeAllDropdowns}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs"
              style={{
                background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #7A4FA8 0%, #D4A73A 100%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)";
              }}
              onClick={closeAllDropdowns}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopNav;
