"use client";
import React from 'react';
import { Search, User, Tag, Calendar, X, RotateCcw, Filter, TrendingUp } from 'lucide-react';
import { BlogFilters } from '@/types/blog-types';

interface BlogFilterProps {
  filters: BlogFilters;
  onFilterChange: (filterName: keyof BlogFilters, value: any) => void;
  onResetFilters: () => void;
  writers: string[];
  categories: string[];
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  writers,
  categories,
}) => {
  const handleDateChange = (date: string, isStart: boolean) => {
    const newRange: [string, string] = [...filters.dateRange];
    if (isStart) {
      newRange[0] = date;
    } else {
      newRange[1] = date;
    }
    onFilterChange('dateRange', newRange);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-8 mb-6 sm:mb-8 border border-purple-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Filter & Sort Blogs
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Discover amazing travel stories and insights
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search blogs by title, content, or writer..."
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base transition-all"
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
        {/* Writer Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 text-purple-600" />
            Writer
          </label>
          <select
            value={filters.writer}
            onChange={(e) => onFilterChange('writer', e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base bg-white transition-all cursor-pointer hover:border-purple-300"
          >
            <option value="">All Writers</option>
            {writers.map((writer) => (
              <option key={writer} value={writer}>
                {writer}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Tag className="w-4 h-4 text-purple-600" />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base bg-white transition-all cursor-pointer hover:border-purple-300"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base bg-white transition-all cursor-pointer hover:border-purple-300"
          >
            <option value="recent">Most Recent</option>
            <option value="likes">Most Liked</option>
            <option value="comments">Most Comments</option>
            <option value="date-asc">Oldest First</option>
            <option value="date-desc">Newest First</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={filters.dateRange[0]}
              onChange={(e) => handleDateChange(e.target.value, true)}
              max={filters.dateRange[1]}
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-xs sm:text-sm transition-all"
            />
            <input
              type="date"
              value={filters.dateRange[1]}
              onChange={(e) => handleDateChange(e.target.value, false)}
              min={filters.dateRange[0]}
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-xs sm:text-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Active Filters & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          {filters.search && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
              Search: {filters.search.substring(0, 15)}{filters.search.length > 15 ? '...' : ''}
              <button onClick={() => onFilterChange('search', '')} className="hover:text-purple-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.writer && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
              Writer: {filters.writer}
              <button onClick={() => onFilterChange('writer', '')} className="hover:text-blue-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
              {filters.category}
              <button onClick={() => onFilterChange('category', '')} className="hover:text-green-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(filters.dateRange[0] || filters.dateRange[1]) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-medium">
              Date Range
              <button onClick={() => onFilterChange('dateRange', ['', ''])} className="hover:text-amber-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        <button
          onClick={onResetFilters}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default BlogFilter;