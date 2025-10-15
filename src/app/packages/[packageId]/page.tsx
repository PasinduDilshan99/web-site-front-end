"use client";

import Footer from "@/app/components/footer/Footer";
import { EmptyState } from "@/components/common-components/empty-state/EmptyState";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import Loading from "@/components/common-components/loading/Loading";
import NavBar from "@/components/common-components/navBar/NavBar";
import ActivitiesSection from "@/components/packages-components/ActivitiesSection";
import BookingSection from "@/components/packages-components/BookingSection";
import DestinationsSection from "@/components/packages-components/DestinationsSection";
import PackageGallery from "@/components/packages-components/PackageGallery";
import PackageHeader from "@/components/packages-components/PackageHeader";
import PackageInfo from "@/components/packages-components/PackageInfo";
import ReviewsSection from "@/components/packages-components/ReviewsSection";
import TourDetailsSection from "@/components/packages-components/TourDetailsSection";
import {
  Destination,
  TourDetails,
  ActivePackagesType,
  ApiResponse,
  ExtendedActivity,
  PackageReview,
  ReviewsResponse, // Import ExtendedActivity instead of Activity
} from "@/types/packages-types";
import {
  GET_DESTINATIONS_DETAILS_BY_TOUR_ID_BE,
  GET_PACKAGE_DETAILS_BY_ID_BE,
  GET_TOUR_DETAILS_BY_ID_BE,
} from "@/utils/backEndConstant";
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
  const [reviews, setReviews] = useState<PackageReview[]>([]); // New state for reviews
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [allActivities, setAllActivities] = useState<ExtendedActivity[]>([]); // Change to ExtendedActivity[]
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false); // Separate loading for reviews
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  useEffect(() => {
    if (packageId) {
      fetchPackageData();
      fetchReviews(); // Fetch reviews when component mounts
    }
  }, [packageId]);

  const fetchPackageData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch package details
      const packageResponse = await fetch(
        `${GET_PACKAGE_DETAILS_BY_ID_BE}/${packageId}`
      );
      const packageResult: ApiResponse<ActivePackagesType> =
        await packageResponse.json();

      if (packageResult.code !== 200) {
        throw new Error(
          packageResult.message || "Failed to fetch package details"
        );
      }

      setPackageData(packageResult.data);

      // Fetch tour details using tourId from package
      const tourResponse = await fetch(
        `${GET_TOUR_DETAILS_BY_ID_BE}/${packageResult.data.tourId}`
      );
      const tourResult: ApiResponse<TourDetails> = await tourResponse.json();

      if (tourResult.code === 200) {
        setTourData(tourResult.data);
      }

      // Fetch destinations for the tour
      const destinationsResponse = await fetch(
        `${GET_DESTINATIONS_DETAILS_BY_TOUR_ID_BE}/${packageResult.data.tourId}`
      );
      const destinationsResult: ApiResponse<Destination[]> =
        await destinationsResponse.json();

      if (destinationsResult.code === 200) {
        setDestinations(destinationsResult.data);

        // Create ExtendedActivity objects with destination information
        const activities: ExtendedActivity[] = destinationsResult.data.flatMap(
          (destination) =>
            destination.activities.map((activity) => ({
              ...activity,
              destinationName: destination.destinationName,
              destinationId: destination.destinationId,
            }))
        );
        setAllActivities(activities);
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

  const handleReviewsRetry = () => {
    setReviewsError(null);
    fetchReviews();
  };

  const fetchReviews = async (): Promise<void> => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);

      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/package/reviews/${packageId}`
      );
      const result: ReviewsResponse = await response.json();

      if (result.code === 200) {
        setReviews(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setReviewsError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching reviews"
      );
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
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
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <PackageHeader packageData={packageData} />

        <div className="container mx-auto px-4 py-8">
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

              {/* Activities Section */}
              {/* {allActivities.length > 0 && (
              <ActivitiesSection activities={allActivities} />
            )} */}

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
          <div className="mt-8">
            <ReviewsSection
              reviews={reviews}
              loading={reviewsLoading}
              error={reviewsError}
              onRetry={handleReviewsRetry}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PackagePage;
