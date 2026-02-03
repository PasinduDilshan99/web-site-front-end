"use client";

import React from "react";
import { DayDetails } from "@/types/sri-lankan-tour-types";
import DestinationCard from "./DestinationCard";
import AccommodationsSection from "./AccommodationsSection";

interface DayContentProps {
  day: DayDetails;
  isActivityExpanded: (
    dayNumber: number,
    destinationId: number,
    activityId: number,
  ) => boolean;
  toggleActivity: (
    dayNumber: number,
    destinationId: number,
    activityId: number,
  ) => void;
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

const DayContent: React.FC<DayContentProps> = ({
  day,
  isActivityExpanded,
  toggleActivity,
  formatCurrency,
  formatTime,
  openImageModal,
}) => {
  return (
    <div className="space-y-8">
      {/* Destinations Section */}
      <div className="space-y-6">
        <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-6">
          Destinations & Activities
        </h3>
        {day.destinations.map((destinationWithActivities, idx) => (
          <DestinationCard
            key={destinationWithActivities.destination.destinationId}
            destinationWithActivities={destinationWithActivities}
            dayNumber={day.dayNumber}
            index={idx}
            formatCurrency={formatCurrency}
            formatTime={formatTime}
            openImageModal={openImageModal}
            isActivityExpanded={isActivityExpanded}
            toggleActivity={toggleActivity}
          />
        ))}
      </div>
      {/* Accommodations Section */}
      <AccommodationsSection accommodations={day.accommodations} />
    </div>
  );
};

export default DayContent;
