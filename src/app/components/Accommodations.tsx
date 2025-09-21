"use client";
import { GET_AVAILABLE_ACCOMMODATION } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Interface for accommodation based on your API response
interface AccommodationsType {
  accommodationId: number;
  accommodationTitle: string;
  accommodationSubTitle: string;
  accommodationDescription: string;
  accommodationIconUrl: string;
  accommodationColor: string;
  accommodationHoverColor: string;
  accommodationLinkUrl: string;
  accommodationStatus: string;
  accommodationStatusStatus: string;
}

// Default accommodation icons
const HotelIcon = ({ color = "#F59E0B" }: { color?: string }) => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="40" height="28" rx="2" fill={color} fillOpacity="0.1"/>
    <rect x="6" y="14" width="36" height="24" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="10" y="18" width="6" height="6" rx="1" fill={color}/>
    <rect x="18" y="18" width="6" height="6" rx="1" fill={color}/>
    <rect x="26" y="18" width="6" height="6" rx="1" fill={color}/>
    <rect x="34" y="18" width="6" height="6" rx="1" fill={color}/>
    <rect x="20" y="30" width="8" height="6" rx="1" fill={color}/>
  </svg>
);

const VillaIcon = ({ color = "#8B5CF6" }: { color?: string }) => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L6 16v24h36V16L24 4z" fill={color} fillOpacity="0.1"/>
    <path d="M24 4L6 16v24h36V16L24 4z" stroke={color} strokeWidth="2"/>
    <rect x="20" y="28" width="8" height="12" fill={color}/>
    <rect x="14" y="22" width="6" height="6" stroke={color} strokeWidth="1.5"/>
    <rect x="28" y="22" width="6" height="6" stroke={color} strokeWidth="1.5"/>
  </svg>
);

const ResortIcon = ({ color = "#10B981" }: { color?: string }) => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" fill={color} fillOpacity="0.1"/>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2"/>
    <path d="M24 12c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12z" fill={color} fillOpacity="0.2"/>
    <rect x="20" y="20" width="8" height="8" rx="1" fill={color}/>
  </svg>
);

// Default fallback image
const getDefaultImage = () => {
  return "/images/default-accommodation-icon.png";
};

// Get default icon based on title
const getDefaultIcon = (title: string, color: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('hotel') || lowerTitle.includes('beach')) {
    return <HotelIcon color={color} />;
  } else if (lowerTitle.includes('villa') || lowerTitle.includes('private')) {
    return <VillaIcon color={color} />;
  } else if (lowerTitle.includes('resort') || lowerTitle.includes('camping')) {
    return <ResortIcon color={color} />;
  }
  return <HotelIcon color={color} />;
};

const Accommodations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accommodations, setAccommodations] = useState<AccommodationsType[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Handle image error
  const handleImageError = (originalUrl: string) => {
    setImageErrors(prev => new Set([...prev, originalUrl]));
  };

  // Get valid image URL
  const getValidImageUrl = (originalUrl: string): string => {
    if (!originalUrl || imageErrors.has(originalUrl)) {
      return getDefaultImage();
    }
    return originalUrl;
  };

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_AVAILABLE_ACCOMMODATION);
        const data = await response.json();

        if (response.ok && data.code === 200) {
          const items: AccommodationsType[] = data.data || [];
          setAccommodations(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch accommodations");
        }
      } catch (err) {
        console.error("Error fetching accommodations:", err);
        setError("Something went wrong while fetching accommodations");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  // Handle accommodation click
  const handleAccommodationClick = (linkUrl: string) => {
    if (linkUrl) {
      window.location.href = linkUrl;
    }
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "BOOKED":
        return "bg-red-100 text-red-800";
      case "UNDER_MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto"></div>
            </div>
          </div>
          
          {/* Loading Icons */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex flex-col items-center animate-pulse">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full mb-3"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-red-200">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (accommodations.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-500 text-lg">No accommodations available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="max-w-full sm:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium tracking-wider uppercase mb-2 sm:mb-3">
            Lets plan your next home or holiday
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 tracking-wide">
            ACCOMMODATION
          </h2>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {accommodations.map((accommodation) => {
            const imageUrl = getValidImageUrl(accommodation.accommodationIconUrl);
            const isDefault = imageUrl === getDefaultImage();

            return (
              <div
                key={accommodation.accommodationId}
                onClick={() => handleAccommodationClick(accommodation.accommodationLinkUrl)}
                className="group flex flex-col items-center p-6 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-gray-200 relative cursor-pointer"
                style={{
                  backgroundColor: accommodation.accommodationColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accommodation.accommodationHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = accommodation.accommodationColor;
                }}
              >
                {/* Status badge */}
                <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full ${getStatusColor(accommodation.accommodationStatus)}`}>
                  {accommodation.accommodationStatus.replace(/_/g, ' ')}
                </div>
                
                {/* Icon Container */}
                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {isDefault || imageErrors.has(accommodation.accommodationIconUrl) ? (
                    getDefaultIcon(accommodation.accommodationTitle, accommodation.accommodationColor)
                  ) : (
                    <div className="w-16 h-16 relative">
                      <Image
                        src={imageUrl}
                        alt={`${accommodation.accommodationTitle} icon`}
                        fill
                        className="object-contain"
                        onError={() => handleImageError(accommodation.accommodationIconUrl)}
                        unoptimized
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 
                  className="text-lg font-semibold text-center text-gray-800 mb-1"
                >
                  {accommodation.accommodationTitle}
                </h3>
                
                {/* Subtitle */}
                <p className="text-sm text-gray-600 text-center mb-2">
                  {accommodation.accommodationSubTitle}
                </p>
                
                {/* Description */}
                <p className="text-xs text-gray-500 text-center">
                  {accommodation.accommodationDescription}
                </p>

                {/* Hover Effect Underline */}
                <div 
                  className="mt-2 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ backgroundColor: accommodation.accommodationHoverColor }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Optional Call to Action */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base lg:text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
            View All Accommodations
          </button>
        </div>
      </div>
    </section>
  );
};

export default Accommodations;