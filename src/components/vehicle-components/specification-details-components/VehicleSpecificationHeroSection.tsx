"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { VehicleSpecificationDetails } from "@/types/vehicle-types";

interface VehicleSpecificationHeroSectionProps {
  vehicleSpec: VehicleSpecificationDetails;
}

const VehicleSpecificationHeroSection: React.FC<
  VehicleSpecificationHeroSectionProps
> = ({ vehicleSpec }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || vehicleSpec.images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % vehicleSpec.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, vehicleSpec.images.length]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setSelectedImageIndex((prev) => (prev + 1) % vehicleSpec.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setSelectedImageIndex(
      (prev) =>
        (prev - 1 + vehicleSpec.images.length) % vehicleSpec.images.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const vehicleName = `${vehicleSpec.make} ${vehicleSpec.model}`;
  const fullVehicleName = `${vehicleName} (${vehicleSpec.year})`;

  // Mobile badge component for better organization
  const MobileBadges = () => (
    <div className="flex flex-wrap gap-2 justify-center sm:hidden mb-4">
      <span className="px-3 py-1.5 bg-teal-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
        {vehicleSpec.year}
      </span>
      <span className="px-3 py-1.5 bg-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white flex items-center gap-1">
        <span>$</span>
        {vehicleSpec.price.toLocaleString()}
      </span>
      <span className="px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
        {vehicleSpec.bodyType}
      </span>
    </div>
  );

  // Desktop badges
  const DesktopBadges = () => (
    <div className="hidden sm:flex flex-wrap gap-3 justify-center mb-6">
      <span className="px-4 py-2 bg-teal-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
        {vehicleSpec.year}
      </span>
      <span className="px-4 py-2 bg-cyan-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-2">
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        ${vehicleSpec.price.toLocaleString()}
      </span>
      <span className="px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
        {vehicleSpec.bodyType}
      </span>
      <span className="px-4 py-2 bg-teal-400/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
        {vehicleSpec.transmission.transmissionTypeName}
      </span>
    </div>
  );

  // Quick specs for mobile
  const MobileQuickSpecs = () => (
    <div className="grid grid-cols-2 gap-2 sm:hidden mt-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
        <p className="text-xs text-teal-200">Horsepower</p>
        <p className="text-sm font-bold text-white">
          {vehicleSpec.horsepowerHp} HP
        </p>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
        <p className="text-xs text-cyan-200">0-100 km/h</p>
        <p className="text-sm font-bold text-white">
          {vehicleSpec.acceleration0To100}s
        </p>
      </div>
    </div>
  );

  if (!vehicleSpec.images.length) {
    return (
      <div className="relative h-64 sm:h-96 lg:h-[500px] bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              {fullVehicleName}
            </h1>
            <p className="text-base sm:text-lg opacity-90">
              {vehicleSpec.bodyType}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900">
        {/* Image Slider */}
        <div className="relative w-full h-full">
          {vehicleSpec.images.map((image, index) => {
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
                      alt={image.imageName || `Vehicle image ${index + 1}`}
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
              {/* Badges - Responsive */}
              {/* <MobileBadges />
              <DesktopBadges /> */}

              {/* Vehicle Title - Responsive font sizes */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                {fullVehicleName}
              </h1>

              {/* Description Container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 mx-auto max-w-4xl">
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-100 leading-relaxed mb-4 sm:mb-6">
                  {vehicleSpec.engineType} •{" "}
                  {vehicleSpec.engineCapacity || "N/A"} •{" "}
                  {vehicleSpec.drivetrain}
                </p>

                {/* Quick Specs - Hidden on mobile (shown in separate component) */}
                <div className="hidden sm:flex flex-wrap gap-3 lg:gap-4 justify-center text-xs lg:text-sm">
                  <div className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-teal-500/20 rounded-full">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-teal-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="font-medium">
                      {vehicleSpec.horsepowerHp} HP
                    </span>
                  </div>

                  <div className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-cyan-500/20 rounded-full">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">
                      0-100: {vehicleSpec.acceleration0To100}s
                    </span>
                  </div>

                  <div className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-500/20 rounded-full">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-medium">
                      {vehicleSpec.fuelType.fuelTypeName}
                    </span>
                  </div>
                </div>

                {/* Mobile Quick Specs */}
                <MobileQuickSpecs />
              </div>

              {/* Image Counter */}
              {vehicleSpec.images.length > 1 && (
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
                      {selectedImageIndex + 1} / {vehicleSpec.images.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile, visible on tablet/desktop */}
        {vehicleSpec.images.length > 1 && (
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

        {/* Slide Indicators - Responsive sizing */}
        {vehicleSpec.images.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
            {vehicleSpec.images.map((_, index) => (
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
        {vehicleSpec.images.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 transition-all duration-500"
              style={{
                width: `${((selectedImageIndex + 1) / vehicleSpec.images.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleSpecificationHeroSection;
