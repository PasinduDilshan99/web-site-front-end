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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
        }, 3000); // Change image every 3 seconds

        intervals.push(interval);
      }
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [packages]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
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
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Unable to load packages
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Special Tour Packages
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest tour packages with amazing discounts. Book now to
            secure these limited-time deals.
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-lg p-12 max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No packages available
              </h3>
              <p className="text-gray-600">Check back later for new offers.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => {
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
                  className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-xl overflow-hidden transform hover:-translate-y-2"
                  onMouseEnter={() => handlePackageHover(pkg.packageId)}
                  onMouseLeave={handlePackageLeave}
                >
                  {/* Package Image */}
                  <div className="h-48 rounded-t-lg overflow-hidden relative bg-gray-200">
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
                          width={500}
                          height={500}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ))}

                      {/* Image indicators for multiple images */}
                      {pkg.images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {pkg.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                  ? "bg-white scale-125"
                                  : "bg-white bg-opacity-50"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Overlay content */}
                      {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="text-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <svg 
                              className="w-6 h-6 text-indigo-600" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-white bg-black bg-opacity-50 px-3 py-1 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            Special Offer
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Package Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                      {pkg.packageName}
                    </h3>

                    {/* Package Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-500 transition-colors duration-300">
                      {pkg.packageDescription}
                    </p>

                    {/* Discount Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium transform group-hover:scale-105 transition-transform duration-300">
                          {pkg.discountPercentage}% OFF
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded transform group-hover:scale-105 transition-transform duration-300">
                          {pkg.duration} Day{pkg.duration > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900 transform group-hover:scale-105 transition-transform duration-300">
                            {formatCurrency(discountedPrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through transform group-hover:scale-105 transition-transform duration-300">
                            {formatCurrency(pkg.totalPrice)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          total package
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 transform group-hover:scale-105 transition-transform duration-300">
                          {pkg.minPersonCount}-{pkg.maxPersonCount} people
                        </div>
                        <div className="text-xs text-gray-500">group size</div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-600 mb-4 group-hover:text-gray-500 transition-colors duration-300">
                      <svg
                        className="w-4 h-4 mr-1 transform group-hover:scale-110 transition-transform duration-300"
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
                      {pkg.startLocation} → {pkg.endLocation}
                    </div>

                    {/* Validity */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-600">Valid until:</div>
                        <div
                          className={`font-medium transform group-hover:scale-105 transition-transform duration-300 ${
                            isExpiring ? "text-red-600" : "text-gray-900"
                          }`}
                        >
                          {formatDate(pkg.endDate)}
                          {isExpiring && (
                            <span className="ml-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded transform group-hover:scale-110 transition-transform duration-300">
                              {daysRemaining}d left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    {pkg.features.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {pkg.features.slice(0, 2).map((feature) => (
                          <span
                            key={feature.featureId}
                            className="inline-flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border transform group-hover:scale-105 transition-transform duration-300"
                            style={{ borderColor: feature.color }}
                          >
                            {feature.featureName}: {feature.featureValue}
                          </span>
                        ))}
                        {pkg.features.length > 2 && (
                          <span className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded transform group-hover:scale-105 transition-transform duration-300">
                            +{pkg.features.length - 2} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      className="w-full mt-6 text-white py-3 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg transform group-hover:-translate-y-1"
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
                        View Package Details
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
      </div>
    </div>
  );
};

export default PromotionsHome;
