"use client";

import { GET_PLAN_YOUR_TRIP_DESTINATIONS_TOURS_FE } from "@/utils/frontEndConstant";
import React, { useState, useEffect, useRef } from "react";

// Type Definitions
interface Location {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description: string;
}

interface Activity {
  id: string;
  destinationId: number;
  name: string;
  description: string;
  category: string;
  availableFrom: string;
  availableTo: string;
  duration: string;
  priceLocal: string;
  priceForeigners: string;
  minParticipate: number;
  maxParticipate: number;
}

interface NearbyLocationsMap {
  [key: number]: number[];
}

interface APIDestination {
  id: number;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
}

interface APIActivity {
  destinationId: number;
  name: string | null;
  description: string | null;
  activitiesCategory: string | null;
  availableFrom: string | null;
  availableTo: string | null;
  durationHours: number | null;
  priceLocal: number | null;
  priceForeigners: number | null;
  minParticipate: number;
  maxParticipate: number;
}

interface APINearbyDestinations {
  destinationId: number;
  nearbyDestinations: number[];
}

interface APIResponse {
  code: number;
  status: string;
  message: string;
  data: {
    planYourTripDestinationDtos: APIDestination[];
    planYourTripActivitiesDtos: APIActivity[];
    planYourTripNearDestinationsDtos: APINearbyDestinations[];
  };
  timestamp: string;
}

declare global {
  interface Window {
    L: any;
    selectLocationFromMap: (locationId: number) => void;
  }
}

