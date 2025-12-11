// components/blog-components/BlogFilter.tsx
"use client";
import React from 'react';
import { Search, User, Tag, Calendar, X, RotateCcw, Filter, TrendingUp, Hash, MessageSquare, Heart } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-purple-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-amber-500 rounded-xl">
            <Filter className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-900">
              Filter & Sort
            </h2>
            <p className="text-sm text-gray-600">
              Narrow down your search for the perfect read
            </p>
          </div>
        </div>
        
        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-50 to-amber-50 text-purple-700 font-medium rounded-lg hover:from-purple-100 hover:to-amber-100 transition-colors border border-purple-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search blogs, titles, or authors..."
            className="text-black w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base transition-all bg-purple-50/50"
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Writer Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-purple-800 mb-2">
            <User className="w-4 h-4 text-purple-600" />
            Author
          </label>
          <select
            value={filters.writer}
            onChange={(e) => onFilterChange('writer', e.target.value)}
            className="text-gray-500 w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base bg-white transition-all cursor-pointer hover:border-purple-300"
          >
            <option value="">All Authors</option>
            {writers.map((writer) => (
              <option key={writer} value={writer}>
                {writer}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-purple-800 mb-2">
            <Tag className="w-4 h-4 text-purple-600" />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="text-gray-500 w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base bg-white transition-all cursor-pointer hover:border-purple-300"
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
          <label className="flex items-center gap-2 text-sm font-semibold text-purple-800 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="text-gray-500 w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base bg-white transition-all cursor-pointer hover:border-purple-300"
          >
            <option value="recent">🕐 Most Recent</option>
            <option value="likes">❤️ Most Liked</option>
            <option value="comments">💬 Most Comments</option>
            <option value="date-asc">📅 Oldest First</option>
            <option value="date-desc">📅 Newest First</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-purple-800 mb-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="date"
                value={filters.dateRange[0]}
                onChange={(e) => handleDateChange(e.target.value, true)}
                max={filters.dateRange[1]}
                className="text-gray-500 w-full px-3 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all"
              />
              <div className="text-xs text-purple-600 mt-1 text-center">From</div>
            </div>
            <div>
              <input
                type="date"
                value={filters.dateRange[1]}
                onChange={(e) => handleDateChange(e.target.value, false)}
                min={filters.dateRange[0]}
                className="text-gray-500 w-full px-3 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all"
              />
              <div className="text-xs text-purple-600 mt-1 text-center">To</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-medium text-purple-700">Active filters:</span>
        {filters.search && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-amber-100 text-purple-700 rounded-full text-sm font-medium">
            🔍 {filters.search.substring(0, 15)}{filters.search.length > 15 ? '...' : ''}
            <button onClick={() => onFilterChange('search', '')} className="hover:text-purple-900 ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.writer && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            👤 {filters.writer}
            <button onClick={() => onFilterChange('writer', '')} className="hover:text-purple-900 ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.category && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            🏷️ {filters.category}
            <button onClick={() => onFilterChange('category', '')} className="hover:text-amber-900 ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {(filters.dateRange[0] || filters.dateRange[1]) && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-amber-50 text-purple-700 rounded-full text-sm font-medium">
            📅 Date Range
            <button onClick={() => onFilterChange('dateRange', ['', ''])} className="hover:text-purple-900 ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>

      {/* Quick Sort Buttons */}
      <div className="pt-4 border-t border-purple-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-purple-700">Quick sort:</span>
          <button
            onClick={() => onFilterChange('sortBy', 'recent')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.sortBy === 'recent' ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
          >
            🕐 Recent
          </button>
          <button
            onClick={() => onFilterChange('sortBy', 'likes')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.sortBy === 'likes' ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
          >
            ❤️ Most Liked
          </button>
          <button
            onClick={() => onFilterChange('sortBy', 'comments')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.sortBy === 'comments' ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
          >
            💬 Most Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilter;