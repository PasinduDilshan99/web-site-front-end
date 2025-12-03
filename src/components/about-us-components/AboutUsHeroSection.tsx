"use client";
import { GET_ALL_HERO_SECTION_DATA } from "@/utils/frontEndConstant"; // Update this constant
import React, { useState, useEffect } from "react";

export interface AboutUsHeroData {
  imageId: string;
  imageUrl: string;
  imageTitle?: string;
  imageSubTitle?: string;
  imageDescription?: string;
  additionalText?: string;
  approvals?: string[];
  badges?: string[];
  order?: number;
}
const AboutUsHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<AboutUsHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);

        const response = await fetch(GET_ALL_HERO_SECTION_DATA); // Update this endpoint
        const data = await response.json();

        if (response.ok) {
          const items: AboutUsHeroData[] = data.data || [];
          setHeroData(items);
          setError(null);
        } else {
          setError(data.error || "Failed to fetch about us hero content");
        }
      } catch (err) {
        console.error("Error fetching about us hero data:", err);
        setError("Failed to load about us content");
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

  // Get fallback image URL - about us specific images
  const getFallbackImage = (index: number) => {
    const fallbackImages = [
      "sri-lanka-beach-sunset", // Sri Lanka beach sunset
      "colombo-city-skyline", // Colombo city
      "tea-plantations-sri-lanka", // Tea plantations
    ];
    return `https://images.unsplash.com/photo-${
      fallbackImages[index % fallbackImages.length]
    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-blue-900 to-teal-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading About Us...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-blue-900 to-teal-800 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl text-red-400 mb-4">
            {error || "No about us content available"}
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
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-blue-900 to-teal-800">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {heroData.map((item, index) => (
          <div
            key={item.imageId || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${
                  item.imageUrl || getFallbackImage(index)
                }')`,
              }}
              onError={(e) => {
                // Fallback to placeholder image if original fails
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${getFallbackImage(
                  index
                )}')`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Content Overlay - Centered like the image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          {/* Main Title - Big and Bold */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
            {currentSlideData.imageTitle || "About Us"}
          </h1>
          
          {/* Subtitle with decorative underline */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              {currentSlideData.imageSubTitle || "Who we are?"}
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          {/* Description - Simple text centered */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl mb-4 text-gray-100 leading-relaxed">
              {currentSlideData.imageDescription || 
                "We are a Sri Lanka Tourism Development Authority & Sri Lanka Civil Aviation Authority approved travel agent based in Colombo, Sri Lanka."}
            </p>
            
            {/* Optional additional content */}
            {currentSlideData.additionalText && (
              <p className="text-base md:text-lg text-gray-200 italic mt-4">
                {currentSlideData.additionalText}
              </p>
            )}
          </div>

          {/* Badges/Approvals Display - Optional */}
          {(currentSlideData.approvals || currentSlideData.badges) && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {currentSlideData.approvals?.map((approval: string, idx: number) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-200 text-sm font-medium backdrop-blur-sm"
                >
                  {approval}
                </span>
              ))}
              {currentSlideData.badges?.map((badge: string, idx: number) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-200 text-sm font-medium backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows - Only if multiple slides */}
      {heroData.length > 1 && (
        <div className="hidden md:flex">
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
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
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
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
        </div>
      )}

      {/* Slide Indicators - Only if multiple slides */}
      {heroData.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-teal-400 transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / heroData.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-6 left-6 text-white/70 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Optional: Location Badge */}
      <div className="absolute top-6 right-6 text-white/80 text-sm backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>Colombo, Sri Lanka</span>
      </div>
    </div>
  );
};

export default AboutUsHeroSection;