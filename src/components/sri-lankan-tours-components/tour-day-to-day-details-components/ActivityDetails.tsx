"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Clock,
  ThermometerSun,
  CheckCircle,
  XCircle,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Activity } from "@/types/tour-types";
import { SEASON_DETAILS_PAGE_PATH } from "@/utils/urls";

interface ActivityDetailsProps {
  activity: Activity;
  isExpanded: boolean;
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

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  activity,
  isExpanded,
  formatCurrency,
  formatTime,
  openImageModal,
}) => {
  const router = useRouter();

  if (!isExpanded) return null;

  // Function to handle season click navigation
  const handleSeasonClick = (seasonId: number, season: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`${SEASON_DETAILS_PAGE_PATH}/${seasonId}?name=${encodeURIComponent(season)}`);
  };

  return (
    <div
      style={{
        maxHeight: isExpanded ? "2000px" : "0",
        opacity: isExpanded ? 1 : 0,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white border-t border-gray-100">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Activity Details */}
          <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-5">
            <div>
              <h6 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
                Activity Description
              </h6>
              <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                {activity.description}
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {/* Timing & Season Cards */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-sky-50 to-cyan-50 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-sm border border-sky-100">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-sky-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      Timing
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                    {formatTime(activity.availableFrom)} - {formatTime(activity.availableTo)}
                  </p>
                </div>

                <div
                  onClick={(e) => handleSeasonClick(activity.seasonId, activity.season, e)}
                  className="bg-gradient-to-br from-teal-50 to-emerald-50 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-sm border border-teal-100 cursor-pointer hover:border-teal-300 hover:from-teal-100 hover:to-emerald-100"
                >
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <ThermometerSun className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      Season
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activity.season.split(",").map((season, index) => (
                      <span
                        key={index}
                        className="px-1 sm:px-1.5 py-0.5 bg-white text-[10px] sm:text-xs font-medium text-gray-700 rounded-full border border-sky-200"
                      >
                        {season.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Requirements */}
              {activity.requirements.length > 0 && (
                <div>
                  <h6 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
                    Requirements
                  </h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {activity.requirements.map((req) => (
                      <div
                        key={req.id}
                        className="flex items-start gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-sm"
                      >
                        <div
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mt-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-125"
                          style={{ backgroundColor: req.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 text-xs sm:text-sm">
                            <span className="truncate">{req.name}</span>:{" "}
                            <span className="text-gray-700">{req.value}</span>
                          </div>
                          {req.description && (
                            <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5 line-clamp-2">
                              {req.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Images */}
          {activity.images.length > 0 && (
            <div className="lg:w-80 xl:w-96">
              <h6 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
                Activity Images
              </h6>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1.5 sm:gap-2">
                {activity.images.slice(0, 4).map((img, imgIdx) => (
                  <div
                    key={img.id}
                    className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-md"
                    onClick={() => {
                      const images = activity.images.map((img) => ({
                        url: img.image_url,
                        title: img.name,
                        description: img.description,
                      }));
                      openImageModal(
                        img.image_url,
                        img.name,
                        img.description,
                        "activity",
                        images,
                        imgIdx,
                      );
                    }}
                  >
                    <Image
                      src={img.image_url}
                      alt={img.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-2">
                        <p className="text-white text-[8px] sm:text-xs font-medium truncate">
                          {img.name}
                        </p>
                      </div>
                    </div>
                    
                    {/* Show more indicator */}
                    {imgIdx === 3 && activity.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-bold">+{activity.images.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;