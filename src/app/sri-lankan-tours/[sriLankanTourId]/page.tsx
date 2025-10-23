"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import ReviewsSection from "@/components/sri-lankan-tours-components/ReviewsSection";
import {
  TourHistory,
  TourHistoryImage,
  TourReview,
} from "@/types/sri-lankan-tour-types";
import TourMapContainer from "@/components/sri-lankan-tours-components/tour-map-components/TourMapContainer";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import { EmptyState } from "@/components/common-components/empty-state/EmptyState";
import SLTourDetailsHeroSection from "@/components/sri-lankan-tours-components/SLTourDetailsHeroSection";
import SLTourDetailsOverview from "@/components/sri-lankan-tours-components/SLTourDetailsOverview";
import SLTourDetailsSchedules from "@/components/sri-lankan-tours-components/SLTourDetailsSchedules";
import SLTourDetailsBookingSidebar from "@/components/sri-lankan-tours-components/SLTourDetailsBookingSidebar";
import TourHistorySection from "@/components/sri-lankan-tours-components/TourHistorySection";
import TourHistoryGallery from "@/components/sri-lankan-tours-components/TourHistoryGallery";

interface Schedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  scheduleDescription: string;
}

interface Image {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

interface TourDetails {
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourTypeName: string;
  tourTypeDescription: string;
  tourCategoryName: string;
  tourCategoryDescription: string;
  seasonName: string;
  seasonDescription: string;
  statusName: string;
  schedules: Schedule[];
  images: Image[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourDetails;
  timestamp: string;
}

interface ReviewsApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourReview[];
  timestamp: string;
}

const SriLankanTourDetailsPage = () => {
  const { sriLankanTourId } = useParams();
  const [tour, setTour] = React.useState<TourDetails | null>(null);
  const [reviews, setReviews] = React.useState<TourReview[]>([]);
  const [tourLoading, setTourLoading] = React.useState(true);
  const [reviewsLoading, setReviewsLoading] = React.useState(true);
  const [tourError, setTourError] = React.useState<string | null>(null);
  const [reviewsError, setReviewsError] = React.useState<string | null>(null);
  const [histories, setHistories] = useState<TourHistory[]>([]); // Add this state
  const [historyLoading, setHistoryLoading] = useState<boolean>(true); // Add this state
  const [historyError, setHistoryError] = useState<string | null>(null); // Add this state
  const [galleryImages, setGalleryImages] = useState<TourHistoryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState<boolean>(true);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setTourLoading(true);
        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/tour/${sriLankanTourId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tour details");
        }

        const data: ApiResponse = await response.json();
        setTour(data.data);
      } catch (err) {
        setTourError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setTourLoading(false);
      }
    };

    const fetchTourReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/tour/reviews/${sriLankanTourId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tour reviews");
        }

        const data: ReviewsApiResponse = await response.json();
        setReviews(data.data);
      } catch (err) {
        setReviewsError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setReviewsLoading(false);
      }
    };

    if (sriLankanTourId) {
      fetchTourDetails();
      fetchTourReviews();
      fetchTourHistory();
      fetchTourHistoryImages();
    }
  }, [sriLankanTourId]);

  const fetchTourHistory = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/tour/history/${sriLankanTourId}`
      );
      const result = await response.json();

      if (result.code === 200) {
        setHistories(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryError(
        err instanceof Error ? err.message : "Failed to load tour history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchTourHistoryImages = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/tour/history-images/${sriLankanTourId}`
      );
      const result = await response.json();

      if (result.code === 200) {
        setGalleryImages(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setGalleryError(
        err instanceof Error ? err.message : "Failed to load tour images"
      );
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleRetryReviews = () => {
    if (sriLankanTourId) {
      setReviewsLoading(true);
      setReviewsError(null);
      fetch(
        `http://localhost:8080/felicita/v0/api/tour/reviews/${sriLankanTourId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch tour reviews");
          }
          return response.json();
        })
        .then((data: ReviewsApiResponse) => {
          setReviews(data.data);
        })
        .catch((err) => {
          setReviewsError(
            err instanceof Error ? err.message : "An error occurred"
          );
        })
        .finally(() => {
          setReviewsLoading(false);
        });
    }
  };

  const handleRetryTour = () => {
    if (sriLankanTourId) {
      setTourLoading(true);
      setTourError(null);
      fetch(`http://localhost:8080/felicita/v0/api/tour/${sriLankanTourId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch tour details");
          }
          return response.json();
        })
        .then((data: ApiResponse) => {
          setTour(data.data);
        })
        .catch((err) => {
          setTourError(
            err instanceof Error ? err.message : "An error occurred"
          );
        })
        .finally(() => {
          setTourLoading(false);
        });
    }
  };

  if (tourLoading) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Loading
            message="Loading tour details..."
            variant="spinner"
            size="md"
          />
        </div>
      </section>
    );
  }

  if (tourError) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
            message={tourError}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetryTour}
          />
        </div>
      </section>
    );
  }

  if (!tour) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <EmptyState
            title="No Content Available"
            message="We're preparing some amazing content for you. Please check back soon!"
            icon="data"
            size="md"
          />
        </div>
      </section>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
        <SLTourDetailsHeroSection tour={tour} />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <SLTourDetailsOverview tour={tour} />
              <SLTourDetailsSchedules schedules={tour.schedules} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SLTourDetailsBookingSidebar tour={tour} />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          loading={reviewsLoading}
          error={reviewsError}
          onRetry={handleRetryReviews}
        />
        <TourMapContainer tourId={sriLankanTourId} />
        <TourHistorySection
          histories={histories}
          loading={historyLoading}
          error={historyError}
          onRetry={fetchTourHistory}
        />
        <TourHistoryGallery
          images={galleryImages}
          loading={galleryLoading}
          error={galleryError}
          onRetry={fetchTourHistoryImages}
        />
      </div>
      <Footer />
    </>
  );
};

export default SriLankanTourDetailsPage;
