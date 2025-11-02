// components/hostel/HostelLocation.tsx
"use client";

import React, { useEffect, useRef } from "react";
import {
  MapPin,
  Navigation,
  Car,
  Train,
  Plane,
  Clock,
  Star,
  Users,
  Coffee,
} from "lucide-react";
import { NearbyDestination, ServiceProviderDetails } from "@/types/accommodations-types/service-provider-types";


interface HostelLocationProps {
  hostel: ServiceProviderDetails | null;
  nearbyDestinations: NearbyDestination[];
}

const HostelLocation: React.FC<HostelLocationProps> = ({
  hostel,
  nearbyDestinations,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // HARDCODED: Hostel coordinates (Colombo, Sri Lanka)
  const hostelCoords = {
    latitude: 6.9271,
    longitude: 79.8612,
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (
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
  };

  const calculateDriveTime = (distanceStr: string): string => {
    const distance = parseFloat(distanceStr);
    if (distance <= 2) return "5-10 min";
    if (distance <= 5) return "10-15 min";
    if (distance <= 10) return "15-25 min";
    if (distance <= 20) return "25-40 min";
    return "40+ min";
  };

  const calculateTransportationInfo = () => {
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
  };

  const transportation = calculateTransportationInfo();

  const getDirectionsUrl = () => {
    return `https://www.openstreetmap.org/directions?engine=osrm_car&route=${hostelCoords.latitude},${hostelCoords.longitude}`;
  };

  const getDestinationDistance = (destination: NearbyDestination) => {
    return calculateDistance(
      hostelCoords.latitude,
      hostelCoords.longitude,
      destination.latitude,
      destination.longitude
    );
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const loadLeaflet = async () => {
      if (!(window as any).L) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
        script.onload = () => initMap();
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      // Create map centered on hostel
      const map = L.map(mapRef.current).setView(
        [hostelCoords.latitude, hostelCoords.longitude],
        13
      );
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Custom hostel icon (blue)
      const hostelIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Custom destination icon (indigo)
      const destinationIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #6366f1; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      // Add hostel marker
      L.marker([hostelCoords.latitude, hostelCoords.longitude], {
        icon: hostelIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div style="text-align: center;"><strong>${hostel?.name || 'Hostel Location'}</strong><br/><small>Hostel Location</small></div>`
        );

      // Add nearby destination markers
      const bounds = [[hostelCoords.latitude, hostelCoords.longitude]];

      const safeDestinations = nearbyDestinations || [];
      safeDestinations.forEach((dest) => {
        L.marker([dest.latitude, dest.longitude], {
          icon: destinationIcon,
        }).addTo(map).bindPopup(`
            <div style="min-width: 200px;">
              <strong>${dest.name}</strong><br/>
              <small style="color: #6366f1;">${
                dest.destinationCategory
              }</small><br/>
              <small>${dest.description?.substring(0, 100) || 'No description available'}...</small><br/>
              <small style="color: #3b82f6;">${calculateDistance(
                hostelCoords.latitude,
                hostelCoords.longitude,
                dest.latitude,
                dest.longitude
              )} from hostel</small>
            </div>
          `);
        bounds.push([dest.latitude, dest.longitude]);
      });

      // Fit map to show all markers
      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [nearbyDestinations, hostel?.name]);

  // Handle null hostel case
  if (!hostel) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              {hostel.address || 'Address not available'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Coordinates: {hostelCoords.latitude.toFixed(4)},{" "}
              {hostelCoords.longitude.toFixed(4)}
            </p>
          </div>
        </div>

        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Navigation className="w-5 h-5" />
          Get Directions
        </a>
      </div>

      {/* Transportation Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Getting Here</h3>
        <div className="space-y-3">
          {transportation.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-800">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{item.distance}</div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Destinations Section */}
      {safeDestinations.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            Nearby Attractions
          </h3>
          <div className="space-y-3">
            {safeDestinations.slice(0, 4).map((destination) => (
              <div
                key={destination.destinationId}
                className="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=15/${destination.latitude}/${destination.longitude}`,
                    "_blank"
                  )
                }
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-800">
                    {destination.name}
                  </h4>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {destination.destinationCategory}
                  </span>
                </div>

                <p className="text-sm text-blue-700 mb-3 line-clamp-2">
                  {destination.description || 'No description available'}
                </p>

                <div className="flex items-center justify-between text-xs text-blue-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{destination.location || 'Location not specified'}</span>
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
            <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All {safeDestinations.length} Nearby Places
            </button>
          )}
        </div>
      )}

      {/* Interactive Map Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-4">Location Map</h3>
        <div className="bg-gray-200 rounded-xl h-96 overflow-hidden relative">
          <div ref={mapRef} className="w-full h-full"></div>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 bg-white bg-opacity-95 px-3 py-2 rounded-lg shadow-md border border-gray-300 z-[1000]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                <span className="text-xs font-medium text-blue-500">
                  Hostel
                </span>
              </div>
              {safeDestinations.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-white"></div>
                  <span className="text-xs font-medium text-indigo-500">
                    Attractions ({safeDestinations.length})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {safeDestinations.length > 0
              ? `Hostel location with ${safeDestinations.length} nearby attractions`
              : "Hostel location in Colombo"}
          </p>
          <a
            href={`https://www.openstreetmap.org/?mlat=${hostelCoords.latitude}&mlon=${hostelCoords.longitude}#map=15/${hostelCoords.latitude}/${hostelCoords.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View larger map →
          </a>
        </div>
      </div>

      {/* Location Highlights */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
          <div className="text-xs text-indigo-700">
            {safeDestinations.length} Nearby Attractions
          </div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Coffee className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-xs text-blue-700">Great for Backpackers</div>
        </div>
      </div>

      {/* Additional Location Info */}
      {(hostel.parkingFacility || hostel.wifiAvailable || hostel.petFriendly) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">
            Hostel Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {hostel.parkingFacility && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                Parking Available
              </span>
            )}
            {hostel.wifiAvailable && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                Free WiFi
              </span>
            )}
            {hostel.petFriendly && (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                Pet Friendly
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelLocation;