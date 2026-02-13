"use client";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/common-components/loading/Loading";
import SectionHeader from "../../../components/common-components/section-header/SectionHeader";
import AnimatedButton from "../../../components/common-components/buttons/AnimatedButton";
import { ActiveToursType } from "@/types/tour-types";
import ToursGrid from "@/components/sri-lankan-tours-components/ToursGrid";
import { useRouter } from "next/navigation";
import { TourService } from "@/services/tourService"; // Import service
import BasicCycleLoading from "@/components/common-components/basic-loading/BasicCycleLoading";

const ActiveToursHomeGrid = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTours, setActiveTours] = useState<ActiveToursType[]>([]);
  const [displayCount, setDisplayCount] = useState(3);
  const router = useRouter();

  const handleMoreToursClick = () => {
    router.push("/sri-lankan-tours");
  };

  // Update display count based on screen size
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile: < 640px
        setDisplayCount(3);
      } else if (width < 768) {
        // Tablet: 640px - 767px
        setDisplayCount(4);
      } else if (width < 1536) {
        // Laptop: 768px - 1023px
        setDisplayCount(6);
      } else {
        // PC: ≥ 1024px
        setDisplayCount(8);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);

    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  useEffect(() => {
    const fetchActiveTours = async () => {
      try {
        setLoading(true);

        const { data: items, error } = await TourService.fetchActiveTours();

        if (error) {
          setError(error);
        } else {
          setActiveTours(items);
          setError(null);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Something went wrong while fetching active tours");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTours();
  }, []);

  const displayedTours = activeTours.slice(0, displayCount);

  if (loading) {
    return (
      <div className="min-h-96 bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 flex items-center justify-center p-8">
        <div className="w-full mx-auto">
          {/* Simple loading header */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
              <span className="text-teal-300 text-sm">
                Loading popular tours...
              </span>
            </div>
          </div>

          {/* Popular Tours Cards - Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl border border-teal-500/20 animate-pulse overflow-hidden"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {/* Tour Image Placeholder */}
                <div className="w-full h-40 bg-gradient-to-br from-gray-700 to-teal-800/50"></div>

                {/* Tour Content */}
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded w-32"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-cyan-800/40 rounded w-24"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gradient-to-r from-cyan-600 to-teal-600 rounded w-16"></div>
                    <div className="w-20 h-8 bg-gradient-to-r from-gray-700 to-teal-800/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  if (activeTours.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white py-6 lg:py-8 xl:py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Lets plan your next home or holiday"
            title="Tours"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        <ToursGrid
          tours={displayedTours}
          // allTours={activeTours}
          displayCount={displayCount}
        />
      </div>

      <div className="text-center mt-8">
        <AnimatedButton onClick={handleMoreToursClick}>
          More Tours
        </AnimatedButton>
      </div>
    </div>
  );
};

export default ActiveToursHomeGrid;
