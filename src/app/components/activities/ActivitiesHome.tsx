"use client";
import { GET_ACTIVE_ACTIVITIES_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import { EmptyState } from "../common/EmptyState";
import { ErrorState } from "../common/ErrorState";
import Loading from "../common/Loading";
import AnimatedButton from "../common/AnimatedButton";
import SectionHeader from "../common/SectionHeader";

interface Schedule {
  id: number;
  name: string;
  description: string;
  status: number;
  assume_start_date: string;
  assume_end_date: string;
  duration_hours_start: number;
  duration_hours_end: number;
  special_note: string;
}

interface Requirement {
  id: number;
  name: string;
  value: string;
  description: string;
  color: string;
  status: number;
}

interface ActivityImage {
  id: number;
  name: string;
  description: string;
  status: number;
  image_url: string;
}

interface ActiveActivitiesType {
  id: number;
  name: string;
  description: string;
  season: string;
  status: string;
  schedules: Schedule[];
  requirements: Requirement[];
  images: ActivityImage[];
  destination_id: number;
  activities_category: string;
  duration_hours: number;
  available_from: string;
  available_to: string;
  price_local: number;
  price_foreigners: number;
  min_participate: number;
  max_participate: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_description: string;
}

// Image Slideshow Component for each activity
const ActivityImageSlideshow = ({
  images,
  activityName,
}: {
  images: ActivityImage[];
  activityName: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter out images with invalid URLs
  const validImages = images.filter(
    (img) => img.image_url && img.image_url.trim() !== ""
  );

  // If no valid images, use placeholder
  if (validImages.length === 0) {
    return (
      <div className="relative w-full h-40 sm:h-48 md:h-56 bg-gray-200 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center">
        <span className="text-gray-500 text-sm">No Image Available</span>
      </div>
    );
  }

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    if (validImages.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [validImages.length]);

  const goToImage = (index: number) => {
    if (index === currentImageIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const nextImage = () => {
    if (validImages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevImage = () => {
    if (validImages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(
        (prev) => (prev - 1 + validImages.length) % validImages.length
      );
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-xl sm:rounded-t-2xl group">
      {/* Main Image */}
      <div className="relative w-full h-full">
        {validImages.map((image, index) => (
          <img
            key={image.id}
            src={image.image_url}
            alt={image.name || activityName}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            } ${
              isTransitioning ? "scale-105" : "scale-100"
            } transition-transform duration-500`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Show on hover */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          {currentImageIndex + 1} / {validImages.length}
        </div>
      )}

      {/* Navigation Dots */}
      {validImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Strip - Show on hover for quick navigation */}
      {validImages.length > 1 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm rounded-lg p-1">
          {validImages.slice(0, 4).map((image, index) => (
            <button
              key={image.id}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? "border-white scale-110"
                  : "border-white/50 hover:border-white/80"
              }`}
            >
              <img
                src={image.image_url}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </button>
          ))}
          {validImages.length > 4 && (
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/70 rounded flex items-center justify-center">
              <span className="text-white text-xs">
                +{validImages.length - 4}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ActivitiesHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeActivities, setActiveActivities] = useState<
    ActiveActivitiesType[]
  >([]);
  const [displayCount, setDisplayCount] = useState(3);

  // Update display count based on screen size
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: 3 activities
        setDisplayCount(3);
      } else if (width < 1024) {
        // Tablet: 4 activities
        setDisplayCount(4);
      } else if (width < 1280) {
        // Laptop: 6 activities
        setDisplayCount(6);
      } else {
        // PC and large screens: 8 activities
        setDisplayCount(8);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ACTIVE_ACTIVITIES_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveActivitiesType[] = data.data || [];
          setActiveActivities(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active activities");
        }
      } catch (err) {
        console.error("Error fetching active activities:", err);
        setError("Something went wrong while fetching active activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Get filtered activities based on display count
  const displayedActivities = activeActivities.slice(0, displayCount);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      ACTIVE: "bg-green-100 text-green-800 border border-green-200",
      UPCOMING: "bg-blue-100 text-blue-800 border border-blue-200",
      COMPLETED: "bg-gray-100 text-gray-800 border border-gray-200",
      CANCELLED: "bg-red-100 text-red-800 border border-red-200",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border border-gray-200"
    );
  };

  // Parse seasons
  const getSeasonBadges = (seasonString: string) => {
    return seasonString.split(",").map((s) => s.trim());
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading message="Loading popular tours..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
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

  if (activeActivities.length === 0) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Activities"
            title="Adventure Activities"
            description="Discover exciting activities and experiences. From thrilling adventures to relaxing tours, find the perfect activity for your next journey."
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedActivities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Activity Image Slideshow */}
              <div className="relative">
                <ActivityImageSlideshow
                  images={activity.images}
                  activityName={activity.name}
                />

                {/* Category Badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {activity.category_name}
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                        ${activity.price_foreigners}
                      </span>
                      <span className="text-xs text-gray-600 ml-1">
                        foreign
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">
                        ${activity.price_local}
                      </span>
                      <span className="text-xs text-gray-600 ml-1">local</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Content */}
              <div className="p-3 sm:p-4 md:p-6">
                {/* Activity Title and Description */}
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-1">
                  {activity.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                  {activity.description}
                </p>

                {/* Key Information Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"
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
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {activity.duration_hours} hours
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {activity.min_participate}-{activity.max_participate}
                    </span>
                  </div>
                </div>

                {/* Seasons */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                      Best Seasons
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {getSeasonBadges(activity.season).map((season, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 text-orange-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs"
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                {activity.requirements.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">
                        Requirements
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {activity.requirements.slice(0, 2).map((req) => (
                        <span
                          key={req.id}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${req.color}20`,
                            color: req.color,
                          }}
                        >
                          {req.name}: {req.value}
                        </span>
                      ))}
                      {activity.requirements.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                          +{activity.requirements.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Schedules */}
                {activity.schedules.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"
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
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">
                        Schedules
                      </span>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      {activity.schedules.slice(0, 1).map((schedule) => (
                        <div
                          key={schedule.id}
                          className="bg-gray-50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm"
                        >
                          <div className="font-medium text-gray-900">
                            {schedule.name}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {formatDate(schedule.assume_start_date)} -{" "}
                            {formatDate(schedule.assume_end_date)}
                          </div>
                          {schedule.special_note && (
                            <div className="text-blue-600 text-xs mt-1">
                              💡 {schedule.special_note}
                            </div>
                          )}
                        </div>
                      ))}
                      {activity.schedules.length > 1 && (
                        <div className="text-center text-xs text-gray-500">
                          +{activity.schedules.length - 1} more schedules
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Availability Times */}
                <div className="mb-3 sm:mb-4 bg-blue-50 rounded-lg p-2 sm:p-3">
                  <div className="text-xs sm:text-sm text-gray-700">
                    <span className="font-semibold">Available:</span>{" "}
                    {activity.available_from} - {activity.available_to}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {activeActivities.length > displayCount && (
          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
            <AnimatedButton
              onClick={() => setDisplayCount(activeActivities.length)}
            >
              Show All {activeActivities.length} Activities
            </AnimatedButton>
          </div>
        )}

        {/* View All Button when all are displayed */}
        {displayedActivities.length === activeActivities.length &&
          activeActivities.length > 0 && (
            <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
              <AnimatedButton onClick={() => console.log("View all clicked")}>
                View All Activities
              </AnimatedButton>
            </div>
          )}

        {/* Display Count Info */}
        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          Showing {displayedActivities.length} of {activeActivities.length}{" "}
          activities
        </div>
      </div>
    </div>
  );
};

export default ActivitiesHome;
