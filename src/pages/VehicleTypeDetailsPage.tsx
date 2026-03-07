// app/vehicle-types/[typeId]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { VehicleType } from "@/types/vehicle-types";
import VehicleTypeHeroSection from "@/components/vehicle-components/vehicle-type-details-components/VehicleTypeHeroSection";
import { vehicleService } from "@/services/vehicleService";
import VehicleTypeLoading from "@/components/vehicle-components/vehicle-type-details-components/VehicleTypeLoading";
import VehicleTypeImages from "@/components/vehicle-components/vehicle-type-details-components/VehicleTypeImages";
import VehicleTypeOverview from "@/components/vehicle-components/vehicle-type-details-components/VehicleTypeOverview";
import VehicleTypeFeatures from "@/components/vehicle-components/vehicle-type-details-components/VehicleTypeFeatures";

const VehicleTypeDetailsPage = () => {
  const params = useParams();
  const typeId = params?.typeId;
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!typeId) {
      setError("No vehicle type ID provided");
      setLoading(false);
      return;
    }

    const fetchVehicleType = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await vehicleService.getVehicleTypeById(
          Number(typeId),
        );
        if (response.data) {
          setVehicleType(response.data);
        } else {
          setError(response.message || "Failed to fetch vehicle type details");
        }
      } catch (err) {
        console.error("Error fetching vehicle type:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching vehicle type details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleType();
  }, [typeId]);

  const retryFetchVehicleType = async () => {
    if (typeId) {
      try {
        setLoading(true);
        setError(null);
        const response = await vehicleService.getVehicleTypeById(
          Number(typeId),
        );
        if (response.data) {
          setVehicleType(response.data);
        } else {
          setError(response.message || "Failed to fetch vehicle type details");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching vehicle type details",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <VehicleTypeLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center p-6 sm:p-8 max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-teal-500 text-5xl sm:text-6xl mb-4">🌊</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Vehicle Type
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
          <button
            onClick={retryFetchVehicleType}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!vehicleType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center p-6 sm:p-8 max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-teal-400 text-5xl sm:text-6xl mb-4">🔍</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Vehicle Type Not Found
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            The vehicle type you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <VehicleTypeHeroSection vehicleType={vehicleType} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Images Section */}
          <div className="lg:col-span-1">
            <VehicleTypeImages
              images={vehicleType.images}
              vehicleTypeName={vehicleType.name}
            />
          </div>

          {/* Overview Section */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <VehicleTypeOverview vehicleType={vehicleType} />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <VehicleTypeFeatures vehicleType={vehicleType} />
        </div>
      </div>
    </div>
  );
};

export default VehicleTypeDetailsPage;
