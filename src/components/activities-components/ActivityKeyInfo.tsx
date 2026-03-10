import { ActivityData } from "@/types/activity-types";
import React from "react";

interface ActivityKeyInfoProps {
  activity: ActivityData;
}

const ActivityKeyInfo: React.FC<ActivityKeyInfoProps> = ({ activity }) => {
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6">
      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-1.5 sm:mr-2"></span>
        Key Information
      </h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-sky-50 rounded-lg border border-sky-100 hover:shadow-md transition-shadow duration-200">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-sky-600 text-sm sm:text-base">⏱️</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              Duration
            </p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {activity.duration_hours}{" "}
              {activity.duration_hours === 1 ? "hour" : "hours"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-teal-50 rounded-lg border border-teal-100 hover:shadow-md transition-shadow duration-200">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-teal-600 text-sm sm:text-base">👥</span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              Group Size
            </p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {activity.max_participate === 0
                ? "Any"
                : `${activity.min_participate}-${activity.max_participate}`}
              <span className="hidden xs:inline">
                {activity.max_participate === 0 ? " Participants" : " People"}
              </span>
            </p>
          </div>
        </div>

        {/* Uncomment and update the time section if needed */}
        {/* <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-cyan-50 rounded-lg border border-cyan-100 hover:shadow-md transition-shadow duration-200 col-span-1 xs:col-span-2 lg:col-span-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-cyan-600 text-sm sm:text-base">🕒</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-600 truncate">Available</p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
              {formatTime(activity.available_from)} - {formatTime(activity.available_to)}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ActivityKeyInfo;
