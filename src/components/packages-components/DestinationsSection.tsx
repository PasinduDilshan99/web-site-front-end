import React, { useState } from "react";
import Image from "next/image";
import { Destination } from "@/types/packages-types";

interface DestinationsSectionProps {
  destinations: Destination[];
}

const DestinationsSection: React.FC<DestinationsSectionProps> = ({ destinations }) => {
  const [expandedDestination, setExpandedDestination] = useState<number | null>(null);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const toggleDestination = (destinationId: number) => {
    setExpandedDestination(expandedDestination === destinationId ? null : destinationId);
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-5 lg:p-6 border border-sky-100">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-4 sm:mb-5 lg:mb-6">
        Destinations & Activities
      </h2>

      <div className="space-y-4 sm:space-y-5 lg:space-y-6">
        {destinations.map((destination) => (
          <div
            key={destination.destinationId}
            className="border border-sky-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-sky-300 hover:shadow-sm sm:hover:shadow-md transition-all duration-200"
          >
            {/* Destination Header */}
            <button
              onClick={() => toggleDestination(destination.destinationId)}
              className="w-full p-3 sm:p-4 lg:p-6 text-left bg-gradient-to-r from-sky-50 to-white hover:from-sky-100 transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-sky-900 mb-1 sm:mb-2 truncate">
                    {destination.destinationName}
                  </h3>
                  <p className="text-sky-700 text-sm sm:text-base mb-2 line-clamp-2 sm:line-clamp-3">
                    {destination.destinationDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2 py-1 bg-sky-100 text-sky-800 rounded-full text-xs sm:text-sm font-medium">
                      {destination.categoryName}
                    </span>
                    <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">
                      {destination.location}
                    </span>
                    <span className="md:hidden px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium">
                      {destination.activities.length} activities
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-2 mt-2 md:mt-0">
                  <span className="hidden md:inline text-sm text-sky-600 font-medium">
                    {destination.activities.length} activities
                  </span>
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-sky-500 transition-transform duration-200 ${
                      expandedDestination === destination.destinationId ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            {expandedDestination === destination.destinationId && (
              <div className="p-3 sm:p-4 lg:p-6 border-t border-sky-100 animate-fadeIn">
                {/* Destination Images */}
                {destination.images.length > 0 && (
                  <div className="mb-4 sm:mb-5 lg:mb-6">
                    <h4 className="text-base sm:text-lg font-semibold text-sky-800 mb-2 sm:mb-3">Gallery</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                      {destination.images.map((image) => (
                        <div
                          key={image.imageId}
                          className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-sky-100 to-teal-100 group cursor-pointer border border-sky-200"
                        >
                          <Image
                            src={image.imageUrl}
                            alt={image.imageDescription || destination.destinationName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            onError={(e) => {
                              e.currentTarget.src = "/images/placeholder.jpg";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activities */}
                {destination.activities.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h4 className="text-base sm:text-lg font-semibold text-sky-800">
                        Available Activities
                      </h4>
                      <span className="text-xs sm:text-sm text-sky-600 font-medium">
                        {destination.activities.length} total
                      </span>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {destination.activities.map((activity) => (
                        <div
                          key={activity.activityId}
                          className="p-3 sm:p-4 border border-sky-200 rounded-lg sm:rounded-xl hover:border-sky-400 transition-colors duration-200 bg-gradient-to-b from-white to-sky-50/30"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-2 sm:mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h5 className="font-semibold text-sky-900 text-sm sm:text-base truncate">
                                  {activity.activityName}
                                </h5>
                                <div className="hidden sm:flex items-center gap-1">
                                  <span className="px-2 py-1 bg-sky-100 text-sky-800 rounded text-xs font-medium">
                                    {activity.activitiesCategory}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sky-700 text-xs sm:text-sm mb-2 line-clamp-2">
                                {activity.activityDescription}
                              </p>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                <span className="sm:hidden px-2 py-1 bg-sky-100 text-sky-800 rounded text-xs font-medium">
                                  {activity.activitiesCategory}
                                </span>
                                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                  {activity.durationHours} hours
                                </span>
                                <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-medium">
                                  {activity.minParticipate}-{activity.maxParticipate} people
                                </span>
                              </div>
                            </div>
                            {/* <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2 sm:gap-1">
                              <div className="text-left sm:text-right">
                                <div className="font-semibold text-sky-900 text-sm sm:text-base">
                                  {formatPrice(activity.priceLocal)}
                                </div>
                                <div className="text-xs text-sky-600">Local</div>
                              </div>
                              <div className="text-left sm:text-right">
                                <div className="font-semibold text-sky-900 text-sm sm:text-base">
                                  {formatPrice(activity.priceForeigners)}
                                </div>
                                <div className="text-xs text-sky-600">Foreign</div>
                              </div>
                            </div> */}
                          </div>
                          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-sky-600">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              <span className="truncate">{activity.availableFrom} - {activity.availableTo}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                              </svg>
                              <span className="truncate">{activity.season}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationsSection;