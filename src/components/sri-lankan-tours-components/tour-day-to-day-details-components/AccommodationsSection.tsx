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
      router.push(`${VEHICLE_TYPE_DETAILS_PATH}/${vehicleTypeId}?model=${encodeURIComponent(vehicleModel || '')}`);
    }
  };

  if (!accommodations) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="text-center py-4 sm:py-5 md:py-6 lg:py-8">
          <Hotel className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 mb-1">
            No Accommodation Information Available
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Accommodation details are not provided for this tour.
          </p>
        </div>
      </div>
    );
  }

  const { hotel, transport } = accommodations;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="p-1 sm:p-1.5 bg-white rounded-lg shadow-sm transition-transform duration-300 hover:scale-110">
            <Hotel className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
          </div>
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900">
            Accommodations & Facilities
          </h3>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-3 sm:space-y-4 md:space-y-5">
        {/* Hotel Information */}
        {hotel && (
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 transition-all duration-300 hover:shadow-sm">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Icon section */}
              <div className="flex-shrink-0">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl transition-transform duration-300 hover:scale-105 w-fit">
                  <Bed className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>

              {/* Content section */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  Hotel
                </h4>

                {hotel.hotelName === "" ? (
                  <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-1">
                      <HotelStars rating={hotel.hotelCategory} />
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">
                        {hotel.hotelCategory} Star
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 truncate">
                          {hotel.hotelName}
                        </h5>

                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
                            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500 flex-shrink-0" />
                            <span className="truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
                              {hotel.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <HotelStars rating={hotel.hotelCategory} />
                            <span className="text-[10px] sm:text-xs text-gray-600 ml-0.5">
                              {hotel.hotelCategory}★
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {hotel.description}
                    </p>

                    {/* Facilities */}
                    {hotel.facilities && (
                      <div>
                        <h6 className="font-semibold text-gray-900 text-[10px] sm:text-xs mb-0.5">
                          Facilities
                        </h6>
                        <p className="text-gray-600 text-[10px] sm:text-xs line-clamp-2">
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

        {hotel && transport && <hr className="border-purple-200" />}

        {/* Transport Information */}
        {transport && (
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 transition-all duration-300 hover:shadow-sm">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Icon section */}
              <div className="flex-shrink-0">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl transition-transform duration-300 hover:scale-105 w-fit">
                  <Car className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>

              {/* Content section */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  Transportation
                </h4>

                {/* Transportation details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
                  {/* Transport Type - Clickable */}
                  {transport.vehicleTypeId && (
                    <div
                      onClick={() =>
                        handleVehicleTypeClick(transport.vehicleTypeId, transport.vehicleModel)
                      }
                      className="bg-white p-1.5 sm:p-2 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-blue-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <Car className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500" />
                        <span className="text-[8px] sm:text-xs font-medium text-gray-500">
                          Type
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm truncate block hover:text-blue-600 transition-colors">
                        {transport.transportType}
                      </span>
                    </div>
                  )}

                  {/* Vehicle Model - Clickable */}
                  {transport.vehicleSpecificationId && (
                    <div
                      onClick={() =>
                        handleVehicleModelClick(transport.vehicleSpecificationId)
                      }
                      className="bg-white p-1.5 sm:p-2 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <Settings className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" />
                        <span className="text-[8px] sm:text-xs font-medium text-gray-500">
                          Model
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm truncate block hover:text-purple-600 transition-colors">
                        {transport.vehicleModel}
                      </span>
                    </div>
                  )}

                  {/* Seats - Non-clickable */}
                  <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-500" />
                      <span className="text-[8px] sm:text-xs font-medium text-gray-500">
                        Seats
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm">
                      {transport.seatCount}
                    </span>
                  </div>

                  {/* A/C - Non-clickable */}
                  <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-1 mb-0.5">
                      {transport.airConditioned ? (
                        <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                      ) : (
                        <XCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" />
                      )}
                      <span className="text-[8px] sm:text-xs font-medium text-gray-500">
                        A/C
                      </span>
                    </div>
                    <span
                      className={`font-semibold text-[10px] sm:text-xs md:text-sm ${
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
                <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-600 bg-white/50 p-1.5 sm:p-2 rounded-lg">
                  Your transportation includes a{" "}
                  <span
                    onClick={() =>
                      handleVehicleModelClick(transport.vehicleSpecificationId)
                    }
                    className="font-medium text-purple-600 hover:text-purple-700 cursor-pointer"
                  >
                    {transport.vehicleModel}
                  </span>
                  {transport.airConditioned && " with A/C"} for {transport.seatCount} passengers.
                </div>
              </div>
            </div>
          </div>
        )}

        {(hotel || transport) && <hr className="border-purple-200" />}

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
      icon: <Sunrise className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />,
    },
    {
      key: "lunch",
      label: "Lunch",
      included: accommodations.lunch,
      description: accommodations.lunchDescription,
      icon: <Utensils className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />,
    },
    {
      key: "dinner",
      label: "Dinner",
      included: accommodations.dinner,
      description: accommodations.dinnerDescription,
      icon: <Sunset className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />,
    },
    {
      key: "morningTea",
      label: "Morning Tea",
      included: accommodations.morningTea,
      description: accommodations.morningTeaDescription,
      icon: <Coffee className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />,
    },
    {
      key: "eveningTea",
      label: "Evening Tea",
      included: accommodations.eveningTea,
      description: accommodations.eveningTeaDescription,
      icon: <Coffee className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />,
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
    <div className="bg-gradient-to-br from-white to-green-50/30 rounded-lg border border-green-100 p-2 sm:p-3 md:p-4 transition-all duration-300 hover:shadow-sm hover:border-green-200">
      {/* Header with count */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
            <Utensils className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm md:text-base font-bold text-gray-900">
              Meals Included
            </h4>
            <p className="text-[8px] sm:text-[10px] text-gray-600 hidden sm:block">
              Included in your package
            </p>
          </div>
        </div>

        {/* Meal count badge */}
        <div className="bg-green-100 text-green-800 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-xs font-medium">
          {availableMeals.length} {availableMeals.length === 1 ? "Meal" : "Meals"}
        </div>
      </div>

      {/* Meals grid - Responsive layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2">
        {availableMeals.map((meal) => (
          <div
            key={meal.key}
            className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg p-1.5 sm:p-2 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center bg-green-100 mb-0.5 sm:mb-1">
                <div className="text-gray-700">{meal.icon}</div>
              </div>

              <div className="font-semibold text-gray-900 text-[8px] sm:text-[10px] md:text-xs truncate w-full">
                {meal.label}
              </div>

              <div className="flex items-center gap-0.5 mt-0.5">
                <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-500 flex-shrink-0" />
                <span className="text-[6px] sm:text-[8px] md:text-[10px] font-medium text-green-700">
                  Inc
                </span>
              </div>

              {/* Description with expand/collapse for mobile */}
              {meal.description && (
                <>
                  <p
                    className={`text-[6px] sm:text-[8px] md:text-[10px] text-gray-600 mt-0.5 ${
                      expandedMeal === meal.key ? "" : "line-clamp-1"
                    }`}
                  >
                    {meal.description}
                  </p>
                  {meal.description.length > 30 && (
                    <button
                      onClick={() => toggleMealExpand(meal.key)}
                      className="text-[5px] sm:text-[7px] md:text-[9px] text-green-600 hover:text-green-700 mt-0.5 font-medium"
                    >
                      {expandedMeal === meal.key ? "Less" : "More"}
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
        <div className="mt-1 sm:mt-2 text-[8px] sm:text-[10px] text-gray-500 border-t border-gray-100 pt-1 sm:pt-2">
          <span className="flex items-center gap-0.5">
            <Info className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            Other meals not included
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
    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {/* Snacks card */}
        {snacks && (
          <div className="bg-gradient-to-br from-amber-50/50 to-amber-50/20 border border-amber-200 rounded-lg p-2 sm:p-3 transition-all duration-300 hover:shadow-sm hover:border-amber-300">
            <div className="flex items-center gap-1 mb-1">
              <div className="p-0.5 bg-white rounded shadow-xs">
                <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600" />
              </div>
              <span className="font-semibold text-gray-900 text-[10px] sm:text-xs">
                Snacks
              </span>
              <span className="ml-auto px-1 py-0.5 bg-amber-100 text-amber-800 text-[6px] sm:text-[8px] font-medium rounded-full">
                Inc
              </span>
            </div>

            <p
              className={`text-[8px] sm:text-[10px] text-gray-700 leading-relaxed ${
                expandedSnacks ? "" : "line-clamp-2"
              }`}
            >
              {snackNote || "Snacks are included during the tour"}
            </p>

            {/* Read more button for long content */}
            {(snackNote?.length || 0) > 50 && (
              <button
                onClick={() => setExpandedSnacks(!expandedSnacks)}
                className="mt-0.5 text-[6px] sm:text-[8px] text-amber-600 font-medium hover:text-amber-700"
              >
                {expandedSnacks ? "Less" : "More"}
              </button>
            )}
          </div>
        )}

        {/* Other notes card */}
        {otherNotes && (
          <div className="bg-gradient-to-br from-blue-50/50 to-blue-50/20 border border-blue-200 rounded-lg p-2 sm:p-3 transition-all duration-300 hover:shadow-sm hover:border-blue-300">
            <div className="flex items-center gap-1 mb-1">
              <div className="p-0.5 bg-white rounded shadow-xs">
                <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-900 text-[10px] sm:text-xs">
                Notes
              </span>
            </div>

            <p
              className={`text-[8px] sm:text-[10px] text-gray-700 leading-relaxed ${
                expandedNotes ? "" : "line-clamp-2"
              }`}
            >
              {otherNotes}
            </p>

            {/* Read more button for long notes */}
            {otherNotes.length > 50 && (
              <button
                onClick={() => setExpandedNotes(!expandedNotes)}
                className="mt-0.5 text-[6px] sm:text-[8px] text-blue-600 font-medium hover:text-blue-700"
              >
                {expandedNotes ? "Less" : "More"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationsSection;