"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { VehicleById, VehicleImageById } from "@/types/vehicle-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

interface VehicleDetailsHeroSectionProps {
  vehicle: VehicleById;
}

const VehicleDetailsHeroSection: React.FC<VehicleDetailsHeroSectionProps> = ({
  vehicle,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Combine vehicle images and specification images for the slider
  const allImages = React.useMemo(() => {
    const images: { url: string; name: string; type: "vehicle" | "spec" }[] = [];
    
    // Add vehicle images
    vehicle.vehicleImages?.forEach((img) => {
      images.push({
        url: img.vehicleImageUrl || PLACE_HOLDER_IMAGE,
        name: img.vehicleImageName || `Vehicle image ${images.length + 1}`,
        type: "vehicle",
      });
    });

    // Add specification images
    vehicle.specificationImages?.forEach((img) => {
      images.push({
        url: img.specificationImageUrl || PLACE_HOLDER_IMAGE,
        name: img.specificationImageName || `Specification image ${images.length + 1}`,
        type: "spec",
      });
    });

    return images;
  }, [vehicle.vehicleImages, vehicle.specificationImages]);

  useEffect(() => {
    if (!isAutoPlaying || allImages.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, allImages.length]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!allImages.length) {
    return (
      <div className="relative h-96 bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">{vehicle.registrationNumber}</h1>
            <p className="text-xl opacity-90">
              {vehicle.specification?.make} {vehicle.specification?.model} ({vehicle.specification?.vehicleYear})
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[500px] md:h-[700px] overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900">
        {/* Image Slider */}
        <div className="relative w-full h-full">
          {allImages.map((image, index) => {
            const hasImage = !failedImages.has(index);

            return (
              <div
                key={index + 1}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === selectedImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {hasImage ? (
                  <>
                    <Image
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      width={2000}
                      height={1200}
                      priority={index === 0}
                      onError={() => handleImageError(index)}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Image Type Badge */}
                    {/* <div className="absolute top-6 right-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        image.type === 'vehicle' 
                          ? 'bg-blue-500/80 text-white' 
                          : 'bg-purple-500/80 text-white'
                      }`}>
                        {image.type === 'vehicle' ? '📷 Vehicle Photo' : '🔧 Specification'}
                      </span>
                    </div> */}
                  </>
                ) : (
                  // Pure gradient background when image failed
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Content Overlay - CENTERED */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl text-white text-center">
              {/* Status Badge */}
              <div className="mb-6 flex flex-wrap gap-3 justify-center">
                {/* <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                  vehicle.statusName?.toLowerCase() === 'active' 
                    ? 'bg-green-500/90' 
                    : vehicle.statusName?.toLowerCase() === 'maintenance'
                    ? 'bg-yellow-500/90'
                    : vehicle.statusName?.toLowerCase() === 'out of service'
                    ? 'bg-red-500/90'
                    : 'bg-gray-500/90'
                }`}>
                  {vehicle.statusName || 'Status Unknown'}
                </span> */}
                
                {vehicle.assignedDriverId > 0 && (
                  <span className="px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Driver Assigned
                  </span>
                )}
              </div>

              {/* Vehicle Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {vehicle.registrationNumber}
              </h1>

              {/* Vehicle Make/Model */}
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-teal-200">
                {vehicle.specification?.make} {vehicle.specification?.model} ({vehicle.specification?.vehicleYear})
              </h2>

              {/* Description Container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 mx-auto max-w-4xl mb-8">
                {/* Key Vehicle Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-300">
                      {vehicle.specification?.fuelTypeName || 'N/A'}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gray-300 mt-1">
                      Fuel Type
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-300">
                      {vehicle.specification?.transmissionTypeName || 'N/A'}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gray-300 mt-1">
                      Transmission
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-300">
                      {vehicle.specification?.engineCapacity || 'N/A'}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gray-300 mt-1">
                      Engine
                    </div>
                  </div>
                  
                  {/* <div className="text-center">
                    <div className="text-2xl font-bold text-teal-300">
                      {vehicle.specification?. || 'N/A'}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gray-300 mt-1">
                      Color
                    </div>
                  </div> */}
                </div>

                {/* Vehicle Details */}
                {/* <div className="flex flex-wrap gap-4 justify-center text-sm border-t border-white/20 pt-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full">
                    <svg
                      className="w-5 h-5 text-cyan-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">
                      Purchased: {formatDate(vehicle.vehiclePurchaseDate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 rounded-full">
                    <svg
                      className="w-5 h-5 text-teal-300"
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
                    <span className="font-medium">
                      {formatCurrency(vehicle.vehiclePurchasePrice)}
                    </span>
                  </div>

                  {vehicle.latestService && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full">
                      <svg
                        className="w-5 h-5 text-purple-300"
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
                        Last Service: {formatDate(vehicle.latestService.serviceDate)}
                      </span>
                    </div>
                  )}
                </div> */}
              </div>

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex mx-auto">
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {selectedImageIndex + 1} / {allImages.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <div className="hidden md:flex">
            <button
              onClick={prevSlide}
              className="cursor-pointer absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
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
              className="cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
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
        {allImages.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-gradient-to-r from-teal-400 to-cyan-400 scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {allImages.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 transition-all duration-500"
              style={{
                width: `${((selectedImageIndex + 1) / allImages.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleDetailsHeroSection;