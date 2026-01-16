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
          <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl transition-transform duration-300 hover:scale-110">
                <Bed className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {hotel.hotelName}
                    </h4>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                        <span>{hotel.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HotelStars rating={hotel.hotelCategory} />
                        <span className="text-sm text-gray-600 ml-2">
                          {hotel.hotelCategory} Star
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{hotel.description}</p>
                {hotel.facilities && (
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Facilities
                    </h5>
                    <p className="text-gray-600">{hotel.facilities}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Transport Information */}
        {transport && (
          <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl transition-transform duration-300 hover:scale-110">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Transportation
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Type", value: transport.transportType },
                    { label: "Model", value: transport.vehicleModel },
                    { label: "Seats", value: transport.seatCount },
                    {
                      label: "A/C",
                      value: transport.airConditioned ? "Yes" : "No",
                      icon: transport.airConditioned ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      ),
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-105"
                    >
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        {item.label}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.icon && item.icon}
                        <div className="font-semibold text-gray-900">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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
  const meals = [
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

  return (
    <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white rounded-lg shadow-sm transition-transform duration-300 hover:scale-110">
          <Utensils className="w-5 h-5 text-green-600" />
        </div>
        <h4 className="font-semibold text-gray-900">Meals Included</h4>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {meals.map((meal) => (
          <div
            key={meal.key}
            className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
              meal.included
                ? "bg-green-50 border-green-200 hover:shadow-md"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`p-1 rounded transition-transform duration-300 hover:scale-110 ${
                  meal.included ? "bg-green-100" : "bg-gray-200"
                }`}
              >
                {meal.icon}
              </div>
              <span className="font-medium text-gray-900">{meal.label}</span>
            </div>
            <div className="flex items-center gap-1">
              {meal.included ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500 transition-transform duration-300 hover:scale-110" />
                  <span className="text-sm text-green-700">Included</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-gray-400 transition-transform duration-300 hover:scale-110" />
                  <span className="text-sm text-gray-500">Not included</span>
                </>
              )}
            </div>
            {meal.description && meal.included && (
              <p className="text-xs text-gray-600 mt-2 transition-opacity duration-300">
                {meal.description}
              </p>
            )}
          </div>
        ))}
      </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snacks && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-amber-600 transition-transform duration-300 hover:scale-110" />
              <span className="font-semibold text-gray-900">Snacks</span>
            </div>
            <p className="text-sm text-gray-700">
              {snackNote || "Snacks are included"}
            </p>
          </div>
        )}
        {otherNotes && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-blue-600 transition-transform duration-300 hover:scale-110" />
              <span className="font-semibold text-gray-900">Notes</span>
            </div>
            <p className="text-sm text-gray-700">{otherNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationsSection;