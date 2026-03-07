// components/vehicle-types-components/VehicleTypesGrid.tsx
"use client";
import React from "react";
import VehicleTypeCard from "./VehicleTypeCard";
import { VehicleType } from "@/types/vehicle-types";

interface VehicleTypesGridProps {
  vehicleTypes: VehicleType[];
  displayCount: number;
}

const VehicleTypesGrid: React.FC<VehicleTypesGridProps> = ({
  vehicleTypes,
  displayCount,
}) => {
  const displayedVehicleTypes = vehicleTypes.slice(0, displayCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {displayedVehicleTypes.map((vehicleType) => (
          <VehicleTypeCard key={vehicleType.vehicleTypeId} vehicleType={vehicleType} />
        ))}
      </div>

      {/* Display Count Info */}
      <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
        Showing {displayedVehicleTypes.length} of {vehicleTypes.length} vehicle types
      </div>
    </>
  );
};

export default VehicleTypesGrid;