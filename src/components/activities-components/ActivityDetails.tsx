import { ActivityData } from "@/types/activity-types";
import React from "react";

interface ActivityDetailsProps {
  activity: ActivityData;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activity }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      ACTIVE: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      UPCOMING: "bg-sky-100 text-sky-800 border border-sky-200",
      COMPLETED: "bg-gray-100 text-gray-800 border border-gray-200",
      CANCELLED: "bg-red-100 text-red-800 border border-red-200",
    };
    return colors[status as keyof typeof colors] || colors.ACTIVE;
  };

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
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl lg:text-3xl font-bold text-gray-900">
            {activity.name}
          </h1>
        </div>
        {/* <span
          className={`px-4 py-2 rounded-full text-xs lg:text-sm font-bold ${getStatusColor(
            activity.status
          )}`}
        >
          {activity.status}
        </span> */}
      </div>

      <p className="text-gray-600 text-sm lg:text-lg leading-relaxed">
        {activity.description}
      </p>

      {/* Price Section */}
      {/* <div className="mt-6 p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl border border-sky-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                ${activity.price_foreigners}
              </span>
              <span className="text-gray-600">per person (foreign)</span>
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-xl font-bold text-gray-800">
                ${activity.price_local}
              </span>
              <span className="text-gray-600">per person (local)</span>
            </div>
          </div>
          <button className="bg-gradient-to-r from-sky-500 to-teal-600 hover:from-sky-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
            Book Now
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ActivityDetails;
