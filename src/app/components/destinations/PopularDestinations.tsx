"use client"
import { GET_POPULAR_DESTINATIONS } from '@/utils/frontEndConstant';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

// Import Slick CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// TypeScript interfaces based on your API response
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

export interface PopularDestinationsType {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationStatus: string;
  category: DestinationCategory;
  location: string;
  rating: number;
  popularity: number;
  images: DestinationImage[];
}

const PopularDestinations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popularDestinations, setPopularDestinations] = useState<PopularDestinationsType[]>([]);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_POPULAR_DESTINATIONS);
        const data = await response.json();

        if (response.ok) {
          const items: PopularDestinationsType[] = data.data || [];
          const activePopularDestinations = items.filter(item => item.destinationStatus === "ACTIVE");
          setPopularDestinations(activePopularDestinations);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch popular destinations ");
        }
      } catch (err) {
        console.error("Error fetching popular destinations :", err);
        setError("Something went wrong while fetching popular destinations ");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  // Slick carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">Loading popular destinations...</div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-red-500 text-center">{error}</div>
    </div>
  );

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Popular Destinations</h2>
          <p className="text-gray-600 mb-6 md:mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          View All Destinations
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-10"></div>

      {/* Destinations Carousel */}
      <div className="relative">
        <Slider {...sliderSettings}>
          {popularDestinations.map(destination => (
            <div key={destination.destinationId} className="px-2 focus:outline-none">
              <div className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 h-full">
                {/* Image */}
                {destination.images.length > 0 && (
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={destination.images[0].imageUrl}
                      alt={destination.images[0].imageDescription}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md flex items-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="font-semibold text-gray-800">{destination.rating}</span>
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{destination.destinationName}</h3>
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                      {destination.category.categoryName}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {destination.location}
                  </p>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{destination.destinationDescription}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {Math.round(destination.popularity)}k visitors this year
                    </span>
                    <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default PopularDestinations;