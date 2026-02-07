"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { FaqHeroData } from "@/types/hero-section-types";
import React, { useState, useEffect } from "react";

const FaqHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<FaqHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: items, error } = await HeroSectionService.fetchFaqHeroData();

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

  const getFallbackImage = (index: number) => {
    const fallbackImages = [
      "photo-1507525428034-b723cf961d3e", // Beach sunset
      "photo-1518837695005-2083093ee35b", // Ocean waves
      "photo-1505142468610-359e7d316be0", // Mountain lake
      "photo-1439066615861-d1af74d74000", // Underwater
      "photo-1493246507139-91e8fad9978e", // Coastal view
    ];
    return `https://images.unsplash.com/${fallbackImages[index % fallbackImages.length]}?w=1600&auto=format&fit=crop&q=80`;
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
    return (
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-b-2 border-sky-400 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg md:text-xl">Loading Help Center...</p>
        </div>
      </div>
    );
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
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
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px] 2xl:h-[800px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
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
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(8, 145, 178, 0.6)), url('${
                  item.imageUrl || getFallbackImage(index)
                }')`,
              }}
              onError={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.85), rgba(8, 145, 178, 0.8)), url('${getFallbackImage(
                  index
                )}')`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white/80 text-xs sm:text-sm backdrop-blur-sm bg-black/30 px-3 sm:px-4 py-1.5 rounded-full z-10 border border-white/20">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-white mx-auto">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight text-white">
                {currentSlideData.title || "Help Center"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 text-sky-100">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full shadow-lg"></div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 max-w-full sm:max-w-2xl md:max-w-3xl mb-4 sm:mb-6 md:mb-8 border border-white/10 shadow-2xl">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 text-slate-100 leading-relaxed">
                {currentSlideData.description ||
                  "Find quick answers to your questions about bookings, payments, support, and more. Our comprehensive FAQ section covers everything you need to know."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-5">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="truncate">{currentSlideData.primaryButtonText}</span>
                    </button>
                  )}
                  {currentSlideData.secondaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.secondaryButtonLink)
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="truncate">{currentSlideData.secondaryButtonText}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              <div className="hidden lg:flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-sky-500/20 hover:border-sky-400/40 hover:bg-white/10 transition-all duration-300">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-sky-200/90 truncate">Solved Issues</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">95%</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-teal-500/20 hover:border-teal-400/40 hover:bg-white/10 transition-all duration-300">
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
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-teal-200/90 truncate">Response Time</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">24h</p>
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-cyan-200/90 truncate">Active Support</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">24/7</p>
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
            className="absolute left-3 sm:left-4 md:left-5 lg:left-7 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 sm:p-3.5 md:p-4 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group z-10 shadow-lg"
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
            className="absolute right-3 sm:right-4 md:right-5 lg:right-7 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 sm:p-3.5 md:p-4 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group z-10 shadow-lg"
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

export default FaqHeroSection;