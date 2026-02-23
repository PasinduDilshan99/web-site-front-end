// components/VillasSection.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  VillaSectionApiResponse,
  VillaSectionVilla,
} from "@/types/accommodations-types/villa-types";
import { GET_VILLA_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "../common-components/loading/Loading";
import { ErrorState } from "../common-components/error-state/ErrorState";
import SectionHeader from "../common-components/section-header/SectionHeader";
import VillaSectionCard from "./villa-components/VillaSectionCard";
import AnimatedButton from "../common-components/buttons/AnimatedButton";
import { useRouter } from "next/navigation";
import VillasSectionLoading from "./loadings/VillasSectionLoading";

const VillasSection = () => {
  const [villas, setVillas] = useState<VillaSectionVilla[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_VILLA_DETAILS_SECTION_FE);
        const data: VillaSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch villas");
        }

        setVillas(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchVillas();
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

  const displayedVillas = villas.slice(0, visibleCount);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <VillasSectionLoading visibleCount={visibleCount} />;
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#1B4D3E] via-[#2E6B5C] to-[#428577]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Luxury Villas"
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
    <section className="bg-gradient-to-br from-[#E8F3EF] via-[#F0F9F5] to-[#D9ECE5] relative overflow-hidden">
      {/* Decorative Elements - Nature-inspired */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#1B4D3E]/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#428577]/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>

      {/* Leaf pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="leaf-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 10 Q40 10 45 20 Q50 30 40 40 Q30 50 20 40 Q10 30 20 20 Q25 10 30 10"
                fill="none"
                stroke="#1B4D3E"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#leaf-pattern)"
          />
        </svg>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Header with Nature-Inspired Styling */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <SectionHeader
            subtitle="EXCLUSIVE PRIVATE COLLECTION"
            title="Luxury Villas"
            description="Experience unparalleled privacy and natural luxury in our handpicked villa collection, nestled in the world's most breathtaking locations"
            fromColor="#1B4D3E"
            toColor="#428577"
          />

          {/* Natural Elements */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#1B4D3E] to-transparent"></span>
            <span className="text-[#1B4D3E] text-xs tracking-[0.3em]">
              NATURE • PRIVACY • LUXURY
            </span>
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#1B4D3E] to-transparent"></span>
          </div>
        </div>

        {/* Villas Grid */}
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
          {displayedVillas.map((villa) => (
            <VillaSectionCard key={villa.villaId} villa={villa} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20">
          <AnimatedButton
            onClick={() => router.push("/accommodations/villas")}
            className="bg-gradient-to-r from-[#1B4D3E] to-[#428577] hover:from-[#0F3A2E] hover:to-[#2E6B5C] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#428577]/30"
          >
            Explore All Villas
          </AnimatedButton>
        </div>

        {/* Empty State */}
        {villas.length === 0 && (
          <div className="text-center py-16 bg-white/30 backdrop-blur-sm rounded-3xl border border-[#1B4D3E]/20">
            <div className="text-7xl mb-6 opacity-50">🏡</div>
            <h3 className="text-2xl font-bold text-[#1B4D3E] mb-4">
              No Villas Available
            </h3>
            <p className="text-[#2E6B5C] text-lg max-w-md mx-auto">
              Our luxury villa collection is currently being updated. Please
              check back soon for exclusive private retreats.
            </p>
          </div>
        )}

        {/* Trust Indicators */}
        {villas.length > 0 && (
          <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-[#1B4D3E]/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#1B4D3E] rounded-full"></div>
              <span className="text-sm text-[#1B4D3E]/70">
                Private Pool Villas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#2E6B5C] rounded-full"></div>
              <span className="text-sm text-[#1B4D3E]/70">
                Personal Concierge
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#428577] rounded-full"></div>
              <span className="text-sm text-[#1B4D3E]/70">
                Eco-Luxury Certified
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VillasSection;
