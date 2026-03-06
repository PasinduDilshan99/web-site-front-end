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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">
        Quick Facts
      </h3>
      <div className="space-y-4">
        {/* Categories Section */}
        <div className="flex flex-col gap-2 text-sm lg:text-md">
          <span className="text-gray-600">Categories</span>
          <div className="flex flex-wrap gap-2">
            {destination.destinationCategoryDetailsDtos.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="relative inline-flex items-center px-2 py-1 rounded-lg border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 cursor-pointer transition-all duration-200 group"
              >
                <span className="font-semibold text-amber-600 group-hover:text-amber-700 pr-1">
                  {category.name}
                </span>
                {category.isPrimary && (
                  <span className="absolute -top-2 -right-2 text-amber-400 group-hover:text-amber-500 transition-colors text-xs">
                    ★
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex justify-between items-center text-sm lg:text-md py-2 border-t border-gray-100">
          <span className="text-gray-600">Location</span>
          <span className="font-semibold text-purple-600">
            {destination.location}
          </span>
        </div>

        {/* Activities Count */}
        <div className="flex justify-between items-center text-sm lg:text-md py-2 border-t border-gray-100">
          <span className="text-gray-600">Activities</span>
          <span className="font-semibold text-gray-900">
            {destination.activities.length}
          </span>
        </div>

        {/* Status */}
        {/* <div className="flex justify-between items-center text-sm lg:text-md py-2 border-t border-gray-100">
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
