// components/hostel/HostelAmenities.tsx
import React from "react";
import {
  Wifi,
  Car,
  Dumbbell,
  Utensils,
  Coffee,
  Tv,
  Users,
  CookingPot,
} from "lucide-react";
import {
  Amenity,
  Facility,
} from "@/types/accommodations-types/service-provider-types";

interface HostelAmenitiesProps {
  amenities: Amenity[];
  facilities: Facility[];
}

const HostelAmenities: React.FC<HostelAmenitiesProps> = ({
  amenities,
  facilities,
}) => {
  const getAmenityIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "technology":
        return <Wifi className="w-5 h-5" />;
      case "recreation":
        return <Dumbbell className="w-5 h-5" />;
      case "wellness":
        return <Coffee className="w-5 h-5" />;
      case "dining":
        return <Utensils className="w-5 h-5" />;
      case "parking":
        return <Car className="w-5 h-5" />;
      case "common areas":
        return <Users className="w-5 h-5" />;
    //   case "kitchen":
    //     return <Kitchen className="w-5 h-5" />;
      default:
        return <Tv className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Hostel Amenities
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {amenities.map((amenity) => (
              <div
                key={amenity.providerAmenityId}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="text-blue-600">
                  {getAmenityIcon(amenity.amenityCategory)}
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {amenity.amenityName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {amenity.amenityDescription}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {facilities.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Facilities
            </h3>
            <div className="space-y-3">
              {facilities.map((facility) => (
                <div
                  key={facility.facilityId}
                  className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 hover:border-indigo-300 transition-colors"
                >
                  <div className="font-medium text-indigo-800">
                    {facility.facilityName}
                  </div>
                  <div className="text-sm text-indigo-600 mt-1">
                    {facility.facilityDescription}
                  </div>
                  {facility.specialNote && (
                    <div className="text-xs text-indigo-500 mt-1">
                      {facility.specialNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hostel Specific Features Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">
          Perfect for Backpackers
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-blue-700">24/7 Reception</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-blue-700">Luggage Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-blue-700">Tour Desk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-blue-700">Laundry Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelAmenities;
