"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarItem } from "@/types/nav-bar-types";
import { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import DesktopDropdown from "./DesktopDropdown";
import MoreDropdown from "./MoreDropdown";
import UserDropdown from "./UserDropdown";
import Image from "next/image";

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
  const pathname = usePathname();
  const { logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const isItemActive = (item: NavBarItem) => {
    if (pathname === item.linkUrl) return true;
    if (pathname?.startsWith(item.linkUrl) && item.linkUrl !== "/") return true;

    if (item.submenus && item.submenus.length > 0) {
      return item.submenus.some((submenu) => {
        if (pathname === submenu.linkUrl) return true;
        if (pathname?.startsWith(submenu.linkUrl) && submenu.linkUrl !== "/")
          return true;
        return false;
      });
    }

    return false;
  };

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
          className="block hover:opacity-90 transition-opacity duration-300"
          onClick={closeAllDropdowns}
        >
          <Image
            src="/logo.png"
            alt={companyName}
            width={150}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-1 nav-dropdown">
        {visibleItems.map((item) => {
          const hasSubmenu =
            item.submenus &&
            item.submenus.filter((sub) => sub.status === "VISIBLE").length > 0;
          const isActive = isItemActive(item);

          if (hasSubmenu) {
            return (
              <DesktopDropdown
                key={item.id}
                item={item}
                isOpen={activeDropdown === item.id}
                onToggle={() => handleDropdownToggle(item.id)}
                onClose={closeAllDropdowns}
                isActive={isActive}
              />
            );
          }

          return (
            <Link
              key={item.id}
              href={item.linkUrl}
              className="relative font-medium transition-colors duration-300 group px-3 py-2 rounded-lg"
              style={{
                color: isActive ? "#0ea5e9" : "#075985",
                backgroundColor: isActive
                  ? "rgba(14, 165, 233, 0.08)"
                  : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.backgroundColor =
                    "rgba(14, 165, 233, 0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#075985";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
              onClick={closeAllDropdowns}
            >
              {item.name}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 rounded-full ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
                style={{
                  background:
                    "linear-gradient(90deg, #0ea5e9 0%, #0d9488 100%)",
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
            currentPath={pathname}
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
              className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 border text-xs ${
                pathname === "/login" ? "active-login" : ""
              }`}
              style={{
                color: pathname === "/login" ? "#FFFFFF" : "#0ea5e9",
                backgroundColor:
                  pathname === "/login" ? "#0ea5e9" : "transparent",
                borderColor:
                  pathname === "/login" ? "#0ea5e9" : "rgba(14, 165, 233, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (pathname !== "/login") {
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.backgroundColor = "#0ea5e9";
                  e.currentTarget.style.borderColor = "#0ea5e9";
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== "/login") {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.3)";
                }
              }}
              onClick={closeAllDropdowns}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs ${
                pathname === "/signup" ? "active-signup" : ""
              }`}
              style={{
                background:
                  pathname === "/signup"
                    ? "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)"
                    : "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                if (pathname !== "/signup") {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)";
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== "/signup") {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)";
                }
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