"use client";

import { GET_ALL_DESTINATIONS_CATEGORIES } from "@/utils/frontEndConstant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Define the interface for a single destination category
interface DestinationCategoryType {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  imageUrl: string;
  categoryStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

const DestinationsCategories = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [destinationsCategories, setDestinationsCategories] = useState<
    DestinationCategoryType[]
  >([]);

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

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    console.log(`Navigating to category: ${categoryName} (ID: ${categoryId})`);
    // In real app: window.location.href = `/destinations?category=${categoryId}&name=${encodeURIComponent(categoryName)}`;
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded w-48 sm:w-64 md:w-80 mx-auto mb-4 sm:mb-6"></div>
              <div className="h-1 bg-blue-500 rounded w-12 sm:w-16 md:w-20 mx-auto"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden">
                  <div className="h-40 xs:h-48 sm:h-56 md:h-60 lg:h-64 bg-gray-300"></div>
                  <div className="p-4 sm:p-6">
                    <div className="h-5 sm:h-6 bg-gray-300 rounded mb-2 sm:mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 sm:w-4/5"></div>
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
            <p className="text-red-500 text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
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
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg bg-gradient-to-r from-amber-800 to-purple-800 bg-clip-text text-transparent px-2">
            Browse By Category
          </p>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
            Find Inspiration For Your Next Trip
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
          <div className="mt-3 sm:mt-4 md:mt-6 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {destinationsCategories.map((category) => {
            return (
              <div
                key={category.categoryId}
                onClick={() =>
                  handleCategoryClick(
                    category.categoryId,
                    category.categoryName
                  )
                }
                className="group bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                {/* Category Image */}
                <div className="relative h-40 xs:h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={category.categoryName}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 sm:from-black/50 via-transparent to-transparent"></div>
                </div>

                {/* Category Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-1">
                    {category.categoryName}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {category.categoryDescription}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-amber-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            );
          })}
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

export default DestinationsCategories;