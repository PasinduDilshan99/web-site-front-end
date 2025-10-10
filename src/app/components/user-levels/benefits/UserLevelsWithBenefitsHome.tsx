"use client";
import { GET_ALL_ACTIVE_USER_LEVEL_WITH_BENEFITS_FE } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface BenefitType {
  benefitTypeId: number;
  benefitTypeName: string;
  benefitTypeDescription: string;
  benefitTypeStatus: string;
}

interface UserBenefitResponse {
  benefitId: number;
  benefitName: string;
  benefitDescription: string;
  benefitValue: number;
  validFrom: string;
  validTo: string;
  benefitStatus: string;
  benefitType: BenefitType;
}

interface UserLevelWithBenefitsTypes {
  userLevelId: number;
  userLevelName: string;
  userLevelDescription: string;
  userLevelStatus: string;
  userBenefitResponse: UserBenefitResponse;
}

export const UserLevelsWithBenefitsHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLevelWithBenefits, setUserLevelWithBenefits] = useState<
    UserLevelWithBenefitsTypes[]
  >([]);

  useEffect(() => {
    const fetchUserLevelWithBenefits = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          GET_ALL_ACTIVE_USER_LEVEL_WITH_BENEFITS_FE
        );
        const data = await response.json();

        if (response.ok) {
          const items: UserLevelWithBenefitsTypes[] = data.data || [];
          setUserLevelWithBenefits(items);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch user levels with benefits");
        }
      } catch (err) {
        console.error("Error fetching user levels with benefits:", err);
        setError(
          "Something went wrong while fetching user levels with benefits"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserLevelWithBenefits();
  }, []);

  // Group by userLevelId
  const groupedLevels = userLevelWithBenefits.reduce(
    (acc, item) => {
      const {
        userLevelId,
        userLevelName,
        userLevelDescription,
        userLevelStatus,
        userBenefitResponse,
      } = item;
      if (!acc[userLevelId]) {
        acc[userLevelId] = {
          userLevelId,
          userLevelName,
          userLevelDescription,
          userLevelStatus,
          benefits: [],
        };
      }
      acc[userLevelId].benefits.push(userBenefitResponse);
      return acc;
    },
    {} as Record<
      number,
      {
        userLevelId: number;
        userLevelName: string;
        userLevelDescription: string;
        userLevelStatus: string;
        benefits: UserBenefitResponse[];
      }
    >
  );

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-pulse">
            <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded w-48 sm:w-64 lg:w-80 mx-auto mb-3 sm:mb-4"></div>
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-64 sm:w-96 lg:w-[480px] mx-auto"></div>
          </div>

          {/* Level Cards Skeleton */}
          <div className="grid gap-6 sm:gap-8 lg:gap-10">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 animate-pulse"
              >
                {/* Level Header Skeleton */}
                <div className="border-b border-gray-100 pb-4 sm:pb-6 mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 rounded w-32 sm:w-40 lg:w-48"></div>
                        <div className="h-5 sm:h-6 bg-gray-200 rounded w-16 sm:w-20"></div>
                      </div>
                      <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4 sm:w-2/3"></div>
                    </div>
                  </div>
                </div>

                {/* Benefits Skeleton */}
                <div>
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-40 mb-4 sm:mb-6"></div>
                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((benefit) => (
                      <div
                        key={benefit}
                        className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6"
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="h-4 sm:h-5 bg-gray-300 rounded w-20 sm:w-24"></div>
                          <div className="h-5 sm:h-6 bg-gray-300 rounded w-12 sm:w-16"></div>
                        </div>
                        <div className="h-3 sm:h-4 bg-gray-300 rounded w-full mb-1"></div>
                        <div className="h-3 sm:h-4 bg-gray-300 rounded w-2/3 mb-3 sm:mb-4"></div>
                        <div className="space-y-1 sm:space-y-2 pt-2 sm:pt-3 border-t border-gray-200">
                          <div className="h-3 sm:h-4 bg-gray-300 rounded w-16 sm:w-20"></div>
                          <div className="h-3 sm:h-4 bg-gray-300 rounded w-24 sm:w-32"></div>
                        </div>
                      </div>
                    ))}
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
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base sm:text-lg font-medium text-red-800 mb-1">
                  Unable to Load Data
                </h3>
                <div className="text-sm sm:text-base text-red-700 mb-4">
                  <p>{error}</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const levelsArray = Object.values(groupedLevels);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 xl:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            User Levels & Benefits
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the different user levels and their associated benefits
          </p>
        </div>

        {levelsArray.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12 max-w-md mx-auto">
              <svg
                className="mx-auto w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-2">
                No user levels found
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                There are currently no user levels with benefits available.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 lg:gap-10">
            {levelsArray.map((level) => (
              <div
                key={level.userLevelId}
                className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Level Header */}
                <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                          {level.userLevelName}
                        </h3>
                        <span
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                            level.userLevelStatus === "ACTIVE"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                        >
                          {level.userLevelStatus}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {level.userLevelDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 lg:mb-8 flex items-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2 sm:mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Included Benefits
                  </h4>

                  <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {level.benefits.map((benefit) => (
                      <div
                        key={benefit.benefitId}
                        className="bg-gray-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md group"
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                          <h5 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight flex-1 pr-2">
                            {benefit.benefitName}
                          </h5>
                          {benefit.benefitValue > 0 && (
                            <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap flex-shrink-0">
                              ${benefit.benefitValue}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 lg:mb-5 leading-relaxed">
                          {benefit.benefitDescription}
                        </p>

                        <div className="space-y-1 sm:space-y-2 pt-2 sm:pt-3 lg:pt-4 border-t border-gray-200">
                          <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                            <span className="font-medium truncate">
                              {benefit.benefitType.benefitTypeName}
                            </span>
                          </div>

                          <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
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
                            <span className="truncate">
                              {new Date(benefit.validFrom).toLocaleDateString()}{" "}
                              - {new Date(benefit.validTo).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Benefit Status */}
                          <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span
                              className={`font-medium ${
                                benefit.benefitStatus === "ACTIVE"
                                  ? "text-green-600"
                                  : benefit.benefitStatus === "EXPIRED"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {benefit.benefitStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Footer */}
        {levelsArray.length > 0 && (
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Membership Summary
              </h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                {levelsArray.length} active user level
                {levelsArray.length !== 1 ? "s" : ""} with exclusive benefits
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {levelsArray.reduce(
                      (total, level) => total + level.benefits.length,
                      0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Total Benefits
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    {
                      levelsArray.filter(
                        (level) => level.userLevelStatus === "ACTIVE"
                      ).length
                    }
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Active Levels
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {levelsArray.reduce(
                      (total, level) =>
                        total +
                        level.benefits.filter((b) => b.benefitValue > 0).length,
                      0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Valued Benefits
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
