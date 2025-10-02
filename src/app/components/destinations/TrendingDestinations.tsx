"use client";
import { GET_TRENDING_DESTINATIONS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Updated TypeScript interfaces based on new API response
interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedAt: string;
}

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

interface TrendingDestinationType {
  popularId: number;
  rating: number;
  popularity: number;
  popularCreatedAt: string;
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  destinationStatus: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  images: DestinationImage[];
  activities: Activity[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: TrendingDestinationType[];
  timestamp: string;
}

const TrendingDestinations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendingDestinations, setTrendingDestinations] = useState<
    TrendingDestinationType[]
  >([]);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [isTransitioning, setIsTransitioning] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchTrendingDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_TRENDING_DESTINATIONS);
        const data: ApiResponse = await response.json();

        if (response.ok && data.code === 200) {
          const items: TrendingDestinationType[] = data.data || [];
          // Filter only active destinations that have valid images
          const activeTrendingDestinations = items.filter(
            (item) =>
              item.destinationStatus === "ACTIVE" &&
              item.images &&
              item.images.length > 0 &&
              item.images.some(
                (img) => img.imageUrl && img.imageUrl.trim() !== ""
              )
          );
          setTrendingDestinations(activeTrendingDestinations);

          // Initialize current image indexes and transition states
          const initialIndexes: { [key: number]: number } = {};
          const initialTransitions: { [key: number]: boolean } = {};
          activeTrendingDestinations.forEach((item) => {
            initialIndexes[item.destinationId] = 0;
            initialTransitions[item.destinationId] = false;
          });
          setCurrentImageIndexes(initialIndexes);
          setIsTransitioning(initialTransitions);

          setError(null);
        } else {
          setError(data.message || "Failed to fetch trending destinations");
        }
      } catch (err) {
        console.error("Error fetching trending destinations:", err);
        setError("Something went wrong while fetching trending destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingDestinations();
  }, []);

  // Auto-rotate images effect with smooth transition
  useEffect(() => {
    if (trendingDestinations.length === 0) return;

    const interval = setInterval(() => {
      trendingDestinations.forEach((trending) => {
        const destinationId = trending.destinationId;
        const imageCount = trending.images.length;

        if (imageCount > 1) {
          // Start transition
          setIsTransitioning((prev) => ({ ...prev, [destinationId]: true }));

          // Change image after transition starts
          setTimeout(() => {
            setCurrentImageIndexes((prevIndexes) => ({
              ...prevIndexes,
              [destinationId]: (prevIndexes[destinationId] + 1) % imageCount,
            }));

            // End transition
            setTimeout(() => {
              setIsTransitioning((prev) => ({
                ...prev,
                [destinationId]: false,
              }));
            }, 100);
          }, 250);
        }
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [trendingDestinations]);

  // Handle destination click
  const handleDestinationClick = (
    destinationId: number,
    destinationName: string
  ) => {
    window.location.href = `/destinations/${destinationId}?name=${encodeURIComponent(
      destinationName
    )}`;
  };

  // Handle manual image change on hover
  const handleCardHover = (destinationId: number) => {
    const destination = trendingDestinations.find(
      (t) => t.destinationId === destinationId
    );
    if (destination && destination.images.length > 1) {
      const imageCount = destination.images.length;

      // Start transition
      setIsTransitioning((prev) => ({ ...prev, [destinationId]: true }));

      // Change image after transition starts
      setTimeout(() => {
        setCurrentImageIndexes((prev) => ({
          ...prev,
          [destinationId]: (prev[destinationId] + 1) % imageCount,
        }));

        // End transition
        setTimeout(() => {
          setIsTransitioning((prev) => ({ ...prev, [destinationId]: false }));
        }, 100);
      }, 250);
    }
  };

  // Loading state
  if (loading)
    return (
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div className="animate-pulse">
              <div className="h-6 sm:h-7 lg:h-8 bg-gray-300 rounded w-48 sm:w-56 lg:w-64 mb-2"></div>
            </div>
            <div className="h-8 sm:h-9 lg:h-10 bg-gray-300 rounded-full w-24 sm:w-28 lg:w-32 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 rounded-xl h-48 sm:h-56 lg:h-64 xl:h-72"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

  // Error state
  if (error)
    return (
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <p className="text-red-500 text-base sm:text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );

  // No data state
  if (trendingDestinations.length === 0)
    return (
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <p className="text-gray-500 text-base sm:text-lg">
              No trending destinations found
            </p>
          </div>
        </div>
      </section>
    );

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header with Explore More button */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore our destinations
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Trending Destinations
          </h2>
        </div>

        {/* Full Background Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
          {trendingDestinations.slice(0, 4).map((trending) => {
            const currentImageIndex =
              currentImageIndexes[trending.destinationId] || 0;
            const currentImage =
              trending.images && trending.images.length > 0
                ? trending.images[currentImageIndex]
                : null;
            const destinationExperts = Math.floor(Math.random() * 50) + 20;
            const isCardTransitioning =
              isTransitioning[trending.destinationId] || false;

            return (
              <div
                key={trending.popularId}
                onClick={() =>
                  handleDestinationClick(
                    trending.destinationId,
                    trending.destinationName
                  )
                }
                onMouseEnter={() => handleCardHover(trending.destinationId)}
                className="relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 h-48 sm:h-56 lg:h-64 xl:h-72 2xl:h-80"
              >
                {/* Full Background Image with Smooth Transition */}
                <div className="absolute inset-0">
                  {currentImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={currentImage.imageUrl}
                        alt={
                          currentImage.imageDescription ||
                          trending.destinationName
                        }
                        fill
                        className={`object-cover transition-all duration-500 ease-in-out ${
                          isCardTransitioning
                            ? "opacity-0 scale-110"
                            : "opacity-100 scale-100"
                        } group-hover:scale-105`}
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/400/320";
                        }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        priority={currentImageIndex === 0}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm sm:text-base lg:text-lg text-center px-3 sm:px-4">
                        {trending.destinationName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

                {/* Image Counter Dots */}
                {trending.images.length > 1 && (
                  <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 flex space-x-1 sm:space-x-1.5">
                    {trending.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${
                          index === currentImageIndex
                            ? "bg-white shadow-lg"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 lg:p-5 xl:p-6">
                  {/* Top Section - Rating */}
                  {trending.rating && (
                    <div className="flex justify-end">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5">
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-white text-xs sm:text-sm font-medium">
                            {trending.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Section - Destination Info */}
                  <div className="text-white">
                    {/* Destination Name */}
                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300 leading-tight">
                      {trending.destinationName}
                    </h3>

                    {/* Location with Icon */}
                    <div className="flex items-center mb-2 sm:mb-3 opacity-90">
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white/80 mr-1 sm:mr-1.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm truncate">
                        {trending.location}
                      </span>
                    </div>

                    {/* Experts Count and Category */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 sm:p-1.5 flex-shrink-0">
                          <svg
                            className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-white/90 truncate">
                          {trending.activities.length} + Activities
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="bg-white/25 backdrop-blur-sm rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 flex-shrink-0">
                        <span className="text-xs text-white font-medium truncate">
                          {trending.categoryName}
                        </span>
                      </div>
                    </div>

                    {/* Image Progress Bar */}
                    {trending.images.length > 1 && (
                      <div className="mt-2 sm:mt-3">
                        <div className="w-full bg-white/20 rounded-full h-0.5 sm:h-1">
                          <div
                            className="bg-white h-0.5 sm:h-1 rounded-full transition-all duration-500 ease-linear"
                            style={{
                              width: `${
                                ((currentImageIndex + 1) /
                                  trending.images.length) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl lg:rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;