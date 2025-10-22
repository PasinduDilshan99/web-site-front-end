"use client";
import React, { useState, useEffect } from "react";
import {
  TourHistory,
  TourHistoryResponse,
} from "@/types/sri-lankan-tour-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TourHistorySectionProps {
  histories: TourHistory[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const TourHistorySection: React.FC<TourHistorySectionProps> = ({
  histories,
  loading,
  error,
  onRetry,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  // Responsive configuration
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) { // Mobile
          setVisibleCards(1);
        } else if (width < 768) { // Small tablet
          setVisibleCards(1.2);
        } else if (width < 1024) { // Tablet
          setVisibleCards(2);
        } else if (width < 1280) { // Laptop
          setVisibleCards(2.5);
        } else if (width < 1536) { // PC
          setVisibleCards(3);
        } else { // Large screens
          setVisibleCards(4);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format date to readable format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Extract vehicle numbers from comma-separated string
  const getVehicleNumbers = (vehicleNumber: string): string[] => {
    return vehicleNumber.split(",").filter((v) => v.trim());
  };

  // Carousel navigation
  const nextSlide = () => {
    const cardsToMove = Math.floor(visibleCards);
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsToMove >= histories.length ? 0 : prevIndex + cardsToMove
    );
  };

  const prevSlide = () => {
    const cardsToMove = Math.floor(visibleCards);
    setCurrentIndex((prevIndex) =>
      prevIndex - cardsToMove < 0 ? histories.length - 1 : prevIndex - cardsToMove
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const maxIndex = Math.max(0, histories.length - Math.floor(visibleCards));

  if (loading) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Loading
            message="Loading tour history..."
            variant="spinner"
            size="md"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Tour History"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={onRetry}
          />
        </div>
      </section>
    );
  }

  if (histories.length === 0) {
    return (
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Journey"
            title="Tour History"
            description="Explore our past successful tours and memorable experiences"
            fromColor="#10B981"
            toColor="#3B82F6"
          />
          <div className="text-center py-8 sm:py-10 md:py-12">
            <div className="text-gray-500 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
              No tour history available yet.
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Check back later to see our completed tours and customer
              experiences.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <SectionHeader
          subtitle="Our Journey"
          title="Tour History"
          description="Explore our past successful tours and memorable experiences"
          fromColor="#10B981"
          toColor="#3B82F6"
        />

        {/* Carousel Container */}
        <div className="relative mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          {/* Navigation Buttons */}
          {histories.length > visibleCards && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute -left-2 sm:-left-3 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 md:p-2.5 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous tours"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="absolute -right-2 sm:-right-3 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 md:p-2.5 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next tours"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
            </>
          )}

          {/* Carousel Track */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-3 sm:gap-4 md:gap-5 lg:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {histories.map((history) => (
                <div
                  key={history.historyId}
                  className="flex-shrink-0"
                  style={{
                    width: `${100 / visibleCards}%`,
                    padding: '0 0.25rem sm:0.375rem md:0.5rem'
                  }}
                >
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
                    {/* Header */}
                    <div
                      className="p-3 sm:p-4 md:p-5 text-white"
                      style={{
                        backgroundColor: history.historyColor,
                        background: `linear-gradient(135deg, ${history.historyColor}, ${history.hoverColor})`,
                      }}
                    >
                      <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl truncate">
                        {history.historyName}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm md:text-base mt-1 sm:mt-2 line-clamp-2">
                        {history.historyDescription}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                      {/* Tour Details */}
                      <div className="mb-3 sm:mb-4 md:mb-5 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2">
                          {history.tourSchedule.tour.tourName}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 line-clamp-2">
                          {history.tourSchedule.tour.tourDescription}
                        </p>

                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                          <div className="text-gray-600">
                            <span className="font-medium">Route:</span>{" "}
                            {history.tourSchedule.tour.startLocation} →{" "}
                            {history.tourSchedule.tour.endLocation}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Duration:</span>{" "}
                            {history.historyDuration} day
                            {history.historyDuration !== 1 ? "s" : ""}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Participants:</span>{" "}
                            {history.numberOfParticipate}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Rating:</span>
                            <span className="ml-1 text-amber-600 font-semibold">
                              {history.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="mb-3 sm:mb-4 md:mb-5 p-2 sm:p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs sm:text-sm text-gray-700">
                          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                            <span className="font-medium">Tour Dates:</span>
                            <span className="text-right">
                              {formatDate(history.startDate)} -{" "}
                              {formatDate(history.endDate)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Vehicles */}
                      {getVehicleNumbers(history.vehicleNumber).length > 0 && (
                        <div className="mb-3 sm:mb-4 md:mb-5">
                          <h5 className="font-medium text-gray-900 text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2">
                            Vehicles:
                          </h5>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {getVehicleNumbers(history.vehicleNumber).map(
                              (vehicle, index) => (
                                <span
                                  key={index}
                                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                                >
                                  {vehicle}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Images with Next.js Image */}
                      {history.tourSchedule.images &&
                        history.tourSchedule.images.length > 0 && (
                          <div className="mb-3 sm:mb-4 md:mb-5">
                            <h5 className="font-medium text-gray-900 text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2">
                              Memories:
                            </h5>
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                              {history.tourSchedule.images
                                .slice(0, 3)
                                .map((image) => (
                                  <div
                                    key={image.imageId}
                                    className="aspect-square rounded-md sm:rounded-lg overflow-hidden relative group bg-gray-200"
                                  >
                                    <Image
                                      src={image.imageUrl}
                                      alt={
                                        image.imageDescription ||
                                        image.imageName
                                      }
                                      fill
                                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, (max-width: 1536px) 14vw, 12vw"
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      placeholder="blur"
                                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                                    />
                                  </div>
                                ))}
                              {history.tourSchedule.images.length > 3 && (
                                <div className="aspect-square bg-gray-100 rounded-md sm:rounded-lg flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                                  +{history.tourSchedule.images.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      {/* Special Note */}
                      {history.tourSchedule.specialNote && (
                        <div className="p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <h5 className="font-medium text-amber-900 text-xs sm:text-sm md:text-base mb-1">
                            Special Note:
                          </h5>
                          <p className="text-amber-800 text-xs sm:text-sm">
                            {history.tourSchedule.specialNote}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          {histories.length > visibleCards && (
            <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-1.5 sm:space-x-2">
              {Array.from({
                length: Math.ceil(histories.length / Math.floor(visibleCards)),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * Math.floor(visibleCards))}
                  className={`transition-all duration-200 ${
                    currentIndex >= index * Math.floor(visibleCards) &&
                    currentIndex < (index + 1) * Math.floor(visibleCards)
                      ? "bg-gradient-to-r from-green-500 to-blue-500"
                      : "bg-gray-300"
                  }`}
                  style={{
                    width: typeof window !== 'undefined' && window.innerWidth < 640 ? '8px' : '12px',
                    height: typeof window !== 'undefined' && window.innerWidth < 640 ? '8px' : '12px',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg sm:rounded-xl border border-green-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6 text-center">
            <div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                {histories.length}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                Completed Tours
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                {histories.reduce(
                  (sum, history) => sum + history.numberOfParticipate,
                  0
                )}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                Total Participants
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                {histories.reduce(
                  (sum, history) => sum + history.historyDuration,
                  0
                )}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                Tour Days
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                {(
                  histories.reduce((sum, history) => sum + history.rating, 0) /
                  histories.length
                ).toFixed(1)}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourHistorySection;