import { DestinationData } from "@/types/destination-details-types";
import React from "react";

interface OverviewTabProps {
  destination: DestinationData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ destination }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        About {destination.destinationName}
      </h3>
      <p className="text-gray-700 leading-relaxed mb-6">
        {destination.destinationDescription}
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-semibold text-amber-800 mb-2">
          Category Description
        </h4>
        <p className="text-amber-700">{destination.categoryDescription}</p>
      </div>
    </div>
  );
};

export default OverviewTab;
