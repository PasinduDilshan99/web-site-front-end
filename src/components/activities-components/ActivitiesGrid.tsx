"use client";
import React from "react";
import ActivityCard from "./ActivityCard";
import { ActiveActivitiesType } from "@/types/activities-types";

interface ActivitiesGridProps {
  activities: ActiveActivitiesType[];
  displayCount: number;
}

const ActivitiesGrid: React.FC<ActivitiesGridProps> = ({
  activities,
  displayCount,
}) => {
  const displayedActivities = activities.slice(0, displayCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {displayedActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Display Count Info */}
      <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
        Showing {displayedActivities.length} of {activities.length} activities
      </div>
    </>
  );
};

export default ActivitiesGrid;
