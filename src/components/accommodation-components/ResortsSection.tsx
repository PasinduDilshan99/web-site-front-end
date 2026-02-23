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
import ResortsSectionLoading from "./loadings/ResortsSectionLoading";

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
    return <ResortsSectionLoading visibleCount={visibleCount} />;
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#0A2F44] via-[#144A5E] to-[#1F5F72]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Unable to Load Exclusive Resorts"
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
    <section className="bg-gradient-to-br from-[#E6F0F5] via-[#F0F7FA] to-[#D9E9F0] relative overflow-hidden">
      {/* Deep Ocean-Inspired Decorative Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0A2F44]/5 rounded-full -ml-64 -mt-64 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1F5F72]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#0A2F44]/3 to-[#1F5F72]/3 rounded-full blur-3xl"></div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="wave-pattern"
              x="0"
              y="0"
              width="100"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 Q25 10 50 20 T100 20 T150 20 T200 20"
                stroke="#0A2F44"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M0 30 Q25 20 50 30 T100 30 T150 30 T200 30"
                stroke="#144A5E"
                fill="none"
                strokeWidth="1"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#wave-pattern)"
          />
        </svg>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Header with Ocean-Inspired Styling */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <SectionHeader
            subtitle="THE ULTIMATE ESCAPE"
            title="Luxury Resorts"
            description="Discover world-class resorts where deep waters meet unparalleled luxury. Experience exclusive amenities, fine dining, and unforgettable moments in the world's most coveted destinations."
            fromColor="#0A2F44"
            toColor="#1F5F72"
          />

          {/* Ocean Depth Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#0A2F44] to-transparent"></span>
            <span className="text-[#0A2F44] text-xs tracking-[0.3em]">
              DEPTH • MYSTERY • EXCLUSIVITY
            </span>
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#0A2F44] to-transparent"></span>
          </div>
        </div>

        {/* Resorts Grid */}
        <div
          className={`
          grid gap-8
          grid-cols-1           /* Mobile: 1 column */
          sm:grid-cols-2        /* Small: 2 columns */
          lg:grid-cols-3        /* Laptop: 3 columns */
          xl:grid-cols-3        /* PC: 3 columns */
          2xl:grid-cols-4       /* Extra large: 4 columns */
        `}
        >
          {displayedResorts.map((resort) => (
            <ResortSectionCard key={resort.resortId} resort={resort} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20">
          <AnimatedButton
            onClick={() => router.push("/accommodations/resorts")}
            className="bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] hover:from-[#052230] hover:to-[#144A5E] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#1F5F72]/30"
          >
            Explore All Resorts
          </AnimatedButton>
        </div>

        {/* Empty State */}
        {resorts.length === 0 && (
          <div className="text-center py-16 bg-white/30 backdrop-blur-sm rounded-3xl border border-[#0A2F44]/20">
            <div className="text-7xl mb-6 opacity-50">🏝️</div>
            <h3 className="text-2xl font-bold text-[#0A2F44] mb-4">
              No Resorts Available
            </h3>
            <p className="text-[#144A5E] text-lg max-w-md mx-auto">
              Our exclusive resort collection is being curated with new
              destinations. Check back soon for unparalleled resort experiences.
            </p>
          </div>
        )}

        {/* Trust Indicators - Ocean Theme */}
        {resorts.length > 0 && (
          <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-[#0A2F44]/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0A2F44] rounded-full"></div>
              <span className="text-sm text-[#0A2F44]/70">
                Private Beach Access
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#144A5E] rounded-full"></div>
              <span className="text-sm text-[#0A2F44]/70">
                Overwater Villas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#1F5F72] rounded-full"></div>
              <span className="text-sm text-[#0A2F44]/70">Butler Service</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResortsSection;
