"use client";
import { ActivePackagesType } from "@/types/package-types";
import React, { useState, useEffect } from "react";

interface PackageHeaderProps {
  packageData: ActivePackagesType;
}

const PackageDetailsHeroSection: React.FC<PackageHeaderProps> = ({
  packageData,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscountedPrice = (): number => {
    return packageData.totalPrice * (1 - packageData.discountPercentage / 100);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const packageImages = packageData.packageImages || [];
  const allImages =
    packageImages.length > 0
      ? packageImages
      : [
          {
            imageId: 1,
            imageUrl: "",
            imageName: "Package Image",
            imageDescription: "Package Image",
          },
        ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, allImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {allImages.map((image, index) => {
          const hasImage = image.imageUrl && !failedImages.has(index);

          return (
            <div
              key={image.imageId || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {hasImage ? (
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(8, 145, 178, 0.8)), url('${image.imageUrl}')`,
                  }}
                  onError={() => handleImageError(index)}
                />
              ) : (
                // Pure gradient background when no image or image failed
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900" />
              )}
            </div>
          );
        })}
      </div>

      {/* Content Overlay - CENTERED */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
          <div className="flex flex-col items-center text-center w-full">
            {/* Package Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 text-white leading-tight max-w-4xl mx-auto">
              {packageData.packageName}
            </h1>

            {/* Package Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-5 md:mb-6 max-w-3xl mx-auto">
              {packageData.packageDescription}
            </p>

            {/* Package Meta - CENTERED */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-white">
              {/* People */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-sky-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs sm:text-sm md:text-base">
                  {packageData.minPersonCount}-{packageData.maxPersonCount}{" "}
                  People
                </span>
              </div>

              {/* Package Type */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs sm:text-sm md:text-base">
                  {packageData.packageTypeName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (Only if multiple images) */}
      {allImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-3 sm:left-4 md:left-5 lg:left-7 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 sm:p-3.5 md:p-4 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group z-10 shadow-lg"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-200"
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
            className="hidden sm:flex absolute right-3 sm:right-4 md:right-5 lg:right-7 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 sm:p-3.5 md:p-4 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-300 group z-10 shadow-lg"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-200"
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

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-sky-400 to-teal-400 scale-125 shadow-lg"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400 transition-all duration-500"
              style={{
                width: `${((currentSlide + 1) / allImages.length) * 100}%`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PackageDetailsHeroSection;
