"use client";

import {
  GET_ACTIVE_DESTINATIONS_LOCATIONS_CATEGORIES_FE,
  GET_ACTIVE_DESTINATIONS_LOCATIONS_FE,
} from "@/utils/frontEndConstant";
import React, { useState, useEffect, useRef } from "react";
import SectionHeader from "../common/SectionHeader";

// Define TypeScript interfaces based on new API response
interface DestinationImage {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
}

interface Destination {
  destinationId: number;
  destinationName: string;
  destinationDescription: string;
  destinationStatus: string;
  destinationCategory: string;
  destinationCategoryStatus: string;
  destinationLocation: string;
  destinationLatitude: number;
  destinationLongitude: number;
  destinationCreatedAt: string;
  destinationCreatedBy: number;
  destinationImagesForTourMapDtos: DestinationImage[];
  destinationCategoryImageForTourMapDtos: DestinationImage[];
}

interface Category {
  id: string;
  name: string;
  color: string;
  image?: string;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: Destination[];
  timestamp: string;
}

// Extend Window interface to include Leaflet
declare global {
  interface Window {
    L: any;
  }
}

// Simple icon component
const AllPlacesIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
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
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestinationsLocations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ACTIVE_DESTINATIONS_LOCATIONS_FE);
        const data: ApiResponse = await response.json();

        if (response.ok && data.code === 200) {
          const items: Destination[] = data.data || [];
          setDestinations(items);
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

    // const fetchDestinationsLocationsCategories = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(
    //       GET_ACTIVE_DESTINATIONS_LOCATIONS_CATEGORIES_FE
    //     );
    //     const data = await response.json();

    //     if (response.ok) {
    //       const items: Category[] = data.data || [];
    //       setCategories((prev) => [...prev, ...items]);
    //       setError(null);
    //     } else {
    //       setError(data.message || "Failed to fetch categories");
    //     }
    //   } catch (err) {
    //     console.error("Error fetching categories:", err);
    //     setError("Something went wrong while fetching categories");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchDestinationsLocationsCategories();
    fetchDestinationsLocations();
  }, []);

  // Transform destinations to the format expected by the existing code
  const places = destinations.map((destination) => ({
    id: destination.destinationId,
    name: destination.destinationName,
    category: destination.destinationCategory,
    lat: destination.destinationLatitude,
    lng: destination.destinationLongitude,
    description: destination.destinationDescription,
    location: destination.destinationLocation,
    images: destination.destinationImagesForTourMapDtos,
  }));

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

  // Update markers when category changes or destinations update
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

      // Add popup with enhanced information
      marker.bindPopup(`
        <div style="padding: 8px; max-width: 250px;">
          <h3 style="margin: 0 0 6px 0; font-weight: bold; color: ${
            currentCategory?.color || "#3b82f6"
          };">
            ${place.name}
          </h3>
          <p style="margin: 0 0 4px 0; font-size: 13px; color: #666;">
            ${place.description}
          </p>
          <p style="margin: 0; font-size: 12px; color: #888;">
            <strong>Location:</strong> ${place.location}
          </p>
          ${
            place.images && place.images.length > 0
              ? `
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #999;">
            ${place.images.length} image${
                  place.images.length !== 1 ? "s" : ""
                } available
          </p>
          `
              : ""
          }
        </div>
      `);

      // Add click event
      marker.on("click", function (this: any) {
        const destination = destinations.find(
          (d) => d.destinationId === place.id
        );
        if (destination) {
          setSelectedDestination(destination);
        }
      });

      // Add hover effects for popup only
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
  }, [map, selectedCategory, filteredPlaces.length, destinations.length]);

  // Get unique categories from destinations for dynamic category display
  const uniqueCategoriesFromDestinations = Array.from(
    new Set(destinations.map((d) => d.destinationCategory))
  ).map((category) => {
    const matchingCategory = categories.find((c) => c.name === category);
    const categoryDestination = destinations.find(
      (d) => d.destinationCategory === category
    );
    return {
      id: category,
      name: category,
      color: matchingCategory?.color || "#3b82f6",
      image:
        categoryDestination?.destinationCategoryImageForTourMapDtos?.[0]
          ?.imageUrl || "",
    };
  });

  // Create "All Destinations" category
  const allDestinationsCategory = {
    id: "all",
    name: "All Destinations",
    color: "#3b82f6",
    image: "",
  };

  // Combine all categories
  const allCategories = [
    allDestinationsCategory,
    ...uniqueCategoriesFromDestinations,
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Explore the pearl of the Indian Ocean"
            title="Discover Sri Lanka"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading destinations...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Category Selection - Desktop/Laptop (hidden on mobile/tablet) */}
        <div className="hidden lg:grid grid-cols-6 gap-6 mb-8">
          {allCategories.map((cat) => {
            const categoryCount =
              cat.id === "all"
                ? places.length
                : places.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center transition-all duration-300 ${
                  selectedCategory === cat.id ? "scale-110" : "hover:scale-105"
                }`}
              >
                <div
                  className={`w-24 h-24 rounded-full overflow-hidden mb-3 transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? "ring-4 shadow-xl"
                      : "ring-2 ring-gray-200 hover:shadow-lg"
                  }`}
                  style={{
                    border: "8px",
                    borderColor:
                      selectedCategory === cat.id ? cat.color : undefined,
                  }}
                >
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: cat.color }}
                    >
                      <AllPlacesIcon />
                    </div>
                  )}
                </div>
                <p
                  className={`text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? "text-gray-900 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {categoryCount} place{categoryCount !== 1 ? "s" : ""}
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
            {allCategories.map((cat) => {
              const categoryCount =
                cat.id === "all"
                  ? places.length
                  : places.filter((p) => p.category === cat.id).length;

              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({categoryCount} place
                  {categoryCount !== 1 ? "s" : ""})
                </option>
              );
            })}
          </select>
        </div>

        {/* Map Container with Side Panel */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="flex gap-4">
            {/* Map */}
            <div className="flex-1">
              <div
                ref={mapRef}
                className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-lg sm:rounded-xl overflow-hidden"
                style={{ minHeight: "400px" }}
              />
            </div>

            {/* Destination Details Card - Desktop Only (Side Panel) */}
            {selectedDestination && (
              <div className="hidden lg:block w-80 h-[600px] overflow-y-auto relative">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedDestination(null)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                    aria-label="Close"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <h3
                    className="text-2xl font-bold mb-2 pr-8"
                    style={{ color: currentCategory?.color || "#3b82f6" }}
                  >
                    {selectedDestination.destinationName}
                  </h3>

                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{
                        backgroundColor: currentCategory?.color || "#3b82f6",
                      }}
                    >
                      {selectedDestination.destinationCategory}
                    </span>
                  </div>

                  {/* Images Gallery */}
                  {selectedDestination.destinationImagesForTourMapDtos &&
                    selectedDestination.destinationImagesForTourMapDtos.length >
                      0 && (
                      <div className="mb-4 space-y-2">
                        {selectedDestination.destinationImagesForTourMapDtos.map(
                          (img) => (
                            <div
                              key={img.id}
                              className="rounded-lg overflow-hidden shadow-md"
                            >
                              <img
                                src={img.imageUrl}
                                alt={img.name}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                              />
                              {img.description && (
                                <p className="text-xs text-gray-600 p-2 bg-gray-50">
                                  {img.description}
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Description
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedDestination.destinationDescription}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Location
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedDestination.destinationLocation}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Coordinates
                      </p>
                      <p className="text-xs text-gray-500 font-mono">
                        Lat:{" "}
                        {selectedDestination.destinationLatitude.toFixed(4)},
                        Lng:{" "}
                        {selectedDestination.destinationLongitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Destination Details Card - Mobile & Tablet (Below Map) */}
          {selectedDestination && (
            <div className="lg:hidden mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-4 sm:p-6 relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                  aria-label="Close"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h3
                  className="text-xl sm:text-2xl font-bold mb-2 pr-10"
                  style={{ color: currentCategory?.color || "#3b82f6" }}
                >
                  {selectedDestination.destinationName}
                </h3>

                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{
                      backgroundColor: currentCategory?.color || "#3b82f6",
                    }}
                  >
                    {selectedDestination.destinationCategory}
                  </span>
                </div>

                {/* Images Gallery */}
                {selectedDestination.destinationImagesForTourMapDtos &&
                  selectedDestination.destinationImagesForTourMapDtos.length >
                    0 && (
                    <div className="mb-4 space-y-2">
                      {selectedDestination.destinationImagesForTourMapDtos.map(
                        (img) => (
                          <div
                            key={img.id}
                            className="rounded-lg overflow-hidden shadow-md"
                          >
                            <img
                              src={img.imageUrl}
                              alt={img.name}
                              className="w-full h-48 sm:h-56 object-cover"
                            />
                            {img.description && (
                              <p className="text-xs text-gray-600 p-2 bg-gray-50">
                                {img.description}
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Description
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedDestination.destinationDescription}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Location
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedDestination.destinationLocation}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Coordinates
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                      Lat: {selectedDestination.destinationLatitude.toFixed(4)},
                      Lng: {selectedDestination.destinationLongitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                {currentCategory?.name || "All Destinations"}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Total destinations: {destinations.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourMap;
