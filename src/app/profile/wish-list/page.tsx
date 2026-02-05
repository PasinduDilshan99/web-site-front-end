// app/profile/wish-list/page.tsx
"use client"
import { useAuth } from '@/context/AuthContext';
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { PackageWishItem, TourWishItem, DestinationWishItem, ActivityWishItem } from '@/types/wishlist';
import { USER_PROFILE_WISH_LIST_VIEW_PRIVILEGE } from '@/utils/privileges';
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

  const { user } = useAuth();
  
  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_WISH_LIST_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

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

  const CardContainer = ({ children, category }: { children: React.ReactNode; category: string }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:translate-y-[-4px]">
      {children}
    </div>
  );

  const PackageCard = ({ item }: { item: PackageWishItem }) => (
    <CardContainer category="packages">
      <div className="relative h-52 md:h-56 overflow-hidden">
        <img 
          src={item.packageImages[0] || '/images/placeholder.jpg'} 
          alt={item.packageName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {item.discount > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg">
            {item.discount}% OFF
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1 group-hover:text-sky-600 transition-colors duration-300 line-clamp-1">
            {item.packageName}
          </h3>
          <span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-semibold border border-sky-200">
            Package
          </span>
        </div>
        
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
          {item.packageDescription}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(item.createdAt)}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === 'ACTIVE' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-gray-100 text-gray-700 border border-gray-300'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </CardContainer>
  );

  const TourCard = ({ item }: { item: TourWishItem }) => (
    <CardContainer category="tours">
      <div className="relative h-52 md:h-56 overflow-hidden">
        <img 
          src={item.tourImages[0] || '/images/placeholder.jpg'} 
          alt={item.tourName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-600/90 to-sky-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
          {item.season}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1 group-hover:text-teal-600 transition-colors duration-300 line-clamp-1">
            {item.tourName}
          </h3>
          <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold border border-teal-200">
            Tour
          </span>
        </div>
        
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
          {item.tourDescription}
        </p>
        
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-blue-600 text-sm font-medium">
            {item.tourStartLocation} → {item.tourEndLocation}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(item.createdAt)}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === 'ACTIVE' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-gray-100 text-gray-700 border border-gray-300'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </CardContainer>
  );

  const DestinationCard = ({ item }: { item: DestinationWishItem }) => (
    <CardContainer category="destinations">
      <div className="relative h-52 md:h-56 overflow-hidden">
        <img 
          src={item.destinationImages[0] || '/images/placeholder.jpg'} 
          alt={item.destinationName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
          {item.destinationCategory}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-1">
            {item.destinationName}
          </h3>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
            Destination
          </span>
        </div>
        
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
          {item.destinationDescription}
        </p>
        
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-emerald-600 text-sm font-medium">
            {item.destinationLocation}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(item.createdAt)}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === 'ACTIVE' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-gray-100 text-gray-700 border border-gray-300'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </CardContainer>
  );

  const ActivityCard = ({ item }: { item: ActivityWishItem }) => (
    <CardContainer category="activities">
      <div className="relative h-52 md:h-56 overflow-hidden">
        <img 
          src={item.activityImages[0] || '/images/placeholder.jpg'} 
          alt={item.activityName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-purple-600/90 to-violet-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
          {item.activityDuration}h • {item.season}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1 group-hover:text-purple-600 transition-colors duration-300 line-clamp-1">
            {item.activityName}
          </h3>
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
            Activity
          </span>
        </div>
        
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
          {item.activityDescription}
        </p>
        
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-purple-600 text-sm font-medium">
            {item.activitiesCategory}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(item.createdAt)}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === 'ACTIVE' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-gray-100 text-gray-700 border border-gray-300'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    </CardContainer>
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
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            {/* Header Loading */}
            <div>
              <div className="h-10 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
            
            {/* Tabs Loading */}
            <div className="flex flex-wrap gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl w-24"></div>
              ))}
            </div>

            {/* Grid Loading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-56 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-full"></div>
                </div>
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
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Unable to Load Wish List</h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={loadWishListDetails}
              className="px-8 py-3.5 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                My Wish List
              </h1>
              <p className="text-gray-600 text-sm md:text-base">Your saved travel experiences and destinations</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-4 py-2 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-200">
                {stats.all} Total Items
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 md:mb-12 overflow-x-auto pb-4">
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
              className={`flex items-center space-x-3 px-5 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                activeTab === key
                  ? 'bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-lg scale-[1.02]'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-sky-300 hover:shadow-md'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="font-semibold text-sm md:text-base">{label}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                activeTab === key ? 'bg-white text-sky-600' : 'bg-sky-50 text-sky-700 border border-sky-200'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Wish List Items */}
        {!hasItems ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Your Wish List is Empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {activeTab === 'all' 
                ? "Start exploring our amazing travel experiences and add your favorites to your wish list." 
                : `You haven't added any ${activeTab} to your wish list yet. Start exploring now!`
              }
            </p>
            <button 
              onClick={() => router.push('/sri-lankan-tours')}
              className="px-8 py-3.5 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] font-semibold"
            >
              Explore Travel Items
            </button>
          </div>
        ) : (
          <div className="space-y-10 md:space-y-12">
            {/* Packages Section */}
            {filteredItems.packages.length > 0 && (
              <div>
                {(activeTab === 'all') && (
                  <div className="flex items-center space-x-4 mb-6 md:mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">📦</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Packages <span className="text-sky-600">({wishListData.packages.length})</span>
                    </h2>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <div className="flex items-center space-x-4 mb-6 md:mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">🚌</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Tours <span className="text-blue-600">({wishListData.tours.length})</span>
                    </h2>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <div className="flex items-center space-x-4 mb-6 md:mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">🏝️</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Destinations <span className="text-emerald-600">({wishListData.destinations.length})</span>
                    </h2>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <div className="flex items-center space-x-4 mb-6 md:mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Activities <span className="text-purple-600">({wishListData.activities.length})</span>
                    </h2>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
          <div className="mt-12 md:mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">Wish List Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center p-4 md:p-5 bg-sky-50 rounded-xl border border-sky-200 hover:border-sky-300 transition-all duration-200">
                <div className="text-2xl md:text-3xl font-bold text-sky-600 mb-1">{stats.packages}</div>
                <div className="text-sm text-gray-600 font-medium">Packages</div>
              </div>
              <div className="text-center p-4 md:p-5 bg-blue-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{stats.tours}</div>
                <div className="text-sm text-gray-600 font-medium">Tours</div>
              </div>
              <div className="text-center p-4 md:p-5 bg-emerald-50 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all duration-200">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">{stats.destinations}</div>
                <div className="text-sm text-gray-600 font-medium">Destinations</div>
              </div>
              <div className="text-center p-4 md:p-5 bg-purple-50 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-200">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">{stats.activities}</div>
                <div className="text-sm text-gray-600 font-medium">Activities</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm text-center">
                Total saved items: <span className="font-semibold text-sky-600">{stats.all}</span> • 
                Last updated: <span className="font-medium text-gray-800">Today</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}