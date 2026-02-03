"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { DestinationHeroData } from "@/types/hero-section-types";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const DestinationHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<DestinationHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        // USING THE SERVICE INSTEAD OF DIRECT FETCH
        const { data: items, error } = await HeroSectionService.fetchDestinationHeroData();

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

  const getFallbackImage = (index: number) => {
    const fallbackImages = [
      "photo-1585506936724-fa0c19c7b7c4", // Colombo
      "photo-1558272729-5e0165e4fde6", // Kandy
      "photo-1528181304800-259b08848526", // Galle
      "photo-1548013146-72479768bada", // Sigiriya
      "photo-1592210454359-9043f067919b", // Ella
      "photo-1552465011-b4e30bf7349d", // Mirissa
      "photo-1579444741990-6e31c9b09d52", // Yala
      "photo-1523348837708-15d4a09cfac2", // Nuwara Eliya
      "photo-1536152471326-642d4aa9cba5", // Anuradhapura
      "photo-1579444741963-5bce5eb9d1d2", // Polonnaruwa
      "photo-1506929562872-bb421503ef21", // Arugam Bay
      "photo-1544551763-46a013bb70d5", // Bentota
      "photo-1585506936724-fa0c19c7b7c4", // Dambulla
      "photo-1566073771259-6a8506099945", // Trincomalee
      "photo-1551632811-561732d1e306", // Hatton
      "photo-1520250497591-112f2f40a3f4", // Negombo
      "photo-1579444741963-5bce5eb9d1d2", // Udawalawe
      "photo-1544367567-0f2fcb009e0b", // Jaffna
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

  // Get destination region
  const getDestinationRegion = (destination: DestinationHeroData) => {
    const name = destination.name.toLowerCase();
    if (['colombo', 'negombo', 'galle', 'bentota', 'mirissa'].includes(name)) return 'south-west';
    if (['kandy', 'ella', 'nuwara', 'hatton'].includes(name)) return 'central';
    if (['anuradhapura', 'polonnaruwa', 'dambulla', 'sigiriya'].includes(name)) return 'cultural-triangle';
    if (['yala', 'udawalawe'].includes(name)) return 'south-east';
    if (['arugam', 'trincomalee'].includes(name)) return 'east-coast';
    if (['jaffna'].includes(name)) return 'north';
    return 'other';
  };

  // Get destination type
  const getDestinationType = (destination: DestinationHeroData) => {
    const subtitle = destination.subtitle?.toLowerCase() || '';
    const description = destination.description?.toLowerCase() || '';
    
    if (subtitle.includes('beach') || description.includes('beach')) return 'beach';
    if (subtitle.includes('cultural') || description.includes('cultural') || subtitle.includes('capital') || description.includes('capital')) return 'cultural';
    if (subtitle.includes('wildlife') || subtitle.includes('safari') || description.includes('wildlife') || description.includes('elephant')) return 'wildlife';
    if (subtitle.includes('hill') || subtitle.includes('mountain') || description.includes('hill')) return 'hill-station';
    if (subtitle.includes('city') || subtitle.includes('town')) return 'urban';
    if (subtitle.includes('historic') || subtitle.includes('ancient') || subtitle.includes('temple')) return 'historical';
    if (subtitle.includes('surf')) return 'adventure';
    return 'other';
  };

  // Filter destinations
  const filteredDestinations = heroData.filter((destination) => {
    const regionMatch = selectedRegion === "all" || getDestinationRegion(destination) === selectedRegion;
    const typeMatch = selectedType === "all" || getDestinationType(destination) === selectedType;
    
    // Search filter
    const searchMatch = searchQuery === "" || 
      destination.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return regionMatch && typeMatch && searchMatch;
  });

  const currentSlideData = filteredDestinations[currentSlide] || heroData[currentSlide] || {};

  if (loading) {
    return (
      <div className="relative w-full h-[650px] md:h-[750px] overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading Amazing Destinations...</p>
        </div>
      </div>
    );
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[650px] lg:h-[750px] overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Sri Lanka Destinations
            </h1>
            <div className="w-32 h-1 bg-teal-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-red-400 mb-6">
            {error || "No destinations content available"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors mr-4"
            >
              Retry
            </button>
            <Link
              href="/destinations/all"
              className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
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
    <div className="relative w-full h-[650px] lg:h-[850px] overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-800">
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


      {/* Destination Badge */}
      {/* <div className="absolute top-20 left-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 backdrop-blur-sm rounded-full border border-teal-400/30">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">
            <span className="text-teal-200 font-bold">{heroData.length}</span> Destinations
          </span>
        </div>
      </div> */}


      {/* Slide Counter */}
      {filteredDestinations.length > 1 && (
        <div className="absolute top-12 lg:top-24 right-6 text-white/70 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          {currentSlide + 1} / {filteredDestinations.length}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center pt-16 lg:pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl text-white mx-auto">
            {/* Destination Info Badge */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-teal-300"
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
                <span className="font-semibold capitalize">
                  {currentRegion.replace(/-/g, ' ')}
                </span>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center gap-2">
                <svg
                  className={`w-4 h-4 ${
                    currentType === "beach" ? "text-yellow-300" :
                    currentType === "cultural" ? "text-purple-300" :
                    currentType === "wildlife" ? "text-green-300" :
                    currentType === "hill-station" ? "text-blue-300" :
                    currentType === "urban" ? "text-gray-300" :
                    currentType === "historical" ? "text-amber-300" :
                    "text-cyan-300"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {currentType === "beach" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                  )}
                  {currentType === "cultural" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  )}
                  {currentType === "wildlife" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  )}
                  {currentType === "hill-station" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  )}
                  {currentType === "urban" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  )}
                  {currentType === "historical" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  )}
                  {currentType === "adventure" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  )}
                </svg>
                <span className="font-semibold capitalize">
                  {currentType.replace(/-/g, ' ')}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                {currentSlideData.title || "Discover Sri Lanka"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-teal-200">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-20 h-1 bg-teal-400 rounded-full"></div>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl mb-8 border border-white/20 shadow-2xl">
              <p className="text-md md:text-lg lg:text-xl mb-6 text-gray-100 leading-relaxed">
                {currentSlideData.description ||
                  "Explore diverse destinations across Sri Lanka, from ancient cities to tropical beaches, hill stations to wildlife parks."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-wrap gap-4">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
                      }
                      className="px-6 lg:px-8 py-2 lg:py-4 text-sm lg:text-lg bg-gradient-to-r   from-teal-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 group"
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
                      className="px-6 lg:px-8 py-2 lg:py-4 text-sm lg:text-lg border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white hover:text-teal-900 transition-all duration-300 flex items-center gap-3 group"
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

            {/* Destination Highlights */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-teal-200">UNESCO Sites</p>
                  <p className="text-base font-bold">8 Locations</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-300"
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
                <div>
                  <p className="text-sm text-emerald-200">Best Time</p>
                  <p className="text-base font-bold">Nov-Apr</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-cyan-200">Cultural Mix</p>
                  <p className="text-base font-bold">Diverse Heritage</p>
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
            className="hidden lg:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group md:left-6"
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
            className="hidden lg:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group md:right-6"
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-teal-400 scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {filteredDestinations.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / filteredDestinations.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Quick Actions */}
      {/* <div className="absolute bottom-40 right-6 hidden md:block">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => window.location.href = "/destinations/map"}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-emerald-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 text-sm"
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Interactive Map
          </button>
          <button
            onClick={() => window.location.href = "/destinations/itinerary-planner"}
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            Plan Itinerary
          </button>
        </div>
      </div> */}

      {/* Weather & Climate */}
      {/* <div className="absolute bottom-40 left-6 hidden md:block">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-5 h-5 text-yellow-300"
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
            <div>
              <p className="text-sm text-white/80">Current Climate</p>
              <p className="text-lg font-bold text-teal-300">27°C / 81°F</p>
            </div>
          </div>
          <p className="text-xs text-white/60">Tropical • Year-round</p>
        </div>
      </div> */}
    </div>
  );
};

export default DestinationHeroSection;