// app/profile/user-benefits/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { UserBenefitsData } from '@/types/user-benefits';
import { useState, useEffect } from 'react';

export default function UserBenefitsPage() {
  const [benefitsData, setBenefitsData] = useState<UserBenefitsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<'previous' | 'current' | 'next'>('current');
  const apiService = new UserProfileAPIService();

  useEffect(() => {
    loadUserBenefits();
  }, []);

  const loadUserBenefits = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUserBenefits();
      setBenefitsData(response.data);
    } catch (err) {
      console.error('Failed to load user benefits:', err);
      setError('Failed to load user benefits');
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case 'silver':
        return 'bg-gray-500 text-white';
      case 'gold':
        return 'bg-amber-500 text-white';
      case 'platinum':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getLevelBorderColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case 'silver':
        return 'border-gray-300';
      case 'gold':
        return 'border-amber-300';
      case 'platinum':
        return 'border-purple-300';
      default:
        return 'border-blue-300';
    }
  };

  const getLevelBgColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case 'silver':
        return 'bg-gray-50';
      case 'gold':
        return 'bg-amber-50';
      case 'platinum':
        return 'bg-purple-50';
      default:
        return 'bg-blue-50';
    }
  };

  const getBenefitIcon = (benefitType: string) => {
    switch (benefitType) {
      case 'CASHBACK':
        return '💰';
      case 'DISCOUNT':
        return '🎫';
      case 'FREE_SERVICE':
        return '🎁';
      default:
        return '⭐';
    }
  };

  const getBenefitColor = (benefitType: string) => {
    switch (benefitType) {
      case 'CASHBACK':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'DISCOUNT':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'FREE_SERVICE':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-r from-amber-100 to-purple-100 rounded-2xl"></div>
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
            <div className="text-red-500 text-6xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Benefits</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadUserBenefits}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!benefitsData) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Benefits Data</h3>
            <p className="text-gray-600">Unable to load your benefits information.</p>
          </div>
        </div>
      </div>
    );
  }

  const { userDetails, currentUserLevel, previousUserLevel, nextUserLevel, progress } = benefitsData;

  const displayLevel = activeLevel === 'previous' ? previousUserLevel : 
                     activeLevel === 'current' ? currentUserLevel : 
                     nextUserLevel;

  return (
   <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-amber-50/50 to-purple-50/50 min-h-screen">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
        My Benefits
      </h1>
      <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
        Your loyalty rewards and membership benefits
      </p>
    </div>

    {/* User Points Card */}
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-200 p-5 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl text-white font-bold flex-shrink-0">
            {currentUserLevel.levelName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
              {userDetails.firstName} {userDetails.lastName}
            </h2>
            <p className="text-gray-600 text-sm">@{userDetails.username}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
              <span className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold ${getLevelColor(currentUserLevel.levelName)}`}>
                {currentUserLevel.levelName} Member
              </span>
              <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {userDetails.benefitsPointsCount.toLocaleString()} Points
              </span>
            </div>
          </div>
        </div>
        <div className="text-left md:text-right mt-4 md:mt-0">
          <div className="text-xl sm:text-2xl font-bold text-purple-600">
            {progress.pointsNeededForNextLevel.toLocaleString()} points to {nextUserLevel.levelName}
          </div>
          <div className="text-sm text-gray-600">Next level progress</div>
        </div>
      </div>
    </div>

    {/* Progress Bar */}
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-200 p-5 sm:p-6 mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-700">Progress to {nextUserLevel.levelName}</span>
        <span className="text-sm font-semibold text-purple-600">{progress.progressPercentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
        <div 
          className="bg-gradient-to-r from-amber-500 to-purple-600 h-3 sm:h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress.progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mt-2 text-xs sm:text-sm text-gray-500">
        <span className="truncate">{currentUserLevel.levelName} ({currentUserLevel.pointsNeeded.toLocaleString()} pts)</span>
        <span className="truncate">{nextUserLevel.levelName} ({nextUserLevel.pointsNeeded.toLocaleString()} pts)</span>
      </div>
    </div>

    {/* Level Comparison - VERTICAL STACK ON MOBILE */}
    <div className="mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Membership Levels</h3>
      
      <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
        {/* Previous Level */}
        <div 
          className={`bg-white rounded-xl border-2 ${getLevelBorderColor(previousUserLevel.levelName)} p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            activeLevel === 'previous' ? 'ring-2 ring-gray-400 sm:scale-105' : ''
          }`}
          onClick={() => setActiveLevel('previous')}
        >
          <div className="text-center">
            <div className={`w-12 h-12 ${getLevelColor(previousUserLevel.levelName)} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
              {previousUserLevel.levelName.charAt(0)}
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">{previousUserLevel.levelName}</h4>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{previousUserLevel.description}</p>
            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
              {previousUserLevel.pointsNeeded.toLocaleString()} Points
            </div>
          </div>
        </div>

        {/* Current Level (Highlighted) */}
        <div 
          className={`bg-white rounded-xl border-2 ${getLevelBorderColor(currentUserLevel.levelName)} p-5 cursor-pointer transition-all duration-300 hover:shadow-xl ${
            activeLevel === 'current' ? 'ring-2 ring-amber-400 sm:scale-105' : ''
          }`}
          onClick={() => setActiveLevel('current')}
        >
          <div className="text-center relative">
            <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Current
            </div>
            <div className={`w-14 h-14 ${getLevelColor(currentUserLevel.levelName)} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3`}>
              {currentUserLevel.levelName.charAt(0)}
            </div>
            <h4 className="font-bold text-gray-800 text-xl mb-2">{currentUserLevel.levelName}</h4>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{currentUserLevel.description}</p>
            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
              YOUR LEVEL
            </div>
          </div>
        </div>

        {/* Next Level */}
        <div 
          className={`bg-white rounded-xl border-2 ${getLevelBorderColor(nextUserLevel.levelName)} p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            activeLevel === 'next' ? 'ring-2 ring-purple-400 sm:scale-105' : ''
          }`}
          onClick={() => setActiveLevel('next')}
        >
          <div className="text-center">
            <div className={`w-12 h-12 ${getLevelColor(nextUserLevel.levelName)} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
              {nextUserLevel.levelName.charAt(0)}
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">{nextUserLevel.levelName}</h4>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{nextUserLevel.description}</p>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              {nextUserLevel.pointsNeeded.toLocaleString()} Points
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Benefits for Selected Level */}
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-200 overflow-hidden mb-8">
      <div className={`p-5 sm:p-6 ${getLevelBgColor(displayLevel.levelName)}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${getLevelColor(displayLevel.levelName)} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
            {displayLevel.levelName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              {displayLevel.levelName} Level Benefits
            </h3>
            <p className="text-gray-600 text-sm sm:text-base line-clamp-2">{displayLevel.description}</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:gap-6 sm:space-y-0">
          {displayLevel.benefits.map((benefit) => (
            <div key={benefit.benefitId} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl">{getBenefitIcon(benefit.benefitType)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 truncate">
                    {benefit.benefitName}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getBenefitColor(benefit.benefitType)}`}>
                    {benefit.benefitType.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {benefit.benefitDescription}
              </p>

              {benefit.benefitValue > 0 && (
                <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
                  {benefit.benefitValue}%
                  {benefit.benefitType === 'CASHBACK' && ' Cashback'}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-gray-500">
                <div className="truncate">
                  Valid: {formatDate(benefit.validFrom)} - {formatDate(benefit.validTo)}
                </div>
                <div className={`px-2 py-1 rounded-full ${
                  benefit.benefitStatus === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {benefit.benefitStatus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* How to Earn More Points */}
    <div className="bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white mb-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
        <span>🚀</span>
        How to Earn More Points
      </h3>
      <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:space-y-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-lg">💰</div>
          <div>
            <div className="font-semibold text-sm sm:text-base">Book Tours</div>
            <div className="text-amber-100 text-xs sm:text-sm">10 points per $1</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-lg">⭐</div>
          <div>
            <div className="font-semibold text-sm sm:text-base">Write Reviews</div>
            <div className="text-amber-100 text-xs sm:text-sm">50 points each</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-lg">👥</div>
          <div>
            <div className="font-semibold text-sm sm:text-base">Refer Friends</div>
            <div className="text-amber-100 text-xs sm:text-sm">500 points each</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-lg">🎯</div>
          <div>
            <div className="font-semibold text-sm sm:text-base">Complete Activities</div>
            <div className="text-amber-100 text-xs sm:text-sm">25 points each</div>
          </div>
        </div>
      </div>
    </div>

    {/* Benefits Comparison Table */}
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
      <div className="bg-amber-50 p-5 sm:p-6 border-b border-amber-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-amber-600">📊</span>
          Benefits Comparison
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Benefit
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase truncate">
                {previousUserLevel.levelName}
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase truncate">
                {currentUserLevel.levelName}
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase truncate">
                {nextUserLevel.levelName}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {['CASHBACK', 'DISCOUNT', 'FREE_SERVICE'].map((benefitType) => (
              <tr key={benefitType}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {benefitType.replace('_', ' ')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-center">
                  {previousUserLevel.benefits.find(b => b.benefitType === benefitType)?.benefitValue || '-'}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-center">
                  {currentUserLevel.benefits.find(b => b.benefitType === benefitType)?.benefitValue || '-'}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-center">
                  {nextUserLevel.benefits.find(b => b.benefitType === benefitType)?.benefitValue || '-'}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
}