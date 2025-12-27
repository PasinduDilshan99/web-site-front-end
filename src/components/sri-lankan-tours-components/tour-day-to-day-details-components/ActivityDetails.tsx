"use client";

import React from "react";
import Image from "next/image";
import {
  Clock,
  ThermometerSun,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { Activity } from "@/types/sri-lankan-tour-types";

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
    initialIndex?: number
  ) => void;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  activity,
  isExpanded,
  formatCurrency,
  formatTime,
  openImageModal,
}) => {
  if (!isExpanded) return null;

  return (
    <div
      style={{
        maxHeight: isExpanded ? "2000px" : "0",
        opacity: isExpanded ? 1 : 0,
        overflow: "hidden" as const,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Details */}
          <div>
            <div className="mb-6">
              <h6 className="font-semibold text-gray-900 mb-3">
                Activity Description
              </h6>
              <p className="text-gray-700">{activity.description}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Timing
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {formatTime(activity.availableFrom)} -{" "}
                    {formatTime(activity.availableTo)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <ThermometerSun className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Season
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activity.season.split(",").map((season, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white text-xs font-medium text-gray-700 rounded-full transition-all duration-300 hover:scale-105"
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
                  <h6 className="font-semibold text-gray-900 mb-3">
                    Requirements
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activity.requirements.map((req) => (
                      <div
                        key={req.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-sm"
                      >
                        <div
                          className="w-3 h-3 rounded-full transition-transform duration-300 hover:scale-125"
                          style={{ backgroundColor: req.color }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {req.name}: {req.value}
                          </div>
                          {req.description && (
                            <div className="text-sm text-gray-600">
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
            <div>
              <h6 className="font-semibold text-gray-900 mb-4">
                Activity Images
              </h6>
              <div className="grid grid-cols-2 gap-3">
                {activity.images.map((img, imgIdx) => (
                  <div
                    key={img.id}
                    className="relative h-40 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
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
                        imgIdx
                      );
                    }}
                  >
                    <Image
                      src={img.image_url}
                      alt={img.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm font-medium">
                          {img.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price Comparison */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 transition-all duration-300 hover:shadow-md">
          <h6 className="font-semibold text-gray-900 mb-3">Price Information</h6>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg transition-all duration-300 hover:scale-105">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Local Price
              </div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(activity.priceLocal)}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg transition-all duration-300 hover:scale-105">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Foreigner Price
              </div>
              <div className="text-xl font-bold text-blue-600">
                {formatCurrency(activity.priceForeigners)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;