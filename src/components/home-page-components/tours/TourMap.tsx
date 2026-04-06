"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import SectionHeader from "../../../components/common-components/section-header/SectionHeader";
import {
  TourMapDestination,
  TourMapCategory,
  TourMapPlace,
  TourMapLeafletMap,
  TourMapLeafletMarker,
} from "@/types/destination-types";
import { DestinationService } from "@/services/destinationService";
import { useCommon } from "@/context/CommonContext";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import DOMPurify from "dompurify";

// Define proper types for Leaflet
declare global {
  interface Window {
    L:
      | {
          map: (element: HTMLElement) => TourMapLeafletMap;
          tileLayer: (
            url: string,
            options: unknown,
          ) => { addTo: (map: TourMapLeafletMap) => unknown };
          marker: (
            coords: [number, number],
            options: unknown,
          ) => TourMapLeafletMarker;
          divIcon: (options: unknown) => unknown;
          featureGroup: (markers: TourMapLeafletMarker[]) => {
            getBounds: () => { pad: (padding: number) => unknown };
          };
        }
      | undefined;
  }
}

// Simple icon component
const AllPlacesIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

// Custom Image component with fallback
const DestinationImageWithFallback = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => {
        setImgSrc(PLACE_HOLDER_IMAGE);
      }}
    />
  );
};

// Fallback color map in case context doesn't have colors
const FALLBACK_COLORS: Record<string, { color: string; hoverColor: string }> = {
  "Cultural & Heritage": { color: "#8B5A2B", hoverColor: "#6B4319" },
  "Hill Country": { color: "#2E8B57", hoverColor: "#1E5F3A" },
  "Historical Sites": { color: "#B8860B", hoverColor: "#8B6508" },
  "Religious & Sacred": { color: "#DAA520", hoverColor: "#B8860B" },
  "Tea Plantations": { color: "#228B22", hoverColor: "#166316" },
  "Pilgrimage Sites": { color: "#CD853F", hoverColor: "#A05F2A" },
  "Botanical Gardens": { color: "#32CD32", hoverColor: "#228B22" },
  "Spice Gardens": { color: "#D2691E", hoverColor: "#A0522D" },
  "Honeymoon Spots": { color: "#FF69B4", hoverColor: "#DB3E8C" },
  "Family Friendly": { color: "#20B2AA", hoverColor: "#178F89" },
  "Scenic Viewpoints": { color: "#1E90FF", hoverColor: "#0B6EC7" },
  "Cave Temples": { color: "#8B4513", hoverColor: "#5A2E0C" },
  "Adventure Sports": { color: "#FF4500", hoverColor: "#CC3700" },
};

const TourMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { categories } = useCommon();
  const [map, setMap] = useState<TourMapLeafletMap | null>(null);
  const [markers, setMarkers] = useState<TourMapLeafletMarker[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<TourMapLeafletMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<TourMapDestination[]>([]);
  const [selectedDestination, setSelectedDestination] =
    useState<TourMapDestination | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Create a map of category names to their data from context
  const categoryDataMap = useMemo(() => {
    const map = new Map();

    // First, add categories from context if available
    if (categories?.destinationCategoryList) {
      categories.destinationCategoryList.forEach((cat) => {
        map.set(cat.destinationCategoryName, {
          color: cat.destinationCategoryColor,
          hoverColor: cat.destinationCategoryHoverColor,
          image: cat.destinationCategoryImages?.[0]?.imageUrl || "",
        });
      });
    }

    // Add fallback colors for any categories that might not be in context
    Object.entries(FALLBACK_COLORS).forEach(([catName, colors]) => {
      if (!map.has(catName)) {
        map.set(catName, {
          color: colors.color,
          hoverColor: colors.hoverColor,
          image: "",
        });
      }
    });

    return map;
  }, [categories]);

  // Helper function to get category color from context or fallback
  const getCategoryColor = useCallback(
    (category: string): string => {
      const categoryData = categoryDataMap.get(category);
      const color =
        categoryData?.color || FALLBACK_COLORS[category]?.color || "#3b82f6";
      return color;
    },
    [categoryDataMap],
  );

  // Helper function to get category hover color from context or fallback
  const getCategoryHoverColor = useCallback(
    (category: string): string => {
      const categoryData = categoryDataMap.get(category);
      const hoverColor =
        categoryData?.hoverColor ||
        FALLBACK_COLORS[category]?.hoverColor ||
        "#2563eb";
      return hoverColor;
    },
    [categoryDataMap],
  );

  // Helper function to get category image from context
  const getCategoryImage = useCallback(
    (category: string): string => {
      const categoryData = categoryDataMap.get(category);
      return categoryData?.image || "";
    },
    [categoryDataMap],
  );

  // Transform destinations to the format expected by the existing code
  const places = useMemo((): TourMapPlace[] => {
    return destinations.map((destination) => ({
      id: destination.destinationId,
      name: destination.destinationName,
      categories: destination.destinationCategories,
      lat: destination.destinationLatitude,
      lng: destination.destinationLongitude,
      description: destination.destinationDescription,
      location: destination.destinationLocation,
      images: destination.destinationImagesForTourMapDtos,
    }));
  }, [destinations]);

  const filteredPlaces = useMemo(() => {
    return selectedCategory === "all"
      ? places
      : places.filter((p) => p.categories.includes(selectedCategory));
  }, [selectedCategory, places]);

  // Get categories from context for display
  const allCategories = useMemo((): TourMapCategory[] => {
    // Create "All Destinations" category
    const allDestinationsCategory: TourMapCategory = {
      id: "all",
      name: "All Destinations",
      color: "#3b82f6",
      hoverColor: "#2563eb",
      image: "",
    };

    // Get unique categories from destinations as a backup
    const destinationCategories = new Set<string>();
    destinations.forEach((destination) => {
      destination.destinationCategories.forEach((cat) =>
        destinationCategories.add(cat),
      );
    });

    const categoryList: TourMapCategory[] = [];

    // Add categories from context
    if (categories?.destinationCategoryList) {
      categories.destinationCategoryList.forEach((cat) => {
        categoryList.push({
          id: cat.destinationCategoryName,
          name: cat.destinationCategoryName,
          color:
            cat.destinationCategoryColor ||
            FALLBACK_COLORS[cat.destinationCategoryName]?.color ||
            "#3b82f6",
          hoverColor:
            cat.destinationCategoryHoverColor ||
            FALLBACK_COLORS[cat.destinationCategoryName]?.hoverColor ||
            "#2563eb",
          image: cat.destinationCategoryImages?.[0]?.imageUrl || "",
        });
        // Remove from destination categories set if already added
        destinationCategories.delete(cat.destinationCategoryName);
      });
    }

    // Add any remaining destination categories that weren't in context
    destinationCategories.forEach((catName) => {
      categoryList.push({
        id: catName,
        name: catName,
        color: FALLBACK_COLORS[catName]?.color || "#3b82f6",
        hoverColor: FALLBACK_COLORS[catName]?.hoverColor || "#2563eb",
        image: "",
      });
    });

    return [allDestinationsCategory, ...categoryList];
  }, [categories, destinations]);

  const currentCategory = useMemo(() => {
    return allCategories.find((c) => c.id === selectedCategory);
  }, [selectedCategory, allCategories]);

  useEffect(() => {
    const fetchDestinationsLocations = async () => {
      try {
        setLoading(true);

        const { data: destinationsData, error } =
          await DestinationService.fetchActiveDestinationsLocations();

        if (error) {
          setError(error);
        } else {
          setDestinations(destinationsData);
          setError(null);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Something went wrong while fetching destinations locations");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationsLocations();
  }, []);

  const initMap = useCallback((): void => {
    if (!mapRef.current || !window.L) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize the map safely
    const newMap = window.L.map(mapRef.current).setView([7.8731, 80.7718], 8);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(newMap);

    setMap(newMap);
    mapInstanceRef.current = newMap;
  }, []);

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
  }, [initMap]);

  // Update markers when category changes or destinations update
  const updateMarkers = useCallback(() => {
    if (!map || !window.L) return;

    // Clear existing markers
    markers.forEach((marker) => {
      map.removeLayer(marker);
    });

    // Create custom icon with category color
    const createCustomIcon = (color: string, hoverColor?: string) => {
      return window.L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: all 0.2s ease;
            cursor: pointer;
          " 
          class="marker-dot"
          onmouseover="this.style.backgroundColor='${hoverColor || color}'; this.style.transform='scale(1.2)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.4)';"
          onmouseout="this.style.backgroundColor='${color}'; this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.3)';"></div>
        `,
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
    };

    // Create new markers with category-specific colors
    const newMarkers = filteredPlaces.map((place) => {
      // Get colors for each category this place belongs to
      // For multiple categories, we'll use the first one as primary
      const primaryCategory = place.categories[0] || "";
      const categoryColor = getCategoryColor(primaryCategory);
      const categoryHoverColor = getCategoryHoverColor(primaryCategory);

      // If a specific category is selected, use that category's color
      // Otherwise, use the place's primary category color
      const markerColor =
        selectedCategory === "all"
          ? categoryColor
          : currentCategory?.color || "#3b82f6";

      const markerHoverColor =
        selectedCategory === "all"
          ? categoryHoverColor
          : currentCategory?.hoverColor || "#2563eb";

      const marker = window.L.marker([place.lat, place.lng], {
        icon: createCustomIcon(markerColor, markerHoverColor),
        riseOnHover: true,
      }).addTo(map);

      // Create popup content with category colors
      const categoriesHtml = place.categories
        .map((cat) => {
          const catColor = getCategoryColor(cat);
          return `<span style="display: inline-block; padding: 2px 8px; margin: 2px; border-radius: 12px; background-color: ${catColor}; color: white; font-size: 10px; font-weight: 600;">${cat}</span>`;
        })
        .join("");

      // Helper function to truncate text with TypeScript types
      const truncateText = (
        text: string | null | undefined,
        maxLength: number,
      ): string => {
        if (!text) return "No description available";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
      };
      const safeName = DOMPurify.sanitize(place.name || "");
      const safeDescription = DOMPurify.sanitize(
        truncateText(place.description, 100),
      );
      const safeLocation = DOMPurify.sanitize(place.location || "");
      marker.bindPopup(`
  <div style="padding: 12px; max-width: 280px;">
    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">
      ${safeName}
    </h3>

    <p style="margin: 8px 0; font-size: 13px;">
      ${safeDescription}
    </p>

    <p style="margin: 4px 0; font-size: 12px;">
      📍 ${safeLocation}
    </p>
  </div>
`);
      // Add click event
      marker.on("click", () => {
        const destination = destinations.find(
          (d) => d.destinationId === place.id,
        );
        if (destination) {
          setSelectedDestination(destination);
          marker.openPopup();
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Only fit bounds on initial load or category change
    if (!hasInitialized && newMarkers.length > 0) {
      setTimeout(() => {
        try {
          const group = window.L.featureGroup(newMarkers);
          map.fitBounds(group.getBounds().pad(0.1));
          setHasInitialized(true);
        } catch (err) {
          console.error("Error fitting bounds:", err);
        }
      }, 100);
    }
  }, [
    map,
    currentCategory,
    destinations,
    filteredPlaces,
    getCategoryColor,
    getCategoryHoverColor,
    selectedCategory,
    hasInitialized,
    markers.length,
  ]);

  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedDestination(null);
    // Reset initialized state to allow refitting on category change
    setHasInitialized(false);
  };

  // Handle closing the destination details
  const handleCloseDestination = () => {
    setSelectedDestination(null);
  };

  // Add custom CSS for popups
  useEffect(() => {
    // Add custom styles for popups
    const style = document.createElement("style");
    style.textContent = `
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 12px;
        padding: 0;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      }
      .custom-popup .leaflet-popup-content {
        margin: 0;
        min-width: 250px;
      }
      .custom-popup .leaflet-popup-tip {
        background: white;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-6 lg:py-8 xl:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Explore the pearl of the Indian Ocean"
            title="Discover Sri Lanka"
            description=""
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Category Selection - Desktop/Laptop */}
        <div className="hidden lg:grid grid-cols-6 gap-6 mb-8">
          {allCategories.map((cat) => {
            const categoryCount =
              cat.id === "all"
                ? places.length
                : places.filter((p) => p.categories.includes(cat.id)).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex flex-col items-center transition-all duration-300 ${
                  selectedCategory === cat.id ? "scale-110" : "hover:scale-105"
                }`}
              >
                <div
                  className={`w-24 h-24 rounded-full overflow-hidden mb-3 transition-all duration-300 relative ${
                    selectedCategory === cat.id
                      ? "ring-4 shadow-xl"
                      : "ring-2 ring-gray-200 hover:shadow-lg"
                  }`}
                  style={{
                    borderColor:
                      selectedCategory === cat.id ? cat.color : undefined,
                  }}
                >
                  {cat.image ? (
                    <DestinationImageWithFallback
                      src={cat.image}
                      alt={cat.name}
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
        <div className="lg:hidden mb-4 sm:mb-6 max-w-[90%] flex justify-center mx-auto ">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryClick(e.target.value)}
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
                  : places.filter((p) => p.categories.includes(cat.id)).length;

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
            <div className="flex-1 -z-0">
              <div
                ref={mapRef}
                className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-lg sm:rounded-xl overflow-hidden"
                style={{ minHeight: "400px" }}
              />
            </div>

            {/* Destination Details Card - Desktop Only */}
            {selectedDestination && (
              <div className="hidden lg:block w-80 h-[600px] overflow-y-auto relative">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6">
                  {/* Close button */}
                  <button
                    onClick={handleCloseDestination}
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

                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedDestination.destinationCategories.map(
                      (category, index) => {
                        const catColor = getCategoryColor(category);
                        const catHoverColor = getCategoryHoverColor(category);

                        return (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white cursor-pointer transition-all duration-200"
                            style={{
                              backgroundColor: catColor,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                catHoverColor;
                              e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = catColor;
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryClick(category);
                            }}
                          >
                            {category}
                          </span>
                        );
                      },
                    )}
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
                              className="rounded-lg overflow-hidden shadow-md relative h-48"
                            >
                              <DestinationImageWithFallback
                                src={img.imageUrl}
                                alt={img.name}
                              />
                              {img.description && (
                                <p className="text-xs text-gray-600 p-2 bg-gray-50 absolute bottom-0 left-0 right-0 bg-white/90">
                                  {img.description}
                                </p>
                              )}
                            </div>
                          ),
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

          {/* Destination Details Card - Mobile & Tablet */}
          {selectedDestination && (
            <div className="lg:hidden mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-4 sm:p-6 relative">
                {/* Close button */}
                <button
                  onClick={handleCloseDestination}
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

                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedDestination.destinationCategories.map(
                    (category, index) => {
                      const catColor = getCategoryColor(category);
                      const catHoverColor = getCategoryHoverColor(category);

                      return (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white cursor-pointer transition-all duration-200"
                          style={{
                            backgroundColor: catColor,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              catHoverColor;
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = catColor;
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(category);
                          }}
                        >
                          {category}
                        </span>
                      );
                    },
                  )}
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
                            className="rounded-lg overflow-hidden shadow-md relative h-48 sm:h-56"
                          >
                            <DestinationImageWithFallback
                              src={img.imageUrl}
                              alt={img.name}
                            />
                            {img.description && (
                              <p className="text-xs text-gray-600 p-2 bg-gray-50 absolute bottom-0 left-0 right-0 bg-white/90">
                                {img.description}
                              </p>
                            )}
                          </div>
                        ),
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
