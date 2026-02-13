"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { AboutUsHeroData } from "@/types/hero-section-types";
import React, { useState, useEffect } from "react";
import HeroSectionLoading from "../loading-components/HeroSectionLoading";

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
        setError(null);
        const { data: items, error } =
          await HeroSectionService.fetchAboutUsHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
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
      "1551632811-561732d1e306",
      "1563492065599-3520f775eeed",
      "1520250497591-112f2f40a3f4",
    ];
    return `https://images.unsplash.com/photo-${
      fallbackImages[index % fallbackImages.length]
    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80`;
  };

  const handleButtonClick = (link?: string) => {
    if (link) {
      if (link.startsWith("http")) {
        window.open(link, "_blank");
      } else {
        window.location.href = link;
      }
    }
  };

  if (loading) {
    return <HeroSectionLoading text="Loading about us hero section..." />;
  }

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
            key={item.id || index}
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
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${getFallbackImage(
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
            {currentSlideData.title || "About Us"}
          </h1>

          {currentSlideData.subtitle && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                {currentSlideData.subtitle}
              </h2>
              <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>{" "}
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <p className="text-md md:text-lg lg:text-xl mb-4 text-gray-100 leading-relaxed">
              {currentSlideData.description ||
                "We are a Sri Lanka Tourism Development Authority & Sri Lanka Civil Aviation Authority approved travel agent based in Colombo, Sri Lanka."}
            </p>

            {(currentSlideData.primaryButtonText ||
              currentSlideData.secondaryButtonText) && (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {currentSlideData.primaryButtonText && (
                  <button
                    onClick={() =>
                      handleButtonClick(currentSlideData.primaryButtonLink)
                    }
                    className="text-sm md:text-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-full hover:from-blue-600 hover:to-teal-500 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {currentSlideData.primaryButtonText}
                  </button>
                )}
                {currentSlideData.secondaryButtonText && (
                  <button
                    onClick={() =>
                      handleButtonClick(currentSlideData.secondaryButtonLink)
                    }
                    className="text-sm md:text-lg px-6 py-3 border-2 border-cyan-300 text-white font-semibold rounded-full hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all duration-300"
                  >
                    {currentSlideData.secondaryButtonText}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span 
              className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-200 text-sm font-medium backdrop-blur-sm"
            >
              Sri Lanka Tourism Authority
            </span>
            <span 
              className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-200 text-sm font-medium backdrop-blur-sm"
            >
              Civil Aviation Authority
            </span>
          </div> */}
        </div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Slide Indicators */}
      {heroData.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-cyan-500 scale-125"
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
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-500 transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / heroData.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Slide Counter (Left Corner) */}
      {heroData.length > 1 && (
        <div className="absolute top-6 left-6 text-white/70 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Auto-play Indicator (Right Corner) */}
      {heroData.length > 1 && (
        <div className="absolute top-6 right-6 text-white/70 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
            }`}
          />
          <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
        </div>
      )}
    </div>
  );
};

export default AboutUsHeroSection;
