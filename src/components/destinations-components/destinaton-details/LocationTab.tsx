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
      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Location Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Coordinates</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Latitude:</span>
              <span className="font-mono text-gray-900">
                {coordinates.lat.toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Longitude:</span>
              <span className="font-mono text-gray-900">
                {coordinates.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Region</h4>
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <p className="text-cyan-800 font-medium">{destination.location}</p>
            <p className="text-cyan-600 text-sm mt-1">Sri Lanka</p>
          </div>
        </div>
      </div>

      {/* OpenStreetMap Integration using iframe */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-3">Location on Map</h4>
        <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
          <div className="h-[400px] w-full relative">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={osmIframeUrl}
              title={`OpenStreetMap - ${destination.destinationName}`}
              className="border-0"
              loading="lazy"
            />
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Powered by OpenStreetMap</span>
            </div>
            <a
              href={osmFullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center font-medium"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              Open in New Tab
            </a>
          </div>
        </div>
        
        {/* Map controls/info */}
        {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="font-medium text-blue-800">Interactive</span>
            </div>
            <p className="text-blue-700 text-xs mt-1">Zoom and pan to explore</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-green-800">Free & Open</span>
            </div>
            <p className="text-green-700 text-xs mt-1">OpenStreetMap data</p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium text-purple-800">Precise</span>
            </div>
            <p className="text-purple-700 text-xs mt-1">Exact coordinates shown</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LocationTab;