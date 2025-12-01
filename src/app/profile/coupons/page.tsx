// app/profile/coupons/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { CouponData } from '@/types/coupon';
import { useState, useEffect } from 'react';

export default function CouponsPage() {
  const [couponsData, setCouponsData] = useState<CouponData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'EXPIRED' | 'USED'>('ALL');
  const apiService = new UserProfileAPIService();

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
      console.error('Failed to load coupons:', err);
      setError('Failed to load coupons data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'USED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return '🟢';
      case 'EXPIRED':
        return '🔴';
      case 'USED':
        return '🟣';
      default:
        return '⚪';
    }
  };

  const getCouponTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'seasonal':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'first-time':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'loyalty':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCoupons = filter === 'ALL' 
    ? couponsData 
    : couponsData.filter(coupon => {
        if (filter === 'ACTIVE') return coupon.active && !coupon.used && !coupon.expired;
        if (filter === 'EXPIRED') return coupon.expired;
        if (filter === 'USED') return coupon.used;
        return true;
      });

  const getStats = () => {
    const stats = {
      ALL: couponsData.length,
      ACTIVE: couponsData.filter(c => c.active && !c.used && !c.expired).length,
      EXPIRED: couponsData.filter(c => c.expired).length,
      USED: couponsData.filter(c => c.used).length,
    };
    return stats;
  };

  const stats = getStats();

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // You can add a toast notification here
    console.log('Copied to clipboard:', code);
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            
            {/* Stats Loading */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gradient-to-r from-amber-100 to-purple-100 rounded-xl"></div>
              ))}
            </div>

            {/* Coupons Loading */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gradient-to-r from-amber-50 to-purple-50 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Coupons</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadCouponsData}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            Coupons & Offers
          </h1>
          <p className="text-gray-600 mt-2">Your available coupons and special offers</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(['ALL', 'ACTIVE', 'USED', 'EXPIRED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`bg-white rounded-xl shadow-lg border p-4 text-center transition-all duration-300 hover:shadow-xl ${
                filter === status 
                  ? 'border-purple-500 shadow-md scale-105' 
                  : 'border-amber-200 hover:border-purple-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                filter === status ? 'bg-purple-100' : 'bg-amber-50'
              }`}>
                <span className="text-xl">{getStatusIcon(status)}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats[status]}</div>
              <div className={`text-sm font-medium ${
                filter === status ? 'text-purple-600' : 'text-gray-600'
              }`}>
                {status === 'ALL' ? 'All Coupons' : status}
              </div>
            </button>
          ))}
        </div>

        {/* Coupons List */}
        {filteredCoupons.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {filter === 'ALL' ? 'No Coupons Available' : `No ${filter} Coupons`}
            </h3>
            <p className="text-gray-600">
              {filter === 'ALL' 
                ? "You don't have any coupons yet." 
                : `You don't have any ${filter.toLowerCase()} coupons.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCoupons.map((coupon) => (
              <div
                key={coupon.allocationId}
                className={`bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  coupon.active && !coupon.used && !coupon.expired
                    ? 'border-amber-300 hover:border-purple-400'
                    : 'border-gray-200'
                }`}
              >
                {/* Coupon Header */}
                <div className={`p-6 ${
                  coupon.active && !coupon.used && !coupon.expired
                    ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{coupon.couponDetails.couponName}</h3>
                      <p className="text-sm opacity-90">{coupon.couponDetails.couponDescription}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      coupon.active && !coupon.used && !coupon.expired
                        ? 'bg-white text-purple-600'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {coupon.couponDetails.couponType}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <code className="text-lg font-mono font-bold bg-black/20 px-3 py-1 rounded">
                        {coupon.couponDetails.couponCode}
                      </code>
                      <button
                        onClick={() => copyToClipboard(coupon.couponDetails.couponCode)}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                        title="Copy code"
                      >
                        📋
                      </button>
                    </div>
                    <div className="text-2xl font-bold">
                      {coupon.discountInfo.discountDisplay}
                    </div>
                  </div>
                </div>

                {/* Coupon Details */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Minimum Cart</p>
                      <p className="font-semibold text-gray-800">
                        {formatCurrency(coupon.discountInfo.minimumCartValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Max Discount</p>
                      <p className="font-semibold text-gray-800">
                        {formatCurrency(coupon.discountInfo.maximumDiscount)}
                      </p>
                    </div>
                  </div>

                  {/* Applicable Packages */}
                  {coupon.applicabilityInfo.applicablePackages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Applicable for:</p>
                      <div className="flex flex-wrap gap-1">
                        {coupon.applicabilityInfo.applicablePackages.slice(0, 3).map((pkg, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded border border-amber-200"
                          >
                            {pkg}
                          </span>
                        ))}
                        {coupon.applicabilityInfo.applicablePackages.length > 3 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border border-gray-200">
                            +{coupon.applicabilityInfo.applicablePackages.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Validity */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Valid until</p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(coupon.timingInfo.couponValidUntil)}
                    </p>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(coupon.calculatedStatus.effectiveStatus)}`}>
                      {coupon.calculatedStatus.effectiveStatus}
                    </span>
                    
                    {coupon.active && !coupon.used && !coupon.expired && (
                      <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold">
                        Use Coupon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {couponsData.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Coupon Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-2xl font-bold text-amber-600">{stats.ALL}</div>
                <div className="text-sm text-gray-600">Total Coupons</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{stats.ACTIVE}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{stats.USED}</div>
                <div className="text-sm text-gray-600">Used</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">{stats.EXPIRED}</div>
                <div className="text-sm text-gray-600">Expired</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}