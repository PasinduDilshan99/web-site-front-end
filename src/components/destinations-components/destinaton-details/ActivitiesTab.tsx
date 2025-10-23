import { Activity } from "@/types/destination-details-types";
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
          return "bg-yellow-100 text-yellow-800";
        case "Winter":
          return "bg-blue-100 text-blue-800";
        case "Spring":
          return "bg-green-100 text-green-800";
        case "Autumn":
          return "bg-orange-100 text-orange-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Activities ({activities.length})
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.activityId}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-semibold text-gray-900">
                {activity.activityName}
              </h4>
              <div className="flex space-x-2">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                  {activity.activitiesCategory}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-3">{activity.activityDescription}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 text-amber-500"
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
                  className="w-4 h-4 mr-2 text-purple-500"
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
                  className="w-4 h-4 mr-2 text-green-500"
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
              <div className="flex space-x-4">
                <div>
                  <span className="text-sm text-gray-500">Local</span>
                  <p className="font-semibold text-amber-600">
                    LKR {activity.priceLocal.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Foreigners</span>
                  <p className="font-semibold text-purple-600">
                    LKR {activity.priceForeigners.toLocaleString()}
                  </p>
                </div>
              </div>

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesTab;
