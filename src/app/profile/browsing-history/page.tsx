// app/profile/browsing-history/page.tsx
"use client"
import { useAuth } from '@/context/AuthContext';
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { BrowsingHistoryRequest, HistoryItem } from '@/types/user-profile';
import { USER_PROFILE_BROWSER_HISTORY_VIEW_PRIVILEGE } from '@/utils/privileges';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function BrowsingHistoryPage() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'TOUR' | 'PACKAGE' | 'DESTINATIONS' | 'ACTIVITIES'>('ALL');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [pageSize, setPageSize] = useState(12);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({});
  const [timeFilter, setTimeFilter] = useState<'all' | '7days' | '30days' | '90days' | 'custom'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const apiService = new UserProfileAPIService();
  const router = useRouter();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user && !user.privileges.includes(USER_PROFILE_BROWSER_HISTORY_VIEW_PRIVILEGE)) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadBrowsingHistory();
  }, [pageNumber, pageSize, filterType, timeFilter, dateRange]);

  const buildRequest = (): BrowsingHistoryRequest => {
    const request: BrowsingHistoryRequest = {
      pageSize,
      pageNumber,
    };

    if (filterType !== 'ALL') {
      request.historyType = filterType;
    }

    if (timeFilter === '7days') {
      request.noOfLastDays = 7;
    } else if (timeFilter === '30days') {
      request.noOfLastDays = 30;
    } else if (timeFilter === '90days') {
      request.noOfLastDays = 90;
    } else if (timeFilter === 'custom' && dateRange.from) {
      request.from = dateRange.from;
      if (dateRange.to) {
        request.to = dateRange.to;
      }
    }

    return request;
  };

  const loadBrowsingHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const request = buildRequest();
      const response = await apiService.getBrowsingHistory(request);
      setHistoryData(response.data.history || []);
      setTotalCount(response.data.totalCount || 0);
    } catch (err) {
      console.error('Failed to load browsing history:', err);
      setError('Failed to load browsing history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < Math.ceil(totalCount / pageSize)) {
      setPageNumber(newPage);
    }
  };

  const clearFilters = () => {
    setFilterType('ALL');
    setTimeFilter('all');
    setDateRange({});
    setPageNumber(0);
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
        return '🗺️';
      case 'ACTIVITIES':
        return '🎯';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'TOUR':
        return 'bg-gradient-to-r from-sky-50 to-sky-100 border-sky-200 text-sky-700';
      case 'PACKAGE':
        return 'bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200 text-teal-700';
      case 'DESTINATIONS':
        return 'bg-gradient-to-r from-cyan-50 to-cyan-100 border-cyan-200 text-cyan-700';
      case 'ACTIVITIES':
        return 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-700';
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

  const getTimeFilterLabel = () => {
    switch (timeFilter) {
      case '7days': return 'Last 7 Days';
      case '30days': return 'Last 30 Days';
      case '90days': return 'Last 90 Days';
      case 'custom': return 'Custom Range';
      default: return 'All Time';
    }
  };

  const getTypeFilterLabel = () => {
    return filterType === 'ALL' ? 'All Types' : getTypeName(filterType);
  };

  const FilterDropdown = ({ 
    label, 
    value, 
    options, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 appearance-none cursor-pointer hover:border-sky-400 transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="py-2">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );

  const DateInput = ({ 
    label, 
    value, 
    onChange,
    max
  }: { 
    label: string; 
    value: string; 
    onChange: (value: string) => void;
    max?: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={max}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:border-sky-400 transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
      />
    </div>
  );

  if (loading && pageNumber === 0) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            {/* Header Loading */}
            <div className="mb-8">
              <div className="h-10 w-72 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg mb-3"></div>
              <div className="h-4 w-48 bg-slate-200 rounded"></div>
            </div>
            
            {/* Filters Loading */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl p-6 shadow-sm">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-12 bg-slate-100 rounded-lg"></div>
                </div>
              ))}
            </div>

            {/* History Items Loading */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Unable to Load History</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={loadBrowsingHistory}
                className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium hover:shadow-sky-200 hover:scale-[1.02]"
              >
                Retry
              </button>
              <button
                onClick={() => router.push('/sri-lankan-tours')}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Browse Tours
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Browsing History
              </h1>
              <p className="text-slate-600 text-sm md:text-base">
                Track and manage your recently viewed travel items
              </p>
            </div>
            {historyData.length > 0 && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-sky-50 to-sky-100 border border-sky-200 rounded-xl p-4">
              <div className="text-sm text-sky-700 font-medium mb-1">Total Items</div>
              <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4">
              <div className="text-sm text-teal-700 font-medium mb-1">Current Filter</div>
              <div className="text-lg font-semibold text-slate-900">{getTypeFilterLabel()}</div>
            </div>
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4">
              <div className="text-sm text-cyan-700 font-medium mb-1">Time Range</div>
              <div className="text-lg font-semibold text-slate-900">{getTimeFilterLabel()}</div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
              <div className="text-sm text-emerald-700 font-medium mb-1">Current Page</div>
              <div className="text-lg font-semibold text-slate-900">{pageNumber + 1}</div>
            </div>
          </div>
        </div>

        {/* Filter Section - Professional Dropdowns */}
        {showFilters && (
          <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-slate-800">Filter Options</h3>
                {(filterType !== 'ALL' || timeFilter !== 'all' || dateRange.from) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    Clear All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-slate-600">View:</label>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'list' 
                          ? 'bg-white text-sky-600 shadow-sm border border-sky-200' 
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      List
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-white text-sky-600 shadow-sm border border-sky-200' 
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      Grid
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type Filter */}
              <FilterDropdown
                label="Content Type"
                value={filterType}
                options={[
                  { value: 'ALL', label: 'All Types' },
                  { value: 'TOUR', label: 'Tours' },
                  { value: 'PACKAGE', label: 'Packages' },
                  { value: 'DESTINATIONS', label: 'Destinations' },
                  { value: 'ACTIVITIES', label: 'Activities' },
                ]}
                onChange={(value) => {
                  setFilterType(value as typeof filterType);
                  setPageNumber(0);
                }}
              />

              {/* Time Filter */}
              <FilterDropdown
                label="Time Period"
                value={timeFilter}
                options={[
                  { value: 'all', label: 'All Time' },
                  { value: '7days', label: 'Last 7 Days' },
                  { value: '30days', label: 'Last 30 Days' },
                  { value: '90days', label: 'Last 90 Days' },
                  { value: 'custom', label: 'Custom Range' },
                ]}
                onChange={(value) => {
                  setTimeFilter(value as typeof timeFilter);
                  setPageNumber(0);
                }}
              />

              {/* Custom Date Range - Only shown when custom is selected */}
              {timeFilter === 'custom' && (
                <>
                  <DateInput
                    label="From Date"
                    value={dateRange.from || ''}
                    onChange={(value) => setDateRange(prev => ({ ...prev, from: value }))}
                    max={dateRange.to}
                  />
                  <DateInput
                    label="To Date"
                    value={dateRange.to || ''}
                    onChange={(value) => setDateRange(prev => ({ ...prev, to: value }))}
                    // min={dateRange.from}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-800">
              {Math.min(pageNumber * pageSize + 1, totalCount)} - {Math.min((pageNumber + 1) * pageSize, totalCount)}
            </span> of <span className="font-semibold text-slate-800">{totalCount}</span> items
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-slate-600">Show:</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageNumber(0);
                }}
                className="text-gray-600 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>
          </div>
        </div>

        {/* History List/Grid */}
        {historyData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-sky-50 to-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">
              No Browsing History Found
            </h3>
            <p className="text-slate-600 max-w-md mx-auto mb-8">
              {filterType !== 'ALL' 
                ? `No ${getTypeName(filterType).toLowerCase()} history found with the current filters.` 
                : "Your browsing history will appear here as you explore our travel offerings."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={clearFilters}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Clear Filters
              </button>
              <button 
                onClick={() => router.push('/sri-lankan-tours')}
                className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:shadow-sky-200 hover:scale-[1.02] font-medium"
              >
                Explore Tours
              </button>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          // Professional List View
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {historyData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-6 hover:bg-gradient-to-r hover:from-sky-50/50 hover:to-teal-50/50 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-800 truncate group-hover:text-sky-600 transition-colors">
                            {getTypeName(item.type)} #{item.dataId}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getTypeColor(item.type)} whitespace-nowrap`}>
                              {getTypeName(item.type)}
                            </span>
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                              item.statusName === 'ACTIVE' 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                            } whitespace-nowrap`}>
                              {item.statusName}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm">
                          Viewed on {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-slate-500">View Details</div>
                      </div>
                      <svg className="w-5 h-5 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Professional Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {historyData.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 hover:shadow-xl hover:border-sky-300 transition-all duration-300 group cursor-pointer hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getTypeColor(item.type)}`}>
                      {getTypeName(item.type)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-sky-600 line-clamp-1">
                      {getTypeName(item.type)} #{item.dataId}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                      Viewed on {formatDate(item.createdAt)}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.statusName === 'ACTIVE' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {item.statusName}
                      </span>
                      <svg className="w-4 h-4 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalCount > pageSize && (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-600">
              Page <span className="font-semibold text-slate-800">{pageNumber + 1}</span> of{' '}
              <span className="font-semibold text-slate-800">{Math.ceil(totalCount / pageSize)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 0}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  pageNumber === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-sky-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, Math.ceil(totalCount / pageSize)) }, (_, i) => {
                  let pageIndex;
                  if (Math.ceil(totalCount / pageSize) <= 5) {
                    pageIndex = i;
                  } else if (pageNumber < 3) {
                    pageIndex = i;
                  } else if (pageNumber > Math.ceil(totalCount / pageSize) - 3) {
                    pageIndex = Math.ceil(totalCount / pageSize) - 5 + i;
                  } else {
                    pageIndex = pageNumber - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageIndex}
                      onClick={() => handlePageChange(pageIndex)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        pageNumber === pageIndex
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-sky-300'
                      }`}
                    >
                      {pageIndex + 1}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber >= Math.ceil(totalCount / pageSize) - 1}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  pageNumber >= Math.ceil(totalCount / pageSize) - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-sky-300'
                }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="text-sm text-slate-600">
              <span className="font-semibold text-slate-800">{pageSize}</span> items per page
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-slate-500 text-center">
            Your browsing history is automatically saved for 90 days
          </p>
        </div>
      </div>
    </div>
  );
}