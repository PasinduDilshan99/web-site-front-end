// components/vehicle-types-components/VehicleTypeCard.tsx
"use client";
import React from "react";
import { VehicleType } from "@/types/vehicle-types";
import { useRouter } from "next/navigation";
import VehicleTypeImageSlideshow from "./VehicleTypeImageSlideshow";

interface VehicleTypeCardProps {
  vehicleType: VehicleType;
}

const VehicleTypeCard: React.FC<VehicleTypeCardProps> = ({ vehicleType }) => {
  const router = useRouter();

  const handleViewVehicles = () => {
    // Navigate to vehicles page with this type pre-filtered
    router.push(`/vehicles?type=${encodeURIComponent(vehicleType.name)}`);
  };

  const handleViewDetails = () => {
    router.push(
      `/vehicle-types/${vehicleType.vehicleTypeId}?name=${encodeURIComponent(vehicleType.name)}`,
    );
  };

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100 relative">
      {/* Vehicle Type Image Slideshow */}
      <div className="relative">
        <VehicleTypeImageSlideshow
          images={vehicleType.images}
          vehicleTypeName={vehicleType.name}
        />

        {/* Status Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
            {vehicleType.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6">
        {/* Title */}
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-purple-900 mb-2">
          {vehicleType.name}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3">
          {vehicleType.description}
        </p>

        {/* Image Count */}
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-4 h-4 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs text-purple-700">
            {vehicleType.images.length} Image
            {vehicleType.images.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleViewVehicles}
            className="cursor-pointer flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 text-xs sm:text-sm shadow-md hover:shadow-lg"
          >
            View Vehicles
          </button>
          <button
            onClick={handleViewDetails}
            className="cursor-pointer flex-1 bg-gradient-to-r from-pink-600 to-pink-700 text-white py-2 rounded-lg font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-300 text-xs sm:text-sm shadow-md hover:shadow-lg"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleTypeCard;
