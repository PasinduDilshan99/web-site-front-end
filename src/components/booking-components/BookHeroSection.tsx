"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
}

interface BookHeroSectionProps {
  packageScheduleId: string;
}

const BookHeroSection: React.FC<BookHeroSectionProps> = ({ packageScheduleId }) => {
  const [heroItems, setHeroItems] = useState<HeroItem[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch hero section data
  useEffect(() => {
    const fetchHeroData = async () => {
      if (!packageScheduleId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/hero-section/package-schedule/${packageScheduleId}`,
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
        setError('Failed to load hero images');
        setHeroItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, [packageScheduleId]);

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

  // Loading state
  if (isLoading) {
    return (
      <div className="relative h-[400px] bg-gradient-to-r from-amber-600 to-purple-600 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading images...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative h-[300px] bg-gradient-to-r from-red-100 to-amber-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Images</h3>
            <p className="text-gray-600 mb-4">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No images state
  if (heroItems.length === 0) {
    return (
      <div className="relative h-[400px] bg-gradient-to-r from-amber-600 to-purple-600">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="w-24 h-2 bg-amber-400 rounded-full mb-4"></div>
            <h1 className="text-4xl font-bold mb-2">Book Your Tour</h1>
            <p className="text-xl opacity-90">Select a package to begin your adventure</p>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = heroItems[selectedImageIndex];

  return (
    <>
      <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-amber-600 to-purple-600">
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
              {/* Gradient Overlay with dynamic color */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                style={{ backgroundColor: `${item.color}20` }}
              />
              {/* Color accent overlay */}
              <div 
                className="absolute top-0 left-0 w-full h-2"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12">
            <div className="max-w-4xl text-white">
              {/* Current Item Color Indicator */}
              <div 
                className="w-24 h-2 rounded-full mb-4"
                style={{ backgroundColor: currentItem.color }}
              />

              {/* Item Title and Description */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {currentItem.name}
              </h1>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mb-6">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-4">
                  {currentItem.description}
                </p>

                {/* Item Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      style={{ color: currentItem.color }}
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
                      className="w-5 h-5"
                      style={{ color: currentItem.color }}
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
                    <span className="font-medium">
                      Hero Gallery
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
              style={{ borderColor: currentItem.color }}
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
              style={{ borderColor: currentItem.color }}
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
            {heroItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                style={{
                  backgroundColor: index === selectedImageIndex ? item.color : undefined
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {heroItems.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((selectedImageIndex + 1) / heroItems.length) * 100}%`,
                background: `linear-gradient(to right, ${currentItem.color}, #${parseInt(currentItem.color.slice(1), 16).toString(16).padStart(6, '0')}80)`,
              }}
            />
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {heroItems.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-200">
            {heroItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "ring-4 scale-105"
                    : "border-gray-300 hover:border-purple-400 hover:scale-105"
                }`}
                style={{
                  borderColor: selectedImageIndex === index ? item.color : undefined,
                  boxShadow: selectedImageIndex === index ? `0 0 0 4px ${item.color}40` : undefined,
                }}
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
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}40` }}
                  >
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
                {/* Color indicator */}
                <div 
                  className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: item.color }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookHeroSection;