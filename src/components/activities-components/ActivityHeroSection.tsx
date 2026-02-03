"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { ActivityHeroData } from "@/types/hero-section-types";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ActivityHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<ActivityHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        // USING THE SERVICE INSTEAD OF DIRECT FETCH
        const { data: items, error } = await HeroSectionService.fetchActivityHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to load activities content");
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
    }, 4500);

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
      "photo-1548013146-72479768bada", // Sigiriya
      "photo-1579444741990-6e31c9b09d52", // Yala
      "photo-1592210454359-9043f067919b", // Ella Train
      "photo-1552465011-b4e30bf7349d", // Mirissa
      "photo-1558272729-5e0165e4fde6", // Kandy
      "photo-1506929562872-bb421503ef21", // Arugam Bay
      "photo-1551632811-561732d1e306", // Adam's Peak
      "photo-1528181304800-259b08848526", // Galle
      "photo-1566073771259-6a8506099945", // Pinnawala
      "photo-1520250497591-112f2f40a3f4", // Kitulgala
      "photo-1536152471326-642d4aa9cba5", // Anuradhapura
      "photo-1544551763-46a013bb70d5", // Bentota
      "photo-1523348837708-15d4a09cfac2", // Nuwara Tea
      "photo-1585506936724-fa0c19c7b7c4", // Polonnaruwa
      "photo-1579444741963-5bce5eb9d1d2", // Dambulla
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

  // Activity categories based on data
  const getActivityCategory = (activity: ActivityHeroData) => {
    const name = activity.name.toLowerCase();
    if (name.includes('climb') || name.includes('hike') || name.includes('peak')) return 'adventure';
    if (name.includes('safari') || name.includes('wildlife') || name.includes('elephant')) return 'wildlife';
    if (name.includes('train') || name.includes('tour') || name.includes('walk')) return 'cultural';
    if (name.includes('whale') || name.includes('surf') || name.includes('watersports') || name.includes('rafting')) return 'water';
    if (name.includes('cultural') || name.includes('temple') || name.includes('cave') || name.includes('fort')) return 'heritage';
    if (name.includes('tea') || name.includes('cycle') || name.includes('ride')) return 'leisure';
    return 'other';
  };

  // Activity difficulty estimation
  const getActivityDifficulty = (activity: ActivityHeroData) => {
    const name = activity.name.toLowerCase();
    if (name.includes('climb') || name.includes('hike') || name.includes('rafting') || name.includes('surf')) return 'challenging';
    if (name.includes('safari') || name.includes('cycle') || name.includes('walk')) return 'moderate';
    return 'easy';
  };

  // Filter activities
  const filteredActivities = heroData.filter((activity) => {
    const categoryMatch = selectedCategory === "all" || getActivityCategory(activity) === selectedCategory;
    const difficultyMatch = selectedDifficulty === "all" || getActivityDifficulty(activity) === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const currentSlideData = filteredActivities[currentSlide] || heroData[currentSlide] || {};

  if (loading) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading Amazing Activities...</p>
        </div>
      </div>
    );
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Sri Lanka Activities
            </h1>
            <div className="w-32 h-1 bg-purple-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-red-400 mb-6">
            {error || "No activities content available"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mr-4"
            >
              Retry
            </button>
            <Link
              href="/activities/all"
              className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              View All Activities
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get current activity category and difficulty
  const currentCategory = getActivityCategory(currentSlideData);
  const currentDifficulty = getActivityDifficulty(currentSlideData);

  return (
    <div className="relative w-full h-[650px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-800">
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

      {/* Activity Badge */}
      {/* <div className="absolute top-6 left-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">
            <span className="text-purple-200 font-bold">{heroData.length}</span> Activities Available
          </span>
        </div>
      </div> */}

      {/* Slide Counter */}
      {filteredActivities.length > 1 && (
        <div className="absolute top-12 lg:top-28 right-6 text-white/70 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          {currentSlide + 1} / {filteredActivities.length}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center pt-12 lg:pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl text-white mx-auto">
            {/* Activity Info Badge */}
            <div className="hidden lg:flex gap-3 mb-6 flex-wrap">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center gap-2">
                <svg
                  className={`w-4 h-4 ${
                    currentCategory === "adventure" ? "text-red-300" :
                    currentCategory === "wildlife" ? "text-green-300" :
                    currentCategory === "cultural" ? "text-yellow-300" :
                    currentCategory === "water" ? "text-blue-300" :
                    currentCategory === "heritage" ? "text-amber-300" :
                    "text-purple-300"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {currentCategory === "adventure" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  )}
                  {currentCategory === "wildlife" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  )}
                  {currentCategory === "cultural" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  )}
                  {currentCategory === "water" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                  )}
                  {currentCategory === "heritage" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  )}
                  {currentCategory === "leisure" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  )}
                </svg>
                <span className="font-semibold capitalize">
                  {currentCategory}
                </span>
              </div>
              <div className={`px-4 py-2 backdrop-blur-sm rounded-full border flex items-center gap-2 ${
                currentDifficulty === "easy" ? "border-green-500/30 bg-green-500/20" :
                currentDifficulty === "moderate" ? "border-yellow-500/30 bg-yellow-500/20" :
                "border-red-500/30 bg-red-500/20"
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  currentDifficulty === "easy" ? "bg-green-400" :
                  currentDifficulty === "moderate" ? "bg-yellow-400" :
                  "bg-red-400"
                }`}></div>
                <span className="font-semibold capitalize">
                  {currentDifficulty}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight">
                {currentSlideData.title || "Experience Sri Lanka"}
              </h1>

              {currentSlideData.subtitle && (
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 text-purple-200">
                    {currentSlideData.subtitle}
                  </h2>
                  <div className="w-20 h-1 bg-purple-400 rounded-full"></div>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl mb-8 border border-white/20 shadow-2xl">
              <p className="text-mf md:text-lg lg:text-xl mb-6 text-gray-100 leading-relaxed">
                {currentSlideData.description ||
                  "Discover unforgettable experiences across Sri Lanka. From adventurous hikes to cultural tours, we offer activities for every type of traveler."}
              </p>

              {(currentSlideData.primaryButtonText ||
                currentSlideData.secondaryButtonText) && (
                <div className="flex flex-wrap gap-4">
                  {currentSlideData.primaryButtonText && (
                    <button
                      onClick={() =>
                        handleButtonClick(currentSlideData.primaryButtonLink)
                      }
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 group"
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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
                      className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white hover:text-purple-900 transition-all duration-300 flex items-center gap-3 group"
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
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      {currentSlideData.secondaryButtonText}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Activity Features */}
            <div className="lg:grid grid-cols-1 md:grid-cols-3 gap-4 hidden">
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-purple-200">Instant Booking</p>
                  <p className="text-base font-bold">Secure & Easy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-300"
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
                  <p className="text-sm text-indigo-200">Expert Guides</p>
                  <p className="text-base font-bold">Local Knowledge</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-300"
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
                  <p className="text-sm text-blue-200">Safety First</p>
                  <p className="text-base font-bold">Certified Equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {filteredActivities.length > 1 && (
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
      {filteredActivities.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {filteredActivities.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-purple-400 scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {filteredActivities.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / filteredActivities.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Quick Actions */}
      {/* <div className="absolute bottom-28 right-6 hidden md:block">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => window.location.href = "/activities/bundles"}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 text-sm"
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Activity Bundles
          </button>
          <button
            onClick={() => window.location.href = "/activities/family-friendly"}
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Family Activities
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ActivityHeroSection;