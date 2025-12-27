import React from "react";
import { Search, ChevronDown, ChevronUp, Calendar, MapPin } from "lucide-react";
import { Tour } from "@/types/package-comparison-types";

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
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Compare Tour Packages
          </h1>
          <p className="text-gray-600">
            Select a tour and compare available packages side by side
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowTourDropdown(true);
              }}
              onFocus={() => setShowTourDropdown(true)}
              placeholder="Search for tours by name, category, or type..."
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
            />
            <button
              onClick={() => setShowTourDropdown(!showTourDropdown)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
            <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {filteredTours.map((tour) => (
                <button
                  key={tour.tourDetails.tourId}
                  onClick={() => handleTourSelect(tour)}
                  className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                >
                  <div className="font-medium text-gray-900">
                    {tour.tourDetails.tourName}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {tour.tourDetails.tourDescription}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {tour.tourDetails.duration} days
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {tour.tourDetails.startLocation} →{" "}
                      {tour.tourDetails.endLocation}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {tour.tourDetails.tourCategory}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;