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
    initialIndex?: number
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
        className="w-full p-4 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-all duration-300 group"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-3 mb-2">
            <h6 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
              {activity.name}
            </h6>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full transition-transform duration-300 group-hover:scale-105">
              {activity.categoryName}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm text-gray-700">
                {activity.durationHours} hours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm text-gray-700">
                {formatCurrency(activity.priceLocal)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm text-gray-700">
                {activity.minParticipate}-{activity.maxParticipate} people
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ThermometerSun className="w-4 h-4 text-orange-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm text-gray-700">
                {activity.season.split(",").length} seasons
              </span>
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-purple-700">
            {isExpanded ? "Show Less" : "Show Details"}
          </span>
          <div className="transition-all duration-300 transform group-hover:scale-110">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors duration-300" />
            )}
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