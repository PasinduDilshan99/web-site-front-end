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
import HotelStars from "./HotelStars";
import { useRouter } from "next/navigation";
import { Accommodation } from "@/types/tour-types";
import { VEHICLE_SPECIFICATION_DETAILS_PATH, VEHICLE_TYPE_DETAILS_PATH } from "@/utils/urls";

interface AccommodationsSectionProps {
  accommodations: Accommodation;
}

const AccommodationsSection: React.FC<AccommodationsSectionProps> = ({
  accommodations,
}) => {
  const router = useRouter();
  const handleVehicleModelClick = (specificationId?: number) => {
    if (specificationId) {
      router.push(`${VEHICLE_SPECIFICATION_DETAILS_PATH}/${specificationId}`);
    }
  };

  const handleVehicleTypeClick = (vehicleTypeId?: number, vehicleModel?: string) => {
    if (vehicleTypeId) {
      router.push(`${VEHICLE_TYPE_DETAILS_PATH}/${vehicleTypeId}?model=${vehicleModel}`);
    }
  };

  if (!accommodations) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-4 sm:p-6">
        <div className="text-center py-6 sm:py-8">
          <Hotel className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
            No Accommodation Information Available
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            Accommodation details are not provided for this tour.
          </p>
        </div>
      </div>
    );
  }

  const { hotel, transport } = accommodations;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm transition-transform duration-300 hover:scale-110">
            <Hotel className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Accommodations & Facilities
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
        {/* Hotel Information */}
        {hotel && (
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 transition-all duration-300 hover:shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Icon section */}
              <div className="flex-shrink-0">
                <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl transition-transform duration-300 hover:scale-105 w-fit">
                  <Bed className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>

              {/* Content section */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  Hotel
                </h4>

                {hotel.hotelName === "" ? (
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                    <div className="flex items-center gap-1">
                      <HotelStars rating={hotel.hotelCategory} />
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">
                        {hotel.hotelCategory} Star
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h5 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                          {hotel.hotelName}
                        </h5>

                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                            <span className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
                              {hotel.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <HotelStars rating={hotel.hotelCategory} />
                            <span className="text-xs sm:text-sm text-gray-600 ml-1">
                              {hotel.hotelCategory} Star
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {hotel.description}
                    </p>

                    {/* Facilities */}
                    {hotel.facilities && (
                      <div>
                        <h6 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">
                          Facilities
                        </h6>
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                          {hotel.facilities}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <hr className="border-purple-200" />

        {/* Transport Information */}
        {transport && (
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 transition-all duration-300 hover:shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Icon section */}
              <div className="flex-shrink-0">
                <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl transition-transform duration-300 hover:scale-105 w-fit">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>

              {/* Content section */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  Transportation
                </h4>

                {/* Transportation details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                  {/* Transport Type - Clickable */}
                  {transport.vehicleTypeId && (
                    <div
                      onClick={() =>
                        handleVehicleTypeClick(transport.vehicleTypeId, transport.vehicleModel)
                      }
                      className="bg-white p-2.5 sm:p-3 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-blue-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        <Car className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                        <span className="text-xs sm:text-sm font-medium text-gray-500">
                          Type
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base hover:text-blue-600 transition-colors">
                        {transport.transportType}
                      </span>
                    </div>
                  )}

                  {/* Vehicle Model - Clickable */}
                  {transport.vehicleSpecificationId && (
                    <div
                      onClick={() =>
                        handleVehicleModelClick(
                          transport.vehicleSpecificationId,
                        )
                      }
                      className="bg-white p-2.5 sm:p-3 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                        <span className="text-xs sm:text-sm font-medium text-gray-500">
                          Model
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base hover:text-purple-600 transition-colors">
                        {transport.vehicleModel}
                      </span>
                    </div>
                  )}

                  {/* Seats - Non-clickable */}
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                      <span className="text-xs sm:text-sm font-medium text-gray-500">
                        Seats
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {transport.seatCount}
                    </span>
                  </div>

                  {/* A/C - Non-clickable */}
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      {transport.airConditioned ? (
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                      )}
                      <span className="text-xs sm:text-sm font-medium text-gray-500">
                        A/C
                      </span>
                    </div>
                    <span
                      className={`font-semibold text-sm sm:text-base ${
                        transport.airConditioned
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transport.airConditioned ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {/* Additional info */}
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 sm:p-3 rounded-lg">
                  Your transportation for this tour includes a comfortable{" "}
                  <span
                    onClick={() =>
                      handleVehicleModelClick(transport.vehicleSpecificationId)
                    }
                    className="font-medium text-purple-600 hover:text-purple-700 cursor-pointer"
                  >
                    {transport.vehicleModel}
                  </span>
                  {transport.airConditioned && " with air conditioning"} for up
                  to {transport.seatCount} passengers.
                </div>
              </div>
            </div>
          </div>
        )}

        <hr className="border-purple-200" />

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
  const [expandedMeal, setExpandedMeal] = React.useState<string | null>(null);

  const allMeals = [
    {
      key: "breakfast",
      label: "Breakfast",
      included: accommodations.breakfast,
      description: accommodations.breakfastDescription,
      icon: <Sunrise className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      key: "lunch",
      label: "Lunch",
      included: accommodations.lunch,
      description: accommodations.lunchDescription,
      icon: <Utensils className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      key: "dinner",
      label: "Dinner",
      included: accommodations.dinner,
      description: accommodations.dinnerDescription,
      icon: <Sunset className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      key: "morningTea",
      label: "Morning Tea",
      included: accommodations.morningTea,
      description: accommodations.morningTeaDescription,
      icon: <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      key: "eveningTea",
      label: "Evening Tea",
      included: accommodations.eveningTea,
      description: accommodations.eveningTeaDescription,
      icon: <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
  ];

  // Filter to show only available meals
  const availableMeals = allMeals.filter((meal) => meal.included);

  // If no meals are available, don't render the section
  if (availableMeals.length === 0) {
    return null;
  }

  const toggleMealExpand = (key: string) => {
    setExpandedMeal(expandedMeal === key ? null : key);
  };

  return (
    <div className="bg-gradient-to-br from-white to-green-50/30 rounded-xl border border-green-100 p-3 sm:p-4 md:p-5 transition-all duration-300 hover:shadow-md hover:border-green-200">
      {/* Header with count */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
            <Utensils className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
              Meals Included
            </h4>
            <p className="text-xs text-gray-600 hidden sm:block">
              Meals included in your package
            </p>
          </div>
        </div>

        {/* Meal count badge */}
        <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          {availableMeals.length}{" "}
          {availableMeals.length === 1 ? "Meal" : "Meals"}
        </div>
      </div>

      {/* Meals grid - Responsive layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {availableMeals.map((meal) => (
          <div
            key={meal.key}
            className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg p-2 sm:p-3 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-green-100 mb-1 sm:mb-2">
                <div className="text-gray-700">{meal.icon}</div>
              </div>

              <div className="font-semibold text-gray-900 text-xs sm:text-sm truncate w-full">
                {meal.label}
              </div>

              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium text-green-700">
                  Included
                </span>
              </div>

              {/* Description with expand/collapse for mobile */}
              {meal.description && (
                <>
                  <p
                    className={`text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2 ${
                      expandedMeal === meal.key
                        ? ""
                        : "line-clamp-2 sm:line-clamp-3"
                    }`}
                  >
                    {meal.description}
                  </p>
                  {meal.description.length > 50 && (
                    <button
                      onClick={() => toggleMealExpand(meal.key)}
                      className="text-[8px] sm:text-[10px] text-green-600 hover:text-green-700 mt-1 font-medium"
                    >
                      {expandedMeal === meal.key ? "Show less" : "Read more"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Add a note if some meals are not included */}
      {allMeals.length > availableMeals.length && (
        <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500 border-t border-gray-100 pt-2 sm:pt-3">
          <span className="flex items-center gap-1">
            <Info className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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
  const [expandedSnacks, setExpandedSnacks] = React.useState(false);
  const [expandedNotes, setExpandedNotes] = React.useState(false);

  if (!snacks && !otherNotes) return null;

  return (
    <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Snacks card */}
        {snacks && (
          <div className="bg-gradient-to-br from-amber-50/50 to-amber-50/20 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-sm hover:border-amber-300">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-white rounded-md shadow-xs">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
              </div>
              <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                Snacks
              </span>
              <span className="ml-auto px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-medium rounded-full">
                Included
              </span>
            </div>

            <p
              className={`text-xs sm:text-sm text-gray-700 leading-relaxed ${
                expandedSnacks ? "" : "line-clamp-2 sm:line-clamp-3"
              }`}
            >
              {snackNote || "Snacks are included during the tour"}
            </p>

            {/* Read more button for long content */}
            {(snackNote?.length || 0) > 80 && (
              <button
                onClick={() => setExpandedSnacks(!expandedSnacks)}
                className="mt-1 text-[10px] sm:text-xs text-amber-600 font-medium hover:text-amber-700"
              >
                {expandedSnacks ? "Show less" : "Read more"}
              </button>
            )}

            {/* Additional info on larger screens */}
            <div className="hidden sm:block mt-2 text-[10px] sm:text-xs text-amber-600">
              Usually includes bottled water, fruits, and local snacks
            </div>
          </div>
        )}

        {/* Other notes card */}
        {otherNotes && (
          <div className="bg-gradient-to-br from-blue-50/50 to-blue-50/20 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-sm hover:border-blue-300">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-white rounded-md shadow-xs">
                <Compass className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                Additional Notes
              </span>
            </div>

            <p
              className={`text-xs sm:text-sm text-gray-700 leading-relaxed ${
                expandedNotes ? "" : "line-clamp-2 sm:line-clamp-3"
              }`}
            >
              {otherNotes}
            </p>

            {/* Read more button for long notes */}
            {otherNotes.length > 80 && (
              <button
                onClick={() => setExpandedNotes(!expandedNotes)}
                className="mt-1 text-[10px] sm:text-xs text-blue-600 font-medium hover:text-blue-700"
              >
                {expandedNotes ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationsSection;
