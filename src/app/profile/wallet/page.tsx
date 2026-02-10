// app/profile/wallet/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import { WalletData } from "@/types/user-profile";
import { USER_PROFILE_WALLET_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function WalletPage() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiService = new UserProfileAPIService();

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.privileges.includes(USER_PROFILE_WALLET_VIEW_PRIVILEGE)) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getWalletData();
      setWalletData(response.data);
    } catch (err) {
      console.error("Failed to load wallet data:", err);
      setError("Failed to load wallet information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "closed":
        return "bg-red-50 text-red-700 border-red-200";
      case "suspended":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            {/* Header Loading */}
            <div>
              <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
            
            {/* Main Wallet Card Loading */}
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl shadow-lg p-8">
              <div className="h-40 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl mb-6"></div>
            </div>
            
            {/* Details Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Wallet Loading Failed</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadWalletData}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!walletData) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-sky-50 to-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">No Wallet Found</h3>
            <p className="text-gray-600 mb-6">You don&apos;t have a wallet set up yet.</p>
            <button className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              Create Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 lg:mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Travel Wallet
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage your travel funds and wallet settings
          </p>
        </div>

        {/* Main Wallet Card */}
        <div className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-600 rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Available Balance</h2>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {formatCurrency(walletData.amount)}
              </div>
              <p className="text-sky-100 text-sm opacity-90">Sri Lankan Rupees (LKR)</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span className="text-sm font-medium">Wallet #{walletData.walletNumber}</span>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${
                walletData.walletStatusName === "Open"
                  ? "bg-emerald-500/30 text-emerald-100 border-emerald-400/50"
                  : walletData.walletStatusName === "Closed"
                  ? "bg-red-500/30 text-red-100 border-red-400/50"
                  : "bg-amber-500/30 text-amber-100 border-amber-400/50"
              }`}>
                {walletData.walletStatusName}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sky-100 text-sm mb-1">Account Holder</p>
              <p className="font-semibold text-lg">{walletData.firstName} {walletData.lastName}</p>
            </div>
            <div className="text-sky-100 text-4xl md:text-5xl">💳</div>
          </div>
        </div>

        {/* Wallet Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Account Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-100 to-sky-200 rounded-xl flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">Account Information</h3>
                <p className="text-gray-600 text-sm">Personal wallet details</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600 font-medium">Username</span>
                <span className="font-semibold text-sky-700">{walletData.username}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600 font-medium">User ID</span>
                <span className="font-semibold text-gray-800">#{walletData.userId}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-600 font-medium">Wallet ID</span>
                <span className="font-semibold text-teal-700">#{walletData.walletId}</span>
              </div>
            </div>
          </div>

          {/* Wallet Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-teal-200 rounded-xl flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">Wallet Status</h3>
                <p className="text-gray-600 text-sm">Current wallet state</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <span className="text-sm text-gray-600 font-medium block mb-2">Status</span>
                <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(walletData.walletStatusName)}`}>
                  {walletData.walletStatusName}
                </span>
              </div>
              
              <div>
                <span className="text-sm text-gray-600 font-medium block mb-2">Description</span>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {walletData.walletStatusDescription || "No description available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Wallet Timeline</h3>
              <p className="text-gray-600 text-sm">Key wallet events</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-gray-800 text-base">Wallet Created</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(walletData.walletCreatedAt)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Your travel wallet was successfully created and activated for transactions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-sky-500 rounded-full mt-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-gray-800 text-base">Last Updated</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(walletData.walletUpdatedAt)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Wallet information and status was last updated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <button className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 text-center hover:shadow-xl transition-all duration-300 group hover:border-sky-200">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-sky-100 group-hover:to-sky-200 transition-colors">
                <span className="text-2xl">💸</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-base">Add Funds</h4>
              <p className="text-gray-600 text-sm">Top up your wallet balance</p>
            </button>

            <button className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 text-center hover:shadow-xl transition-all duration-300 group hover:border-teal-200">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-teal-100 group-hover:to-teal-200 transition-colors">
                <span className="text-2xl">📤</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-base">Transfer</h4>
              <p className="text-gray-600 text-sm">Send to another wallet</p>
            </button>

            <button className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 text-center hover:shadow-xl transition-all duration-300 group hover:border-cyan-200">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-cyan-100 group-hover:to-cyan-200 transition-colors">
                <span className="text-2xl">📄</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-base">Statement</h4>
              <p className="text-gray-600 text-sm">View transaction history</p>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Need help? Contact our support team at support@felicitatrips.com
          </p>
        </div>
      </div>
    </div>
  );
}