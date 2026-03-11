// components/seasons-components/SeasonHeroSection.tsx
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HeroSectionLoading from "../loading-components/HeroSectionLoading";
import { HeroSectionService } from "@/services/heroSectionService";
import { SeasonHeroData } from "@/types/hero-section-types";
import { SEASON_PAGE_PATH } from "@/utils/urls";

const SeasonHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<SeasonHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: items, error } =
          await HeroSectionService.fetchSeasonHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to load seasons content");
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
    }, 4500);

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

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const handleButtonClick = (link?: string) => {
    if (link) {
      if (link.startsWith("http")) {
        window.open(link, "_blank");
      } else if (link.startsWith("#")) {
        const element = document.querySelector(link);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = link;
      }
    }
  };

  if (loading) {
    return <HeroSectionLoading text="Seasons hero content loading..." />;
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Sri Lanka Seasons
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-cyan-300 mb-6">
            {error || "No seasons content available"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg hover:from-cyan-700 hover:to-teal-700 transition-all duration-300 mr-4 shadow-md"
            >
              Retry
            </button>
            <Link
              href={SEASON_PAGE_PATH}
              className="px-6 py-3 border-2 border-cyan-300 text-white rounded-lg hover:bg-cyan-50 hover:text-teal-900 transition-all duration-300"
            >
              Explore Seasons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentSlideData = heroData[currentSlide] || {};

  // Function to get seasonal gradient based on name or month (now with sea colors)
  const getSeasonalGradient = (seasonName?: string) => {
    const name = seasonName?.toLowerCase() || "";
    if (name.includes("summer") || name.includes("sun")) {
      return "from-teal-500 via-cyan-500 to-blue-500";
    } else if (name.includes("winter") || name.includes("snow")) {
      return "from-blue-300 via-cyan-300 to-teal-300";
    } else if (name.includes("spring") || name.includes("flower")) {
      return "from-emerald-400 via-teal-400 to-cyan-400";
    } else if (name.includes("autumn") || name.includes("fall")) {
      return "from-cyan-500 via-blue-500 to-teal-500";
    } else if (name.includes("monsoon") || name.includes("rain")) {
      return "from-blue-600 via-cyan-600 to-teal-600";
    } else {
      return "from-cyan-400 via-teal-400 to-blue-400";
    }
  };

  const seasonalGradient = getSeasonalGradient(currentSlideData.name);

  return (
    <div className="relative w-full h-[70vh] lg:h-[90vh] overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {heroData.map((item, index) => {
          const hasImage = item.imageUrl && !failedImages.has(index);

          return (
            <div
              key={item.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {hasImage ? (
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(20, 168, 168, 0.5)), url('${item.imageUrl}')`,
                  }}
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900" />
              )}
            </div>
          );
        })}
      </div>

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-12 lg:top-28 right-6 text-white/80 text-sm backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full border border-white/20">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pt-12 lg:pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl text-white mx-auto text-center">
            <div className="mb-8">
              {/* Season Name Badge */}
              {currentSlideData.name && (
                <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 backdrop-blur-sm rounded-full border border-cyan-300/30">
                  <span className="text-sm font-medium text-cyan-100 uppercase tracking-wider flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12z" />
                    </svg>
                    {currentSlideData.name}
                  </span>
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight">
                {currentSlideData.title ||
                  "Experience Sri Lanka in Every Season"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-6">
                  <h2 className="text-md md:text-lg lg:text-3xl font-semibold mb-3 text-cyan-100">
                    {currentSlideData.subtitle}
                  </h2>
                  <div
                    className={`w-20 h-1 bg-gradient-to-r ${seasonalGradient} rounded-full mx-auto shadow-lg`}
                  ></div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 max-w-3xl mb-8 border border-white/10 shadow-2xl mx-auto">
              <p className="text-sm md:text-lg lg:text-xl mb-6 text-slate-100 leading-relaxed">
                {currentSlideData.description ||
                  "Discover the best time to visit Sri Lanka. From the cool hill country to sun-drenched beaches, each season offers unique experiences for your perfect getaway."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
                      }
                      className={`cursor-pointer w-full sm:w-auto px-5 sm:px-7 md:px-9 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:from-sky-600 hover:to-teal-600 transform hover:scale-[1.02] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 sm:gap-4 group`}
                    >
                      <svg
                        className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {currentSlideData.primaryButtonText}
                    </button>
                  )}
                  {currentSlideData.secondaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.secondaryButtonLink)
                      }
                      className="cursor-pointer w-full sm:w-auto px-5 sm:px-7 md:px-9 py-3 sm:py-4 md:py-5 border-2 border-sky-300/50 text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:bg-sky-50/20 hover:border-sky-200 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 group"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
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
                      {currentSlideData.secondaryButtonText}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Seasonal Highlights */}
            <div className="lg:grid grid-cols-1 md:grid-cols-3 gap-4 hidden mx-auto max-w-4xl">
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-cyan-200/90">Peak Season</p>
                  <p className="text-base font-bold text-white">
                    December - March
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-teal-500/20 hover:border-teal-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-teal-200/90">Monsoon</p>
                  <p className="text-base font-bold text-white">
                    May - September
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-blue-200/90">Inter-monsoon</p>
                  <p className="text-base font-bold text-white">
                    October - November
                  </p>
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
            className="hidden lg:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group md:left-6 border border-white/20 shadow-lg"
            aria-label="Previous slide"
          >
            <svg
              className="cursor-pointer w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
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
            className="hidden lg:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group md:right-6 border border-white/20 shadow-lg"
            aria-label="Next slide"
          >
            <svg
              className="cursor-pointer w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroData.map((_, index) => (
            <button
              key={index + 1}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-cyan-400 to-teal-400 scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {heroData.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
          <div
            className={`h-full bg-gradient-to-r ${seasonalGradient} transition-all duration-500`}
            style={{
              width: `${((currentSlide + 1) / heroData.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SeasonHeroSection;
