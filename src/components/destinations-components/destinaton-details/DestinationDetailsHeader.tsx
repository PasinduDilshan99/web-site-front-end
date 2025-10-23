import { DestinationData } from "@/types/destination-details-types";
import React from "react";

interface DestinationDetailsHeaderProps {
  destination: DestinationData;
}

const DestinationDetailsHeader: React.FC<DestinationDetailsHeaderProps> = ({
  destination,
}) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {destination.destinationName}
            </h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center text-purple-600">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">{destination.location}</span>
              </div>
              <div className="flex items-center text-amber-600">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="font-medium">{destination.categoryName}</span>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
            {destination.statusName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsHeader;
