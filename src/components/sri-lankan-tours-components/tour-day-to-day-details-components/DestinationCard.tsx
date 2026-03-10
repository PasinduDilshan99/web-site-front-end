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

  const destinationImages = destination.images.map((img) => ({
    url: img.imageUrl,
    title: img.imageName,
    description: img.imageDescription,
  }));

  return (
    <div 
      className="bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md sm:hover:shadow-lg mb-3 sm:mb-4"
      style={{ border: "1px solid #e0f4fb", boxShadow: "0 2px 12px rgba(11,126,168,0.06)" }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0B7EA8, #0E9E8E)" }} />

      {/* Destination Header */}
      <div className="p-3 sm:p-4 md:p-5 lg:p-6" style={{ borderBottom: "1px solid #f0f9ff" }}>
        <div className="flex flex-col xs:flex-row xs:items-start gap-3 sm:gap-4">
          {/* Destination Image - Responsive sizing */}
          <div
            className="relative w-full xs:w-20 sm:w-24 md:w-28 aspect-video xs:aspect-square rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group"
            onClick={() =>
              openImageModal(
                destination.images[0]?.imageUrl || "",
                destination.destinationName,
                destination.destinationDescription,
                "destination",
                destinationImages,
                0,
              )
            }
          >
            {destination.images[0]?.imageUrl ? (
              <Image
                src={destination.images[0].imageUrl}
                alt={destination.images[0].imageName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 25vw, 112px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
              >
                <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              {/* Left — name, location, description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 flex-wrap">
                  <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold truncate max-w-[200px] sm:max-w-none" style={{ color: "#095f82" }}>
                    {destination.destinationName}
                  </h4>
                  {/* Mobile index badge */}
                  <span className="sm:hidden text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
                  >
                    #{index + 1}
                  </span>
                </div>

                {/* Location + category */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" style={{ color: "#0B7EA8" }} />
                    <span className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]">{destination.location}</span>
                  </div>
                  <span
                    className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium"
                    style={{
                      background: "linear-gradient(135deg, rgba(11,126,168,0.08), rgba(14,158,142,0.08))",
                      border: "1px solid #b3e0f2",
                      color: "#095f82",
                    }}
                  >
                    {destination.category}
                  </span>
                </div>

                {/* Description - Truncate on mobile */}
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {destination.destinationDescription}
                </p>
              </div>

              {/* Desktop index badge */}
              <div className="hidden sm:flex flex-col items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
              >
                <span className="text-white text-xs sm:text-sm font-semibold leading-none">#{index + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery - Responsive grid */}
      {destination.images.length > 0 && (
        <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4" style={{ borderBottom: "1px solid #f0f9ff" }}>
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <div className="w-1 h-3 sm:h-4 rounded-full" style={{ background: "linear-gradient(180deg, #0B7EA8, #0E9E8E)" }} />
            <h5 className="text-xs sm:text-sm font-semibold" style={{ color: "#095f82" }}>Gallery</h5>
            <span className="text-[10px] sm:text-xs text-gray-400">({destination.images.length} photos)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
            {destination.images.slice(0, 4).map((image, imageIdx) => (
              <div
                key={image.imageId}
                className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-md"
                onClick={() =>
                  openImageModal(
                    image.imageUrl,
                    image.imageName,
                    image.imageDescription,
                    "destination",
                    destinationImages,
                    imageIdx,
                  )
                }
              >
                <Image
                  src={image.imageUrl}
                  alt={image.imageName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-2">
                    <p className="text-white text-[8px] sm:text-xs font-medium truncate">{image.imageName}</p>
                  </div>
                </div>
                
                {/* Show more indicator on last image if there are more than 4 */}
                {imageIdx === 3 && destination.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-bold">+{destination.images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activities */}
      {activities.length > 0 && (
        <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <div
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(11,126,168,0.12), rgba(14,158,142,0.12))" }}
            >
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#0E9E8E" }} />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <h5 className="text-xs sm:text-sm font-semibold" style={{ color: "#095f82" }}>
                Available Activities
              </h5>
              <span
                className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[8px] sm:text-[10px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
              >
                {activities.length}
              </span>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                dayNumber={dayNumber}
                destinationId={destination.destinationId}
                isExpanded={isActivityExpanded(dayNumber, destination.destinationId, activity.id)}
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