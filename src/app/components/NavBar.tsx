"use client";
import React, { useEffect, useState } from "react";
import { NavBarItem } from "@/types/nav-bar-types";
import { GET_ALL_NAV_BAR_DATA } from "@/utils/frontEndConstant";
import Loading from "./Loading";
import Link from "next/link";

const NavBar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navBarData, setNavBarData] = useState<NavBarItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <>
      {/* Original NavBar - Hidden when scrolled */}
      <nav className={`bg-gray-900/80 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-500 transition-all duration-300">
                Felicita
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
                      className="relative text-white/90 font-medium hover:text-white transition-colors duration-300 group px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      {item.name}
                      {/* Gradient underline animation */}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                    </Link>
                  )
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
            isMenuOpen 
              ? "max-h-screen opacity-100" 
              : "max-h-0 opacity-0"
          }`}
        >
          <div 
            className={`bg-gray-900/30 backdrop-blur-xl border-b border-white/10 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen 
                ? "translate-y-0" 
                : "-translate-y-full"
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navBarData.map(
                (item) =>
                  item.status === "VISIBLE" && (
                    <Link
                      key={item.name}
                      href={item.linkUrl}
                      className="block px-4 py-3 rounded-lg text-white/95 font-medium hover:text-white hover:bg-white/20 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 border border-transparent hover:border-white/30 backdrop-blur-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Scrolled NavBar - Absolute positioned at top */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-white/30 shadow-xl transition-all duration-300 ${
        isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            {/* Compact Logo / Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-500 transition-all duration-300">
                Felicita
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
                      className="relative text-white/90 font-medium hover:text-white transition-colors duration-300 group px-2 py-1 rounded-md hover:bg-white/10 text-sm"
                    >
                      {item.name}
                      {/* Gradient underline animation */}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                    </Link>
                  )
              )}
            </div>

            {/* Compact Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-1.5 rounded-md text-white/90 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

        {/* Compact Mobile Menu */}
        <div
          className={`md:hidden fixed left-0 right-0 top-14 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? "max-h-screen opacity-100" 
              : "max-h-0 opacity-0"
          }`}
        >
          <div 
            className={`bg-gray-900/40 backdrop-blur-xl border-b border-white/20 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen 
                ? "translate-y-0" 
                : "-translate-y-full"
            }`}
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navBarData.map(
                (item) =>
                  item.status === "VISIBLE" && (
                    <Link
                      key={item.name}
                      href={item.linkUrl}
                      className="block px-3 py-2 rounded-md text-white/95 font-medium hover:text-white hover:bg-white/20 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 border border-transparent hover:border-white/30 backdrop-blur-sm text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;