"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { HeroSlideData } from "@/types/hero-section-types";
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<HeroSlideData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const { data: items, error } = await HeroSectionService.fetchAllHeroData();
        if (error) {
          setError(error);
        } else {
          setHeroData(items);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching hero data:", err);
        setError("Failed to load hero content");
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
    // Resume auto-play after 10 seconds
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

  const handleButtonClick = (link?: string) => {
    if (link) {
      // Handle navigation - you can use Next.js router here
      window.location.href = link;
    }
  };

  // Get fallback image URL
  const getFallbackImage = (index: number) => {
    const fallbackImages = [
      "1506905925346-21bea83d5653",
      "1469474968028-56623f02e42e",
      "1506197603052-3cc9c3a201bd",
    ];
    return `https://images.unsplash.com/photo-${
      fallbackImages[index % fallbackImages.length]
    }?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white w-full max-w-4xl px-4">
          {/* Header Section Loading State */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-white mx-auto mb-4 sm:mb-6"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-32 sm:w-48 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
            <div className="h-6 sm:h-8 md:h-10 bg-gray-700 rounded w-48 sm:w-64 md:w-80 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
            <div className="h-1 bg-gray-700 rounded w-12 sm:w-16 mx-auto animate-pulse"></div>
          </div>

          {/* Hero Image Slider Loading State */}
          <div className="max-w-full mx-auto space-y-2 sm:space-y-3 md:space-y-4">
            {[...Array(3)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 sm:gap-3 md:gap-4 overflow-hidden justify-center">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-gray-800 rounded-lg animate-pulse"
                    style={{
                      animationDelay: `${rowIndex * 100 + i * 50}ms`,
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>

          {/* Button Loading State */}
          <div className="mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 sm:h-14 bg-gray-800 rounded-full w-48 sm:w-56 animate-pulse"></div>
            <div className="h-12 sm:h-14 bg-gray-800 rounded-full w-48 sm:w-56 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl text-red-400 mb-4">
            {error || "No hero content available"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentSlideData = heroData[currentSlide];

  return (
    <div className="relative w-full h-[700] overflow-hidden bg-gray-900">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {heroData.map((item, index) => (
          <div
            key={item.imageId}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${
                  item.imageUrl || getFallbackImage(index)
                }')`,
              }}
              onError={(e) => {
                // Fallback to placeholder image if original fails
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${getFallbackImage(
                  index
                )}')`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
  <div className="text-center text-white px-6 max-w-4xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
      {currentSlideData.imageTitle}
      <span className="block bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">
        {currentSlideData.imageSubTitle}
      </span>
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
      {currentSlideData.imageDescription ||
        "Discover amazing experiences with us"}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {currentSlideData.imagePrimaryButtonText && (
        <button
          onClick={() =>
            handleButtonClick(currentSlideData.imagePrimaryButtonLink)
          }
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          {currentSlideData.imagePrimaryButtonText}
        </button>
      )}
      {currentSlideData.imageSecondaryButtonText && (
        <button
          onClick={() =>
            handleButtonClick(currentSlideData.imageSecondaryButtonLink)
          }
          className="px-8 py-4 border-2 border-cyan-300 text-white font-semibold rounded-full hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all duration-300"
        >
          {currentSlideData.imageSecondaryButtonText}
        </button>
      )}
    </div>
  </div>
</div>

      {/* Navigation Arrows */}
      {heroData.length > 1 && (
        <div className="hidden md:flex">
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
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
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
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
        </div>
      )}

      {/* Slide Indicators */}
      {heroData.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
{heroData.length > 1 && (
  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
    <div
      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-500 transition-all duration-300"
      style={{
        width: `${((currentSlide + 1) / heroData.length) * 100}%`,
      }}
    />
  </div>
)}

      {/* Auto-play Indicator */}
      {heroData.length > 1 && (
        <div className="absolute top-6 right-6 flex items-center space-x-2 text-white/70 text-sm">
          <div
            className={`w-2 h-2 rounded-full ${
              isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
            }`}
          />
          <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
        </div>
      )}

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-6 left-6 text-white/70 text-sm">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}
    </div>
  );
};

export default HeroSection;