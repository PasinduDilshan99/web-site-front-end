"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarItem } from "@/types/nav-bar-types";
import { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import ScrolledDesktopDropdown from "./ScrolledDesktopDropdown";
import UserDropdown from "./UserDropdown";
import Image from "next/image";

interface ScrolledDesktopNavProps {
  visibleItems: NavBarItem[];
  moreItems: NavBarItem[];
  user: User | null;
  companyName: string;
  isScrolledMenuOpen: boolean;
  setIsScrolledMenuOpen: (open: boolean) => void;
  onCloseAll: () => void;
}

const ScrolledDesktopNav: React.FC<ScrolledDesktopNavProps> = ({
  visibleItems,
  moreItems,
  user,
  companyName,
  onCloseAll,
}) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [activeScrolledDropdown, setActiveScrolledDropdown] = useState<
    number | null
  >(null);
  const [isScrolledMoreDropdownOpen, setIsScrolledMoreDropdownOpen] =
    useState(false);

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

  const isSubmenuItemActive = (linkUrl: string) => {
    if (pathname === linkUrl) return true;
    if (pathname?.startsWith(linkUrl) && linkUrl !== "/") return true;
    return false;
  };

  const handleScrolledDropdownToggle = (itemId: number) => {
    setActiveScrolledDropdown(
      activeScrolledDropdown === itemId ? null : itemId,
    );
    setIsScrolledMoreDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setActiveScrolledDropdown(null);
    setIsScrolledMoreDropdownOpen(false);
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
          />
        </Link>
      </div>

      {/* Compact Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-2 nav-dropdown">
        {visibleItems.map((item) => {
          const hasSubmenu =
            item.submenus &&
            item.submenus.filter((sub) => sub.status === "VISIBLE").length > 0;
          const isActive = isItemActive(item);

          if (hasSubmenu) {
            return (
              <ScrolledDesktopDropdown
                key={item.id}
                item={item}
                isOpen={activeScrolledDropdown === item.id}
                onToggle={() => handleScrolledDropdownToggle(item.id)}
                onClose={closeAllDropdowns}
                isActive={isActive}
              />
            );
          }

          return (
            <Link
              key={item.id}
              href={item.linkUrl}
              className="relative font-medium transition-colors duration-300 group px-2 py-1 rounded-md text-sm"
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
              {isActive && (
                <span
                  className="absolute left-0 -bottom-1.5 w-full h-0.5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #0ea5e9 0%, #0d9488 100%)",
                  }}
                ></span>
              )}
            </Link>
          );
        })}

        {/* More Dropdown for Scrolled Nav */}
        {moreItems.length > 0 && (
          <div className="relative group nav-dropdown">
            <button
              onClick={() =>
                setIsScrolledMoreDropdownOpen(!isScrolledMoreDropdownOpen)
              }
              className="relative font-medium transition-colors duration-300 group px-2 py-1 rounded-md text-sm flex items-center space-x-1"
              style={{
                color: isScrolledMoreDropdownOpen ? "#0ea5e9" : "#075985",
                backgroundColor: isScrolledMoreDropdownOpen
                  ? "rgba(14, 165, 233, 0.08)"
                  : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isScrolledMoreDropdownOpen) {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.backgroundColor =
                    "rgba(14, 165, 233, 0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isScrolledMoreDropdownOpen) {
                  e.currentTarget.style.color = "#075985";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span>More</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  isScrolledMoreDropdownOpen ? "rotate-180" : ""
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

            {/* More Dropdown Menu for Scrolled Nav */}
            {isScrolledMoreDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-40 rounded-lg shadow-xl border backdrop-blur-sm z-50"
                style={{
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  borderColor: "rgba(14, 165, 233, 0.3)",
                }}
              >
                <div className="py-1">
                  {moreItems.map((item) => {
                    const hasSubmenu =
                      item.submenus &&
                      item.submenus.filter((sub) => sub.status === "VISIBLE")
                        .length > 0;
                    const isActive = isItemActive(item);

                    if (hasSubmenu) {
                      return (
                        <div key={item.id} className="relative group">
                          <button
                            onClick={() =>
                              handleScrolledDropdownToggle(item.id)
                            }
                            className="flex items-center justify-between w-full px-3 py-2 transition-colors duration-300 text-sm"
                            style={{
                              color:
                                activeScrolledDropdown === item.id || isActive
                                  ? "#0ea5e9"
                                  : "#075985",
                              backgroundColor:
                                activeScrolledDropdown === item.id
                                  ? "rgba(14, 165, 233, 0.08)"
                                  : "transparent",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                activeScrolledDropdown !== item.id &&
                                !isActive
                              ) {
                                e.currentTarget.style.color = "#0ea5e9";
                                e.currentTarget.style.backgroundColor =
                                  "rgba(14, 165, 233, 0.08)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                activeScrolledDropdown !== item.id &&
                                !isActive
                              ) {
                                e.currentTarget.style.color = "#075985";
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                              }
                            }}
                          >
                            <span>{item.name}</span>
                            {isActive && (
                              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 ml-1"></div>
                            )}
                            <svg
                              className="w-2 h-2"
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
                          {activeScrolledDropdown === item.id && (
                            <div
                              className="absolute left-full top-0 ml-1 w-40 rounded-lg shadow-xl border backdrop-blur-sm z-50"
                              style={{
                                backgroundColor: "rgba(248, 250, 252, 0.98)",
                                borderColor: "rgba(14, 165, 233, 0.3)",
                              }}
                            >
                              <div className="py-1">
                                {item.submenus
                                  .filter((sub) => sub.status === "VISIBLE")
                                  .map((submenu) => {
                                    const isSubActive = isSubmenuItemActive(
                                      submenu.linkUrl,
                                    );

                                    return (
                                      <Link
                                        key={submenu.id}
                                        href={submenu.linkUrl}
                                        className="flex items-center space-x-2 px-3 py-2 transition-colors duration-300 text-sm"
                                        style={{
                                          color: isSubActive
                                            ? "#0ea5e9"
                                            : "#075985",
                                          backgroundColor: isSubActive
                                            ? "rgba(14, 165, 233, 0.08)"
                                            : "transparent",
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!isSubActive) {
                                            e.currentTarget.style.color =
                                              "#0ea5e9";
                                            e.currentTarget.style.backgroundColor =
                                              "rgba(14, 165, 233, 0.08)";
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!isSubActive) {
                                            e.currentTarget.style.color =
                                              "#075985";
                                            e.currentTarget.style.backgroundColor =
                                              "transparent";
                                          }
                                        }}
                                        onClick={closeAllDropdowns}
                                      >
                                        {submenu.iconClass && (
                                          <i
                                            className={`${submenu.iconClass} w-3 h-3`}
                                          ></i>
                                        )}
                                        <span>{submenu.name}</span>
                                        {isSubActive && (
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
                    }

                    return (
                      <Link
                        key={item.id}
                        href={item.linkUrl}
                        className="flex items-center justify-between px-3 py-2 transition-colors duration-300 text-sm"
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
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                        onClick={closeAllDropdowns}
                      >
                        <span>{item.name}</span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Compact User Auth Section - Desktop */}
      <div className="hidden md:flex items-center space-x-3">
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

export default ScrolledDesktopNav;