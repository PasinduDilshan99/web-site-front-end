import { ActivityData } from "@/types/activities-types";
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
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2"></span>
        Key Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-sky-50 rounded-lg border border-sky-100">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
            <span className="text-sky-600 font-bold">⏱️</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-gray-900">
              {activity.duration_hours} hours
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg border border-teal-100">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
            <span className="text-teal-600 font-bold">👥</span>
          </div>

          <div>
            <p className="text-sm text-gray-600">Group Size</p>

            <p className="font-semibold text-gray-900">
              {activity.max_participate === 0
                ? "Unlimited people"
                : `${activity.min_participate}-${activity.max_participate} people`}
            </p>
          </div>
        </div>

        {/* <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-lg border border-cyan-100">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center">
            <span className="text-cyan-600 font-bold">🕒</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Available</p>
            <p className="font-semibold text-gray-900">
              {formatTime(activity.available_from)} -{" "}
              {formatTime(activity.available_to)}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ActivityKeyInfo;
