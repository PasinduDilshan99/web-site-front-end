// components/PackageImageSection.tsx
import React, { useState } from "react";
import Image from "next/image";
import { ActivePackagesForFilters } from "@/types/packages-types";
import { WishListService } from "@/services/wishListService";
import { useAuth } from "@/context/AuthContext";

interface PackageImageSectionProps {
  package: ActivePackagesForFilters;
  currentImageIndex: number;
  onImageIndexChange: (packageId: number, newIndex: number) => void;
}

const PackageImageSection: React.FC<PackageImageSectionProps> = ({
  package: pkg,
  currentImageIndex,
  onImageIndexChange,
}) => {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(pkg.wish || false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const handleImageClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (pkg.images && pkg.images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % pkg.images.length;
      onImageIndexChange(pkg.packageId, nextIndex);
    }
  };

  const handleDotClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    onImageIndexChange(pkg.packageId, index);
  };

  const handleArrowClick = (
    direction: "prev" | "next",
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    if (!pkg.images || pkg.images.length <= 1) return;

    let newIndex;
    if (direction === "prev") {
      newIndex =
        currentImageIndex === 0 ? pkg.images.length - 1 : currentImageIndex - 1;
    } else {
      newIndex = (currentImageIndex + 1) % pkg.images.length;
    }
    onImageIndexChange(pkg.packageId, newIndex);
  };

  // Wishlist toggle handler
  const handleWishlistToggle = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (loadingWishlist) return;
    setLoadingWishlist(true);
    try {
      await WishListService.addPackageWishList({ packageId: pkg.packageId });
      setIsWishlisted((prev) => !prev);
    } catch (err) {
      console.error("Failed to update wishlist", err);
      alert("Failed to update wishlist. Try again.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <div
      className="relative h-40 sm:h-48 md:h-56 lg:h-52 xl:h-56 overflow-hidden cursor-pointer group"
      onClick={handleImageClick}
    >
      {pkg.images &&
        pkg.images.length > 0 &&
        pkg.images.map((image, index) => (
          <div
            key={image.imageId}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
          >
            <Image
              src={image.imageUrl}
              alt={`${pkg.packageName} - Image ${index + 1}`}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}

      {/* Wishlist Heart Icon */}
      {user && (
        <button
          onClick={handleWishlistToggle}
          disabled={loadingWishlist}
          className={`
      absolute top-2 sm:top-3 right-2 sm:right-3 
      w-8 h-8 sm:w-9 sm:h-9
      flex items-center justify-center
      bg-white/95 backdrop-blur-[2px]
      rounded-full
      shadow-md hover:shadow-lg
      transition-all duration-200 ease-out
      z-20
      group
      ${
        loadingWishlist
          ? "opacity-60 cursor-not-allowed scale-95"
          : "hover:scale-105 active:scale-95 hover:bg-white"
      }
    `}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 transition-transform duration-200 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-all duration-200 group-hover:text-rose-500 group-hover:scale-110"
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
        </button>
      )}

      {pkg.discountPercentage > 0 && (
        <div className="absolute top-2 sm:top-3 left-2 sm:left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg z-10">
          {pkg.discountPercentage}% OFF
        </div>
      )}

      {pkg.images && pkg.images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 right -2 sm:right-3 bg-sky-800/80 text-white px-2 py-1 rounded-full text-xs z-10 backdrop-blur-sm">
          {currentImageIndex + 1}/{pkg.images.length}
        </div>
      )}

      {/* Dots */}
      {pkg.images && pkg.images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
          {pkg.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(index, e)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentImageIndex
                  ? "bg-gradient-to-r from-sky-400 to-teal-400 w-4 sm:w-6 shadow-md"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Arrow navigation */}
      {pkg.images && pkg.images.length > 1 && (
        <>
          <button
            onClick={(e) => handleArrowClick("prev", e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-sky-700/80 hover:bg-sky-600/90 text-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 shadow-lg"
            aria-label="Previous image"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => handleArrowClick("next", e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-700/80 hover:bg-sky-600/90 text-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 shadow-lg"
            aria-label="Next image"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default PackageImageSection;
