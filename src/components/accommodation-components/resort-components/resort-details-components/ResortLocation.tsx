// components/resort/ResortLocation.tsx
"use client";

import React, { useMemo, useCallback } from "react";
import {
  MapPin,
  Navigation,
  Car,
  Train,
  Plane,
  Clock,
  Waves,
  Palmtree,
} from "lucide-react";
import { NearbyDestination, ServiceProviderDetails } from "@/types/accommodations-types/service-provider-types";

interface ResortLocationProps {
  resort: ServiceProviderDetails;
  nearbyDestinations: NearbyDestination[];
}

const ResortLocation: React.FC<ResortLocationProps> = ({
  resort,
  nearbyDestinations,
}) => {
  // HARDCODED: Resort coordinates (Coastal area, Sri Lanka)
  const resortCoords = useMemo(() => ({
    latitude: 6.0535,
    longitude: 80.2210,
  }), []);

  // Ensure we have valid coordinates
  const isValidCoordinate = (coord: number) => {
    return coord !== null && coord !== undefined && !isNaN(coord);
  };

  const coordinates = {
    lat: isValidCoordinate(resortCoords.latitude) ? resortCoords.latitude : 6.0535,
    lng: isValidCoordinate(resortCoords.longitude) ? resortCoords.longitude : 80.2210,
  };

  // Generate OpenStreetMap iframe URL
  const osmIframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.02},${coordinates.lat - 0.02},${coordinates.lng + 0.02},${coordinates.lat + 0.02}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`;
  
  const osmFullUrl = `https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}#map=13/${coordinates.lat}/${coordinates.lng}`;

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = useCallback((
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): string => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance < 1
      ? `${Math.round(distance * 1000)}m`
      : `${distance.toFixed(1)}km`;
  }, []);

  const calculateDriveTime = useCallback((distanceStr: string): string => {
    const distance = parseFloat(distanceStr);
    if (distance <= 2) return "5-10 min";
    if (distance <= 5) return "10-15 min";
    if (distance <= 10) return "15-25 min";
    if (distance <= 20) return "25-40 min";
    return "40+ min";
  }, []);

  const calculateTransportationInfo = useCallback(() => {
    const transportation = [];

    const airportCoords = { lat: 6.1249, lon: 81.1221 };
    const airportDistance = calculateDistance(
      resortCoords.latitude,
      resortCoords.longitude,
      airportCoords.lat,
      airportCoords.lon
    );
    transportation.push({
      type: "Mattala Airport",
      distance: airportDistance,
      time: calculateDriveTime(airportDistance),
      icon: Plane,
    });

    const trainCoords = { lat: 6.0833, lon: 80.2667 };
    const trainDistance = calculateDistance(
      resortCoords.latitude,
      resortCoords.longitude,
      trainCoords.lat,
      trainCoords.lon
    );
    transportation.push({
      type: "Galle Station",
      distance: trainDistance,
      time: calculateDriveTime(trainDistance),
      icon: Train,
    });

    const cityCoords = { lat: 6.0535, lon: 80.2210 };
    const cityDistance = calculateDistance(
      resortCoords.latitude,
      resortCoords.longitude,
      cityCoords.lat,
      cityCoords.lon
    );
    transportation.push({
      type: "Unawatuna Beach",
      distance: cityDistance,
      time: calculateDriveTime(cityDistance),
      icon: Car,
    });

    return transportation;
  }, [resortCoords.latitude, resortCoords.longitude, calculateDistance, calculateDriveTime]);

  const transportation = calculateTransportationInfo();

  const getDirectionsUrl = useCallback(() => {
    return `https://www.openstreetmap.org/directions?engine=osrm_car&route=${resortCoords.latitude},${resortCoords.longitude}`;
  }, [resortCoords.latitude, resortCoords.longitude]);

  const getDestinationDistance = useCallback((destination: NearbyDestination) => {
    return calculateDistance(
      resortCoords.latitude,
      resortCoords.longitude,
      destination.latitude,
      destination.longitude
    );
  }, [resortCoords.latitude, resortCoords.longitude, calculateDistance]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border" style={{ borderColor: '#0A2F4420' }}>
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent" 
          style={{ 
            backgroundImage: 'linear-gradient(135deg, #0A2F44 0%, #144A5E 50%, #1F5F72 100%)'
          }}>
        Resort Location
      </h2>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#0A2F4420' }}>
            <MapPin className="w-6 h-6" style={{ color: '#0A2F44' }} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 text-lg">Address</h3>
            <p className="text-gray-600 leading-relaxed">{resort.address}</p>
            <p className="text-sm text-gray-500 mt-1">
              Coastal Coordinates: {coordinates.lat.toFixed(4)},{" "}
              {coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>

        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          style={{ 
            background: 'linear-gradient(135deg, #0A2F44 0%, #144A5E 50%, #1F5F72 100%)',
          }}
        >
          <Navigation className="w-5 h-5" />
          Get Directions to Resort
        </a>
      </div>

      {/* Coordinates Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 text-lg">Coordinates</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg p-3" style={{ backgroundColor: '#0A2F4410' }}>
            <div className="text-sm text-gray-600">Latitude</div>
            <div className="font-mono text-gray-900 font-medium">
              {coordinates.lat.toFixed(6)}
            </div>
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: '#0A2F4410' }}>
            <div className="text-sm text-gray-600">Longitude</div>
            <div className="font-mono text-gray-900 font-medium">
              {coordinates.lng.toFixed(6)}
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg">Getting Here</h3>
        <div className="space-y-3">
          {transportation.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-shadow"
              style={{ 
                background: 'linear-gradient(135deg, #0A2F4408 0%, #144A5E08 50%, #1F5F7208 100%)',
                borderColor: '#0A2F4440'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <item.icon className="w-5 h-5" style={{ color: '#144A5E' }} />
                </div>
                <span className="font-semibold text-gray-800">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">{item.distance}</div>
                <div className="text-xs font-medium" style={{ color: '#144A5E' }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Destinations Section */}
      {nearbyDestinations.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            Nearby Attractions
          </h3>
          <div className="space-y-3">
            {nearbyDestinations.slice(0, 4).map((destination) => (
              <div
                key={destination.destinationId}
                className="p-4 rounded-xl border hover:shadow-lg transition-all duration-300 cursor-pointer group"
                style={{ 
                  background: 'linear-gradient(135deg, #0A2F4408 0%, #144A5E08 50%, #1F5F7208 100%)',
                  borderColor: '#0A2F4440'
                }}
                onClick={() =>
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=15/${destination.latitude}/${destination.longitude}`,
                    "_blank"
                  )
                }
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold group-hover:underline" style={{ color: '#0A2F44' }}>
                    {destination.name}
                  </h4>
                  <span className="px-3 py-1 rounded-full text-sm font-medium shadow-sm" style={{ 
                    backgroundColor: '#0A2F4420',
                    color: '#0A2F44'
                  }}>
                    {destination.destinationCategory}
                  </span>
                </div>

                <p className="text-sm mb-3 line-clamp-2" style={{ color: '#144A5E' }}>
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-sm" style={{ color: '#1F5F72' }}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{destination.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{getDestinationDistance(destination)} away</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {nearbyDestinations.length > 4 && (
            <button className="w-full mt-4 text-center font-semibold text-sm py-3 rounded-xl border hover:shadow-md transition-all" 
                    style={{ 
                      color: '#0A2F44',
                      backgroundColor: '#0A2F4410',
                      borderColor: '#0A2F4440'
                    }}>
              View All {nearbyDestinations.length} Nearby Attractions
            </button>
          )}
        </div>
      )}

      {/* OpenStreetMap Integration using iframe */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg">Resort Location Map</h3>
        <div className="rounded-xl overflow-hidden border shadow-md" style={{ borderColor: '#0A2F4440' }}>
          <div className="h-[400px] w-full relative bg-gray-100">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={osmIframeUrl}
              title={`OpenStreetMap - ${resort.name}`}
              className="border-0"
              loading="lazy"
            />
          </div>
          <div className="px-4 py-3 border-t flex justify-between items-center" style={{ 
            backgroundColor: '#0A2F4410',
            borderColor: '#0A2F4440'
          }}>
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2"
                style={{ color: '#0A2F44' }}
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
              className="text-sm flex items-center font-medium"
              style={{ color: '#0A2F44' }}
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
      </div>

      {/* Location Highlights */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="text-center p-4 text-white rounded-xl shadow-lg" style={{ 
          background: 'linear-gradient(135deg, #0A2F44 0%, #144A5E 100%)'
        }}>
          <Waves className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-semibold">Beachfront</div>
          <div className="text-xs opacity-90">Direct Beach Access</div>
        </div>
        <div className="text-center p-4 text-white rounded-xl shadow-lg" style={{ 
          background: 'linear-gradient(135deg, #144A5E 0%, #1F5F72 100%)'
        }}>
          <Palmtree className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-semibold">
            {nearbyDestinations.length} Attractions
          </div>
          <div className="text-xs opacity-90">Nearby</div>
        </div>
      </div>

      {/* Additional Location Info */}
      {(resort.parkingFacility || resort.wifiAvailable || resort.petFriendly) && (
        <div className="p-4 rounded-xl border" style={{ 
          background: 'linear-gradient(135deg, #0A2F4408 0%, #144A5E08 50%, #1F5F7208 100%)',
          borderColor: '#0A2F4440'
        }}>
          <h4 className="font-semibold text-gray-800 mb-3 text-lg">
            Resort Location Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {resort.parkingFacility && (
              <span className="px-3 py-2 rounded-full text-sm font-medium shadow-sm" style={{ 
                backgroundColor: '#0A2F4420',
                color: '#0A2F44',
                borderColor: '#0A2F4440'
              }}>
                🅿️ Secure Parking
              </span>
            )}
            {resort.wifiAvailable && (
              <span className="px-3 py-2 rounded-full text-sm font-medium shadow-sm" style={{ 
                backgroundColor: '#144A5E20',
                color: '#144A5E',
                borderColor: '#144A5E40'
              }}>
                📶 Free WiFi
              </span>
            )}
            {resort.petFriendly && (
              <span className="px-3 py-2 rounded-full text-sm font-medium shadow-sm" style={{ 
                backgroundColor: '#1F5F7220',
                color: '#1F5F72',
                borderColor: '#1F5F7240'
              }}>
                🐾 Pet Friendly
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResortLocation;