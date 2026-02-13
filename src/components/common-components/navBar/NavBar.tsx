"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { NavBarItem } from "@/types/nav-bar-types";
import { COMPANY_NAME } from "@/utils/constant";
import NavBarContainer from "./NavBarContainer";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ScrolledDesktopNav from "./ScrolledDesktopNav";
import ScrolledMobileNav from "./ScrolledMobileNav";
import { NavBarService } from "@/services/navBarService";
import BasicLoading from "../basic-loading/BasicLoading";

const NavBar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navBarData, setNavBarData] = useState<NavBarItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledMenuOpen, setIsScrolledMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [screenSize, setScreenSize] = useState<
    "mobile" | "tablet" | "laptop" | "desktop" | "large"
  >("desktop");

  const { user, loading: authLoading } = useAuth();

  const getMaxVisibleItems = () => {
    switch (screenSize) {
      case "laptop":
        return 6;
      case "desktop":
        return 8;
      case "large":
        return 10;
      default:
        return 6;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width >= 768 && width < 1024) {
        setScreenSize("tablet");
      } else if (width >= 1024 && width < 1280) {
        setScreenSize("laptop");
      } else if (width >= 1280 && width < 1536) {
        setScreenSize("desktop");
      } else {
        setScreenSize("large");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchNavBarItems = async () => {
      try {
        const { data: items, error } = await NavBarService.fetchAllNavBarData();

        if (error) {
          setError(error);
        } else {
          setNavBarData(items);
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

  if (loading || authLoading)
    return (
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950  ">
        <BasicLoading width="w-full" height="h-16" />
      </div>
    );
  if (error) return null;

  const visibleNavBarItems = navBarData.filter(
    (item) => item.status === "VISIBLE",
  );

  const maxVisibleItems = getMaxVisibleItems();
  const visibleItems = visibleNavBarItems.slice(0, maxVisibleItems);
  const moreItems = visibleNavBarItems.slice(maxVisibleItems);

  const navBarProps = {
    visibleNavBarItems,
    visibleItems,
    moreItems,
    user,
    isScrolled,
    screenSize,
    companyName: COMPANY_NAME,
    onCloseAll: () => {
      setIsMenuOpen(false);
      setIsScrolledMenuOpen(false);
    },
  };

  return (
    <NavBarContainer isScrolled={isScrolled}>
      {/* Main NavBar */}
      <nav
        className={`backdrop-blur-md border-b shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          backgroundColor: "rgba(248, 250, 252, 0.97)",
          borderColor: "rgba(14, 165, 233, 0.2)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Desktop Navigation */}
            <DesktopNav
              {...navBarProps}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300"
                style={{ color: "#075985" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.backgroundColor =
                    "rgba(14, 165, 233, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#075985";
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
        <MobileNav
          {...navBarProps}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </nav>

      {/* Scrolled NavBar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b shadow-xl transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(248, 250, 252, 0.99)",
          borderColor: "rgba(14, 165, 233, 0.3)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            {/* Scrolled Desktop Navigation */}
            <ScrolledDesktopNav
              {...navBarProps}
              isScrolledMenuOpen={isScrolledMenuOpen}
              setIsScrolledMenuOpen={setIsScrolledMenuOpen}
            />

            {/* Compact Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsScrolledMenuOpen(!isScrolledMenuOpen)}
                className="inline-flex items-center justify-center p-1.5 rounded-md transition-all duration-300"
                style={{ color: "#075985" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.backgroundColor =
                    "rgba(14, 165, 233, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#075985";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

        {/* Scrolled Mobile Menu */}
        <ScrolledMobileNav
          {...navBarProps}
          isScrolledMenuOpen={isScrolledMenuOpen}
          setIsScrolledMenuOpen={setIsScrolledMenuOpen}
        />
      </nav>
    </NavBarContainer>
  );
};

export default NavBar;
