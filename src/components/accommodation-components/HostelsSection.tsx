// components/HostelsSection.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  HostelSectionApiResponse,
  HostelSectionHostel,
} from "@/types/accommodations-types/hostel-types";
import { GET_HOSTEL_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import Loading from "../common-components/loading/Loading";
import { ErrorState } from "../common-components/error-state/ErrorState";
import SectionHeader from "../common-components/section-header/SectionHeader";
import HostelSectionCard from "./hostel-components/HostelSectionCard";
import AnimatedButton from "../common-components/buttons/AnimatedButton";
import { useRouter } from "next/navigation";
import HostelsSectionLoading from "./loadings/HostelsSectionLoading";

const HostelsSection = () => {
  const [hostels, setHostels] = useState<HostelSectionHostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_HOSTEL_DETAILS_SECTION_FE);
        const data: HostelSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch hostels");
        }

        setHostels(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
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

  const displayedHostels = hostels.slice(0, visibleCount);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <HostelsSectionLoading visibleCount={visibleCount} />;
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#B5E5D4] via-[#C9EFE3] to-[#DDF9F2]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Hostels"
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
    <section className="bg-gradient-to-br from-[#F5FDFA] via-[#FAFFFD] to-[#F0FAF5] relative overflow-hidden">
      {/* Fresh Air Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#B5E5D4]/30 rounded-full -ml-36 -mt-36 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DDF9F2]/40 rounded-full -mr-48 -mb-48 blur-3xl"></div>

      {/* Bubbles Pattern Overlay - Social & Airy */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="bubbles-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="3" fill="#B5E5D4" />
              <circle cx="30" cy="20" r="4" fill="#C9EFE3" />
              <circle cx="20" cy="30" r="2" fill="#DDF9F2" />
              <circle cx="35" cy="35" r="3" fill="#B5E5D4" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#bubbles-pattern)"
          />
        </svg>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Header with Fresh & Social Styling */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-12 lg:mb-16">
          <SectionHeader
            subtitle="FRESH • CLEAN • SOCIAL"
            title="Adventure Hostels"
            description="Discover clean, airy, and social accommodations perfect for travelers, backpackers, and adventure seekers looking for fresh experiences"
            fromColor="#B5E5D4"
            toColor="#DDF9F2"
          />

          {/* Fresh Elements */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="w-8 h-8 rounded-full bg-[#B5E5D4]/20 flex items-center justify-center">
              <span className="w-2 h-2 bg-[#B5E5D4] rounded-full"></span>
            </span>
            <span className="text-[#7ABFA5] text-xs tracking-wider">
              MEET • STAY • EXPLORE
            </span>
            <span className="w-8 h-8 rounded-full bg-[#DDF9F2]/20 flex items-center justify-center">
              <span className="w-2 h-2 bg-[#DDF9F2] rounded-full"></span>
            </span>
          </div>
        </div>

        {/* Hostels Grid */}
        <div
          className={`
          grid gap-5
          grid-cols-1           /* Mobile: 1 column */
          sm:grid-cols-2        /* Small: 2 columns */
          lg:grid-cols-3        /* Laptop: 3 columns */
          xl:grid-cols-3        /* PC: 3 columns */
          2xl:grid-cols-4       /* Extra large: 4 columns */
        `}
        >
          {displayedHostels.map((hostel) => (
            <HostelSectionCard key={hostel.hostelId} hostel={hostel} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16">
          <AnimatedButton
            onClick={() => router.push("/accommodations/hostels")}
            className="bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] hover:from-[#9FD4C0] hover:to-[#C9EFE3] text-[#2D4F43] shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-[#B5E5D4] font-medium"
          >
            Find Your Hostel
          </AnimatedButton>
        </div>

        {/* Empty State */}
        {hostels.length === 0 && (
          <div className="text-center py-16 bg-white/40 backdrop-blur-sm rounded-3xl border border-[#B5E5D4]/30">
            <div className="text-7xl mb-6 opacity-60">🏕️</div>
            <h3 className="text-2xl font-bold text-[#2D4F43] mb-4">
              No Hostels Available
            </h3>
            <p className="text-[#5A8F7A] text-lg max-w-md mx-auto">
              Our fresh hostel collection is being updated with new social
              spaces. Check back soon for amazing budget-friendly stays with
              great vibes.
            </p>
          </div>
        )}

        {/* Social Trust Indicators */}
        {hostels.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-[#B5E5D4]/30">
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#B5E5D4] rounded-full"></div>
              <span className="text-sm text-[#2D4F43]">Free WiFi</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#C9EFE3] rounded-full"></div>
              <span className="text-sm text-[#2D4F43]">Common Areas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#DDF9F2] rounded-full"></div>
              <span className="text-sm text-[#2D4F43]">Social Events</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#B5E5D4] rounded-full"></div>
              <span className="text-sm text-[#2D4F43]">Shared Kitchens</span>
            </div>
          </div>
        )}

        {/* Budget-Friendly Note */}
        {hostels.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-[#5A8F7A] flex items-center justify-center gap-2">
              <span>✨</span>
              Starting from just $15/night • No booking fees • Free cancellation
              <span>✨</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HostelsSection;
