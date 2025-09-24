"use client";
import { GET_ACTIVE_ACTIVITIES_CATEGORIES_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface ActiveActivitiesCategoriesType {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  hoverColor: string;
  statusName: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
}

const ActivityCategoriesHome = () => {
  const [loading, setLoading] = useState(false); // Set to false for demo
  const [error, setError] = useState<string | null>(null);
  const [activeActivitiesCategories, setActiveActivitiesCategories] = useState<
    ActiveActivitiesCategoriesType[]
  >([]);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ACTIVE_ACTIVITIES_CATEGORIES_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveActivitiesCategoriesType[] = data.data || [];
          setActiveActivitiesCategories(items);
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
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-300 rounded-full w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-64 bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">Error</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-orange-400 font-medium mb-2 text-lg italic">
            Popular Activities
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover Actual Adventure
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeActivitiesCategories.map((category, index) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Category Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Default Transparent Overlay */}
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    backgroundColor: hexToRgba(category.color, 0.15),
                  }}
                />

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    hoveredCategory === category.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  style={{
                    backgroundColor: hexToRgba(category.hoverColor, 0.25),
                  }}
                />

                {/* Category Name Overlay - Always visible, styled like the image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className="inline-block px-4 py-2 rounded-lg backdrop-blur-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: `2px solid ${category.color}20`,
                    }}
                  >
                    <h3
                      className="text-xl font-bold text-center"
                      style={{ color: category.color }}
                    >
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Hover Content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-center items-center p-6 text-center transition-all duration-300 ${
                    hoveredCategory === category.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-transform duration-300 hover:scale-105">
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Status Badge */}
                    <div className="flex justify-center mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: hexToRgba(category.color, 0.15),
                          color: category.color,
                          border: `1px solid ${hexToRgba(category.color, 0.3)}`,
                        }}
                      >
                        {category.statusName}
                      </span>
                    </div>

                    {/* Explore Button */}
                    <button
                      className="px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                      style={{
                        backgroundColor: category.color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          category.hoverColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = category.color;
                      }}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Activity Types Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-10">
            Popular Activity Types
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {["Tent Camping", "Mountain Biking", "Fishing", "Kayaking"].map(
              (activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        activeActivitiesCategories[index]?.color || "#3B82F6",
                    }}
                  ></div>
                  <span className="font-medium text-gray-700 text-lg">
                    {activity}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Empty State */}
        {activeActivitiesCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Categories Available
              </h3>
              <p className="text-gray-600">
                Check back later for activity categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCategoriesHome;
