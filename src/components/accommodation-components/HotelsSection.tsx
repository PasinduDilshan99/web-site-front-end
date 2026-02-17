// components/HotelsSection.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  HotelSectionApiResponse,
  HotelSectionHotel,
} from "@/types/accommodations-types/hotel-types";
import { GET_HOTEL_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";
import HotelSectionCard from "./hotels-components/HotelSectionCard";
import Loading from "../common-components/loading/Loading";
import { ErrorState } from "../common-components/error-state/ErrorState";
import SectionHeader from "../common-components/section-header/SectionHeader";
import AnimatedButton from "../common-components/buttons/AnimatedButton";
import { useRouter } from "next/navigation";
import HotelsSectionLoading from "./loadings/HotelsSectionLoading";

const HotelsSection = () => {
  const [hotels, setHotels] = useState<HotelSectionHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_HOTEL_DETAILS_SECTION_FE);
        const data: HotelSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch hotels");
        }

        setHotels(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
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

  const displayedHotels = hotels.slice(0, visibleCount);

  const handleRetry = () => {
    setLoading(true);
  };

  if (loading) {
    return <HotelsSectionLoading visibleCount={visibleCount} />;
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#2A6F97] via-[#3F8AB2] to-[#54A5CC]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load activities"
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
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-[#F0F7FF] via-[#E6F0FA] to-[#D9E9F5]">
      {/* Header */}
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <SectionHeader
          subtitle="LUXURY ACCOMMODATIONS"
          title="Featured Hotels"
          description="Discover the perfect stay for your next adventure with our curated collection of premium hotels"
          fromColor="#2A6F97"
          toColor="#54A5CC"
        />
      </div>

      {/* Hotels Grid */}
      <div
        className={`
        grid gap-8          /* Increased gap for luxury feel */
        grid-cols-1         /* Mobile: 1 column */
        sm:grid-cols-2      /* Small: 2 columns */
        lg:grid-cols-3      /* Laptop: 3 columns */
        xl:grid-cols-3      /* PC: 4 columns */
        2xl:grid-cols-4     /* Extra large: 5 columns */
      `}
      >
        {displayedHotels.map((hotel) => (
          <HotelSectionCard key={hotel.hotelId} hotel={hotel} />
        ))}
      </div>

      {/* Show More Button (if there are more hotels) */}
      <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20">
        <AnimatedButton
          onClick={() => router.push("/accommodations/hotels")}
          className="bg-[#2A6F97] hover:bg-[#1D4F6E] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View All Hotels
        </AnimatedButton>
      </div>

      {/* Empty State */}
      {hotels.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[#2A6F97] text-6xl mb-4 opacity-50">🏨</div>
          <p className="text-[#1D4F6E] text-lg font-medium">
            No hotels available at the moment.
          </p>
          <p className="text-[#3F8AB2] text-sm mt-2">
            Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default HotelsSection;
