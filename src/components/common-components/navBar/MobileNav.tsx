"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavBarItem } from "@/types/nav-bar-types";
import { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import MobileMenuItem from "./MobileMenuItem";
import { LOGIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "@/utils/urls";

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
          backgroundColor: "rgba(248, 250, 252, 0.98)",
          borderColor: "rgba(14, 165, 233, 0.3)",
        }}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {visibleNavBarItems.map((item) => (
            <MobileMenuItem key={item.id} item={item} onClose={handleClose} />
          ))}

          {/* Mobile Auth Links */}
          <div
            className="border-t pt-4 mt-4"
            style={{ borderColor: "rgba(14, 165, 233, 0.2)" }}
          >
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                  {/* Replace UserAvatar with custom implementation */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                      background: user?.imageUrl
                        ? "none"
                        : "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)",
                      border: "2px solid rgba(14, 165, 233, 0.3)",
                    }}
                  >
                    {user?.imageUrl ? (
                      <Image
                        alt="profile pic"
                        src={user.imageUrl}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-bold text-lg text-white">
                        {user.firstName.charAt(0).toUpperCase()}
                        {user.lastName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div style={{ color: "#075985" }} className="font-medium">
                      {`${user.firstName} ${user.lastName}`}
                    </div>
                    <div style={{ color: "#0369a1" }} className="text-sm">
                      {user.email}
                    </div>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm"
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
                  onClick={handleClose}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm"
                  style={{ color: "#dc2626" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ef4444";
                    e.currentTarget.style.backgroundColor =
                      "rgba(220, 38, 38, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#dc2626";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href={LOGIN_PAGE_PATH}
                  className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border backdrop-blur-sm text-center mb-2"
                  style={{
                    color: "#0ea5e9",
                    backgroundColor: "rgba(14, 165, 233, 0.05)",
                    borderColor: "rgba(14, 165, 233, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.backgroundColor = "#0ea5e9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#0ea5e9";
                    e.currentTarget.style.backgroundColor =
                      "rgba(14, 165, 233, 0.05)";
                  }}
                  onClick={handleClose}
                >
                  Login
                </Link>
                <Link
                  href={SIGNUP_PAGE_PATH}
                  className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 border border-transparent backdrop-blur-sm text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)",
                    color: "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)";
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
const UserAvatar = ({
  user,
  size = "medium",
}: {
  user: User;
  size?: "small" | "medium" | "large";
}) => {
  const dimensions = {
    small: "w-7 h-7 text-xs",
    medium: "w-8 h-8 text-sm",
    large: "w-10 h-10 text-lg",
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center overflow-hidden ${dimensions[size]}`}
      style={{
        background: "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)",
        border: "2px solid rgba(14, 165, 233, 0.3)",
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
