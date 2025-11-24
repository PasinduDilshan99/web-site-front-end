// components/Sidebar.tsx
"use client"
import { ApiService } from '@/services/apiService';
import { SidebarItem } from '@/types/sidebar';
import { useState, useEffect } from 'react';

interface SidebarProps {
  onContentChange: (content: any, title: string) => void;
}

export default function Sidebar({ onContentChange }: SidebarProps) {
  const [sidebarData, setSidebarData] = useState<SidebarItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiService = new ApiService();

  useEffect(() => {
    loadSidebarData();
  }, []);

  const loadSidebarData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getSidebarData();
      setSidebarData(response.data);
      
      // Auto-select Profile tab by default
      const profileItem = response.data.find(item => item.name === 'Profile');
      if (profileItem) {
        setActiveItem(profileItem.id);
        handleItemClick(profileItem);
      }
    } catch (err) {
      setError('Failed to load sidebar data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (itemId: number) => {
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
    
    // If item has children, toggle expand instead of fetching content
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
      return;
    }

    // If item has a URL, fetch the content
    if (item.url) {
      try {
        const content = await apiService.fetchContentByUrl(item.url);
        onContentChange(content, item.name);
      } catch (err) {
        console.error(`Failed to load content for ${item.name}:`, err);
        onContentChange({ error: `Failed to load ${item.name}` }, item.name);
      }
    } else {
      // For items without URL, show a placeholder or handle accordingly
      onContentChange({ message: `No content available for ${item.name}` }, item.name);
    }
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeItem === item.id;
    const paddingLeft = level * 20 + 16;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center justify-between p-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100 ${
            isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${
              isActive ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {item.name}
            </span>
          </div>
          
          {hasChildren && (
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'transform rotate-180' : ''
              } ${isActive ? 'text-blue-500' : 'text-gray-400'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="bg-gray-50">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 h-screen p-4">
        <div className="animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 h-screen p-4">
        <div className="text-red-500 text-center p-4">
          {error}
          <button
            onClick={loadSidebarData}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">User Profile</h2>
      </div>
      
      <nav className="py-2">
        {sidebarData.map(item => renderSidebarItem(item))}
      </nav>
    </div>
  );
}