import React from 'react';

export type VehicleTab = 'overview' | 'specifications' | 'usage' | 'images';

interface VehicleTabsProps {
  activeTab: VehicleTab;
  onTabChange: (tab: VehicleTab) => void;
}

const VehicleTabs: React.FC<VehicleTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: VehicleTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'specifications', label: 'Specifications', icon: '⚙️' },
    { id: 'usage', label: 'Usage History', icon: '📈' },
    { id: 'images', label: 'Gallery', icon: '🖼️' },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default VehicleTabs;