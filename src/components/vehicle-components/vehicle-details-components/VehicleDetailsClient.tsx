"use client";

import React, { useState, useEffect } from "react";
import { VehicleById, VehicleByIdResponse } from "@/types/vehicle-types";
import VehicleHeader from "./VehicleHeader";
import VehicleImages from "./VehicleImages";
import VehicleSpecifications from "./VehicleSpecifications";
import VehicleUsageLogs from "./VehicleUsageLogs";
import VehicleDetails from "./VehicleDetails";
import VehicleAssignments from "./VehicleAssignments";
import ServiceHistory from "./ServiceHistory";
import FuelRecords from "./FuelRecords";
import VehicleDetailsHeroSection from "./VehicleDetailsHeroSection";
import VehicleDetailsLoading from "./VehicleDetailsLoading";
import VehicleDetailsLoadingError from "./VehicleDetailsLoadingError";
import { GET_VEHICLE_DETAILS_BY_ID_DATA_FE } from "@/utils/frontEndConstant";

interface VehicleDetailsClientProps {
  vehicleId: string;
}

export default function VehicleDetailsClient({
  vehicleId,
}: VehicleDetailsClientProps) {
  const [vehicle, setVehicle] = useState<VehicleById | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${GET_VEHICLE_DETAILS_BY_ID_DATA_FE}?id=${vehicleId}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle details");
        }

        const vehicleData: VehicleByIdResponse = await response.json();
        setVehicle(vehicleData.data[0]);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching vehicle details",
        );
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchVehicleDetails();
    }
  }, [vehicleId]);

  const retryFetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/vehicles/vehicle-details-by-id?id=${vehicleId}`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch vehicle details");
      }

      const vehicleData: VehicleByIdResponse = await response.json();
      setVehicle(vehicleData.data[0]);
    } catch (err) {
      console.error("Error fetching vehicle details:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching vehicle details",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <VehicleDetailsLoading />;
  }

  if (error) {
    return (
      <VehicleDetailsLoadingError
        onRetry={retryFetch}
        message="Couldn't fetch vehicle information."
      />
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">🚗</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Vehicle Not Found
          </h1>
          <p className="text-gray-600">
            The vehicle you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <VehicleDetailsHeroSection vehicle={vehicle} />

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
            {vehicle.usageLogs && vehicle.usageLogs.length > 0 && (
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

            {/* Assignments - Uncomment when ready */}
            {/* {vehicle.assignments && vehicle.assignments.length > 0 && (
              <VehicleAssignments assignments={vehicle.assignments} />
            )} */}

            {/* Service History - Uncomment when ready */}
            {/* {vehicle.latestService && (
              <ServiceHistory service={vehicle.latestService} />
            )} */}

            {/* Fuel Records - Uncomment when ready */}
            {/* {vehicle.latestFuelRecord && (
              <FuelRecords fuelRecord={vehicle.latestFuelRecord} />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
