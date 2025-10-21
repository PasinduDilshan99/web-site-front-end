"use client";
import { GET_ACTIVE_ACTIVITIES_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import { EmptyState } from "../../../components/common-components/empty-state/EmptyState";
import { ErrorState } from "../../../components/common-components/error-state/ErrorState";
import Loading from "../../../components/common-components/loading/Loading";
import AnimatedButton from "../../../components/common-components/buttons/AnimatedButton";
import SectionHeader from "../../../components/common-components/section-header/SectionHeader";
import { ActiveActivitiesType } from "@/types/activities-types";
import ActivitiesGrid from "@/components/activities-components/ActivitiesGrid";

const ActivitiesHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeActivities, setActiveActivities] = useState<
    ActiveActivitiesType[]
  >([]);
  const [displayCount, setDisplayCount] = useState(3);

  // Update display count based on screen size
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDisplayCount(3);
      } else if (width < 1024) {
        setDisplayCount(4);
      } else if (width < 1280) {
        setDisplayCount(6);
      } else {
        setDisplayCount(8);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ACTIVE_ACTIVITIES_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveActivitiesType[] = data.data || [];
          setActiveActivities(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active activities");
        }
      } catch (err) {
        console.error("Error fetching active activities:", err);
        setError("Something went wrong while fetching active activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading message="Loading popular tours..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
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

  if (activeActivities.length === 0) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <EmptyState
            title="No Content Available"
            message="We're preparing some amazing content for you. Please check back soon!"
            icon="data"
            size="md"
          />
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Activities"
            title="Adventure Activities"
            description="Discover exciting activities and experiences. From thrilling adventures to relaxing tours, find the perfect activity for your next journey."
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Activities Grid */}
        <ActivitiesGrid
          activities={activeActivities}
          displayCount={displayCount}
        />

        {/* Show More Button */}
        {activeActivities.length > displayCount && (
          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
            <AnimatedButton
              onClick={() => setDisplayCount(activeActivities.length)}
            >
              Show All {activeActivities.length} Activities
            </AnimatedButton>
          </div>
        )}

        {/* View All Button when all are displayed */}
        {displayCount === activeActivities.length &&
          activeActivities.length > 0 && (
            <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
              <AnimatedButton onClick={() => console.log("View all clicked")}>
                View All Activities
              </AnimatedButton>
            </div>
          )}
      </div>
    </div>
  );
};

export default ActivitiesHome;
