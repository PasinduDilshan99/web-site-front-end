// app/profile/wish-list/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { PackageWishItem, TourWishItem, DestinationWishItem, ActivityWishItem } from '@/types/wishlist';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function WishListPage() {
  const [wishListData, setWishListData] = useState<{
    packages: PackageWishItem[];
    tours: TourWishItem[];
    destinations: DestinationWishItem[];
    activities: ActivityWishItem[];
  }>({
    packages: [],
    tours: [],
    destinations: [],
    activities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'packages' | 'tours' | 'destinations' | 'activities'>('all');
  const apiService = new UserProfileAPIService();
  const router = useRouter();

  useEffect(() => {
    loadWishListDetails();
  }, []);

  const loadWishListDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getWishListDetails();
      setWishListData({
        packages: response.data.packageWishResponseDtos || [],
        tours: response.data.tourWishResponsesDtos || [],
        destinations: response.data.destinationWishResponseDtos || [],
        activities: response.data.activityWishResponseDtos || []
      });
    } catch (err) {
      console.error('Failed to load wish list:', err);
      setError('Failed to load wish list');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleItemClick = (url: string) => {
    router.push(url);
  };

  const getCategoryStats = () => {
    return {
      all: wishListData.packages.length + wishListData.tours.length + wishListData.destinations.length + wishListData.activities.length,
      packages: wishListData.packages.length,
      tours: wishListData.tours.length,
      destinations: wishListData.destinations.length,
      activities: wishListData.activities.length
    };
  };

  const stats = getCategoryStats();

  const PackageCard = ({ item }: { item: PackageWishItem }) => (
    <div 
      onClick={() => handleItemClick(item.packageUrl)}
      className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.packageImages[0] || '/images/placeholder.jpg'} 
          alt={item.packageName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {item.discount}% OFF
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {item.packageDate}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-purple-600 transition-colors">
          {item.packageName}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.packageDescription}
        </p>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-amber-600 font-bold text-lg">
            {formatCurrency(item.packagePrice)}
          </span>
          <span className="text-purple-600 text-sm font-semibold">
            {item.tourName}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Added {formatDate(item.createdAt)}</span>
          <span className={`px-2 py-1 rounded-full ${
            item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );

  const TourCard = ({ item }: { item: TourWishItem }) => (
    <div 
      onClick={() => handleItemClick(item.tourUrl)}
      className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.tourImages[0] || '/images/placeholder.jpg'} 
          alt={item.tourName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {item.season}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {item.tourName}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.tourDescription}
        </p>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-blue-600 text-sm font-semibold">
            🚌 {item.tourStartLocation} → {item.tourEndLocation}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Added {formatDate(item.createdAt)}</span>
          <span className={`px-2 py-1 rounded-full ${
            item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );

  const DestinationCard = ({ item }: { item: DestinationWishItem }) => (
    <div 
      onClick={() => handleItemClick(item.destinationUrl)}
      className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.destinationImages[0] || '/images/placeholder.jpg'} 
          alt={item.destinationName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {item.destinationCategory}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-green-600 transition-colors">
          {item.destinationName}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.destinationDescription}
        </p>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-green-600 text-sm font-semibold">
            📍 {item.destinationLocation}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Added {formatDate(item.createdAt)}</span>
          <span className={`px-2 py-1 rounded-full ${
            item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );

  const ActivityCard = ({ item }: { item: ActivityWishItem }) => (
    <div 
      onClick={() => handleItemClick(item.activityUrl)}
      className="bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.activityImages[0] || '/images/placeholder.jpg'} 
          alt={item.activityName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {item.activityDuration}h • {item.season}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-purple-600 transition-colors">
          {item.activityName}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.activityDescription}
        </p>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-purple-600 text-sm font-semibold">
            🎯 {item.activitiesCategory}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Added {formatDate(item.createdAt)}</span>
          <span className={`px-2 py-1 rounded-full ${
            item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );

  const filteredItems = {
    packages: activeTab === 'all' || activeTab === 'packages' ? wishListData.packages : [],
    tours: activeTab === 'all' || activeTab === 'tours' ? wishListData.tours : [],
    destinations: activeTab === 'all' || activeTab === 'destinations' ? wishListData.destinations : [],
    activities: activeTab === 'all' || activeTab === 'activities' ? wishListData.activities : []
  };

  const hasItems = Object.values(filteredItems).some(category => category.length > 0);

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            
            {/* Tabs Loading */}
            <div className="flex space-x-4 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gradient-to-r from-amber-100 to-purple-100 rounded-lg w-20"></div>
              ))}
            </div>

            {/* Items Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gradient-to-r from-amber-50 to-purple-50 rounded-2xl"></div>
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
            <div className="text-red-500 text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Wish List</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadWishListDetails}
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            My Wish List
          </h1>
          <p className="text-gray-600 mt-2">Your saved travel experiences and destinations</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {([
            { key: 'all', label: 'All Items', icon: '⭐', count: stats.all },
            { key: 'packages', label: 'Packages', icon: '📦', count: stats.packages },
            { key: 'tours', label: 'Tours', icon: '🚌', count: stats.tours },
            { key: 'destinations', label: 'Destinations', icon: '🏝️', count: stats.destinations },
            { key: 'activities', label: 'Activities', icon: '🎯', count: stats.activities }
          ] as const).map(({ key, label, icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeTab === key
                  ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border border-amber-200 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="font-semibold">{label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === key ? 'bg-white text-purple-600' : 'bg-amber-100 text-amber-800'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Wish List Items */}
        {!hasItems ? (
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-amber-400 text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Wish List is Empty</h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'all' 
                ? "You haven't added any items to your wish list yet." 
                : `You haven't added any ${activeTab} to your wish list yet.`
              }
            </p>
            <button 
              onClick={() => router.push('/sri-lankan-tours')}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Explore Travel Items
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Packages Section */}
            {filteredItems.packages.length > 0 && (
              <div>
                {(activeTab === 'all') && (
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-amber-600 text-2xl mr-2">📦</span>
                    Packages ({wishListData.packages.length})
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.packages.map((item) => (
                    <PackageCard key={item.packageId} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Tours Section */}
            {filteredItems.tours.length > 0 && (
              <div>
                {(activeTab === 'all') && (
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-blue-600 text-2xl mr-2">🚌</span>
                    Tours ({wishListData.tours.length})
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.tours.map((item) => (
                    <TourCard key={item.tourId} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Destinations Section */}
            {filteredItems.destinations.length > 0 && (
              <div>
                {(activeTab === 'all') && (
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-green-600 text-2xl mr-2">🏝️</span>
                    Destinations ({wishListData.destinations.length})
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.destinations.map((item) => (
                    <DestinationCard key={item.destinationId} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Activities Section */}
            {filteredItems.activities.length > 0 && (
              <div>
                {(activeTab === 'all') && (
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-purple-600 text-2xl mr-2">🎯</span>
                    Activities ({wishListData.activities.length})
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.activities.map((item) => (
                    <ActivityCard key={item.activityId} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        {hasItems && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Wish List Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-2xl font-bold text-amber-600">{stats.packages}</div>
                <div className="text-sm text-gray-600">Packages</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{stats.tours}</div>
                <div className="text-sm text-gray-600">Tours</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{stats.destinations}</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{stats.activities}</div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}