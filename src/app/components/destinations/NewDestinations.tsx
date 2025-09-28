"use client";
import { GET_NEW_DESTINATIONS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface CategoryType {
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  categoryImageUrl: string | null;
}

interface ImageType {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
}

interface NewDestinationsType {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationStatus: string;
  category: CategoryType;
  location: string;
  rating: number;
  popularity: number;
  images: ImageType[];
}

// Image Carousel Component for each destination
const ImageCarousel: React.FC<{ 
  images: ImageType[]; 
  destinationName: string;
  category: CategoryType;
  rating: number;
}> = ({ images, destinationName, category, rating }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72 overflow-hidden group">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={image.imageId}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.imageUrl}
            alt={image.imageDescription}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}

      {/* Category Badge */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 shadow-sm">
        <span className="text-amber-600 text-xs sm:text-sm font-medium">
          {category.categoryName}
        </span>
      </div>

      {/* Rating Badge */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 flex items-center shadow-sm">
        <span className="text-yellow-500 mr-1 text-xs sm:text-sm">⭐</span>
        <span className="font-bold text-gray-800 text-xs sm:text-sm">
          {rating}
        </span>
      </div>

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows (appear on hover) */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentImageIndex(
              currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
            )}
            className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentImageIndex(
              (currentImageIndex + 1) % images.length
            )}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base"
          >
            ›
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
          {currentImageIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
};

const NewDestinations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newDestinations, setNewDestinations] = useState<NewDestinationsType[]>(
    []
  );

  useEffect(() => {
    const fetchNewDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_NEW_DESTINATIONS);
        const data = await response.json();

        if (response.ok) {
          const items: NewDestinationsType[] = data.data || [];
          // Filter only active destinations
          const activeDestinations = items.filter(
            (item) => item.destinationStatus === "ACTIVE"
          );
          setNewDestinations(activeDestinations);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch new destinations");
        }
      } catch (err) {
        console.error("Error fetching new destinations:", err);
        setError("Something went wrong while fetching new destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchNewDestinations();
  }, []);

  if (loading)
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading new destinations...</div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </section>
    );

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore our Tours
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            New and Most Popular Tours
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
          <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
          {newDestinations.map((destination) => (
            <div
              key={destination.destinationId}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image Carousel */}
              <ImageCarousel
                images={destination.images}
                destinationName={destination.destinationName}
                category={destination.category}
                rating={destination.rating}
              />

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {destination.destinationName}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {destination.location}
                  </span>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {destination.destinationDescription}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${Math.floor(destination.popularity / 10)}.00
                    </p>
                  </div>

                  <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-amber-700 transition-colors">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewDestinations;