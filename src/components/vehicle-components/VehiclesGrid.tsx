// components/vehicle-components/VehiclesGrid.tsx
"use client";
import React from "react";
import VehicleCard from "./VehicleCard";
import { Vehicle } from "@/types/vehicle-types";

interface VehiclesGridProps {
  vehicles: Vehicle[];
  displayCount: number;
}

const VehiclesGrid: React.FC<VehiclesGridProps> = ({
  vehicles,
  displayCount,
}) => {
  const displayedVehicles = vehicles.slice(0, displayCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {displayedVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
        ))}
      </div>

      {/* Display Count Info */}
      <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
        Showing {displayedVehicles.length} of {vehicles.length} vehicles
      </div>
    </>
  );
};

export default VehiclesGrid;