"use client";

import React, { useState } from "react";
import {
  Clock,
  DollarSign,
  Users,
  ThermometerSun,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Activity } from "@/types/sri-lankan-tour-types";
import ActivityDetails from "./ActivityDetails";

interface ActivityCardProps {
  activity: Activity;
  dayNumber: number;
  destinationId: number;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  formatCurrency: (amount: number) => string;
  formatTime: (time: string) => string;
  openImageModal: (
    imageUrl: string,
    title: string,
    description?: string,
    type?: "destination" | "activity",
    allImages?: Array<{ url: string; title: string; description?: string }>,
    initialIndex?: number,
  ) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  dayNumber,
  destinationId,
  isExpanded,
  onToggle,
  formatCurrency,
  formatTime,
  openImageModal,
}) => {
  const key = `${dayNumber}-${destinationId}-${activity.id}`;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 transition-all duration-300 hover:shadow-md">
      {/* Activity Header - Collapsible */}
      <button
        onClick={() => onToggle(key)}
        className="w-full p-3 sm:p-4 flex flex-col xs:flex-row xs:justify-between xs:items-center bg-gradient-to-r from-sky-50 to-white hover:from-sky-100 transition-all duration-300 group rounded-lg sm:rounded-xl"
      >
        {/* Left section - Activity info */}
        <div className="flex-1 text-left w-full xs:w-auto mb-3 xs:mb-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <h6 className="font-semibold text-sky-900 group-hover:text-sky-700 transition-colors duration-300 text-base sm:text-lg line-clamp-1 sm:line-clamp-none">
              {activity.name}
            </h6>
            <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full transition-transform duration-300 group-hover:scale-105 w-fit">
              {activity.categoryName}
            </span>
          </div>

          {/* Activity stats - Responsive grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-sky-600 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700 truncate">
                {activity.durationHours} hour
                {activity.durationHours !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Uncomment if needed */}
            {/* <div className="flex items-center gap-2">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700 truncate">
                {formatCurrency(activity.priceLocal)}
              </span>
            </div> */}

            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700 truncate">
                {activity.minParticipate}-{activity.maxParticipate} people
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ThermometerSun className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700 truncate">
                {activity.season.split(",").length} season
                {activity.season.split(",").length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Right section - Expand/collapse button */}
        <div className="flex items-center justify-between xs:justify-end gap-2 w-full xs:w-auto">
          {/* Optional: Mobile-only quick stats */}
          <div className="flex items-center gap-3 xs:hidden">
            <div className="text-xs text-sky-600">
              {activity.durationHours}h
            </div>
            <div className="text-xs text-teal-600">
              {activity.minParticipate}-{activity.maxParticipate}p
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-sky-700 transition-colors duration-300 group-hover:text-sky-600 hidden sm:inline">
              {isExpanded ? "Show Less" : "Show Details"}
            </span>
            <div className="transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-sky-200 rounded-lg group-hover:border-sky-300">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 group-hover:text-sky-600 transition-colors duration-300" />
              ) : (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 group-hover:text-sky-600 transition-colors duration-300" />
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Activity Details */}
      <ActivityDetails
        activity={activity}
        isExpanded={isExpanded}
        formatCurrency={formatCurrency}
        formatTime={formatTime}
        openImageModal={openImageModal}
      />
    </div>
  );
};

export default ActivityCard;