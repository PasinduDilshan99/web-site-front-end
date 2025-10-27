// components/ResortsSection.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  ResortSectionApiResponse,
  ResortSectionResort,
} from "@/types/accommodations-types/resort-types";
import { GET_RESORT_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "../common-components/loading/Loading";
import { ErrorState } from "../common-components/error-state/ErrorState";
import SectionHeader from "../common-components/section-header/SectionHeader";
import ResortSectionCard from "./resort-components/ResortSectionCard";
import AnimatedButton from "../common-components/buttons/AnimatedButton";
import { useRouter } from "next/navigation";

const ResortsSection = () => {
  const [resorts, setResorts] = useState<ResortSectionResort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_RESORT_DETAILS_SECTION_FE);
        const data: ResortSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch resorts");
        }

        setResorts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, []);

  // Responsive card count handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile
        setVisibleCount(3);
      } else if (width < 1024) {
        // Tablet
        setVisibleCount(4);
      } else if (width < 1280) {
        // Laptop
        setVisibleCount(6); // 3x2 grid
      } else if (width < 1536) {
        // PC
        setVisibleCount(8); // 4x2 grid
      } else {
        // Extra large screens
        setVisibleCount(10); // 5x2 grid
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedResorts = resorts.slice(0, visibleCount);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading message="Loading luxury resorts..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-cyan-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Resorts"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-cyan-50 via-purple-50 to-amber-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <SectionHeader
            subtitle="All-Inclusive Experience"
            title="Luxury Resorts"
            description="Discover world-class resorts with premium amenities, fine dining, and unforgettable experiences"
            fromColor="#06B6D4"
            toColor="#A855F7"
          />
        </div>

        {/* Resorts Grid */}
        <div className={`
          grid gap-8
          grid-cols-1           /* Mobile: 1 column */
          sm:grid-cols-2        /* Small: 2 columns */
          lg:grid-cols-3        /* Laptop: 3 columns */
          xl:grid-cols-3        /* PC: 4 columns */
          2xl:grid-cols-4       /* Extra large: 5 columns */
        `}>
          {displayedResorts.map((resort) => (
            <ResortSectionCard key={resort.resortId} resort={resort} />
          ))}
        </div>

        {/* Show More Button */}
      <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
        <AnimatedButton onClick={() => router.push("/accommodations/resorts")}>
          View All Resorts
        </AnimatedButton>
      </div>

        {/* Empty State */}
        {resorts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🏝️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Resorts Available
            </h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Our luxury resort collection is being updated with new destinations. Check back soon for amazing resort experiences.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResortsSection;