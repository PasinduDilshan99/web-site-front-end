"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { TourHeroData } from "@/types/hero-section-types";
import { NUMBER_OF_TOUR_CATEGORIES } from "@/utils/constant";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const TourHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<TourHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: items, error } = await HeroSectionService.fetchTourHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to load tour content");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || heroData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroData.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroData.length) % heroData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getFallbackImage = (index: number) => {
    const fallbackImages = [
      "photo-1544551763-46a013bb70d5",
      "photo-1585506936724-fa0c19c7b7c4",
      "photo-1579444741963-5bce5eb9d1d2",
      "photo-1523348837708-15d4a09cfac2",
      "photo-1551632811-561732d1e306",
      "photo-1544367567-0f2fcb009e0b",
      "photo-1565557623262-b51c2513a641",
      "photo-1552733407-5d5c46c3bb3b",
      "photo-1520250497591-112f2f40a3f4",
      "photo-1469474968028-56623f02e42e",
    ];
    return `https://images.unsplash.com/${
      fallbackImages[index % fallbackImages.length]
    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80`;
  };

  if (loading) {
    return (
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] xl:h-[800px] 2xl:h-[850px] overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            Loading Amazing Tours...
          </p>
        </div>
      </div>
    );
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-2xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              Sri Lanka Tours
            </h1>
            <div className="w-24 sm:w-28 md:w-32 h-0.5 sm:h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-amber-300 mb-4 sm:mb-6">
            {error || "No tour content available"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-amber-600 text-white text-sm sm:text-base rounded-lg hover:bg-amber-700 transition-colors"
            >
              Retry
            </button>
            <a
              href="/tours/all"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-white text-white text-sm sm:text-base rounded-lg hover:bg-white hover:text-purple-900 transition-all duration-300 text-center"
            >
              View All Tours
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentSlideData = heroData[currentSlide];

  return (
    <div className="relative w-full h-[550px] sm:h-[600px] md:h-[700px] lg:h-[750px] xl:h-[800px] 2xl:h-[850px] overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {heroData.map((item, index) => (
          <div
            key={item.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(88, 28, 135, 0.5), rgba(120, 53, 15, 0.7)), url('${
                  item.imageUrl || getFallbackImage(index)
                }')`,
              }}
              onError={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(88, 28, 135, 0.5), rgba(120, 53, 15, 0.7)), url('${getFallbackImage(
                  index
                )}')`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Tour Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-10 hidden lg:flex">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-400/30">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-white">
            <span className="text-amber-200 font-bold">{NUMBER_OF_TOUR_CATEGORIES}</span>{" "}
            Tour Categories
          </span>
        </div>
      </div>

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white/70 text-xs sm:text-sm backdrop-blur-sm bg-black/20 px-2 sm:px-3 py-1 rounded-full z-10">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-white">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight">
                {currentSlideData.title || "Discover Sri Lanka"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 text-amber-200">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-amber-400 rounded-full"></div>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 max-w-full sm:max-w-2xl md:max-w-3xl mb-4 sm:mb-6 md:mb-8 border border-white/20 shadow-2xl">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 text-gray-100 leading-relaxed">
                {currentSlideData.description ||
                  "Experience the beauty and diversity of Sri Lanka with our expertly curated tours. From golden beaches to misty mountains, we have the perfect adventure for every traveler."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        router.push(
                          `/sri-lankan-tours?tourType=${currentSlideData.primaryButtonLink}`
                        )
                      }
                      className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-amber-500 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:from-amber-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 sm:gap-3 group"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                      <span className="truncate">
                        {currentSlideData.primaryButtonText}
                      </span>
                    </button>
                  )}
                  {currentSlideData.secondaryButtonText && (
                    <button
                      onClick={() =>
                        router.push(
                          `/sri-lankan-tours?location=${currentSlideData.secondaryButtonLink}`
                        )
                      }
                      className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 border-white/50 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-white hover:text-purple-900 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="truncate">
                        {currentSlideData.secondaryButtonText}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Tour Highlights */}
            <div className="lg:grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 hidden">
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-amber-200 truncate">
                    Destinations
                  </p>
                  <p className="text-base sm:text-lg font-bold">50+</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-purple-200 truncate">Duration</p>
                  <p className="text-base sm:text-lg font-bold">1-14 Days</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-amber-200 truncate">
                    Customer Rating
                  </p>
                  <p className="text-base sm:text-lg font-bold">4.9/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {heroData.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group z-10"
            aria-label="Previous slide"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
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
            onClick={nextSlide}
            className="hidden lg:flex absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group z-10"
            aria-label="Next slide"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
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

      {/* Slide Indicators */}
      {heroData.length > 1 && (
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-amber-400 scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {heroData.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-purple-400 transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / heroData.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Quick Actions */}
      {/* <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 right-3 sm:right-4 md:right-6 z-10">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => (window.location.href = "/plan-your-trip")}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-amber-600 to-purple-700 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-amber-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 group"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Custom Tour</span>
            <span className="sm:hidden">Custom</span>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default TourHeroSection;