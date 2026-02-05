// components/TourImageGallery.tsx
import { ActiveToursType } from "@/types/sri-lankan-tour-types";
import React, { useEffect, useState } from "react";
import { WishListService } from "@/services/wishListService";

interface TourImageGalleryProps {
  tour: ActiveToursType;
}

const TourImageGallery: React.FC<TourImageGalleryProps> = ({ tour }) => {
  console.log("====================================");
  console.log(tour);
  console.log("====================================");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(tour.wish);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const allImages = tour.images
    .map((img) => ({
      url: img.imageUrl,
      name: img.imageName,
    }))
    .filter((img) => img.url);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Wishlist toggle handler
  const handleWishlistToggle = async () => {
    if (loadingWishlist) return;
    setLoadingWishlist(true);
    try {
      await WishListService.addTourWishList({ tourId: tour.tourId });
      setIsWishlisted((prev) => !prev);
    } catch (err) {
      console.error("Failed to update wishlist", err);
      alert("Failed to update wishlist. Try again.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-56 xl:h-60 2xl:h-64 w-full flex-shrink-0">
      <img
        src={allImages[currentImageIndex]?.url || "/placeholder.jpg"}
        alt={allImages[currentImageIndex]?.name || tour.tourName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Wishlist Heart Icon */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-sky-50 transition-colors z-10"
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? (
          <svg
            className="w-4 h-4 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
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
        )}
      </button>

      {/* Image Counter Badge */}
      {allImages.length > 1 && (
        <div className="absolute top-3 sm:top-4 right-12 sm:right-16 bg-black bg-opacity-60 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm">
          {currentImageIndex + 1} / {allImages.length}
        </div>
      )}

      {/* Thumbnail Images */}
      {allImages.length > 1 && (
        <>
          {/* Mobile: Horizontal thumbnails at bottom */}
          <div className="absolute bottom-2 left-2 right-2 flex sm:hidden gap-1 justify-center">
            {allImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThumbnailClick(index);
                }}
                className={`w-8 h-6 rounded cursor-pointer border-2 transition-all duration-200 flex-shrink-0 ${
                  index === currentImageIndex
                    ? "border-white border-opacity-100 shadow-lg"
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
            {allImages.length > 4 && (
              <div className="w-8 h-6 bg-black bg-opacity-60 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-medium">
                  +{allImages.length - 4}
                </span>
              </div>
            )}
          </div>

          {/* Tablet and above: Vertical thumbnails */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 hidden sm:flex flex gap-1">
            {allImages.slice(0, 3).map((image, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThumbnailClick(index);
                }}
                className={`w-8 h-6 sm:w-10 sm:h-8 rounded cursor-pointer border-2 transition-all duration-200 ${
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
            {allImages.length > 3 && (
              <div className="w-8 h-6 sm:w-10 sm:h-8 bg-black bg-opacity-60 rounded flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  +{allImages.length - 3}
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Navigation Dots */}
      {allImages.length > 1 && (
        <div
          className={`absolute bottom-3 left-3 gap-1 ${
            allImages.length > 1 ? "hidden sm:flex" : "flex"
          }`}
        >
          {allImages.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleThumbnailClick(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex
                  ? "bg-gradient-to-b from-amber-800 to-purple-800"
                  : "bg-gradient-to-b from-purple-300 to-amber-300 bg-opacity-50 hover:bg-opacity-80"
              }`}
            />
          ))}
          {allImages.length > 5 && (
            <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full" />
          )}
        </div>
      )}

      {/* Tour Title Overlay */}
      <div className="absolute bottom-14 sm:bottom-14 left-3 sm:left-4 right-3 sm:right-20">
        <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-bold leading-tight drop-shadow-lg line-clamp-2">
          {tour.tourName}
        </h3>
      </div>

      {/* Season Badge */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
        <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          {tour.seasonName}
        </span>
      </div>
    </div>
  );
};

export default TourImageGallery;
