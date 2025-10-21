"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReviewsSection from "@/components/destinations-components/ReviewsSection";

interface Activity {
  activityId: number;
  activityName: string;
  activityDescription: string;
  activitiesCategory: string;
  durationHours: number;
  availableFrom: string;
  availableTo: string;
  priceLocal: number;
  priceForeigners: number;
  minParticipate: number;
  maxParticipate: number;
  season: string;
}

interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

interface DestinationData {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  categoryDescription: string;
  statusName: string;
  activities: Activity[];
  images: DestinationImage[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationData;
  timestamp: string;
}

interface Review {
  reviewId: number;
  destinationId: number;
  destinationName: string;
  reviewUserId: number;
  reviewUserName: string;
  reviewText: string;
  reviewRating: number;
  reviewStatus: string;
  reviewCreatedBy: number;
  reviewCreatedAt: string;
  reviewUpdatedBy: number;
  reviewUpdatedAt: string;
  images: any[];
  reactions: any[];
  comments: any[];
}

const DestinationDetailsPage = () => {
  const { destinationId } = useParams();

  const [destination, setDestination] = useState<DestinationData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (destinationId) {
      fetchDestination();
      fetchDestinationReviews();
    }
  }, [destinationId]);

  const fetchDestinationReviews = async () => {
    try {
      setReviewsLoading(true);
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

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/destination/${destinationId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch destination");
      }

      const data: ApiResponse = await response.json();
      setDestination(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Destination
          </h2>
          <p className="text-gray-600">{error || "Destination not found"}</p>
        </div>
      </div>
    );
  }

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  const getSeasonColors = (season: string) => {
    const seasons = season.split(",");
    return seasons.map((season) => {
      const trimmed = season.trim();
      switch (trimmed) {
        case "Summer":
          return "bg-yellow-100 text-yellow-800";
        case "Winter":
          return "bg-blue-100 text-blue-800";
        case "Spring":
          return "bg-green-100 text-green-800";
        case "Autumn":
          return "bg-orange-100 text-orange-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {destination.destinationName}
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-purple-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-medium">{destination.location}</span>
                </div>
                <div className="flex items-center text-amber-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span className="font-medium">
                    {destination.categoryName}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
              {destination.statusName}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Tabs */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="relative h-96">
                {destination.images.length > 0 ? (
                  <Image
                    src={
                      destination.images[activeImageIndex]?.imageUrl ||
                      "/api/placeholder/800/400"
                    }
                    alt={
                      destination.images[activeImageIndex]?.imageDescription ||
                      destination.destinationName
                    }
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-2xl">
                      {destination.destinationName}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {destination.images.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="flex space-x-3 overflow-x-auto">
                    {destination.images.map((image, index) => (
                      <button
                        key={image.imageId}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                          activeImageIndex === index
                            ? "border-amber-500 shadow-md"
                            : "border-gray-300 hover:border-purple-300"
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={image.imageDescription}
                          width={80}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "activities", label: "Activities" },
                    { id: "location", label: "Location" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "text-purple-600 border-b-2 border-purple-600"
                          : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      About {destination.destinationName}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {destination.destinationDescription}
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">
                        Category Description
                      </h4>
                      <p className="text-amber-700">
                        {destination.categoryDescription}
                      </p>
                    </div>
                  </div>
                )}

                {/* Activities Tab */}
                {activeTab === "activities" && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Activities ({destination.activities.length})
                    </h3>
                    <div className="space-y-4">
                      {destination.activities.map((activity) => (
                        <div
                          key={activity.activityId}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {activity.activityName}
                            </h4>
                            <div className="flex space-x-2">
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                                {activity.activitiesCategory}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-3">
                            {activity.activityDescription}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-4 h-4 mr-2 text-amber-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {activity.durationHours} hours
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-4 h-4 mr-2 text-purple-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                              </svg>
                              {activity.minParticipate}-
                              {activity.maxParticipate} people
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {formatTime(activity.availableFrom)} -{" "}
                              {formatTime(activity.availableTo)}
                            </div>
                          </div>

                          <div className="mt-3 flex justify-between items-center">
                            <div className="flex space-x-4">
                              <div>
                                <span className="text-sm text-gray-500">
                                  Local
                                </span>
                                <p className="font-semibold text-amber-600">
                                  LKR {activity.priceLocal.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">
                                  Foreigners
                                </span>
                                <p className="font-semibold text-purple-600">
                                  LKR{" "}
                                  {activity.priceForeigners.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex space-x-1">
                              {activity.season
                                .split(",")
                                .map((season, index) => (
                                  <span
                                    key={season}
                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                      getSeasonColors(activity.season)[index]
                                    }`}
                                  >
                                    {season.trim()}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === "location" && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Location Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Coordinates
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Latitude:</span>
                            <span className="font-mono text-gray-900">
                              {destination.latitude}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-gray-600">Longitude:</span>
                            <span className="font-mono text-gray-900">
                              {destination.longitude}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Region
                        </h4>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <p className="text-amber-800 font-medium">
                            {destination.location}
                          </p>
                          <p className="text-amber-600 text-sm mt-1">
                            Sri Lanka
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="mt-6 bg-gradient-to-br from-amber-100 to-purple-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-amber-300">
                      <div className="text-center">
                        <svg
                          className="w-12 h-12 text-amber-500 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        <p className="text-amber-700 font-medium">
                          Interactive Map
                        </p>
                        <p className="text-amber-600 text-sm">
                          Map integration would go here
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking & Info */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Facts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-amber-600">
                    {destination.categoryName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold text-purple-600">
                    {destination.location}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Activities</span>
                  <span className="font-semibold text-gray-900">
                    {destination.activities.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`font-semibold ${
                      destination.statusName === "ACTIVE"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {destination.statusName}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact/Booking Card */}
            <div className="bg-gradient-to-br from-amber-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Ready to Explore?</h3>
              <p className="mb-4 opacity-90">
                Book your adventure today and experience the best of{" "}
                {destination.destinationName}
              </p>
              <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-3">
                Book Now
              </button>
              <button className="w-full bg-transparent border border-white py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                Contact Guide
              </button>
            </div>

            {/* Gallery Preview */}
            {destination.images.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Gallery
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {destination.images.slice(0, 4).map((image, index) => (
                    <button
                      key={image.imageId}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        setActiveImageIndex(index);
                        setActiveTab("overview");
                      }}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={image.imageDescription}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                {destination.images.length > 4 && (
                  <p className="text-center text-gray-500 text-sm mt-3">
                    +{destination.images.length - 4} more images
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section at the Bottom */}
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
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
