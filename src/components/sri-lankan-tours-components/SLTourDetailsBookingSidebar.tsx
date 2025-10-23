import { TourDetails } from "@/types/packages-types";
import React from "react";

interface SLTourDetailsBookingSidebarProps {
  tour: TourDetails;
}

const SLTourDetailsBookingSidebar: React.FC<
  SLTourDetailsBookingSidebarProps
> = ({ tour }) => {
  return (
    <>
      {/* Booking Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Book This Tour</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">Starting from</span>
            <span className="text-3xl font-bold text-amber-600">$50</span>
          </div>

          <div className="space-y-3">
            <SLTourDetailsFeatureItem text="Best price guarantee" />
            <SLTourDetailsFeatureItem text="Free cancellation" />
          </div>

          <button className="w-full bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Book Now
          </button>

          <p className="text-xs text-gray-500 text-center">
            Secure your spot with easy booking
          </p>
        </div>
      </div>

      {/* Tour Details Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Tour Details</h3>
        <div className="space-y-3">
          <SLTourDetailsDetailItem
            label="Tour Type"
            value={tour.tourTypeName}
            description={tour.tourTypeDescription}
          />
          <SLTourDetailsDetailItem
            label="Category"
            value={tour.tourCategoryName}
            description={tour.tourCategoryDescription}
          />
          <SLTourDetailsDetailItem
            label="Best Season"
            value={tour.seasonName}
            description={tour.seasonDescription}
          />
        </div>
      </div>
    </>
  );
};

const SLTourDetailsFeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <svg
      className="w-4 h-4 text-green-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
    <span>{text}</span>
  </div>
);

const SLTourDetailsDetailItem: React.FC<{
  label: string;
  value: string;
  description: string;
}> = ({ label, value, description }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

export default SLTourDetailsBookingSidebar;
