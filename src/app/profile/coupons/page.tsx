// app/profile/coupons/page.tsx
"use client";
import UserProfileCouponsLoading from "@/components/user-profile-components/Loadings/UserProfileCouponsLoading";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { CouponData } from "@/types/coupon";
import { USER_PROFILE_COUPONS_VIEW_PRIVILEGE } from "@/utils/privileges";
import { USER_PROFILE_PAGE_PATH } from "@/utils/urls";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CouponsPage() {
  const [couponsData, setCouponsData] = useState<CouponData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "EXPIRED" | "USED">(
    "ALL",
  );
  const apiService = new UserProfileAPIService();
  const router = useRouter();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_COUPONS_VIEW_PRIVILEGE)
    ) {
      router.push(USER_PROFILE_PAGE_PATH);
    }
  }, [user, router]);

  useEffect(() => {
    loadCouponsData();
  }, []);

  const loadCouponsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUserCoupons();
      setCouponsData(response.data || []);
    } catch (err) {
      console.error("Failed to load coupons:", err);
      setError("Failed to load coupons data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "EXPIRED":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "USED":
        return "bg-sky-50 text-sky-700 border-sky-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "🎁";
      case "EXPIRED":
        return "⌛";
      case "USED":
        return "✅";
      default:
        return "🎫";
    }
  };

  const filteredCoupons =
    filter === "ALL"
      ? couponsData
      : couponsData.filter((coupon) => {
          if (filter === "ACTIVE")
            return coupon.active && !coupon.used && !coupon.expired;
          if (filter === "EXPIRED") return coupon.expired;
          if (filter === "USED") return coupon.used;
          return true;
        });

  const getStats = () => {
    const stats = {
      ALL: couponsData.length,
      ACTIVE: couponsData.filter((c) => c.active && !c.used && !c.expired)
        .length,
      EXPIRED: couponsData.filter((c) => c.expired).length,
      USED: couponsData.filter((c) => c.used).length,
    };
    return stats;
  };

  const stats = getStats();

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  if (loading) {
    return <UserProfileCouponsLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Coupons Unavailable
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t load your coupons at this time.
            </p>
            <button
              onClick={loadCouponsData}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] w-full md:w-auto"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Coupons & Offers
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Manage your available coupons and special offers
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-200">
                {stats.ALL} Total Coupons
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {(["ALL", "ACTIVE", "USED", "EXPIRED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`cursor-pointer bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border p-4 sm:p-5 text-center transition-all duration-300 hover:shadow-md sm:hover:shadow-lg active:scale-[0.98] ${
                filter === status
                  ? "border-sky-500 shadow-md ring-2 ring-sky-100"
                  : "border-gray-200 hover:border-sky-300"
              }`}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 ${
                  filter === status ? "bg-sky-50" : "bg-gray-50"
                }`}
              >
                <span className="text-xl sm:text-2xl">
                  {getStatusIcon(status)}
                </span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                {stats[status]}
              </div>
              <div
                className={`text-xs sm:text-sm font-medium mt-1 ${
                  filter === status ? "text-sky-600" : "text-gray-600"
                }`}
              >
                {status === "ALL" ? "All Coupons" : status}
              </div>
            </button>
          ))}
        </div>

        {/* Coupons List */}
        {filteredCoupons.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 md:p-12 text-center mb-6 sm:mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-sky-50 to-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-3xl">🎫</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
              {filter === "ALL"
                ? "No Coupons Available"
                : `No ${filter} Coupons`}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto">
              {filter === "ALL"
                ? "You don't have any coupons yet. Start earning coupons by making bookings!"
                : `You don't have any ${filter.toLowerCase()} coupons.`}
            </p>
            {/* <button className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm sm:text-base font-semibold">
              Explore Available Offers
            </button> */}
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredCoupons.map((coupon) => (
              <div
                key={coupon.allocationId}
                className={`bg-white rounded-xl sm:rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  coupon.active && !coupon.used && !coupon.expired
                    ? "border-sky-200 hover:border-sky-300"
                    : "border-gray-200"
                }`}
              >
                {/* Coupon Header */}
                <div
                  className={`p-4 sm:p-6 ${
                    coupon.active && !coupon.used && !coupon.expired
                      ? "bg-gradient-to-r from-sky-600 to-teal-600 text-white"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                        {coupon.couponDetails.couponName}
                      </h3>
                      <p className="text-sm sm:text-base opacity-90 line-clamp-2">
                        {coupon.couponDetails.couponDescription}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-semibold self-start ${
                        coupon.active && !coupon.used && !coupon.expired
                          ? "bg-white text-sky-600"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {coupon.couponDetails.couponType}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <code className="text-lg sm:text-xl font-mono font-bold bg-black/20 px-3 sm:px-4 py-2 rounded-lg truncate min-w-0 flex-1">
                        {coupon.couponDetails.couponCode}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(coupon.couponDetails.couponCode)
                        }
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                        title="Copy code"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                      {coupon.discountInfo.discountDisplay}
                    </div>
                  </div>
                </div>

                {/* Coupon Details */}
                <div className="p-4 sm:p-6">
                  {/* Discount Limits */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                        Minimum Cart
                      </p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {formatPrice(coupon.discountInfo.minimumCartValue)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                        Max Discount
                      </p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {formatPrice(coupon.discountInfo.maximumDiscount)}
                      </p>
                    </div>
                  </div>

                  {/* Applicable Packages */}
                  {coupon.applicabilityInfo.applicablePackages.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Applicable Packages:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {coupon.applicabilityInfo.applicablePackages
                          .slice(0, 4)
                          .map((pkg, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-sky-50 text-sky-700 text-xs sm:text-sm rounded-lg border border-sky-200"
                            >
                              {pkg}
                            </span>
                          ))}
                        {coupon.applicabilityInfo.applicablePackages.length >
                          4 && (
                          <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-50 text-gray-600 text-xs sm:text-sm rounded-lg border border-gray-300">
                            +
                            {coupon.applicabilityInfo.applicablePackages
                              .length - 4}{" "}
                            more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Validity & Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <svg
                        className="w-5 h-5 text-gray-600 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-600">Valid until</p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(coupon.timingInfo.couponValidUntil)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          coupon.active && !coupon.used && !coupon.expired
                            ? "bg-emerald-500"
                            : coupon.used
                              ? "bg-sky-500"
                              : coupon.expired
                                ? "bg-gray-500"
                                : "bg-gray-500"
                        }`}
                      ></div>
                      <div>
                        <p className="text-xs text-gray-600">Status</p>
                        <p className="font-semibold text-gray-800">
                          {coupon.calculatedStatus.effectiveStatus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    {coupon.active && !coupon.used && !coupon.expired ? (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                          Use Coupon Now
                        </button>
                        <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium">
                          View Details
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-sm">
                          {coupon.used
                            ? "This coupon has been used."
                            : coupon.expired
                              ? "This coupon has expired."
                              : "This coupon is no longer available."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics Summary */}
        {couponsData.length > 0 && (
          <div className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Coupon Overview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl border border-sky-200">
                <div className="text-2xl sm:text-3xl font-bold text-sky-700">
                  {stats.ALL}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Coupons</div>
              </div>
              <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700">
                  {stats.ACTIVE}
                </div>
                <div className="text-sm text-gray-600 mt-1">Available</div>
              </div>
              <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl border border-sky-200">
                <div className="text-2xl sm:text-3xl font-bold text-sky-700">
                  {stats.USED}
                </div>
                <div className="text-sm text-gray-600 mt-1">Redeemed</div>
              </div>
              <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border border-gray-300">
                <div className="text-2xl sm:text-3xl font-bold text-gray-700">
                  {stats.EXPIRED}
                </div>
                <div className="text-sm text-gray-600 mt-1">Expired</div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Action Button */}
        {couponsData.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-2xl sm:hidden z-50">
            <button className="w-full py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300">
              Get More Coupons
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
