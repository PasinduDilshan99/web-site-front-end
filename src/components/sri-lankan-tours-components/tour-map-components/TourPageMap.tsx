"use client";
import { useEffect, useRef, useState } from "react";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

type Image = {
  id: number;
  url: string;
  name: string;
  description?: string;
};

type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  images: Image[];
};

type ApiResponse = {
  code: number;
  status: string;
  message: string;
  data: Location[];
  timestamp: string;
};

type RouteResponse = {
  routes: Array<{
    geometry: {
      coordinates: [number, number][];
    };
    distance: number;
    duration: number;
  }>;
  waypoints: Array<{
    location: [number, number];
    name: string;
  }>;
};

const MAP_CONFIG = {
  tileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  routeStyle: { color: "#3b82f6", weight: 5, opacity: 0.7 },
  returnRouteStyle: {
    color: "#ef4444",
    weight: 5,
    opacity: 0.7,
    dashArray: "5, 10",
  },
  boundsPadding: [50, 50] as [number, number],
};

// Configuration
const API_BASE_URL = "http://localhost:8080/felicita/v0/api";
const ROUTING_API_URL = "https://router.project-osrm.org/route/v1/driving";
const DEFAULT_TOUR_ID = 1;

function TestMap({
  locations,
  returnToStart = false,
}: {
  locations: Location[];
  returnToStart?: boolean;
}) {
  const mapRef = useRef<LeafletMap | null>(null);
  const routesRef = useRef<L.Polyline[]>([]);

  // Function to get route from OSRM
  const getRoute = async (waypoints: L.LatLng[]): Promise<L.LatLng[]> => {
    if (waypoints.length < 2) return waypoints;

    try {
      const coordinates = waypoints
        .map((point) => `${point.lng},${point.lat}`)
        .join(";");

      const response = await fetch(
        `${ROUTING_API_URL}/${coordinates}?overview=full&geometries=geojson`
      );

      if (!response.ok) {
        throw new Error(`Routing API error: ${response.status}`);
      }

      const data: RouteResponse = await response.json();

      if (data.routes && data.routes.length > 0) {
        // Convert GeoJSON coordinates to LatLng array
        return data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => new L.LatLng(lat, lng)
        );
      } else {
        throw new Error("No route found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      // Fallback to straight line if routing fails
      return waypoints;
    }
  };

  // Function to draw route on map
  const drawRoute = async (
    map: LeafletMap,
    waypoints: L.LatLng[],
    style: any
  ) => {
    try {
      const routePoints = await getRoute(waypoints);
      const polyline = L.polyline(routePoints, style).addTo(map);
      routesRef.current.push(polyline);
      return polyline;
    } catch (error) {
      console.error("Error drawing route:", error);
      // Fallback to straight line
      const polyline = L.polyline(waypoints, {
        ...style,
        dashArray: "5,5",
      }).addTo(map);
      routesRef.current.push(polyline);
      return polyline;
    }
  };

  useEffect(() => {
    if (!locations || locations.length < 2) return;

    mapRef.current = L.map("map");
    const map = mapRef.current;

    L.tileLayer(MAP_CONFIG.tileLayer, {
      attribution: MAP_CONFIG.attribution,
    }).addTo(map);

    const bounds: L.LatLngExpression[] = [];
    locations.forEach((location, index) => {
      createPhotoMarker(map, location, index, locations.length);
      bounds.push([location.lat, location.lng]);
    });

    // Draw main route
    if (locations.length >= 2) {
      const waypoints = locations.map((loc) => L.latLng(loc.lat, loc.lng));
      drawRoute(map, waypoints, MAP_CONFIG.routeStyle);
    }

    // Draw return route if enabled
    if (returnToStart && locations.length >= 2) {
      const returnWaypoints = [
        L.latLng(
          locations[locations.length - 1].lat,
          locations[locations.length - 1].lng
        ),
        L.latLng(locations[0].lat, locations[0].lng),
      ];
      drawRoute(map, returnWaypoints, MAP_CONFIG.returnRouteStyle);
    }

    map.fitBounds(bounds, { padding: MAP_CONFIG.boundsPadding });

    return () => {
      // Clean up routes
      routesRef.current.forEach((route) => {
        if (map.hasLayer(route)) {
          map.removeLayer(route);
        }
      });
      routesRef.current = [];

      map.remove();
      mapRef.current = null;
    };
  }, [locations, returnToStart]);

  return (
    <div
      id="map"
      className="h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] w-full rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    />
  );
}

// The rest of your code remains the same...
function createPhotoMarker(
  map: LeafletMap,
  location: Location,
  index: number,
  totalLocations: number
) {
  const isStart = index === 0;
  const isEnd = index === totalLocations - 1;

  const getMarkerBadge = () => {
    if (isStart)
      return `<div class="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">START</div>`;
    if (isEnd)
      return `<div class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">END</div>`;
    return `<div class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">${
      index + 1
    }</div>`;
  };

  const markerImage = location.images[0]?.url || "/placeholder-image.jpg";

  const iconHtml = `
    <div class="relative w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white shadow-lg transition-transform duration-200 hover:scale-105">
      <img src="${markerImage}" alt="${
    location.name
  }" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'" />
      ${getMarkerBadge()}
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: "custom-photo-icon",
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });

  const marker = L.marker([location.lat, location.lng], {
    icon: customIcon,
  }).addTo(map);
  const popupContent = createPopupContent(location, index, totalLocations);
  const popup = L.popup({
    maxWidth: 400,
    className: "custom-popup",
  }).setContent(popupContent);

  marker.bindPopup(popup);
  marker.on("popupopen", () => initializeCarousel(location.id.toString()));

  return marker;
}

function createPopupContent(
  location: Location,
  index: number,
  totalLocations: number
) {
  const isStart = index === 0;
  const isEnd = index === totalLocations - 1;
  const carouselId = `carousel-${location.id}`;
  const hasMultipleImages = location.images.length > 1;

  const carouselStyles = `
    <style>
      .carousel-item { display: none; transition: opacity 0.7s ease-in-out; }
      .carousel-item.active { display: block; }
      .carousel-indicator { width: 10px; height: 10px; border-radius: 50%; cursor: pointer; transition: background-color 0.3s ease; }
      .carousel-indicator.active { background-color: #2563eb; }
      .carousel-control { position: absolute; top: 0; bottom: 0; display: flex; align-items: center; justify-content: center; width: 32px; cursor: pointer; transition: background-color 0.3s ease; z-index: 40; }
      .carousel-control:hover { background-color: rgba(255, 255, 255, 0.2); }
      .carousel-control.prev { left: 0; }
      .carousel-control.next { right: 0; }
      .carousel-image { position: absolute; width: 100%; height: 200px; object-fit: cover; border-radius: 8px; }
      @media (min-width: 640px) { .carousel-image { height: 240px; } }
      .carousel-caption { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); padding: 12px; border-radius: 0 0 8px 8px; z-index: 30; }
      .carousel-indicators-container { position: absolute; z-index: 30; display: flex; gap: 6px; bottom: 12px; left: 50%; transform: translateX(-50%); }
    </style>
  `;

  const carouselIndicators = location.images
    .map(
      (_, imgIndex) => `
    <button type="button" class="carousel-indicator ${
      imgIndex === 0 ? "active bg-blue-600" : "bg-gray-300"
    }" data-carousel-index="${imgIndex}"></button>
  `
    )
    .join("");

  const carouselItems = location.images
    .map(
      (image, imgIndex) => `
    <div class="carousel-item ${
      imgIndex === 0 ? "active" : ""
    }" data-carousel-item="${imgIndex}">
      <img src="${image.url}" class="carousel-image" alt="${
        image.name
      }" onerror="this.src='https://via.placeholder.com/400x240?text=Image+Not+Found'">
      <div class="carousel-caption">
        <h4 class="text-white font-semibold text-xs sm:text-sm">${
          image.name
        }</h4>
        ${
          image.description
            ? `<p class="text-white/80 text-xs mt-1 hidden sm:block">${image.description}</p>`
            : ""
        }
      </div>
    </div>
  `
    )
    .join("");

  const carouselControls = hasMultipleImages
    ? `
    <div class="carousel-control prev" data-carousel-prev>
      <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/30 hover:bg-white/50">
        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </span>
    </div>
    <div class="carousel-control next" data-carousel-next>
      <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/30 hover:bg-white/50">
        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </span>
    </div>
  `
    : "";

  return `
    ${carouselStyles}
    <div class="w-72 sm:w-80 md:w-96 bg-white rounded-lg sm:rounded-xl shadow-xl overflow-hidden" data-location-id="${
      location.id
    }">
      <div id="${carouselId}" class="relative overflow-hidden rounded-t-lg sm:rounded-t-xl">
        <div class="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          ${carouselItems}
        </div>
        ${carouselControls}
        ${
          hasMultipleImages
            ? `<div class="carousel-indicators-container">${carouselIndicators}</div>`
            : ""
        }
      </div>
      <div class="p-3 sm:p-4">
        <div class="flex items-start justify-between mb-2 sm:mb-3">
          <div class="flex-1">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800">${
              location.name
            }</h3>
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
              ${
                isStart
                  ? '<span class="bg-green-100 text-green-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">🚩 Start</span>'
                  : ""
              }
              ${
                isEnd
                  ? '<span class="bg-red-100 text-red-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">🏁 End</span>'
                  : ""
              }
              ${
                !isStart && !isEnd
                  ? `<span class="bg-blue-100 text-blue-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">📍 Stop ${
                      index + 1
                    }</span>`
                  : ""
              }
            </div>
          </div>
          <span class="text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-1 rounded whitespace-nowrap ml-2">ID: ${
            location.id
          }</span>
        </div>
        ${
          location.description
            ? `<div class="mb-3 sm:mb-4"><p class="text-gray-600 text-xs sm:text-sm leading-relaxed">${location.description}</p></div>`
            : ""
        }
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-500 border-t border-gray-100 pt-2 sm:pt-3">
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            ${location.images.length} ${
    location.images.length === 1 ? "image" : "images"
  }
          </span>
          <span class="text-xs bg-gray-100 px-1.5 sm:px-2 py-1 rounded">
            ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  `;
}

function initializeCarousel(locationId: string) {
  const carouselId = `carousel-${locationId}`;
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const items = carousel.querySelectorAll("[data-carousel-item]");
  const indicators = carousel.querySelectorAll("[data-carousel-index]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  let currentIndex = 0;

  const switchCarouselImage = (index: number) => {
    items.forEach((item) => item.classList.remove("active"));
    indicators.forEach((indicator) => {
      indicator.classList.remove("active", "bg-blue-600");
      indicator.classList.add("bg-gray-300");
    });
    items[index].classList.add("active");
    indicators[index].classList.add("active", "bg-blue-600");
    indicators[index].classList.remove("bg-gray-300");
    currentIndex = index;
  };

  const nextCarouselImage = () =>
    switchCarouselImage((currentIndex + 1) % items.length);
  const prevCarouselImage = () =>
    switchCarouselImage((currentIndex - 1 + items.length) % items.length);

  if (prevButton) prevButton.addEventListener("click", prevCarouselImage);
  if (nextButton) nextButton.addEventListener("click", nextCarouselImage);
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => switchCarouselImage(index));
  });

  switchCarouselImage(0);
}

export default function TourPageMap() {
  const [returnToStart, setReturnToStart] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tourId, setTourId] = useState(DEFAULT_TOUR_ID);

  const fetchTourData = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/tour/tour-map/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (result.code === 200 && result.data) {
        setLocations(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch tour data");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching tour data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTourData(tourId);
  }, [tourId]);

  const handleTourIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setTourId(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
            🗺️ Advanced Trip Planner
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Explore destinations with detailed information and image galleries
          </p>

          {/* Tour ID Input */}
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <label className="text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap">
                Tour ID:
              </label>
              <input
                type="number"
                min="1"
                value={tourId}
                onChange={handleTourIdChange}
                className="w-20 sm:w-24 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <button
                onClick={() => fetchTourData(tourId)}
                disabled={loading}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base font-medium transition-colors"
              >
                {loading ? "Loading..." : "Load Tour"}
              </button>
            </div>
          </div>

          {/* Return to Start Toggle */}
          {locations.length > 0 && (
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={returnToStart}
                    onChange={(e) => setReturnToStart(e.target.checked)}
                  />
                  <div
                    className={`block w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors duration-200 ${
                      returnToStart ? "bg-red-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform duration-200 ${
                      returnToStart
                        ? "transform translate-x-5 sm:translate-x-6"
                        : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-700 font-medium">
                  Include Return Journey
                </div>
              </label>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-0.5 sm:w-4 sm:h-1 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">Forward Journey</span>
                </div>
                {returnToStart && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div
                      className="w-3 h-0.5 sm:w-4 sm:h-1 bg-red-500 rounded border border-red-300"
                      style={{ borderStyle: "dashed" }}
                    ></div>
                    <span className="text-gray-600">Return Journey</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm p-8 sm:p-12 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">
              Loading tour data...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-red-800 font-semibold text-sm sm:text-base mb-1">
                  Error Loading Tour
                </h3>
                <p className="text-red-600 text-xs sm:text-sm">{error}</p>
                <button
                  onClick={() => fetchTourData(tourId)}
                  className="mt-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-xs sm:text-sm font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Map */}
        {!loading && !error && locations.length > 0 && (
          <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm p-0.5 sm:p-1">
            <TestMap locations={locations} returnToStart={returnToStart} />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && locations.length === 0 && (
          <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm p-8 sm:p-12 text-center">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              No Locations Found
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Try a different tour ID to explore destinations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
