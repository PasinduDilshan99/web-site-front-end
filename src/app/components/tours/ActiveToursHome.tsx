"use client"
import { GET_ALL_ACTIVE_TOUR_FE } from '@/utils/frontEndConstant';
import React, { useEffect, useState } from 'react';

// Interfaces for the API response
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
  const [currentSlide, setCurrentSlide] = useState(0);

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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeTours.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTours.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeTours.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeTours.length) % activeTours.length);
  };

  if (loading) {
    return (
      <div className="relative w-full h-96 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading amazing tours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-96 bg-red-50 rounded-lg flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h3 className="font-semibold mb-2">Error Loading Tours</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (activeTours.length === 0) {
    return (
      <div className="relative w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">No tours available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex h-96 md:h-80">
        {/* Left Panel - Main Content */}
        <div className="flex-1 bg-gradient-to-br from-teal-600 to-teal-800 text-white p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <p className="text-teal-200 text-sm uppercase tracking-wide mb-2">
              Discover your next
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">TOURS</h1>
            <p className="text-teal-100 text-lg leading-relaxed max-w-sm">
              A magical escape into paradise awaits the passionate explorer.
            </p>
          </div>
          
          <div className="text-teal-200 text-sm">
            All Tours
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex space-x-3 mt-8">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-400 transition-colors flex items-center justify-center"
              aria-label="Previous tour"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-400 transition-colors flex items-center justify-center"
              aria-label="Next tour"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Panel - Tour Slides */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {activeTours.map((tour, index) => (
              <div key={tour.tourId} className="w-full flex-shrink-0 relative">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${tour.tourImages[0]?.imageUrl || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop'})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <div className="text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {tour.tourName}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-4">
                      {tour.tourDescription}
                    </p>
                    
                    {/* Tour Details */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-300 mb-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {tour.durationDays} days
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        ${tour.pricePerPerson}
                      </span>
                    </div>

                    {/* Learn More Button */}
                    <button className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm">
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {activeTours.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Tour Counter */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
        {currentSlide + 1} / {activeTours.length}
      </div>
    </div>
  );
};

export default ActiveToursHome;