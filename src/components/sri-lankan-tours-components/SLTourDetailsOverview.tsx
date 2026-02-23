import { TourDetails } from "@/types/tour-types";
import React from "react";
import ReactMarkdown from "react-markdown";

interface SLTourDetailsOverviewProps {
  tour: TourDetails;
  distinctDestinations: string[];
}

const SLTourDetailsOverview: React.FC<SLTourDetailsOverviewProps> = ({
  tour,
  distinctDestinations,
}) => {
  const formatDuration = (days: number) => {
    const nights = days - 1;
    return `${days} Days ${nights} Nights`;
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Tour Overview
      </h2>

      {/* Professional Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
        {/* Duration Card */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-5 border border-sky-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-sky-600 uppercase tracking-wider mb-1">
                Duration
              </p>
              <p className="text-xl font-bold text-gray-900">
                {formatDuration(tour.duration)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {tour.duration} days of exploration
              </p>
            </div>
          </div>
        </div>

        {/* Route Card - Enhanced with start/end locations */}
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-5 border border-teal-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-teal-600 uppercase tracking-wider mb-1">
                Route
              </p>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-gray-900 bg-white px-3 py-1 rounded-full border border-teal-200">
                  {tour.startLocation}
                </span>
                <svg
                  className="w-5 h-5 text-teal-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <span className="text-base font-semibold text-gray-900 bg-white px-3 py-1 rounded-full border border-teal-200">
                  {tour.endLocation}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Journey from {tour.startLocation} to {tour.endLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Season Card */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-cyan-600 uppercase tracking-wider mb-1">
                Best Season
              </p>
              <p className="text-xl font-bold text-gray-900">
                {tour.seasonName}
              </p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {tour.seasonDescription || "Ideal time to visit"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Categories and Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Categories Section */}
        {tour.tourCategoryDto && tour.tourCategoryDto.length > 0 && (
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 sm:p-5 border border-teal-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-teal-800">
                Categories ({tour.tourCategoryDto.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tour.tourCategoryDto.map((category, index) => (
                <span
                  key={category.tourCategoryId || index}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-teal-700 border border-teal-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {category.tourCategoryName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Types Section */}
        {tour.tourTypeDtos && tour.tourTypeDtos.length > 0 && (
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4 sm:p-5 border border-sky-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-sky-800">
                Types ({tour.tourTypeDtos.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tour.tourTypeDtos.map((type, index) => (
                <span
                  key={type.tourTypeId || index}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-sky-700 border border-sky-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {type.tourTypeName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Destinations Section */}
      {distinctDestinations && distinctDestinations.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Destinations ({distinctDestinations.length})
            </h3>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 sm:p-6 border border-amber-200">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {distinctDestinations.map((destination, index) => (
                <React.Fragment key={index}>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-amber-700 border border-amber-300 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                    <svg
                      className="w-3.5 h-3.5 mr-1.5 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {destination}
                  </span>
                  
                  {index < distinctDestinations.length - 1 && (
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {distinctDestinations.length > 5 && (
              <div className="mt-3 text-xs text-amber-600 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span>Scroll horizontally to see all destinations</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="mb-6 sm:mb-8">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
          Status: {tour.statusName}
        </span>
      </div>

      {/* Description */}
      <div className="prose max-w-none">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          Description
        </h3>
        <ReactMarkdown
          components={{
            strong: ({ node, ...props }) => (
              <span className="font-bold text-teal-700 block mt-4 mb-2 text-base sm:text-lg">
                {props.children}
              </span>
            ),
            p: ({ node, ...props }) => (
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                {props.children}
              </p>
            ),
            li: ({ node, ...props }) => (
              <li className="text-gray-700 leading-relaxed text-sm sm:text-base ml-4 list-disc">
                {props.children}
              </li>
            ),
          }}
        >
          {tour.tourDescription}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SLTourDetailsOverview;