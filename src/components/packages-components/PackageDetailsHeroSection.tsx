"use client";
import { ActivePackagesType } from "@/types/package-types";
import React, { useState, useEffect } from "react";

interface PackageHeaderProps {
  packageData: ActivePackagesType;
}

const PackageDetailsHeroSection: React.FC<PackageHeaderProps> = ({ packageData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Get all package images for the carousel
  const packageImages = packageData.packageImages || [];
  const allImages = packageImages.length > 0 
    ? packageImages 
    : [{ 
        imageId: 1, 
        imageUrl: "", 
        imageName: "Package Image", 
        imageDescription: "Package Image" 
      }];

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

  const getFallbackImage = (index: number) => {
    const fallbackImages = [
      "photo-1469474968028-56623f02e42e",
      "photo-1506744038136-46273834b3fb",
      "photo-1439066615861-d1af74d74000",
      "photo-1519681393784-d120267933ba",
      "photo-1501785888041-af3ef285b470",
      "photo-1506929562872-bb421503ef21",
      "photo-1464822759023-fed622ff2c3b",
      "photo-1470071459604-3b5ec3a7fe05",
      "photo-1505142468610-359e7d316be0",
      "photo-1506744038136-46273834b3fb"
    ];
    return `https://images.unsplash.com/${fallbackImages[index % fallbackImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80`;
  };

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {allImages.map((image, index) => (
          <div
            key={image.imageId || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(88, 28, 135, 0.7), rgba(120, 53, 15, 0.8)), url('${
                  image.imageUrl || getFallbackImage(index)
                }')`,
              }}
              onError={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(88, 28, 135, 0.7), rgba(120, 53, 15, 0.8)), url('${getFallbackImage(
                  index
                )}')`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 w-full">
            {/* Left Column - Package Details */}
            <div className="flex-1 max-w-2xl">
              {/* Package Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 text-white leading-tight">
                {packageData.packageName}
              </h1>

              {/* Package Description */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-5 md:mb-6 max-w-3xl">
                {packageData.packageDescription}
              </p>

              {/* Package Meta */}
              <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-white">
                {/* Validity */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm md:text-base">
                    Valid: {formatDate(packageData.startDate)} - {formatDate(packageData.endDate)}
                  </span>
                </div>

                {/* People */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm md:text-base">
                    {packageData.minPersonCount}-{packageData.maxPersonCount} People
                  </span>
                </div>

                {/* Package Type */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm md:text-base">{packageData.packageTypeName}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Price Box */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] text-center mt-4 md:mt-0">
              {packageData.discountPercentage > 0 ? (
                <>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                    {formatPrice(calculateDiscountedPrice())}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg line-through text-white/70 mb-2">
                    {formatPrice(packageData.totalPrice)}
                  </div>
                  <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    Save {packageData.discountPercentage}%
                  </div>
                </>
              ) : (
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  {formatPrice(packageData.totalPrice)}
                </div>
              )}
              <div className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2">per package</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (Only if multiple images) */}
      {allImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group z-10"
            aria-label="Previous slide"
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
            className="absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group z-10"
            aria-label="Next slide"
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

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-amber-400 scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-purple-400 transition-all duration-300"
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