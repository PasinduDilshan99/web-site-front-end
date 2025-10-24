import { DestinationData } from "@/types/destination-details-types";
import React from "react";

interface LocationTabProps {
  destination: DestinationData;
}

const LocationTab: React.FC<LocationTabProps> = ({ destination }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Location Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Coordinates</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Latitude:</span>
              <span className="font-mono text-gray-900">
                {destination.latitude}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Longitude:</span>
              <span className="font-mono text-gray-900">
                {destination.longitude}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Region</h4>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 font-medium">{destination.location}</p>
            <p className="text-amber-600 text-sm mt-1">Sri Lanka</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-6 bg-gradient-to-br from-amber-100 to-purple-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-amber-300">
        <div className="text-center">
          <svg
            className="w-12 h-12 text-amber-500 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <p className="text-amber-700 font-medium">Interactive Map</p>
          <p className="text-amber-600 text-sm">
            Map integration would go here
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationTab;
