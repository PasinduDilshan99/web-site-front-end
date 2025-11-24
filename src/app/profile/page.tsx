// pages/UserProfile.tsx
"use client"
import Sidebar from '@/components/user-profile-components/Sidebar';
import UserProfileContent from '@/components/user-profile-components/UserProfileContent';
import { useState, useEffect } from 'react';

export default function UserProfile() {
  const [activeContent, setActiveContent] = useState<any>(null);
  const [activeTitle, setActiveTitle] = useState<string>('Profile');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleContentChange = (content: any, title: string) => {
    setActiveContent(content);
    setActiveTitle(title);
  };

  const renderContent = () => {
    if (activeTitle === 'Profile') {
      return <UserProfileContent profileData={activeContent} />;
    }

    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {activeTitle}
            </h1>
            <p className="text-gray-600 mb-6">Manage your {activeTitle.toLowerCase()} settings</p>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(activeContent, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-25 via-white to-purple-25">
      {/* Your existing Navbar would go here */}
      
      <div className="flex relative">
        <Sidebar onContentChange={handleContentChange} />
        {renderContent()}
      </div>
      
      {/* Your existing Footer would go here */}
    </div>
  );
}