const PlanYourTripMap: React.FC = () => {
  // STATE MANAGEMENT
  const [locations, setLocations] = useState<Location[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [nearbyLocationsMap, setNearbyLocationsMap] = useState<NearbyLocationsMap>({});
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [availableLocations, setAvailableLocations] = useState<Location[]>([]);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const currentLocation = selectedLocations[selectedLocations.length - 1];
  const currentLocationActivities = currentLocation
    ? activities.filter((a) => a.destinationId === currentLocation.id)
    : [];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_PLAN_YOUR_TRIP_DESTINATIONS_TOURS_FE);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: APIResponse = await response.json();
        
        if (result.code === 200 && result.data) {
          // Transform destinations data
          const transformedLocations: Location[] = result.data.planYourTripDestinationDtos.map(dest => ({
            id: dest.id,
            name: dest.name,
            category: dest.category.toLowerCase(),
            lat: parseFloat(dest.latitude.toString()),
            lng: parseFloat(dest.longitude.toString()),
            description: dest.description
          }));

          // Transform activities data - filter out null activities
          const transformedActivities: Activity[] = result.data.planYourTripActivitiesDtos
            .filter(act => act.name !== null)
            .map((act, index) => ({
              id: `${act.destinationId}-${index}`,
              destinationId: act.destinationId,
              name: act.name!,
              description: act.description!,
              category: act.activitiesCategory!,
              availableFrom: act.availableFrom!,
              availableTo: act.availableTo!,
              duration: `${act.durationHours} hours`,
              priceLocal: `LKR ${act.priceLocal}`,
              priceForeigners: `USD ${act.priceForeigners}`,
              minParticipate: act.minParticipate,
              maxParticipate: act.maxParticipate
            }));

          // Transform nearby destinations data
          const transformedNearbyMap: NearbyLocationsMap = {};
          result.data.planYourTripNearDestinationsDtos.forEach(item => {
            transformedNearbyMap[item.destinationId] = item.nearbyDestinations;
          });

          setLocations(transformedLocations);
          setActivities(transformedActivities);
          setNearbyLocationsMap(transformedNearbyMap);
          setAvailableLocations(transformedLocations);
          setError(null);
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update available locations based on last selected location
  useEffect(() => {
    if (locations.length === 0) return;

    if (selectedLocations.length === 0) {
      setAvailableLocations(locations);
    } else {
      const lastLocationId = selectedLocations[selectedLocations.length - 1].id;
      const nearbyIds = nearbyLocationsMap[lastLocationId] || [];
      const selectedIds = selectedLocations.map((loc) => loc.id);
      const nearby = locations.filter(
        (loc) => nearbyIds.includes(loc.id) && !selectedIds.includes(loc.id)
      );
      setAvailableLocations(nearby);
    }
  }, [selectedLocations, locations, nearbyLocationsMap]);

  const selectLocation = (location: Location) => {
    setSelectedLocations([...selectedLocations, location]);
  };

  const removeLocation = (locationId: number) => {
    const index = selectedLocations.findIndex((loc) => loc.id === locationId);
    if (index === -1) return;

    const newSelectedLocations = selectedLocations.slice(0, index);
    setSelectedLocations(newSelectedLocations);

    const remainingLocationIds = newSelectedLocations.map((loc) => loc.id);
    const newActivities = selectedActivities.filter((act) =>
      remainingLocationIds.includes(
        activities.find((a) => a.id === act.id)?.destinationId || 0
      )
    );
    setSelectedActivities(newActivities);
  };

  const toggleActivity = (activity: Activity) => {
    const exists = selectedActivities.find((a) => a.id === activity.id);
    if (exists) {
      setSelectedActivities(
        selectedActivities.filter((a) => a.id !== activity.id)
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const isActivitySelected = (activityId: string): boolean => {
    return selectedActivities.some((a) => a.id === activityId);
  };

  // Load Leaflet CSS and JS
  useEffect(() => {
    // Check if Leaflet is already loaded
    if (window.L && mapLoaded) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Initialize map only after Leaflet is loaded and data is ready
  useEffect(() => {
    if (!mapLoaded || !window.L || !mapRef.current || locations.length === 0 || map) return;

    const initMap = () => {
      try {
        const newMap = window.L.map(mapRef.current!).setView([7.8731, 80.7718], 8);

        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(newMap);

        setMap(newMap);
        mapInstanceRef.current = newMap;
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMap, 100);
    return () => clearTimeout(timer);
  }, [mapLoaded, locations, map]);

  // Update markers when available locations change
  useEffect(() => {
    if (!map || !window.L || locations.length === 0) return;

    // Clear existing markers
    markers.forEach((marker) => {
      try {
        map.removeLayer(marker);
      } catch (e) {
        console.error('Error removing marker:', e);
      }
    });

    const createCustomIcon = (isSelected: boolean) => {
      return window.L.divIcon({
        html: `
          <div style="
            background-color: ${isSelected ? "#ef4444" : "#3b82f6"};
            width: ${isSelected ? "30px" : "24px"};
            height: ${isSelected ? "30px" : "24px"};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          "></div>
        `,
        className: "custom-marker",
        iconSize: [isSelected ? 30 : 24, isSelected ? 30 : 24],
        iconAnchor: [isSelected ? 15 : 12, isSelected ? 15 : 12],
      });
    };

    const newMarkers: any[] = [];

    // Add selected location markers
    selectedLocations.forEach((place, index) => {
      const marker = window.L.marker([place.lat, place.lng], {
        icon: createCustomIcon(true),
      }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 8px; max-width: 200px;">
          <div style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; margin-bottom: 6px;">
            Stop ${index + 1}
          </div>
          <h3 style="margin: 0 0 6px 0; font-weight: bold; color: #ef4444;">
            ${place.name}
          </h3>
          <p style="margin: 0; font-size: 13px; color: #666;">
            ${place.description}
          </p>
        </div>
      `);

      newMarkers.push(marker);
    });

    // Add route line if multiple locations selected
    if (selectedLocations.length > 1) {
      const routeCoordinates = selectedLocations.map((loc) => [
        loc.lat,
        loc.lng,
      ] as [number, number]);
      const polyline = window.L.polyline(routeCoordinates, {
        color: "#ef4444",
        weight: 3,
        opacity: 0.7,
        dashArray: "10, 10",
      }).addTo(map);
      newMarkers.push(polyline);
    }

    // Add available location markers
    availableLocations.forEach((place) => {
      const marker = window.L.marker([place.lat, place.lng], {
        icon: createCustomIcon(false),
      }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="margin: 0 0 6px 0; font-weight: bold; color: #3b82f6;">
            ${place.name}
          </h3>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #999;">
            ${place.category}
          </p>
          <p style="margin: 0; font-size: 13px; color: #666;">
            ${place.description}
          </p>
          <button 
            onclick="window.selectLocationFromMap(${place.id})"
            style="
              margin-top: 8px;
              background: #3b82f6;
              color: white;
              border: none;
              padding: 6px 12px;
              border-radius: 4px;
              cursor: pointer;
              width: 100%;
              font-size: 14px;
            "
          >
            Select Location
          </button>
        </div>
      `);

      marker.on("mouseover", function () {
        this.openPopup();
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // Fit map bounds to show all markers
    if (newMarkers.length > 0) {
      const locationMarkers = newMarkers.filter(
        (m) => m instanceof window.L.Marker
      );
      if (locationMarkers.length > 0) {
        try {
          const group = new window.L.featureGroup(locationMarkers);
          map.fitBounds(group.getBounds().pad(0.1));
        } catch (e) {
          console.error('Error fitting bounds:', e);
        }
      }
    }
  }, [map, availableLocations, selectedLocations, locations]);

  // Expose select function to window for popup button
  useEffect(() => {
    if (locations.length === 0) return;

    window.selectLocationFromMap = (locationId: number) => {
      const location = locations.find((loc) => loc.id === locationId);
      if (location) {
        selectLocation(location);
      }
    };

    return () => {
      delete window.selectLocationFromMap;
    };
  }, [selectedLocations, locations]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-700">Loading tour destinations...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Build Your Sri Lanka Tour
          </h1>
          <p className="text-gray-600">
            Select locations and activities to create your perfect itinerary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedLocations.length === 0
                    ? "Step 1: Choose Your Starting Location"
                    : `Step ${
                        selectedLocations.length + 1
                      }: Choose Next Location`}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedLocations.length === 0
                    ? "Click on any blue marker to begin your journey"
                    : availableLocations.length > 0
                    ? "Select from nearby locations (blue markers)"
                    : "No more nearby locations available"}
                </p>
              </div>

              <div
                ref={mapRef}
                className="w-full h-[500px] rounded-lg overflow-hidden bg-gray-100"
                style={{ minHeight: "500px" }}
              >
                {!mapLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-2"></div>
                      <p className="text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                  <span className="text-sm text-gray-600">
                    Available Locations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-red-500 rounded-full border-2 border-white"></div>
                  <span className="text-sm text-gray-600">Selected Route</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activities & Tour Summary */}
          <div className="space-y-6">
            {/* Current Location Activities */}
            {currentLocation && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Activities in {currentLocation.name}
                </h2>
                {currentLocationActivities.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {currentLocationActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          isActivitySelected(activity.id)
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleActivity(activity)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                              {activity.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.description}
                            </p>
                            <div className="flex gap-3 mt-2">
                              <span className="text-xs text-gray-500">
                                ⏱️ {activity.duration}
                              </span>
                              <span className="text-xs text-gray-500">
                                💰 {activity.priceForeigners}
                              </span>
                            </div>
                            <div className="flex gap-3 mt-1">
                              <span className="text-xs text-blue-600">
                                👥 {activity.minParticipate}-{activity.maxParticipate} people
                              </span>
                            </div>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isActivitySelected(activity.id)
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {isActivitySelected(activity.id) && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No activities available for this destination</p>
                  </div>
                )}
              </div>
            )}

            {/* No Location Selected Message */}
            {!currentLocation && selectedLocations.length === 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🗺️</div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Start Planning Your Tour
                </h3>
                <p className="text-sm text-gray-600">
                  Select your first location from the map to see available
                  activities
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Tour Summary */}
        {selectedLocations.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Tour Itinerary
            </h2>

            <div className="space-y-4">
              {selectedLocations.map((location, index) => {
                const locationActivities = selectedActivities.filter(
                  (act) =>
                    activities.find((a) => a.id === act.id)?.destinationId ===
                    location.id
                );

                return (
                  <div
                    key={location.id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded">
                            Day {index + 1}
                          </span>
                          <h3 className="text-lg font-bold text-gray-800">
                            {location.name}
                          </h3>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {location.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {location.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeLocation(location.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    </div>

                    {locationActivities.length > 0 ? (
                      <div className="mt-3 ml-4 space-y-2">
                        <p className="text-sm font-semibold text-gray-700">
                          Selected Activities:
                        </p>
                        {locationActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <span className="text-green-500">✓</span>
                            <span>{activity.name}</span>
                            <span className="text-gray-400">
                              ({activity.duration}, {activity.priceForeigners})
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic mt-2 ml-4">
                        No activities selected yet
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tour Statistics */}
            <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedLocations.length}
                </div>
                <div className="text-sm text-gray-600">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedActivities.length}
                </div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedLocations.length}
                </div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanYourTripMap;