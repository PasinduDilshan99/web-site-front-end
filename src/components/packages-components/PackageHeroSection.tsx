"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { PackageHeroData } from "@/types/hero-section-types";
import React, { useState, useEffect } from "react";
import HeroSectionLoading from "../loading-components/HeroSectionLoading";
import { SRI_LANKAN_TOUR_PAGE_PATH } from "@/utils/urls";
import { useCommon } from "@/context/CommonContext";

const PackageHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<PackageHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const { categories } = useCommon();

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: items, error } =
          await HeroSectionService.fetchPackageHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to load packages content");
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
        const element = document.querySelector(link);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = link;
      }
    }
  };

  // Filter packages by duration
  const filteredPackages = heroData.filter((pkg) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "short") {
      const subtitle = pkg.subtitle || "";
      return subtitle.includes("3 Days") || subtitle.includes("Weekend");
    }
    if (selectedFilter === "medium") {
      const subtitle = pkg.subtitle || "";
      return subtitle.includes("7 Days") || subtitle.includes("8 Days");
    }
    if (selectedFilter === "long") {
      const subtitle = pkg.subtitle || "";
      return (
        subtitle.includes("10 Days") ||
        subtitle.includes("12 Days") ||
        subtitle.includes("14 Days") ||
        subtitle.includes("15 Days")
      );
    }
    return true;
  });

  // Get current slide data from filtered packages
  const currentSlideData =
    filteredPackages[currentSlide] || heroData[currentSlide] || {};

  if (loading) {
    return <HeroSectionLoading text="Packages hero content loading..." />;
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Tour Packages
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-sky-400 to-teal-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-sky-300 mb-6">
            {error || "No packages content available"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 mr-4 shadow-md"
            >
              Retry
            </button>
            <a
              href={SRI_LANKAN_TOUR_PAGE_PATH}
              className="px-6 py-3 border-2 border-sky-300 text-white rounded-lg hover:bg-sky-50 hover:text-slate-900 transition-all duration-300"
            >
              View All Tours
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Extract duration from subtitle
  const extractDuration = (subtitle?: string) => {
    if (!subtitle) return "";
    const match = subtitle.match(/(\d+)\s*Days/);
    return match ? match[0] : "";
  };

  return (
    <div className="relative w-full h-[800px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
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
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${item.imageUrl}')`,
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

      {/* Package Badge */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-sky-500/20 backdrop-blur-sm rounded-full border border-sky-400/30">
          <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">
            <span className="text-sky-200 font-bold">
              {categories?.packageCategoryList.length}
            </span>{" "}
            Package categories Available
          </span>
        </div>
      </div>

      {/* Slide Counter */}
      {filteredPackages.length > 1 && (
        <div className="absolute top-16 right-6 text-white/80 text-sm backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full border border-white/20">
          {currentSlide + 1} / {filteredPackages.length}
        </div>
      )}

      {/* Content Overlay - CENTERED */}
      <div className="absolute inset-0 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl text-white mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                {currentSlideData.title || "Curated Tour Packages"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-sky-100">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full mx-auto shadow-lg"></div>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 max-w-3xl mb-8 border border-white/10 shadow-2xl mx-auto">
              <p className="text-lg md:text-xl mb-6 text-slate-100 leading-relaxed">
                {currentSlideData.description ||
                  "Choose from our expertly curated tour packages, designed to provide unforgettable experiences across Sri Lanka. All packages include accommodation, transportation, and guided tours."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
                      }
                      className="cursor-pointer px-8 py-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 group"
                    >
                      <svg
                        className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
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
                      {currentSlideData.primaryButtonText}
                    </button>
                  )}
                  {currentSlideData.secondaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.secondaryButtonLink)
                      }
                      className="cursor-pointer px-8 py-4 border-2 border-sky-300/50 text-white font-semibold rounded-xl hover:bg-sky-50/20 hover:border-sky-200 backdrop-blur-sm transition-all duration-300 flex items-center gap-3 group"
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {currentSlideData.secondaryButtonText}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Package Features - CENTERED */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-sky-500/20 hover:border-sky-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-sky-300"
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
                <div className="text-left">
                  <p className="text-sm text-sky-200">All Inclusive</p>
                  <p className="text-base font-bold">No Hidden Costs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-teal-500/20 hover:border-teal-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
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
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-teal-200">Flexible Booking</p>
                  <p className="text-base font-bold">Free Cancellation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-cyan-200">Expert Guides</p>
                  <p className="text-base font-bold">Local Insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {filteredPackages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group md:left-6 shadow-lg"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
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
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group md:right-6 shadow-lg"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
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

      {/* Slide Indicators - CENTERED */}
      {filteredPackages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {filteredPackages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 ${
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
      {filteredPackages.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400 transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / filteredPackages.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PackageHeroSection;
