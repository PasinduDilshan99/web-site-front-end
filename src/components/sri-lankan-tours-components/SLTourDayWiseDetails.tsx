"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  DayDetails,
  Accommodation,
  DestinationWithActivities,
  Activity,
} from "@/types/sri-lankan-tour-types";
import {
  Calendar,
  MapPin,
  Clock,
  Utensils,
  Hotel,
  Car,
  ChevronDown,
  ChevronUp,
  Users,
  DollarSign,
  Shield,
  Star,
  Bed,
  Coffee,
  Sunset,
  Sunrise,
  CheckCircle,
  XCircle,
  TrendingUp,
  Compass,
  Navigation,
  ThermometerSun,
  Tag,
  Download,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

interface SLTourDayWiseDetailsProps {
  days: DayDetails[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
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

  const toggleActivity = (dayNumber: number, destinationId: number, activityId: number) => {
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

  const renderHotelStars = (rating: string) => {
    const starCount = parseInt(rating) || 0;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < starCount
                ? "text-amber-500 fill-amber-500"
                : "text-gray-200 fill-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  // Helper function to check if activity is expanded
  const isActivityExpanded = (dayNumber: number, destinationId: number, activityId: number) => {
    const key = `${dayNumber}-${destinationId}-${activityId}`;
    return expandedActivities[key] || false;
  };

  // Animation styles for smooth transitions
  const getAnimationStyles = {
    dayContent: (isExpanded: boolean) => ({
      maxHeight: isExpanded ? '10000px' : '0',
      opacity: isExpanded ? 1 : 0,
      overflow: 'hidden' as const,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
    activityContent: (isExpanded: boolean) => ({
      maxHeight: isExpanded ? '2000px' : '0',
      opacity: isExpanded ? 1 : 0,
      overflow: 'hidden' as const,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
    modalBackdrop: (isOpen: boolean, isClosing: boolean) => ({
      opacity: isOpen && !isClosing ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
    }),
    modalContent: (isOpen: boolean, isClosing: boolean) => ({
      opacity: isOpen && !isClosing ? 1 : 0,
      transform: isOpen && !isClosing ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  };

  // Render Activity Card with Expand/Collapse
  const renderActivityCard = (activity: Activity, dayNumber: number, destinationId: number) => {
    const isExpanded = isActivityExpanded(dayNumber, destinationId, activity.id);
    const key = `${dayNumber}-${destinationId}-${activity.id}`;

    return (
      <div key={activity.id} className="border border-gray-200 rounded-lg overflow-hidden mb-4 transition-all duration-300 hover:shadow-md">
        {/* Activity Header - Collapsible */}
        <button
          onClick={() => toggleActivity(dayNumber, destinationId, activity.id)}
          className="w-full p-4 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-all duration-300 group"
        >
          <div className="flex-1 text-left">
            <div className="flex items-center gap-3 mb-2">
              <h6 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                {activity.name}
              </h6>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full transition-transform duration-300 group-hover:scale-105">
                {activity.categoryName}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm text-gray-700">
                  {activity.durationHours} hours
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm text-gray-700">
                  {formatCurrency(activity.priceLocal)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm text-gray-700">
                  {activity.minParticipate}-{activity.maxParticipate} people
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ThermometerSun className="w-4 h-4 text-orange-600 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm text-gray-700">
                  {activity.season.split(",").length} seasons
                </span>
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-purple-700">
              {isExpanded ? "Show Less" : "Show Details"}
            </span>
            <div className="transition-all duration-300 transform group-hover:scale-110">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors duration-300" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors duration-300" />
              )}
            </div>
          </div>
        </button>

        {/* Activity Details - Expandable Content with Animation */}
        <div
          ref={(el) => { activityRefs.current[key] = el; }}
          style={getAnimationStyles.activityContent(isExpanded)}
        >
          {isExpanded && (
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Details */}
                <div>
                  <div className="mb-6">
                    <h6 className="font-semibold text-gray-900 mb-3">
                      Activity Description
                    </h6>
                    <p className="text-gray-700">{activity.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Timing
                          </span>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {formatTime(activity.availableFrom)} -{" "}
                          {formatTime(activity.availableTo)}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                          <ThermometerSun className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Season
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {activity.season.split(",").map((season, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white text-xs font-medium text-gray-700 rounded-full transition-all duration-300 hover:scale-105"
                            >
                              {season.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    {activity.requirements.length > 0 && (
                      <div>
                        <h6 className="font-semibold text-gray-900 mb-3">
                          Requirements
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {activity.requirements.map((req) => (
                            <div
                              key={req.id}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-sm"
                            >
                              <div
                                className="w-3 h-3 rounded-full transition-transform duration-300 hover:scale-125"
                                style={{ backgroundColor: req.color }}
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {req.name}: {req.value}
                                </div>
                                {req.description && (
                                  <div className="text-sm text-gray-600">
                                    {req.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Activity Images */}
                {activity.images.length > 0 && (
                  <div>
                    <h6 className="font-semibold text-gray-900 mb-4">
                      Activity Images
                    </h6>
                    <div className="grid grid-cols-2 gap-3">
                      {activity.images.map((img, imgIdx) => (
                        <div
                          key={img.id}
                          className="relative h-40 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
                          onClick={() => {
                            const images = activity.images.map((img) => ({
                              url: img.image_url,
                              title: img.name,
                              description: img.description,
                            }));
                            openImageModal(
                              img.image_url,
                              img.name,
                              img.description,
                              "activity",
                              images,
                              imgIdx
                            );
                          }}
                        >
                          <Image
                            src={img.image_url}
                            alt={img.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-white text-sm font-medium">
                                {img.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Comparison */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 transition-all duration-300 hover:shadow-md">
                <h6 className="font-semibold text-gray-900 mb-3">Price Information</h6>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg transition-all duration-300 hover:scale-105">
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Local Price
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(activity.priceLocal)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg transition-all duration-300 hover:scale-105">
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Foreigner Price
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      {formatCurrency(activity.priceForeigners)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render Day Content
  const renderDayContent = (day: DayDetails) => {
    return (
      <div className="space-y-8">
        {/* Destinations Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Destinations & Activities
          </h3>
          {day.destinations.map((destinationWithActivities, idx) => (
            <div
              key={destinationWithActivities.destination.destinationId}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Destination Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div
                    className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group"
                    onClick={() => {
                      const images =
                        destinationWithActivities.destination.images.map(
                          (img) => ({
                            url: img.imageUrl,
                            title: img.imageName,
                            description: img.imageDescription,
                          })
                        );
                      openImageModal(
                        destinationWithActivities.destination.images[0]?.imageUrl ||
                          "",
                        destinationWithActivities.destination.destinationName,
                        destinationWithActivities.destination
                          .destinationDescription,
                        "destination",
                        images,
                        0
                      );
                    }}
                  >
                    {destinationWithActivities.destination.images[0]?.imageUrl ? (
                      <Image
                        src={
                          destinationWithActivities.destination.images[0]
                            .imageUrl
                        }
                        alt={
                          destinationWithActivities.destination.images[0]
                            .imageName
                        }
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <Compass className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          {
                            destinationWithActivities.destination
                              .destinationName
                          }
                        </h4>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                            <span>
                              {
                                destinationWithActivities.destination.location
                              }
                            </span>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105">
                            {destinationWithActivities.destination.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-500">
                          Destination
                        </div>
                        <div className="text-lg font-bold text-blue-600 transition-transform duration-300 hover:scale-110">
                          #{idx + 1}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {
                        destinationWithActivities.destination
                          .destinationDescription
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Destination Gallery */}
              {destinationWithActivities.destination.images.length > 0 && (
                <div className="p-6 border-b border-gray-100">
                  <h5 className="font-semibold text-gray-900 mb-4">Gallery</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {destinationWithActivities.destination.images.map(
                      (image, imageIdx) => (
                        <div
                          key={image.imageId}
                          className="relative h-32 rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg"
                          onClick={() => {
                            const images =
                              destinationWithActivities.destination.images.map(
                                (img) => ({
                                  url: img.imageUrl,
                                  title: img.imageName,
                                  description: img.imageDescription,
                                })
                              );
                            openImageModal(
                              image.imageUrl,
                              image.imageName,
                              image.imageDescription,
                              "destination",
                              images,
                              imageIdx
                            );
                          }}
                        >
                          <Image
                            src={image.imageUrl}
                            alt={image.imageName}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-white text-sm font-medium truncate">
                                {image.imageName}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Activities Section */}
              {destinationWithActivities.activities.length > 0 && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg transition-transform duration-300 hover:scale-110">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900">
                      Available Activities (
                      {destinationWithActivities.activities.length})
                    </h5>
                  </div>
                  <div className="space-y-4">
                    {destinationWithActivities.activities.map((activity) =>
                      renderActivityCard(
                        activity,
                        day.dayNumber,
                        destinationWithActivities.destination.destinationId
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Accommodations Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm transition-transform duration-300 hover:scale-110">
                <Hotel className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Accommodations & Facilities
              </h3>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Hotel Information */}
            {day.accommodations.hotel && (
              <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl transition-transform duration-300 hover:scale-110">
                    <Bed className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {day.accommodations.hotel.hotelName}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                            <span>{day.accommodations.hotel.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderHotelStars(
                              day.accommodations.hotel.hotelCategory
                            )}
                            <span className="text-sm text-gray-600 ml-2">
                              {day.accommodations.hotel.hotelCategory} Star
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {day.accommodations.hotel.description}
                    </p>
                    {day.accommodations.hotel.facilities && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          Facilities
                        </h5>
                        <p className="text-gray-600">
                          {day.accommodations.hotel.facilities}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Transport Information */}
            {day.accommodations.transport && (
              <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl transition-transform duration-300 hover:scale-110">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Transportation
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Type", value: day.accommodations.transport.transportType },
                        { label: "Model", value: day.accommodations.transport.vehicleModel },
                        { label: "Seats", value: day.accommodations.transport.seatCount },
                        { 
                          label: "A/C", 
                          value: day.accommodations.transport.airConditioned ? "Yes" : "No",
                          icon: day.accommodations.transport.airConditioned ? 
                            <CheckCircle className="w-4 h-4 text-green-500" /> : 
                            <XCircle className="w-4 h-4 text-red-500" />
                        },
                      ].map((item, index) => (
                        <div 
                          key={index} 
                          className="bg-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                          <div className="text-sm font-medium text-gray-500 mb-1">
                            {item.label}
                          </div>
                          <div className="flex items-center gap-2">
                            {item.icon && item.icon}
                            <div className="font-semibold text-gray-900">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Meals Information */}
            <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white rounded-lg shadow-sm transition-transform duration-300 hover:scale-110">
                  <Utensils className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Meals Included</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  {
                    key: "breakfast",
                    label: "Breakfast",
                    included: day.accommodations.breakfast,
                    description: day.accommodations.breakfastDescription,
                    icon: <Sunrise className="w-4 h-4" />,
                  },
                  {
                    key: "lunch",
                    label: "Lunch",
                    included: day.accommodations.lunch,
                    description: day.accommodations.lunchDescription,
                    icon: <Utensils className="w-4 h-4" />,
                  },
                  {
                    key: "dinner",
                    label: "Dinner",
                    included: day.accommodations.dinner,
                    description: day.accommodations.dinnerDescription,
                    icon: <Sunset className="w-4 h-4" />,
                  },
                  {
                    key: "morningTea",
                    label: "Morning Tea",
                    included: day.accommodations.morningTea,
                    description: day.accommodations.morningTeaDescription,
                    icon: <Coffee className="w-4 h-4" />,
                  },
                  {
                    key: "eveningTea",
                    label: "Evening Tea",
                    included: day.accommodations.eveningTea,
                    description: day.accommodations.eveningTeaDescription,
                    icon: <Coffee className="w-4 h-4" />,
                  },
                ].map((meal) => (
                  <div
                    key={meal.key}
                    className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                      meal.included
                        ? "bg-green-50 border-green-200 hover:shadow-md"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`p-1 rounded transition-transform duration-300 hover:scale-110 ${
                          meal.included ? "bg-green-100" : "bg-gray-200"
                        }`}
                      >
                        {meal.icon}
                      </div>
                      <span className="font-medium text-gray-900">
                        {meal.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {meal.included ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500 transition-transform duration-300 hover:scale-110" />
                          <span className="text-sm text-green-700">
                            Included
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-gray-400 transition-transform duration-300 hover:scale-110" />
                          <span className="text-sm text-gray-500">
                            Not included
                          </span>
                        </>
                      )}
                    </div>
                    {meal.description && meal.included && (
                      <p className="text-xs text-gray-600 mt-2 transition-opacity duration-300">
                        {meal.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Notes */}
              {(day.accommodations.snacks || day.accommodations.otherNotes) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {day.accommodations.snacks && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="w-4 h-4 text-amber-600 transition-transform duration-300 hover:scale-110" />
                          <span className="font-semibold text-gray-900">
                            Snacks
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {day.accommodations.snackNote ||
                            "Snacks are included"}
                        </p>
                      </div>
                    )}
                    {day.accommodations.otherNotes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Compass className="w-4 h-4 text-blue-600 transition-transform duration-300 hover:scale-110" />
                          <span className="font-semibold text-gray-900">
                            Notes
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {day.accommodations.otherNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
              We&apos;re preparing a detailed day-by-day itinerary for this tour.
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-amber-600 rounded-2xl shadow-lg mb-6 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detailed Tour Itinerary
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Day-by-day breakdown of your journey through Sri Lanka
            </p>
          </div>

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
                <div style={getAnimationStyles.dayContent(expandedDays.includes(day.dayNumber))}>
                  {expandedDays.includes(day.dayNumber) && (
                    <div className="p-6">
                      {renderDayContent(day)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal with Animation */}
      {imageModal.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={getAnimationStyles.modalBackdrop(imageModal.isOpen, isClosingModal)}
          onClick={closeImageModal}
        >
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden z-10"
            style={getAnimationStyles.modalContent(imageModal.isOpen, isClosingModal)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {imageModal.data?.title}
                </h3>
                {imageModal.data?.description && (
                  <p className="text-gray-600 mt-1">
                    {imageModal.data.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full transition-transform duration-300 hover:scale-105">
                    {imageModal.data?.type === "destination"
                      ? "Destination"
                      : "Activity"}{" "}
                    Image
                  </span>
                  {imageModal.images.length > 1 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full transition-transform duration-300 hover:scale-105">
                      {imageModal.currentIndex + 1} of {imageModal.images.length}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadImage}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
                  title="Download image"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={closeImageModal}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[60vh] bg-gray-100">
              {imageModal.data && (
                <Image
                  src={imageModal.data.imageUrl}
                  alt={imageModal.data.title}
                  fill
                  className="object-contain transition-opacity duration-300"
                  sizes="100vw"
                  priority
                />
              )}

              {/* Navigation Arrows */}
              {imageModal.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {imageModal.images.length > 1 && (
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex overflow-x-auto space-x-3 pb-2">
                  {imageModal.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setImageModal((prev) => ({
                          ...prev,
                          currentIndex: idx,
                          data: {
                            ...prev.data!,
                            imageUrl: image.url,
                            title: image.title,
                            description: image.description,
                          },
                        }));
                      }}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                        idx === imageModal.currentIndex
                          ? "ring-2 ring-purple-500 ring-offset-2 scale-105"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                        sizes="80px"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SLTourDayWiseDetails;