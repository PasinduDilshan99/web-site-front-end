// components/TourImageGallery.tsx
import React, { useEffect, useState } from "react";
import { WishListService } from "@/services/wishListService";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { ActiveToursType } from "@/types/tour-types";

interface TourImageGalleryProps {
  tour: ActiveToursType;
}

// Image component with error handling for main image
const MainImage = React.memo(
  ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className: string;
  }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setImgSrc(src);
      setHasError(false);
    }, [src]);

    const handleError = () => {
      if (!hasError) {
        console.log(
          `Main tour image failed to load for ${alt}, using placeholder`,
        );
        setImgSrc(PLACE_HOLDER_IMAGE);
        setHasError(true);
      }
    };

    return (
      <img src={imgSrc} alt={alt} className={className} onError={handleError} />
    );
  },
);

MainImage.displayName = "MainImage";

// Thumbnail image component with error handling
const ThumbnailImage = React.memo(
  ({
    src,
    alt,
    className,
    onClick,
  }: {
    src: string;
    alt: string;
    className: string;
    onClick: (e: React.MouseEvent) => void;
  }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setImgSrc(src);
      setHasError(false);
    }, [src]);

    const handleError = () => {
      if (!hasError) {
        setImgSrc(PLACE_HOLDER_IMAGE);
        setHasError(true);
      }
    };

    return (
      <div
        onClick={onClick}
        className={`${className} cursor-pointer relative overflow-hidden`}
      >
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
        {hasError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
    );
  },
);

ThumbnailImage.displayName = "ThumbnailImage";

const TourImageGallery: React.FC<TourImageGalleryProps> = ({ tour }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(tour.wish);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const { user } = useAuth();

  const allImages = tour.images
    .map((img) => ({
      url: img.imageUrl,
      name: img.imageName || "Tour image",
    }))
    .filter((img) => img.url);

  // If no images, create a placeholder array
  const displayImages =
    allImages.length > 0
      ? allImages
      : [
          {
            url: PLACE_HOLDER_IMAGE,
            name: tour.tourName,
          },
        ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (displayImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages.length]);

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
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-56 xl:h-60 2xl:h-64 w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Main Image with Error Handling */}
      <MainImage
        src={displayImages[currentImageIndex]?.url}
        alt={displayImages[currentImageIndex]?.name || tour.tourName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Wishlist Heart Icon */}
      {user && (
        <button
          onClick={handleWishlistToggle}
          disabled={loadingWishlist}
          className={`
      absolute top-3 sm:top-4 right-3 sm:right-4
      w-10 h-10 sm:w-11 sm:h-11
      flex items-center justify-center
      bg-white/90 backdrop-blur-sm
      rounded-full
      shadow-lg hover:shadow-xl
      transition-all duration-300 ease-out
      z-10
      group
      ${
        loadingWishlist
          ? "opacity-60 cursor-not-allowed"
          : "hover:scale-110 active:scale-95"
      }
    `}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {loadingWishlist ? (
            <svg
              className="w-5 h-5 text-gray-600 animate-spin"
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
              className="w-5 h-5 text-red-500 transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-500 transition-all duration-300 group-hover:text-red-400 group-hover:scale-110"
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

          {/* Ripple effect on hover - optional */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/0 via-red-400/0 to-purple-400/0 group-hover:from-pink-400/10 group-hover:via-red-400/10 group-hover:to-purple-400/10 transition-all duration-500"></span>
        </button>
      )}

      {/* Image Counter Badge */}
      {displayImages.length > 1 && (
        <div className="absolute top-3 sm:top-4 right-12 sm:right-16 bg-black bg-opacity-60 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm">
          {currentImageIndex + 1} / {displayImages.length}
        </div>
      )}

      {/* Thumbnail Images */}
      {displayImages.length > 1 && (
        <>
          {/* Mobile: Horizontal thumbnails at bottom */}
          <div className="absolute bottom-2 left-2 right-2 flex sm:hidden gap-1 justify-center">
            {displayImages.slice(0, 4).map((image, index) => (
              <ThumbnailImage
                key={index}
                src={image.url}
                alt={image.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThumbnailClick(index);
                }}
                className={`w-8 h-6 rounded border-2 transition-all duration-200 flex-shrink-0 ${
                  index === currentImageIndex
                    ? "border-white border-opacity-100 shadow-lg"
                    : "border-white border-opacity-60 hover:border-opacity-100"
                }`}
              />
            ))}
            {displayImages.length > 4 && (
              <div className="w-8 h-6 bg-black bg-opacity-60 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-medium">
                  +{displayImages.length - 4}
                </span>
              </div>
            )}
          </div>

          {/* Tablet and above: Vertical thumbnails */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 hidden sm:flex flex gap-1">
            {displayImages.slice(0, 3).map((image, index) => (
              <ThumbnailImage
                key={index}
                src={image.url}
                alt={image.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThumbnailClick(index);
                }}
                className={`w-8 h-6 sm:w-10 sm:h-8 rounded border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? "border-white border-opacity-100"
                    : "border-white border-opacity-60 hover:border-opacity-100"
                }`}
              />
            ))}
            {displayImages.length > 3 && (
              <div className="w-8 h-6 sm:w-10 sm:h-8 bg-black bg-opacity-60 rounded flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  +{displayImages.length - 3}
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Navigation Dots */}
      {displayImages.length > 1 && (
        <div
          className={`absolute bottom-3 left-3 gap-1 ${
            displayImages.length > 1 ? "hidden sm:flex" : "flex"
          }`}
        >
          {displayImages.slice(0, 5).map((_, index) => (
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
          {displayImages.length > 5 && (
            <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full" />
          )}
        </div>
      )}

      {/* Tour Title Overlay */}
<div className="absolute bottom-14 sm:bottom-14 left-3 sm:left-4 right-3 sm:right-20">
  <h3 className="
    text-white text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 
    font-bold leading-tight 
    drop-shadow-lg line-clamp-2
    px-3 py-1.5 sm:px-4 sm:py-2
    bg-gradient-to-r from-cyan-500/15 via-blue-500/20 to-teal-500/15
    backdrop-blur-md
    rounded-lg sm:rounded-xl
    inline-block
    shadow-lg shadow-blue-500/10
  ">
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
