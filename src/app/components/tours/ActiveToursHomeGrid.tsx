"use client";
import React, { useEffect, useState } from "react";
import { GET_ALL_ACTIVE_TOUR_FE } from "@/utils/frontEndConstant";

// Updated Interfaces for the new API response
interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

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

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: ActiveToursType[];
  timestamp: string;
}

// Tour Card Component with Image Slideshow
const TourCard = ({ tour }: { tour: ActiveToursType }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all tour images
  const allImages = tour.images.map(img => ({ 
    url: img.imageUrl, 
    name: img.imageName 
  })).filter(img => img.url); // Filter out any empty URLs

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const formatDuration = (days: number) => {
    const nights = days - 1;
    return `${nights < 10 ? "0" + nights : nights} Days ${
      days < 10 ? "0" + days : days
    } Nights`;
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Calculate price based on tour category and duration
  const calculatePrice = () => {
    const basePrice = 50; // Base price per day
    let multiplier = 1;
    
    // Adjust price based on tour category
    if (tour.tourCategoryName === "Luxury") multiplier = 2.5;
    else if (tour.tourCategoryName === "Family") multiplier = 1.2;
    else if (tour.tourCategoryName === "Budget") multiplier = 0.8;
    
    return Math.round(basePrice * tour.duration * multiplier);
  };

  const price = calculatePrice();

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Main Image Area */}
        <div className="relative h-64 w-full">
          <img
            src={allImages[currentImageIndex]?.url || "/placeholder.jpg"}
            alt={allImages[currentImageIndex]?.name || tour.tourName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Image Counter Badge */}
          {allImages.length > 1 && (
            <div className="absolute top-4 right-4 bg-purple-900 bg-opacity-60 text-white px-2 py-1 rounded-md text-xs font-medium">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Thumbnail Images in Corner */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 right-4 flex flex-col gap-1">
              {allImages.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThumbnailClick(index);
                  }}
                  className={`w-10 h-8 rounded cursor-pointer border-2 transition-all duration-200 ${
                    index === currentImageIndex
                      ? "border-white border-opacity-100"
                      : "border-white border-opacity-60 hover:border-opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}

              {/* Show "more" indicator if there are more than 4 images */}
              {allImages.length > 4 && (
                <div className="w-10 h-8 bg-black bg-opacity-60 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    +{allImages.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Navigation Dots */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-1">
              {allImages.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThumbnailClick(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-80"
                  }`}
                />
              ))}
              {allImages.length > 5 && (
                <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full" />
              )}
            </div>
          )}

          {/* Tour Title Overlay */}
          <div className="absolute bottom-12 left-4 right-20">
            <h3 className="text-white text-xl font-bold leading-tight drop-shadow-lg">
              {tour.tourName}
            </h3>
          </div>

          {/* Season Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {tour.seasonName}
            </span>
          </div>
        </div>

        {/* Tour Details Card */}
        <div className="bg-white p-4 rounded-b-lg">
          {/* Duration and Locations */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {formatDuration(tour.duration)}
            </span>
          </div>

          {/* Locations */}
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            <span className="inline-block w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-2 h-2 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>{tour.startLocation} → {tour.endLocation}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {tour.tourDescription}
          </p>

          {/* Price and Book Now Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              From{" "}
              <span className="text-lg font-bold text-gray-800">
                ${price}
              </span>
            </div>
            <button className="bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 transition-colors text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              BOOK NOW
            </button>
          </div>

          {/* Tour Type and Category Badges */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {tour.tourTypeName}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                {tour.tourCategoryName}
              </span>
            </div>
            
            {/* Schedules Count */}
            {tour.schedules.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="inline-block w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2 h-2 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-xs text-gray-600">
                  {tour.schedules.length} schedule{tour.schedules.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ActiveToursHomeGrid = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTours, setActiveTours] = useState<ActiveToursType[]>([]);

  useEffect(() => {
    const fetchActiveTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_TOUR_FE);
        const data: ApiResponse = await response.json();

        if (response.ok && data.code === 200) {
          const items: ActiveToursType[] = data.data || [];
          // Filter only active tours
          const activeItems = items.filter(tour => tour.statusName === "ACTIVE");
          setActiveTours(activeItems);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading tours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-amber-50 to-purple-50">
      <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          Lets plan your next home or holiday
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
          TOURS
        </h2>
        <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
      </div>

      {activeTours.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No active tours available at the moment.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTours.map((tour) => (
              <TourCard key={tour.tourId} tour={tour} />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
              View All Tours
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ActiveToursHomeGrid;