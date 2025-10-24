import { DestinationData } from "@/types/destination-details-types";
import React from "react";

interface QuickInfoCardProps {
  destination: DestinationData;
}

const QuickInfoCard: React.FC<QuickInfoCardProps> = ({ destination }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Category</span>
          <span className="font-semibold text-amber-600">
            {destination.categoryName}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Location</span>
          <span className="font-semibold text-purple-600">
            {destination.location}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Activities</span>
          <span className="font-semibold text-gray-900">
            {destination.activities.length}
          </span>
        </div>
        <div className="flex justify-between items-center">
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
        </div>
      </div>
    </div>
  );
};

export default QuickInfoCard;
