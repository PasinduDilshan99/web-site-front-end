"use client"
import { GET_TRENDING_DESTINATIONS } from '@/utils/frontEndConstant';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

// TypeScript interfaces based on your API response
interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
}

interface DestinationCategory {
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  categoryImageUrl: string | null;
}

interface DestinationType {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationStatus: string;
  category: DestinationCategory;
  location: string;
  rating: number;
  popularity: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number;
  images: DestinationImage[];
}

interface TrendingDestinationType {
  trendingId: number;
  trendingStatus: string;
  trendingCreatedAt: string;
  trendingCreatedBy: number;
  trendingUpdatedAt: string | null;
  trendingUpdatedBy: number;
  trendingTerminatedAt: string | null;
  trendingTerminatedBy: number;
  destination: DestinationType;
}

// Fallback images for destinations
const getFallbackImage = (destinationName: string) => {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Ancient temple
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Wildlife leopard
    "https://images.unsplash.com/photo-1506905925346-21bea83d5653?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Mountain landscape
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Beach paradise
    "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // City skyline
  ];
  
  const index = Math.abs(destinationName.toLowerCase().charCodeAt(0)) % fallbackImages.length;
  return fallbackImages[index];
};

const TrendingDestinations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendingDestinations, setTrendingDestinations] = useState<TrendingDestinationType[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Handle image error
  const handleImageError = (originalUrl: string) => {
    setImageErrors(prev => new Set([...prev, originalUrl]));
  };

  // Get valid image URL
  const getValidImageUrl = (originalUrl: string | undefined, destinationName: string): string => {
    if (!originalUrl || imageErrors.has(originalUrl)) {
      return getFallbackImage(destinationName);
    }
    return originalUrl;
  };

  useEffect(() => {
    const fetchTrendingDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_TRENDING_DESTINATIONS);
        const data = await response.json();

        if (response.ok) {
          const items: TrendingDestinationType[] = data.data || [];
          // Filter only active trending destinations that have valid images
          const activeTrendingDestinations = items.filter(item => 
            item.trendingStatus === "ACTIVE" && 
            item.destination.images && 
            item.destination.images.length > 0 &&
            item.destination.images.some(img => img.imageUrl && img.imageUrl.trim() !== '')
          );
          setTrendingDestinations(activeTrendingDestinations);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch trending destinations");
        }
      } catch (err) {
        console.error("Error fetching trending destinations:", err);
        setError("Something went wrong while fetching trending destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingDestinations();
  }, []);

  // Handle destination click
  const handleDestinationClick = (destinationId: number, destinationName: string) => {
    window.location.href = `/destinations/${destinationId}?name=${encodeURIComponent(destinationName)}`;
  };

  // Loading state
  if (loading) return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded-full w-32 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 rounded-xl h-64"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
  // Error state
  if (error) return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
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

  // No data state
  if (trendingDestinations.length === 0) return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-500 text-lg">No trending destinations found</p>
        </div>
      </div>
    </section>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Explore More button */}
        <div className="flex justify-between items-center mb-8 sm:mb-10 lg:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Trending <span className="text-gray-600">Destinations</span>
            </h2>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            Explore More
          </button>
        </div>

        {/* Full Background Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingDestinations.slice(0, 4).map((trending) => {
            const destination = trending.destination;
            const mainImage = destination.images && destination.images.length > 0 
              ? destination.images[0] 
              : null;
            const imageUrl = getValidImageUrl(mainImage?.imageUrl, destination.destinationName);
            const destinationExperts = Math.floor(Math.random() * 50) + 20;

            return (
              <div
                key={trending.trendingId}
                onClick={() => handleDestinationClick(destination.destinationId, destination.destinationName)}
                className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-64 sm:h-72 lg:h-80"
              >
                {/* Full Background Image */}
                <div className="absolute inset-0">
                  <image
                    src={imageUrl}
                    alt={mainImage?.imageDescription || destination.destinationName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => mainImage && handleImageError(mainImage.imageUrl)}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                  
                  {/* Top Section - Rating */}
                  {destination.rating && (
                    <div className="flex justify-end">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-white text-sm font-medium">{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Section - Destination Info */}
                  <div className="text-white">
                    {/* Destination Name */}
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                      {destination.destinationName}
                    </h3>

                    {/* Location with Icon */}
                    <div className="flex items-center mb-3 opacity-90">
                      <svg className="w-4 h-4 text-white/80 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{destination.location}</span>
                    </div>

                    {/* Experts Count */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-white/90">
                          {destinationExperts}+ Destination Experts
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="bg-white/25 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-xs text-white font-medium">
                          {destination.category.categoryName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 rounded-xl sm:rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium sm:font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base">
            View All Trending Destinations
          </button>
        </div>
      </div>
    </section>
  );
}

export default TrendingDestinations;