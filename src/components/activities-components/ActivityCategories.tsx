"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ActivityData } from "@/types/activity-types";
import { ACTIVITIES_CATEGORY_TYPE_PATH } from "@/utils/urls";

interface ActivityCategoriesProps {
  activity: ActivityData;
  onCategoryClick?: (categoryId: number, categoryName: string) => void;
}

const ActivityCategories: React.FC<ActivityCategoriesProps> = ({
  activity,
  onCategoryClick,
}) => {
  const router = useRouter();
  const categories = activity.activities_category || [];

  if (!categories || categories.length === 0) {
    return null;
  }

  // Generate a consistent color based on category ID
  const getCategoryColor = (id: number) => {
    const colors = [
      {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
        hover: "hover:bg-blue-200",
      },
      {
        bg: "bg-emerald-100",
        text: "text-emerald-800",
        border: "border-emerald-200",
        hover: "hover:bg-emerald-200",
      },
      {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-200",
        hover: "hover:bg-purple-200",
      },
      {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200",
        hover: "hover:bg-amber-200",
      },
      {
        bg: "bg-rose-100",
        text: "text-rose-800",
        border: "border-rose-200",
        hover: "hover:bg-rose-200",
      },
      {
        bg: "bg-cyan-100",
        text: "text-cyan-800",
        border: "border-cyan-200",
        hover: "hover:bg-cyan-200",
      },
      {
        bg: "bg-indigo-100",
        text: "text-indigo-800",
        border: "border-indigo-200",
        hover: "hover:bg-indigo-200",
      },
      {
        bg: "bg-teal-100",
        text: "text-teal-800",
        border: "border-teal-200",
        hover: "hover:bg-teal-200",
      },
    ];
    return colors[id % colors.length];
  };

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    // Encode the category name for URL
    const encodedCategoryName = encodeURIComponent(categoryName);

    // Navigate to activities page with category filter
    router.push(`${ACTIVITIES_CATEGORY_TYPE_PATH}${encodedCategoryName}`);

    // Call the original onCategoryClick if provided
    if (onCategoryClick) {
      onCategoryClick(categoryId, categoryName);
    }
  };

  // Sort categories to show primary ones first
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return 0;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2"></span>
        Categories
      </h2>

      <div className="flex flex-wrap gap-2">
        {sortedCategories.map((category) => {
          const colors = getCategoryColor(category.id);
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className={`group relative px-4 py-2 rounded-full border transition-all duration-300 hover:shadow-md ${colors.bg} ${colors.text} ${colors.border} ${colors.hover} cursor-pointer`}
              title={`View all ${category.name} activities`}
            >
              <span className="text-sm font-medium">{category.name}</span>

              {/* Primary Badge */}
              {category.is_primary && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 border-2 border-white items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </span>
              )}

              {/* Tooltip with description on hover (if description exists) */}
              {category.description && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                  {category.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Show count of categories with primary indicator */}
      <div className="mt-4 text-xs text-gray-500 flex items-center justify-between">
        <span>
          {categories.length} categor{categories.length === 1 ? "y" : "ies"}
        </span>
        {categories.filter((c) => c.is_primary).length > 0 && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            <span>{categories.filter((c) => c.is_primary).length} primary</span>
          </span>
        )}
      </div>

      {/* Hint for category navigation */}
      <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Click on a category to explore related activities</span>
      </div>
    </div>
  );
};

export default ActivityCategories;
