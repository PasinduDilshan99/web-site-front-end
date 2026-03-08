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
import InclusionsExclusions from "@/components/packages-components/InclusionsExclusions";
import TravelTips from "@/components/packages-components/TravelTips";
import DayByDayItinerary from "@/components/packages-components/DayByDayItinerary";
import {
  Destination,
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
import PackageDetailsHeroSection from "@/components/packages-components/PackageDetailsHeroSection";
import PackageDetailsLoading from "@/components/packages-components/PackageDetailsLoading";
import { TourDetails } from "@/types/tour-types";
import PackageDetailsLoadingError from "@/components/packages-components/PackageDetailsLoadingError";

const PackageDetailsPage = () => {
  const params = useParams();
  const packageId = (params?.packageId as string) || 1;
  const [packageData, setPackageData] = useState<ActivePackagesType | null>(
    null,
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
    null,
  );

  useEffect(() => {
    if (packageId) {
      fetchPackageData();
      // fetchReviews();
      // fetchHistory();
      // fetchHistoryImages();
    }
  }, [packageId]);

  const fetchPackageData = async () => {
    try {
      setLoading(true);
      setError(null);

      // USING THE SERVICE INSTEAD OF DIRECT FETCH
      const { data: fetchedPackage, error: packageError } =
        await PackageService.fetchPackageAllDetails(packageId);

      if (packageError) {
        throw new Error(packageError);
      }

      if (!fetchedPackage) {
        throw new Error("No package data found");
      }

      setPackageData(fetchedPackage);

      // Fetch tour details if needed
      if (fetchedPackage.tourId) {
        const { data: fetchedTour, error: tourError } =
          await TourService.getTourDetails(fetchedPackage.tourId.toString());

        if (tourError) {
          console.error("Error fetching tour details:", tourError);
        } else {
          setTourData(fetchedTour);
        }
      }

      // Fetch destinations if needed
      const {
        data: destinationsData,
        activities,
        error: destinationsError,
      } = await DestinationService.fetchDestinationsByTourId(
        fetchedPackage.tourId,
      );

      if (destinationsError) {
        console.error("Error fetching destinations:", destinationsError);
      } else {
        setDestinations(destinationsData);
        setAllActivities(activities);
      }
    } catch (err) {
      console.error("Error fetching package data:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching package details",
      );
    } finally {
      setLoading(false);
    }
  };

  // const fetchReviews = async (): Promise<void> => {
  //   try {
  //     setReviewsLoading(true);
  //     setReviewsError(null);

  //     if (!packageId) return;

  //     const { reviews: fetchedReviews, error } =
  //       await PackageService.fetchPackageReviewsById(packageId[0]);

  //     if (error) {
  //       setReviewsError(error);
  //     } else {
  //       setReviews(fetchedReviews);
  //     }
  //   } catch (err) {
  //     setReviewsError(
  //       err instanceof Error
  //         ? err.message
  //         : "An error occurred while fetching reviews",
  //     );
  //   } finally {
  //     setReviewsLoading(false);
  //   }
  // };

  // const fetchHistory = async (): Promise<void> => {
  //   try {
  //     setHistoryLoading(true);
  //     setHistoryError(null);

  //     if (!packageId) return;

  //     const { history: fetchedHistory, error } =
  //       await PackageService.fetchPackageHistoryById(packageId[0]);

  //     if (error) {
  //       setHistoryError(error);
  //     } else {
  //       setHistory(fetchedHistory);
  //     }
  //   } catch (err) {
  //     setHistoryError(
  //       err instanceof Error
  //         ? err.message
  //         : "An error occurred while fetching package history",
  //     );
  //   } finally {
  //     setHistoryLoading(false);
  //   }
  // };

  // const fetchHistoryImages = async (): Promise<void> => {
  //   try {
  //     setHistoryImagesLoading(true);
  //     setHistoryImagesError(null);

  //     if (!packageId) return;

  //     const { historyImages: fetchedImages, error } =
  //       await PackageService.fetchPackageHistoryImagesById(packageId[0]);

  //     if (error) {
  //       setHistoryImagesError(error);
  //     } else {
  //       setHistoryImages(fetchedImages);
  //     }
  //   } catch (err) {
  //     setHistoryImagesError(
  //       err instanceof Error
  //         ? err.message
  //         : "An error occurred while fetching package history images",
  //     );
  //   } finally {
  //     setHistoryImagesLoading(false);
  //   }
  // };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchPackageData();
    // fetchReviews();
    // fetchHistory();
    // fetchHistoryImages();
  };

  const handleReviewsRetry = () => {
    setReviewsError(null);
    // fetchReviews();
  };

  const handleHistoryRetry = () => {
    setHistoryError(null);
    // fetchHistory();
  };

  const handleHistoryImagesRetry = () => {
    setHistoryImagesError(null);
    // fetchHistoryImages();
  };

  if (loading) {
    return <PackageDetailsLoading />;
  }

  if (error) {
    return (
      <PackageDetailsLoadingError
        onRetry={handleRetry}
        message="Couldn't fetch the complete package information."
      />
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
    ...packageData.packageImages.map((img) => ({
      ...img,
      type: "package" as const,
    })),
    ...(tourData?.images?.map((img) => ({
      ...img,
      type: "tour" as const,
    })) || []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      {/* <PackageHeader packageData={packageData} /> */}
      <PackageDetailsHeroSection packageData={packageData} />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Gallery and Info */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Image Gallery */}
            <PackageGallery
              images={allImages}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />

            {/* Package Information */}
            <PackageInfo packageData={packageData} />

            {/* Inclusions & Exclusions */}
            <InclusionsExclusions packageData={packageData} />

            {/* Travel Tips */}
            <TravelTips travelTips={packageData.travelTips} />

            {/* Day by Day Itinerary */}
            {packageData.dayAccommodationResponses?.packageDayByDayDtoList && (
              <DayByDayItinerary
                itinerary={
                  packageData.dayAccommodationResponses.packageDayByDayDtoList
                }
              />
            )}

            {/* Tour Details */}
            {/* {tourData && <TourDetailsSection tourData={tourData} />} */}

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

        {/* Reviews Section */}
        {/* <div className="mt-8 sm:mt-12 md:mt-16">
          <ReviewsSection
            reviews={reviews}
            // loading={reviewsLoading}
            // error={reviewsError}
            // onRetry={handleReviewsRetry}
          />
        </div> */}

        {/* History Section */}
        {/* {history.length > 0 && (
          <div className="mt-8 sm:mt-12 md:mt-16">
            <HistoryCarousel
              historyData={history}
              loading={historyLoading}
              error={historyError}
              onRetry={handleHistoryRetry}
            />
          </div>
        )} */}

        {/* Package History Gallery Section */}
        {/* {historyImages.length > 0 && (
          <div className="mt-8 sm:mt-12 md:mt-16">
            <PackageHistoryGallery
              imagesData={historyImages}
              loading={historyImagesLoading}
              error={historyImagesError}
              onRetry={handleHistoryImagesRetry}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PackageDetailsPage;
