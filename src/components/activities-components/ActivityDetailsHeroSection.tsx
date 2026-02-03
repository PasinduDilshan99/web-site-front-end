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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto-play functionality for image slider
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
      (prev) => (prev - 1 + activity.images.length) % activity.images.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
  };

  if (!activity.images.length) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-amber-600 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{activity.name}</h1>
            <p className="text-xl opacity-90">{activity.description}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = activity.images[selectedImageIndex];

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-blue-600 to-amber-600">
        {/* Image Slider */}
        <div className="relative w-full h-full">
          {activity.images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === selectedImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.image_url}
                alt={image.name || `Activity image ${index + 1}`}
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
              {/* Activity Category Badge */}
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {activity.category_name}
                </span>
                <span className="px-4 py-2 bg-amber-500/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {activity.season}
                </span>
                <span className="px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activity.duration_hours} Hours
                </span>
                <span className="px-4 py-2 bg-purple-500/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {activity.status}
                </span>
              </div>

              {/* Activity Title and Description */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {activity.name}
              </h1>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mb-6">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-4">
                  {activity.description}
                </p>

                {/* Activity Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{activity.duration_hours} Hours Duration</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Local: ${activity.price_local} | Foreigner: ${activity.price_foreigners}</span>
                  </div> */}
                  {/* {activity.schedules && activity.schedules.length > 0 && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{activity.schedules.length} Available Schedules</span>
                    </div>
                  )} */}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">{activity.min_participate} - {activity.max_participate} Participants</span>
                  </div>
                </div>
              </div>

              {/* Image Counter */}
              {activity.images.length > 1 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
        {activity.images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {activity.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-amber-400 scale-125"
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
              className="h-full bg-gradient-to-r from-blue-400 to-amber-400 transition-all duration-300"
              style={{
                width: `${((selectedImageIndex + 1) / activity.images.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {/* {activity.images.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            {activity.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "border-blue-500 ring-4 ring-blue-200 scale-105"
                    : "border-gray-300 hover:border-amber-400 hover:scale-105"
                }`}
              >
                <img
                  src={image.image_url}
                  alt={image.name || `Activity thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getFallbackImage();
                  }}
                />
                {selectedImageIndex === index && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {image.name && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center truncate">
                    {image.name}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )} */}
    </>
  );
};

export default ActivityDetailsHeroSection;