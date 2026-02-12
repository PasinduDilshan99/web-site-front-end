import { EnhancedDestination } from "@/types/destination-types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WishListService } from "@/services/wishListService";
import { useAuth } from "@/context/AuthContext";
import { addBrowserHistory } from "@/services/browserHistoryService";

interface DestinationCardProps {
  destination: EnhancedDestination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(destination.wish || false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const router = useRouter();

  const discount = getDiscountPercentage(destination.destinationId);
  const duration = getTourDuration(destination.destinationId);
  const currentPrice = getPrice(destination.popularity, destination.rating);
  const originalPrice = getOriginalPrice(currentPrice, discount);

  const handleImageSwitch = (imageIndex: number) => {
    setActiveImageIndex(imageIndex);
  };

  const handleExploreClick = async () => {
    if (user) {
      try {
        await addBrowserHistory({
          type: "DESTINATIONS",
          dataId: destination.destinationId,
        });
      } catch (err) {
        console.error("Failed to record browser history:", err);
      }
    }

    router.push(`/destinations/${destination.destinationId}`);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    if (loadingWishlist) return; // prevent double click
    setLoadingWishlist(true);
    try {
      await WishListService.addDestinationWishList({
        destinationId: destination.destinationId,
      });
      setIsWishlisted((prev) => !prev);
    } catch (err) {
      console.error("Failed to update wishlist", err);
      alert("Failed to update wishlist. Try again.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col border border-sky-100 relative">
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
          <div className="w-full h-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {destination.destinationName}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10 shadow-md">
            {discount}% Off
          </div>
        )}

        {/* Wishlist Heart Icon */}
        {user && (
          <button
            onClick={handleWishlistToggle}
            disabled={loadingWishlist}
            className={`
      absolute top-3 right-3 
      w-8 h-8 sm:w-9 sm:h-9
      flex items-center justify-center
      bg-white/95 backdrop-blur-sm
      rounded-full
      shadow-lg hover:shadow-xl
      transition-all duration-300 ease-out
      z-10
      group
      ${
        loadingWishlist
          ? "opacity-60 cursor-not-allowed scale-95"
          : "hover:scale-110 active:scale-95 hover:bg-white"
      }
    `}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {loadingWishlist ? (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : isWishlisted ? (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-all duration-300 group-hover:text-rose-400 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}

            {/* Subtle ripple effect on hover */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/0 via-rose-400/0 to-rose-400/0 group-hover:from-rose-400/10 group-hover:via-rose-400/5 group-hover:to-rose-400/10 transition-all duration-500"></span>
          </button>
        )}

        {/* Thumbnail Images */}
        {destination.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex flex-row gap-2 space-y-2">
            {destination.images.slice(0, 4).map((image, index) => (
              <div
                key={image.imageId}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  activeImageIndex === index
                    ? "border-sky-500 shadow-lg"
                    : "border-white hover:border-sky-300"
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
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
            {activeImageIndex + 1} / {destination.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Duration and Rating */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sky-600 text-sm font-medium">
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
            <span className="ml-1 text-sm font-semibold text-sky-700">
              {destination.rating}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {destination.destinationName}
        </h3>
        <p className="text-md text-gray-900 mb-2 line-clamp-2 leading-tight">
          {destination.destinationDescription}
        </p>

        {/* Location & Category*/}
        <div className="flex justify-between">
          <p className="text-sky-600 text-sm mb-4 flex items-center font-medium">
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
        <p className="text-teal-600 text-sm mb-4 font-medium bg-teal-50 px-3 py-1 rounded-full w-fit">
          {destination.categoryName}
        </p>
        </div>

        <div className="flex justify-between items-center mt-auto">
          {/* Activities Count */}
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-gray-600 text-sm font-medium">
              {destination.activities.length} activities
            </span>
          </div>

          {/* Price and Button */}
          {/* ...your existing commented code... */}

          <button
            onClick={handleExploreClick}
            className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
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
