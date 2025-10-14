"use client";
import { GET_POPULAR_DESTINATIONS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

// Import Slick CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeader from "../../../components/common-components/section-header/SectionHeader";
import Loading from "../../../components/common-components/loading/Loading";
import { ErrorState } from "../../../components/common-components/error-state/ErrorState";
import { EmptyState } from "../../../components/common-components/empty-state/EmptyState";
import AnimatedButton from "../../../components/common-components/buttons/AnimatedButton";

// TypeScript interfaces based on your updated API response
interface DestinationImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedAt: string;
}

export interface PopularDestinationsType {
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
  images: DestinationImage[];
}

const PopularDestinations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popularDestinations, setPopularDestinations] = useState<
    PopularDestinationsType[]
  >([]);
  const [activeImages, setActiveImages] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_POPULAR_DESTINATIONS);
        const data = await response.json();

        if (response.ok) {
          const items: PopularDestinationsType[] = data.data || [];
          const activePopularDestinations = items.filter(
            (item) => item.destinationStatus === "ACTIVE"
          );
          setPopularDestinations(activePopularDestinations);

          // Initialize active image index for each destination (default to first image)
          const initialActiveImages: { [key: number]: number } = {};
          activePopularDestinations.forEach((dest) => {
            initialActiveImages[dest.destinationId] = 0;
          });
          setActiveImages(initialActiveImages);

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

  // Function to handle image switching
  const handleImageSwitch = (destinationId: number, imageIndex: number) => {
    setActiveImages((prev) => ({
      ...prev,
      [destinationId]: imageIndex,
    }));
  };

  // Enhanced Slick carousel settings with 4 responsive breakpoints
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // PC - show 3 cards like the image
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 3500, // Large laptops/small desktops
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1800, // Large laptops/small desktops
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440, // Large laptops/small desktops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Laptops/tablets landscape
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Tablets portrait
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 640, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  // Get discount percentage (mock data for demo)
  const getDiscountPercentage = (destinationId: number) => {
    const discounts = [10, 15, 20, 25, 30, 40];
    return discounts[destinationId % discounts.length];
  };

  // Get tour duration (mock data for demo)
  const getTourDuration = (destinationId: number) => {
    const durations = [3, 5, 7, 10, 14, 15];
    return durations[destinationId % durations.length];
  };

  // Get price (mock data for demo)
  const getPrice = (popularity: number, rating: number) => {
    const basePrice = popularity * rating * 10;
    return Math.round(basePrice);
  };

  // Get original price
  const getOriginalPrice = (currentPrice: number, discount: number) => {
    return Math.round(currentPrice / (1 - discount / 100));
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading
        message="Loading why choose us details..."
        variant="spinner"
        size="md"
      />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
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

  if (popularDestinations.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
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
    <section className="mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-100 to-orange-50">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <SectionHeader
          subtitle="Explore our destinations"
          title="Most Popular Destinations"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
          fromColor="#A855F7"
          toColor="#F59E0B"
        />
      </div>

      {/* Destinations Carousel */}
      <div className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <Slider {...sliderSettings}>
          {popularDestinations.map((destination) => {
            const discount = getDiscountPercentage(destination.destinationId);
            const duration = getTourDuration(destination.destinationId);
            const currentPrice = getPrice(
              destination.popularity,
              destination.rating
            );
            const originalPrice = getOriginalPrice(currentPrice, discount);
            const activeImageIndex =
              activeImages[destination.destinationId] || 0;

            // Filter active images
            const activeDestinationImages = destination.images.filter(
              (img) => img.imageStatus === "ACTIVE"
            );

            return (
              <div
                key={destination.destinationId}
                className="px-2 sm:px-3 focus:outline-none"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  {/* Main Image Container */}
                  <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                    {activeDestinationImages.length > 0 ? (
                      <img
                        src={
                          activeDestinationImages[activeImageIndex]?.imageUrl ||
                          activeDestinationImages[0].imageUrl
                        }
                        alt={
                          activeDestinationImages[activeImageIndex]
                            ?.imageDescription ||
                          activeDestinationImages[0].imageDescription
                        }
                        className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/400/250";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-base sm:text-lg md:text-xl">
                          {destination.destinationName}
                        </span>
                      </div>
                    )}

                    {/* Discount Badge */}
                    <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-purple-400 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold z-10">
                      {discount}% Off
                    </div>

                    {/* Favorite Button */}
                    <button className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-10">
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>

                    {/* Enhanced Thumbnail Images */}
                    {activeDestinationImages.length > 1 && (
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 flex flex-col space-y-1 sm:space-y-2">
                        {activeDestinationImages
                          .slice(0, 4)
                          .map((image, index) => (
                            <div
                              key={image.imageId}
                              className={`w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                                activeImageIndex === index
                                  ? "border-amber-500 shadow-lg"
                                  : "border-white hover:border-amber-300"
                              }`}
                              onClick={() =>
                                handleImageSwitch(
                                  destination.destinationId,
                                  index
                                )
                              }
                            >
                              <img
                                src={image.imageUrl}
                                alt={image.imageDescription}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/api/placeholder/64/48";
                                }}
                              />
                            </div>
                          ))}
                        {activeDestinationImages.length > 4 && (
                          <div className="w-12 h-9 sm:w-14 sm:h-10 md:w-16 md:h-12 rounded-lg bg-black bg-opacity-70 flex items-center justify-center cursor-pointer hover:bg-opacity-80 transition-all">
                            <span className="text-white text-xs font-semibold">
                              +{activeDestinationImages.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Image Counter */}
                    {activeDestinationImages.length > 1 && (
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 bg-black bg-opacity-50 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
                        {activeImageIndex + 1} /{" "}
                        {activeDestinationImages.length}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6">
                    {/* Duration and Rating */}
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {duration} days
                      </div>

                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${
                              i < Math.floor(destination.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs sm:text-sm font-semibold text-gray-700">
                          {destination.rating}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 leading-tight">
                      {destination.destinationName}
                    </h3>

                    {/* Location */}
                    <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 flex items-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {destination.location}
                    </p>

                    {/* Price and Button */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        {/* <span className="text-xl sm:text-2xl font-bold text-gray-900">
                          ${currentPrice}.00
                        </span> */}
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          ${originalPrice}.00
                        </span>
                        <span className="text-base sm:text-lg md:text-xl font-bold text-purple-600">
                          ${currentPrice}.00
                        </span>
                      </div>

                      <button className="bg-purple-500 hover:bg-orange-600 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* View All Button */}
      <div className="text-center mt-6 sm:mt-8">
        <AnimatedButton onClick={() => console.log("Clicked!")}>
          Learn More About Us
        </AnimatedButton>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .slick-dots {
          bottom: -50px;
        }
        .slick-dots li button:before {
          font-size: 10px;
          color: #8b5cf6;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          color: #f59e0b;
          opacity: 1;
        }
        @media (min-width: 640px) {
          .slick-dots {
            bottom: -60px;
          }
          .slick-dots li button:before {
            font-size: 12px;
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default PopularDestinations;
