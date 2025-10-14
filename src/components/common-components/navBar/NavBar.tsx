"use client";
import React, { useEffect, useState } from "react";
import { NavBarItem } from "@/types/nav-bar-types";
import { GET_ALL_NAV_BAR_DATA } from "@/utils/frontEndConstant";
import Link from "next/link";
import { COMPANY_NAME } from "@/utils/constant";
import Image from "next/image";
import Loading from "../initial-loading/InitialLoading";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const NavBar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navBarData, setNavBarData] = useState<NavBarItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledMenuOpen, setIsScrolledMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchNavBarItems = async () => {
      try {
        const response = await fetch(GET_ALL_NAV_BAR_DATA);
        const data = await response.json();

        if (response.ok) {
          const items: NavBarItem[] = data.data || [];
          setNavBarData(items);
        } else {
          setError(data.error || "Failed to fetch nav bar items");
        }
      } catch (err) {
        console.error("Error fetching nav bar items:", err);
        setError("Something went wrong while fetching nav bar items");
      } finally {
        setLoading(false);
      }
    };

    fetchNavBarItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newIsScrolled = scrollPosition > 50;

      if (newIsScrolled !== isScrolled) {
        setIsMenuOpen(false);
        setIsScrolledMenuOpen(false);
      }

      setIsScrolled(newIsScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Temporary login/logout functions for demo
  const handleLogin = () => {
    setUser({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/images/user-avatar.jpg",
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <>
      <nav
        className={`backdrop-blur-md border-b shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          backgroundColor: "rgba(255, 251, 250, 0.95)",
          borderColor: "rgba(168, 85, 247, 0.2)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold bg-clip-text text-transparent hover:transition-all duration-300"
                style={{
                  backgroundImage: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(135deg, #7A4FA8 0%, #D4A73A 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)";
                }}
              >
                {COMPANY_NAME}
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navBarData.map(
                (item) =>
                  item.status === "VISIBLE" && (
                    <Link
                      key={item.name}
                      href={item.linkUrl}
                      className="relative font-medium transition-colors duration-300 group px-3 py-2 rounded-lg"
                      style={{
                        color: "#5A4D75",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#8B5FBF";
                        e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#5A4D75";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.name}
                      <span
                        className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #8B5FBF 0%, #E9B949 100%)",
                        }}
                      ></span>
                    </Link>
                  )
              )}
            </div>

            {/* User Auth Section - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="relative group">
                    <div
                      className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
                        style={{
                          background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                          border: "2px solid rgba(139, 95, 191, 0.3)",
                        }}
                      >
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span
                            className="font-bold text-sm"
                            style={{ color: "#FFFFFF" }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span
                        className="font-medium text-sm"
                        style={{ color: "#5A4D75" }}
                      >
                        {user.name}
                      </span>
                    </div>

                    {/* Dropdown Menu */}
                    <div
                      className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                      style={{
                        backgroundColor: "rgba(255, 251, 250, 0.98)",
                        border: "1px solid rgba(139, 95, 191, 0.2)",
                        backdropFilter: "blur(16px)",
                      }}
                    >
                      <div className="p-2">
                        <div
                          className="px-3 py-2 text-sm border-b"
                          style={{
                            color: "#7A6F8F",
                            borderColor: "rgba(139, 95, 191, 0.1)",
                          }}
                        >
                          Signed in as
                          <br />
                          <span
                            style={{
                              color: "#8B5FBF",
                            }}
                          >
                            {user.email}
                          </span>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-3 py-2 rounded-md transition-colors duration-300"
                          style={{
                            color: "#5A4D75",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#8B5FBF";
                            e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#5A4D75";
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-3 py-2 rounded-md transition-colors duration-300"
                          style={{
                            color: "#5A4D75",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#8B5FBF";
                            e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#5A4D75";
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 mt-2 border-t pt-2"
                          style={{
                            color: "#D14D72",
                            borderColor: "rgba(139, 95, 191, 0.1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#E97777";
                            e.currentTarget.style.backgroundColor = "rgba(209, 77, 114, 0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#D14D72";
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                      color: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #7A4FA8 0%, #D4A73A 100%)";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300"
                style={{
                  color: "#5A4D75",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#8B5FBF";
                  e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#5A4D75";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed left-0 right-0 top-16 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`backdrop-blur-xl border-b transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{
              backgroundColor: "rgba(255, 251, 250, 0.98)",
              borderColor: "rgba(139, 95, 191, 0.3)",
            }}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navBarData.map(
                (item) =>
                  item.status === "VISIBLE" && (
                    <Link
                      key={item.name}
                      href={item.linkUrl}
                      className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm"
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
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
              )}

              {/* Mobile Auth Links */}
              <div
                className="border-t pt-4 mt-4"
                style={{ borderColor: "rgba(139, 95, 191, 0.2)" }}
              >
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                        style={{
                          background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                          border: "2px solid rgba(139, 95, 191, 0.3)",
                        }}
                      >
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <div style={{ color: "#5A4D75" }} className="font-medium">
                          {user.name}
                        </div>
                        <div
                          style={{ color: "#7A6F8F" }}
                          className="text-sm"
                        >
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm"
                      style={{ color: "#5A4D75" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#8B5FBF";
                        e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#5A4D75";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm"
                      style={{ color: "#D14D72" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#E97777";
                        e.currentTarget.style.backgroundColor = "rgba(209, 77, 114, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#D14D72";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border backdrop-blur-sm text-center mb-2"
                      style={{
                        color: "#8B5FBF",
                        backgroundColor: "rgba(139, 95, 191, 0.05)",
                        borderColor: "rgba(139, 95, 191, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FFFFFF";
                        e.currentTarget.style.backgroundColor = "#8B5FBF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#8B5FBF";
                        e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.05)";
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-center"
                      style={{
                        background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                        color: "#FFFFFF",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(135deg, #7A4FA8 0%, #D4A73A 100%)";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Scrolled NavBar - Absolute positioned at top */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b shadow-xl transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(255, 251, 250, 0.98)",
          borderColor: "rgba(139, 95, 191, 0.3)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            {/* Compact Logo / Brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-lg font-bold bg-clip-text text-transparent hover:transition-all duration-300"
                style={{
                  backgroundImage: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(135deg, #7A4FA8 0%, #D4A73A 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)";
                }}
              >
                {COMPANY_NAME}
              </Link>
            </div>

            {/* Compact Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navBarData.map(
                (item) =>
                  item.status === "VISIBLE" && (
                    <Link
                      key={item.name}
                      href={item.linkUrl}
                      className="relative font-medium transition-colors duration-300 group px-2 py-1 rounded-md text-sm"
                      style={{
                        color: "#5A4D75",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#8B5FBF";
                        e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#5A4D75";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.name}
                      {/* Gradient underline animation */}
                      <span
                        className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #8B5FBF 0%, #E9B949 100%)",
                        }}
                      ></span>
                    </Link>
                  )
              )}
            </div>

            {/* Compact User Auth Section - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden border-2"
                    style={{
                      background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
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
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Compact Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsScrolledMenuOpen(!isScrolledMenuOpen)}
                className="inline-flex items-center justify-center p-1.5 rounded-md transition-all duration-300"
                style={{
                  color: "#5A4D75",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#8B5FBF";
                  e.currentTarget.style.backgroundColor = "rgba(139, 95, 191, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#5A4D75";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isScrolledMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Compact Mobile Menu */}
        <div
          className={`md:hidden fixed left-0 right-0 top-14 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
            isScrolledMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`backdrop-blur-xl border-b transform transition-transform duration-300 ease-in-out ${
              isScrolledMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{
              backgroundColor: "rgba(255, 251, 250, 0.98)",
              borderColor: "rgba(139, 95, 191, 0.3)",
            }}
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navBarData.map(
                (item) =>
                  item.status === "VISIBLE" && (
                    <Link
                      key={item.name}
                      href={item.linkUrl}
                      className="block px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-sm"
                      style={{
                        color: "#5A4D75",
                      }}
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
                      onClick={() => setIsScrolledMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
              )}

              {/* Compact Mobile Auth Links */}
              <div 
                className="border-t pt-3 mt-3"
                style={{ borderColor: "rgba(139, 95, 191, 0.2)" }}
              >
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2 mb-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-2"
                        style={{
                          background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div style={{ color: "#5A4D75" }} className="font-medium text-sm truncate">
                          {user.name}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsScrolledMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-sm"
                      style={{ color: "#D14D72" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#E97777";
                        e.currentTarget.style.backgroundColor = "rgba(209, 77, 114, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#D14D72";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-center mb-1 text-sm"
                      style={{
                        color: "#8B5FBF",
                        borderColor: "rgba(139, 95, 191, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FFFFFF";
                        e.currentTarget.style.backgroundColor = "#8B5FBF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#8B5FBF";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => setIsScrolledMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-center text-sm"
                      style={{
                        background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                        color: "#FFFFFF",
                      }}
                      onClick={() => setIsScrolledMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;