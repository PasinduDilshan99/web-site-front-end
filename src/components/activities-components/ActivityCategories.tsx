"use client";
import React from "react";
import { ActivityData } from "@/types/activity-types";

interface ActivityCategoriesProps {
  activity: ActivityData;
  onCategoryClick?: (categoryId: number, categoryName: string) => void;
}

const ActivityCategories: React.FC<ActivityCategoriesProps> = ({
  activity,
  onCategoryClick,
}) => {
  const categories = activity.activities_category || [];

  if (!categories || categories.length === 0) {
    return null;
  }

  // Generate a consistent color based on category ID
  const getCategoryColor = (id: number) => {
    const colors = [
      { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", hover: "hover:bg-blue-200" },
      { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200", hover: "hover:bg-emerald-200" },
      { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200", hover: "hover:bg-purple-200" },
      { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200", hover: "hover:bg-amber-200" },
      { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200", hover: "hover:bg-rose-200" },
      { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200", hover: "hover:bg-cyan-200" },
      { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200", hover: "hover:bg-indigo-200" },
      { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-200", hover: "hover:bg-teal-200" },
    ];
    return colors[id % colors.length];
  };

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId, categoryName);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full mr-2"></span>
        Categories
      </h2>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const colors = getCategoryColor(category.id);
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className={`group relative px-4 py-2 rounded-full border transition-all duration-300 hover:shadow-md ${colors.bg} ${colors.text} ${colors.border} ${colors.hover}`}
            >
              <span className="text-sm font-medium">
                {category.name}
              </span>
              
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

      {/* Show count of categories */}
      <div className="mt-4 text-xs text-gray-500">
        {categories.length} categor{ categories.length === 1 ? 'y' : 'ies' }
      </div>
    </div>
  );
};

export default ActivityCategories;