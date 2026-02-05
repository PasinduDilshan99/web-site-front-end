import React from "react";
import OverviewTab from "./OverviewTab";
import ActivitiesTab from "./ActivitiesTab";
import LocationTab from "./LocationTab";
import { DestinationData } from "@/types/destination-types";

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
  <div className="border-b border-sky-100">
    <nav className="flex -mb-px">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-all duration-200 ${
            activeTab === tab.id
              ? "text-sky-600 border-b-2 border-gradient-to-r from-sky-500 to-teal-500 font-semibold bg-gradient-to-b from-sky-50/30 to-transparent"
              : "text-sky-800/70 hover:text-sky-600 hover:border-b-2 hover:border-sky-300 hover:bg-sky-50/20"
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
