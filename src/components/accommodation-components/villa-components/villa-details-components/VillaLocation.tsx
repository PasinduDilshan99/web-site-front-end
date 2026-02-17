// components/villa/VillaLocation.tsx
"use client";

import React, { useMemo, useCallback } from "react";
import {
  MapPin,
  Navigation,
  Car,
  Train,
  Plane,
  Clock,
  Trees,
  Mountain,
  Waves,
} from "lucide-react";
import { NearbyDestination, ServiceProviderDetails } from "@/types/accommodations-types/service-provider-types";

interface VillaLocationProps {
  villa: ServiceProviderDetails;
  nearbyDestinations: NearbyDestination[];
}

const VillaLocation: React.FC<VillaLocationProps> = ({
  villa,
  nearbyDestinations,
}) => {
  // HARDCODED: Villa coordinates (Ella, Sri Lanka - popular villa location)
  const villaCoords = useMemo(() => ({
    latitude: 6.8696,
    longitude: 81.0463,
  }), []);

  // Ensure we have valid coordinates
  const isValidCoordinate = (coord: number) => {
    return coord !== null && coord !== undefined && !isNaN(coord);
  };

  const coordinates = {
    lat: isValidCoordinate(villaCoords.latitude) ? villaCoords.latitude : 6.8696,
    lng: isValidCoordinate(villaCoords.longitude) ? villaCoords.longitude : 81.0463,
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

    // Ella to Bandaranaike Airport
    const airportCoords = { lat: 7.18, lon: 79.8843 };
    const airportDistance = calculateDistance(
      villaCoords.latitude,
      villaCoords.longitude,
      airportCoords.lat,
      airportCoords.lon
    );
    transportation.push({
      type: "Bandaranaike Airport",
      distance: airportDistance,
      time: calculateDriveTime(airportDistance),
      icon: Plane,
    });

    // Ella Railway Station
    const trainCoords = { lat: 6.8606, lon: 81.0467 };
    const trainDistance = calculateDistance(
      villaCoords.latitude,
      villaCoords.longitude,
      trainCoords.lat,
      trainCoords.lon
    );
    transportation.push({
      type: "Ella Railway Station",
      distance: trainDistance,
      time: calculateDriveTime(trainDistance),
      icon: Train,
    });

    // Ella Town Center
    const townCoords = { lat: 6.8742, lon: 81.0463 };
    const townDistance = calculateDistance(
      villaCoords.latitude,
      villaCoords.longitude,
      townCoords.lat,
      townCoords.lon
    );
    transportation.push({
      type: "Ella Town Center",
      distance: townDistance,
      time: calculateDriveTime(townDistance),
      icon: Car,
    });

    return transportation;
  }, [villaCoords.latitude, villaCoords.longitude, calculateDistance, calculateDriveTime]);

  const transportation = calculateTransportationInfo();

  const getDirectionsUrl = useCallback(() => {
    return `https://www.openstreetmap.org/directions?engine=osrm_car&route=${villaCoords.latitude},${villaCoords.longitude}`;
  }, [villaCoords.latitude, villaCoords.longitude]);

  const getDestinationDistance = useCallback((destination: NearbyDestination) => {
    return calculateDistance(
      villaCoords.latitude,
      villaCoords.longitude,
      destination.latitude,
      destination.longitude
    );
  }, [villaCoords.latitude, villaCoords.longitude, calculateDistance]);

  // Get icon based on destination category
  const getDestinationIcon = useCallback((category: string) => {
    switch (category.toLowerCase()) {
      case 'mountain':
      case 'hiking':
        return <Mountain className="w-4 h-4" />;
      case 'beach':
      case 'coastal':
        return <Waves className="w-4 h-4" />;
      case 'forest':
      case 'nature':
        return <Trees className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border" style={{ borderColor: '#1B4D3E20' }}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#1B4D3E' }}>
        <MapPin className="w-6 h-6" style={{ color: '#1B4D3E' }} />
        Serene Location
      </h2>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#1B4D3E20' }}>
            <MapPin className="w-5 h-5" style={{ color: '#1B4D3E' }} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Villa Address</h3>
            <p className="text-gray-600 leading-relaxed">{villa.address}</p>
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
          className="w-full text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          style={{ 
            background: 'linear-gradient(135deg, #1B4D3E 0%, #2E6B5C 50%, #428577 100%)',
          }}
        >
          <Navigation className="w-5 h-5" />
          Get Directions
        </a>
      </div>

      {/* Coordinates Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Coordinates</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg p-3" style={{ backgroundColor: '#1B4D3E10' }}>
            <div className="text-sm text-gray-600">Latitude</div>
            <div className="font-mono text-gray-900 font-medium">
              {coordinates.lat.toFixed(6)}
            </div>
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: '#1B4D3E10' }}>
            <div className="text-sm text-gray-600">Longitude</div>
            <div className="font-mono text-gray-900 font-medium">
              {coordinates.lng.toFixed(6)}
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Getting Here</h3>
        <div className="space-y-3">
          {transportation.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-all"
              style={{ 
                background: 'linear-gradient(135deg, #1B4D3E08 0%, #2E6B5C08 50%, #42857708 100%)',
                borderColor: '#1B4D3E40'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <item.icon className="w-4 h-4" style={{ color: '#2E6B5C' }} />
                </div>
                <span className="font-medium text-gray-800">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold" style={{ color: '#1B4D3E' }}>{item.distance}</div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Destinations Section */}
      {nearbyDestinations.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Nearby Attractions
          </h3>
          <div className="space-y-3">
            {nearbyDestinations.slice(0, 4).map((destination) => (
              <div
                key={destination.destinationId}
                className="p-4 rounded-xl border hover:shadow-lg transition-all cursor-pointer group"
                style={{ 
                  background: 'linear-gradient(135deg, #1B4D3E08 0%, #2E6B5C08 50%, #42857708 100%)',
                  borderColor: '#1B4D3E40'
                }}
                onClick={() =>
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=15/${destination.latitude}/${destination.longitude}`,
                    "_blank"
                  )
                }
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div style={{ color: '#2E6B5C' }}>
                      {getDestinationIcon(destination.destinationCategory)}
                    </div>
                    <h4 className="font-semibold group-hover:underline" style={{ color: '#1B4D3E' }}>
                      {destination.name}
                    </h4>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ 
                    backgroundColor: '#1B4D3E20',
                    color: '#1B4D3E'
                  }}>
                    {destination.destinationCategory}
                  </span>
                </div>

                <p className="text-sm mb-3 line-clamp-2" style={{ color: '#2E6B5C' }}>
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-xs" style={{ color: '#428577' }}>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{destination.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{getDestinationDistance(destination)} away</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {nearbyDestinations.length > 4 && (
            <button className="w-full mt-4 text-center font-medium text-sm" style={{ color: '#1B4D3E' }}>
              View All {nearbyDestinations.length} Nearby Places
            </button>
          )}
        </div>
      )}

      {/* OpenStreetMap Integration using iframe */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Location on Map</h3>
        <div className="rounded-xl overflow-hidden border shadow-md" style={{ borderColor: '#1B4D3E40' }}>
          <div className="h-[400px] w-full relative bg-gray-100">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={osmIframeUrl}
              title={`OpenStreetMap - ${villa.name}`}
              className="border-0"
              loading="lazy"
            />
          </div>
          <div className="px-4 py-3 border-t flex justify-between items-center" style={{ 
            backgroundColor: '#1B4D3E10',
            borderColor: '#1B4D3E40'
          }}>
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2"
                style={{ color: '#1B4D3E' }}
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
              style={{ color: '#1B4D3E' }}
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
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="text-center p-4 rounded-xl border" style={{ 
          background: 'linear-gradient(135deg, #1B4D3E08 0%, #2E6B5C08 100%)',
          borderColor: '#1B4D3E40'
        }}>
          <Trees className="w-6 h-6 mx-auto mb-2" style={{ color: '#1B4D3E' }} />
          <div className="text-xs font-semibold" style={{ color: '#1B4D3E' }}>
            {nearbyDestinations.length} Natural Attractions
          </div>
        </div>
        <div className="text-center p-4 rounded-xl border" style={{ 
          background: 'linear-gradient(135deg, #2E6B5C08 0%, #42857708 100%)',
          borderColor: '#2E6B5C40'
        }}>
          <Mountain className="w-6 h-6 mx-auto mb-2" style={{ color: '#2E6B5C' }} />
          <div className="text-xs font-semibold" style={{ color: '#2E6B5C' }}>
            Mountain Views
          </div>
        </div>
      </div>

      {/* Additional Location Info */}
      {(villa.parkingFacility || villa.wifiAvailable || villa.petFriendly) && (
        <div className="p-4 rounded-xl border" style={{ 
          background: 'linear-gradient(135deg, #1B4D3E08 0%, #2E6B5C08 50%, #42857708 100%)',
          borderColor: '#1B4D3E40'
        }}>
          <h4 className="font-semibold text-gray-800 mb-3">
            Villa Location Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {villa.parkingFacility && (
              <span className="px-3 py-1 rounded-full text-xs font-medium border" style={{ 
                backgroundColor: '#1B4D3E20',
                color: '#1B4D3E',
                borderColor: '#1B4D3E40'
              }}>
                Private Parking
              </span>
            )}
            {villa.wifiAvailable && (
              <span className="px-3 py-1 rounded-full text-xs font-medium border" style={{ 
                backgroundColor: '#2E6B5C20',
                color: '#2E6B5C',
                borderColor: '#2E6B5C40'
              }}>
                High-Speed WiFi
              </span>
            )}
            {villa.petFriendly && (
              <span className="px-3 py-1 rounded-full text-xs font-medium border" style={{ 
                backgroundColor: '#42857720',
                color: '#428577',
                borderColor: '#42857740'
              }}>
                Pet Friendly
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VillaLocation;