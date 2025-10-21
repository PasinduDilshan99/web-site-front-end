// components/TourDetails.tsx
import { ActiveToursType } from "@/types/sri-lankan-tour-types";
import React from "react";

interface TourDetailsProps {
  tour: ActiveToursType;
}

const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  const formatDuration = (days: number) => {
    const nights = days - 1;
    return `${nights < 10 ? "0" + nights : nights} Days ${
      days < 10 ? "0" + days : days
    } Nights`;
  };

  const calculatePrice = () => {
    const basePrice = 50;
    let multiplier = 1;

    if (tour.tourCategoryName === "Luxury") multiplier = 2.5;
    else if (tour.tourCategoryName === "Family") multiplier = 1.2;
    else if (tour.tourCategoryName === "Budget") multiplier = 0.8;

    return Math.round(basePrice * tour.duration * multiplier);
  };

  const price = calculatePrice();

  return (
    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
      {/* Duration and Locations */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="inline-flex w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-full items-center justify-center flex-shrink-0">
          <svg
            className="w-3 h-3 text-amber-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="text-sm sm:text-base font-semibold text-gray-700">
          {formatDuration(tour.duration)}
        </span>
      </div>

      {/* Locations */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base text-gray-600">
        <span className="inline-flex w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full items-center justify-center flex-shrink-0">
          <svg
            className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="truncate text-sm sm:text-base">
          {tour.startLocation} → {tour.endLocation}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 line-clamp-2 sm:line-clamp-3 flex-1">
        {tour.tourDescription}
      </p>

      {/* Price and Book Now Button */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="text-sm sm:text-base text-gray-500">
          From{" "}
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            ${price}
          </span>
        </div>
        <button className="bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
          BOOK NOW
        </button>
      </div>

      {/* Tour Type and Category Badges */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
            {tour.tourTypeName}
          </span>
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
            {tour.tourCategoryName}
          </span>
        </div>

        {/* Schedules Count */}
        {tour.schedules.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="inline-flex w-4 h-4 bg-blue-100 rounded-full items-center justify-center flex-shrink-0">
              <svg
                className="w-2 h-2 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-xs sm:text-sm text-gray-600">
              {tour.schedules.length} schedule
              {tour.schedules.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDetails;
