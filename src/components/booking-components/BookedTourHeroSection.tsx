"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface BookedTourHeroSectionProps {
  bookingId: string;
}

const BookedTourHeroSection: React.FC<BookedTourHeroSectionProps> = ({ bookingId }) => {
  const [heroItems, setHeroItems] = useState<HeroItem[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch hero section data
  useEffect(() => {
    const fetchHeroData = async () => {
      if (!bookingId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/hero-section/booked-tour/${bookingId}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.code === 200 && result.data) {
          setHeroItems(result.data);
        } else {
          setHeroItems([]);
        }
      } catch (error) {
        console.error('Error fetching hero section data:', error);
        setError('Failed to load tour images');
        setHeroItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, [bookingId]);

  // Auto-play functionality for image slider
  useEffect(() => {
    if (!isAutoPlaying || heroItems.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % heroItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroItems.length]);

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setSelectedImageIndex((prev) => (prev + 1) % heroItems.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setSelectedImageIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
  };

  // Get tour name from first item
  const tourName = heroItems.length > 0 ? heroItems[0].name.split(' - ')[0] : 'Your Booked Tour';

  // Loading state
  if (isLoading) {
    return (
      <div className="relative h-[400px] bg-gradient-to-r from-blue-600 to-green-600 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading tour images...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative h-[300px] bg-gradient-to-r from-blue-100 to-green-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl max-w-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Tour Images Available</h3>
            <p className="text-gray-600 mb-4">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No images state
  if (heroItems.length === 0) {
    return (
      <div className="relative h-[400px] bg-gradient-to-r from-blue-600 to-green-600">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="w-24 h-2 bg-blue-400 rounded-full mb-4"></div>
            <h1 className="text-4xl font-bold mb-2">Your Booked Tour</h1>
            <p className="text-xl opacity-90">Booking ID: {bookingId}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = heroItems[selectedImageIndex];

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-blue-600 to-green-600">
        {/* Image Slider */}
        <div className="relative w-full h-full">
          {heroItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === selectedImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
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
              {/* Blue accent overlay */}
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-500" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12">
            <div className="max-w-4xl text-white">
              {/* Booking Info Badge */}
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Booking ID: {bookingId}
                </span>
                <span className="px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Booked Tour
                </span>
              </div>

              {/* Item Title and Description */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {tourName}
              </h1>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mb-6">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-4">
                  {currentItem.description}
                </p>

                {/* Item Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-400"
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
                    <span className="font-medium">
                      Image {selectedImageIndex + 1} of {heroItems.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span className="font-medium">
                      Tour Gallery
                    </span>
                  </div>
                </div>
              </div>

              {/* Image Counter */}
              {heroItems.length > 1 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex">
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
                    {selectedImageIndex + 1} / {heroItems.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {heroItems.length > 1 && (
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
        {heroItems.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-blue-400 scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {heroItems.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300"
              style={{
                width: `${((selectedImageIndex + 1) / heroItems.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {heroItems.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            {heroItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "border-blue-500 ring-4 ring-blue-200 scale-105"
                    : "border-gray-300 hover:border-green-400 hover:scale-105"
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getFallbackImage();
                  }}
                />
                {selectedImageIndex === index && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
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
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center truncate">
                  {item.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookedTourHeroSection;