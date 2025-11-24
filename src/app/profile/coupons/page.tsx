// app/profile/coupons/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { useState, useEffect } from 'react';

export default function CouponsPage() {
  const [couponsData, setCouponsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const apiService = new UserProfileAPIService();

  useEffect(() => {
    loadCouponsData();
  }, []);

  const loadCouponsData = async () => {
    try {
      setLoading(true);
      const data = await apiService.fetchContentByUrl('/coupons');
      setCouponsData(data);
    } catch (error) {
      console.error('Failed to load coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-r from-amber-100 to-purple-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Coupons & Offers
          </h1>
          <p className="text-gray-600 mb-6">Your available coupons and special offers</p>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            {couponsData ? (
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(couponsData, null, 2)}
              </pre>
            ) : (
              <div className="text-center text-gray-500">
                No coupons data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}