"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Tour } from "@/types/tour-types";

interface SLTourHeroSectionProps {
  tour: Tour;
}

const PackageComparisonHeaderSection: React.FC<SLTourHeroSectionProps> = ({
  tour,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Auto-play functionality for image slider
  useEffect(() => {
    if (!isAutoPlaying || tour.images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % tour.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, tour.images.length]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setSelectedImageIndex((prev) => (prev + 1) % tour.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + tour.images.length) % tour.images.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  // Truncate description to 50 characters
  const truncateDescription = (description: string) => {
    if (!description) return "";
    return description.length > 150 
      ? `${description.substring(0, 150)}...` 
      : description;
  };

  if (!tour.images.length) {
    return (
      <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center px-4">
              {tour.tourDetails.tourName}
            </h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 text-center px-4">
              {truncateDescription(tour.tourDetails.tourDescription)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
        {/* Image Slider */}
        <div className="relative w-full h-full">
          {tour.images.map((image, index) => {
            const hasImage = !failedImages.has(index);

            return (
              <div
                key={image.imageId}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === selectedImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {hasImage ? (
                  <>
                    <Image
                      src={image.imageUrl}
                      alt={image.imageName || `Tour image ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={2000}
                      height={1200}
                      priority={index === 0}
                      onError={() => handleImageError(index)}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </>
                ) : (
                  // Pure gradient background when image failed
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
                    {/* Gradient Overlay for consistency */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Content Overlay - CENTERED */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl text-white mx-auto text-center">
              {/* Tour Title and Description */}
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
                {tour.tourDetails.tourName}
              </h1>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 max-w-3xl mb-4 sm:mb-6 md:mb-8 mx-auto mx-2 sm:mx-4">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-100 leading-relaxed mb-3 sm:mb-4 md:mb-6">
                  {truncateDescription(tour.tourDetails.tourDescription)}
                </p>

                {/* Tour Info - CENTERED */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2 bg-sky-900/30 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-sky-300 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
                      {tour.tourDetails.startLocation} → {tour.tourDetails.endLocation}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 bg-teal-900/30 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal-300 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="font-medium truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">
                      {tour.tourDetails.seasonName || "Year-round"}
                    </span>
                  </div>
                  {tour.tourDetails.statusName && (
                    <div className="flex items-center gap-1 sm:gap-2 bg-cyan-900/30 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-300 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium truncate max-w-[80px] sm:max-w-[120px]">
                        {tour.tourDetails.statusName}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Counter */}
              {tour.images.length > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">
                    {selectedImageIndex + 1} / {tour.images.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile, visible on tablet and up */}
        {tour.images.length > 1 && (
          <div className="hidden sm:flex">
            <button
              onClick={prevSlide}
              className="cursor-pointer absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group shadow-lg"
              aria-label="Previous image"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
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
              onClick={nextSlide}
              className="cursor-pointer absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group shadow-lg"
              aria-label="Next image"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200"
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
          </div>
        )}

        {/* Slide Indicators */}
        {tour.images.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
            {tour.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`cursor-pointer w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-gradient-to-r from-sky-400 to-teal-400 scale-125 shadow-lg"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {tour.images.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400 transition-all duration-500"
              style={{
                width: `${
                  ((selectedImageIndex + 1) / tour.images.length) * 100
                }%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {tour.images.length > 1 && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 sm:pb-4 justify-start sm:justify-center scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-gray-200">
            {tour.images.map((image, index) => {
              const hasImage = !failedImages.has(index);

              return (
                <button
                  key={image.imageId}
                  onClick={() => goToSlide(index)}
                  className={`cursor-pointer relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "border-sky-500 ring-2 sm:ring-4 ring-sky-200 scale-105 shadow-lg"
                      : "border-gray-300 hover:border-teal-400 hover:scale-105"
                  }`}
                >
                  {hasImage ? (
                    <img
                      src={image.imageUrl}
                      alt={image.imageName || `Tour thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900" />
                  )}
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  {image.imageName && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] sm:text-xs p-0.5 sm:p-1 text-center truncate">
                      {image.imageName}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PackageComparisonHeaderSection;