"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  DestinationHistory,
  HistoryApiResponse,
} from "@/types/destinations-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";

interface DestinationHistoryCarouselProps {
  historyData?: DestinationHistory[];
  title?: string;
  description?: string;
  maxItems?: number;
  showHeader?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const DestinationHistoryCarousel: React.FC<DestinationHistoryCarouselProps> = ({
  historyData,
  title = "Destination History",
  description = "Explore the rich history and evolution of our amazing destinations",
  maxItems,
  showHeader = true,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const [history, setHistory] = useState<DestinationHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(!historyData);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);

  // Sort history items by event date (newest first) and apply maxItems
  const historySlides = history
    .sort(
      (a, b) =>
        new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    )
    .slice(0, maxItems);

  const totalSlides = historySlides.length;

  useEffect(() => {
    if (historyData) {
      setHistory(historyData);
      setLoading(false);
    } else {
      fetchHistory();
    }
  }, [historyData]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && totalSlides > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval, totalSlides]);

  const fetchHistory = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/destination/history"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: HistoryApiResponse = await response.json();

      if (result.code === 200) {
        setHistory(result.data);
      } else {
        throw new Error(
          result.message || "Failed to fetch destination history"
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching history"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = (): void => {
    if (!historyData) {
      fetchHistory();
    }
  };

  const nextSlide = useCallback((): void => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const togglePlayPause = (): void => {
    setIsPlaying((prev) => !prev);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Responsive image dimensions
  const getImageDimensions = () => {
    return {
      mobile: { width: 320, height: 200 },
      tablet: { width: 400, height: 250 },
      desktop: { width: 500, height: 300 },
      large: { width: 600, height: 350 },
    };
  };

  if (loading) {
    return (
      <div className="py-8">
        <Loading
          message="Loading destination history..."
          variant="spinner"
          size="md"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorState
          title="Failed to Load History"
          message={error}
          icon="alert"
          variant="error"
          size="md"
          actionLabel="Try Again"
          onAction={handleRetry}
        />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="text-gray-500 text-lg">
          No destination history available.
        </div>
      </div>
    );
  }

  const currentHistoryItem = historySlides[currentSlide];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <SectionHeader
              subtitle=""
              title={title}
              description={description}
              fromColor="#A855F7"
              toColor="#F59E0B"
            />
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Previous slide"
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
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Next slide"
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
            </>
          )}

          {/* Play/Pause Button */}
          {totalSlides > 1 && (
            <button
              onClick={togglePlayPause}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
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
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          )}

          {/* Single History Card Display */}
          <div
            className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="bg-gradient-to-br from-purple-50 to-amber-50 p-4 sm:p-6 md:p-8">
              {/* History Item Header */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {currentHistoryItem.destination.name}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                  {currentHistoryItem.destination.description}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-purple-600 font-medium mt-2">
                  📍 {currentHistoryItem.destination.location}
                </p>
              </div>

              {/* Single History Event */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
                  {/* Event Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                        {currentHistoryItem.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        History ID: {currentHistoryItem.historyId} • Destination
                        ID: {currentHistoryItem.destination.destinationId}
                      </p>
                    </div>
                    <span className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-100 to-amber-100 text-purple-800 rounded-full text-sm sm:text-base font-medium whitespace-nowrap">
                      🗓️ {formatDate(currentHistoryItem.eventDate)}
                    </span>
                  </div>

                  {/* Event Description */}
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                    {currentHistoryItem.description}
                  </p>

                  {/* Images Grid */}
                  {currentHistoryItem.images &&
                    currentHistoryItem.images.length > 0 && (
                      <div className="mt-4 sm:mt-6">
                        <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                          Historical Images ({currentHistoryItem.images.length})
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                          {currentHistoryItem.images.map((image) => (
                            <div
                              key={image.imageId}
                              className="space-y-2 sm:space-y-3"
                            >
                              <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-md">
                                <img
                                  src={image.imageUrl}
                                  alt={image.name}
                                  className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover transition-transform duration-300 hover:scale-105"
                                  onError={(e) => {
                                    (
                                      e.target as HTMLImageElement
                                    ).src = `/api/placeholder/${
                                      getImageDimensions().desktop.width
                                    }/${getImageDimensions().desktop.height}`;
                                  }}
                                />
                              </div>
                              <div className="text-xs sm:text-sm">
                                <p className="font-semibold text-gray-900 mb-1">
                                  {image.name}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                  {image.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Image ID: {image.imageId}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Additional Metadata */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Created by:</span>{" "}
                        {currentHistoryItem.createdBy.username}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        {currentHistoryItem.historyStatus.name}
                      </div>
                      <div>
                        <span className="font-medium">Created at:</span>{" "}
                        {formatDate(currentHistoryItem.createdAt)}
                      </div>
                      <div>
                        <span className="font-medium">Updated at:</span>{" "}
                        {formatDate(currentHistoryItem.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators and Controls */}
          {totalSlides > 1 && (
            <div className="mt-6 sm:mt-8">
              {/* Slide Indicators */}
              <div className="flex justify-center mb-4 sm:mb-6 space-x-2 sm:space-x-3">
                {historySlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-gradient-to-r from-purple-600 to-amber-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to history item ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slide Counter and Play/Pause */}
              <div className="flex justify-center items-center gap-4 sm:gap-6">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  History {currentSlide + 1} of {totalSlides}
                </span>

                {/* Mobile Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="sm:hidden bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 transition-colors duration-200"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                    </svg>
                  )}
                </button>

                {/* Auto-play Status */}
                <div className="hidden sm:flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"
                    }`}
                  />
                  <span className="text-xs text-gray-500">
                    Auto-play: {isPlaying ? "On" : "Off"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Instructions for Mobile */}
        {totalSlides > 1 && (
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs text-gray-500">
              💡 Swipe left/right to navigate • Click dots to jump to history
              item
              {isPlaying && " • Auto-play enabled"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationHistoryCarousel;
