// components/restaurant/RestaurantLocation.tsx
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
  Utensils,
} from "lucide-react";
import { NearbyDestination, ServiceProviderDetails } from "@/types/accommodations-types/service-provider-types";


interface RestaurantLocationProps {
  restaurant: ServiceProviderDetails;
  nearbyDestinations: NearbyDestination[];
}

const RestaurantLocation: React.FC<RestaurantLocationProps> = ({
  restaurant,
  nearbyDestinations,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // HARDCODED: Restaurant coordinates (Colombo, Sri Lanka)
  const restaurantCoords = {
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
      restaurantCoords.latitude,
      restaurantCoords.longitude,
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
      restaurantCoords.latitude,
      restaurantCoords.longitude,
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
      restaurantCoords.latitude,
      restaurantCoords.longitude,
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
    return `https://www.openstreetmap.org/directions?engine=osrm_car&route=${restaurantCoords.latitude},${restaurantCoords.longitude}`;
  };

  const getDestinationDistance = (destination: NearbyDestination) => {
    return calculateDistance(
      restaurantCoords.latitude,
      restaurantCoords.longitude,
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

      // Create map centered on restaurant
      const map = L.map(mapRef.current).setView(
        [restaurantCoords.latitude, restaurantCoords.longitude],
        13
      );
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Custom restaurant icon (rose color)
      const restaurantIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #f43f5e; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white">
                  <path d="M8 1v2M16 1v2M3.5 8h17M21 12v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8ZM12 12v4M8 12v4M16 12v4"/>
                </svg>
              </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Custom destination icon (orange)
      const destinationIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #f97316; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      // Add restaurant marker
      L.marker([restaurantCoords.latitude, restaurantCoords.longitude], {
        icon: restaurantIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div style="text-align: center;"><strong>${restaurant.name}</strong><br/><small>Restaurant Location</small><br/><small style="color: #f43f5e;">🍽️ Fine Dining</small></div>`
        );

      // Add nearby destination markers
      const bounds = [[restaurantCoords.latitude, restaurantCoords.longitude]];

      nearbyDestinations.forEach((dest) => {
        L.marker([dest.latitude, dest.longitude], {
          icon: destinationIcon,
        }).addTo(map).bindPopup(`
            <div style="min-width: 200px;">
              <strong>${dest.name}</strong><br/>
              <small style="color: #f97316;">${
                dest.destinationCategory
              }</small><br/>
              <small>${dest.description.substring(0, 100)}...</small><br/>
              <small style="color: #f43f5e;">${calculateDistance(
                restaurantCoords.latitude,
                restaurantCoords.longitude,
                dest.latitude,
                dest.longitude
              )} from restaurant</small>
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
  }, [nearbyDestinations, restaurant.name]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-6 h-6 text-rose-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
            <p className="text-gray-600 leading-relaxed">{restaurant.address}</p>
            <p className="text-sm text-gray-500 mt-1">
              Coordinates: {restaurantCoords.latitude.toFixed(4)},{" "}
              {restaurantCoords.longitude.toFixed(4)}
            </p>
          </div>
        </div>

        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
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
              className="flex items-center justify-between p-3 bg-rose-50 rounded-lg border border-rose-200"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-orange-600" />
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
      {nearbyDestinations.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            Nearby Attractions
          </h3>
          <div className="space-y-3">
            {nearbyDestinations.slice(0, 4).map((destination) => (
              <div
                key={destination.destinationId}
                className="p-3 bg-orange-50 rounded-lg border border-orange-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=15/${destination.latitude}/${destination.longitude}`,
                    "_blank"
                  )
                }
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-orange-800">
                    {destination.name}
                  </h4>
                  <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">
                    {destination.destinationCategory}
                  </span>
                </div>

                <p className="text-sm text-orange-700 mb-3 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-xs text-orange-600">
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
            <button className="w-full mt-4 text-center text-rose-600 hover:text-rose-700 font-medium text-sm">
              View All {nearbyDestinations.length} Nearby Places
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
                <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Utensils className="w-2 h-2 text-white" />
                </div>
                <span className="text-xs font-medium text-rose-500">
                  Restaurant
                </span>
              </div>
              {nearbyDestinations.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
                  <span className="text-xs font-medium text-orange-500">
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
              ? `Restaurant location with ${nearbyDestinations.length} nearby attractions`
              : "Restaurant location in Colombo"}
          </p>
          <a
            href={`https://www.openstreetmap.org/?mlat=${restaurantCoords.latitude}&mlon=${restaurantCoords.longitude}#map=15/${restaurantCoords.latitude}/${restaurantCoords.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 hover:text-rose-700 text-sm font-medium"
          >
            View larger map →
          </a>
        </div>
      </div>

      {/* Location Highlights */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-rose-50 rounded-lg border border-rose-200">
          <Star className="w-5 h-5 text-rose-600 mx-auto mb-1" />
          <div className="text-xs text-rose-700">
            {nearbyDestinations.length} Nearby Attractions
          </div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <Navigation className="w-5 h-5 text-orange-600 mx-auto mb-1" />
          <div className="text-xs text-orange-700">Central Colombo Location</div>
        </div>
      </div>

      {/* Additional Location Info */}
      {(restaurant.parkingFacility || restaurant.wifiAvailable || restaurant.petFriendly) && (
        <div className="mt-4 p-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-lg border border-rose-200">
          <h4 className="font-semibold text-rose-800 mb-2">
            Location Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {restaurant.parkingFacility && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                Parking Available
              </span>
            )}
            {restaurant.wifiAvailable && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                Free WiFi
              </span>
            )}
            {restaurant.petFriendly && (
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

export default RestaurantLocation;