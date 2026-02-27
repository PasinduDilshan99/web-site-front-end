"use client";

import React from "react";
import {
  Hotel,
  Car,
  Utensils,
  Bed,
  Coffee,
  Sunset,
  Sunrise,
  CheckCircle,
  XCircle,
  Tag,
  Compass,
  MapPin,
  Settings,
  Users,
  Info,
} from "lucide-react";
import { Accommodation } from "@/types/sri-lankan-tour-types";
import HotelStars from "./HotelStars";

interface AccommodationsSectionProps {
  accommodations: Accommodation;
}

const AccommodationsSection: React.FC<AccommodationsSectionProps> = ({
  accommodations,
}) => {
  if (!accommodations) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6">
        <div className="text-center py-8">
          <Hotel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Accommodation Information Available
          </h3>
          <p className="text-gray-500">
            Accommodation details are not provided for this tour.
          </p>
        </div>
      </div>
    );
  }
  const { hotel, transport } = accommodations;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm transition-transform duration-300 hover:scale-110">
            <Hotel className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Accommodations & Facilities
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Hotel Information */}
        {hotel && (
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-sm sm:hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-6">
              {/* Icon section */}
              <div className="flex-shrink-0 flex items-center justify-center sm:items-start">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl transition-transform duration-300 hover:scale-105 sm:hover:scale-110">
                  <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {/* Content section */}
              <div className="flex-1 min-w-0">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 ">
                  Hotel
                </h4>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                  {hotel.hotelName === "" ? (
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mt-1 sm:mt-2">
                        <div className="flex items-center gap-1">
                          <HotelStars rating={hotel.hotelCategory} />
                          <span className="text-xs sm:text-sm text-gray-600 ml-1">
                            {hotel.hotelCategory} Star
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
                        {hotel.hotelName}
                      </h4>

                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mt-1 sm:mt-2">
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          <span className="truncate">{hotel.location}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <HotelStars rating={hotel.hotelCategory} />
                          <span className="text-xs sm:text-sm text-gray-600 ml-1">
                            {hotel.hotelCategory} Star
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <button className="hidden sm:inline-flex items-center justify-center px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200">
                    Book Now
                  </button> */}
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {hotel.description}
                </p>

                {/* Facilities */}
                {hotel.facilities && (
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
                      Facilities
                    </h5>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                      {hotel.facilities}
                    </p>
                  </div>
                )}

                {/* Mobile-only action button */}
                {/* <button className="sm:hidden w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200">
                  View Hotel Details
                </button> */}
              </div>
            </div>
          </div>
        )}
        <hr className="border-purple-500" />
        {/* Transport Information */}
        {transport && (
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-sm sm:hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-6">
              {/* Icon section */}
              <div className="flex-shrink-0 flex items-center justify-center sm:items-start">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl transition-transform duration-300 hover:scale-105 sm:hover:scale-110">
                  <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {/* Content section */}
              <div className="flex-1 min-w-0">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  Transportation
                </h4>

                {/* Transportation details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  {[
                    {
                      label: "Type",
                      value: transport.transportType,
                      icon: (
                        <Car className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                      ),
                    },
                    {
                      label: "Model",
                      value: transport.vehicleModel,
                      icon: (
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      ),
                    },
                    {
                      label: "Seats",
                      value: transport.seatCount,
                      icon: (
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                      ),
                    },
                    {
                      label: "A/C",
                      value: transport.airConditioned ? "Yes" : "No",
                      icon: transport.airConditioned ? (
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                      ),
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-2.5 sm:p-3 md:p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] sm:hover:scale-105"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        {item.icon}
                        <div className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                          {item.label}
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional info on larger screens */}
                <div className="mt-4 sm:mt-6 hidden sm:block">
                  <div className="text-sm text-gray-600">
                    Your transportation for this tour includes a comfortable{" "}
                    {transport.vehicleModel}
                    {transport.airConditioned && " with air conditioning"} for
                    up to {transport.seatCount} passengers.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <hr className="border-purple-500" />

        {/* Meals Information */}
        <MealsSection accommodations={accommodations} />

        {/* Additional Notes */}
        {(accommodations.snacks || accommodations.otherNotes) && (
          <AdditionalNotes
            snacks={accommodations.snacks}
            snackNote={accommodations.snackNote}
            otherNotes={accommodations.otherNotes}
          />
        )}
      </div>
    </div>
  );
};

const MealsSection: React.FC<{ accommodations: Accommodation }> = ({
  accommodations,
}) => {
  const allMeals = [
    {
      key: "breakfast",
      label: "Breakfast",
      included: accommodations.breakfast,
      description: accommodations.breakfastDescription,
      icon: <Sunrise className="w-4 h-4" />,
    },
    {
      key: "lunch",
      label: "Lunch",
      included: accommodations.lunch,
      description: accommodations.lunchDescription,
      icon: <Utensils className="w-4 h-4" />,
    },
    {
      key: "dinner",
      label: "Dinner",
      included: accommodations.dinner,
      description: accommodations.dinnerDescription,
      icon: <Sunset className="w-4 h-4" />,
    },
    {
      key: "morningTea",
      label: "Morning Tea",
      included: accommodations.morningTea,
      description: accommodations.morningTeaDescription,
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      key: "eveningTea",
      label: "Evening Tea",
      included: accommodations.eveningTea,
      description: accommodations.eveningTeaDescription,
      icon: <Coffee className="w-4 h-4" />,
    },
  ];

  // Filter to show only available meals
  const availableMeals = allMeals.filter((meal) => meal.included);

  // If no meals are available, don't render the section
  if (availableMeals.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-white to-green-50/30 rounded-xl border border-green-100 p-4 sm:p-6 transition-all duration-300 hover:shadow-md hover:border-green-200">
      {/* Header with count */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
            <Utensils className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900">
              Meals Included
            </h4>
            <p className="text-sm text-gray-600 hidden sm:block">
              Meals included in your package
            </p>
          </div>
        </div>

        {/* Meal count badge */}
        <div className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
          {availableMeals.length} {availableMeals.length === 1 ? 'Meal' : 'Meals'}
        </div>
      </div>

      {/* Meals grid - Scrollable on mobile */}
      <div className="mb-4 sm:mb-6">
        <div className="flex overflow-x-auto pb-2 gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 scrollbar-hide">
          {availableMeals.map((meal) => (
            <div
              key={meal.key}
              className="flex-shrink-0 w-36 sm:w-auto sm:flex-1 p-3 sm:p-4 rounded-xl border transition-all duration-200 bg-gradient-to-br from-green-50 to-white border-green-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100">
                  <div className="w-5 h-5 text-gray-700">{meal.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {meal.label}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs sm:text-sm font-medium text-green-700">
                  Included
                </span>
              </div>

              {/* Description */}
              {meal.description && (
                <p className="text-xs text-gray-600 mt-2 sm:mt-3 line-clamp-2">
                  {meal.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Add a note if some meals are not included */}
      {allMeals.length > availableMeals.length && (
        <div className="mt-2 text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            Other meals are not included in this package
          </span>
        </div>
      )}
    </div>
  );
};

const AdditionalNotes: React.FC<{
  snacks: boolean;
  snackNote: string | null;
  otherNotes: string | null;
}> = ({ snacks, snackNote, otherNotes }) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      {(snacks || otherNotes) && (
        <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Snacks card */}
            {snacks && (
              <div className="bg-gradient-to-br from-amber-50/50 to-amber-50/20 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-sm sm:hover:shadow-md hover:border-amber-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-white rounded-md shadow-xs">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    Snacks
                  </span>
                  {/* Status indicator */}
                  <span className="ml-auto px-1.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    Included
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {snackNote || "Snacks are included during the tour"}
                </p>
                {/* Additional info on larger screens */}
                <div className="hidden sm:block mt-2 text-xs text-amber-600">
                  Usually includes bottled water, fruits, and local snacks
                </div>
              </div>
            )}

            {/* Other notes card */}
            {otherNotes && (
              <div className="bg-gradient-to-br from-blue-50/50 to-blue-50/20 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-sm sm:hover:shadow-md hover:border-blue-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-white rounded-md shadow-xs">
                    <Compass className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    Additional Notes
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-3 sm:line-clamp-4">
                  {otherNotes}
                </p>
                {/* View more button for long notes on mobile */}
                {otherNotes.length > 100 && (
                  <button className="mt-2 text-xs text-blue-600 font-medium hover:text-blue-700 sm:hidden">
                    Read more
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationsSection;
