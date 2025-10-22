"use client";
import React from "react";
import { useParams } from "next/navigation";
import ReviewsSection from "@/components/sri-lankan-tours-components/ReviewsSection";
import { TourReview } from "@/types/sri-lankan-tour-types";
import TourMapContainer from "@/components/sri-lankan-tours-components/tour-map-components/TourMapContainer";

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
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

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
    }
  }, [sriLankanTourId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDuration = (days: number) => {
    const nights = days - 1;
    return `${nights < 10 ? "0" + nights : nights} Days ${
      days < 10 ? "0" + days : days
    } Nights`;
  };

  const handleRetryReviews = () => {
    if (tourId) {
      setReviewsLoading(true);
      setReviewsError(null);
      fetch(`http://localhost:8080/felicita/v0/api/tour/reviews/${tourId}`)
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

  if (tourLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (tourError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Error Loading Tour
          </h3>
          <p className="text-gray-600">{tourError}</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Tour not found
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-amber-600 to-purple-600">
        {tour.images.length > 0 && (
          <img
            src={tour.images[selectedImageIndex].imageUrl}
            alt={tour.images[selectedImageIndex].imageName}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{tour.tourName}</h1>
            <p className="text-xl opacity-90">{tour.tourDescription}</p>
          </div>
        </div>
      </div>

      {/* Image Thumbnails */}
      {tour.images.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {tour.images.map((image, index) => (
              <button
                key={image.imageId}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-amber-600 ring-2 ring-amber-400"
                    : "border-gray-300 hover:border-purple-400"
                }`}
              >
                <img
                  src={image.imageUrl}
                  alt={image.imageName}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Tour Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-800">
                      {formatDuration(tour.duration)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Route</p>
                    <p className="font-semibold text-gray-800">
                      {tour.startLocation} → {tour.endLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-800">
                      {tour.tourCategoryName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Season</p>
                    <p className="font-semibold text-gray-800">
                      {tour.seasonName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                  {tour.tourTypeName}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  {tour.tourCategoryName}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                  {tour.statusName}
                </span>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {tour.tourDescription}
                </p>
              </div>
            </div>

            {/* Schedules Section */}
            {tour.schedules.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Available Schedules
                </h2>
                <div className="space-y-4">
                  {tour.schedules.map((schedule) => (
                    <div
                      key={schedule.scheduleId}
                      className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {schedule.scheduleName}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {formatDuration(schedule.durationStart)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">
                            {formatDate(schedule.assumeStartDate)} -{" "}
                            {formatDate(schedule.assumeEndDate)}
                          </span>
                        </div>
                      </div>

                      {schedule.specialNote && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                          <p className="text-sm text-amber-800 flex items-center gap-2">
                            <svg
                              className="w-4 h-4 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="font-medium">Special Note:</span>{" "}
                            {schedule.specialNote}
                          </p>
                        </div>
                      )}

                      <p className="text-gray-600 text-sm">
                        {schedule.scheduleDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Book This Tour
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Starting from</span>
                  <span className="text-3xl font-bold text-amber-600">$50</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Best price guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Free cancellation</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Book Now
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Secure your spot with easy booking
                </p>
              </div>
            </div>

            {/* Tour Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Tour Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Tour Type</p>
                  <p className="font-medium text-gray-800">
                    {tour.tourTypeName}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {tour.tourTypeDescription}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium text-gray-800">
                    {tour.tourCategoryName}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {tour.tourCategoryDescription}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Best Season</p>
                  <p className="font-medium text-gray-800">{tour.seasonName}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {tour.seasonDescription}
                  </p>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default SriLankanTourDetailsPage;
