// components/vehicle-components/VehicleCard.tsx
"use client";
import React, { useState } from "react";
import { Vehicle } from "@/types/vehicle-types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import VehicleImageSlideshow from "./VehicleImageSlideshow";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleMoreDetails = () => {
    router.push(
      `/vehicles/${vehicle.vehicleId}?name=${vehicle.specification.make} ${vehicle.specification.model}`,
    );
  };

  // Get transmission type name
  const getTransmissionType = (id: number): string => {
    const transmissionMap: Record<number, string> = {
      1: "Manual",
      2: "Automatic",
      3: "CVT",
      4: "DCT",
    };
    return transmissionMap[id] || "Unknown";
  };

  // Get fuel type name
  const getFuelType = (id: number): string => {
    const fuelMap: Record<number, string> = {
      1: "Petrol",
      2: "Diesel",
      3: "Electric",
      4: "Hybrid",
      5: "Plugin Hybrid",
    };
    return fuelMap[id] || "Unknown";
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      ACTIVE: "bg-teal-100 text-teal-800 border border-teal-200",
      MAINTENANCE: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      INACTIVE: "bg-gray-100 text-gray-800 border border-gray-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border border-gray-200";
  };

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-100 relative">
      {/* Vehicle Image Slideshow */}
      <div className="relative">
        <VehicleImageSlideshow
          images={vehicle.images}
          vehicleName={`${vehicle.specification.make} ${vehicle.specification.model}`}
        />

        {/* Make/Model Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-teal-600/90 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          {vehicle.specification.make} {vehicle.specification.model}
        </div>

        {/* Status Badge */}
        {/* <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span
            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
              vehicle.status,
            )}`}
          >
            {vehicle.status}
          </span>
        </div> */}

        {/* Price Badge */}
        {/* <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                ${vehicle.specification.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Vehicle Content */}
      <div className="p-3 sm:p-4 md:p-6">
        {/* Title */}
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-teal-900 mb-1 sm:mb-2">
          {vehicle.specification.make} {vehicle.specification.model} (
          {vehicle.specification.year})
        </h2>

        {/* Registration */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3">
          Reg: {vehicle.registrationNumber}
        </p>

        {/* Key Information Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-teal-800">
              {vehicle.specification.year}
            </span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-cyan-800">
              {vehicle.specification.seatCapacity} Seats
            </span>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
          <div className="bg-teal-50 rounded-lg p-2">
            <p className="text-xs text-teal-600">Engine</p>
            <p className="text-xs sm:text-sm font-semibold text-teal-900">
              {vehicle.specification.engineType}
            </p>
          </div>
          <div className="bg-cyan-50 rounded-lg p-2">
            <p className="text-xs text-cyan-600">Transmission</p>
            <p className="text-xs sm:text-sm font-semibold text-cyan-900">
              {getTransmissionType(vehicle.specification.transmissionTypeId)}
            </p>
          </div>
          <div className="bg-seaBlue-50 rounded-lg p-2">
            <p className="text-xs text-seaBlue-600">Fuel</p>
            <p className="text-xs sm:text-sm font-semibold text-seaBlue-900">
              {getFuelType(vehicle.specification.fuelTypeId)}
            </p>
          </div>
          <div className="bg-teal-50 rounded-lg p-2">
            <p className="text-xs text-teal-600">Horsepower</p>
            <p className="text-xs sm:text-sm font-semibold text-teal-900">
              {vehicle.specification.horsepowerHp} HP
            </p>
          </div>
        </div>

        {/* Features Highlights */}
        {(vehicle.specification.sunroofType !== "None" ||
          vehicle.specification.cruiseControlType !== "None") && (
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {vehicle.specification.sunroofType !== "None" && (
                <span className="bg-green-100 text-green-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                  {vehicle.specification.sunroofType} Sunroof
                </span>
              )}
              {vehicle.specification.cruiseControlType !== "None" && (
                <span className="bg-teal-100 text-teal-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                  {vehicle.specification.cruiseControlType}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleMoreDetails}
          className="cursor-pointer w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
