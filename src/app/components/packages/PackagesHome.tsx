"use client";
import { GET_ALL_ACTIVE_PACKAGES_FE } from "@/utils/frontEndConstant";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SectionHeader from "../common/SectionHeader";
import AnimatedButton from "../common/AnimatedButton";

interface Schedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  scheduleDescription: string;
}

interface Feature {
  featureId: number;
  featureName: string;
  featureValue: string;
  featureDescription: string;
  color: string;
  specialNote: string;
}

interface PackageImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  color: string;
}

interface ActivePackagesType {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  pricePerPerson: number | null;
  packageStatus: string;
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourStatus: string;
  schedules: Schedule[];
  features: Feature[];
  images: PackageImage[];
}

const PackagesHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePackages, setActivePackages] = useState<ActivePackagesType[]>(
    []
  );
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [displayCount, setDisplayCount] = useState(3);

  // Update display count based on screen size
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: 3 packages
        setDisplayCount(3);
      } else if (width < 1024) {
        // Tablet: 4 packages
        setDisplayCount(4);
      } else if (width < 1280) {
        // Laptop: 6 packages
        setDisplayCount(6);
      } else {
        // PC and large screens: 8 packages
        setDisplayCount(8);
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
        const data = await response.json();

        if (response.ok) {
          const items: ActivePackagesType[] = data.data || [];
          setActivePackages(items);

          // Initialize image indexes for each package
          const initialIndexes: { [key: number]: number } = {};
          items.forEach((pkg) => {
            initialIndexes[pkg.packageId] = 0;
          });
          setCurrentImageIndexes(initialIndexes);
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

  // Get filtered packages based on display count
  const displayedPackages = activePackages.slice(0, displayCount);

  // Auto-rotate images for each package
  useEffect(() => {
    if (displayedPackages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };

        displayedPackages.forEach((pkg) => {
          if (pkg.images && pkg.images.length > 1) {
            newIndexes[pkg.packageId] =
              (prevIndexes[pkg.packageId] + 1) % pkg.images.length;
          }
        });

        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [displayedPackages]);

  const getCurrentImageUrl = (pkg: ActivePackagesType) => {
    if (!pkg.images || pkg.images.length === 0) {
      return "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop";
    }
    const currentIndex = currentImageIndexes[pkg.packageId] || 0;
    return pkg.images[currentIndex]?.imageUrl || pkg.images[0].imageUrl;
  };

  const handleImageClick = (pkgId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const pkg = activePackages.find((p) => p.packageId === pkgId);
    if (pkg?.images && pkg.images.length > 1) {
      setCurrentImageIndexes((prev) => ({
        ...prev,
        [pkgId]: (prev[pkgId] + 1) % pkg.images.length,
      }));
    }
  };

  const handleDotClick = (
    pkgId: number,
    index: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [pkgId]: index,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-64 flex justify-center items-center bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          <div className="text-lg sm:text-xl text-gray-600 mb-4">
            Loading packages...
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            {[...Array(displayCount)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 animate-pulse"
              >
                <div className="h-40 sm:h-48 md:h-56 lg:h-52 xl:h-56 bg-gray-300 rounded-lg mb-3 sm:mb-4"></div>
                <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-2 sm:mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-3 sm:mb-4"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-64 flex justify-center items-center bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Unable to Load Packages
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header Section */}
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="SRI LANKA HOLIDAY PACKAGES"
            title="Our Most Popular Tour Packages"
            description="Discover amazing travel experiences with our carefully curated packages."
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-auto">
          {displayedPackages.map((pkg) => (
            <div
              key={pkg.packageId}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              style={{
                backgroundColor:
                  hoveredCard === pkg.packageId
                    ? `${pkg.hoverColor}15`
                    : `${pkg.color}08`,
                transform:
                  hoveredCard === pkg.packageId
                    ? "translateY(-4px)"
                    : "translateY(0)",
                border: `1px solid ${
                  hoveredCard === pkg.packageId
                    ? pkg.hoverColor + "20"
                    : pkg.color + "10"
                }`,
              }}
              onMouseEnter={() => setHoveredCard(pkg.packageId)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Package Image with Slideshow */}
              <div
                className="relative h-40 sm:h-48 md:h-56 lg:h-52 xl:h-56 overflow-hidden cursor-pointer"
                onClick={(e) => handleImageClick(pkg.packageId, e)}
              >
                {pkg.images &&
                  pkg.images.length > 0 &&
                  pkg.images.map((image, index) => (
                    <div
                      key={image.imageId}
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                      style={{
                        opacity:
                          index === currentImageIndexes[pkg.packageId] ? 1 : 0,
                        zIndex:
                          index === currentImageIndexes[pkg.packageId] ? 1 : 0,
                      }}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={`${pkg.packageName} - Image ${index + 1}`}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ))}

                {/* Image Dots Indicator */}
                {pkg.images && pkg.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
                    {pkg.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleDotClick(pkg.packageId, index, e)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                          index === currentImageIndexes[pkg.packageId]
                            ? "bg-white w-4 sm:w-6"
                            : "bg-white/50"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Navigation Arrows - Show on hover */}
                {pkg.images && pkg.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndexes((prev) => ({
                          ...prev,
                          [pkg.packageId]:
                            prev[pkg.packageId] === 0
                              ? pkg.images.length - 1
                              : prev[pkg.packageId] - 1,
                        }));
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndexes((prev) => ({
                          ...prev,
                          [pkg.packageId]:
                            (prev[pkg.packageId] + 1) % pkg.images.length,
                        }));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Discount Badge */}
                {pkg.discountPercentage > 0 && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg z-10">
                    {pkg.discountPercentage}% OFF
                  </div>
                )}

                {/* Image Count Badge */}
                {pkg.images && pkg.images.length > 1 && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs z-10">
                    {currentImageIndexes[pkg.packageId] + 1}/{pkg.images.length}
                  </div>
                )}
              </div>

              {/* Package Content */}
              <div className="p-4 sm:p-5 lg:p-6 relative z-10">
                {/* Package Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
                  {pkg.packageName}
                </h3>

                {/* Tour Name Badge */}
                <div className="mb-2 sm:mb-3">
                  <span
                    className="inline-block text-xs px-2 py-1 rounded-full font-medium border"
                    style={{
                      backgroundColor: `${pkg.color}15`,
                      color: pkg.color,
                      borderColor: `${pkg.color}30`,
                    }}
                  >
                    {pkg.tourName}
                  </span>
                </div>

                {/* Duration and People Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {pkg.duration} {pkg.duration === 1 ? "day" : "days"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {pkg.minPersonCount}-{pkg.maxPersonCount}
                    </span>
                  </div>
                </div>

                {/* Location Section */}
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">
                    Tour Route:
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600 leading-relaxed line-clamp-2">
                    {pkg.startLocation} → {pkg.endLocation}
                  </p>
                </div>

                {/* Features */}
                {pkg.features && pkg.features.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">
                      Included Features:
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {pkg.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature.featureId}
                          className="inline-flex items-center text-xs px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: `${feature.color}15`,
                            color: feature.color,
                          }}
                          title={feature.featureDescription}
                        >
                          {feature.featureName}: {feature.featureValue}
                        </span>
                      ))}
                      {pkg.features.length > 2 && (
                        <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          +{pkg.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 min-h-[3.25rem] sm:min-h-[3.75rem]">
                  {pkg.packageDescription}
                </p>

                {/* Schedule Info */}
                {pkg.schedules && pkg.schedules.length > 0 && (
                  <div className="mb-3 sm:mb-4 bg-purple-50 rounded p-2">
                    <div className="text-xs text-gray-700">
                      <div className="font-semibold text-purple-700 text-xs sm:text-sm">
                        {pkg.schedules[0].scheduleName}
                      </div>
                      {pkg.schedules[0].specialNote && (
                        <div className="text-xs text-gray-600 mt-1">
                          💡 {pkg.schedules[0].specialNote}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Price Section */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">
                        ${pkg.totalPrice.toFixed(2)}
                      </span>
                      {pkg.discountPercentage > 0 && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          $
                          {(
                            pkg.totalPrice /
                            (1 - pkg.discountPercentage / 100)
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">per package</p>
                  </div>
                </div>

                {/* See Details Button */}
                <button className="w-full py-2 sm:py-3 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base group-hover:shadow-2xl">
                  See Details
                </button>
              </div>

              {/* Hover Background Effect */}
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-500 pointer-events-none z-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${pkg.hoverColor}15, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {activePackages.length > displayCount && (
          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
            <AnimatedButton onClick={() => console.log("Clicked!")}>
              More Tours
            </AnimatedButton>
          </div>
        )}

        {/* View All Button when all are displayed */}
        {displayedPackages.length === activePackages.length &&
          activePackages.length > 0 && (
            <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
              <AnimatedButton onClick={() => console.log("Clicked!")}>
                More Tours
              </AnimatedButton>
            </div>
          )}

        {/* Display Count Info */}
        {activePackages.length > 0 && (
          <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            Showing {displayedPackages.length} of {activePackages.length}{" "}
            packages
          </div>
        )}

        {/* No Packages Message */}
        {activePackages.length === 0 && !loading && (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-lg">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                No Packages Available
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Check back later for exciting tour packages.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesHome;
