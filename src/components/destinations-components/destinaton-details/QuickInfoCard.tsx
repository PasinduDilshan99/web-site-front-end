import { DestinationData } from "@/types/destination-types";
import { DESTINATIONS_CATEGORY_PATH } from "@/utils/urls";
import { useRouter } from "next/navigation";
import React from "react";

interface QuickInfoCardProps {
  destination: DestinationData;
}

const QuickInfoCard: React.FC<QuickInfoCardProps> = ({ destination }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    const encodedCategory = encodeURIComponent(categoryName);
    router.push(`${DESTINATIONS_CATEGORY_PATH}${encodedCategory}`);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        Quick Facts
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Categories Section */}
        {/* <div className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm text-gray-600">Categories</span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {destination.destinationCategoryDetailsDtos.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="relative inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 cursor-pointer transition-all duration-200 group"
              >
                <span className="font-semibold text-amber-600 group-hover:text-amber-700 text-xs sm:text-sm pr-1 truncate max-w-[80px] xs:max-w-[120px]">
                  {category.name}
                </span>
                {category.isPrimary && (
                  <span className="absolute -top-1.5 -right-1.5 text-amber-400 group-hover:text-amber-500 transition-colors text-[10px] sm:text-xs">
                    ★
                  </span>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* Location */}
        <div className="flex justify-between items-center text-xs sm:text-sm py-1.5 sm:py-2 border-t border-gray-100">
          <span className="text-gray-600">Location</span>
          <span className="font-semibold text-purple-600 truncate ml-2">
            {destination.location}
          </span>
        </div>

        {/* Activities Count */}
        <div className="flex justify-between items-center text-xs sm:text-sm py-1.5 sm:py-2 border-t border-gray-100">
          <span className="text-gray-600">Activities</span>
          <span className="font-semibold text-gray-900">
            {destination.activities.length}
          </span>
        </div>

        {/* Uncomment if needed */}
        {/* <div className="flex justify-between items-center text-xs sm:text-sm py-1.5 sm:py-2 border-t border-gray-100">
          <span className="text-gray-600">Status</span>
          <span
            className={`font-semibold ${
              destination.statusName === "ACTIVE"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {destination.statusName}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default QuickInfoCard;