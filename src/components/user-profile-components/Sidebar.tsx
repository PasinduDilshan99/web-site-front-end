// components/Sidebar.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { SidebarItem } from '@/types/sidebar';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SidebarProps {
  onContentChange?: (content: any, title: string) => void;
}

export default function Sidebar({ onContentChange }: SidebarProps) {
  const [sidebarData, setSidebarData] = useState<SidebarItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const apiService = new UserProfileAPIService();

  useEffect(() => {
    loadSidebarData();
  }, []);

  // Set active item based on current path
  useEffect(() => {
    if (sidebarData.length > 0) {
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

      const active = findActiveItem(sidebarData);
      if (active) {
        setActiveItem(active.id);
        
        // Expand parent if this is a child item
        if (active.parentId) {
          setExpandedItems(prev => new Set(prev).add(active.parentId!));
        }
      } else if (pathname === '/profile' || pathname === '/profile/user') {
        // Default to Profile
        const profileItem = sidebarData.find(item => item.name === 'Profile');
        if (profileItem) {
          setActiveItem(profileItem.id);
        }
      }
    }
  }, [pathname, sidebarData]);

  const loadSidebarData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getSidebarData();
      setSidebarData(response.data);
    } catch (err) {
      setError('Failed to load sidebar data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (itemId: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = async (item: SidebarItem) => {
    setActiveItem(item.id);
    
    // Close mobile sidebar when item is clicked
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }

    // Navigate to the item's URL (always navigate when clicking the item itself)
    if (item.url) {
      const route = `/profile${item.url}`;
      router.push(route);
    } else {
      // For items without URL, use name-based routing as fallback
      const routeName = item.name.toLowerCase().replace(/\s+/g, '-');
      
      // Special handling for review sub-items
      if (item.parentId === 2) { // Reviews parent ID
        router.push(`/profile/${routeName}`);
      } else {
        router.push(`/profile/${routeName}`);
      }
    }
  };

  const handleArrowClick = (item: SidebarItem, event: React.MouseEvent) => {
    event.stopPropagation();
    toggleExpanded(item.id, event);
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeItem === item.id;
    const paddingLeft = level * 20 + 16;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center justify-between p-3 cursor-pointer transition-all duration-300 hover:bg-amber-50 hover:border-r-4 hover:border-purple-500 hover:shadow-sm ${
            isActive 
              ? 'bg-gradient-to-r from-amber-50 to-purple-50 border-r-4 border-purple-600 shadow-md' 
              : 'bg-white border-r-4 border-transparent'
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isActive ? 'bg-purple-600' : 'bg-amber-400'
            }`}></div>
            <span className={`text-sm font-semibold transition-colors duration-300 truncate ${
              isActive ? 'text-purple-700' : 'text-gray-700 hover:text-amber-600'
            }`}>
              {item.name}
            </span>
          </div>
          
          {hasChildren && (
            <button
              onClick={(e) => handleArrowClick(item, e)}
              className={`flex-shrink-0 ml-2 p-1 rounded transition-all duration-200 hover:bg-amber-100 ${
                isExpanded ? 'text-purple-600' : 'text-amber-500'
              }`}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="bg-gradient-to-br from-amber-25 to-purple-25">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Mobile toggle button
  const MobileToggleButton = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="md:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );

  if (loading) {
    return (
      <>
        <MobileToggleButton />
        <div className="w-64 bg-white border-r border-amber-200 h-screen p-4 fixed md:relative z-40">
          <div className="animate-pulse">
            <div className="h-6 bg-gradient-to-r from-amber-200 to-purple-200 rounded mb-4"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gradient-to-r from-amber-100 to-purple-100 rounded mb-2"></div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MobileToggleButton />
        <div className="w-64 bg-white border-r border-amber-200 h-screen p-4 fixed md:relative z-40">
          <div className="text-red-500 text-center p-4">
            {error}
            <button
              onClick={loadSidebarData}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileToggleButton />
      
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
      
      <div className={`
        w-64 bg-gradient-to-b from-amber-50 to-purple-50 border-r border-amber-200 h-screen overflow-y-auto 
        fixed md:relative z-40 transform transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b border-amber-200 bg-gradient-to-r from-amber-500 to-purple-600">
          <h2 className="text-lg font-bold text-white">User Profile</h2>
          <p className="text-amber-100 text-sm">Manage your account</p>
        </div>
        
        <nav className="py-2">
          {sidebarData.map(item => renderSidebarItem(item))}
        </nav>

        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white hover:text-amber-200 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}