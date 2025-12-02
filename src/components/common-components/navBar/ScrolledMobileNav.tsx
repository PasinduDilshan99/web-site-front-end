"use client";
import React from "react";
import Link from "next/link";
import { NavBarItem } from "@/types/nav-bar-types";
import { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import MobileMenuItem from "./MobileMenuItem";

interface ScrolledMobileNavProps {
  visibleNavBarItems: NavBarItem[];
  user: User | null;
  isScrolledMenuOpen: boolean;
  setIsScrolledMenuOpen: (open: boolean) => void;
}

const ScrolledMobileNav: React.FC<ScrolledMobileNavProps> = ({
  visibleNavBarItems,
  user,
  isScrolledMenuOpen,
  setIsScrolledMenuOpen,
}) => {
  const { logout } = useAuth();

  const handleClose = () => {
    setIsScrolledMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsScrolledMenuOpen(false);
  };

  return (
    <div
      className={`lg:hidden fixed left-0 right-0 top-14 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
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
          {visibleNavBarItems.map((item) => (
            <MobileMenuItem
              key={item.id}
              item={item}
              onClose={handleClose}
              isScrolled={true}
            />
          ))}

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
                      background:
                        "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <span className="text-white font-bold text-sm">
                      {user.firstName.charAt(0).toUpperCase()}
                      {user.lastName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      style={{ color: "#5A4D75" }}
                      className="font-medium text-sm truncate"
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-sm"
                  style={{ color: "#D14D72" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#E97777";
                    e.currentTarget.style.backgroundColor =
                      "rgba(209, 77, 114, 0.08)";
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
                  onClick={handleClose}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-center text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
                    color: "#FFFFFF",
                  }}
                  onClick={handleClose}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrolledMobileNav;