"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { DestinationHeroData } from "@/types/hero-section-types";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HeroSectionLoading from "../loading-components/HeroSectionLoading";
import { DESTINATIONS_PAGE_PATH } from "@/utils/urls";

const DestinationHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<DestinationHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: items, error } =
          await HeroSectionService.fetchDestinationHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to load destinations content");
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

  // Get destination region
  const getDestinationRegion = (destination: DestinationHeroData) => {
    const name = destination.name?.toLowerCase() || "";
    if (
      ["colombo", "negombo", "galle", "bentota", "mirissa"].some((city) =>
        name.includes(city),
      )
    )
      return "south-west";
    if (
      ["kandy", "ella", "nuwara", "hatton"].some((city) => name.includes(city))
    )
      return "central";
    if (
      ["anuradhapura", "polonnaruwa", "dambulla", "sigiriya"].some((city) =>
        name.includes(city),
      )
    )
      return "cultural-triangle";
    if (["yala", "udawalawe"].some((city) => name.includes(city)))
      return "south-east";
    if (["arugam", "trincomalee"].some((city) => name.includes(city)))
      return "east-coast";
    if (["jaffna"].some((city) => name.includes(city))) return "north";
    return "other";
  };

  // Get destination type
  const getDestinationType = (destination: DestinationHeroData) => {
    const subtitle = destination.subtitle?.toLowerCase() || "";
    const description = destination.description?.toLowerCase() || "";

    if (subtitle.includes("beach") || description.includes("beach"))
      return "beach";
    if (
      subtitle.includes("cultural") ||
      description.includes("cultural") ||
      subtitle.includes("capital") ||
      description.includes("capital")
    )
      return "cultural";
    if (
      subtitle.includes("wildlife") ||
      subtitle.includes("safari") ||
      description.includes("wildlife") ||
      description.includes("elephant")
    )
      return "wildlife";
    if (
      subtitle.includes("hill") ||
      subtitle.includes("mountain") ||
      description.includes("hill")
    )
      return "hill-station";
    if (subtitle.includes("city") || subtitle.includes("town")) return "urban";
    if (
      subtitle.includes("historic") ||
      subtitle.includes("ancient") ||
      subtitle.includes("temple")
    )
      return "historical";
    if (subtitle.includes("surf")) return "adventure";
    return "other";
  };

  // Filter destinations
  const filteredDestinations = heroData.filter((destination) => {
    const regionMatch =
      selectedRegion === "all" ||
      getDestinationRegion(destination) === selectedRegion;
    const typeMatch =
      selectedType === "all" ||
      getDestinationType(destination) === selectedType;

    // Search filter
    const searchMatch =
      searchQuery === "" ||
      destination.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return regionMatch && typeMatch && searchMatch;
  });

  const currentSlideData =
    filteredDestinations[currentSlide] || heroData[currentSlide] || {};

  if (loading) {
    return <HeroSectionLoading text="Destination hero content loading...." />;
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[650px] lg:h-[750px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Sri Lanka Destinations
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-sky-400 to-teal-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-red-300 mb-6">
            {error || "No destinations content available"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:from-sky-700 hover:to-teal-700 transition-all duration-300 mr-4 shadow-md"
            >
              Retry
            </button>
            <Link
              href={DESTINATIONS_PAGE_PATH}
              className="cursor-pointer px-6 py-3 border-2 border-sky-300 text-white rounded-lg hover:bg-sky-50 hover:text-slate-900 transition-all duration-300"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get current destination info
  const currentRegion = getDestinationRegion(currentSlideData);
  const currentType = getDestinationType(currentSlideData);

  return (
    <div className="relative w-full h-[650px] lg:h-[850px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
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

      {/* Slide Counter */}
      {filteredDestinations.length > 1 && (
        <div className="absolute top-12 lg:top-24 right-6 text-white/80 text-sm backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full border border-white/20">
          {currentSlide + 1} / {filteredDestinations.length}
        </div>
      )}

      {/* Content Overlay - CENTERED */}
      <div className="absolute inset-0 flex items-center justify-center pt-16 lg:pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl text-white mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                {currentSlideData.title || "Discover Sri Lanka"}
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

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 max-w-3xl mb-8 border border-white/10 shadow-2xl mx-auto">
              <p className="text-md md:text-lg lg:text-xl mb-6 text-slate-100 leading-relaxed">
                {currentSlideData.description ||
                  "Explore diverse destinations across Sri Lanka, from ancient cities to tropical beaches, hill stations to wildlife parks."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
                      }
                      className="cursor-pointer px-6 lg:px-8 py-2 lg:py-4 text-sm lg:text-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 group"
                    >
                      <svg
                        className="w-4 h-4 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform duration-300"
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
                      {currentSlideData.primaryButtonText}
                    </button>
                  )}
                  {currentSlideData.secondaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.secondaryButtonLink)
                      }
                      className="cursor-pointer px-6 lg:px-8 py-2 lg:py-4 text-sm lg:text-lg border-2 border-sky-300/50 text-white font-semibold rounded-xl hover:bg-sky-50/20 hover:border-sky-200 backdrop-blur-sm transition-all duration-300 flex items-center gap-3 group"
                    >
                      <svg
                        className="w-4 h-4 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform duration-300"
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

            {/* Destination Highlights - CENTERED */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-4xl">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-teal-200/90">Ideal For</p>
                  <p className="text-base font-bold text-white">
                    {currentType === "beach" && "Beach Lovers"}
                    {currentType === "cultural" && "History Buffs"}
                    {currentType === "wildlife" && "Nature Enthusiasts"}
                    {currentType === "hill-station" && "Trekking"}
                    {currentType === "adventure" && "Adventure Seekers"}
                    {currentType === "urban" && "City Explorers"}
                    {![
                      "beach",
                      "cultural",
                      "wildlife",
                      "hill-station",
                      "adventure",
                      "urban",
                    ].includes(currentType) && "All Travelers"}
                  </p>
                </div>
              </div>

              {/* Card 2: Location/Name */}
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-teal-200/90">Location</p>
                  <p className="text-base font-bold text-white">
                    {currentSlideData.name ||
                      currentSlideData.title ||
                      "Sri Lanka"}
                  </p>
                </div>
              </div>

              {/* Card 3: Featured Activity/Highlight */}
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
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-cyan-200/90">Highlight</p>
                  <p className="text-base font-bold text-white">
                    {currentSlideData.subtitle
                      ?.split(" ")
                      .slice(0, 2)
                      .join(" ") || "Must Visit"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {filteredDestinations.length > 1 && (
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
      {filteredDestinations.length > 1 && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {filteredDestinations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all duration-300 ${
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
      {filteredDestinations.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400 transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / filteredDestinations.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DestinationHeroSection;
