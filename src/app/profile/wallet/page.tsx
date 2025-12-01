// app/profile/wallet/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { WalletData } from '@/types/user-profile';
import { useState, useEffect } from 'react';

export default function WalletPage() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiService = new UserProfileAPIService();

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
      console.error('Failed to load wallet data:', err);
      setError('Failed to load wallet information');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'suspended':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            {/* Header Loading */}
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            
            {/* Main Card Loading */}
            <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 mb-8">
              <div className="h-32 bg-gradient-to-r from-amber-100 to-purple-100 rounded-xl mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gradient-to-r from-amber-50 to-purple-50 rounded-lg"></div>
                ))}
              </div>
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
            <div className="text-red-500 text-6xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Wallet</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadWalletData}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!walletData) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Wallet Found</h3>
            <p className="text-gray-600">You don't have a wallet set up yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            My Wallet
          </h1>
          <p className="text-gray-600 mt-2">Manage your travel funds and wallet settings</p>
        </div>

        {/* Main Wallet Card */}
        <div className="bg-gradient-to-br from-amber-500 to-purple-600 rounded-2xl shadow-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Travel Wallet</h2>
              <p className="text-amber-100 text-sm">Available Balance</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${
              walletData.walletStatusName === 'Open' 
                ? 'bg-green-500/20 text-green-100 border-green-300/50'
                : 'bg-red-500/20 text-red-100 border-red-300/50'
            }`}>
              {walletData.walletStatusName}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              {formatCurrency(walletData.amount)}
            </div>
            <p className="text-amber-100 text-sm">LKR</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-amber-100 text-sm">Wallet Number</p>
              <p className="font-semibold">{walletData.walletNumber}</p>
            </div>
            <div className="text-amber-100 text-4xl">💳</div>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Account Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                👤
              </span>
              Account Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Account Holder</span>
                <span className="font-semibold text-gray-800">
                  {walletData.firstName} {walletData.lastName}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Username</span>
                <span className="font-semibold text-purple-600">{walletData.username}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">User ID</span>
                <span className="font-semibold text-gray-800">#{walletData.userId}</span>
              </div>
            </div>
          </div>

          {/* Wallet Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                📊
              </span>
              Wallet Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(walletData.walletStatusName)}`}>
                  {walletData.walletStatusName}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600 block mb-1">Description</span>
                <p className="text-gray-800 text-sm">{walletData.walletStatusDescription}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Wallet ID</span>
                <span className="font-semibold text-purple-600">#{walletData.walletId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
              ⏰
            </span>
            Wallet Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-gray-800">Wallet Created</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(walletData.walletCreatedAt)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Your travel wallet was successfully created and activated.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-gray-800">Last Updated</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(walletData.walletUpdatedAt)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Wallet information was last updated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white rounded-xl shadow-lg border border-amber-200 p-4 text-center hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-200 transition-colors">
              <span className="text-xl">💸</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Add Funds</h4>
            <p className="text-gray-600 text-sm">Top up your wallet</p>
          </button>

          <button className="bg-white rounded-xl shadow-lg border border-purple-200 p-4 text-center hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
              <span className="text-xl">📤</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Transfer</h4>
            <p className="text-gray-600 text-sm">Send to another wallet</p>
          </button>

          <button className="bg-white rounded-xl shadow-lg border border-amber-200 p-4 text-center hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-200 transition-colors">
              <span className="text-xl">📄</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Statement</h4>
            <p className="text-gray-600 text-sm">View transaction history</p>
          </button>
        </div>
      </div>
    </div>
  );
}