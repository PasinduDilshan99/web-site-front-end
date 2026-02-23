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
  Leaf,
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
      case "kitchen":
        return <CookingPot className="w-5 h-5" />;
      default:
        return <Tv className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-4 h-4 text-[#3A9B9B]" />
          <h3 className="text-lg font-semibold text-[#2D4F43]">Amenities</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {amenities.map((amenity) => (
            <div
              key={amenity.providerAmenityId}
              className="flex items-center gap-3 p-3 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4] hover:border-[#C9EFE3] transition-colors group"
            >
              <div className="text-[#3A9B9B] group-hover:scale-110 transition-transform">
                {getAmenityIcon(amenity.amenityCategory)}
              </div>
              <div>
                <div className="font-medium text-[#2D4F43]">
                  {amenity.amenityName}
                </div>
                <div className="text-sm text-[#5A8F7A]">
                  {amenity.amenityDescription}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {facilities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[#2D4F43] mb-4">Facilities</h3>
          <div className="space-y-3">
            {facilities.map((facility) => (
              <div
                key={facility.facilityId}
                className="p-3 bg-[#F5FDFA] rounded-lg border border-[#C9EFE3] hover:border-[#DDF9F2] transition-colors"
              >
                <div className="font-medium text-[#2D4F43]">
                  {facility.facilityName}
                </div>
                <div className="text-sm text-[#5A8F7A] mt-1">
                  {facility.facilityDescription}
                </div>
                {facility.specialNote && (
                  <div className="text-xs text-[#3A9B9B] mt-1 bg-white p-2 rounded-lg border border-[#B5E5D4]">
                    {facility.specialNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hostel Specific Features Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
        <h3 className="font-semibold text-[#2D4F43] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#B5E5D4] rounded-full"></span>
          Perfect for Backpackers
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#B5E5D4]">
            <div className="w-2 h-2 bg-[#3A9B9B] rounded-full"></div>
            <span className="text-[#2D4F43]">24/7 Reception</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#C9EFE3]">
            <div className="w-2 h-2 bg-[#3A9B9B] rounded-full"></div>
            <span className="text-[#2D4F43]">Luggage Storage</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDF9F2]">
            <div className="w-2 h-2 bg-[#3A9B9B] rounded-full"></div>
            <span className="text-[#2D4F43]">Tour Desk</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#B5E5D4]">
            <div className="w-2 h-2 bg-[#3A9B9B] rounded-full"></div>
            <span className="text-[#2D4F43]">Laundry Service</span>
          </div>
        </div>
        
        {/* Social Vibe Note */}
        <div className="mt-3 pt-3 border-t border-[#B5E5D4]/30 text-center">
          <p className="text-xs text-[#5A8F7A] flex items-center justify-center gap-1">
            <span>✨</span>
            Great for meeting fellow travelers
            <span>✨</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostelAmenities;