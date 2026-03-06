// components/seasons-components/SeasonHeroSection.tsx
"use client";
import { SeasonBasic } from "@/types/season-types";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HeroSectionLoading from "../loading-components/HeroSectionLoading";
import { SeasonService } from "@/services/seasonService";
import { SEASON_PAGE_PATH } from "@/utils/urls";

const SeasonHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seasons, setSeasons] = useState<SeasonBasic[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true);
        setError(null);

        const seasonService = new SeasonService();
        const data = await seasonService.getAllSeasons();

        // Sort by display order
        const sortedData = [...data].sort(
          (a, b) => a.displayOrder - b.displayOrder,
        );

        // Shuffle and take 7 random items
        const randomSeven = [...sortedData]
          .sort(() => 0.5 - Math.random())
          .slice(0, 7);

        setSeasons(randomSeven);
      } catch (err) {
        console.error("Error in SeasonHeroSection:", err);
        setError("Failed to load seasons content");
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || seasons.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % seasons.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, seasons.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % seasons.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + seasons.length) % seasons.length);
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

  const getMonthName = (month: number): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1] || "";
  };

  const getSeasonIcon = (season: SeasonBasic): string => {
    const name = season.standardName?.toLowerCase() || "";
    if (name.includes("spring")) return "🌸";
    if (name.includes("summer")) return "☀️";
    if (name.includes("autumn") || name.includes("fall")) return "🍂";
    if (name.includes("winter")) return "❄️";
    if (name.includes("monsoon")) return "🌧️";
    return "🍃";
  };

  // Filter seasons by type
  const filteredSeasons = seasons.filter((season) => {
    if (selectedType === "all") return true;
    if (selectedType === "peak") return season.isPeak;
    if (selectedType === "non-peak") return !season.isPeak;
    return true;
  });

  const currentSlideData =
    filteredSeasons[currentSlide] || seasons[currentSlide] || {};

  if (loading) {
    return <HeroSectionLoading text="Season page hero content loading..." />;
  }

  if (error || seasons.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-900 to-sky-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Seasons of Sri Lanka
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-teal-300 mb-6">
            {error || "No seasons content available"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 mr-4 shadow-md"
            >
              Retry
            </button>
            <Link
              href={SEASON_PAGE_PATH}
              className="px-6 py-3 border-2 border-teal-300 text-white rounded-lg hover:bg-teal-50 hover:text-slate-900 transition-all duration-300"
            >
              Explore Seasons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentSeasonImages = currentSlideData.seasonImages || [];

  return (
    <div className="relative w-full h-[650px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-900 to-sky-900">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {seasons.map((season, index) => {
          const hasImage =
            season.seasonImages &&
            season.seasonImages.length > 0 &&
            !failedImages.has(index);

          return (
            <div
              key={season.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {hasImage ? (
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(17, 94, 89, 0.7), rgba(8, 145, 178, 0.6)), url('${season.seasonImages[0].imageUrl}')`,
                  }}
                  onError={() => handleImageError(index)}
                />
              ) : (
                // Pure gradient background when no image or image failed
                <div className="w-full h-full bg-gradient-to-br from-teal-900 via-cyan-900 to-sky-900" />
              )}
            </div>
          );
        })}
      </div>

      {/* Slide Counter */}
      {filteredSeasons.length > 1 && (
        <div className="absolute top-12 lg:top-28 right-6 text-white/80 text-sm backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full border border-white/20">
          {currentSlide + 1} / {filteredSeasons.length}
        </div>
      )}

      {/* Content Overlay - CENTERED */}
      <div className="absolute inset-0 flex items-center justify-center pt-12 lg:pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl text-white mx-auto text-center">
            {/* Season Type Badge */}
            <div className="hidden lg:flex gap-3 mb-6 flex-wrap justify-center">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center gap-2">
                <span className="text-2xl">
                  {getSeasonIcon(currentSlideData)}
                </span>
                <span className="font-semibold capitalize">
                  {currentSlideData.standardName || "Season"}
                </span>
              </div>
              {currentSlideData.isPeak && (
                <div className="px-4 py-2 bg-amber-500/30 backdrop-blur-sm rounded-full border border-amber-500/30 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-amber-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <span className="font-semibold">Peak Season</span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight">
                {currentSlideData.standardName || "Seasons of Sri Lanka"}
              </h1>

              {currentSlideData.localName && (
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 text-teal-100">
                    {currentSlideData.name}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mx-auto shadow-lg"></div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 max-w-3xl mb-8 border border-white/10 shadow-2xl mx-auto">
              {/* Month Range Display */}
              {currentSlideData.startMonth && currentSlideData.endMonth && (
                <div className="flex items-center justify-center gap-4 mb-6 text-teal-200">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">
                      Starts: {getMonthName(currentSlideData.startMonth)}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">
                      Ends: {getMonthName(currentSlideData.endMonth)}
                    </span>
                  </div>
                </div>
              )}

              <p className="text-mf md:text-lg lg:text-xl mb-6 text-slate-100 leading-relaxed">
                {currentSlideData.name
                  ? `Experience the beauty of ${currentSlideData.standardName} in Sri Lanka. ${currentSlideData.name}`
                  : "Discover the unique characteristics and beauty of each season throughout the year in Sri Lanka."}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={`${SEASON_PAGE_PATH}/${currentSlideData.id}?name=${currentSlideData.name}`}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 group"
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Explore {currentSlideData.standardName || "This Season"}
                </Link>
                {/* <Link
                  href="#seasons-grid"
                  className="px-8 py-4 border-2 border-teal-300/50 text-white font-semibold rounded-xl hover:bg-teal-50/20 hover:border-teal-200 backdrop-blur-sm transition-all duration-300 flex items-center gap-3 group"
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  View All Seasons
                </Link> */}
              </div>
            </div>

            {/* Season Features - CENTERED */}
            <div className="lg:grid grid-cols-1 md:grid-cols-3 gap-4 hidden mx-auto max-w-4xl">
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-teal-200/90">Perfect Weather</p>
                  <p className="text-base font-bold text-white">
                    Ideal Conditions
                  </p>
                </div>
              </div>
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-cyan-200/90">Best Activities</p>
                  <p className="text-base font-bold text-white">
                    Seasonal Events
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-sky-500/20 hover:border-sky-400/40 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500/20 to-sky-600/20 flex items-center justify-center">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-sky-200/90">Plan Ahead</p>
                  <p className="text-base font-bold text-white">
                    Book Your Trip
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {filteredSeasons.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="cursor-pointer hidden lg:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group md:left-6 border border-white/20 shadow-lg"
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
            className="cursor-pointer hidden lg:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group md:right-6 border border-white/20 shadow-lg"
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
      {filteredSeasons.length > 1 && (
        <div className=" absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {filteredSeasons.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-teal-400 to-cyan-400 scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {filteredSeasons.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / filteredSeasons.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SeasonHeroSection;
