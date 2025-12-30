// components/ActiveToursHomeGrid.tsx
"use client";
import React, { useEffect, useState } from "react";
import { GET_ALL_ACTIVE_TOUR_FE } from "@/utils/frontEndConstant";
import Loading from "../../../components/common-components/loading/Loading";
import SectionHeader from "../../../components/common-components/section-header/SectionHeader";
import AnimatedButton from "../../../components/common-components/buttons/AnimatedButton";
import { ActiveToursType, ApiResponse } from "@/types/sri-lankan-tour-types";
import ToursGrid from "@/components/sri-lankan-tours-components/ToursGrid";
import { useRouter } from "next/navigation";

const ActiveToursHomeGrid = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTours, setActiveTours] = useState<ActiveToursType[]>([]);
  const [displayCount, setDisplayCount] = useState(3);
  const router = useRouter()


  const handleMoreToursClick = () =>{
    router.push("/sri-lankan-tours")
  }

  // Update display count based on screen size
useEffect(() => {
  const updateDisplayCount = () => {
    const width = window.innerWidth;
    
    if (width < 640) { // Mobile: < 640px
      setDisplayCount(3);
    } else if (width < 768) { // Tablet: 640px - 767px
      setDisplayCount(4);
    } else if (width < 1536) { // Laptop: 768px - 1023px
      setDisplayCount(6);
    } else { // PC: ≥ 1024px
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
        const response = await fetch(GET_ALL_ACTIVE_TOUR_FE);
        const data: ApiResponse = await response.json();

        if (response.ok && data.code === 200) {
          const items: ActiveToursType[] = data.data || [];
          const activeItems = items.filter(
            (tour) => tour.statusName === "ACTIVE"
          );
          setActiveTours(activeItems);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active tours");
        }
      } catch (err) {
        console.error("Error fetching active tours:", err);
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
      <div className="min-h-96 flex items-center justify-center">
        <Loading
          message="Loading popular tours..."
          variant="spinner"
          size="md"
        />
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
    <div className="w-full bg-gradient-to-br from-amber-50 to-purple-50 py-8 md:py-8 lg:py-8 xl:py-12">
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
          allTours={activeTours}
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
