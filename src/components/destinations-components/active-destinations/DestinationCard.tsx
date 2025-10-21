import { EnhancedDestination } from "@/types/destinations-types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface DestinationCardProps {
  destination: EnhancedDestination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const router = useRouter();

  const discount = getDiscountPercentage(destination.destinationId);
  const duration = getTourDuration(destination.destinationId);
  const currentPrice = getPrice(destination.popularity, destination.rating);
  const originalPrice = getOriginalPrice(currentPrice, discount);

  const handleImageSwitch = (imageIndex: number) => {
    setActiveImageIndex(imageIndex);
  };

  const handleExploreClick = () => {
    router.push(`/destinations/${destination.destinationId}`);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      {/* Image Gallery */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        {destination.images.length > 0 ? (
          <img
            src={
              destination.images[activeImageIndex]?.imageUrl ||
              destination.images[0].imageUrl
            }
            alt={
              destination.images[activeImageIndex]?.imageDescription ||
              destination.destinationName
            }
            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            onError={(e) => {
              e.currentTarget.src = "/api/placeholder/400/250";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {destination.destinationName}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-purple-400 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          {discount}% Off
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-10">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Thumbnail Images */}
        {destination.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex flex-col space-y-2">
            {destination.images.slice(0, 4).map((image, index) => (
              <div
                key={image.imageId}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  activeImageIndex === index
                    ? "border-amber-500 shadow-lg"
                    : "border-white hover:border-amber-300"
                }`}
                onClick={() => handleImageSwitch(index)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.imageDescription}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Image Counter */}
        {destination.images.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {activeImageIndex + 1} / {destination.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Duration and Rating */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {duration} days
          </div>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(destination.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm font-semibold text-gray-700">
              {destination.rating}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {destination.destinationName}
        </h3>

        {/* Location */}
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-purple-500"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {destination.location}
        </p>

        {/* Category */}
        <p className="text-gray-600 text-sm mb-4">{destination.categoryName}</p>

        {/* Activities Count */}
        <p className="text-gray-500 text-sm mb-4">
          {destination.activities.length} activities available
        </p>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}.00
            </span>
            <span className="text-lg font-bold text-purple-600">
              ${currentPrice}.00
            </span>
          </div>

          <button
            onClick={handleExploreClick}
            className="bg-purple-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

// Utility functions
const getDiscountPercentage = (destinationId: number): number => {
  const discounts = [10, 15, 20, 25, 30, 40];
  return discounts[destinationId % discounts.length];
};

const getTourDuration = (destinationId: number): number => {
  const durations = [3, 5, 7, 10, 14, 15];
  return durations[destinationId % durations.length];
};

const getPrice = (popularity: number, rating: number): number => {
  const basePrice = popularity * rating * 10;
  return Math.round(basePrice);
};

const getOriginalPrice = (currentPrice: number, discount: number): number => {
  return Math.round(currentPrice / (1 - discount / 100));
};

export default DestinationCard;
