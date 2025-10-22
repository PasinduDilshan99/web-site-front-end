// components/TourMapContainer.tsx
"use client";
import { useState, useEffect } from "react";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import TourControls from "./TourControls";
import TestMap from "./TestMap";
import SectionHeader from "@/components/common-components/section-header/SectionHeader";

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

interface TourMapContainerProps {
  tourId: number;
}

const API_BASE_URL = "http://localhost:8080/felicita/v0/api";

export default function TourMapContainer({ tourId }: TourMapContainerProps) {
  const [returnToStart, setReturnToStart] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => fetchTourData(tourId)} />;
  }

  if (locations.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-gray-50">
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 mx-auto">
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle=""
            title="Advanced Trip Planner"
            description="Explore destinations with detailed information and image galleries"
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        <TourControls
          returnToStart={returnToStart}
          onReturnToStartChange={setReturnToStart}
          locations={locations}
        />

        <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm p-0.5 sm:p-1">
          <TestMap locations={locations} returnToStart={returnToStart} />
        </div>
      </div>
    </div>
  );
}
