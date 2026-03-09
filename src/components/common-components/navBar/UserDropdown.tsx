"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Handle outside clicks and custom close events
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is outside both the dropdown and its trigger
      if (
        dropdownRef.current && 
        triggerRef.current && 
        !dropdownRef.current.contains(target) && 
        !triggerRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleCloseAll = () => {
      setIsDropdownOpen(false);
    };

    // Listen for custom close event from NavBarContainer
    window.addEventListener('closeAllNavDropdowns', handleCloseAll);
    
    // Also listen for direct close event on this dropdown
    if (dropdownRef.current) {
      dropdownRef.current.addEventListener('closeDropdown', handleCloseAll);
    }

    // Add click outside listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('closeAllNavDropdowns', handleCloseAll);
      if (dropdownRef.current) {
        dropdownRef.current.removeEventListener('closeDropdown', handleCloseAll);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await onLogout();
    setIsDropdownOpen(false);
    onCloseAll();
    if (pathname?.startsWith("/profile")) {
      router.push("/login");
    }
  };

  // Toggle dropdown and manage classes for outside click detection
  const toggleDropdown = () => {
    const newState = !isDropdownOpen;
    setIsDropdownOpen(newState);
    
    // Add/remove data attribute for NavBarContainer to detect open state
    if (dropdownRef.current) {
      if (newState) {
        dropdownRef.current.setAttribute('data-open', 'true');
        dropdownRef.current.classList.add('open');
      } else {
        dropdownRef.current.setAttribute('data-open', 'false');
        dropdownRef.current.classList.remove('open');
      }
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Trigger Element */}
        <div
          ref={triggerRef}
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-all duration-300 nav-trigger"
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
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)",
              border: "2px solid rgba(14, 165, 233, 0.3)",
            }}
          >
            {user?.imageUrl ? (
              <Image
                alt={`${user.firstName} ${user.lastName}'s profile`}
                src={user.imageUrl}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-sm text-white">
                {user?.firstName?.charAt(0).toUpperCase()}
                {user?.lastName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-medium text-sm hidden sm:inline" style={{ color: "#075985" }}>
            {user.firstName}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl z-50 nav-dropdown"
            style={{
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
              backdropFilter: "blur(16px)",
            }}
            data-open="true"
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
                <span className="font-semibold" style={{ color: "#075985" }}>
                  {user.firstName} {user.lastName}
                </span>
              </div>
              
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md transition-all duration-300 hover:scale-105"
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
                className="block px-3 py-2 rounded-md transition-all duration-300 hover:scale-105"
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
                className="block px-3 py-2 rounded-md transition-all duration-300 hover:scale-105"
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
                className="block w-full text-left px-3 py-2 rounded-md transition-all duration-300 hover:scale-105 mt-2 border-t pt-2"
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