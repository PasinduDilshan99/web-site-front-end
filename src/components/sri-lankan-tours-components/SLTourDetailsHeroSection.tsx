"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TourDetails } from "@/types/tour-types";

interface SLTourDetailsHeroSectionProps {
  tour: TourDetails;
}

const SLTourDetailsHeroSection: React.FC<SLTourDetailsHeroSectionProps> = ({
  tour,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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

  const truncateDescription = (text: string) => {
    if (!text) return "";
    if (isDescriptionExpanded) return text;

    // Responsive character limits
    const getLimit = () => {
      if (typeof window === "undefined") return 75; // Default for SSR

      if (window.innerWidth < 640) return 25; // Mobile
      if (window.innerWidth < 768) return 35; // Tablet
      if (window.innerWidth < 1024) return 50; // Laptop
      return 75; // PC
    };

    const limit = getLimit();

    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  // Add resize listener for responsive truncation
  useEffect(() => {
    const handleResize = () => {
      // Force re-render to update truncation on resize
      setIsDescriptionExpanded((prev) => prev);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get current image description
  const currentImageDescription =
    tour.images[selectedImageIndex]?.imageDescription || "";

  if (!tour.images.length) {
    return (
      <div className="relative h-96 bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl font-bold mb-2">{tour.tourName}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
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
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl text-white text-center mx-auto">
              {/* Tour Title - CENTERED */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {tour.tourName}
              </h1>

              {/* Image Description Container - CENTERED */}
              {currentImageDescription && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 mx-auto max-w-4xl mb-8 animate-fade-in">
                  <p className="text-md md:text-lg text-gray-100 leading-relaxed mb-4">
                    {truncateDescription(currentImageDescription)}
                  </p>

                  {/* Read More/Less Button for Image Description */}
                  {currentImageDescription.length > 25 && (
                    <button
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className="cursor-pointer text-sky-300 hover:text-sky-200 font-medium transition-colors inline-flex items-center gap-1 group"
                    >
                      {isDescriptionExpanded ? (
                        <>
                          Show less
                          <svg
                            className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          Read more
                          <svg
                            className="w-4 h-4 group-hover:translate-y-[2px] transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Tour Info - CENTERED */}
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-sky-500/20 rounded-full backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 text-sky-300"
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
                  <span className="font-medium">
                    {tour.startLocation} → {tour.endLocation}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 rounded-full backdrop-blur-sm">
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="font-medium">{tour.seasonName}</span>
                </div>
              </div>

              {/* Image Counter - CENTERED */}
              {tour.images.length > 1 && (
                <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex mx-auto">
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
                    {selectedImageIndex + 1} / {tour.images.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {tour.images.length > 1 && (
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

        {/* Slide Indicators - CENTERED */}
        {tour.images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {tour.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-gradient-to-r from-sky-400 to-teal-400 scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75"
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
                width: `${((selectedImageIndex + 1) / tour.images.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {tour.images.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-gray-200">
            {tour.images.map((image, index) => {
              const hasImage = !failedImages.has(index);

              return (
                <button
                  key={image.imageId}
                  onClick={() => goToSlide(index)}
                  className={`cursor-pointer relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "border-sky-500 ring-4 ring-sky-200 scale-105"
                      : "border-gray-300 hover:border-teal-400 hover:scale-105"
                  }`}
                >
                  {hasImage ? (
                    <Image
                      src={image.imageUrl}
                      alt={image.imageName || `Tour thumbnail ${index + 1}`}
                      width={2000}
                      height={2000}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900" />
                  )}
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
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
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center truncate">
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

export default SLTourDetailsHeroSection;
