import { DestinationData } from "@/types/destination-types";
import React from "react";

interface OverviewTabProps {
  destination: DestinationData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ destination }) => {
  return (
    <div>
      <h3 className="text-lg lg:text-xl font-bold text-sky-900 mb-4">
        About {destination.destinationName}
      </h3>
      <p className="text-gray-700 leading-relaxed mb-6 text-md lg:text-lg">
        {destination.destinationDescription}
      </p>
      <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 rounded-xl p-5 lg:p-6">
        <h4 className="font-semibold text-sky-800 mb-3 text-md lg:text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Category Description
        </h4>
        <p className="text-sky-700 leading-relaxed">{destination.categoryDescription}</p>
      </div>
    </div>
  );
};

export default OverviewTab;