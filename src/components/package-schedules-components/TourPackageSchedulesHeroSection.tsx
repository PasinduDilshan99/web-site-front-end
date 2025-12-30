"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// ========== Interfaces ==========
interface PackageImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

interface PackageDetails {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  pricePerPerson: number;
  discount: number;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  status: string;
  images: PackageImage[];
}

interface TourPackageSchedulesHeroSectionProps {
  packageData: PackageDetails | null;
  loading: boolean;
  error: string | null;
}

const TourPackageSchedulesHeroSection: React.FC<TourPackageSchedulesHeroSectionProps> = ({
  packageData,
  loading,
  error,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto-play functionality for image slider
  useEffect(() => {
    if (!isAutoPlaying || !packageData?.images || packageData.images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % packageData.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, packageData?.images]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    if (!packageData?.images) return;
    setSelectedImageIndex((prev) => (prev + 1) % packageData.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    if (!packageData?.images) return;
    setSelectedImageIndex(
      (prev) => (prev - 1 + packageData.images.length) % packageData.images.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
  };

  if (loading) {
    return (
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-blue-600 to-emerald-600 animate-pulse">
        <div className="absolute inset-0 bg-gray-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="h-12 bg-gray-400 rounded-lg w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-400 rounded-lg w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-400 rounded-lg w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-red-600 to-orange-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Package Not Found
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {error || "The requested package could not be loaded."}
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-white text-red-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Back to Packages
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!packageData.images || packageData.images.length === 0) {
    return (
      <div className="relative h-[500px] md:h-[600px] overflow-hidden" style={{
        background: `linear-gradient(135deg, ${packageData.color}, ${packageData.hoverColor})`
      }}>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{packageData.packageName}</h1>
            <p className="text-xl opacity-90">{packageData.packageDescription}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = packageData.images[selectedImageIndex];

  return (
    <>
      {/* Hero Section with Slider */}
      <div 
        className="relative h-[500px] md:h-[600px] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${packageData.color}, ${packageData.hoverColor})`
        }}
      >
        {/* Image Slider */}
        <div className="relative w-full h-full">
          {packageData.images.map((image, index) => (
            <div
              key={image.imageId}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === selectedImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.imageUrl || getFallbackImage()}
                alt={image.imageName}
                className="w-full h-full object-cover"
                width={2000}
                height={1200}
                priority={index === 0}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getFallbackImage();
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12">
            <div className="max-w-4xl text-white">
              {/* Package Badges */}
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  PACKAGE
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {packageData.status}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {packageData.minPersonCount}-{packageData.maxPersonCount} People
                </span>
              </div>

              {/* Package Title and Description */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {packageData.packageName}
              </h1>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mb-6">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-4">
                  {packageData.packageDescription}
                </p>

                {/* Package Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">LKR {packageData.pricePerPerson.toLocaleString()} / Person</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">LKR {packageData.totalPrice.toLocaleString()} Total</span>
                  </div>
                  {packageData.discount > 0 && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                      <span className="font-medium">{packageData.discount}% Discount</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Counter */}
              {packageData.images.length > 1 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {selectedImageIndex + 1} / {packageData.images.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {packageData.images.length > 1 && (
          <div className="hidden md:flex">
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
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
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
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
        {packageData.images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {packageData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {packageData.images.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((selectedImageIndex + 1) / packageData.images.length) * 100}%`,
                background: `linear-gradient(90deg, ${packageData.color}, ${packageData.hoverColor})`
              }}
            />
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {packageData.images.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-gray-200">
            {packageData.images.map((image, index) => (
              <button
                key={image.imageId}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "ring-4 scale-105"
                    : "border-gray-300 hover:scale-105"
                }`}
                style={{
                  borderColor: selectedImageIndex === index ? packageData.color : '',
                  // ringColor: selectedImageIndex === index ? `${packageData.color}40` : ''
                }}
              >
                <img
                  src={image.imageUrl || getFallbackImage()}
                  alt={image.imageName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getFallbackImage();
                  }}
                />
                {selectedImageIndex === index && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: `${packageData.color}40` }}
                  >
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {image.imageName && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center truncate">
                    {image.imageName}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TourPackageSchedulesHeroSection;