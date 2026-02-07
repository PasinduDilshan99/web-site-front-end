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
      "photo-1507525428034-b723cf961d3e", // Beach sunset
      "photo-1518837695005-2083093ee35b", // Ocean waves
      "photo-1505142468610-359e7d316be0", // Mountain lake
      "photo-1493246507139-91e8fad9978e", // Coastal view
      "photo-1439066615861-d1af74d74000", // Underwater sea
      "photo-1469474968028-56623f02e42e", // Mountain panorama
      "photo-1506905925346-21bda4d32df4", // Blue sea
      "photo-1501854140801-50d01698950b", // Forest lake
      "photo-1500673922987-e212871fec22", // Tropical island
      "photo-1493246507139-91e8fad9978e", // Mountains
    ];
    return `https://images.unsplash.com/${fallbackImages[index % fallbackImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80`;
  };

  if (loading) {
    return (
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] xl:h-[800px] 2xl:h-[850px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 border-b-2 border-sky-400 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            Loading Amazing Tours...
          </p>
        </div>
      </div>
    );
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-2xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              Sri Lanka Tours
            </h1>
            <div className="w-24 sm:w-28 md:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-sky-400 to-teal-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-sky-300 mb-4 sm:mb-6">
            {error || "No tour content available"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white text-sm sm:text-base rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-md"
            >
              Retry
            </button>
            <a
              href="/tours/all"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-sky-300 text-white text-sm sm:text-base rounded-lg hover:bg-sky-50 hover:text-slate-900 transition-all duration-300 text-center"
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
    <div className="relative w-full h-[550px] sm:h-[600px] md:h-[700px] lg:h-[750px] xl:h-[800px] 2xl:h-[850px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
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
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(8, 145, 178, 0.5)), url('${
                  item.imageUrl || getFallbackImage(index)
                }')`,
              }}
              onError={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.7), rgba(8, 145, 178, 0.6)), url('${getFallbackImage(
                  index
                )}')`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Tour Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-10 hidden lg:flex">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-sky-500/20 backdrop-blur-sm rounded-full border border-sky-400/30">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-400 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-white">
            <span className="text-sky-200 font-bold">{NUMBER_OF_TOUR_CATEGORIES}</span>{" "}
            Tour Categories
          </span>
        </div>
      </div>

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white/80 text-xs sm:text-sm backdrop-blur-sm bg-black/30 px-3 sm:px-4 py-1.5 rounded-full z-10 border border-white/20">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Content Overlay - CENTERED */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-white mx-auto text-center">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight">
                {currentSlideData.title || "Discover Sri Lanka"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 text-sky-100">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full mx-auto shadow-lg"></div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 max-w-full sm:max-w-2xl md:max-w-3xl mb-4 sm:mb-6 md:mb-8 border border-white/10 shadow-2xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 text-slate-100 leading-relaxed">
                {currentSlideData.description ||
                  "Experience the beauty and diversity of Sri Lanka with our expertly curated tours. From golden beaches to misty mountains, we have the perfect adventure for every traveler."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-5 justify-center">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        router.push(
                          `/sri-lankan-tours?tourType=${currentSlideData.primaryButtonLink}`
                        )
                      }
                      className="w-full sm:w-auto px-5 sm:px-7 md:px-9 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:from-sky-600 hover:to-teal-600 transform hover:scale-[1.02] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 sm:gap-4 group"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform duration-300"
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
                      className="w-full sm:w-auto px-5 sm:px-7 md:px-9 py-3 sm:py-4 md:py-5 border-2 border-sky-300/50 text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:bg-sky-50/20 hover:border-sky-200 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 group"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-300"
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

            {/* Tour Highlights - CENTERED */}
            <div className="lg:grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 hidden mx-auto max-w-4xl">
              <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-sky-500/20 hover:border-sky-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-sky-500/20 to-sky-600/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300"
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
                <div className="min-w-0 text-left">
                  <p className="text-xs sm:text-sm text-sky-200/90 truncate">
                    Destinations
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">50+</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-teal-500/20 hover:border-teal-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300"
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
                <div className="min-w-0 text-left">
                  <p className="text-xs sm:text-sm text-teal-200/90 truncate">Duration</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">1-14 Days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300"
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
                <div className="min-w-0 text-left">
                  <p className="text-xs sm:text-sm text-cyan-200/90 truncate">
                    Customer Rating
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">4.9/5</p>
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
            className="hidden lg:flex absolute left-3 sm:left-4 md:left-5 lg:left-7 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 sm:p-3.5 md:p-4 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group z-10 shadow-lg"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-200"
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
            className="hidden lg:flex absolute right-3 sm:right-4 md:right-5 lg:right-7 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 sm:p-3.5 md:p-4 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group z-10 shadow-lg"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-200"
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
        <div className="absolute bottom-7 sm:bottom-9 md:bottom-11 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-sky-400 to-teal-400 scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {heroData.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 sm:h-1.5 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400 transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / heroData.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TourHeroSection;