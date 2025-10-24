import { ActivityData } from "@/types/activities-types";
import React from "react";

interface ActivityHeaderProps {
  activity: ActivityData;
}

const ActivityHeader: React.FC<ActivityHeaderProps> = ({ activity }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Activities</span>
          <span className="text-gray-400">/</span>
          <span className="text-amber-600 font-medium">{activity.name}</span>
        </nav>
      </div>
    </div>
  );
};

export default ActivityHeader;
