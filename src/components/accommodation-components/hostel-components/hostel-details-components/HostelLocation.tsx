// components/hostel/HostelLocation.tsx
"use client";

import React, { useMemo, useCallback } from "react";
import {
  MapPin,
  Navigation,
  Car,
  Train,
  Plane,
  Clock,
  Users,
  Coffee,
} from "lucide-react";
import {
  NearbyDestination,
  ServiceProviderDetails,
} from "@/types/accommodations-types/service-provider-types";

interface HostelLocationProps {
  hostel: ServiceProviderDetails | null;
  nearbyDestinations: NearbyDestination[];
}

const HostelLocation: React.FC<HostelLocationProps> = ({
  hostel,
  nearbyDestinations,
}) => {
  // HARDCODED: Hostel coordinates (Colombo, Sri Lanka)
  const hostelCoords = useMemo(() => ({
    latitude: 6.9271,
    longitude: 79.8612,
  }), []);

  // Ensure we have valid coordinates
  const isValidCoordinate = (coord: number) => {
    return coord !== null && coord !== undefined && !isNaN(coord);
  };

  const coordinates = {
    lat: isValidCoordinate(hostelCoords.latitude) ? hostelCoords.latitude : 6.9271,
    lng: isValidCoordinate(hostelCoords.longitude) ? hostelCoords.longitude : 79.8612,
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

    const airportCoords = { lat: 7.18, lon: 79.8843 };
    const airportDistance = calculateDistance(
      hostelCoords.latitude,
      hostelCoords.longitude,
      airportCoords.lat,
      airportCoords.lon
    );
    transportation.push({
      type: "Bandaranaike Airport",
      distance: airportDistance,
      time: calculateDriveTime(airportDistance),
      icon: Plane,
    });

    const trainCoords = { lat: 6.9344, lon: 79.8508 };
    const trainDistance = calculateDistance(
      hostelCoords.latitude,
      hostelCoords.longitude,
      trainCoords.lat,
      trainCoords.lon
    );
    transportation.push({
      type: "Colombo Fort Station",
      distance: trainDistance,
      time: calculateDriveTime(trainDistance),
      icon: Train,
    });

    const cityCoords = { lat: 6.9271, lon: 79.8612 };
    const cityDistance = calculateDistance(
      hostelCoords.latitude,
      hostelCoords.longitude,
      cityCoords.lat,
      cityCoords.lon
    );
    transportation.push({
      type: "City Center",
      distance: cityDistance,
      time: calculateDriveTime(cityDistance),
      icon: Car,
    });

    return transportation;
  }, [hostelCoords.latitude, hostelCoords.longitude, calculateDistance, calculateDriveTime]);

  const transportation = calculateTransportationInfo();

  const getDirectionsUrl = useCallback(() => {
    return `https://www.openstreetmap.org/directions?engine=osrm_car&route=${hostelCoords.latitude},${hostelCoords.longitude}`;
  }, [hostelCoords.latitude, hostelCoords.longitude]);

  const getDestinationDistance = useCallback((destination: NearbyDestination) => {
    return calculateDistance(
      hostelCoords.latitude,
      hostelCoords.longitude,
      destination.latitude,
      destination.longitude
    );
  }, [hostelCoords.latitude, hostelCoords.longitude, calculateDistance]);

  // Handle null hostel case
  if (!hostel) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{ borderColor: '#B5E5D4' }}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ color: '#2C4A3E' }}>Location</h2>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const safeDestinations = nearbyDestinations || [];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{ borderColor: '#B5E5D480' }}>
      <h2 className="text-2xl font-bold mb-6" style={{ 
        background: 'linear-gradient(135deg, #2C4A3E 0%, #3D6657 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Social Location
      </h2>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#B5E5D4' }}>
            <MapPin className="w-6 h-6" style={{ color: '#2C4A3E' }} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1 text-lg">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              {hostel.address || "Address not available"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Coordinates: {coordinates.lat.toFixed(4)},{" "}
              {coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>

        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          style={{ 
            background: 'linear-gradient(135deg, #B5E5D4 0%, #C9EFE3 50%, #DDF9F2 100%)',
            color: '#2C4A3E'
          }}
        >
          <Navigation className="w-5 h-5" style={{ color: '#2C4A3E' }} />
          Get Directions
        </a>
      </div>

      {/* Coordinates Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Coordinates</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg p-3" style={{ backgroundColor: '#B5E5D430' }}>
            <div className="text-sm text-gray-600">Latitude</div>
            <div className="font-mono text-gray-800 font-medium">
              {coordinates.lat.toFixed(6)}
            </div>
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: '#B5E5D430' }}>
            <div className="text-sm text-gray-600">Longitude</div>
            <div className="font-mono text-gray-800 font-medium">
              {coordinates.lng.toFixed(6)}
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">Getting Here</h3>
        <div className="space-y-3">
          {transportation.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border hover:shadow-sm transition-shadow"
              style={{ 
                background: 'linear-gradient(135deg, #B5E5D420 0%, #C9EFE320 50%, #DDF9F220 100%)',
                borderColor: '#B5E5D4'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                  <item.icon className="w-5 h-5" style={{ color: '#3D6657' }} />
                </div>
                <span className="font-medium text-gray-700">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium" style={{ color: '#3D6657' }}>{item.distance}</div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Destinations Section */}
      {safeDestinations.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">
            Nearby Attractions
          </h3>
          <div className="space-y-3">
            {safeDestinations.slice(0, 4).map((destination) => (
              <div
                key={destination.destinationId}
                className="p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer group"
                style={{ 
                  background: 'linear-gradient(135deg, #B5E5D420 0%, #C9EFE320 50%, #DDF9F220 100%)',
                  borderColor: '#B5E5D4'
                }}
                onClick={() =>
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=15/${destination.latitude}/${destination.longitude}`,
                    "_blank"
                  )
                }
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold group-hover:underline" style={{ color: '#2C4A3E' }}>
                    {destination.name}
                  </h4>
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    backgroundColor: '#B5E5D4',
                    color: '#2C4A3E'
                  }}>
                    {destination.destinationCategory}
                  </span>
                </div>

                <p className="text-sm mb-3 line-clamp-2" style={{ color: '#3D6657' }}>
                  {destination.description || "No description available"}
                </p>

                <div className="flex items-center justify-between text-xs" style={{ color: '#5A8776' }}>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {destination.location || "Location not specified"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{getDestinationDistance(destination)} away</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {safeDestinations.length > 4 && (
            <button className="w-full mt-4 text-center font-medium text-sm py-2 rounded-lg border transition-all" 
                    style={{ 
                      color: '#2C4A3E',
                      backgroundColor: '#B5E5D4',
                      borderColor: '#B5E5D4'
                    }}>
              View All {safeDestinations.length} Nearby Places
            </button>
          )}
        </div>
      )}

      {/* OpenStreetMap Integration using iframe */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">Location Map</h3>
        <div className="rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: '#B5E5D4' }}>
          <div className="h-[400px] w-full relative bg-gray-100">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={osmIframeUrl}
              title={`OpenStreetMap - ${hostel?.name || "Hostel"}`}
              className="border-0"
              loading="lazy"
            />
          </div>
          <div className="px-4 py-3 border-t flex justify-between items-center" style={{ 
            backgroundColor: '#B5E5D430',
            borderColor: '#B5E5D4'
          }}>
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2"
                style={{ color: '#2C4A3E' }}
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
              style={{ color: '#2C4A3E' }}
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

        {/* Map Legend - Overlay */}
        <div className="absolute transform translate-y-[-120px] ml-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border" style={{ borderColor: '#B5E5D4' }}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#B5E5D4' }}></div>
              <span className="text-xs font-medium" style={{ color: '#2C4A3E' }}>
                Hostel
              </span>
            </div>
            {safeDestinations.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#C9EFE3' }}></div>
                <span className="text-xs font-medium" style={{ color: '#3D6657' }}>
                  Attractions ({safeDestinations.length})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Highlights */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="text-center p-3 rounded-lg border" style={{ 
          background: 'linear-gradient(135deg, #B5E5D430 0%, #C9EFE330 100%)',
          borderColor: '#B5E5D4'
        }}>
          <Users className="w-5 h-5 mx-auto mb-1" style={{ color: '#2C4A3E' }} />
          <div className="text-xs font-medium" style={{ color: '#2C4A3E' }}>
            {safeDestinations.length} Nearby Attractions
          </div>
        </div>
        <div className="text-center p-3 rounded-lg border" style={{ 
          background: 'linear-gradient(135deg, #C9EFE330 0%, #DDF9F230 100%)',
          borderColor: '#C9EFE3'
        }}>
          <Coffee className="w-5 h-5 mx-auto mb-1" style={{ color: '#3D6657' }} />
          <div className="text-xs font-medium" style={{ color: '#3D6657' }}>
            Great for Backpackers
          </div>
        </div>
      </div>

      {/* Additional Location Info */}
      {(hostel.parkingFacility ||
        hostel.wifiAvailable ||
        hostel.petFriendly) && (
        <div className="p-3 rounded-lg border" style={{ 
          background: 'linear-gradient(135deg, #B5E5D420 0%, #C9EFE320 50%, #DDF9F220 100%)',
          borderColor: '#B5E5D4'
        }}>
          <h4 className="font-semibold mb-2" style={{ color: '#2C4A3E' }}>
            Hostel Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {hostel.parkingFacility && (
              <span className="px-2 py-1 rounded-full text-xs font-medium border" style={{ 
                backgroundColor: '#B5E5D4',
                color: '#2C4A3E',
                borderColor: '#B5E5D4'
              }}>
                🅿️ Parking Available
              </span>
            )}
            {hostel.wifiAvailable && (
              <span className="px-2 py-1 rounded-full text-xs font-medium border" style={{ 
                backgroundColor: '#C9EFE3',
                color: '#3D6657',
                borderColor: '#C9EFE3'
              }}>
                📶 Free WiFi
              </span>
            )}
            {hostel.petFriendly && (
              <span className="px-2 py-1 rounded-full text-xs font-medium border" style={{ 
                backgroundColor: '#DDF9F2',
                color: '#5A8776',
                borderColor: '#DDF9F2'
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

export default HostelLocation;