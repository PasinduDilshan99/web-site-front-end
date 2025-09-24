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

  // Get color scheme based on benefit type
  const getBenefitTypeColor = (typeName: string) => {
    const colors = {
      DISCOUNT: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
      CASHBACK: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
      REWARD: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
      VOUCHER: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
      BONUS: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
      DEFAULT: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" }
    };
    
    return colors[typeName as keyof typeof colors] || colors.DEFAULT;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    return status === 'ACTIVE' 
      ? { bg: "bg-emerald-100", text: "text-emerald-800" }
      : { bg: "bg-gray-100", text: "text-gray-800" };
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="flex justify-between mb-4">
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                  <div className="h-6 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Benefits</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Benefits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover all the amazing benefits available to you. Each benefit is designed to enhance your experience and provide exceptional value.
          </p>
          <div className="mt-6 bg-white rounded-full shadow-sm inline-flex items-center p-2 border border-gray-200">
            <span className="px-4 py-1 text-sm font-medium text-gray-600">
              Total Benefits: 
              <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {activeUserBenefits.length}
              </span>
            </span>
          </div>
        </div>

        {activeUserBenefits.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm p-12 max-w-md mx-auto border-2 border-dashed border-gray-300">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Benefits Available</h3>
              <p className="text-gray-600 mb-6">
                There are currently no active benefits available. Please check back later for new benefits.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeUserBenefits.map((benefit) => {
              const typeColor = getBenefitTypeColor(benefit.benefitType.benefitTypeName);
              const statusColor = getStatusColor(benefit.benefitStatus);
              const isDiscountOrCashback = benefit.benefitType.benefitTypeName === "DISCOUNT" || 
                                         benefit.benefitType.benefitTypeName === "CASHBACK";

              return (
                <div
                  key={benefit.benefitId}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
                >
                  {/* Benefit Header with Gradient */}
                  <div className={`${typeColor.bg} ${typeColor.border} border-b p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-20 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`${typeColor.text} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}>
                          {benefit.benefitType.benefitTypeName}
                        </span>
                        <span className={`${statusColor.bg} ${statusColor.text} px-2 py-1 rounded-full text-xs font-medium`}>
                          {benefit.benefitStatus}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                        {benefit.benefitName}
                      </h3>
                    </div>
                  </div>

                  {/* Benefit Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {benefit.benefitDescription}
                    </p>

                    {/* Benefit Value */}
                    {benefit.benefitValue > 0 && (
                      <div className="mb-4">
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {benefit.benefitValue}
                          {isDiscountOrCashback ? "%" : ""}
                        </div>
                        <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                          Benefit Value
                        </div>
                      </div>
                    )}

                    {/* Validity Period */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Valid Until
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(benefit.validTo).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 rounded-lg transition-colors duration-200 text-sm group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white">
                      View Details
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

export default UserBenefitsHome;