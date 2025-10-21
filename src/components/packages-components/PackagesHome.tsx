"use client";
import { GET_ALL_ACTIVE_PACKAGES_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import SectionHeader from "../common-components/section-header/SectionHeader";
import AnimatedButton from "../common-components/buttons/AnimatedButton";
import { ActivePackagesType, ApiResponse } from "@/types/packages-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import { EmptyState } from "@/components/common-components/empty-state/EmptyState";
import PackageGrid from "@/components/packages-components/PackageGrid";
import {
  PACKAGES_DISPLAY_COUNT_IN_1024PX,
  PACKAGES_DISPLAY_COUNT_IN_1280X,
  PACKAGES_DISPLAY_COUNT_IN_768PX,
  PACKAGES_DISPLAY_COUNT_IN_OTHERS,
  PACKAGES_HEADER_SECTION_DESCRIPTION,
  PACKAGES_HEADER_SECTION_SUB_TITLE,
  PACKAGES_HEADER_SECTION_TITLE,
} from "@/utils/constant";
import { useRouter } from "next/navigation";

const PackagesHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePackages, setActivePackages] = useState<ActivePackagesType[]>(
    []
  );
  const [displayCount, setDisplayCount] = useState(
    PACKAGES_DISPLAY_COUNT_IN_768PX
  );

  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDisplayCount(PACKAGES_DISPLAY_COUNT_IN_768PX);
      } else if (width < 1024) {
        setDisplayCount(PACKAGES_DISPLAY_COUNT_IN_1024PX);
      } else if (width < 1280) {
        setDisplayCount(PACKAGES_DISPLAY_COUNT_IN_1280X);
      } else {
        setDisplayCount(PACKAGES_DISPLAY_COUNT_IN_OTHERS);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_PACKAGES_FE);
        const data: ApiResponse<ActivePackagesType> = await response.json();

        if (response.ok && data.code === 200) {
          setActivePackages(data.data || []);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch packages");
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Something went wrong while fetching packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading
        message="Loading packages details..."
        variant="spinner"
        size="md"
      />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load packages details"
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
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle={PACKAGES_HEADER_SECTION_SUB_TITLE}
            title={PACKAGES_HEADER_SECTION_TITLE}
            description={PACKAGES_HEADER_SECTION_DESCRIPTION}
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>
        <PackageContent
          activePackages={activePackages}
          displayCount={displayCount}
        />
      </div>
    </div>
  );
};

export default PackagesHome;

const PackageContent = ({
  activePackages,
  displayCount,
}: {
  activePackages: ActivePackagesType[];
  displayCount: number;
}) => {
  if (activePackages.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <PackageGrid packages={activePackages} displayCount={displayCount} />

      <PackageActions
        activePackages={activePackages}
        displayCount={displayCount}
      />

      <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
        Showing {Math.min(activePackages.length, displayCount)} of{" "}
        {activePackages.length} packages
      </div>
    </>
  );
};

const PackageActions = ({
  activePackages,
  displayCount,
}: {
  activePackages: ActivePackagesType[];
  displayCount: number;
}) => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/packages");
  };
  const displayedCount = Math.min(activePackages.length, displayCount);

  if (activePackages.length > displayCount) {
    return (
      <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
        <AnimatedButton onClick={handleNavigate}>More Packages</AnimatedButton>
      </div>
    );
  }

  if (displayedCount === activePackages.length && activePackages.length > 0) {
    return (
      <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
        <AnimatedButton onClick={handleNavigate}>More Packages</AnimatedButton>
      </div>
    );
  }
  return null;
};
