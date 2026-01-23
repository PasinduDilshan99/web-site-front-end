"use client";

import { EmptyState } from "@/components/common-components/empty-state/EmptyState";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import Loading from "@/components/common-components/loading/Loading";
import BookingSection from "@/components/packages-components/BookingSection";
import DestinationsSection from "@/components/packages-components/DestinationsSection";
import PackageGallery from "@/components/packages-components/PackageGallery";
import PackageHeader from "@/components/packages-components/PackageHeader";
import PackageInfo from "@/components/packages-components/PackageInfo";
import ReviewsSection from "@/components/packages-components/ReviewsSection";
import TourDetailsSection from "@/components/packages-components/TourDetailsSection";
import HistoryCarousel from "@/components/packages-components/HistoryCarousel";
import PackageHistoryGallery from "@/components/packages-components/PackageHistoryGallery";
import {
  Destination,
  TourDetails,
  ActivePackagesType,
  ExtendedActivity,
  PackageReview,
  PackageHistory,
  PackageHistoryImage,
} from "@/types/package-types";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { DestinationService } from "@/services/destinationService";
import { PackageService } from "@/services/packageService";
import { TourService } from "@/services/tourService";

const PackagePage = () => {
  const params = useParams();
  const packageId = params?.packageId || "1";
  const [packageData, setPackageData] = useState<ActivePackagesType | null>(
    null
  );
  const [tourData, setTourData] = useState<TourDetails | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<PackageReview[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [allActivities, setAllActivities] = useState<ExtendedActivity[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  // New states for history and history images
  const [history, setHistory] = useState<PackageHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<PackageHistoryImage[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [historyImagesLoading, setHistoryImagesLoading] =
    useState<boolean>(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (packageId) {
      fetchPackageData();
      fetchReviews();
      fetchHistory();
      fetchHistoryImages();
    }
  }, [packageId]);

  const fetchPackageData = async () => {
    try {
      setLoading(true);
      setError(null);

      // USING THE SERVICE INSTEAD OF DIRECT FETCH
      const { data: fetchedPackage, error: packageError } = 
        await PackageService.fetchPackageDetails(packageId[0]);

      if (packageError) {
        throw new Error(packageError);
      }

      if (!fetchedPackage) {
        throw new Error("No package data found");
      }

      setPackageData(fetchedPackage);

      // USING THE SERVICE FOR TOUR DETAILS
      const { data: fetchedTour, error: tourError } = 
        await TourService.getTourDetails(fetchedPackage.tourId.toString());

      if (tourError) {
        console.error("Error fetching tour details:", tourError);
        // Don't throw error, just log it
      } else {
        setTourData(fetchedTour);
      }

      // USING THE DESTINATION SERVICE
      const { data: destinationsData, activities, error: destinationsError } = 
        await DestinationService.fetchDestinationsByTourId(fetchedPackage.tourId);

      if (destinationsError) {
        console.error("Error fetching destinations:", destinationsError);
        // Don't throw error, just log it - destinations might be optional
      } else {
        setDestinations(destinationsData);
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

  const fetchReviews = async (): Promise<void> => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);

      if (!packageId) return;

      // USING THE SERVICE INSTEAD OF DIRECT FETCH
      const { reviews: fetchedReviews, error } = await PackageService.fetchPackageReviewsById(packageId[0]);

      if (error) {
        setReviewsError(error);
      } else {
        setReviews(fetchedReviews);
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

  const fetchHistory = async (): Promise<void> => {
    try {
      setHistoryLoading(true);
      setHistoryError(null);

      if (!packageId) return;

      // USING THE SERVICE INSTEAD OF DIRECT FETCH
      const { history: fetchedHistory, error } = await PackageService.fetchPackageHistoryById(packageId[0]);

      if (error) {
        setHistoryError(error);
      } else {
        setHistory(fetchedHistory);
      }
    } catch (err) {
      setHistoryError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching package history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchHistoryImages = async (): Promise<void> => {
    try {
      setHistoryImagesLoading(true);
      setHistoryImagesError(null);

      if (!packageId) return;

      // USING THE SERVICE INSTEAD OF DIRECT FETCH
      const { historyImages: fetchedImages, error } = await PackageService.fetchPackageHistoryImagesById(packageId[0]);

      if (error) {
        setHistoryImagesError(error);
      } else {
        setHistoryImages(fetchedImages);
      }
    } catch (err) {
      setHistoryImagesError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching package history images"
      );
    } finally {
      setHistoryImagesLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchPackageData();
    fetchReviews();
    fetchHistory();
    fetchHistoryImages();
  };

  const handleReviewsRetry = () => {
    setReviewsError(null);
    fetchReviews();
  };

  const handleHistoryRetry = () => {
    setHistoryError(null);
    fetchHistory();
  };

  const handleHistoryImagesRetry = () => {
    setHistoryImagesError(null);
    fetchHistoryImages();
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
              // loading={reviewsLoading}
              // error={reviewsError}
              // onRetry={handleReviewsRetry}
            />
          </div>
          {/* History Section */}
          <HistoryCarousel
            historyData={history}
            loading={historyLoading}
            error={historyError}
            onRetry={handleHistoryRetry}
          />

          {/* Package History Gallery Section */}
          <PackageHistoryGallery
            imagesData={historyImages}
            loading={historyImagesLoading}
            error={historyImagesError}
            onRetry={handleHistoryImagesRetry}
          />
        </div>
      </div>
  );
};

export default PackagePage;