"use client";
import HeroSectionLoading from "@/components/loading-components/HeroSectionLoading";
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
        const { data: items, error } =
          await HeroSectionService.fetchAllHeroData();
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
    return <HeroSectionLoading text="Loading homepage hero section..." />;
  }
  // Error state
  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 flex items-center justify-center">
        {/* Animated wave effect in background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-500/20 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyan-500/20 to-transparent animate-pulse [animation-delay:1s]"></div>
        </div>

        <div className="text-center text-white relative z-10 p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 shadow-2xl shadow-teal-500/10">
          <div className="mb-6">
            {/* Ocean wave icon */}
            <svg
              className="w-16 h-16 mx-auto text-teal-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 12.5c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1-2.5-1-4-1M20 16.5c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1-2.5-1-4-1"
              />
            </svg>
            <p className="text-xl text-teal-300 mb-2 font-light">
              {error || "No sea treasures found"}
            </p>
            <p className="text-sm text-cyan-300/70 mb-6">
              The ocean depths are quiet...
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full hover:from-teal-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transform hover:scale-105 font-medium"
          >
            Dive Again
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
                  index,
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
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl block bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">
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
