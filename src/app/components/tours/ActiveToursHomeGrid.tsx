"use client";
import React, { useEffect, useState } from "react";
import { GET_ALL_ACTIVE_TOUR_FE } from "@/utils/frontEndConstant";
import Loading from "../../../components/common-components/loading/Loading";
import { ErrorState } from "../../../components/common-components/error-state/ErrorState";
import { EmptyState } from "../../../components/common-components/empty-state/EmptyState";
import SectionHeader from "../../../components/common-components/section-header/SectionHeader";
import AnimatedButton from "../../../components/common-components/buttons/AnimatedButton";

// Updated Interfaces for the new API response
interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

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

interface ActiveToursType {
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
  images: TourImage[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: ActiveToursType[];
  timestamp: string;
}

// Tour Card Component with Image Slideshow
const TourCard = ({ tour }: { tour: ActiveToursType }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all tour images
  const allImages = tour.images
    .map((img) => ({
      url: img.imageUrl,
      name: img.imageName,
    }))
    .filter((img) => img.url); // Filter out any empty URLs

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const formatDuration = (days: number) => {
    const nights = days - 1;
    return `${nights < 10 ? "0" + nights : nights} Days ${
      days < 10 ? "0" + days : days
    } Nights`;
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Calculate price based on tour category and duration
  const calculatePrice = () => {
    const basePrice = 50; // Base price per day
    let multiplier = 1;

    // Adjust price based on tour category
    if (tour.tourCategoryName === "Luxury") multiplier = 2.5;
    else if (tour.tourCategoryName === "Family") multiplier = 1.2;
    else if (tour.tourCategoryName === "Budget") multiplier = 0.8;

    return Math.round(basePrice * tour.duration * multiplier);
  };

  const price = calculatePrice();

  return (
    <div className="group cursor-pointer h-full">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-white border border-gray-100">
        {/* Main Image Area */}
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-56 xl:h-60 2xl:h-64 w-full flex-shrink-0">
          <img
            src={allImages[currentImageIndex]?.url || "/placeholder.jpg"}
            alt={allImages[currentImageIndex]?.name || tour.tourName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Image Counter Badge */}
          {allImages.length > 1 && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black bg-opacity-60 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Thumbnail Images - Horizontal on mobile, vertical on tablet and above */}
          {allImages.length > 1 && (
            <>
              {/* Mobile: Horizontal thumbnails at bottom */}
              <div className="absolute bottom-2 left-2 right-2 flex sm:hidden gap-1 justify-center">
                {allImages.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThumbnailClick(index);
                    }}
                    className={`w-8 h-6 rounded cursor-pointer border-2 transition-all duration-200 flex-shrink-0 ${
                      index === currentImageIndex
                        ? "border-white border-opacity-100 shadow-lg"
                        : "border-white border-opacity-60 hover:border-opacity-100"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
                {/* Show "more" indicator if there are more than 4 images */}
                {allImages.length > 4 && (
                  <div className="w-8 h-6 bg-black bg-opacity-60 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">
                      +{allImages.length - 4}
                    </span>
                  </div>
                )}
              </div>

              {/* Tablet and above: Vertical thumbnails */}
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 hidden sm:flex flex-col gap-1">
                {allImages.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThumbnailClick(index);
                    }}
                    className={`w-8 h-6 sm:w-10 sm:h-8 rounded cursor-pointer border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? "border-white border-opacity-100"
                        : "border-white border-opacity-60 hover:border-opacity-100"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
                {/* Show "more" indicator if there are more than 3 images */}
                {allImages.length > 3 && (
                  <div className="w-8 h-6 sm:w-10 sm:h-8 bg-black bg-opacity-60 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      +{allImages.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Navigation Dots - Hidden on mobile when thumbnails are visible, shown on larger screens */}
          {allImages.length > 1 && (
            <div
              className={`absolute bottom-3 left-3 gap-1 ${
                allImages.length > 1 ? "hidden sm:flex" : "flex"
              }`}
            >
              {allImages.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThumbnailClick(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-80"
                  }`}
                />
              ))}
              {allImages.length > 5 && (
                <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full" />
              )}
            </div>
          )}

          {/* Tour Title Overlay */}
          <div className="absolute bottom-14 sm:bottom-14 left-3 sm:left-4 right-3 sm:right-20">
            <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-bold leading-tight drop-shadow-lg line-clamp-2">
              {tour.tourName}
            </h3>
          </div>

          {/* Season Badge */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              {tour.seasonName}
            </span>
          </div>
        </div>

        {/* Tour Details Card */}
        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
          {/* Duration and Locations */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="inline-flex w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-full items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-sm sm:text-base md:text-base font-semibold text-gray-700">
              {formatDuration(tour.duration)}
            </span>
          </div>

          {/* Locations */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base text-gray-600">
            <span className="inline-flex w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full items-center justify-center flex-shrink-0">
              <svg
                className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="truncate text-sm sm:text-base">
              {tour.startLocation} → {tour.endLocation}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base md:text-base leading-relaxed mb-4 sm:mb-5 line-clamp-2 sm:line-clamp-3 flex-1">
            {tour.tourDescription}
          </p>

          {/* Price and Book Now Button */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="text-sm sm:text-base md:text-base text-gray-500">
              From{" "}
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                ${price}
              </span>
            </div>
            <button className="bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
              BOOK NOW
            </button>
          </div>

          {/* Tour Type and Category Badges */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex gap-1 sm:gap-2 flex-wrap">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                {tour.tourTypeName}
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                {tour.tourCategoryName}
              </span>
            </div>

            {/* Schedules Count */}
            {tour.schedules.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="inline-flex w-4 h-4 bg-blue-100 rounded-full items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2 h-2 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-xs sm:text-sm text-gray-600">
                  {tour.schedules.length} schedule
                  {tour.schedules.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ActiveToursHomeGrid = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTours, setActiveTours] = useState<ActiveToursType[]>([]);
  const [displayCount, setDisplayCount] = useState(3);

  // Update display count based on screen size
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: 3 cards
        setDisplayCount(3);
      } else if (width < 1024) {
        // Tablet: 6 cards
        setDisplayCount(6);
      } else {
        // Laptop, PC, Large screens: 9 cards
        setDisplayCount(9);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  useEffect(() => {
    const fetchActiveTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_TOUR_FE);
        const data: ApiResponse = await response.json();

        if (response.ok && data.code === 200) {
          const items: ActiveToursType[] = data.data || [];
          // Filter only active tours
          const activeItems = items.filter(
            (tour) => tour.statusName === "ACTIVE"
          );
          setActiveTours(activeItems);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active tours");
        }
      } catch (err) {
        console.error("Error fetching active tours:", err);
        setError("Something went wrong while fetching active tours");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTours();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  // Get filtered tours based on display count
  const displayedTours = activeTours.slice(0, displayCount);

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <Loading
          message="Loading popular tours..."
          variant="spinner"
          size="md"
        />
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

  if (activeTours.length === 0) {
    return (
      <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    <div className="w-full bg-gradient-to-br from-amber-50 to-purple-50 py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Lets plan your next home or holiday"
            title="Tours"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Tours Grid */}
        {displayedTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg sm:text-xl">
              No active tours available at the moment.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {displayedTours.map((tour) => (
                <TourCard key={tour.tourId} tour={tour} />
              ))}
            </div>

            {/* Show More Button - Only show if there are more tours to display */}
            {activeTours.length > displayCount && (
              <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
                <AnimatedButton onClick={() => console.log("Clicked!")}>
                  More Tours
                </AnimatedButton>
              </div>
            )}

            {/* View All Tours Button - Show when all tours are displayed */}
            {displayedTours.length === activeTours.length &&
              activeTours.length > 0 && (
                <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
                  <AnimatedButton onClick={() => console.log("Clicked!")}>
                    More Tours
                  </AnimatedButton>
                </div>
              )}
          </>
        )}

        {/* Display Count Info - For debugging/visual reference */}
        <div className="text-center mt-6 text-sm sm:text-base text-gray-500">
          Showing {displayedTours.length} of {activeTours.length} tours
        </div>
      </div>
    </div>
  );
};

export default ActiveToursHomeGrid;
