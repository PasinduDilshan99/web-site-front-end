"use client";
import React, { useState, useEffect } from "react";

export interface PackageHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  createdBy?: number;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: PackageHeroData[];
  timestamp: string;
}

const PackageHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<PackageHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "http://localhost:8080/felicita/v0/api/hero-section/package",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();

        if (apiResponse.code === 200 && apiResponse.data) {
          const activeItems = apiResponse.data.filter(
            (item) => item.status === "ACTIVE"
          );

          const sortedItems = [...activeItems].sort(
            (a, b) => (a.order || 0) - (b.order || 0)
          );

          setHeroData(sortedItems);
        } else {
          setError(apiResponse.message || "Failed to fetch packages content");
        }
      } catch (err) {
        console.error("Error fetching packages hero data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load packages content"
        );
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
      "photo-1548013146-72479768bada", // Classic
      "photo-1552465011-b4e30bf7349d", // Beach
      "photo-1579444741990-6e31c9b09d52", // Wildlife
      "photo-1592210454359-9043f067919b", // Hill Country
      "photo-1566073771259-6a8506099945", // Honeymoon
      "photo-1506929562872-bb421503ef21", // Family
      "photo-1520250497591-112f2f40a3f4", // Budget
      "photo-1544367567-0f2fcb009e0b", // Wellness
      "photo-1551632811-561732d1e306", // Adventure
      "photo-1558272729-5e0165e4fde6", // Cultural
      "photo-1528181304800-259b08848526", // Short Break
      "photo-1536152471326-642d4aa9cba5", // Monsoon
    ];
    return `https://images.unsplash.com/${fallbackImages[index % fallbackImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80`;
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
  const currentSlideData = filteredPackages[currentSlide] || heroData[currentSlide] || {};

  if (loading) {
    return (
      <div className="relative w-full h-[800px] overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading Tour Packages...</p>
        </div>
      </div>
    );
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Tour Packages
            </h1>
            <div className="w-32 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-red-400 mb-6">
            {error || "No packages content available"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors mr-4"
            >
              Retry
            </button>
            <a
              href="/tours"
              className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
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
    <div className="relative w-full h-[800px] overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-800">
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
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${
                  item.imageUrl || getFallbackImage(index)
                }')`,
              }}
              onError={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${getFallbackImage(
                  index
                )}')`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Package Badge */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-400/30">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">
            <span className="text-amber-200 font-bold">{heroData.length}</span> Packages Available
          </span>
        </div>
      </div>


      {/* Slide Counter */}
      {filteredPackages.length > 1 && (
        <div className="absolute top-16 right-6 text-white/70 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          {currentSlide + 1} / {filteredPackages.length}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl text-white mx-auto">
            {/* Duration Badge */}
            <div className="mb-6 inline-block">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-amber-300"
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
                <span className="font-semibold">
                  {extractDuration(currentSlideData.subtitle) || "Flexible Duration"}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                {currentSlideData.title || "Curated Tour Packages"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-amber-200">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-20 h-1 bg-amber-400 rounded-full"></div>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl mb-8 border border-white/20 shadow-2xl">
              <p className="text-lg md:text-xl mb-6 text-gray-100 leading-relaxed">
                {currentSlideData.description ||
                  "Choose from our expertly curated tour packages, designed to provide unforgettable experiences across Sri Lanka. All packages include accommodation, transportation, and guided tours."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-wrap gap-4">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
                      }
                      className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 group"
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
                      className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white hover:text-amber-900 transition-all duration-300 flex items-center gap-3 group"
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

            {/* Package Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-300"
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
                  <p className="text-sm text-amber-200">All Inclusive</p>
                  <p className="text-base font-bold">No Hidden Costs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-300"
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
                <div>
                  <p className="text-sm text-orange-200">Flexible Booking</p>
                  <p className="text-base font-bold">Free Cancellation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-300"
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
                  <p className="text-sm text-red-200">Expert Guides</p>
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group md:left-6"
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
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group md:right-6"
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

      {/* Slide Indicators */}
      {filteredPackages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {filteredPackages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
      {filteredPackages.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / filteredPackages.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="absolute bottom-28 right-6 hidden md:block">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => window.location.href = "/packages/compare"}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            Compare Packages
          </button>
          <button
            onClick={() => window.location.href = "/packages/special-offers"}
            className="px-4 py-2 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Special Offers
          </button>
        </div>
      </div>

    </div>
  );
};

export default PackageHeroSection;