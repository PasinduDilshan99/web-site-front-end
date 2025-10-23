import React from "react";
import OverviewTab from "./OverviewTab";
import ActivitiesTab from "./ActivitiesTab";
import LocationTab from "./LocationTab";
import { DestinationData } from "@/types/destination-details-types";

interface DestinationTabsProps {
  destination: DestinationData;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DestinationTabs: React.FC<DestinationTabsProps> = ({
  destination,
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activities", label: "Activities" },
    { id: "location", label: "Location" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab destination={destination} />;
      case "activities":
        return <ActivitiesTab activities={destination.activities} />;
      case "location":
        return <LocationTab destination={destination} />;
      default:
        return <OverviewTab destination={destination} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">{renderTabContent()}</div>
    </div>
  );
};

export default DestinationTabs;
