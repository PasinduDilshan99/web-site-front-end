"use client";
import { GET_ALL_ACTIVE_TOUR_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";

interface Schedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  scheduleDescription: string;
}

interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

interface ActiveToursType {
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourTypeName: string;
  tourTypeDescription: string;
  tourCategoryName: string;
  tourCategoryDescription: string;
  seasonName: string;
  seasonDescription: string;
  statusName: string;
  schedules: Schedule[];
  images: TourImage[];
}

const ActiveToursHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTours, setActiveTours] = useState<ActiveToursType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Responsive cards configuration
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile: 1 card
        setCardsToShow(1);
      } else if (width < 768) { // Small mobile: 1 card
        setCardsToShow(1);
      } else if (width < 1024) { // Tablet: 2 cards
        setCardsToShow(1);
      } else if (width < 1800) { // Laptop: 3 cards
        setCardsToShow(2);
      } else { // PC and large screens: 4 cards
        setCardsToShow(3);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Reset currentIndex when cardsToShow changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsToShow]);

  useEffect(() => {
    const fetchActiveTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_TOUR_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveToursType[] = data.data || [];
          setActiveTours(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active tours");
        }
      } catch (err) {
        console.error("Error fetching active tours:", err);
        setError("Something went wrong while fetching active tours");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTours();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (activeTours.length > cardsToShow && !isTransitioning) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, activeTours.length - cardsToShow);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [activeTours.length, cardsToShow, isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning || activeTours.length <= cardsToShow) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, activeTours.length - cardsToShow);
      return prev >= maxIndex ? 0 : prev + 1;
    });

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning || activeTours.length <= cardsToShow) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, activeTours.length - cardsToShow);
      return prev <= 0 ? maxIndex : prev - 1;
    });

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || activeTours.length <= cardsToShow) return;

    setIsTransitioning(true);
    const maxIndex = Math.max(0, activeTours.length - cardsToShow);
    const validIndex = Math.min(Math.max(0, index), maxIndex);
    setCurrentIndex(validIndex);

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const maxSlides = Math.max(0, activeTours.length - cardsToShow + 1);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <Loading message="Loading popular tours..." variant="spinner" size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  if (activeTours.length === 0) {
    return (
      <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            title="No Content Available"
            message="We're preparing some amazing content for you. Please check back soon!"
            icon="data"
            size="md"
          />
        </div>
      </section>
    );
  }

  return (
    <div className="w-full bg-white overflow-hidden py-8 md:py-12 lg:py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Panel - Hidden on mobile, visible on lg and above */}
          <div className="hidden lg:flex lg:w-2/5 xl:w-2/5 bg-gradient-to-br from-amber-600 to-purple-800 text-white p-8 xl:p-12 rounded-2xl flex-col justify-between min-h-96 xl:min-h-[480px]">
            <div>
              <p className="text-amber-200 text-sm xl:text-base uppercase tracking-wider mb-3 xl:mb-4 font-semibold">
                DISCOVER YOUR UNIQUE
              </p>
              <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 xl:mb-6 leading-tight">
                TOURS
              </h1>
              <p className="text-amber-100 text-lg xl:text-xl 2xl:text-2xl leading-relaxed max-w-md mb-6 xl:mb-8">
                A magical escape into paradise awaits the passionate explorer.
              </p>
            </div>

            <div className="text-amber-200 text-base xl:text-lg font-semibold tracking-wide">
              ALL TOURS
            </div>
          </div>

          {/* Right Panel - Carousel */}
          <div className="w-full lg:w-3/5 xl:w-3/5 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 min-h-80 lg:min-h-96 relative">
            {/* Mobile & Tablet Header */}
            <div className="lg:hidden mb-6 sm:mb-8 text-center">
              <p className="text-amber-600 text-sm sm:text-base uppercase tracking-wider mb-2 sm:mb-3 font-medium">
                DISCOVER YOUR UNIQUE
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                TOURS
              </h1>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                A magical escape into paradise awaits the passionate explorer.
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Cards Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                    transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  {activeTours.map((tour) => (
                    <div
                      key={tour.tourId}
                      className="flex-shrink-0"
                      style={{ width: `calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 16 / cardsToShow}px)` }}
                    >
                      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 overflow-hidden group">
                        {/* Tour Image */}
                        <div className="relative h-48 sm:h-56 md:h-64 lg:h-52 xl:h-56 2xl:h-60 overflow-hidden">
                          <img
                            src={
                              tour.images[0]?.imageUrl ||
                              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
                            }
                            alt={tour.tourName}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />

                          {/* Tour Category Badge */}
                          <div className="absolute top-3 left-3 bg-purple-600/90 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                            {tour.tourCategoryName}
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute bottom-3 left-3 bg-amber-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                            {tour.duration} {tour.duration === 1 ? "day" : "days"}
                          </div>

                          {/* Season Badge */}
                          <div className="absolute top-3 right-3 bg-green-600/90 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm backdrop-blur-sm">
                            {tour.seasonName}
                          </div>
                        </div>

                        {/* Tour Content */}
                        <div className="p-4 sm:p-6 flex-1 flex flex-col">
                          <h3 className="text-lg sm:text-xl lg:text-lg xl:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight">
                            {tour.tourName}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base lg:text-sm xl:text-base mb-3 sm:mb-4 flex-1 line-clamp-3 leading-relaxed">
                            {tour.tourDescription}
                          </p>

                          {/* Tour Details */}
                          <div className="space-y-2 mb-3 sm:mb-4">
                            <div className="flex items-center text-sm sm:text-base lg:text-sm xl:text-base text-gray-600">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                              </svg>
                              <span className="truncate">
                                {tour.startLocation} → {tour.endLocation}
                              </span>
                            </div>
                            <div className="flex items-center text-sm sm:text-base lg:text-sm xl:text-base text-gray-600">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                              </svg>
                              {tour.tourTypeName}
                            </div>
                          </div>

                          {/* Schedule Info */}
                          {tour.schedules.length > 0 && (
                            <div className="mb-3 sm:mb-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
                              <div className="text-sm text-gray-700">
                                <div className="font-semibold text-blue-700 text-base sm:text-lg">
                                  {tour.schedules[0].scheduleName}
                                </div>
                                {tour.schedules[0].specialNote && (
                                  <div className="text-sm text-gray-600 mt-2 flex items-start">
                                    <span className="text-amber-500 mr-2">💡</span>
                                    {tour.schedules[0].specialNote}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Learn More Button */}
                          <button className="w-full bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 text-white py-3 px-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group/btn shadow-lg hover:shadow-xl">
                            Learn More
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1"
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Desktop & Laptop Only */}
              {activeTours.length > cardsToShow && (
                <div className="hidden lg:block">
                  <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className={`absolute -left-4 xl:-left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center border border-gray-200 z-10 ${
                      isTransitioning
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-110 hover:bg-gray-50"
                    }`}
                    aria-label="Previous tour"
                  >
                    <svg
                      className="w-5 h-5 xl:w-6 xl:h-6 text-gray-700"
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
                    disabled={isTransitioning}
                    className={`absolute -right-4 xl:-right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center border border-gray-200 z-10 ${
                      isTransitioning
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-110 hover:bg-gray-50"
                    }`}
                    aria-label="Next tour"
                  >
                    <svg
                      className="w-5 h-5 xl:w-6 xl:h-6 text-gray-700"
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

              {/* Mobile & Tablet Navigation */}
              {activeTours.length > cardsToShow && (
                <div className="lg:hidden flex justify-center space-x-4 sm:space-x-6 mt-6 sm:mt-8">
                  <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 flex items-center justify-center text-white shadow-lg ${
                      isTransitioning
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-110 hover:shadow-xl active:scale-105"
                    }`}
                    aria-label="Previous tour"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
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
                    disabled={isTransitioning}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 flex items-center justify-center text-white shadow-lg ${
                      isTransitioning
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-110 hover:shadow-xl active:scale-105"
                    }`}
                    aria-label="Next tour"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
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
              {maxSlides > 1 && (
                <div className="flex justify-center space-x-2 sm:space-x-3 mt-6">
                  {Array.from({ length: maxSlides }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      disabled={isTransitioning}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-purple-600 scale-125 shadow-lg"
                          : "bg-gray-300 hover:bg-gray-400"
                      } ${
                        isTransitioning
                          ? "cursor-not-allowed"
                          : "cursor-pointer hover:scale-110"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Tour Counter */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-2 rounded-xl text-sm font-medium border border-gray-200 shadow-lg">
                {currentIndex + 1}-
                {Math.min(currentIndex + cardsToShow, activeTours.length)} of{" "}
                {activeTours.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveToursHome;