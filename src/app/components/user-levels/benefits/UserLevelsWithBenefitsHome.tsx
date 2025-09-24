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
        const response = await fetch(GET_ALL_ACTIVE_USER_LEVEL_WITH_BENEFITS_FE);
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
        setError("Something went wrong while fetching user levels with benefits");
      } finally {
        setLoading(false);
      }
    };

    fetchUserLevelWithBenefits();
  }, []);

  // Group by userLevelId
  const groupedLevels = userLevelWithBenefits.reduce((acc, item) => {
    const { userLevelId, userLevelName, userLevelDescription, userLevelStatus, userBenefitResponse } =
      item;
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
  }, {} as Record<
    number,
    {
      userLevelId: number;
      userLevelName: string;
      userLevelDescription: string;
      userLevelStatus: string;
      benefits: UserBenefitResponse[];
    }
  >);

  // Loading skeleton
  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        {[1, 2, 3].map((item) => (
          <div key={item} className="border rounded-xl p-6 mb-6 bg-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              {[1, 2].map((benefit) => (
                <div key={benefit} className="pl-4">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const levelsArray = Object.values(groupedLevels);

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            User Levels & Benefits
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
            Explore the different user levels and their associated benefits
          </p>
        </div>

        {levelsArray.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No user levels found</h3>
              <p className="mt-2 text-sm text-gray-500">
                There are currently no user levels with benefits available.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8 lg:gap-10">
            {levelsArray.map((level) => (
              <div
                key={level.userLevelId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Level Header */}
                <div className="p-6 sm:p-8 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          {level.userLevelName}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          level.userLevelStatus === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {level.userLevelStatus}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {level.userLevelDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="p-6 sm:p-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Included Benefits
                  </h4>
                  
                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {level.benefits.map((benefit) => (
                      <div
                        key={benefit.benefitId}
                        className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200 hover:border-blue-300 transition-colors duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h5 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                            {benefit.benefitName}
                          </h5>
                          {benefit.benefitValue > 0 && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ml-2">
                              ${benefit.benefitValue}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                          {benefit.benefitDescription}
                        </p>
                        
                        <div className="space-y-2 pt-3 border-t border-gray-200">
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <span className="font-medium">{benefit.benefitType.benefitTypeName}</span>
                          </div>
                          
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                              {new Date(benefit.validFrom).toLocaleDateString()} - {new Date(benefit.validTo).toLocaleDateString()}
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
      </div>
    </div>
  );
};