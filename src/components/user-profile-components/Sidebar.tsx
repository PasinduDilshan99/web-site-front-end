// components/Sidebar.tsx
"use client";

import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { SidebarItem } from "@/types/sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  User,
  Home,
  Settings,
  Bell,
  Shield,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  Building,
  Lock,
  ChevronLeft,
  Key,
  History,
  Eye,
  Calendar,
  CheckCircle,
  Ticket,
  Star,
  AlertCircle,
  Package,
  MapPin,
  Clock,
  Gift,
  Heart,
  Wallet,
  Users,
  Target,
  Loader,
  Hourglass,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import SideBarLoading from "./SideBarLoading";
import {
  USER_PROFILE_PAGE_PATH,
  USER_PROFILE_USER_PAGE_PATH,
} from "@/utils/urls";
import { USER_PLACE_HOLDER_IMAGE } from "@/utils/constant";

// Sea Blue & Sea Green Theme Colors
const THEME = {
  seaBlue: {
    light: "#E6F3FF",
    DEFAULT: "#1E88E5",
    dark: "#1565C0",
    gradient: "from-blue-50 to-blue-100",
  },
  seaGreen: {
    light: "#E6F4EA",
    DEFAULT: "#2E7D32",
    dark: "#1B5E20",
    gradient: "from-green-50 to-green-100",
  },
  accent: {
    light: "#E3F2FD",
    DEFAULT: "#2196F3",
    dark: "#0D47A1",
    teal: "#26A69A",
    cyan: "#00BCD4",
  },
};

// Helper function to check privileges
const checkPrivilege = (
  itemPrivilege: string,
  userPrivileges: string[],
): boolean => {
  if (
    !itemPrivilege ||
    itemPrivilege.trim() === "" ||
    itemPrivilege.toLowerCase() === "none"
  ) {
    return true;
  }
  return userPrivileges.includes(itemPrivilege);
};

// Updated icon mapping for all titles
const getIcon = (itemName: string) => {
  const name = itemName.toLowerCase();

  // Exact matches first
  if (name.includes("profile")) return User;
  if (name.includes("security")) return Shield;
  if (name.includes("activity") && name.includes("review")) return History;
  if (name.includes("browsing") && name.includes("history")) return Eye;
  if (name.includes("cancelled") && name.includes("tour")) return X;
  if (name.includes("completed") && name.includes("tour")) return CheckCircle;
  if (name.includes("pending") && name.includes("tour")) return Hourglass;
  if (name.includes("coupon") || name.includes("offer")) return Ticket;
  if (name.includes("destination") && name.includes("review")) return MapPin;
  if (name.includes("notification")) return Bell;
  if (name.includes("package") && name.includes("review")) return Package;
  if (name.includes("requested") && name.includes("tour")) return Clock;
  if (
    name.includes("review") &&
    !name.includes("tour") &&
    !name.includes("destination") &&
    !name.includes("package") &&
    !name.includes("activity")
  )
    return Star;
  if (name.includes("tour") && name.includes("review")) return Star;
  if (
    name.includes("tour") &&
    !name.includes("upcoming") &&
    !name.includes("completed") &&
    !name.includes("cancelled") &&
    !name.includes("requested") &&
    !name.includes("pending")
  )
    return MapPin;
  if (name.includes("upcoming") && name.includes("tour")) return Calendar;
  if (name.includes("user") && name.includes("benefit")) return Gift;
  if (name.includes("wallet")) return Wallet;
  if (name.includes("wish")) return Heart;

  // Generic matches
  if (name.includes("account")) return User;
  if (name.includes("home") || name.includes("dashboard")) return Home;
  if (name.includes("setting") || name.includes("preference")) return Settings;
  if (name.includes("alert")) return AlertCircle;
  if (name.includes("payment") || name.includes("card")) return CreditCard;
  if (name.includes("document") || name.includes("file")) return FileText;
  if (name.includes("help") || name.includes("support") || name.includes("faq"))
    return HelpCircle;
  if (name.includes("admin") || name.includes("management")) return Shield;

  // Default
  return User;
};

