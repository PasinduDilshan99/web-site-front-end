// pages/UserProfile.tsx
"use client"
import Sidebar from '@/components/user-profile-components/Sidebar';
import UserProfileContent from '@/components/user-profile-components/UserProfileContent';
import { useState } from 'react';

export default function UserProfile() {
  const [activeContent, setActiveContent] = useState<any>(null);
  const [activeTitle, setActiveTitle] = useState<string>('Profile');

  const handleContentChange = (content: any, title: string) => {
    setActiveContent(content);
    setActiveTitle(title);
  };

  const renderContent = () => {
    if (activeTitle === 'Profile') {
      return <UserProfileContent profileData={activeContent} />;
    }

    // For other sections, you can create similar components
    return (
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{activeTitle}</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <pre className="text-sm text-gray-700">
            {JSON.stringify(activeContent, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your existing Navbar would go here */}
      
      <div className="flex">
        <Sidebar onContentChange={handleContentChange} />
        {renderContent()}
      </div>
      
      {/* Your existing Footer would go here */}
    </div>
  );
}