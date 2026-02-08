"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "../common-components/section-header/SectionHeader";
import AnimatedButton from "../common-components/buttons/AnimatedButton";
import { ActivePackagesForFilters, ActivePackagesType } from "@/types/package-types";
import Loading from "@/components/common-components/loading/Loading";
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
import { PackageService } from "@/services/packageService";

const PackagesHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePackages, setActivePackages] = useState<ActivePackagesForFilters[]>(
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
        // USING THE SERVICE INSTEAD OF DIRECT FETCH
        const { data: packages, error } = await PackageService.fetchActivePackages();

        if (error) {
          setError(error);
        } else {
          setActivePackages(packages);
          setError(null);
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
    return null;
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
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
  activePackages: ActivePackagesForFilters[];
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
  activePackages: ActivePackagesForFilters[];
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