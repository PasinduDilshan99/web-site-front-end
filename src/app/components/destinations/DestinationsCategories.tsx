"use client";

import { GET_ALL_DESTINATIONS_CATEGORIES } from "@/utils/frontEndConstant";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AnimatedButton from "../common/AnimatedButton";

// Define the interface for image
interface ImageType {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  imageCreatedAt: string;
}

// Define the interface for a single destination category
interface DestinationCategoryType {
  categoryId: number;
  category: string;
  categoryDescription: string;
  categoryStatus: string;
  createdAt: string;
  updatedAt: string;
  images: ImageType[];
}

const DestinationsCategories = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [destinationsCategories, setDestinationsCategories] = useState<
    DestinationCategoryType[]
  >([]);
  const [displayCount, setDisplayCount] = useState(3);

  // Update display count based on screen size
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: 3 categories
        setDisplayCount(3);
      } else if (width < 768) {
        // Small mobile: 3 categories
        setDisplayCount(3);
      } else if (width < 1024) {
        // Tablet: 4 categories
        setDisplayCount(4);
      } else if (width < 1280) {
        // Laptop: 6 categories
        setDisplayCount(6);
      } else {
        // PC and large screens: 8 categories
        setDisplayCount(8);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  useEffect(() => {
    const fetchDestinationsCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_DESTINATIONS_CATEGORIES);
        const data = await response.json();

        if (response.ok) {
          const items: DestinationCategoryType[] = data.data || [];
          // Filter only active categories
          const activeCategories = items.filter(
            (item) => item.categoryStatus === "ACTIVE"
          );
          setDestinationsCategories(activeCategories);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch destinations categories");
        }
      } catch (err) {
        console.error("Error fetching destinations categories:", err);
        setError("Something went wrong while fetching destinations categories");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationsCategories();
  }, []);

  // Get filtered categories based on display count
  const displayedCategories = destinationsCategories.slice(0, displayCount);

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    console.log(`Navigating to category: ${categoryName} (ID: ${categoryId})`);
    // In real app: window.location.href = `/destinations?category=${categoryId}&name=${encodeURIComponent(categoryName)}`;
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <div className="animate-pulse">
              <div className="h-4 sm:h-5 bg-gray-300 rounded w-32 sm:w-48 md:w-64 mx-auto mb-2 sm:mb-3"></div>
              <div className="h-6 sm:h-8 md:h-10 lg:h-12 bg-gray-300 rounded w-48 sm:w-64 md:w-80 lg:w-96 mx-auto mb-3 sm:mb-4 md:mb-6"></div>
              <div className="h-3 sm:h-4 bg-gray-300 rounded w-56 sm:w-72 md:w-96 mx-auto mb-2 sm:mb-3"></div>
              <div className="h-0.5 sm:h-1 bg-gray-300 rounded w-12 sm:w-16 md:w-20 lg:w-24 mx-auto"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(displayCount)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-40 sm:h-48 md:h-56 lg:h-60 xl:h-64 bg-gray-300"></div>
                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="h-5 sm:h-6 lg:h-7 bg-gray-300 rounded mb-2 sm:mb-3"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 max-w-md mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Unable to Load Categories
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2 sm:px-4">
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg bg-gradient-to-r from-amber-800 to-purple-800 bg-clip-text text-transparent mb-2 sm:mb-3">
            Browse By Category
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Find Inspiration For Your Next Trip
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 md:mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
          <div className="mt-4 sm:mt-6 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedCategories.map((category) => {
            // Get the first active image or fallback
            const activeImage = category.images?.find(
              (img) => img.imageStatus === "ACTIVE"
            );
            const imageUrl = activeImage?.imageUrl || "/placeholder.jpg";
            const imageAlt = activeImage?.imageDescription || category.category;

            return (
              <div
                key={category.categoryId}
                onClick={() =>
                  handleCategoryClick(category.categoryId, category.category)
                }
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 lg:hover:-translate-y-3 overflow-hidden cursor-pointer border border-gray-100"
              >
                {/* Category Image */}
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-60 xl:h-64 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 sm:from-black/50 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500"></div>

                  {/* Category Status Badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        category.categoryStatus === "ACTIVE"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-gray-100 text-gray-800 border border-gray-200"
                      }`}
                    >
                      {category.categoryStatus}
                    </span>
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-1 leading-tight">
                    {category.category}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {category.categoryDescription}
                  </p>

                  {/* Explore Button - Visible on hover */}
                  <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center text-sm sm:text-base text-amber-600 font-semibold">
                      Explore Now
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
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
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-amber-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {destinationsCategories.length > displayCount && (
          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <button
              onClick={() => setDisplayCount(destinationsCategories.length)}
              className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg"
            >
              Show All {destinationsCategories.length} Categories
            </button>
          </div>
        )}

        {/* View All Button when all are displayed */}
        {displayedCategories.length === destinationsCategories.length &&
          destinationsCategories.length > 0 && (
            <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
              <AnimatedButton onClick={() => console.log("View all clicked")}>
                View All Destinations
              </AnimatedButton>
            </div>
          )}

        {/* Display Count Info */}
        {destinationsCategories.length > 0 && (
          <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            Showing {displayedCategories.length} of{" "}
            {destinationsCategories.length} categories
          </div>
        )}

        {/* Empty State */}
        {destinationsCategories.length === 0 && !loading && (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                No Categories Available
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Check back later for destination categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationsCategories;
