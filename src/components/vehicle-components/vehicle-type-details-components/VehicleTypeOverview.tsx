// components/vehicle-type-components/VehicleTypeOverview.tsx
import React from "react";
import { VehicleType } from "@/types/vehicle-types";

interface VehicleTypeOverviewProps {
  vehicleType: VehicleType;
}

const VehicleTypeOverview: React.FC<VehicleTypeOverviewProps> = ({
  vehicleType,
}) => {
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return (
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-semibold">
            Active
          </span>
        );
      case "INACTIVE":
        return (
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-100 text-cyan-800 rounded-full text-xs sm:text-sm font-semibold">
            Inactive
          </span>
        );
      case "PENDING":
        return (
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
            Pending
          </span>
        );
      default:
        return (
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <span className="w-1 h-6 sm:h-7 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
        Vehicle Type Overview
      </h2>
      
      <div className="space-y-4 sm:space-y-5">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-teal-50/50 rounded-lg p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-teal-600">Type ID</p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
              #{vehicleType.vehicleTypeId}
            </p>
          </div>
          <div className="bg-cyan-50/50 rounded-lg p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-cyan-600">Name</p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 truncate">
              {vehicleType.name}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="border-t border-teal-100 pt-4 sm:pt-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Status</p>
                <p className="text-base sm:text-lg font-semibold text-gray-800">
                  {getStatusBadge(vehicleType.status)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-cyan-100 pt-4 sm:pt-5">
          <div className="flex gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-lg shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Description</p>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                {vehicleType.description}
              </p>
            </div>
          </div>
        </div>

        {/* Image Count */}
        <div className="border-t border-teal-100 pt-4 sm:pt-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Images</p>
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                {vehicleType.images.length} image{vehicleType.images.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleTypeOverview;