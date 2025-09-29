"use client";
import { GET_ALL_ACTIVE_PACKAGES_FE } from "@/utils/frontEndConstant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PackageType {
  id: number;
  name: string;
  description: string;
  status: string;
}

interface Tour {
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourStartDate: string;
  tourEndDate: string;
  durationDays: number;
  maxPeople: number;
  minPeople: number;
  pricePerPerson: number;
  tourStatus: string;
}

interface DestinationDto {
  destinationName: string;
  destinationDescription: string;
}

interface PackageImageDto {
  imageId: number;
  imageUrl: string;
  imageStatus: string;
}

interface ActivePackagesType {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  discountPercentage: number;
  packageStartDate: string;
  packageEndDate: string;
  color: string;
  hoverColor: string;
  minPersonCount: number;
  maxPersonCount: number;
  packageStatus: string;
  packageType: PackageType;
  tour: Tour;
  destinationDto: DestinationDto[];
  images: PackageImageDto[];
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

  // Auto-rotate images for each package
  useEffect(() => {
    if (activePackages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };

        activePackages.forEach((pkg) => {
          if (pkg.images && pkg.images.length > 1) {
            newIndexes[pkg.packageId] =
              (prevIndexes[pkg.packageId] + 1) % pkg.images.length;
          }
        });

        return newIndexes;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [activePackages]);

  const formatDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const extractLocations = (destinations: DestinationDto[]) => {
    if (!destinations || destinations.length === 0) {
      return "No destinations available";
    }
    return destinations.map((dest) => dest.destinationName).join(", ");
  };

  const getCurrentImageUrl = (pkg: ActivePackagesType) => {
    if (!pkg.images || pkg.images.length === 0) {
      return "/placeholder.jpg";
    }
    const currentIndex = currentImageIndexes[pkg.packageId] || 0;
    return pkg.images[currentIndex]?.imageUrl || pkg.images[0].imageUrl;
  };

  const handleImageClick = (pkgId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (
      activePackages.find((pkg) => pkg.packageId === pkgId)?.images?.length > 1
    ) {
      setCurrentImageIndexes((prev) => ({
        ...prev,
        [pkgId]:
          (prev[pkgId] + 1) %
          activePackages.find((pkg) => pkg.packageId === pkgId)!.images.length,
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
            SRI LANKA HOLIDAY PACKAGES
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 px-2">
            Our Most Popular Tour Packages
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Discover amazing travel experiences with our carefully curated
            packages
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {activePackages.map((pkg) => (
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
                <Image
                  src={getCurrentImageUrl(pkg)}
                  alt={pkg.packageName}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={false}
                />

                {/* Image Dots Indicator */}
                {pkg.images && pkg.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                    {pkg.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndexes[pkg.packageId]
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Discount Badge */}
                {pkg.discountPercentage > 0 && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    {pkg.discountPercentage}% OFF
                  </div>
                )}

                {/* Image Count Badge */}
                {pkg.images && pkg.images.length > 1 && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                    {currentImageIndexes[pkg.packageId] + 1}/{pkg.images.length}
                  </div>
                )}
              </div>

              {/* Package Content */}
              <div className="p-4 sm:p-5 lg:p-6 relative z-10">
                {/* Package Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight line-clamp-2 min-h-[3.5rem]">
                  {pkg.packageName}
                </h3>

                {/* Package Type */}
                {pkg.packageType?.name && (
                  <div className="mb-2 sm:mb-3">
                    <span
                      className="inline-block text-xs px-2 py-1 rounded-full font-medium border"
                      style={{
                        backgroundColor: `${pkg.color}15`,
                        color: pkg.color,
                        borderColor: `${pkg.color}30`,
                      }}
                    >
                      {pkg.packageType.name}
                    </span>
                  </div>
                )}

                {/* Duration and People Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
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
                      {formatDuration(pkg.packageStartDate, pkg.packageEndDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
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

                {/* Tour Covers Section */}
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">
                    Tour Locations:
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600 leading-relaxed line-clamp-2">
                    {extractLocations(pkg.destinationDto)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 min-h-[3.75rem]">
                  {pkg.packageDescription}
                </p>

                {/* Price Section */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                        ${pkg.totalPrice}
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

        {/* No Packages Message */}
        {activePackages.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No packages available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesHome;
