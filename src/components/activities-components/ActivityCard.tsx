"use client";
import React from "react";
import ActivityImageSlideshow from "./ActivityImageSlideshow";
import { ActiveActivitiesType } from "@/types/activity-types";
import { useRouter } from "next/navigation";

interface ActivityCardProps {
  activity: ActiveActivitiesType;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const router = useRouter();
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      ACTIVE: "bg-green-100 text-green-800 border border-green-200",
      UPCOMING: "bg-sky-100 text-sky-800 border border-sky-200",
      COMPLETED: "bg-gray-100 text-gray-800 border border-gray-200",
      CANCELLED: "bg-red-100 text-red-800 border border-red-200",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border border-gray-200"
    );
  };

  const handleBookNow = () => {
    router.push(`/activities/${activity.id}`);
  };

  // Parse seasons
  const getSeasonBadges = (seasonString: string) => {
    return seasonString.split(",").map((s) => s.trim());
  };

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-sky-100">
      {/* Activity Image Slideshow */}
      <div className="relative">
        <ActivityImageSlideshow
          images={activity.images}
          activityName={activity.name}
        />

        {/* Category Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-sky-600/90 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          {activity.category_name}
        </div>

        {/* Status Badge */}
        {/* <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span
            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
              activity.status
            )}`}
          >
            {activity.status}
          </span>
        </div> */}

        {/* Price Badge */}
        {/* <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                ${activity.price_foreigners}
              </span>
              <span className="text-xs text-gray-600 ml-1">foreign</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                ${activity.price_local}
              </span>
              <span className="text-xs text-gray-600 ml-1">local</span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Activity Content */}
      <div className="p-3 sm:p-4 md:p-6">
        {/* Activity Title and Description */}
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-sky-900 mb-1 sm:mb-2 line-clamp-1">
          {activity.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {activity.description}
        </p>

        {/* Key Information Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-sky-600 flex-shrink-0"
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
            <span className="text-xs sm:text-sm font-medium text-sky-800">
              {activity.duration_hours} hours
            </span>
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
              {activity.min_participate}-{activity.max_participate}
            </span>
          </div>
        </div>

        {/* Seasons */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-sky-900">
              Best Seasons
            </span>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {getSeasonBadges(activity.season).map((season, idx) => (
              <span
                key={idx}
                className="bg-amber-100 text-amber-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs"
              >
                {season}
              </span>
            ))}
          </div>
        </div>

        {/* Requirements */}
        {/* {activity.requirements.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-sky-900">
                Requirements
              </span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {activity.requirements.slice(0, 2).map((req) => (
                <span
                  key={req.id}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${req.color}20`,
                    color: req.color,
                  }}
                >
                  {req.name}: {req.value}
                </span>
              ))}
              {activity.requirements.length > 2 && (
                <span className="bg-sky-100 text-sky-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                  +{activity.requirements.length - 2} more
                </span>
              )}
            </div>
          </div>
        )} */}

        {/* Schedules */}
        {/* {activity.schedules.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-sky-600 flex-shrink-0"
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
              <span className="text-xs sm:text-sm font-semibold text-sky-900">
                Schedules
              </span>
            </div>
            <div className="space-y-1 sm:space-y-2">
              {activity.schedules.slice(0, 1).map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-sky-50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm"
                >
                  <div className="font-medium text-sky-900">
                    {schedule.name}
                  </div>
                  <div className="text-sky-600 text-xs">
                    {formatDate(schedule.assume_start_date)} -{" "}
                    {formatDate(schedule.assume_end_date)}
                  </div>
                  {schedule.special_note && (
                    <div className="text-sky-600 text-xs mt-1">
                      💡 {schedule.special_note}
                    </div>
                  )}
                </div>
              ))}
              {activity.schedules.length > 1 && (
                <div className="text-center text-xs text-sky-500">
                  +{activity.schedules.length - 1} more schedules
                </div>
              )}
            </div>
          </div>
        )} */}

        {/* Availability Times */}
        {/* <div className="mb-3 sm:mb-4 bg-sky-50 rounded-lg p-2 sm:p-3">
          <div className="text-xs sm:text-sm text-sky-700">
            <span className="font-semibold">Available:</span>{" "}
            {activity.available_from} - {activity.available_to}
          </div>
        </div> */}

        {/* Action Button */}
        <button
          onClick={handleBookNow}
          className="w-full bg-gradient-to-r from-sky-600 to-teal-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:from-sky-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base shadow-md hover:shadow-lg"
        >
          More Details
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;