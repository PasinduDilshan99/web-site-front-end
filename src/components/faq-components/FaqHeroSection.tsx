"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { FaqHeroData } from "@/types/hero-section-types";
import React, { useState, useEffect } from "react";
import HeroSectionLoading from "../loading-components/HeroSectionLoading";

const FaqHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<FaqHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: items, error } =
          await HeroSectionService.fetchFaqHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to load FAQ content");
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
    }, 6000);

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
    return <HeroSectionLoading text="FAQ hero content loading..." />;
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[70vh] lg:h-[90vh] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white">
              Help Center
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-sky-400 to-teal-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-lg sm:text-xl text-sky-200 mb-6">
            {error || "No FAQ content available"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
            >
              Retry
            </button>
            <a
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 border-2 border-sky-300 text-white rounded-lg hover:bg-sky-50 hover:text-slate-900 transition-all duration-300 text-center"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentSlideData = heroData[currentSlide];

  return (
    <div className="relative w-full h-[70vh] lg:h-[90vh] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
      {/* Image Slider - Only show gradient if no image or image failed */}
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
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(8, 145, 178, 0.6)), url('${item.imageUrl}')`,
                  }}
                  onError={() => handleImageError(index)}
                />
              ) : (
                // Pure gradient background when no image or image failed
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900" />
              )}
            </div>
          );
        })}
      </div>

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white/80 text-xs sm:text-sm backdrop-blur-sm bg-black/30 px-3 sm:px-4 py-1.5 rounded-full z-10 border border-white/20">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Content Overlay - Centered properly */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight text-white">
                {currentSlideData.title || "Help Center"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 text-sky-100">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-teal-400 mx-auto rounded-full"></div>
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 mb-8 border border-white/10 shadow-2xl max-w-3xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-slate-100 leading-relaxed">
                {currentSlideData.description ||
                  "Find quick answers to your questions about bookings, payments, support, and more. Our comprehensive FAQ section covers everything you need to know."}
              </p>

              {/* Buttons */}
              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
                      }
                      className="cursor-pointer px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm sm:text-base font-semibold rounded-xl hover:from-sky-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 group min-w-[200px]"
                    >
                      <span>{currentSlideData.primaryButtonText}</span>
                    </button>
                  )}
                  {currentSlideData.secondaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.secondaryButtonLink)
                      }
                      className="cursor-pointer px-6 sm:px-8 py-3 sm:py-4 border-2 border-sky-300/50 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-sky-50/20 hover:border-sky-200 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3 group min-w-[200px]"
                    >
                      <span>{currentSlideData.secondaryButtonText}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Stats Cards - Centered */}
            <div className="hidden lg:flex flex-wrap gap-4 justify-center">
              {/* Solved Issues */}
              <div className="hidden lg:flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-sky-500/20 hover:border-sky-400/40 hover:bg-white/10 transition-all duration-300 min-w-[180px]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/20 to-sky-600/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-sky-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-sky-200/90">Solved Issues</p>
                  <p className="text-xl font-bold text-white">95%</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="hidden lg:flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-teal-500/20 hover:border-teal-400/40 hover:bg-white/10 transition-all duration-300 min-w-[180px]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-teal-300"
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
                <div>
                  <p className="text-xs text-teal-200/90">Response Time</p>
                  <p className="text-xl font-bold text-white">1 hour</p>
                </div>
              </div>

              {/* Active Support */}
              <div className="hidden lg:flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300 min-w-[180px]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-cyan-200/90">Active Support</p>
                  <p className="text-xl font-bold text-white">24/7</p>
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
            className="cursor-pointer hidden lg:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group z-10 shadow-lg"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
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
            className="hidden lg:flex cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group z-10 shadow-lg"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-sky-400 to-teal-400 w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {heroData.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
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

export default FaqHeroSection;
