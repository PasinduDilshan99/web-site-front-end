import { VehicleSpecificationDetails } from "@/types/vehicle-types";
import React from "react";

interface VehicleSpecificationDetailsProps {
  vehicleSpec: VehicleSpecificationDetails;
}

const VehicleSpecificationDetail: React.FC<VehicleSpecificationDetailsProps> = ({
  vehicleSpec,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <span className="w-1 h-6 sm:h-7 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
        Vehicle Overview
      </h2>
      
      <div className="space-y-4 sm:space-y-5">
        {/* Basic Info - Responsive grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-teal-50/50 rounded-lg p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-teal-600">Make</p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 truncate">
              {vehicleSpec.make}
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-lg p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-cyan-600">Model</p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 truncate">
              {vehicleSpec.model}
            </p>
          </div>
          <div className="bg-teal-50/50 rounded-lg p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-teal-600">Year</p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
              {vehicleSpec.year}
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-lg p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-cyan-600">Generation</p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 truncate">
              {vehicleSpec.generation || "N/A"}
            </p>
          </div>
        </div>

        {/* Price and Status */}
        <div className="border-t border-teal-100 pt-4 sm:pt-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-teal-600">Price</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                ${vehicleSpec.price.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-start sm:justify-end">
              <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                vehicleSpec.isActive 
                  ? "bg-teal-100 text-teal-800" 
                  : "bg-cyan-100 text-cyan-800"
              }`}>
                {vehicleSpec.isActive ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>

        {/* Warranty */}
        <div className="border-t border-cyan-100 pt-4 sm:pt-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-gray-500">Warranty</p>
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                {vehicleSpec.warrantyYears} Year{vehicleSpec.warrantyYears !== 1 ? "s" : ""} Comprehensive Coverage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecificationDetail;