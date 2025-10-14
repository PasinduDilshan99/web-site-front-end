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
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Destinations & Activities</h2>

      <div className="space-y-6">
        {destinations.map((destination) => (
          <div
            key={destination.destinationId}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Destination Header */}
            <button
              onClick={() => toggleDestination(destination.destinationId)}
              className="w-full p-6 text-left bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {destination.destinationName}
                  </h3>
                  <p className="text-gray-600 mb-2">{destination.destinationDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {destination.categoryName}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {destination.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {destination.activities.length} activities
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
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
              <div className="p-6 border-t border-gray-200">
                {/* Destination Images */}
                {destination.images.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Gallery</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {destination.images.map((image) => (
                        <div
                          key={image.imageId}
                          className="relative h-32 rounded-lg overflow-hidden bg-gray-200"
                        >
                          <Image
                            src={image.imageUrl}
                            alt={image.imageDescription}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.currentTarget.src = "/images/placeholder.jpg";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activities */}
                {destination.activities.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Available Activities</h4>
                    <div className="space-y-4">
                      {destination.activities.map((activity) => (
                        <div
                          key={activity.activityId}
                          className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-1">
                                {activity.activityName}
                              </h5>
                              <p className="text-gray-600 text-sm mb-2">
                                {activity.activityDescription}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                  {activity.activitiesCategory}
                                </span>
                                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">
                                  {activity.durationHours} hours
                                </span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                  {activity.minParticipate}-{activity.maxParticipate} people
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">
                                {formatPrice(activity.priceLocal)}
                              </div>
                              <div className="text-sm text-gray-500">Local</div>
                              <div className="font-semibold text-gray-900 mt-1">
                                {formatPrice(activity.priceForeigners)}
                              </div>
                              <div className="text-sm text-gray-500">Foreign</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              {activity.availableFrom} - {activity.availableTo}
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                              </svg>
                              {activity.season}
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