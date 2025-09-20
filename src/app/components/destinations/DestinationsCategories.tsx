"use client";

import { GET_ALL_DESTINATIONS_CATEGORIES } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define the interface for a single destination category
interface DestinationCategoryType {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImageUrl: string;
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
  const [destinationsCategories, setDestinationsCategories] = useState<DestinationCategoryType[]>([]);


  useEffect(() => {
    const fetchDestinationsCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_DESTINATIONS_CATEGORIES);
        const data = await response.json();

        if (response.ok) {
          const items: DestinationCategoryType[] = data.data || [];
          // Filter only active categories
          const activeCategories = items.filter(item => item.categoryStatus === "ACTIVE");
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
    window.location.href = `/destinations?category=${categoryId}&name=${encodeURIComponent(categoryName)}`;
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
              <div className="h-10 bg-gray-300 rounded w-96 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
          </div>
          
          {/* Loading Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-32 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (destinationsCategories.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-500 text-lg">No destination categories available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-sm sm:text-base italic mb-2 sm:mb-3">
            Browse By Category
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Find Inspiration For Your Next Trip
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {destinationsCategories.map((category) => {
            return (
              <div
                key={category.categoryId}
                onClick={() => handleCategoryClick(category.categoryId, category.categoryName)}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                {/* Category Image */}
                <div className="relative h-32 sm:h-36 lg:h-40 overflow-hidden">
                  <Image
                    src={category.categoryImageUrl}
                    alt={category.categoryName}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Category Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {category.categoryName}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {category.categoryDescription}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base lg:text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Explore All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsCategories;