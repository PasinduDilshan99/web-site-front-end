"use client";
import { GET_ALL_ACTIVE_PROMOTIONS_FE } from '@/utils/frontEndConstant';
import React, { useEffect, useState } from 'react';

interface ActivePromotion {
  promotionId: number;
  promotionCode: string;
  promotionDescription: string;
  startDate: string;
  endDate: string;
  applyTo: string;
  isPublic: boolean;
  priority: number;
  maxUsageLimit: number;
  perUserLimit: number;
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourStartDate: string;
  tourEndDate: string;
  pricePerPerson: number;
  promotionTypeName: string;
  promotionTypeDescription: string;
  minPerson: number;
  maxPerson: number;
  minPrice: number;
  maxPrice: number;
  discountType: string;
  discountValue: number;
  eligibleCustomerGroup: string | null;
  paymentMethodRestriction: string | null;
  bookingPeriodStart: string | null;
  bookingPeriodEnd: string | null;
  travelPeriodStart: string | null;
  travelPeriodEnd: string | null;
  promotionStatus: string;
}

const PromotionsHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePromotions, setActivePromotions] = useState<ActivePromotion[]>([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_ALL_ACTIVE_PROMOTIONS_FE);
        const data = await response.json();

        if (response.ok) {
          setActivePromotions(data.data || []);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch active promotions");
        }
      } catch (err) {
        console.error("Error fetching active promotions:", err);
        setError("Something went wrong while fetching active promotions");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get days remaining
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

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
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load promotions</h3>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Current Promotions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest offers and discounts on amazing tours. Book now to secure these limited-time deals.
          </p>
        </div>

        {activePromotions.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-lg p-12 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No promotions available</h3>
              <p className="text-gray-600">Check back later for new offers.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activePromotions.map((promo) => {
              const daysRemaining = getDaysRemaining(promo.endDate);
              const isExpiring = daysRemaining <= 7;

              return (
                <div
                  key={promo.promotionId}
                  className="group border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200 bg-white"
                >
                  {/* Tour Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-indigo-700">Special Offer</span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Tour Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{promo.tourName}</h3>
                    
                    {/* Promotion Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{promo.promotionDescription}</p>

                    {/* Discount Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          {promo.discountValue}
                          {promo.discountType === 'percentage' ? '% OFF' : ' OFF'}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {promo.promotionCode}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(promo.pricePerPerson)}
                        </div>
                        <div className="text-xs text-gray-500">per person</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {promo.minPerson}-{promo.maxPerson} people
                        </div>
                        <div className="text-xs text-gray-500">group size</div>
                      </div>
                    </div>

                    {/* Validity */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-600">Valid until:</div>
                        <div className={`font-medium ${isExpiring ? 'text-red-600' : 'text-gray-900'}`}>
                          {formatDate(promo.endDate)}
                          {isExpiring && (
                            <span className="ml-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              {daysRemaining}d left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Priority {promo.priority}
                      </span>
                      <span className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {promo.maxUsageLimit} uses
                      </span>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 group-hover:shadow-md">
                      View Tour Details
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