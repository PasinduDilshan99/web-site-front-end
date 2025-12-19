"use client";

import React, { useState, useEffect } from "react";

interface TourImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
}

interface Tour {
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  status: string;
  images: TourImage[];
}

interface TourScheduleHeroSectionProps {
  tourData: Tour | null;
  loading: boolean;
  error: string | null;
}

const TourScheduleHeroSection: React.FC<TourScheduleHeroSectionProps> = ({
  tourData,
  loading,
  error,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play for image rotation
  useEffect(() => {
    if (!isAutoPlaying || !tourData?.images || tourData.images.length <= 1)
      return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % tourData.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, tourData?.images]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextImage = () => {
    if (!tourData?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % tourData.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevImage = () => {
    if (!tourData?.images) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + tourData.images.length) % tourData.images.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (loading) {
    return (
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg md:text-xl">Loading Tour Details...</p>
        </div>
      </div>
    );
  }

  if (error || !tourData) {
    return (
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              Tour Schedules
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-emerald-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-lg sm:text-xl text-emerald-300 mb-6">
            {error || "Tour information not available"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              Back to Tours
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = tourData.images[currentImageIndex] || tourData.images[0];

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-emerald-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        {tourData.images.length > 0 ? (
          <div className="relative w-full h-full">
            {tourData.images.map((image, index) => (
              <div
                key={image.imageId}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(6, 78, 59, 0.8)), url('${image.imageUrl}')`,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-800 via-indigo-700 to-emerald-800"></div>
        )}
      </div>

      {/* Tour Badge */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-white">
            <span className="text-emerald-200 font-bold">{tourData.duration}</span> Day Tour
          </span>
        </div>
      </div>

      {/* Image Counter */}
      {tourData.images.length > 1 && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 text-xs sm:text-sm backdrop-blur-sm bg-black/20 px-2 sm:px-3 py-1 rounded-full z-10">
          {currentImageIndex + 1} / {tourData.images.length}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl text-white">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                {tourData.tourName}
              </h1>
              
              <div className="mb-4 sm:mb-6">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-200 font-medium mb-2">
                  {tourData.startLocation} → {tourData.endLocation}
                </p>
                <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-emerald-400 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-3xl mb-6 sm:mb-8 border border-white/20 shadow-2xl">
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-gray-100 leading-relaxed">
                {tourData.tourDescription}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="flex flex-col items-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-emerald-200">Duration</span>
                  <span className="text-sm sm:text-base font-bold">{tourData.duration} Day{tourData.duration > 1 ? 's' : ''}</span>
                </div>

                <div className="flex flex-col items-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-blue-200">Start Point</span>
                  <span className="text-sm sm:text-base font-bold truncate">{tourData.startLocation}</span>
                </div>

                <div className="flex flex-col items-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-indigo-200">End Point</span>
                  <span className="text-sm sm:text-base font-bold truncate">{tourData.endLocation}</span>
                </div>

                <div className="flex flex-col items-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-400/20 flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-emerald-200">Status</span>
                  <span className={`text-sm sm:text-base font-bold ${
                    tourData.status === 'ACTIVE' ? 'text-emerald-400' : 'text-gray-300'
                  }`}>
                    {tourData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {tourData.images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group z-10"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-3 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 transition-all duration-300 group z-10"
            aria-label="Next image"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Image Indicators */}
      {tourData.images.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-2.5 z-10">
          {tourData.images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-emerald-400 scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-xs text-white/60 mb-1">Explore Schedules</span>
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TourScheduleHeroSection;