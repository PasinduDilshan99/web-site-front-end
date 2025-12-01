// app/profile/browsing-history/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { HistoryItem } from '@/types/user-profile';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function BrowsingHistoryPage() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'TOUR' | 'PACKAGE' | 'DESTINATIONS' | 'ACTIVITIES'>('ALL');
  const apiService = new UserProfileAPIService();
  const router = useRouter();

  useEffect(() => {
    loadBrowsingHistory();
  }, []);

  const loadBrowsingHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getBrowsingHistory();
      setHistoryData(response.data || []);
    } catch (err) {
      console.error('Failed to load browsing history:', err);
      setError('Failed to load browsing history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'TOUR':
        return '🚌';
      case 'PACKAGE':
        return '📦';
      case 'DESTINATIONS':
        return '🏝️';
      case 'ACTIVITIES':
        return '🎯';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'TOUR':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PACKAGE':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'DESTINATIONS':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'ACTIVITIES':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'TOUR':
        return 'Tour';
      case 'PACKAGE':
        return 'Package';
      case 'DESTINATIONS':
        return 'Destination';
      case 'ACTIVITIES':
        return 'Activity';
      default:
        return type;
    }
  };

  const handleItemClick = (item: HistoryItem) => {
    let route = '';
    
    switch (item.type) {
      case 'TOUR':
        route = `/sri-lankan-tours/${item.dataId}`;
        break;
      case 'PACKAGE':
        route = `/packages/${item.dataId}`;
        break;
      case 'DESTINATIONS':
        route = `/destinations/${item.dataId}`;
        break;
      case 'ACTIVITIES':
        route = `/activities/${item.dataId}`;
        break;
      default:
        return;
    }
    
    router.push(route);
  };

  const filteredHistory = filter === 'ALL' 
    ? historyData 
    : historyData.filter(item => item.type === filter);

  const getTypeStats = () => {
    const stats = {
      ALL: historyData.length,
      TOUR: historyData.filter(item => item.type === 'TOUR').length,
      PACKAGE: historyData.filter(item => item.type === 'PACKAGE').length,
      DESTINATIONS: historyData.filter(item => item.type === 'DESTINATIONS').length,
      ACTIVITIES: historyData.filter(item => item.type === 'ACTIVITIES').length,
    };
    return stats;
  };

  const typeStats = getTypeStats();

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            {/* Header Loading */}
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            
            {/* Stats Loading */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gradient-to-r from-amber-100 to-purple-100 rounded-xl"></div>
              ))}
            </div>

            {/* History Items Loading */}
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gradient-to-r from-amber-50 to-purple-50 rounded-lg"></div>
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
            <div className="text-red-500 text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load History</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadBrowsingHistory}
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
            Browsing History
          </h1>
          <p className="text-gray-600 mt-2">Your recently viewed travel items</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {(['ALL', 'TOUR', 'PACKAGE', 'DESTINATIONS', 'ACTIVITIES'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`bg-white rounded-xl shadow-lg border p-4 text-center transition-all duration-300 hover:shadow-xl ${
                filter === type 
                  ? 'border-purple-500 shadow-md scale-105' 
                  : 'border-amber-200 hover:border-purple-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                filter === type ? 'bg-purple-100' : 'bg-amber-50'
              }`}>
                <span className="text-xl">{getTypeIcon(type === 'ALL' ? 'ALL' : type)}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{typeStats[type]}</div>
              <div className={`text-sm font-medium ${
                filter === type ? 'text-purple-600' : 'text-gray-600'
              }`}>
                {type === 'ALL' ? 'All Items' : getTypeName(type)}
              </div>
            </button>
          ))}
        </div>

        {/* History List */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-amber-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {filter === 'ALL' ? 'No Browsing History' : `No ${getTypeName(filter)} History`}
              </h3>
              <p className="text-gray-600">
                {filter === 'ALL' 
                  ? "You haven't browsed any travel items yet." 
                  : `You haven't browsed any ${getTypeName(filter).toLowerCase()}s yet.`
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-6 hover:bg-amber-50 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        item.type === 'TOUR' ? 'bg-blue-100 text-blue-600' :
                        item.type === 'PACKAGE' ? 'bg-purple-100 text-purple-600' :
                        item.type === 'DESTINATIONS' ? 'bg-amber-100 text-amber-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-gray-800 truncate group-hover:text-purple-600 transition-colors">
                            {getTypeName(item.type)} #{item.dataId}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getTypeColor(item.type)}`}>
                            {getTypeName(item.type)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Viewed on {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.statusName === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {item.statusName}
                      </span>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1">
                        <span className="text-purple-600 text-sm font-medium">View</span>
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {historyData.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredHistory.length} of {historyData.length} items
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  // Clear history functionality can be implemented here
                  console.log('Clear history clicked');
                }}
                className="px-4 py-2 bg-white border border-amber-200 text-amber-600 rounded-lg hover:bg-amber-50 transition-all duration-300 font-medium"
              >
                Clear History
              </button>
              <button 
                onClick={() => {
                  // Export history functionality can be implemented here
                  console.log('Export history clicked');
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Export History
              </button>
            </div>
          </div>
        )}

        {/* Empty State Illustration */}
        {historyData.length === 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 max-w-md mx-auto">
              <div className="text-amber-400 text-6xl mb-4">🌴</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Exploring</h3>
              <p className="text-gray-600 mb-6">
                Your browsing history will appear here as you explore tours, packages, destinations, and activities.
              </p>
              <button 
                onClick={() => router.push('/sri-lankan-tours')}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Browse Travel Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}