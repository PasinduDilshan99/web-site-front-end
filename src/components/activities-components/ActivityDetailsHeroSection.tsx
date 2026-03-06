"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ActivityData, ActivityImage } from "@/types/activity-types";

interface ActivityDetailsHeroSectionProps {
  activity: ActivityData;
}

const ActivityDetailsHeroSection: React.FC<ActivityDetailsHeroSectionProps> = ({
  activity,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isAutoPlaying || activity.images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % activity.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activity.images.length]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setSelectedImageIndex((prev) => (prev + 1) % activity.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + activity.images.length) % activity.images.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  if (!activity.images.length) {
    return (
      <div className="relative h-96 bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">{activity.name}</h1>
            <p className="text-xl opacity-90">{activity.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[500px] md:h-[700px] overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900">
        {/* Image Slider */}
        <div className="relative w-full h-full">
          {activity.images.map((image, index) => {
            const hasImage = !failedImages.has(index);

            return (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === selectedImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {hasImage ? (
                  <>
                    <Image
                      src={image.image_url}
                      alt={image.name || `Activity image ${index + 1}`}
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
            <div className="max-w-6xl text-white text-center">
              {/* Activity Category Badges - CENTERED */}
              {/* <div className="mb-6 flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 bg-teal-500/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {activity.season}
                </span>
                <span className="px-4 py-2 bg-cyan-500/90 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {activity.duration_hours} Hours
                </span>
                <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {activity.status}
                </span>
              </div> */}

              {/* Activity Title - CENTERED */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {activity.name}
              </h1>

              {/* Description Container - CENTERED */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 mx-auto max-w-4xl mb-8">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-6">
                  {activity.description}
                </p>

                {/* Activity Info - CENTERED */}
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2 px-4 py-2 bg-sky-500/20 rounded-full">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">
                      {activity.duration_hours} Hours Duration
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-medium">
                      {activity.max_participate === 0
                        ? "Any Participants"
                        : `${activity.min_participate} - ${activity.max_participate} Participants`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Image Counter - CENTERED */}
              {activity.images.length > 1 && (
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
                    {selectedImageIndex + 1} / {activity.images.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {activity.images.length > 1 && (
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
        {activity.images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {activity.images.map((_, index) => (
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
        {activity.images.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400 transition-all duration-500"
              style={{
                width: `${((selectedImageIndex + 1) / activity.images.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityDetailsHeroSection;
