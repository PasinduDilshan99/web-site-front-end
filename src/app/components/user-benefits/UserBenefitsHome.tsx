"use client";
import { GET_ALL_ACTIVE_USER_BENEFITS_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface BenefitType {
  benefitTypeId: number;
  benefitTypeName: string;
  benefitTypeDescription: string;
  benefitTypeStatus: string;
}

interface ActiveUserBenefitsType {
  benefitId: number;
  benefitName: string;
  benefitDescription: string;
  benefitValue: number;
  validFrom: string;
  validTo: string;
  benefitStatus: string;
  benefitType: BenefitType;
}

const UserBenefitsHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUserBenefits, setActiveUserBenefits] = useState<
    ActiveUserBenefitsType[]
  >([]);
  const [displayCount, setDisplayCount] = useState(3);

  // Update display count based on screen size
  useEffect(() => {
    const updateDisplayCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: 3 benefits
        setDisplayCount(3);
      } else if (width < 1024) {
        // Tablet: 4 benefits
        setDisplayCount(4);
      } else if (width < 1280) {
        // Laptop: 6 benefits
        setDisplayCount(6);
      } else {
        // PC and large screens: 8 benefits
        setDisplayCount(8);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  useEffect(() => {
    const fetchActiveUserBenefits = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_USER_BENEFITS_FE);
        const data = await response.json();

        if (response.ok) {
          const items: ActiveUserBenefitsType[] = data.data || [];
          setActiveUserBenefits(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active user benefits");
        }
      } catch (err) {
        console.error("Error fetching active user benefits:", err);
        setError("Something went wrong while fetching active user benefits");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUserBenefits();
  }, []);

  // Get filtered benefits based on display count
  const displayedBenefits = activeUserBenefits.slice(0, displayCount);

  // Get color scheme based on benefit type
  const getBenefitTypeColor = (typeName: string) => {
    const colors = {
      DISCOUNT: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-200",
      },
      CASHBACK: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      },
      REWARD: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200",
      },
      VOUCHER: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      BONUS: {
        bg: "bg-pink-100",
        text: "text-pink-800",
        border: "border-pink-200",
      },
      DEFAULT: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
    };

    return colors[typeName as keyof typeof colors] || colors.DEFAULT;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    return status === "ACTIVE"
      ? {
          bg: "bg-emerald-100",
          text: "text-emerald-800",
          border: "border-emerald-200",
        }
      : { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="h-6 sm:h-8 lg:h-10 bg-gray-300 rounded w-48 sm:w-64 lg:w-80 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-5 bg-gray-300 rounded w-64 sm:w-96 lg:w-[480px] mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded w-40 sm:w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(displayCount)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 animate-pulse"
              >
                <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-3 sm:mb-4"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-5/6 mb-3 sm:mb-4"></div>
                <div className="flex justify-between mb-3 sm:mb-4">
                  <div className="h-5 sm:h-6 bg-gray-300 rounded w-16 sm:w-20"></div>
                  <div className="h-5 sm:h-6 bg-gray-300 rounded w-12 sm:w-16"></div>
                </div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-red-200 p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-red-500"
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
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Unable to Load Benefits
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Your Benefits
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-6">
            Discover all the amazing benefits available to you. Each benefit is
            designed to enhance your experience and provide exceptional value.
          </p>
          <div className="bg-white rounded-full shadow-sm inline-flex items-center p-1 sm:p-2 border border-gray-200">
            <span className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-gray-600">
              Total Benefits:
              <span className="ml-1 sm:ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                {activeUserBenefits.length}
              </span>
            </span>
          </div>
        </div>

        {activeUserBenefits.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12 max-w-md mx-auto border-2 border-dashed border-gray-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                No Benefits Available
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                There are currently no active benefits available. Please check
                back later for new benefits.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedBenefits.map((benefit) => {
                const typeColor = getBenefitTypeColor(
                  benefit.benefitType.benefitTypeName
                );
                const statusColor = getStatusColor(benefit.benefitStatus);
                const isDiscountOrCashback =
                  benefit.benefitType.benefitTypeName === "DISCOUNT" ||
                  benefit.benefitType.benefitTypeName === "CASHBACK";

                return (
                  <div
                    key={benefit.benefitId}
                    className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-200 overflow-hidden"
                  >
                    {/* Benefit Header with Gradient */}
                    <div
                      className={`${typeColor.bg} ${typeColor.border} border-b p-4 sm:p-6 relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span
                            className={`${typeColor.text} px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${typeColor.border}`}
                          >
                            {benefit.benefitType.benefitTypeName}
                          </span>
                          <span
                            className={`${statusColor.bg} ${statusColor.text} px-2 py-1 rounded-full text-xs font-medium border ${statusColor.border}`}
                          >
                            {benefit.benefitStatus}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                          {benefit.benefitName}
                        </h3>
                      </div>
                    </div>

                    {/* Benefit Content */}
                    <div className="p-4 sm:p-6">
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                        {benefit.benefitDescription}
                      </p>

                      {/* Benefit Value */}
                      {benefit.benefitValue > 0 && (
                        <div className="mb-3 sm:mb-4">
                          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {benefit.benefitValue}
                            {isDiscountOrCashback ? "%" : ""}
                          </div>
                          <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                            Benefit Value
                          </div>
                        </div>
                      )}

                      {/* Validity Period */}
                      <div className="pt-3 sm:pt-4 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Valid Until
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(benefit.validTo).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="w-full mt-3 sm:mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 sm:py-2.5 rounded-lg transition-all duration-200 text-xs sm:text-sm group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white group-hover:shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show More Button */}
            {activeUserBenefits.length > displayCount && (
              <div className="text-center mt-6 sm:mt-8 lg:mt-12">
                <button
                  onClick={() => setDisplayCount(activeUserBenefits.length)}
                  className="px-6 sm:px-8 lg:px-10 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg"
                >
                  Show All {activeUserBenefits.length} Benefits
                </button>
              </div>
            )}

            {/* View All Button when all are displayed */}
            {displayedBenefits.length === activeUserBenefits.length &&
              activeUserBenefits.length > 0 && (
                <div className="text-center mt-6 sm:mt-8 lg:mt-12">
                  <button className="px-6 sm:px-8 lg:px-10 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg">
                    View All Benefits
                  </button>
                </div>
              )}

            {/* Display Count Info */}
            {activeUserBenefits.length > 0 && (
              <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
                Showing {displayedBenefits.length} of{" "}
                {activeUserBenefits.length} benefits
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserBenefitsHome;
