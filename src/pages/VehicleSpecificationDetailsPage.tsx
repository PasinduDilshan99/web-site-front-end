"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { VehicleSpecificationDetails } from "@/types/vehicle-types";
import { vehicleService } from "@/services/vehicleService";
import VehicleSpecificationHeroSection from "@/components/vehicle-components/specification-details-components/VehicleSpecificationHeroSection";
import VehicleSpecificationLoading from "@/components/vehicle-components/specification-details-components/VehicleSpecificationLoading";
import VehicleSpecificationImages from "@/components/vehicle-components/specification-details-components/VehicleSpecificationImages";
import VehicleSpecificationDetail from "@/components/vehicle-components/specification-details-components/VehicleSpecificationDetails";
import VehicleSpecificationKeyInfo from "@/components/vehicle-components/specification-details-components/VehicleSpecificationKeyInfo";
import VehicleSpecificationPerformance from "@/components/vehicle-components/specification-details-components/VehicleSpecificationPerformance";
import VehicleSpecificationFeatures from "@/components/vehicle-components/specification-details-components/VehicleSpecificationFeatures";
import VehicleSpecificationDimensions from "@/components/vehicle-components/specification-details-components/VehicleSpecificationDimensions";
import VehicleSpecificationSafety from "@/components/vehicle-components/specification-details-components/VehicleSpecificationSafety";

const VehicleSpecificationDetailsPage = () => {
  const params = useParams();
  const specificationId = params?.specificationId;
  const [vehicleSpec, setVehicleSpec] = useState<VehicleSpecificationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!specificationId) {
      setError("No vehicle specification ID provided");
      setLoading(false);
      return;
    }

    const fetchVehicleSpecification = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await vehicleService.getVehicleSpecificationById(
          Number(specificationId),
        );
        if (response.data) {
          setVehicleSpec(response.data);
        } else {
          setError(response.message || "Failed to fetch vehicle specification");
        }
      } catch (err) {
        console.error("Error fetching vehicle specification:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching vehicle specification details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleSpecification();
  }, [specificationId]);

  const retryFetchVehicleSpecification = async () => {
    if (specificationId) {
      try {
        setLoading(true);
        setError(null);
        const response = await vehicleService.getVehicleSpecificationById(
          Number(specificationId),
        );
        if (response.data) {
          setVehicleSpec(response.data);
        } else {
          setError(response.message || "Failed to fetch vehicle specification");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching vehicle specification details",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <VehicleSpecificationLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center p-6 sm:p-8 max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-teal-500 text-5xl sm:text-6xl mb-4">🌊</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Vehicle Specification
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
          <button
            onClick={retryFetchVehicleSpecification}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!vehicleSpec) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center p-6 sm:p-8 max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-teal-400 text-5xl sm:text-6xl mb-4">🔍</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Vehicle Specification Not Found
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            The vehicle specification you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <VehicleSpecificationHeroSection vehicleSpec={vehicleSpec} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Images Section - Full width on mobile, half on desktop */}
          <div className="lg:col-span-1">
            <VehicleSpecificationImages
              images={vehicleSpec.images}
              vehicleName={`${vehicleSpec.make} ${vehicleSpec.model}`}
            />
          </div>

          {/* Details Section - Stack on mobile */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <VehicleSpecificationDetail vehicleSpec={vehicleSpec} />
            <VehicleSpecificationKeyInfo vehicleSpec={vehicleSpec} />
          </div>
        </div>

        {/* Performance Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <VehicleSpecificationPerformance vehicleSpec={vehicleSpec} />
        </div>

        {/* Features and Dimensions Grid */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <VehicleSpecificationFeatures vehicleSpec={vehicleSpec} />
            <VehicleSpecificationDimensions vehicleSpec={vehicleSpec} />
          </div>
        </div>

        {/* Safety Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <VehicleSpecificationSafety vehicleSpec={vehicleSpec} />
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecificationDetailsPage;