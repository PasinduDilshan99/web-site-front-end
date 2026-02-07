import { TourDetails } from "@/types/package-types";
import React from "react";

interface SLTourDetailsOverviewProps {
  tour: TourDetails;
}

const SLTourDetailsOverview: React.FC<SLTourDetailsOverviewProps> = ({
  tour,
}) => {
  const formatDuration = (days: number) => {
    const nights = days - 1;

    return `${days.toString().padStart(2, "0")} Days ${nights
      .toString()
      .padStart(2, "0")} Nights`;
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Tour Overview
      </h2>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <SLTourDetailsInfoItem
          icon={
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          }
          label="Duration"
          value={formatDuration(tour.duration)}
          bgColor="bg-sky-100"
        />

        <SLTourDetailsInfoItem
          icon={
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          }
          label="Route"
          value={`${tour.startLocation} → ${tour.endLocation}`}
          bgColor="bg-teal-100"
        />

        <SLTourDetailsInfoItem
          icon={
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          }
          label="Season"
          value={tour.seasonName}
          bgColor="bg-cyan-100"
        />
      </div>

      {/* Responsive badge container */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-sky-100 text-sky-800 border border-sky-200">
          {tour.tourTypeName}
        </span>
        <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-teal-100 text-teal-800 border border-teal-200">
          {tour.tourCategoryName}
        </span>
        <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          {tour.statusName}
        </span>
      </div>

      {/* Responsive text */}
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          {tour.tourDescription}
        </p>
      </div>
    </div>
  );
};

const SLTourDetailsInfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}> = ({ icon, label, value, bgColor }) => (
  <div className="flex items-center gap-2 sm:gap-3">
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
    >
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs sm:text-sm text-gray-600 truncate">{label}</p>
      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
        {value}
      </p>
    </div>
  </div>
);

export default SLTourDetailsOverview;