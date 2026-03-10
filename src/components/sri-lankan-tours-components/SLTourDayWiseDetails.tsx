"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Compass,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Maximize2,
} from "lucide-react";
import Image from "next/image";
import ImageModal from "./tour-day-to-day-details-components/ImageModal";
import DayContent from "./tour-day-to-day-details-components/DayContent";
import TourExtraDetails from "./tour-day-to-day-details-components/TourExtraDetails";
import { TourExtraDetails as TourExtraDetailsType } from "@/types/sri-lankan-tour-types";
import { DayDetails } from "@/types/tour-types";
import DayWiseDetailsLoadingError from "./tour-day-to-day-details-components/DayWiseDetailsLoadingError";

interface SLTourDayWiseDetailsProps {
  days: DayDetails[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  extraDetails?: TourExtraDetailsType | null;
  extraDetailsLoading?: boolean;
  extraDetailsError?: string | null;
}

interface ImageModalData {
  imageUrl: string;
  title: string;
  description?: string;
  type: "destination" | "activity";
}

const SLTourDayWiseDetails: React.FC<SLTourDayWiseDetailsProps> = ({
  days,
  loading = false,
  error = null,
  onRetry,
  extraDetails,
  extraDetailsLoading = false,
  extraDetailsError = null,
}) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [expandedActivities, setExpandedActivities] = useState<{
    [key: string]: boolean;
  }>({});
  const [imageModal, setImageModal] = useState<{
    isOpen: boolean;
    data: ImageModalData | null;
    images: Array<{ url: string; title: string; description?: string }>;
    currentIndex: number;
  }>({
    isOpen: false,
    data: null,
    images: [],
    currentIndex: 0,
  });

