// components/villa/VillaLocation.tsx
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // HARDCODED: Villa coordinates (Ella, Sri Lanka - popular villa location)
  const villaCoords = {
    latitude: 6.8696,
    longitude: 81.0463,
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
  };

  const transportation = calculateTransportationInfo();

  const getDirectionsUrl = () => {
    return `https://www.openstreetmap.org/directions?engine=osrm_car&route=${villaCoords.latitude},${villaCoords.longitude}`;
  };

  const getDestinationDistance = (destination: NearbyDestination) => {
    return calculateDistance(
      villaCoords.latitude,
      villaCoords.longitude,
      destination.latitude,
      destination.longitude
    );
  };

  // Get icon based on destination category
  const getDestinationIcon = (category: string) => {
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

      // Create map centered on villa
      const map = L.map(mapRef.current).setView(
        [villaCoords.latitude, villaCoords.longitude],
        13
      );
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Custom villa icon (emerald)
      const villaIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #10b981; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      // Custom destination icon (teal)
      const destinationIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #0d9488; width: 22px; height: 22px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      // Add villa marker
      L.marker([villaCoords.latitude, villaCoords.longitude], {
        icon: villaIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div style="text-align: center;"><strong>${villa.name}</strong><br/><small>Luxury Villa</small></div>`
        );

      // Add nearby destination markers
      const bounds = [[villaCoords.latitude, villaCoords.longitude]];

      nearbyDestinations.forEach((dest) => {
        L.marker([dest.latitude, dest.longitude], {
          icon: destinationIcon,
        }).addTo(map).bindPopup(`
            <div style="min-width: 200px;">
              <strong>${dest.name}</strong><br/>
              <small style="color: #0d9488;">${
                dest.destinationCategory
              }</small><br/>
              <small>${dest.description.substring(0, 100)}...</small><br/>
              <small style="color: #10b981;">${calculateDistance(
                villaCoords.latitude,
                villaCoords.longitude,
                dest.latitude,
                dest.longitude
              )} from villa</small>
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
  }, [nearbyDestinations, villa.name]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-emerald-600" />
        Serene Location
      </h2>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Villa Address</h3>
            <p className="text-gray-600 leading-relaxed">{villa.address}</p>
            <p className="text-sm text-gray-500 mt-1">
              Coordinates: {villaCoords.latitude.toFixed(4)},{" "}
              {villaCoords.longitude.toFixed(4)}
            </p>
          </div>
        </div>

        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
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
              className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <item.icon className="w-4 h-4 text-teal-600" />
                </div>
                <span className="font-medium text-gray-800">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-emerald-600">{item.distance}</div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Destinations Section */}
      {nearbyDestinations.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            Nearby Attractions
          </h3>
          <div className="space-y-3">
            {nearbyDestinations.slice(0, 4).map((destination) => (
              <div
                key={destination.destinationId}
                className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() =>
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=15/${destination.latitude}/${destination.longitude}`,
                    "_blank"
                  )
                }
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-teal-600">
                      {getDestinationIcon(destination.destinationCategory)}
                    </div>
                    <h4 className="font-semibold text-emerald-800 group-hover:text-emerald-900">
                      {destination.name}
                    </h4>
                  </div>
                  <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                    {destination.destinationCategory}
                  </span>
                </div>

                <p className="text-sm text-emerald-700 mb-3 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-xs text-emerald-600">
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
            <button className="w-full mt-4 text-center text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View All {nearbyDestinations.length} Nearby Places
            </button>
          )}
        </div>
      )}

      {/* Interactive Map Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-4">Location Map</h3>
        <div className="bg-gray-200 rounded-xl h-96 overflow-hidden relative shadow-inner">
          <div ref={mapRef} className="w-full h-full"></div>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 bg-white bg-opacity-95 px-4 py-3 rounded-xl shadow-lg border border-emerald-200 z-[1000]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                <span className="text-xs font-semibold text-emerald-600">
                  Luxury Villa
                </span>
              </div>
              {nearbyDestinations.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow-sm"></div>
                  <span className="text-xs font-semibold text-teal-600">
                    Attractions ({nearbyDestinations.length})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {nearbyDestinations.length > 0
              ? `Villa location with ${nearbyDestinations.length} nearby attractions`
              : "Secluded villa location in Ella"}
          </p>
          <a
            href={`https://www.openstreetmap.org/?mlat=${villaCoords.latitude}&mlon=${villaCoords.longitude}#map=15/${villaCoords.latitude}/${villaCoords.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold flex items-center gap-1"
          >
            View larger map <Navigation className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Location Highlights */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
          <Trees className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <div className="text-xs font-semibold text-emerald-700">
            {nearbyDestinations.length} Natural Attractions
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
          <Mountain className="w-6 h-6 text-teal-600 mx-auto mb-2" />
          <div className="text-xs font-semibold text-teal-700">
            Mountain Views
          </div>
        </div>
      </div>

      {/* Additional Location Info */}
      {(villa.parkingFacility || villa.wifiAvailable || villa.petFriendly) && (
        <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
          <h4 className="font-semibold text-gray-800 mb-3">
            Villa Location Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {villa.parkingFacility && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                Private Parking
              </span>
            )}
            {villa.wifiAvailable && (
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium border border-teal-200">
                High-Speed WiFi
              </span>
            )}
            {villa.petFriendly && (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
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