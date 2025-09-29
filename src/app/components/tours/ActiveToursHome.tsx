"use client"
import { GET_ALL_ACTIVE_TOUR_FE } from '@/utils/frontEndConstant';
import React, { useEffect, useState } from 'react';

// Interfaces for the API response (keep your existing interfaces)
interface TourImage {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  status: string;
}

interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
}

interface DestinationCategory {
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  categoryImageUrl: string | null;
}

interface Destination {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationStatus: string;
  category: DestinationCategory;
  location: string;
  rating: number;
  popularity: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
  images: DestinationImage[];
}

interface ActiveToursType {
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourType: string;
  tourCategory: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  startLocation: string;
  endLocation: string;
  maxPeople: number;
  minPeople: number;
  pricePerPerson: number;
  tourStatus: string;
  tourImages: TourImage[];
  destinations: Destination[];
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
}

const ActiveToursHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTours, setActiveTours] = useState<ActiveToursType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsToShow(1); // Mobile: 1 card
      } else if (width < 1024) {
        setCardsToShow(2); // Tablet: 2 cards
      } else if (width < 1280) {
        setCardsToShow(3); // Laptop: 3 cards
      } else {
        setCardsToShow(4); // PC: 4 cards
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  // Reset currentIndex when cardsToShow changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsToShow]);

  useEffect(() => {
    const fetchActiveTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_TOUR_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveToursType[] = data.data || [];
          setActiveTours(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active tours");
        }
      } catch (err) {
        console.error("Error fetching active tours:", err);
        setError("Something went wrong while fetching active tours");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTours();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (activeTours.length > cardsToShow && !isTransitioning) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = activeTours.length - cardsToShow;
          if (prev >= maxIndex) {
            return 0; // Loop back to start
          }
          return prev + 1;
        });
      }, 4000); // Increased to 4 seconds for better user experience
      return () => clearInterval(timer);
    }
  }, [activeTours.length, cardsToShow, isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning || activeTours.length <= cardsToShow) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const maxIndex = activeTours.length - cardsToShow;
      return prev >= maxIndex ? 0 : prev + 1;
    });
    
    setTimeout(() => setIsTransitioning(false), 700); // Match transition duration
  };

  const prevSlide = () => {
    if (isTransitioning || activeTours.length <= cardsToShow) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const maxIndex = activeTours.length - cardsToShow;
      return prev <= 0 ? maxIndex : prev - 1;
    });
    
    setTimeout(() => setIsTransitioning(false), 700); // Match transition duration
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || activeTours.length <= cardsToShow) return;
    
    setIsTransitioning(true);
    const maxIndex = activeTours.length - cardsToShow;
    const validIndex = Math.min(Math.max(0, index), maxIndex);
    setCurrentIndex(validIndex);
    
    setTimeout(() => setIsTransitioning(false), 700); // Match transition duration
  };

  // Get total number of possible slides
  const maxSlides = Math.max(0, activeTours.length - cardsToShow + 1);

  if (loading) {
    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500 text-sm sm:text-base md:text-lg">Loading amazing tours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-red-50 rounded-lg flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h3 className="font-semibold mb-2 text-sm sm:text-base md:text-lg">Error Loading Tours</h3>
          <p className="text-xs sm:text-sm md:text-base">{error}</p>
        </div>
      </div>
    );
  }

  if (activeTours.length === 0) {
    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 text-sm sm:text-base md:text-lg">No tours available</div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto bg-white overflow-hidden py-6 sm:py-8 md:py-12">
      <div className="flex h-auto">
        
        {/* Left Panel - Hidden on Mobile & Tablet, Visible on Laptop & PC */}
        <div className="hidden lg:flex w-2/5 bg-gradient-to-br from-amber-600 to-purple-800 text-white p-6 xl:p-12 flex-col justify-between min-h-80 xl:min-h-96">
          <div>
            <p className="text-amber-200 text-xs xl:text-sm uppercase tracking-wide mb-2 xl:mb-3">
              DISCOVER YOUR UNIQUE
            </p>
            <h1 className="text-3xl xl:text-5xl font-bold mb-3 xl:mb-4">TOURS</h1>
            <p className="text-amber-100 text-base xl:text-lg leading-relaxed max-w-sm mb-4 xl:mb-6">
              A magical escape into paradise awaits the passionate explorer.
            </p>
          </div>
          
          <div className="text-amber-200 text-sm font-medium">
            ALL TOURS
          </div>
        </div>

        {/* Right Panel - Full width on Mobile & Tablet, 3/5 width on Laptop & PC */}
        <div className="w-full lg:w-3/5 bg-white p-3 sm:p-4 md:p-6 lg:p-8 min-h-64 sm:min-h-80 lg:min-h-96 relative">
          
          {/* Mobile & Tablet Header */}
          <div className="lg:hidden mb-4 sm:mb-6 text-center">
            <p className="text-amber-600 text-xs sm:text-sm uppercase tracking-wide mb-1 sm:mb-2">
              DISCOVER YOUR UNIQUE
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">TOURS</h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              A magical escape into paradise awaits the passionate explorer.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative h-full overflow-hidden">
            {/* Cards Container */}
            <div 
              className="flex h-full transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                width: `${activeTours.length * (50 / cardsToShow)}%`,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {activeTours.map((tour, index) => (
                <div 
                  key={tour.tourId}
                  className="flex-shrink-0 h-full px-1 sm:px-2"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  {/* Tour Image */}
                  <div className="relative h-32 sm:h-40 md:h-48 lg:h-40 xl:h-44 overflow-hidden">
                    <img 
                      src={tour.tourImages[0]?.imageUrl || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'} 
                      alt={tour.tourName}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-black/60 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs backdrop-blur-sm">
                      ${tour.pricePerPerson}
                    </div>
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-amber-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                      {tour.durationDays} days
                    </div>
                  </div>
                  
                  {/* Tour Content */}
                  <div className="p-2 sm:p-3 md:p-4 lg:p-3 xl:p-4 flex-1 flex flex-col">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-base font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                      {tour.tourName}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-xs xl:text-sm mb-2 sm:mb-3 flex-1 line-clamp-2">
                      {tour.tourDescription}
                    </p>
                    
                    {/* Tour Details */}
                    <div className="space-y-1 mb-2 sm:mb-3">
                      <div className="flex items-center text-xs sm:text-sm lg:text-xs xl:text-sm text-gray-500">
                        <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate">{tour.startLocation}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm lg:text-xs xl:text-sm text-gray-500">
                        <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        Max {tour.maxPeople} people
                      </div>
                    </div>
                    
                    {/* Learn More Button */}
                    <button className="w-full bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 transition-colors text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-md sm:rounded-lg transition-colors duration-200 font-medium text-xs sm:text-sm lg:text-xs xl:text-sm flex items-center justify-center">
                      Learn More
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Desktop & Laptop Only */}
          {activeTours.length > cardsToShow && (
            <div className="hidden lg:block">
              <button 
                onClick={prevSlide}
                disabled={isTransitioning}
                className={`absolute left-1 lg:left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 flex items-center justify-center border border-gray-200 z-10 ${
                  isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
                aria-label="Previous tour"
              >
                <svg className="w-4 h-4 xl:w-5 xl:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                disabled={isTransitioning}
                className={`absolute right-1 lg:right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 flex items-center justify-center border border-gray-200 z-10 ${
                  isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
                aria-label="Next tour"
              >
                <svg className="w-4 h-4 xl:w-5 xl:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Mobile & Tablet Navigation */}
          {activeTours.length > cardsToShow && (
            <div className="lg:hidden flex justify-center space-x-3 sm:space-x-4 mt-3 sm:mt-4">
              <button 
                onClick={prevSlide}
                disabled={isTransitioning}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 flex items-center justify-center text-white shadow-lg ${
                  isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'
                }`}
                aria-label="Previous tour"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                disabled={isTransitioning}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 flex items-center justify-center text-white shadow-lg ${
                  isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'
                }`}
                aria-label="Next tour"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Slide Indicators */}
          {maxSlides > 1 && (
            <div className="absolute bottom-1 sm:bottom-1 lg:bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
              {Array.from({ length: maxSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-purple-600 scale-110 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Tour Counter */}
          <div className="absolute top-1 sm:top-2 lg:top-4 right-1 sm:right-2 lg:right-4 bg-white/80 backdrop-blur-sm text-gray-700 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm border border-gray-200">
            {currentIndex + 1}-{Math.min(currentIndex + cardsToShow, activeTours.length)} of {activeTours.length}
          </div>
        </div>
      </div>


    </div>
  );
};

export default ActiveToursHome;