"use client";
import { GET_ALL_ACTIVE_PROMOTIONS_FE } from "@/utils/frontEndConstant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

interface Image {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  color: string;
}

interface Package {
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
  images: Image[];
}

const PromotionsHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_PROMOTIONS_FE);
        const data = await response.json();

        if (response.ok) {
          setPackages(data.data || []);
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

  // Get filtered packages based on screen size
  const getFilteredPackages = () => {
    if (typeof window === "undefined") return packages.slice(0, 3);

    const width = window.innerWidth;
    let itemsToShow = 3; // Default for mobile

    if (width >= 1536) itemsToShow = 8; // 2xl screens - PC
    else if (width >= 1280) itemsToShow = 6; // xl screens - Laptops
    else if (width >= 1024) itemsToShow = 4; // lg screens - Tablets
    else if (width >= 768) itemsToShow = 3; // md screens - Tablets
    // sm screens (640px+) and below: 3 items

    return packages.slice(0, itemsToShow);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get days remaining
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (
    totalPrice: number,
    discountPercentage: number
  ) => {
    return totalPrice - (totalPrice * discountPercentage) / 100;
  };

  // Get image URL with fallback
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return imagePath;
  };

  // Handle package hover
  const handlePackageHover = (packageId: number) => {
    setHoveredPackage(packageId);
  };

  const handlePackageLeave = () => {
    setHoveredPackage(null);
  };

  // Get responsive image height
  const getImageHeight = () => {
    if (typeof window === "undefined") return "12rem";

    const width = window.innerWidth;
    if (width >= 1536) return "16rem"; // 2xl screens
    if (width >= 1280) return "15rem"; // xl screens
    if (width >= 1024) return "14rem"; // lg screens
    if (width >= 768) return "13rem"; // md screens
    return "12rem"; // mobile screens
  };

  // Auto rotate images for packages with multiple images
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    packages.forEach((pkg) => {
      if (pkg.images.length > 1) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => ({
            ...prev,
            [pkg.packageId]:
              ((prev[pkg.packageId] || 0) + 1) % pkg.images.length,
          }));
        }, 4000); // Change image every 4 seconds

        intervals.push(interval);
      }
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [packages]);

  // Loading skeleton
  if (loading) {
    const skeletonItems = getFilteredPackages().length || 6;
    
    return (
      <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 rounded w-48 sm:w-64 mx-auto mb-3 sm:mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-72 sm:w-96 mx-auto"></div>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {[...Array(skeletonItems)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-50 rounded-lg p-4 sm:p-6 animate-pulse"
              >
                <div 
                  className="bg-gray-300 rounded mb-4"
                  style={{ height: getImageHeight() }}
                ></div>
                <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-3 sm:mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4 sm:mb-6"></div>
                <div className="h-10 bg-gray-300 rounded mb-3 sm:mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-2">
              Unable to load packages
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredPackages = getFilteredPackages();

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Special Tour Packages
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            Explore our latest tour packages with amazing discounts. Book now to
            secure these limited-time deals.
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="bg-gray-50 rounded-lg p-8 sm:p-12 max-w-md mx-auto">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                No packages available
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">Check back later for new offers.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {filteredPackages.map((pkg) => {
              const daysRemaining = getDaysRemaining(pkg.endDate);
              const isExpiring = daysRemaining <= 7;
              const discountedPrice = calculateDiscountedPrice(
                pkg.totalPrice,
                pkg.discountPercentage
              );
              const currentIndex = currentImageIndex[pkg.packageId] || 0;
              const currentImage = pkg.images[currentIndex];
              const mainImage = currentImage
                ? getImageUrl(currentImage.imageUrl)
                : "/images/placeholder.jpg";
              const isHovered = hoveredPackage === pkg.packageId;

              return (
                <div
                  key={pkg.packageId}
                  className="group border border-gray-200 rounded-lg sm:rounded-xl hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-xl overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2"
                  onMouseEnter={() => handlePackageHover(pkg.packageId)}
                  onMouseLeave={handlePackageLeave}
                >
                  {/* Package Image */}
                  <div 
                    className="rounded-t-lg sm:rounded-t-xl overflow-hidden relative bg-gray-200"
                    style={{ height: getImageHeight() }}
                  >
                    {/* Image Container with smooth transitions */}
                    <div className="relative w-full h-full">
                      {pkg.images.map((image, index) => (
                        <Image
                          key={image.imageId}
                          src={getImageUrl(image.imageUrl)}
                          alt={image.imageDescription || pkg.packageName}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                            index === currentIndex
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-105"
                          } ${isHovered ? "group-hover:scale-110" : ""}`}
                          width={400}
                          height={400}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ))}

                      {/* Image indicators for multiple images */}
                      {pkg.images.length > 1 && (
                        <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {pkg.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                  ? "bg-white scale-125"
                                  : "bg-white bg-opacity-50"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    {/* Package Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base lg:text-lg line-clamp-2 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                      {pkg.packageName}
                    </h3>

                    {/* Package Description */}
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 group-hover:text-gray-500 transition-colors duration-300 leading-relaxed">
                      {pkg.packageDescription}
                    </p>

                    {/* Discount Badge */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <span className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transform group-hover:scale-105 transition-transform duration-300">
                          {pkg.discountPercentage}% OFF
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-1 rounded transform group-hover:scale-105 transition-transform duration-300">
                          {pkg.duration} Day{pkg.duration > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 transform group-hover:scale-105 transition-transform duration-300">
                            {formatCurrency(discountedPrice)}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 line-through transform group-hover:scale-105 transition-transform duration-300">
                            {formatCurrency(pkg.totalPrice)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          total package
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 transform group-hover:scale-105 transition-transform duration-300">
                          {pkg.minPersonCount}-{pkg.maxPersonCount} people
                        </div>
                        <div className="text-xs text-gray-500">group size</div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 group-hover:text-gray-500 transition-colors duration-300">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 mr-1 transform group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">
                        {pkg.startLocation} → {pkg.endLocation}
                      </span>
                    </div>

                    {/* Validity */}
                    <div className="border-t border-gray-100 pt-3 sm:pt-4">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="text-gray-600">Valid until:</div>
                        <div
                          className={`font-medium transform group-hover:scale-105 transition-transform duration-300 ${
                            isExpiring ? "text-red-600" : "text-gray-900"
                          }`}
                        >
                          <span className="hidden sm:inline">{formatDate(pkg.endDate)}</span>
                          <span className="sm:hidden text-xs">
                            {new Date(pkg.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          {isExpiring && (
                            <span className="ml-1 text-xs bg-red-100 text-red-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transform group-hover:scale-110 transition-transform duration-300">
                              {daysRemaining}d
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    {pkg.features.length > 0 && (
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                        {pkg.features.slice(0, window.innerWidth >= 1024 ? 3 : 2).map((feature) => (
                          <span
                            key={feature.featureId}
                            className="inline-flex items-center text-xs text-gray-600 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border transform group-hover:scale-105 transition-transform duration-300"
                            style={{ borderColor: feature.color }}
                          >
                            <span className="hidden sm:inline">
                              {feature.featureName}: {feature.featureValue}
                            </span>
                            <span className="sm:hidden">
                              {feature.featureName}
                            </span>
                          </span>
                        ))}
                        {pkg.features.length > (window.innerWidth >= 1024 ? 3 : 2) && (
                          <span className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transform group-hover:scale-105 transition-transform duration-300">
                            +{pkg.features.length - (window.innerWidth >= 1024 ? 3 : 2)}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      className="w-full mt-4 sm:mt-6 text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg transform group-hover:-translate-y-0.5 sm:group-hover:-translate-y-1 text-sm sm:text-base"
                      style={{
                        backgroundColor: pkg.color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          pkg.hoverColor || pkg.color;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = pkg.color;
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <span className="flex items-center justify-center">
                        View Details
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Show More Button for Mobile/Tablet when there are more packages */}
        {packages.length > filteredPackages.length && (
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base">
              View All {packages.length} Packages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionsHome;