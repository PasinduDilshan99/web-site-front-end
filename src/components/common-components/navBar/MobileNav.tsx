"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavBarItem } from "@/types/nav-bar-types";
import { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import MobileMenuItem from "./MobileMenuItem";

interface MobileNavProps {
  visibleNavBarItems: NavBarItem[];
  user: User | null;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  visibleNavBarItems,
  user,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { logout } = useAuth();

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`lg:hidden fixed left-0 right-0 top-16 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
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
          {visibleNavBarItems.map((item) => (
            <MobileMenuItem key={item.id} item={item} onClose={handleClose} />
          ))}

          {/* Mobile Auth Links */}
          <div
            className="border-t pt-4 mt-4"
            style={{ borderColor: "rgba(139, 95, 191, 0.2)" }}
          >
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                  <UserAvatar user={user} size="large" />
                  <div>
                    <div style={{ color: "#5A4D75" }} className="font-medium">
                      {`${user.firstName} ${user.lastName}`}
                    </div>
                    <div style={{ color: "#7A6F8F" }} className="text-sm">
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
                  onClick={handleClose}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
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
                  onClick={handleClose}
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)";
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

// Helper component for user avatar
const UserAvatar = ({ user, size = "medium" }: { user: User; size?: "small" | "medium" | "large" }) => {
  const dimensions = {
    small: "w-7 h-7 text-xs",
    medium: "w-8 h-8 text-sm",
    large: "w-10 h-10 text-lg",
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center overflow-hidden ${dimensions[size]}`}
      style={{
        background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
        border: "2px solid rgba(139, 95, 191, 0.3)",
      }}
    >
      <span className="text-white font-bold">
        {user.firstName.charAt(0).toUpperCase()}
        {user.lastName.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export default MobileNav;