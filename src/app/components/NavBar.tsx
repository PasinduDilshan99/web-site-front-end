"use client";
import React, { useEffect, useState } from "react";
import { NavBarItem } from "@/types/nav-bar-types";
import { GET_ALL_NAV_BAR_DATA } from "@/utils/frontEndConstant";
import Loading from "./Loading";
import Link from "next/link";
import { COMPANY_NAME } from "@/utils/constant";
import Image from "next/image";

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
      avatar: "/images/user-avatar.jpg"
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
          backgroundColor: "var(--nav-bar-bg)",
          borderColor: "var(--nav-bar-border)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold bg-clip-text text-transparent hover:transition-all duration-300"
                style={{
                  backgroundImage: "var(--nav-bar-text-gradient)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage = "var(--nav-bar-button-signup-bg-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage = "var(--nav-bar-text-gradient)";
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
                        color: "var(--nav-bar-text)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--nav-bar-text-hover)";
                        e.currentTarget.style.backgroundColor = "var(--nav-bar-hover-bg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--nav-bar-text)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.name}
                      <span
                        className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                        style={{
                          background: "var(--nav-bar-underline)",
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
                    <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-all duration-300"
                         style={{
                           backgroundColor: "transparent",
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.backgroundColor = "var(--nav-bar-hover-bg)";
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.backgroundColor = "transparent";
                         }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
                           style={{
                             background: "var(--nav-bar-avatar-bg)",
                             border: "2px solid var(--nav-bar-avatar-border)",
                           }}>
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-bold text-sm"
                                style={{ color: "var(--nav-bar-avatar-text)" }}>
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-sm"
                            style={{ color: "var(--nav-bar-text)" }}>
                        {user.name}
                      </span>
                    </div>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                         style={{
                           backgroundColor: "var(--nav-bar-dropdown-bg)",
                           border: "1px solid var(--nav-bar-dropdown-border)",
                           backdropFilter: "blur(16px)",
                         }}>
                      <div className="p-2">
                        <div className="px-3 py-2 text-sm border-b"
                             style={{
                               color: "var(--nav-bar-dropdown-text)",
                               borderColor: "var(--nav-bar-dropdown-divider)",
                             }}>
                          Signed in as<br/>
                          <span style={{ color: "var(--nav-bar-dropdown-text-hover)" }}>
                            {user.email}
                          </span>
                        </div>
                        <Link 
                          href="/profile" 
                          className="block px-3 py-2 rounded-md transition-colors duration-300"
                          style={{
                            color: "var(--nav-bar-dropdown-text)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-dropdown-text-hover)";
                            e.currentTarget.style.backgroundColor = "var(--nav-bar-dropdown-bg-hover)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-dropdown-text)";
                            e.currentTarget.style.backgroundColor = "transparent"; 
                          }}
                        >
                          Profile
                        </Link>
                        <Link 
                          href="/settings" 
                          className="block px-3 py-2 rounded-md transition-colors duration-300"
                          style={{
                            color: "var(--nav-bar-dropdown-text)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-dropdown-text-hover)";
                            e.currentTarget.style.backgroundColor = "var(--nav-bar-dropdown-bg-hover)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-dropdown-text)";
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          Settings
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 mt-2 border-t pt-2"
                          style={{
                            color: "var(--nav-bar-logout-text)",
                            borderColor: "var(--nav-bar-dropdown-divider)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-logout-text-hover)";
                            e.currentTarget.style.backgroundColor = "var(--nav-bar-logout-bg-hover)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-logout-text)";
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
                      color: "var(--nav-bar-button-login-text)",
                      backgroundColor: "var(--nav-bar-button-login-bg)",
                      border: "1px solid var(--nav-bar-button-login-border)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--nav-bar-button-login-text-hover)";
                      e.currentTarget.style.backgroundColor = "var(--nav-bar-button-login-bg-hover)";
                      e.currentTarget.style.borderColor = "var(--nav-bar-button-login-border-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--nav-bar-button-login-text)";
                      e.currentTarget.style.backgroundColor = "var(--nav-bar-button-login-bg)";
                      e.currentTarget.style.borderColor = "var(--nav-bar-button-login-border)";
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
                    style={{
                      background: "var(--nav-bar-button-signup-bg)",
                      color: "var(--nav-bar-button-signup-text)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--nav-bar-button-signup-bg-hover)";
                      e.currentTarget.style.color = "var(--nav-bar-button-signup-text-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--nav-bar-button-signup-bg)";
                      e.currentTarget.style.color = "var(--nav-bar-button-signup-text)";
                    }}
                  >
                    Sign Up
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
                  color: "var(--nav-bar-text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--nav-bar-text-hover)";
                  e.currentTarget.style.backgroundColor = "var(--nav-bar-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--nav-bar-text)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed left-0 right-0 top-16 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className={`backdrop-blur-xl border-b transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{
            backgroundColor: "var(--nav-bar-bg-mobile)",
            borderColor: "var(--nav-bar-border-mobile)",
          }}>
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navBarData.map((item) => item.status === "VISIBLE" && (
                <Link key={item.name} href={item.linkUrl}
                  className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm"
                  style={{ color: "var(--nav-bar-text)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--nav-bar-text-hover)";
                    e.currentTarget.style.backgroundColor = "var(--nav-bar-hover-bg-mobile)";
                    e.currentTarget.style.backgroundImage = "var(--nav-bar-hover-gradient-mobile)";
                    e.currentTarget.style.borderColor = "var(--nav-bar-border)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--nav-bar-text)";
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.backgroundImage = "none";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                  onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t pt-4 mt-4"
                   style={{ borderColor: "var(--nav-bar-mobile-divider)" }}>
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                           style={{
                             background: "var(--nav-bar-avatar-bg)",
                             border: "2px solid var(--nav-bar-avatar-border)",
                           }}>
                        {user.avatar ? (
                          <Image src={user.avatar} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div style={{ color: "var(--nav-bar-dropdown-text)" }} className="text-sm">{user.email}</div>
                      </div>
                    </div>
                    <Link href="/profile" className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm"
                          style={{ color: "var(--nav-bar-text)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-text-hover)";
                            e.currentTarget.style.backgroundColor = "var(--nav-bar-hover-bg-mobile)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-text)";
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                          onClick={() => setIsMenuOpen(false)}>
                      Profile
                    </Link>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                            className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm"
                            style={{ color: "var(--nav-bar-logout-text)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--nav-bar-logout-text-hover)";
                              e.currentTarget.style.backgroundColor = "var(--nav-bar-logout-bg-hover)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--nav-bar-logout-text)";
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border backdrop-blur-sm text-center mb-2"
                          style={{
                            color: "var(--nav-bar-button-login-text)",
                            backgroundColor: "var(--nav-bar-mobile-auth-bg)",
                            borderColor: "var(--nav-bar-mobile-auth-border)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-button-login-text-hover)";
                            e.currentTarget.style.backgroundColor = "var(--nav-bar-button-login-bg-hover)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--nav-bar-button-login-text)";
                            e.currentTarget.style.backgroundColor = "var(--nav-bar-mobile-auth-bg)";
                          }}
                          onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                    <Link href="/signup" className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-center"
                          style={{
                            background: "var(--nav-bar-button-signup-bg)",
                            color: "var(--nav-bar-button-signup-text)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--nav-bar-button-signup-bg-hover)";
                            e.currentTarget.style.color = "var(--nav-bar-button-signup-text-hover)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--nav-bar-button-signup-bg)";
                            e.currentTarget.style.color = "var(--nav-bar-button-signup-text)";
                          }}
                          onClick={() => setIsMenuOpen(false)}>
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
          backgroundColor: "var(--nav-bar-bg-scrolled)",
          borderColor: "var(--nav-bar-border-scrolled)",
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
                  backgroundImage: "var(--nav-bar-text-gradient)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "linear-gradient(to right, var(--nav-bar-gradient-hover-from), var(--nav-bar-gradient-hover-to))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage =
                    "var(--nav-bar-text-gradient)";
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
                        color: "var(--nav-bar-text)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "var(--nav-bar-text-hover)";
                        e.currentTarget.style.backgroundColor =
                          "var(--nav-bar-hover-bg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--nav-bar-text)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.name}
                      {/* Gradient underline animation */}
                      <span
                        className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                        style={{
                          background: "var(--nav-bar-underline)",
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
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden border-2 border-white/20">
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
                    className="px-3 py-1.5 rounded-md font-medium transition-all duration-300 border border-white/20 hover:border-white/40 text-xs"
                    style={{
                      color: "var(--nav-bar-text)",
                      backgroundColor: "transparent",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs"
                    style={{
                      background: "var(--nav-bar-text-gradient)",
                      color: "white",
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
                  color: "var(--nav-bar-text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--nav-bar-text-hover)";
                  e.currentTarget.style.backgroundColor =
                    "var(--nav-bar-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--nav-bar-text)";
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
              backgroundColor: "var(--nav-bar-bg-mobile-scrolled)",
              borderColor: "var(--nav-bar-border-mobile-scrolled)",
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
                        color: "var(--nav-bar-text)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "var(--nav-bar-text-hover)";
                        e.currentTarget.style.backgroundColor =
                          "var(--nav-bar-hover-bg-mobile)";
                        e.currentTarget.style.backgroundImage =
                          "var(--nav-bar-hover-gradient-mobile)";
                        e.currentTarget.style.borderColor =
                          "var(--nav-bar-border-scrolled)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--nav-bar-text)";
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.backgroundImage = "none";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                      onClick={() => setIsScrolledMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
              )}
              
              {/* Compact Mobile Auth Links */}
              <div className="border-t border-white/10 pt-3 mt-3">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden border-2 border-white/20">
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
                        <div className="text-white font-medium text-sm truncate">{user.name}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsScrolledMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-red-400 hover:text-red-300 hover:bg-red-600/20 text-sm"
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
                        color: "var(--nav-bar-text)",
                        borderColor: "var(--nav-bar-border)",
                      }}
                      onClick={() => setIsScrolledMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-center text-sm"
                      style={{
                        background: "var(--nav-bar-text-gradient)",
                        color: "white",
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