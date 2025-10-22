// components/TestMap.tsx
"use client";
import { useEffect, useRef } from "react";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { createPhotoMarker } from "./map-utils";

type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  images: Image[];
};

type Image = {
  id: number;
  url: string;
  name: string;
  description?: string;
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

const ROUTING_API_URL = "https://router.project-osrm.org/route/v1/driving";

interface TestMapProps {
  locations: Location[];
  returnToStart?: boolean;
}

export default function TestMap({
  locations,
  returnToStart = false,
}: TestMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const routesRef = useRef<L.Polyline[]>([]);

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

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => new L.LatLng(lat, lng)
        );
      } else {
        throw new Error("No route found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      return waypoints;
    }
  };

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

    if (locations.length >= 2) {
      const waypoints = locations.map((loc) => L.latLng(loc.lat, loc.lng));
      drawRoute(map, waypoints, MAP_CONFIG.routeStyle);
    }

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
