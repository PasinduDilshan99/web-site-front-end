"use client";

import {
  GET_ACTIVE_DESTINATIONS_LOCATIONS_CATEGORIES_FE,
  GET_ACTIVE_DESTINATIONS_LOCATIONS_FE,
} from "@/utils/frontEndConstant";
import React, { useState, useEffect, useRef } from "react";

// Define TypeScript interfaces
interface Place {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

// Extend Window interface to include Leaflet
declare global {
  interface Window {
    L: any;
  }
}

// Simple icon components
const MapPinIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const PalmtreeIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L8 8h3v12h2V8h3l-4-6z" />
    <path d="M7 7c-1 1-2 3-2 5h3c0-1 .5-2 1-3l-2-2z" />
    <path d="M17 7l-2 2c.5 1 1 2 1 3h3c0-2-1-4-2-5z" />
  </svg>
);

const BuildingIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3L2 9v12h20V9l-10-6zM8 19H6v-2h2v2zm0-4H6v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
  </svg>
);

const MountainIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2L9 12.5l-3 4L2 12l5-6.7L10 10l4-4z" />
    <path d="M14 6l8 10h-6l-2-2.67z" />
  </svg>
);

const CameraIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

const UtensilsIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
  </svg>
);

const AllPlacesIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const TourMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchDestinationsLocations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ACTIVE_DESTINATIONS_LOCATIONS_FE);
        const data = await response.json();

        if (response.ok) {
          const items: Place[] = data.data || [];
          setPlaces(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch destinations locations");
        }
      } catch (err) {
        console.error("Error fetching destinations locations:", err);
        setError("Something went wrong while fetching destinations locations");
      } finally {
        setLoading(false);
      }
    };

    const fetchDestinationsLocationsCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          GET_ACTIVE_DESTINATIONS_LOCATIONS_CATEGORIES_FE
        );
        const data = await response.json();

        if (response.ok) {
          const items: Category[] = data.data || [];
          setCategories((prev) => [...prev, ...items]);

          setError(null);
        } else {
          setError(data.message || "Failed to fetch destinations locations");
        }
      } catch (err) {
        console.error("Error fetching destinations locations:", err);
        setError("Something went wrong while fetching destinations locations");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationsLocationsCategories();
    fetchDestinationsLocations();
  }, []);

  const filteredPlaces =
    selectedCategory === "all"
      ? places
      : places.filter((p) => p.category === selectedCategory);

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  // Load Leaflet CSS and JS
  useEffect(() => {
    // Check if Leaflet is already loaded
    if (window.L) {
      initMap();
      return;
    }

    // Load Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = () => {
      // Initialize map after Leaflet is loaded
      setTimeout(initMap, 100);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const initMap = (): void => {
    if (!mapRef.current || !window.L) return;

    // Initialize the map
    const newMap = window.L.map(mapRef.current).setView([7.8731, 80.7718], 8);

    // Add OpenStreetMap tiles
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(newMap);

    setMap(newMap);
    mapInstanceRef.current = newMap;
  };

  // Update markers when category changes
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach((marker) => {
      map.removeLayer(marker);
    });

    // Create custom icon
    const createCustomIcon = (color: string) => {
      return window.L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 20px;
            height: 20px;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          "></div>
        `,
        className: "custom-marker",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
    };

    // Create new markers
    const newMarkers = filteredPlaces.map((place) => {
      const marker = window.L.marker([place.lat, place.lng], {
        icon: createCustomIcon(currentCategory?.color || "#3b82f6"),
      }).addTo(map);

      // Add popup
      marker.bindPopup(`
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="margin: 0 0 6px 0; font-weight: bold; color: ${
            currentCategory?.color || "#3b82f6"
          };">
            ${place.name}
          </h3>
          <p style="margin: 0; font-size: 13px; color: #666;">
            ${place.description}
          </p>
        </div>
      `);

      // Add hover effects
      marker.on("mouseover", function (this: any) {
        this.openPopup();
      });

      marker.on("mouseout", function (this: any) {
        this.closePopup();
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Adjust map bounds to fit all markers
    if (newMarkers.length > 0) {
      const group = new window.L.featureGroup(newMarkers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [map, selectedCategory, filteredPlaces.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore the pearl of the Indian Ocean
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Discover Sri Lanka
          </h2>
          <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#A855F7] to-[#F59E0B] mx-auto rounded-full"></div>
        </div>

        {/* Category Selection - Desktop/Laptop (hidden on mobile/tablet) */}
        <div className="hidden lg:grid grid-cols-6 gap-4 mb-8">
          {categories.map((cat) => {
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-white shadow-lg scale-105 ring-2"
                    : "bg-white/70 hover:bg-white hover:shadow-md"
                }`}
                style={
                  {
                    ringColor:
                      selectedCategory === cat.id ? cat.color : "transparent",
                  } as React.CSSProperties
                }
              >
                <div
                  className="flex justify-center mb-2"
                  style={{ color: cat.color }}
                ></div>
                <p className="text-sm font-medium text-gray-700">{cat.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {cat.id === "all"
                    ? places.length
                    : places.filter((p) => p.category === cat.id).length}{" "}
                  places
                </p>
              </button>
            );
          })}
        </div>

        {/* Category Selection - Dropdown (Mobile & Tablet) */}
        <div className="lg:hidden mb-4 sm:mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 sm:p-4 rounded-xl bg-white shadow-md text-sm sm:text-base font-medium text-gray-700 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            style={{
              borderColor: currentCategory?.color || "#3b82f6",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} (
                {cat.id === "all"
                  ? places.length
                  : places.filter((p) => p.category === cat.id).length}{" "}
                places)
              </option>
            ))}
          </select>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8">
          <div
            ref={mapRef}
            className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-lg sm:rounded-xl overflow-hidden"
            style={{ minHeight: "400px" }}
          />

          {/* Legend */}
          <div className="mt-3 sm:mt-4 md:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: currentCategory?.color || "#3b82f6" }}
              ></div>
              <p className="text-xs sm:text-sm text-gray-600">
                Showing{" "}
                <span className="font-bold">{filteredPlaces.length}</span>{" "}
                {currentCategory?.name || "All Places"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourMap;