  const [isClosingModal, setIsClosingModal] = useState(false);
  const activityRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleDay = (dayNumber: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((day) => day !== dayNumber)
        : [...prev, dayNumber],
    );
  };

  const toggleActivity = (
    dayNumber: number,
    destinationId: number,
    activityId: number,
  ) => {
    const key = `${dayNumber}-${destinationId}-${activityId}`;
    setExpandedActivities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const openImageModal = (
    imageUrl: string,
    title: string,
    description?: string,
    type: "destination" | "activity" = "destination",
    allImages: Array<{ url: string; title: string; description?: string }> = [],
    initialIndex: number = 0,
  ) => {
    setImageModal({
      isOpen: true,
      data: { imageUrl, title, description, type },
      images: allImages,
      currentIndex: initialIndex,
    });
    setIsClosingModal(false);
  };

  const closeImageModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setImageModal({ isOpen: false, data: null, images: [], currentIndex: 0 });
      setIsClosingModal(false);
    }, 300);
  };

  const navigateImage = (direction: "prev" | "next") => {
    setImageModal((prev) => {
      if (prev.images.length === 0) return prev;

      const newIndex =
        direction === "next"
          ? (prev.currentIndex + 1) % prev.images.length
          : (prev.currentIndex - 1 + prev.images.length) % prev.images.length;

      const image = prev.images[newIndex];
      return {
        ...prev,
        currentIndex: newIndex,
        data: {
          imageUrl: image.url,
          title: image.title,
          description: image.description,
          type: prev.data?.type || "destination",
        },
      };
    });
  };

  const downloadImage = async () => {
    if (!imageModal.data) return;

    try {
      const response = await fetch(imageModal.data.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `tour-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const formatTime = (time: string): string => {
    try {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  const formatCurrency = (amount: number): string => {
    return `USD ${amount.toLocaleString()}`;
  };

  // Helper function to check if activity is expanded
  const isActivityExpanded = (
    dayNumber: number,
    destinationId: number,
    activityId: number,
  ) => {
    const key = `${dayNumber}-${destinationId}-${activityId}`;
    return expandedActivities[key] || false;
  };

  // Scroll day buttons horizontally on mobile
  const scrollDays = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  // Animation styles for smooth transitions
  const getAnimationStyles = {
    dayContent: (isExpanded: boolean) => ({
      maxHeight: isExpanded ? "10000px" : "0",
      opacity: isExpanded ? 1 : 0,
      overflow: "hidden" as const,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    }),
  };

  // Loading State
  if (loading) {
    return (
      <div className="py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mb-3 sm:mb-4 animate-pulse">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-600" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              Loading Itinerary
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Fetching your tour details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <DayWiseDetailsLoadingError
        onRetry={onRetry}
        message="Couldn't load the day-by-day itinerary."
      />
    );
  }

  // Empty State
  if (!days || days.length === 0) {
    return (
      <div className="py-8 sm:py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-3 sm:px-4">
          <div className="bg-gradient-to-r from-amber-50 to-purple-50 border border-amber-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-100 to-purple-100 rounded-full mb-3 sm:mb-4">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-600" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
              Itinerary Coming Soon
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
              We&apos;re preparing a detailed day-by-day itinerary for this
              tour.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto sm:px-4 lg:px-6">
          {/* Days Navigation - Mobile optimized with scroll buttons */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="relative flex items-center">
              {/* Left scroll button - hidden on desktop */}
              <button
                onClick={() => scrollDays('left')}
                className="md:hidden absolute left-0 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-sky-600 hover:bg-sky-50 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Scrollable container */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-2 sm:pb-3 md:pb-4 space-x-2 sm:space-x-3 md:space-x-4 scrollbar-hide px-8 md:px-0"
              >
                {days.map((day) => (
                  <button
                    key={day.dayNumber}
                    onClick={() => toggleDay(day.dayNumber)}
                    className={`cursor-pointer flex-shrink-0 px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      expandedDays.includes(day.dayNumber)
                        ? "bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-md sm:shadow-lg transform scale-[1.02] sm:scale-105"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-sky-300 hover:shadow-sm sm:hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs sm:text-sm md:text-base font-semibold">
                        Day {day.dayNumber}
                      </span>
                      <div className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 opacity-80">
                        {day.destinations.length}{" "}
                        {day.destinations.length === 1
                          ? "Destination"
                          : "Destinations"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right scroll button - hidden on desktop */}
              <button
                onClick={() => scrollDays('right')}
                className="md:hidden absolute right-0 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-sky-600 hover:bg-sky-50 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {days.map((day) => (
              <div
                key={day.dayNumber}
                className={`bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden transition-all duration-500 ${
                  expandedDays.includes(day.dayNumber)
                    ? "border-2 border-sky-200 opacity-100"
                    : "border border-gray-200 opacity-50"
                }`}
              >
                {/* Day Header - Responsive */}
                <button
                  onClick={() => toggleDay(day.dayNumber)}
                  className={`w-full p-3 sm:p-4 md:p-5 flex items-center gap-2 sm:gap-3 transition-all duration-200 cursor-pointer ${
                    expandedDays.includes(day.dayNumber)
                      ? "bg-gradient-to-r from-sky-600 to-teal-600"
                      : "bg-gradient-to-r from-sky-500 to-teal-500"
                  }`}
                >
                  {/* Day number with badge */}
                  <div className="relative flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
                        {day.dayNumber}
                      </span>
                    </div>
                    {/* Active indicator */}
                    {expandedDays.includes(day.dayNumber) && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Day info - Truncate on mobile */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate pr-2">
                        Day {day.dayNumber}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-white/80 flex-shrink-0">
                        <span>
                          {day.destinations.reduce(
                            (acc, curr) => acc + curr.activities.length,
                            0,
                          )}
                        </span>
                        <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </div>
                    </div>

                    {/* Stats bar - Hide on very small screens */}
                    <div className="hidden xs:flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-white/80">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="truncate">{day.destinations.length} stops</span>
                      </div>
                      <span>•</span>
                      <span className="truncate">
                        {expandedDays.includes(day.dayNumber)
                          ? "Viewing"
                          : "Tap to view"}
                      </span>
                    </div>
                    
                    {/* Simple mobile stat */}
                    <div className="xs:hidden flex items-center text-[10px] text-white/80">
                      <MapPin className="w-2.5 h-2.5 mr-1" />
                      <span>{day.destinations.length} destinations</span>
                    </div>
                  </div>

                  {/* Expand icon */}
                  <div className="flex-shrink-0">
                    {expandedDays.includes(day.dayNumber) ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    )}
                  </div>
                </button>

                {/* Day Content with Animation */}
                <div
                  style={getAnimationStyles.dayContent(
                    expandedDays.includes(day.dayNumber),
                  )}
                >
                  {expandedDays.includes(day.dayNumber) && (
                    <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                      <DayContent
                        day={day}
                        isActivityExpanded={isActivityExpanded}
                        toggleActivity={toggleActivity}
                        formatCurrency={formatCurrency}
                        formatTime={formatTime}
                        openImageModal={openImageModal}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {extraDetails && (
        <TourExtraDetails
          details={extraDetails}
          loading={extraDetailsLoading}
          error={extraDetailsError}
        />
      )}

      {/* Image Modal */}
      {imageModal.isOpen && (
        <ImageModal
          imageModal={imageModal}
          isClosingModal={isClosingModal}
          onClose={closeImageModal}
          onNavigate={navigateImage}
          onDownload={downloadImage}
        />
      )}
    </>
  );
};

export default SLTourDayWiseDetails;