import { Activity } from "@/types/destination-types";
import Link from "next/link";
import React, { useState } from "react";

interface ActivitiesTabProps {
  activities: Activity[];
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ activities }) => {
  const [displayCount, setDisplayCount] = useState(6);
  const initialLoadCount = 6;
  const loadMoreCount = 6;

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  const getSeasonColors = (season: string) => {
    const seasons = season.split(",");
    return seasons.map((season) => {
      const trimmed = season.trim();
      switch (trimmed) {
        case "Summer":
          return "bg-gradient-to-r from-sky-100 to-teal-100 text-sky-800 border border-sky-200";
        case "Winter":
          return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200";
        case "Spring":
          return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200";
        case "Autumn":
          return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200";
        default:
          return "bg-gray-100 text-gray-800 border border-gray-200";
      }
    });
  };

  const handleLoadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + loadMoreCount, activities.length));
  };

  const displayedActivities = activities.slice(0, displayCount);
  const hasMoreActivities = displayCount < activities.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg lg:text-xl font-bold text-sky-900">
          Activities ({activities.length})
        </h3>
        {activities.length > initialLoadCount && (
          <span className="text-sm text-gray-600">
            Showing {displayedActivities.length} of {activities.length}
          </span>
        )}
      </div>
      
      <div className="space-y-4">
        {displayedActivities.map((activity) => (
          <div
            key={activity.activityId}
            className="border border-sky-100 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-sky-50"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-md lg:text-lg font-semibold text-gray-900">
                {activity.activityName}
              </h4>
              <div className="flex space-x-2">
                <span className="text-xs lg:text-sm bg-gradient-to-r from-sky-100 to-teal-100 text-sky-800 px-2 py-1 rounded font-medium border border-sky-200">
                  {activity.activitiesCategory}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-3 text-sm lg:text-md">
              {activity.activityDescription}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 text-sky-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {activity.durationHours} hours
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <span className="text-xs sm:text-sm font-medium text-teal-800">
                  {activity.maxParticipate === 0
                    ? "Any"
                    : `${activity.minParticipate}-${activity.maxParticipate}`}
                </span>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <div className="flex space-x-1">
                {activity.season.split(",").map((season, index) => (
                  <span
                    key={season}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      getSeasonColors(activity.season)[index]
                    }`}
                  >
                    {season.trim()}
                  </span>
                ))}
              </div>
              <Link
                href={`/activities/${activity.activityId}`}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-medium rounded-md hover:from-sky-600 hover:to-teal-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreActivities && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-medium rounded-md hover:from-sky-600 hover:to-teal-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
          >
            More Activities
          </button>
        </div>
      )}

      {/* Show All Loaded Message */}
      {!hasMoreActivities && activities.length > initialLoadCount && (
        <div className="mt-6 text-center text-sm text-gray-500">
          All {activities.length} activities loaded
        </div>
      )}
    </div>
  );
};

export default ActivitiesTab;