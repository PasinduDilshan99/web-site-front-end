"use client";
import React, { useState, useEffect } from "react";
import { VehicleTypeImage } from "@/types/vehicle-types";

interface VehicleTypeImageSlideshowProps {
  images: VehicleTypeImage[];
  vehicleTypeName: string;
}

const VehicleTypeImageSlideshow: React.FC<VehicleTypeImageSlideshowProps> = ({
  images,
  vehicleTypeName,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  // Filter out failed images
  const validImages = images.filter((_, index) => !failedImages.has(index));

  if (validImages.length === 0) {
    return (
      <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center rounded-t-xl sm:rounded-t-2xl">
        <span className="text-teal-400 text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 group rounded-t-xl sm:rounded-t-2xl overflow-hidden">
      {/* Images */}
      {validImages.map((image, idx) => (
        <div
          key={image.imageId}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.imageUrl}
            alt={`${vehicleTypeName} - ${image.imageDescription || image.imageName}`}
            className="w-full h-full object-cover"
            onError={() => handleImageError(images.findIndex((img) => img.imageId === image.imageId))}
          />
        </div>
      ))}

      {/* Navigation Arrows - Visible on Hover */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 sm:p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="Previous image"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
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
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 sm:p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="Next image"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
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

      {/* Image Indicators */}
      {validImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-1.5">
          {validImages.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToImage(idx);
              }}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
          {currentImageIndex + 1}/{validImages.length}
        </div>
      )}
    </div>
  );
};

export default VehicleTypeImageSlideshow;