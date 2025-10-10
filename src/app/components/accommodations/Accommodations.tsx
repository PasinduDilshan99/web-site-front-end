"use client";
import { GET_AVAILABLE_ACCOMMODATION } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SectionHeader from "../common/SectionHeader";
import AnimatedButton from "../common/AnimatedButton";

// Interface for accommodation based on your API response
interface AccommodationsType {
  accommodationId: number;
  accommodationTitle: string;
  accommodationSubTitle: string;
  accommodationDescription: string;
  accommodationIconUrl: string;
  accommodationImageUrl: string;
  accommodationColor: string;
  accommodationHoverColor: string;
  accommodationLinkUrl: string;
  accommodationStatus: string;
  accommodationStatusStatus: string;
}

// Default fallback image
const getDefaultImage = () => {
  return "/images/default-image.jpg";
};

const Accommodations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accommodations, setAccommodations] = useState<AccommodationsType[]>(
    []
  );
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Get valid image URL - now using accommodationImageUrl instead of accommodationIconUrl
  const getValidImageUrl = (originalUrl: string): string => {
    if (!originalUrl || imageErrors.has(originalUrl)) {
      return getDefaultImage();
    }
    return originalUrl;
  };

  // Get cards per view based on screen size
  const getCardsPerView = (): number => {
    if (typeof window === "undefined") return 3;

    const width = window.innerWidth;
    if (width < 640) return 1; // Mobile: 1 card
    if (width < 1024) return 2; // Tablet: 2 cards
    if (width < 1280) return 3; // Laptop: 3 cards
    if (width < 1536) return 4; // PC: 4 cards
    return 5; // Large screens: 5 cards
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (accommodations.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, accommodations.length - cardsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [accommodations.length, isHovered, cardsPerView]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_AVAILABLE_ACCOMMODATION);
        const data = await response.json();

        if (response.ok && data.code === 200) {
          const items: AccommodationsType[] = data.data || [];
          setAccommodations(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch accommodations");
        }
      } catch (err) {
        console.error("Error fetching accommodations:", err);
        setError("Something went wrong while fetching accommodations");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  // Handle accommodation click
  const handleAccommodationClick = (linkUrl: string) => {
    if (linkUrl) {
      window.location.href = linkUrl;
    }
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "BOOKED":
        return "bg-red-100 text-red-800";
      case "UNDER_MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Navigation functions
  const goToNext = () => {
    const maxIndex = Math.max(0, accommodations.length - cardsPerView);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const goToPrev = () => {
    const maxIndex = Math.max(0, accommodations.length - cardsPerView);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, accommodations.length - cardsPerView);
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Get visible slides
  const getVisibleSlides = () => {
    const slides = [];
    const totalSlides = accommodations.length;

    for (let i = 0; i < cardsPerView && i < totalSlides; i++) {
      const index = (currentIndex + i) % totalSlides;
      if (accommodations[index]) {
        slides.push(accommodations[index]);
      }
    }

    return slides;
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="animate-pulse">
              <div className="h-3 sm:h-4 bg-gray-300 rounded w-32 sm:w-48 mx-auto mb-2"></div>
              <div className="h-6 sm:h-8 bg-gray-300 rounded w-48 sm:w-64 mx-auto"></div>
            </div>
          </div>

          {/* Loading Carousel */}
          <div
            className={`flex justify-center items-center gap-2 sm:gap-4 md:gap-6`}
          >
            {[...Array(cardsPerView)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center animate-pulse"
              >
                <div className="w-full max-w-[280px] h-60 sm:h-72 md:h-80 lg:h-96 bg-gray-300 rounded-xl mb-3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-red-200">
            <p className="text-red-500 text-sm sm:text-base md:text-lg mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (accommodations.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              No accommodations available
            </p>
          </div>
        </div>
      </section>
    );
  }

  const visibleSlides = getVisibleSlides();
  const maxIndex = Math.max(0, accommodations.length - cardsPerView);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Lets plan your next home or holiday"
            title="ACCOMMODATION"
            description="Explore our diverse range of activity categories and find your perfect adventure"
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows - Hidden on mobile */}
          {accommodations.length > cardsPerView && (
            <>
              <button
                onClick={goToPrev}
                className="hidden sm:block absolute left-1 md:left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-600"
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
                onClick={goToNext}
                className="hidden sm:block absolute right-1 md:right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-600"
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

          {/* Carousel Track */}
          <div
            className={`flex justify-center items-stretch gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-6 md:px-12 lg:px-16`}
          >
            {visibleSlides.map((accommodation, index) => {
              const backgroundImageUrl = getValidImageUrl(
                accommodation.accommodationImageUrl
              );
              const isDefaultBg = backgroundImageUrl === getDefaultImage();

              return (
                <div
                  key={`${accommodation.accommodationId}-${currentIndex}-${index}`}
                  onClick={() =>
                    handleAccommodationClick(accommodation.accommodationLinkUrl)
                  }
                  className={`
                              group flex flex-col items-center 
                              p-2 sm:p-4 md:p-5 lg:p-6 
                              rounded-md sm:rounded-xl 
                              shadow-md transition-all duration-500 transform 
                              border border-gray-200 relative cursor-pointer 
                              hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl hover:scale-105
                              flex-1 
                              max-w-[420px] sm:max-w-[280px] md:max-w-[320px]
                              overflow-hidden
                            `}
                  style={{
                    backgroundColor: accommodation.accommodationColor,
                    minHeight: "220px", // smaller height for mobile
                    backgroundImage: !isDefaultBg
                      ? `url(${backgroundImageUrl})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      accommodation.accommodationHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      accommodation.accommodationColor;
                  }}
                >
                  {/* Background Image Overlay with Opacity Control */}
                  {!isDefaultBg && (
                    <div
                      className="absolute inset-0 bg-black opacity-80 group-hover:opacity-50 transition-opacity duration-500"
                      style={{ zIndex: 1 }}
                    />
                  )}

                  {/* Content Wrapper with higher z-index */}
                  <div className="relative z-10 flex flex-col items-center h-full">
                    {/* Status badge */}
                    {/* <div
                      className={`absolute -top-2 sm:-top-3 right-0 sm:right-0 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${getStatusColor(
                        accommodation.accommodationStatus
                      )} shadow-md`}
                    >
                      <span className="hidden sm:inline">
                        {accommodation.accommodationStatus.replace(/_/g, " ")}
                      </span>
                      <span className="sm:hidden">
                        {accommodation.accommodationStatus
                          .replace(/_/g, " ")
                          .substring(0, 8)}
                      </span>
                    </div> */}

                    {/* Icon Container */}
                    {/* <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 transform transition-transform duration-300 group-hover:scale-110 flex-shrink-0 mt-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 relative">
                        <Image
                          src={getValidImageUrl(
                            accommodation.accommodationIconUrl
                          )}
                          alt={`${accommodation.accommodationTitle} icon`}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    </div> */}

                    {/* Content */}
                    <div className="text-center flex-1 flex flex-col justify-center">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-2 drop-shadow-lg">
                        {accommodation.accommodationTitle}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3 line-clamp-2 drop-shadow-md">
                        {accommodation.accommodationSubTitle}
                      </p>

                      <p className="text-xs text-gray-300 line-clamp-2 sm:line-clamp-3 drop-shadow-md">
                        {accommodation.accommodationDescription}
                      </p>
                    </div>

                    {/* Hover Effect Underline */}
                    <div
                      className="mt-2 sm:mt-3 md:mt-4 h-0.5 sm:h-1 w-0 group-hover:w-full transition-all duration-300 rounded-full opacity-80"
                      style={{
                        backgroundColor: `${accommodation.accommodationHoverColor}`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          {accommodations.length > cardsPerView && (
            <div className="flex justify-center mt-6 sm:mt-8 pb-2 space-x-1 sm:space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-amber-600 to-purple-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile Navigation Buttons */}
        {accommodations.length > cardsPerView && (
          <div className="flex sm:hidden justify-center mt-6 space-x-4">
            <button
              onClick={goToPrev}
              className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
              onClick={goToNext}
              className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
          </div>
        )}

        {/* Call to Action */}
          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
            <AnimatedButton onClick={() => console.log("View all clicked")}>
              View All Accommodations
            </AnimatedButton>
          </div>
      </div>
    </section>
  );
};

export default Accommodations;
