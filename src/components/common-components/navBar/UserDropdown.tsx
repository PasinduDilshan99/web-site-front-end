"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation"; // <-- ADD THIS

interface UserDropdownProps {
  user: User;
  onLogout: () => Promise<void>;
  onCloseAll: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  onLogout,
  onCloseAll,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter(); // <-- ADD THIS
  const pathname = usePathname();

  const handleLogout = async () => {
    await onLogout();
    setIsDropdownOpen(false);
    onCloseAll();
    if (pathname?.startsWith("/profile")) {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="relative group">
        <div
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-all duration-300"
          style={{
            backgroundColor: isDropdownOpen
              ? "rgba(139, 95, 191, 0.08)"
              : "transparent",
          }}
          onMouseEnter={(e) => {
            if (!isDropdownOpen) {
              e.currentTarget.style.backgroundColor =
                "rgba(139, 95, 191, 0.08)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isDropdownOpen) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #8B5FBF 0%, #E9B949 100%)",
              border: "2px solid rgba(139, 95, 191, 0.3)",
            }}
          >
            <span className="font-bold text-sm text-white">
              {user.firstName.charAt(0).toUpperCase()}
              {user.lastName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-sm" style={{ color: "#5A4D75" }}>
            {user.firstName}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl z-50"
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
                <span style={{ color: "#000" }}>
                  {user.firstName} {user.lastName}
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
                  e.currentTarget.style.backgroundColor =
                    "rgba(139, 95, 191, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#5A4D75";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onCloseAll();
                }}
              >
                Profile
              </Link>
              <Link
                href="/profile/notifications"
                className="block px-3 py-2 rounded-md transition-colors duration-300"
                style={{
                  color: "#5A4D75",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#8B5FBF";
                  e.currentTarget.style.backgroundColor =
                    "rgba(139, 95, 191, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#5A4D75";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onCloseAll();
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
