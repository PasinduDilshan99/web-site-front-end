"use client";

import React, { useState, useRef, useEffect } from "react";
import { DayDetails } from "@/types/sri-lankan-tour-types";
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

interface SLTourDayWiseDetailsProps {
  days: DayDetails[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  extraDetails?: TourExtraDetailsType; // Add this
  extraDetailsLoading?: boolean; // Add this
  extraDetailsError?: string | null; // Add this
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
  extraDetails, // Add this
  extraDetailsLoading = false, // Add this
  extraDetailsError = null, // Add this
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

  const toggleDay = (dayNumber: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((day) => day !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  const toggleActivity = (
    dayNumber: number,
    destinationId: number,
    activityId: number
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
    initialIndex: number = 0
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
    return `LKR ${amount.toLocaleString()}`;
  };

  // Helper function to check if activity is expanded
  const isActivityExpanded = (
    dayNumber: number,
    destinationId: number,
    activityId: number
  ) => {
    const key = `${dayNumber}-${destinationId}-${activityId}`;
    return expandedActivities[key] || false;
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
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-amber-100 rounded-full mb-4 animate-pulse">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Loading Itinerary
            </h2>
            <p className="text-gray-600">Fetching your tour details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unable to Load Itinerary
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-amber-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!days || days.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-50 to-purple-50 border border-amber-200 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-purple-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Itinerary Coming Soon
            </h3>
            <p className="text-gray-600 mb-4">
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
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}

          {/* Days Navigation */}
          <div className="mb-8">
            <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
              {days.map((day) => (
                <button
                  key={day.dayNumber}
                  onClick={() => toggleDay(day.dayNumber)}
                  className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    expandedDays.includes(day.dayNumber)
                      ? "bg-gradient-to-r from-purple-600 to-amber-600 text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  Day {day.dayNumber}
                  <div className="text-xs mt-1 opacity-80">
                    {day.destinations.length} destinations
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Days Content */}
          <div className="space-y-8">
            {days.map((day) => (
              <div
                key={day.dayNumber}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
                  expandedDays.includes(day.dayNumber)
                    ? "border-2 border-purple-200 opacity-100"
                    : "border border-gray-200 opacity-50"
                }`}
              >
                {/* Day Header */}
                <button
                  onClick={() => toggleDay(day.dayNumber)}
                  className={`w-full p-6 flex justify-between items-center transition-all duration-300 ${
                    expandedDays.includes(day.dayNumber)
                      ? "bg-gradient-to-r from-purple-600 to-amber-600"
                      : "bg-gradient-to-r from-purple-500 to-amber-500"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-xl backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                      <span className="text-2xl font-bold text-white">
                        {day.dayNumber}
                      </span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-white">
                        Day {day.dayNumber}
                      </h3>
                      <div className="flex items-center gap-3 text-white/90 text-sm mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                          <span>{day.destinations.length} destinations</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Compass className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                          <span>
                            {day.destinations.reduce(
                              (acc, curr) => acc + curr.activities.length,
                              0
                            )}{" "}
                            activities
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      {expandedDays.includes(day.dayNumber)
                        ? "Collapse"
                        : "Expand"}
                    </span>
                    <div className="transition-transform duration-300 hover:scale-110">
                      {expandedDays.includes(day.dayNumber) ? (
                        <ChevronUp className="w-6 h-6 text-white" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Day Content with Animation */}
                <div
                  style={getAnimationStyles.dayContent(
                    expandedDays.includes(day.dayNumber)
                  )}
                >
                  {expandedDays.includes(day.dayNumber) && (
                    <div className="p-6">
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
