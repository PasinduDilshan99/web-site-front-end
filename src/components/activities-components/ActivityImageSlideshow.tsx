"use client";
import { ActivityImage } from "@/types/activities-types";
import React, { useEffect, useState } from "react";

interface ActivityImageSlideshowProps {
  images: ActivityImage[];
  activityName: string;
}

const ActivityImageSlideshow: React.FC<ActivityImageSlideshowProps> = ({
  images,
  activityName,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter out images with invalid URLs
  const validImages = images.filter(
    (img) => img.image_url && img.image_url.trim() !== ""
  );

  // If no valid images, use placeholder
  if (validImages.length === 0) {
    return (
      <div className="relative w-full h-40 sm:h-48 md:h-56 bg-gray-200 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center">
        <span className="text-gray-500 text-sm">No Image Available</span>
      </div>
    );
  }

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    if (validImages.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [validImages.length]);

  const goToImage = (index: number) => {
    if (index === currentImageIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const nextImage = () => {
    if (validImages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevImage = () => {
    if (validImages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(
        (prev) => (prev - 1 + validImages.length) % validImages.length
      );
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-xl sm:rounded-t-2xl group">
      {/* Main Image */}
      <div className="relative w-full h-full">
        {validImages.map((image, index) => (
          <img
            key={image.id}
            src={image.image_url}
            alt={image.name || activityName}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            } ${
              isTransitioning ? "scale-105" : "scale-100"
            } transition-transform duration-500`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Show on hover */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous image"
          >
            <svg
              className="w-4 h-4"
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
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next image"
          >
            <svg
              className="w-4 h-4"
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

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          {currentImageIndex + 1} / {validImages.length}
        </div>
      )}

      {/* Navigation Dots */}
      {validImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Strip - Show on hover for quick navigation */}
      {validImages.length > 1 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm rounded-lg p-1">
          {validImages.slice(0, 4).map((image, index) => (
            <button
              key={image.id}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? "border-white scale-110"
                  : "border-white/50 hover:border-white/80"
              }`}
            >
              <img
                src={image.image_url}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </button>
          ))}
          {validImages.length > 4 && (
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/70 rounded flex items-center justify-center">
              <span className="text-white text-xs">
                +{validImages.length - 4}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityImageSlideshow;
