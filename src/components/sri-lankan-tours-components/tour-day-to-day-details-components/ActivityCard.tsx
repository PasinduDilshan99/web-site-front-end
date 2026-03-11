"use client";

import React from "react";
import {
  Clock,
  DollarSign,
  Users,
  ThermometerSun,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ActivityDetails from "./ActivityDetails";
import { Activity } from "@/types/tour-types";

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
    <div className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 transition-all duration-300 hover:shadow-md">
      {/* Activity Header - Collapsible */}
      <button
        onClick={() => onToggle(key)}
        className="cursor-pointer w-full p-2 sm:p-3 md:p-4 flex flex-col xs:flex-row xs:justify-between xs:items-center bg-gradient-to-r from-sky-50 to-white hover:from-sky-100 transition-all duration-300 group rounded-lg sm:rounded-xl"
      >
        {/* Left section - Activity info */}
        <div className="flex-1 text-left w-full xs:w-auto mb-2 xs:mb-0">
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2">
            <h6 className="font-semibold text-sky-900 group-hover:text-sky-700 transition-colors duration-300 text-sm sm:text-base md:text-lg line-clamp-1">
              {activity.name}
            </h6>
            <span className="px-1.5 sm:px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] sm:text-xs font-medium rounded-full transition-transform duration-300 group-hover:scale-105 w-fit">
              {activity.categoryName}
            </span>
          </div>

          {/* Activity stats - Responsive grid */}
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-1 sm:gap-2 md:gap-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-sky-600 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 truncate">
                {activity.durationHours}h
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-teal-600 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 truncate">
                {activity.maxParticipate === 0
                  ? "Any"
                  : `${activity.minParticipate}-${activity.maxParticipate}`}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <ThermometerSun className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-amber-600 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 truncate">
                {activity.season.split(",").length}s
              </span>
            </div>

            <div className="flex items-center justify-end xs:justify-start gap-1 sm:gap-2">
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-sky-700 transition-colors duration-300 group-hover:text-sky-600 hidden sm:inline">
                {isExpanded ? "Less" : "More"}
              </span>
              <div className="transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-white border border-sky-200 rounded-md sm:rounded-lg group-hover:border-sky-300">
                {isExpanded ? (
                  <ChevronUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-sky-500 group-hover:text-sky-600 transition-colors duration-300" />
                ) : (
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-sky-500 group-hover:text-sky-600 transition-colors duration-300" />
                )}
              </div>
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