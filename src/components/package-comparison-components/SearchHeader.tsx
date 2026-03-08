import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, ChevronUp, Calendar, MapPin, Tag } from "lucide-react";
import { Tour } from "@/types/tour-types";

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showTourDropdown: boolean;
  setShowTourDropdown: (show: boolean) => void;
  filteredTours: Tour[];
  handleTourSelect: (tour: Tour) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  showTourDropdown,
  setShowTourDropdown,
  filteredTours,
  handleTourSelect,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowTourDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowTourDropdown]);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTourDropdown(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setShowTourDropdown]);

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Compare Tour Packages
          </h1>
          <div className="text-gray-600 text-md lg:text-lg">
            Select a tour and compare available packages side by side
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowTourDropdown(true);
              }}
              onFocus={() => setShowTourDropdown(true)}
              placeholder="Search for tours by name, category, or type..."
              className="cursor-pointer text-gray-800 w-full pl-12 pr-12 py-4 border-2 border-sky-300 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none transition-all duration-200 bg-white/80"
            />
            <button
              onClick={() => setShowTourDropdown(!showTourDropdown)}
              className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-600 transition-colors duration-200"
              aria-label={showTourDropdown ? "Close dropdown" : "Open dropdown"}
            >
              {showTourDropdown ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Tour Dropdown */}
          {showTourDropdown && filteredTours.length > 0 && (
            <div 
              ref={dropdownRef}
              className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-sky-200 max-h-96 overflow-y-auto backdrop-blur-sm"
            >
              {filteredTours.map((tour) => (
                <button
                  key={tour.tourDetails.tourId}
                  onClick={() => {
                    handleTourSelect(tour);
                    setShowTourDropdown(false);
                  }}
                  className="cursor-pointer w-full text-left p-4 hover:bg-sky-50/80 border-b border-sky-100 last:border-b-0 transition-all duration-200 hover:border-l-2 hover:border-l-sky-400"
                >
                  <div className="font-medium text-sky-900">
                    {tour.tourDetails.tourName}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {tour.tourDetails.tourDescription}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center bg-sky-50 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 mr-1.5 text-sky-500" />
                      {tour.tourDetails.duration} days
                    </span>
                    <span className="flex items-center bg-teal-50 px-3 py-1 rounded-full">
                      <MapPin className="w-4 h-4 mr-1.5 text-teal-500" />
                      {tour.tourDetails.startLocation} →{" "}
                      {tour.tourDetails.endLocation}
                    </span>
                    
                    {/* Display multiple categories as badges */}
                    {tour.tourDetails.tourCategoryDto && tour.tourDetails.tourCategoryDto.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {tour.tourDetails.tourCategoryDto.map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-sky-100 to-teal-100 text-sky-800 rounded-full text-xs font-medium"
                          >
                            {category.tourCategoryName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Display multiple types as badges */}
                  {tour.tourDetails.tourTypeDtos && tour.tourDetails.tourTypeDtos.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tour.tourDetails.tourTypeDtos.map((type, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200"
                        >
                          <Tag className="w-3 h-3 inline mr-1" />
                          {type.tourTypeName}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
          
          {/* No Results Message */}
          {showTourDropdown && searchQuery && filteredTours.length === 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-sky-200 p-8 text-center">
              <p className="text-gray-500">No tours found matching your search.</p>
              <p className="text-sm text-gray-400 mt-2">Try different keywords or browse all tours</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;