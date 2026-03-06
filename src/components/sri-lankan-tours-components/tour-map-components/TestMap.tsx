// components/TestMap.tsx
"use client";
import { useEffect, useRef, useCallback } from "react";
import L, { Map as LeafletMap, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { createPhotoMarker, createAirportMarker } from "./map-utils";
import { TourMapLocation } from "@/types/tour-map-types";

// Katunayake (Bandaranaike International Airport) coordinates
const KATUNAYAKE_AIRPORT: Readonly<{ lat: number; lng: number; name: string }> =
  {
    lat: 7.1808,
    lng: 79.8842,
    name: "Bandaranaike International Airport (Katunayake)",
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
  airportRouteStyle: { color: "#8b5cf6", weight: 5, opacity: 0.7 },
  airportReturnRouteStyle: {
    color: "#f59e0b",
    weight: 5,
    opacity: 0.7,
    dashArray: "5, 10",
  },
  boundsPadding: [50, 50] as [number, number],
};

const ROUTING_API_URL = "https://router.project-osrm.org/route/v1/driving";

interface TestMapProps {
  locations: TourMapLocation[];
  returnToStart?: boolean;
}

interface RouteStyle {
  color: string;
  weight: number;
  opacity: number;
  dashArray?: string;
}

interface OSRMRouteResponse {
  routes: Array<{
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
  }>;
}

export default function TestMap({
  locations,
  returnToStart = false,
}: TestMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const routesRef = useRef<L.Polyline[]>([]);

  const getRoute = useCallback(
    async (waypoints: L.LatLng[]): Promise<L.LatLng[]> => {
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

        const data: OSRMRouteResponse = await response.json();

        if (data.routes && data.routes.length > 0) {
          return data.routes[0].geometry.coordinates.map(
            ([lng, lat]: [number, number]) => new L.LatLng(lat, lng)
          );
        } else {
          throw new Error("No route found");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        return waypoints;
      }
    },
    []
  );

  const drawRoute = useCallback(
    async (map: LeafletMap, waypoints: L.LatLng[], style: RouteStyle) => {
      try {
        const routePoints = await getRoute(waypoints);

        // Guard: map may have been removed while the async fetch was in flight
        if (!mapRef.current) return undefined;

        const polyline = L.polyline(routePoints, style).addTo(map);
        routesRef.current.push(polyline);
        return polyline;
      } catch (error) {
        console.error("Error drawing route:", error);

        if (!mapRef.current) return undefined;

        const fallbackStyle: L.PolylineOptions = {
          ...style,
          dashArray: "5,5",
        };
        const polyline = L.polyline(waypoints, fallbackStyle).addTo(map);
        routesRef.current.push(polyline);
        return polyline;
      }
    },
    [getRoute]
  );

  useEffect(() => {
    if (!locations || locations.length < 1) return;

    let isMounted = true;

    mapRef.current = L.map("map");
    const map = mapRef.current;

    L.tileLayer(MAP_CONFIG.tileLayer, {
      attribution: MAP_CONFIG.attribution,
    }).addTo(map);

    const markers: L.Marker[] = [];

    // Add airport marker (start/end)
    const airportMarker = createAirportMarker(map, KATUNAYAKE_AIRPORT);
    if (airportMarker) markers.push(airportMarker);

    // Add tour location markers
    locations.forEach((location, index) => {
      const marker = createPhotoMarker(map, location, index, locations.length);
      if (marker) markers.push(marker);
    });

    const airportLatLng = L.latLng(
      KATUNAYAKE_AIRPORT.lat,
      KATUNAYAKE_AIRPORT.lng
    );

    if (locations.length >= 1) {
      const outboundWaypoints: L.LatLng[] = [
        airportLatLng,
        ...locations.map((loc) => L.latLng(loc.lat, loc.lng)),
      ];
      if (isMounted) drawRoute(map, outboundWaypoints, MAP_CONFIG.routeStyle);
    }

    if (returnToStart && locations.length >= 1) {
      const returnWaypoints: L.LatLng[] = [
        L.latLng(
          locations[locations.length - 1].lat,
          locations[locations.length - 1].lng
        ),
        airportLatLng,
      ];
      if (isMounted)
        drawRoute(map, returnWaypoints, MAP_CONFIG.returnRouteStyle);
    }

    // Fit bounds to include all locations + airport
    const allPoints: LatLngTuple[] = [
      [KATUNAYAKE_AIRPORT.lat, KATUNAYAKE_AIRPORT.lng],
      ...locations.map((loc): LatLngTuple => [loc.lat, loc.lng]),
    ];
    const bounds = L.latLngBounds(allPoints);
    map.fitBounds(bounds, { padding: MAP_CONFIG.boundsPadding });

    return () => {
      isMounted = false;

      routesRef.current.forEach((route) => {
        if (map.hasLayer(route)) {
          map.removeLayer(route);
        }
      });
      routesRef.current = [];

      markers.forEach((marker) => {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      });

      map.remove();
      mapRef.current = null;
    };
  }, [locations, returnToStart, drawRoute]);

  return (
    <div
      id="map"
      className="h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] w-full rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    />
  );
}