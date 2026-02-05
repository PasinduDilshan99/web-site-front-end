import { Activity } from "@/types/destination-types";
import Link from "next/link";
import React from "react";

interface ActivitiesTabProps {
  activities: Activity[];
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ activities }) => {
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

  return (
    <div>
      <h3 className="text-lg lg:text-xl font-bold text-sky-900 mb-4">
        Activities ({activities.length})
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
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

            <p className="text-gray-600 mb-3 text-sm lg:text-md">{activity.activityDescription}</p>

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
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                {activity.minParticipate}-{activity.maxParticipate} people
              </div>
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatTime(activity.availableFrom)} -{" "}
                {formatTime(activity.availableTo)}
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
    </div>
  );
};

export default ActivitiesTab;