// Touch gesture constants
const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels
const SWIPE_VELOCITY_THRESHOLD = 0.3; // Minimum swipe velocity

export default function Sidebar() {
  const [sidebarData, setSidebarData] = useState<SidebarItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchStartTime, setTouchStartTime] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const apiService = new UserProfileAPIService();
  const { user } = useAuth();

  // Responsive width handling
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);

      if (width < 768) {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      } else if (width < 1024) {
        setIsCollapsed(true);
        setIsMobileOpen(false);
      } else {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadSidebarData();
  }, []);

  // Add global touch handlers for swipe gestures
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
      setTouchStartTime(Date.now());
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (
        touchStartX === null ||
        touchStartY === null ||
        touchStartTime === null
      )
        return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const deltaTime = touchEndTime - touchStartTime;
      const velocityX = deltaX / deltaTime;

      // Check if it's a horizontal swipe (not vertical scroll)
      if (
        Math.abs(deltaX) > Math.abs(deltaY) &&
        Math.abs(deltaX) > SWIPE_THRESHOLD
      ) {
        // Left to right swipe (open sidebar from left edge)
        if (
          deltaX > 0 &&
          touchStartX < 50 &&
          Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD &&
          !isMobileOpen
        ) {
          setIsMobileOpen(true);
        }
        // Right to left swipe (close sidebar)
        else if (
          deltaX < 0 &&
          Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD &&
          isMobileOpen
        ) {
          setIsMobileOpen(false);
        }
      }

      setTouchStartX(null);
      setTouchStartY(null);
      setTouchStartTime(null);
    };

    // Only add swipe gestures for mobile
    if (isMobile) {
      document.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, isMobileOpen, touchStartX, touchStartY, touchStartTime]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).closest("[data-sidebar-exclude]") === null
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isMobileOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isMobileOpen]);

  // Filter sidebar data based on user privileges
  const filteredSidebarData = useMemo(() => {
    if (!user || !user.privileges) return [];

    const filterItems = (items: SidebarItem[]): SidebarItem[] => {
      return items
        .filter((item) => {
          const hasAccess = checkPrivilege(item.privilegeName, user.privileges);

          if (item.children && item.children.length > 0) {
            const filteredChildren = filterItems(item.children);
            return hasAccess || filteredChildren.length > 0;
          }

          return hasAccess;
        })
        .map((item) => {
          const newItem = { ...item };
          if (item.children && item.children.length > 0) {
            newItem.children = filterItems(item.children);
          }
          return newItem;
        });
    };

    return filterItems(sidebarData);
  }, [sidebarData, user]);

  // Set active item based on current path
  useEffect(() => {
    if (filteredSidebarData.length > 0 && pathname) {
      const findActiveItem = (items: SidebarItem[]): SidebarItem | null => {
        for (const item of items) {
          if (item.url && pathname.includes(item.url)) {
            return item;
          }
          if (item.children) {
            const childActive = findActiveItem(item.children);
            if (childActive) return childActive;
          }
        }
        return null;
      };

      const active = findActiveItem(filteredSidebarData);
      if (active) {
        setActiveItem(active.id);
        if (active.parentId) {
          setExpandedItems((prev) => new Set(prev).add(active.parentId!));
        }
      } else if (
        pathname === USER_PROFILE_PAGE_PATH ||
        pathname === USER_PROFILE_USER_PAGE_PATH
      ) {
        const profileItem = filteredSidebarData.find(
          (item) => item.name === "Profile",
        );
        if (profileItem) {
          setActiveItem(profileItem.id);
        }
      }
    }
  }, [pathname, filteredSidebarData]);

  const loadSidebarData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getSidebarData();
      setSidebarData(response.data);
    } catch (err) {
      setError("Failed to load sidebar data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = useCallback(
    (itemId: number, event?: React.MouseEvent) => {
      if (event) event.stopPropagation();
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    },
    [],
  );

  const handleItemClick = useCallback(
    async (item: SidebarItem) => {
      if (
        !user?.privileges ||
        !checkPrivilege(item.privilegeName, user.privileges)
      ) {
        return;
      }

      setActiveItem(item.id);

      if (isMobile) {
        setIsMobileOpen(false);
      }

      if (item.url) {
        const route = `${USER_PROFILE_PAGE_PATH}${item.url}`;
        router.push(route);
      } else {
        const routeName = item.name.toLowerCase().replace(/\s+/g, "-");
        router.push(`${USER_PROFILE_PAGE_PATH}/${routeName}`);
      }
    },
    [router, isMobile, user],
  );

  const handleArrowClick = useCallback(
    (item: SidebarItem, event: React.MouseEvent) => {
      event.stopPropagation();
      toggleExpanded(item.id, event);
    },
    [toggleExpanded],
  );

  const toggleDesktopSidebar = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeItem === item.id;
    const Icon = getIcon(item.name);
    const paddingLeft = isCollapsed ? "16px" : `${level * 20 + 16}px`;

    const hasAccess = user?.privileges
      ? checkPrivilege(item.privilegeName, user.privileges)
      : false;

    const getItemColor = () => {
      if (!hasAccess) return "#A0AEC0";

      if (level === 0) {
        return isActive
          ? THEME.seaBlue.DEFAULT
          : isHovered && !isCollapsed
            ? THEME.seaBlue.dark
            : "#4A5568";
      } else {
        return isActive ? THEME.seaGreen.DEFAULT : "#718096";
      }
    };

    const getBgColor = () => {
      if (!hasAccess) return "transparent";

      if (isActive) {
        return level === 0 ? THEME.seaBlue.light : THEME.seaGreen.light;
      }
      return "transparent";
    };

    const getBorderColor = () => {
      if (!hasAccess) return "transparent";

      if (isActive) {
        return level === 0 ? THEME.seaBlue.DEFAULT : THEME.seaGreen.DEFAULT;
      }
      return "transparent";
    };

    if (!hasChildren && !hasAccess) return null;
    if (hasChildren && (!item.children || item.children.length === 0))
      return null;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center justify-between p-3 transition-all duration-300 ${
            hasAccess ? "cursor-pointer hover:shadow-sm" : "cursor-not-allowed"
          }`}
          style={{
            paddingLeft,
            backgroundColor: getBgColor(),
            borderRight: `4px solid ${getBorderColor()}`,
          }}
          onClick={() => hasAccess && handleItemClick(item)}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0 relative">
              <Icon
                size={isCollapsed ? 20 : 18}
                style={{ color: getItemColor() }}
                className="transition-colors duration-300"
              />
              {!hasAccess && !isCollapsed && (
                <div className="absolute -top-1 -right-1">
                  <Lock size={10} className="text-gray-400" />
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium transition-colors duration-300 truncate ${
                      isActive ? "font-semibold" : ""
                    } ${!hasAccess ? "opacity-60" : ""}`}
                    style={{ color: getItemColor() }}
                  >
                    {item.name}
                  </span>
                  {!hasAccess && (
                    <Lock
                      size={12}
                      className="text-gray-400 ml-2 flex-shrink-0"
                    />
                  )}
                </div>
                {item.description && (
                  <p
                    className={`text-xs mt-0.5 truncate ${!hasAccess ? "opacity-50" : "opacity-75"}`}
                    style={{ color: getItemColor() }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {!isCollapsed && hasChildren && hasAccess && (
            <button
              onClick={(e) => handleArrowClick(item, e)}
              className={`flex-shrink-0 ml-2 p-1 rounded transition-all duration-200 ${
                isExpanded
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-400"
              }`}
            >
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isExpanded ? "transform rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {!isCollapsed && hasChildren && isExpanded && (
          <div
            className="transition-all duration-300 overflow-hidden"
            style={{
              backgroundColor: "rgba(230, 243, 255, 0.3)",
              borderLeft: `2px solid ${THEME.seaBlue.light}`,
            }}
          >
            {item.children!.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return <SideBarLoading isCollapsed={isCollapsed} />;
  }

  // Error state
  if (error) {
    return (
      <div
        className="hidden md:block w-64 bg-white border-r border-blue-200 p-4 fixed md:sticky md:top-0 z-40"
        style={{ height: "100vh", maxHeight: "100vh" }}
      >
        <div className="text-center p-4 space-y-3">
          <div className="h-12 w-12 mx-auto rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
            <X className="text-red-500" size={24} />
          </div>
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={loadSidebarData}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No accessible items
  if (filteredSidebarData.length === 0) {
    return (
      <div
        className={`hidden md:block fixed md:sticky md:top-0 z-40 bg-white border-r border-blue-200 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
        style={{ height: "100vh", maxHeight: "100vh" }}
      >
        <div className="h-full flex flex-col items-center justify-center p-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mb-4">
            <Lock className="text-gray-400" size={24} />
          </div>
          {!isCollapsed && (
            <div className="text-center space-y-2">
              <h3 className="font-medium text-gray-700">No Access</h3>
              <p className="text-sm text-gray-500">
                You don&apos;t have access to any modules
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile arrow button - Always visible */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 h-16 w-6 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-r-lg flex items-center justify-center shadow-lg hover:w-8 transition-all duration-300 group md:hidden"
          aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isMobileOpen ? (
            <ChevronLeft size={18} className="group-hover:scale-110" />
          ) : (
            <ChevronRight size={18} className="group-hover:scale-110" />
          )}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container - FIXED HEIGHT AND POSITIONING */}
      <aside
        ref={sidebarRef}
        className={`
          fixed md:sticky md:top-0 z-50 bg-white border-r border-blue-200
          transition-all duration-300 ease-out
          ${isMobile ? (isMobileOpen ? "translate-x-0" : "-translate-x-full") : ""}
          ${isMobile ? "w-72" : isCollapsed ? "w-20" : "w-64"}
          shadow-2xl md:shadow-lg
          flex flex-col
        `}
        style={{
          transform: isMobile
            ? `translateX(${isMobileOpen ? "0" : "-100%"})`
            : "translateX(0)",
          height: "100vh",
          maxHeight: "100vh",
        }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-green-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0">
                <Image
                  alt="profile pic"
                  src={user?.imageUrl || USER_PLACE_HOLDER_IMAGE}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>

              {(!isCollapsed || isMobile) && (
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-gray-800 truncate">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            {isMobile && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-gray-600" />
              </button>
            )}

            {/* Desktop Collapse Button */}
            {!isMobile && !isCollapsed && (
              <button
                onClick={toggleDesktopSidebar}
                className="p-1 rounded hover:bg-blue-100 transition-colors duration-200"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={18} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content - PROPERLY CONFIGURED */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden py-4"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E0 transparent",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background-color: #cbd5e0;
              border-radius: 3px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background-color: #a0aec0;
            }
          `}</style>
          <nav className="space-y-1">
            {filteredSidebarData.map((item) => renderSidebarItem(item))}
          </nav>
        </div>

        {/* Expand button for collapsed desktop state */}
        {!isMobile && isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 h-10 w-6 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-r-lg flex items-center justify-center shadow-lg hover:w-8 transition-all duration-300 group"
            aria-label="Expand sidebar"
          >
            <ChevronRight
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        )}

        {/* Swipe hint for mobile */}
        {isMobile && isMobileOpen && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 animate-pulse pointer-events-none">
            <ChevronLeft size={20} />
          </div>
        )}
      </aside>
    </>
  );
}
