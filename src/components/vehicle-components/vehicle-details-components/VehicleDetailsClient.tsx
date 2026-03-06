"use client";

import React from "react";
import { VehicleById } from "@/types/vehicle-types";
import VehicleHeader from "./VehicleHeader";
import VehicleImages from "./VehicleImages";
import VehicleSpecifications from "./VehicleSpecifications";
import VehicleUsageLogs from "./VehicleUsageLogs";
import VehicleDetails from "./VehicleDetails";
import VehicleAssignments from "./VehicleAssignments";
import ServiceHistory from "./ServiceHistory";
import FuelRecords from "./FuelRecords";

interface VehicleDetailsClientProps {
  vehicle: VehicleById;
}

export default function VehicleDetailsClient({
  vehicle,
}: VehicleDetailsClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <VehicleHeader vehicle={vehicle} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <VehicleImages
              vehicleImages={vehicle.vehicleImages}
              specificationImages={vehicle.specificationImages}
            />

            {/* Specifications */}
            <VehicleSpecifications specification={vehicle.specification} />

            {/* Usage Logs */}
            {vehicle.usageLogs && (
              <VehicleUsageLogs usageLogs={vehicle.usageLogs} />
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Vehicle Details */}
            <VehicleDetails
              details={vehicle.details}
              purchaseDate={vehicle.vehiclePurchaseDate}
              purchasePrice={vehicle.vehiclePurchasePrice}
              status={vehicle.statusName}
            />

            {/* Assignments */}
            <VehicleAssignments assignments={vehicle.assignments} />

            {/* Service History */}
            <ServiceHistory service={vehicle.latestService} />

            {/* Fuel Records */}
            <FuelRecords fuelRecord={vehicle.latestFuelRecord} />
          </div>
        </div>
      </div>
    </div>
  );
}