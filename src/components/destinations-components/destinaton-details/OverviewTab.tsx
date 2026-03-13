import { DestinationData } from "@/types/destination-types";
import React from "react";
import { useRouter } from "next/navigation";
import { DESTINATIONS_CATEGORY_PATH } from "@/utils/urls";

interface OverviewTabProps {
  destination: DestinationData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ destination }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    const encodedCategory = encodeURIComponent(categoryName);
    router.push(`${DESTINATIONS_CATEGORY_PATH}${encodedCategory}`);
  };

  return (
    <div>
      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-sky-900 mb-2 sm:mb-3 lg:mb-4">
        About {destination.destinationName}
      </h3>
      <p className="text-gray-700 leading-relaxed mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base lg:text-lg">
        {destination.destinationDescription}
      </p>

      {/* Categories Section */}
      <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 rounded-xl p-4 sm:p-5 lg:p-6">
        <h4 className="font-semibold text-sky-800 mb-3 sm:mb-4 text-sm sm:text-md lg:text-lg flex items-center gap-2">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Categories</span>
        </h4>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {destination.destinationCategoryDetailsDtos.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={`
                inline-flex items-center gap-1 sm:gap-1.5 
                px-2 sm:px-3 py-1 sm:py-1.5 rounded-full 
                text-xs sm:text-sm font-medium
                cursor-pointer transition-all duration-200 hover:shadow-md
                ${
                  category.isPrimary
                    ? "bg-sky-600 text-white hover:bg-sky-700"
                    : "bg-white text-sky-600 hover:bg-sky-50 border border-sky-200"
                }
              `}
            >
              <span className="truncate max-w-[100px] sm:max-w-[150px] lg:max-w-[200px]">
                {category.name}
              </span>
              {category.isPrimary && (
                <span className="text-[10px] sm:text-xs bg-sky-500 px-1 sm:px-1.5 py-0.5 rounded-full ml-0.5 sm:ml-1 flex-shrink-0">
                  ★
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;