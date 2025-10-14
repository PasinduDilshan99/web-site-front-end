"use client";
import { GET_NEW_DESTINATIONS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/common-components/loading/Loading";
import { ErrorState } from "../../../components/common-components/error-state/ErrorState";
import { EmptyState } from "../../../components/common-components/empty-state/EmptyState";
import SectionHeader from "../../../components/common-components/section-header/SectionHeader";
import AnimatedButton from "../../../components/common-components/buttons/AnimatedButton";

interface ImageType {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedAt: string;
}

interface NewDestinationsType {
  popularId: number;
  rating: number;
  popularity: number;
  popularCreatedAt: string;
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  destinationStatus: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  images: ImageType[];
}

// Image Carousel Component for each destination
const ImageCarousel: React.FC<{
  images: ImageType[];
  destinationName: string;
  categoryName: string;
  rating: number;
}> = ({ images, destinationName, categoryName, rating }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Filter active images
  const activeImages = images.filter((img) => img.imageStatus === "ACTIVE");

  if (!activeImages || activeImages.length === 0) {
    return (
      <div className="relative h-40 sm:h-48 md:h-52 lg:h-56 xl:h-60 2xl:h-64 overflow-hidden group bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center">
        <span className="text-white font-semibold text-base sm:text-lg md:text-xl text-center px-3">
          {destinationName}
        </span>

        {/* Category Badge */}
        <div className="absolute top-2 left-2 xs:top-2 xs:left-2 sm:top-3 sm:left-3 md:top-3 md:left-3 lg:top-4 lg:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 xs:px-2 xs:py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1 shadow-sm">
          <span className="text-amber-600 text-xs xs:text-xs sm:text-sm md:text-sm font-medium">
            {categoryName}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 xs:top-2 xs:right-2 sm:top-3 sm:right-3 md:top-3 md:right-3 lg:top-4 lg:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 xs:px-2 xs:py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1 flex items-center shadow-sm">
          <span className="text-yellow-500 mr-1 text-xs xs:text-xs sm:text-sm">
            ⭐
          </span>
          <span className="font-bold text-gray-800 text-xs xs:text-xs sm:text-sm">
            {rating}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 xl:h-60 2xl:h-64 overflow-hidden group">
      {/* Images */}
      {activeImages.map((image, index) => (
        <div
          key={image.imageId}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
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
      <div className="absolute top-2 left-2 xs:top-2 xs:left-2 sm:top-3 sm:left-3 md:top-3 md:left-3 lg:top-4 lg:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 xs:px-2 xs:py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1 shadow-sm">
        <span className="text-amber-600 text-xs xs:text-xs sm:text-sm md:text-sm font-medium">
          {categoryName}
        </span>
      </div>

      {/* Rating Badge */}
      <div className="absolute top-2 right-2 xs:top-2 xs:right-2 sm:top-3 sm:right-3 md:top-3 md:right-3 lg:top-4 lg:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 xs:px-2 xs:py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1 flex items-center shadow-sm">
        <span className="text-yellow-500 mr-1 text-xs xs:text-xs sm:text-sm">
          ⭐
        </span>
        <span className="font-bold text-gray-800 text-xs xs:text-xs sm:text-sm">
          {rating}
        </span>
      </div>

      {/* Image Indicators */}
      {activeImages.length > 1 && (
        <div className="absolute bottom-2 xs:bottom-2 sm:bottom-3 md:bottom-3 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 xs:space-x-1 sm:space-x-1.5 md:space-x-2">
          {activeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows (appear on hover) */}
      {activeImages.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentImageIndex(
                currentImageIndex === 0
                  ? activeImages.length - 1
                  : currentImageIndex - 1
              )
            }
            className="absolute left-1 xs:left-1 sm:left-2 md:left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs xs:text-xs sm:text-sm md:text-base"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex(
                (currentImageIndex + 1) % activeImages.length
              )
            }
            className="absolute right-1 xs:right-1 sm:right-2 md:right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs xs:text-xs sm:text-sm md:text-base"
          >
            ›
          </button>
        </>
      )}

      {/* Image Counter */}
      {activeImages.length > 1 && (
        <div className="absolute bottom-2 right-2 xs:bottom-2 xs:right-2 sm:bottom-3 sm:right-3 md:bottom-3 md:right-3 lg:bottom-4 lg:right-4 bg-black/40 text-white text-xs xs:text-xs sm:text-xs px-1.5 xs:px-1.5 sm:px-2 py-0.5 xs:py-0.5 sm:py-1 rounded-full">
          {currentImageIndex + 1}/{activeImages.length}
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

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading
        message="Loading new destinations..."
        variant="spinner"
        size="md"
      />
    );
  }

  if (error) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  if (newDestinations.length === 0) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <EmptyState
            title="No Content Available"
            message="We're preparing some amazing content for you. Please check back soon!"
            icon="data"
            size="md"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-amber-50 to-purple-50">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Header Section */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
          <SectionHeader
            subtitle="New destinations"
            title="New Destinations"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {newDestinations.map((destination) => (
            <div
              key={destination.destinationId}
              className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              {/* Image Carousel */}
              <ImageCarousel
                images={destination.images}
                destinationName={destination.destinationName}
                categoryName={destination.categoryName}
                rating={destination.rating}
              />

              {/* Content */}
              <div className="p-2 sm:p-5 md:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight">
                    {destination.destinationName}
                  </h3>
                  <span className="text-xs md:text-sm text-gray-500 bg-gray-100 px-2 sm:px-2.5 md:px-3 py-1 rounded-full flex-shrink-0 ml-2">
                    {destination.location}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 sm:mb-5 md:mb-6 line-clamp-2 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl  leading-relaxed">
                  {destination.destinationDescription}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Starting from
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">
                      ${Math.floor(destination.popularity / 10)}.00
                    </p>
                  </div>

                  <button className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-amber-600 to-purple-600 text-white text-xs sm:text-sm md:text-base font-medium rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-amber-700 transition-colors">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
          <AnimatedButton onClick={() => console.log("Clicked!")}>
            More Destinations
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default NewDestinations;
