"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Maximize2, TrendingUp } from "lucide-react";
import ActivityCard from "./ActivityCard";
import { DestinationWithActivities } from "@/types/tour-types";

interface DestinationCardProps {
  destinationWithActivities: DestinationWithActivities;
  dayNumber: number;
  index: number;
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
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destinationWithActivities,
  dayNumber,
  index,
  formatCurrency,
  formatTime,
  openImageModal,
  isActivityExpanded,
  toggleActivity,
}) => {
  const { destination, activities } = destinationWithActivities;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Destination Header */}
      <div className="p-4 sm:p-5 md:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-6">
          {/* Destination Image */}
          <div
            className="relative w-full sm:w-20 md:w-24 aspect-square rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group"
            onClick={() => {
              const images = destination.images.map((img) => ({
                url: img.imageUrl,
                title: img.imageName,
                description: img.imageDescription,
              }));
              openImageModal(
                destination.images[0]?.imageUrl || "",
                destination.destinationName,
                destination.destinationDescription,
                "destination",
                images,
                0,
              );
            }}
          >
            {destination.images[0]?.imageUrl ? (
              <Image
                src={destination.images[0].imageUrl}
                alt={destination.images[0].imageName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 20vw, 96px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center">
                <Maximize2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Destination Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
              {/* Left section - Destination info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between sm:block">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-900 mb-1 sm:mb-2 truncate">
                    {destination.destinationName}
                  </h4>
                  {/* Mobile-only destination number */}
                  <div className="sm:hidden flex items-center gap-2">
                    <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full">
                      {destination.category}
                    </span>
                    <div className="text-sm font-bold text-sky-600">
                      #{index + 1}
                    </div>
                  </div>
                </div>

                {/* Location and category */}
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mb-2 sm:mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{destination.location}</span>
                  </div>
                  {/* Desktop category badge */}
                  <span className="hidden sm:inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105">
                    {destination.category}
                  </span>
                </div>
              </div>

              {/* Right section - Desktop destination number */}
              <div className="hidden sm:flex flex-col items-end text-right">
                <div className="text-xs sm:text-sm font-medium text-sky-500 mb-1">
                  Destination
                </div>
                <div className="text-lg sm:text-xl font-bold text-sky-600 transition-transform duration-300 hover:scale-110">
                  #{index + 1}
                </div>
              </div>
            </div>

            {/* Destination description */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-2 sm:mt-3 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
              {destination.destinationDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Destination Gallery */}
      {destination.images.length > 0 && (
        <div className="p-6 border-b border-gray-100">
          <h5 className="font-semibold text-sky-900 mb-4">Gallery</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destination.images.map((image, imageIdx) => (
              <div
                key={image.imageId}
                className="relative h-32 rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg"
                onClick={() => {
                  const images = destination.images.map((img) => ({
                    url: img.imageUrl,
                    title: img.imageName,
                    description: img.imageDescription,
                  }));
                  openImageModal(
                    image.imageUrl,
                    image.imageName,
                    image.imageDescription,
                    "destination",
                    images,
                    imageIdx,
                  );
                }}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.imageName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium truncate">
                      {image.imageName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activities Section */}
      {activities.length > 0 && (
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-teal-100 rounded-lg transition-transform duration-300 hover:scale-110">
              <TrendingUp className="w-5 h-5 text-teal-600" />
            </div>
            <h5 className="font-semibold text-sky-900">
              Available Activities ({activities.length})
            </h5>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                dayNumber={dayNumber}
                destinationId={destination.destinationId}
                isExpanded={isActivityExpanded(
                  dayNumber,
                  destination.destinationId,
                  activity.id,
                )}
                onToggle={(key) => {
                  const [dayNum, destId, actId] = key.split("-").map(Number);
                  toggleActivity(dayNum, destId, actId);
                }}
                formatCurrency={formatCurrency}
                formatTime={formatTime}
                openImageModal={openImageModal}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationCard;