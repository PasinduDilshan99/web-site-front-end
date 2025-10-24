"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewsSection from "@/components/destinations-components/ReviewsSection";
import DestinationDetailsLoading from "@/components/destinations-components/destinaton-details/DestinationDetailsLoading";
import DestinationDetailsError from "@/components/destinations-components/destinaton-details/DestinationDetailsError";
import DestinationDetailsHeader from "@/components/destinations-components/destinaton-details/DestinationDetailsHeader";
import DestinationDetailsMain from "@/components/destinations-components/destinaton-details/DestinationDetailsMain";
import DestinationDetailsSidebar from "@/components/destinations-components/destinaton-details/DestinationDetailsSidebar";
import DestinationHistory from "@/components/destinations-components/DestinationHistory";
import DestinationHistoryGallery from "@/components/destinations-components/DestinationHistoryGallery";
import { DestinationData, Review } from "@/types/destination-details-types";
import { DestinationHistoryType } from "@/types/destinations-types";
import { DestinationHistoryImage } from "@/types/destinations-types";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";

const DestinationDetailsPage = () => {
  const { destinationId } = useParams();

  const [destination, setDestination] = useState<DestinationData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [history, setHistory] = useState<DestinationHistoryType[]>([]);
  const [historyImages, setHistoryImages] = useState<DestinationHistoryImage[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyImagesLoading, setHistoryImagesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (destinationId) {
      fetchDestination();
      fetchDestinationReviews();
      fetchDestinationHistory();
      fetchDestinationHistoryImages(); // Fetch history images data
    }
  }, [destinationId]);

  const fetchDestinationReviews = async () => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/destination/reviews/${destinationId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      if (data.code === 200) {
        setReviews(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setReviewsError(
        err instanceof Error ? err.message : "Failed to load reviews"
      );
    } finally {
      setReviewsLoading(false);
    }
  };

  const fetchDestinationHistory = async () => {
    try {
      setHistoryLoading(true);
      setHistoryError(null);
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/destination/history/${destinationId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch destination history");
      }

      const data = await response.json();
      if (data.code === 200) {
        setHistory(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setHistoryError(
        err instanceof Error
          ? err.message
          : "Failed to load destination history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchDestinationHistoryImages = async () => {
    try {
      setHistoryImagesLoading(true);
      setHistoryImagesError(null);
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/destination/history-images/${destinationId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch destination history images");
      }

      const data = await response.json();
      if (data.code === 200) {
        setHistoryImages(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setHistoryImagesError(
        err instanceof Error
          ? err.message
          : "Failed to load destination history images"
      );
    } finally {
      setHistoryImagesLoading(false);
    }
  };

  const fetchDestination = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/destination/${destinationId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch destination");
      }

      const data = await response.json();
      setDestination(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRetryHistory = () => {
    fetchDestinationHistory();
  };

  const handleRetryHistoryImages = () => {
    fetchDestinationHistoryImages();
  };

  if (loading) {
    return <DestinationDetailsLoading />;
  }

  if (error || !destination) {
    return <DestinationDetailsError error={error} />;
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
        <DestinationDetailsHeader destination={destination} />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DestinationDetailsMain
                destination={destination}
                reviewsLoading={reviewsLoading}
                reviewsError={reviewsError}
                reviews={reviews}
                onRetryReviews={fetchDestinationReviews}
              />
            </div>

            <div className="space-y-6">
              <DestinationDetailsSidebar destination={destination} />
            </div>
          </div>

          {/* Destination History Section */}
          <div className="mt-12">
            <DestinationHistory
              historyData={history}
              loading={historyLoading}
              error={historyError}
              title="Destination History & Heritage"
              description="Discover the fascinating stories and historical events that shaped this amazing destination"
              onRetry={handleRetryHistory}
            />
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            {reviewsLoading ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-gray-600">Loading reviews...</span>
                </div>
              </div>
            ) : reviewsError ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Failed to Load Reviews
                  </h3>
                  <p className="text-gray-600 mb-4">{reviewsError}</p>
                  <button
                    onClick={fetchDestinationReviews}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <ReviewsSection
                reviews={reviews}
                loading={reviewsLoading}
                error={reviewsError}
              />
            )}
          </div>

          {/* Destination History Gallery Section */}
          <div className="mt-12">
            <DestinationHistoryGallery
              imagesData={historyImages}
              loading={historyImagesLoading}
              error={historyImagesError}
              title="Historical Images Collection"
              description="Browse through captivating photographs that capture the essence of this destination's history"
              onRetry={handleRetryHistoryImages}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DestinationDetailsPage;
