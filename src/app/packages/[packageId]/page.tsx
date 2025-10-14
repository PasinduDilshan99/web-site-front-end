"use client";

import { EmptyState } from "@/components/common-components/empty-state/EmptyState";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import Loading from "@/components/common-components/loading/Loading";
import BookingSection from "@/components/packages-components/BookingSection";
import DestinationsSection from "@/components/packages-components/DestinationsSection";
import PackageGallery from "@/components/packages-components/PackageGallery";
import PackageHeader from "@/components/packages-components/PackageHeader";
import PackageInfo from "@/components/packages-components/PackageInfo";
import TourDetailsSection from "@/components/packages-components/TourDetailsSection";
import {
  Destination,
  TourDetails,
  ActivePackagesType,
  ApiResponse,
} from "@/types/packages-types";
import {
  GET_DESTINATIONS_DETAILS_BY_TOUR_ID_FE,
  GET_PACKAGE_DETAILS_BY_ID_FE,
  GET_TOUR_DETAILS_BY_ID_FE,
} from "@/utils/frontEndConstant";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const PackagePage = () => {
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState<ActivePackagesType | null>(
    null
  );
  const [tourData, setTourData] = useState<TourDetails | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (packageId) {
      fetchPackageData();
    }
  }, [packageId]);

  const fetchPackageData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch package details using POST
      const packageResponse = await fetch(GET_PACKAGE_DETAILS_BY_ID_FE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId })
      });
      
      console.log('Package API Response status:', packageResponse.status);
      
      if (!packageResponse.ok) {
        throw new Error(`HTTP error! status: ${packageResponse.status}`);
      }
      
      const packageResult: ApiResponse<ActivePackagesType> =
        await packageResponse.json();

      console.log('Package API Response:', packageResult);

      if (packageResult.code !== 200) {
        throw new Error(
          packageResult.message || "Failed to fetch package details"
        );
      }

      if (!packageResult.data) {
        throw new Error("No package data received");
      }

      console.log('Package Data:', packageResult.data);
      console.log('Tour ID from package:', packageResult.data.tourId);

      setPackageData(packageResult.data);

      // Check if tourId exists and is valid
      if (!packageResult.data.tourId) {
        console.warn('No tourId found in package data');
        return;
      }

      // Fetch tour details using POST
      const tourResponse = await fetch(GET_TOUR_DETAILS_BY_ID_FE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tourId: packageResult.data.tourId })
      });
      
      console.log('Tour API Response status:', tourResponse.status);
      
      if (!tourResponse.ok) {
        throw new Error(`HTTP error! status: ${tourResponse.status}`);
      }
      
      const tourResult: ApiResponse<TourDetails> = await tourResponse.json();

      console.log('Tour API Response:', tourResult);

      if (tourResult.code === 200) {
        setTourData(tourResult.data);
      }

      // Fetch destinations using POST
      const destinationsResponse = await fetch(GET_DESTINATIONS_DETAILS_BY_TOUR_ID_FE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tourId: packageResult.data.tourId })
      });
      
      console.log('Destinations API Response status:', destinationsResponse.status);
      
      if (!destinationsResponse.ok) {
        throw new Error(`HTTP error! status: ${destinationsResponse.status}`);
      }
      
      const destinationsResult: ApiResponse<Destination[]> =
        await destinationsResponse.json();

      console.log('Destinations API Response:', destinationsResult);

      if (destinationsResult.code === 200) {
        setDestinations(destinationsResult.data);
      }
    } catch (err) {
      console.error("Error fetching package data:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching package details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchPackageData();
  };

  if (loading) {
    return (
      <Loading
        message="Loading packages details..."
        variant="spinner"
        size="md"
      />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load packages details"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  if (!packageData) {
    return (
      <EmptyState
        title="No Content Available"
        message="We're preparing some amazing content for you. Please check back soon!"
        icon="data"
        size="md"
      />
    );
  }

  const allImages = [
    ...packageData.images.map((img) => ({
      ...img,
      type: "package" as const,
    })),
    ...(tourData?.images.map((img) => ({
      ...img,
      type: "tour" as const,
    })) || []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <PackageHeader packageData={packageData} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery and Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <PackageGallery
              images={allImages}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />

            {/* Package Information */}
            <PackageInfo packageData={packageData} />

            {/* Tour Details */}
            {tourData && <TourDetailsSection tourData={tourData} />}

            {/* Destinations */}
            {destinations.length > 0 && (
              <DestinationsSection destinations={destinations} />
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <BookingSection packageData={packageData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagePage;