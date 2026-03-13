"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { BlogHeroData } from "@/types/hero-section-types";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BlogHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<BlogHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: items, error } =
          await HeroSectionService.fetchBlogHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to load blog content");
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

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const handleButtonClick = (link?: string) => {
    if (link) {
      if (link.startsWith("http")) {
        window.open(link, "_blank");
      } else if (link.startsWith("#")) {
        // Handle anchor links for in-page navigation
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
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading Travel Stories...</p>
        </div>
      </div>
    );
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Travel Stories
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-sky-400 to-teal-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-sky-300 mb-6">
            {error || "No blog content available"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-md"
            >
              Retry
            </button>
            <Link
              href="/blogs"
              className="w-full sm:w-auto px-6 py-3 border-2 border-sky-300 text-white rounded-lg hover:bg-sky-50 hover:text-slate-900 transition-all duration-300 text-center"
            >
              Browse All Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentSlideData = heroData[currentSlide];

  return (
    <div className="relative w-full h-[70vh] lg:h-[90vh] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
      {/* Image Slider - Only show image if available and not failed */}
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
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(8, 145, 178, 0.5)), url('${item.imageUrl}')`,
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

      {/* Content Overlay - CENTERED */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl text-white mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                {currentSlideData.title || "Travel Stories"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-6">
                  <h2 className="text-xl md:text-3xl font-semibold mb-3 text-sky-200">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full mx-auto"></div>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-2xl mx-auto mb-8">
              <p className="text-md md:text-xl mb-6 text-gray-100 leading-relaxed">
                {currentSlideData.description ||
                  "Discover the best destinations, hidden gems, and authentic local experiences. Updated weekly to inspire your next Sri Lankan adventure."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
                      }
                      className="cursor-pointer text-sm lg:text-md px-3 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-lg hover:from-sky-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
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
                      className="cursor-pointer text-sm lg:text-md px-3 py-2 lg:px-6 lg:py-3 border-2 border-sky-300/50 text-white font-semibold rounded-lg hover:bg-sky-50/20 hover:border-sky-200 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      {currentSlideData.secondaryButtonText}
                    </button>
                  )}
                  <button
                    onClick={() => (window.location.href = "/blogs/create")}
                    className="cursor-pointer text-sm lg:text-md px-3 py-2 lg:px-6 lg:py-3  bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-sky-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Create Blog
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats - CENTERED */}
            <div className="hidden lg:flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-sky-400/30">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Weekly Updates</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-teal-400/30">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Local Insights</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-cyan-400/30">
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
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span className="text-sm font-medium">Expert Guides</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {heroData.length > 1 && (
        <div className="hidden md:flex">
          <button
            onClick={prevSlide}
            className="cursor-pointer absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group shadow-lg"
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
            className="cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group shadow-lg"
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
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-sky-400 to-teal-400 scale-125 shadow-lg"
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
            className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400 transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / heroData.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-6 left-6 text-white/70 text-sm backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full border border-white/20">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Blog Stats Badge */}
      <div className="hidden lg:flex absolute top-6 right-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-sky-500/20 backdrop-blur-sm rounded-full border border-sky-400/30">
          <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">
            <span className="text-sky-200 font-bold">5</span> Blog Categories
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogHeroSection;
