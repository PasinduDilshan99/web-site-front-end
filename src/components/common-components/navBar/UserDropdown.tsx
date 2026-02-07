"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

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
  const router = useRouter();
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
              ? "rgba(14, 165, 233, 0.08)"
              : "transparent",
          }}
          onMouseEnter={(e) => {
            if (!isDropdownOpen) {
              e.currentTarget.style.backgroundColor =
                "rgba(14, 165, 233, 0.08)";
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
              background: "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)",
              border: "2px solid rgba(14, 165, 233, 0.3)",
            }}
          >
            {(user && (
              <Image
                alt="profile pic"
                src={user?.imageUrl}
                width={400}
                height={400}
              />
            )) || (
              <span className="font-bold text-sm text-white">
                {user?.firstName.charAt(0).toUpperCase()}
                {user?.lastName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-medium text-sm" style={{ color: "#075985" }}>
            {user.firstName}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl z-50"
            style={{
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="p-2">
              <div
                className="px-3 py-2 text-sm border-b"
                style={{
                  color: "#0369a1",
                  borderColor: "rgba(14, 165, 233, 0.1)",
                }}
              >
                Signed in as
                <br />
                <span style={{ color: "#075985", fontWeight: "600" }}>
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md transition-colors duration-300"
                style={{
                  color: "#075985",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.backgroundColor =
                    "rgba(14, 165, 233, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#075985";
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
                  color: "#075985",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.backgroundColor =
                    "rgba(14, 165, 233, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#075985";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onCloseAll();
                }}
              >
                Settings
              </Link>
              <Link
                href="/password-change"
                className="block px-3 py-2 rounded-md transition-colors duration-300"
                style={{
                  color: "#075985",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0ea5e9";
                  e.currentTarget.style.backgroundColor =
                    "rgba(14, 165, 233, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#075985";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onCloseAll();
                }}
              >
                Password Change
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 mt-2 border-t pt-2"
                style={{
                  color: "#dc2626",
                  borderColor: "rgba(14, 165, 233, 0.1)",
                }}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
