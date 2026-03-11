import { DestinationData } from "@/types/destination-types";
import React from "react";

interface LocationTabProps {
  destination: DestinationData;
}

const LocationTab: React.FC<LocationTabProps> = ({ destination }) => {
  // Ensure we have valid coordinates
  const isValidCoordinate = (coord: number) => {
    return coord !== null && coord !== undefined && !isNaN(coord);
  };

  const coordinates = {
    lat: isValidCoordinate(destination.latitude) ? destination.latitude : 7.8731,
    lng: isValidCoordinate(destination.longitude) ? destination.longitude : 80.7718,
  };

  // Generate OpenStreetMap iframe URL
  const osmIframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.02},${coordinates.lat - 0.02},${coordinates.lng + 0.02},${coordinates.lat + 0.02}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`;
  
  const osmFullUrl = `https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}#map=13/${coordinates.lat}/${coordinates.lng}`;

  return (
    <div>
      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        Location Details
      </h3>
      
      {/* Info cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        {/* Coordinates Card */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
            Coordinates
          </h4>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600">Latitude:</span>
              <span className="font-mono text-gray-900 font-medium">
                {coordinates.lat.toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600">Longitude:</span>
              <span className="font-mono text-gray-900 font-medium">
                {coordinates.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>

        {/* Region Card */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 sm:p-4">
          <h4 className="font-semibold text-cyan-900 mb-2 text-sm sm:text-base">
            Region
          </h4>
          <p className="text-cyan-800 font-medium text-sm sm:text-base">
            {destination.location}
          </p>
          <p className="text-cyan-600 text-xs sm:text-sm mt-1">
            Sri Lanka
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
          Location on Map
        </h4>
        
        <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
          {/* Map Container - Responsive height */}
          <div className="h-[250px] xs:h-[300px] sm:h-[350px] lg:h-[400px] w-full relative">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={osmIframeUrl}
              title={`OpenStreetMap - ${destination.destinationName}`}
              className="border-0 absolute inset-0"
              loading="lazy"
            />
          </div>
          
          {/* Map Footer - Responsive layout */}
          <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">Powered by OpenStreetMap</span>
            </div>
            
            <a
              href={osmFullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm flex items-center font-medium"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Open in New Tab</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTab;