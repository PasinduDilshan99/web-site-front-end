// components/vehicle-type-components/VehicleTypeHeroSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { VehicleType } from "@/types/vehicle-types";

interface VehicleTypeHeroSectionProps {
  vehicleType: VehicleType;
}

const VehicleTypeHeroSection: React.FC<VehicleTypeHeroSectionProps> = ({
  vehicleType,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isAutoPlaying || vehicleType.images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % vehicleType.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, vehicleType.images.length]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setSelectedImageIndex((prev) => (prev + 1) % vehicleType.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setSelectedImageIndex(
      (prev) =>
        (prev - 1 + vehicleType.images.length) % vehicleType.images.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  // Status badge color based on status
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "bg-teal-500/90";
      case "INACTIVE":
        return "bg-cyan-500/90";
      case "PENDING":
        return "bg-blue-500/90";
      default:
        return "bg-teal-500/90";
    }
  };

  // Mobile badge component
  const MobileBadges = () => (
    <div className="flex flex-wrap gap-2 justify-center sm:hidden mb-4">
      <span
        className={`px-3 py-1.5 ${getStatusColor(vehicleType.status)} backdrop-blur-sm rounded-full text-xs font-semibold text-white`}
      >
        {vehicleType.status}
      </span>
      <span className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
        ID: {vehicleType.vehicleTypeId}
      </span>
    </div>
  );

  // Desktop badges
  const DesktopBadges = () => (
    <div className="hidden sm:flex flex-wrap gap-3 justify-center mb-6">
      <span
        className={`px-4 py-2 ${getStatusColor(vehicleType.status)} backdrop-blur-sm rounded-full text-sm font-semibold text-white`}
      >
        {vehicleType.status}
      </span>
      <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
          />
        </svg>
        Type {vehicleType.vehicleTypeId}
      </span>
    </div>
  );

  if (!vehicleType.images.length) {
    return (
      <div className="relative h-64 sm:h-96 lg:h-[500px] bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              {vehicleType.name}
            </h1>
            <p className="text-base sm:text-lg opacity-90">
              {vehicleType.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] lg:h-[90vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {vehicleType.images.map((image, index) => {
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
                    alt={
                      image.imageName ||
                      `${vehicleType.name} image ${index + 1}`
                    }
                    className="w-full h-full object-cover"
                    width={2000}
                    height={1200}
                    priority={index === 0}
                    onError={() => handleImageError(index)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl text-white text-center">
            {/* Badges */}
            {/* <MobileBadges />
            <DesktopBadges /> */}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              {vehicleType.name}
            </h1>

            {/* Description Container */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 mx-auto max-w-4xl">
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-100 leading-relaxed">
                {vehicleType.description}
              </p>
            </div>

            {/* Image Counter */}
            {vehicleType.images.length > 1 && (
              <div className="mt-4 sm:mt-6 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/40 backdrop-blur-sm rounded-full">
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
                    {selectedImageIndex + 1} / {vehicleType.images.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {vehicleType.images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="cursor-pointer hidden sm:block absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 lg:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform duration-200"
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
            className="cursor-pointer hidden sm:block absolute right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 lg:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform duration-200"
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

      {/* Slide Indicators */}
      {vehicleType.images.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
          {vehicleType.images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                index === selectedImageIndex
                  ? "w-4 sm:w-5 lg:w-6 h-2 sm:h-2.5 lg:h-3 bg-gradient-to-r from-teal-400 to-cyan-400 shadow-lg"
                  : "w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {vehicleType.images.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 transition-all duration-500"
            style={{
              width: `${((selectedImageIndex + 1) / vehicleType.images.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VehicleTypeHeroSection;
