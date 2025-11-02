// components/resort/ResortLocation.tsx
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
  Waves,
  Mountain,
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // HARDCODED: Resort coordinates (Coastal area, Sri Lanka)
  const resortCoords = {
    latitude: 6.0535,
    longitude: 80.2210,
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
  };

  const transportation = calculateTransportationInfo();

  const getDirectionsUrl = () => {
    return `https://www.openstreetmap.org/directions?engine=osrm_car&route=${resortCoords.latitude},${resortCoords.longitude}`;
  };

  const getDestinationDistance = (destination: NearbyDestination) => {
    return calculateDistance(
      resortCoords.latitude,
      resortCoords.longitude,
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

      // Create map centered on resort
      const map = L.map(mapRef.current).setView(
        [resortCoords.latitude, resortCoords.longitude],
        13
      );
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Custom resort icon (teal)
      const resortIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #0d9488; width: 28px; height: 28px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      // Custom destination icon (blue)
      const destinationIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #2563eb; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      // Add resort marker
      L.marker([resortCoords.latitude, resortCoords.longitude], {
        icon: resortIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div style="text-align: center; padding: 8px;"><strong>${resort.name}</strong><br/><small style="color: #0d9488;">Luxury Beach Resort</small></div>`
        )
        .openPopup();

      // Add nearby destination markers
      const bounds = [[resortCoords.latitude, resortCoords.longitude]];

      nearbyDestinations.forEach((dest) => {
        L.marker([dest.latitude, dest.longitude], {
          icon: destinationIcon,
        }).addTo(map).bindPopup(`
            <div style="min-width: 220px; padding: 8px;">
              <strong style="color: #1e40af;">${dest.name}</strong><br/>
              <small style="color: #0d9488; font-weight: 500;">${
                dest.destinationCategory
              }</small><br/>
              <small style="color: #6b7280;">${dest.description.substring(0, 120)}...</small><br/>
              <small style="color: #f59e0b; font-weight: 600;">${calculateDistance(
                resortCoords.latitude,
                resortCoords.longitude,
                dest.latitude,
                dest.longitude
              )} from resort</small>
            </div>
          `);
        bounds.push([dest.latitude, dest.longitude]);
      });

      // Fit map to show all markers
      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [60, 60] });
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [nearbyDestinations, resort.name]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-teal-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
        Resort Location
      </h2>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-teal-100 p-2 rounded-lg">
            <MapPin className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 text-lg">Address</h3>
            <p className="text-gray-600 leading-relaxed">{resort.address}</p>
            <p className="text-sm text-gray-500 mt-1">
              Coastal Coordinates: {resortCoords.latitude.toFixed(4)},{" "}
              {resortCoords.longitude.toFixed(4)}
            </p>
          </div>
        </div>

        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <Navigation className="w-5 h-5" />
          Get Directions to Resort
        </a>
      </div>

      {/* Transportation Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg">Getting Here</h3>
        <div className="space-y-3">
          {transportation.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-teal-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <item.icon className="w-5 h-5 text-teal-600" />
                </div>
                <span className="font-semibold text-gray-800">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">{item.distance}</div>
                <div className="text-xs text-teal-600 font-medium">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Destinations Section */}
      {nearbyDestinations.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            Nearby Attractions
          </h3>
          <div className="space-y-3">
            {nearbyDestinations.slice(0, 4).map((destination) => (
              <div
                key={destination.destinationId}
                className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() =>
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=15/${destination.latitude}/${destination.longitude}`,
                    "_blank"
                  )
                }
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-teal-800 group-hover:text-teal-900">
                    {destination.name}
                  </h4>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm">
                    {destination.destinationCategory}
                  </span>
                </div>

                <p className="text-sm text-teal-700 mb-3 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-sm text-teal-600">
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
            <button className="w-full mt-4 text-center text-teal-600 hover:text-teal-700 font-semibold text-sm py-3 bg-teal-50 rounded-xl border border-teal-200 hover:shadow-md transition-all">
              View All {nearbyDestinations.length} Nearby Attractions
            </button>
          )}
        </div>
      )}

      {/* Interactive Map Section */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg">Resort Location Map</h3>
        <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl h-96 overflow-hidden relative border border-teal-300 shadow-inner">
          <div ref={mapRef} className="w-full h-full rounded-2xl"></div>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-teal-200 z-[1000]">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-teal-500 rounded-full border-2 border-white shadow-md"></div>
                <span className="text-sm font-semibold text-teal-600">
                  Resort
                </span>
              </div>
              {nearbyDestinations.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                  <span className="text-sm font-semibold text-blue-600">
                    Attractions ({nearbyDestinations.length})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {nearbyDestinations.length > 0
              ? `Beachfront resort with ${nearbyDestinations.length} nearby attractions`
              : "Premium beachfront location"}
          </p>
          <a
            href={`https://www.openstreetmap.org/?mlat=${resortCoords.latitude}&mlon=${resortCoords.longitude}#map=15/${resortCoords.latitude}/${resortCoords.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 font-semibold text-sm flex items-center gap-1"
          >
            View larger map <span>→</span>
          </a>
        </div>
      </div>

      {/* Location Highlights */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-xl shadow-lg">
          <Waves className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-semibold">Beachfront</div>
          <div className="text-xs opacity-90">Direct Beach Access</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-xl shadow-lg">
          <Palmtree className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-semibold">
            {nearbyDestinations.length} Attractions
          </div>
          <div className="text-xs opacity-90">Nearby</div>
        </div>
      </div>

      {/* Additional Location Info */}
      {(resort.parkingFacility || resort.wifiAvailable || resort.petFriendly) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-teal-200">
          <h4 className="font-semibold text-gray-800 mb-3 text-lg">
            Resort Location Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {resort.parkingFacility && (
              <span className="px-3 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium shadow-sm">
                🅿️ Secure Parking
              </span>
            )}
            {resort.wifiAvailable && (
              <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm">
                📶 Free WiFi
              </span>
            )}
            {resort.petFriendly && (
              <span className="px-3 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium shadow-sm">
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