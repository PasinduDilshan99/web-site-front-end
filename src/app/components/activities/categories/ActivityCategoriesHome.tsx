"use client";
import { GET_ACTIVE_ACTIVITIES_CATEGORIES_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import AnimatedButton from "../../common/AnimatedButton";
import SectionHeader from "../../common/SectionHeader";

// Updated interfaces based on new API response
interface CategoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  imageStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
}

interface ActiveActivitiesCategoriesType {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
  images: CategoryImage[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: ActiveActivitiesCategoriesType[];
  timestamp: string;
}

const ActivityCategoriesHome = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeActivitiesCategories, setActiveActivitiesCategories] = useState<
    ActiveActivitiesCategoriesType[]
  >([]);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(3);

  // Update display count based on screen size
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: 3 categories
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

  // Color mapping for categories
  const categoryColors: {
    [key: string]: { color: string; hoverColor: string };
  } = {
    Adventure: { color: "#EF4444", hoverColor: "#DC2626" }, // Red
    "Water Sports": { color: "#3B82F6", hoverColor: "#2563EB" }, // Blue
    Wildlife: { color: "#10B981", hoverColor: "#059669" }, // Green
    "Marine Life": { color: "#06B6D4", hoverColor: "#0891B2" }, // Cyan
    Sightseeing: { color: "#8B5CF6", hoverColor: "#7C3AED" }, // Purple
    Hiking: { color: "#F59E0B", hoverColor: "#D97706" }, // Amber
    Cultural: { color: "#F97316", hoverColor: "#EA580C" }, // Orange
    Wellness: { color: "#EC4899", hoverColor: "#DB2777" }, // Pink
    Photography: { color: "#6366F1", hoverColor: "#4F46E5" }, // Indigo
    "Food & Dining": { color: "#84CC16", hoverColor: "#65A30D" }, // Lime
  };

  // Default colors for unknown categories
  const defaultColors = { color: "#6B7280", hoverColor: "#4B5563" };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ACTIVE_ACTIVITIES_CATEGORIES_FE);
        const data: ApiResponse = await response.json();

        if (response.ok && data.code === 200) {
          const items: ActiveActivitiesCategoriesType[] = data.data || [];
          // Filter only active categories
          const activeCategories = items.filter(
            (category) => category.categoryStatus === "ACTIVE"
          );
          setActiveActivitiesCategories(activeCategories);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch activity categories");
        }
      } catch (err) {
        console.error("Error fetching activity categories:", err);
        setError("Something went wrong while fetching activity categories");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Get filtered categories based on display count
  const displayedCategories = activeActivitiesCategories.slice(0, displayCount);

  const hexToRgba = (hex: string, opacity: number) => {
    // Handle cases where hex might be undefined
    if (!hex) return `rgba(107, 114, 128, ${opacity})`;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Get colors for a category
  const getCategoryColors = (categoryName: string) => {
    return categoryColors[categoryName] || defaultColors;
  };

  // Get primary image for category
  const getPrimaryImage = (category: ActiveActivitiesCategoriesType) => {
    if (category.images && category.images.length > 0) {
      return category.images[0].imageUrl;
    }
    // Fallback placeholder image based on category
    const placeholderImages: { [key: string]: string } = {
      Adventure: "/api/placeholder/400/300?text=Adventure",
      "Water Sports": "/api/placeholder/400/300?text=Water+Sports",
      Wildlife: "/api/placeholder/400/300?text=Wildlife",
      "Marine Life": "/api/placeholder/400/300?text=Marine+Life",
      Sightseeing: "/api/placeholder/400/300?text=Sightseeing",
      Hiking: "/api/placeholder/400/300?text=Hiking",
      Cultural: "/api/placeholder/400/300?text=Cultural",
      Wellness: "/api/placeholder/400/300?text=Wellness",
      Photography: "/api/placeholder/400/300?text=Photography",
      "Food & Dining": "/api/placeholder/400/300?text=Food+Dining",
    };
    return (
      placeholderImages[category.categoryName] ||
      "/api/placeholder/400/300?text=Activity"
    );
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="h-8 sm:h-10 lg:h-12 bg-gray-300 rounded-full w-48 sm:w-64 lg:w-80 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-4 sm:h-5 bg-gray-300 rounded w-56 sm:w-72 lg:w-96 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 sm:h-5 bg-gray-300 rounded w-40 sm:w-56 lg:w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(displayCount)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-300"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
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
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Unable to Load Categories
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Popular Activities"
            title="Discover Actual Adventure"
            description="Explore our diverse range of activity categories and find your perfect adventure"
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedCategories.map((category) => {
            const colors = getCategoryColors(category.categoryName);
            const primaryImage = getPrimaryImage(category);
            const imageCount = category.images?.length || 0;

            return (
              <div
                key={category.categoryId}
                className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 lg:hover:-translate-y-3 cursor-pointer"
                onMouseEnter={() => setHoveredCategory(category.categoryId)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Category Image Container */}
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                  <img
                    src={primaryImage}
                    alt={category.categoryName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/api/placeholder/400/300?text=Activity";
                    }}
                  />

                  {/* Default Transparent Overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      backgroundColor: hexToRgba(colors.color, 0.15),
                    }}
                  />

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      hoveredCategory === category.categoryId
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    style={{
                      backgroundColor: hexToRgba(colors.hoverColor, 0.25),
                    }}
                  />

                  {/* Image Count Badge */}
                  {imageCount > 1 && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                      {imageCount} images
                    </div>
                  )}

                  {/* Category Name Overlay - Always visible, styled like the image */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                    <div
                      className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: `2px solid ${hexToRgba(colors.color, 0.2)}`,
                      }}
                    >
                      <h3
                        className="text-base sm:text-lg lg:text-xl font-bold text-center"
                        style={{ color: colors.color }}
                      >
                        {category.categoryName}
                      </h3>
                    </div>
                  </div>

                  {/* Hover Content */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-center items-center p-3 sm:p-4 lg:p-6 text-center transition-all duration-300 ${
                      hoveredCategory === category.categoryId
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 transform transition-transform duration-300 hover:scale-105 max-w-[90%]">
                      <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                        {category.categoryDescription}
                      </p>

                      {/* Images Count */}
                      {imageCount > 0 && (
                        <div className="flex justify-center mb-2 sm:mb-3">
                          <span className="text-xs text-gray-500">
                            {imageCount} image{imageCount !== 1 ? "s" : ""}{" "}
                            available
                          </span>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <span
                          className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: hexToRgba(colors.color, 0.15),
                            color: colors.color,
                            border: `1px solid ${hexToRgba(colors.color, 0.3)}`,
                          }}
                        >
                          {category.categoryStatus}
                        </span>
                      </div>

                      {/* Explore Button */}
                      <button
                        className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                        style={{
                          backgroundColor: colors.color,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            colors.hoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = colors.color;
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {activeActivitiesCategories.length > displayCount && (
          <div className="text-center mt-6 sm:mt-8 lg:mt-12 xl:mt-16">
            <button
              onClick={() => setDisplayCount(activeActivitiesCategories.length)}
              className="px-6 sm:px-8 lg:px-10 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg"
            >
              Show All {activeActivitiesCategories.length} Categories
            </button>
          </div>
        )}

        {/* View All Button when all are displayed */}
        {displayedCategories.length === activeActivitiesCategories.length &&
          activeActivitiesCategories.length > 0 && (
            <div className="text-center mt-6 sm:mt-8 lg:mt-12 xl:mt-16">
              <button className="px-6 sm:px-8 lg:px-10 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg">
                View All Categories
              </button>
            </div>
          )}

        {/* Popular Activity Types Section */}
        {activeActivitiesCategories.length > 0 && (
          <div className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10">
              Popular Activity Types
            </h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
              {activeActivitiesCategories.slice(0, 4).map((category, index) => {
                const colors = getCategoryColors(category.categoryName);
                return (
                  <div
                    key={category.categoryId}
                    className="flex items-center space-x-2 sm:space-x-3 bg-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  >
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: colors.color,
                      }}
                    ></div>
                    <span
                      className="font-medium text-gray-700 text-sm sm:text-base lg:text-lg transition-colors duration-300 group-hover:text-gray-900"
                      style={{
                        color:
                          hoveredCategory === category.categoryId
                            ? colors.color
                            : undefined,
                      }}
                    >
                      {category.categoryName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {activeActivitiesCategories.length === 0 && (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 max-w-md mx-auto shadow-lg">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                No Categories Available
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Check back later for activity categories.
              </p>
            </div>
          </div>
        )}

        {/* Display Count Info */}
        {activeActivitiesCategories.length > 0 && (
          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
            <AnimatedButton onClick={() => console.log("View all clicked")}>
              View All Activities
            </AnimatedButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCategoriesHome;
