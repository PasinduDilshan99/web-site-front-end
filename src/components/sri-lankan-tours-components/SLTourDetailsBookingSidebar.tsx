import { Package, TourDetails } from "@/types/package-types";
import React, { useState } from "react";
import { SLTourDetailsDetailItem } from "./tour-day-to-day-details-components/SLTourDetailsDetailItem";
import TourAssignedUser from "./tour-day-to-day-details-components/TourAssignedUser";
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Shield,
} from "lucide-react";
import { TourAssignedEmployeeResponse } from "@/types/employee-types";

interface SLTourDetailsBookingSidebarProps {
  tour: TourDetails;
  selectedPackage?: Package | null;
  assignUser: TourAssignedEmployeeResponse | null;
  assignUserLoading?: boolean;
  assignUserError?: string | null;
}

const SLTourDetailsBookingSidebar: React.FC<
  SLTourDetailsBookingSidebarProps
> = ({
  tour,
  selectedPackage,
  assignUser,
  assignUserLoading,
  assignUserError,
}) => {
  const [expandedTourDetails, setExpandedTourDetails] = useState(false);
  const price = selectedPackage?.pricePerPerson || 50;
  const originalPrice = selectedPackage?.totalPrice;
  const discount = selectedPackage?.discount || 0;
  const hasDiscount = discount > 0;

  return (
    <>
      {/* Booking Card */}
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-5 lg:p-6 top-4 sm:top-6 mt-4">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Book This Tour
        </h3>

        {/* Package Info if selected */}
        {selectedPackage && (
          <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg border border-purple-100">
            <div className="flex items-start sm:items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  Selected Package:
                </span>
                <h4 className="text-base sm:text-lg font-bold text-purple-700 truncate">
                  {selectedPackage.packageName}
                </h4>
              </div>
              {selectedPackage.color && (
                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                  style={{ backgroundColor: selectedPackage.color }}
                />
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              {selectedPackage.packageDescription}
            </p>
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          {/* Price Section */}
          <div className="flex justify-between items-center py-2.5 sm:py-3 border-b border-gray-200">
            <div className="text-left">
              <span className="text-gray-600 text-sm sm:text-base">
                Starting from
              </span>
              {hasDiscount && (
                <div className="text-xs text-gray-500 line-through mt-0.5">
                  ${price?.toLocaleString()}
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1 sm:gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-amber-600">
                  ${(price - (price * discount) / 100).toLocaleString()}
                </span>
                {hasDiscount && (
                  <div className="text-xs text-green-600 font-medium bg-green-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                    Save {discount}%
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">per person</p>
            </div>
          </div>

          {/* Book Now Button */}
          <button className="w-full bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-[1.02] sm:hover:scale-105 shadow-md hover:shadow-lg active:scale-95">
            {selectedPackage ? "Book This Package" : "Book Now"}
          </button>

          {/* Secure Booking Text */}
          <p className="text-xs text-gray-500 text-center">
            Secure your spot with easy booking
          </p>

          {/* Package Days Info */}
          {selectedPackage && selectedPackage.packageDayByDayDtoList && (
            <div className="text-center text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="font-medium">
                  {selectedPackage.packageDayByDayDtoList.length} days
                </span>
                <span className="text-gray-400">•</span>
                <span>Complete itinerary</span>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info for larger screens */}
        <div className="hidden sm:block mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
            {/* <div className="flex items-center gap-1.5">
        <CheckCircle className="w-3 h-3 text-green-500" />
        <span>Free cancellation</span>
      </div> */}
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-blue-500" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-purple-500" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-amber-500" />
              <span>Flexible dates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Details Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Tour Details</h3>
          <button
            onClick={() => setExpandedTourDetails(!expandedTourDetails)}
            className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
          >
            {expandedTourDetails ? (
              <>
                Show Less
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show More
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

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

          {/* Additional details shown when expanded */}
          {expandedTourDetails && (
            <>
              <SLTourDetailsDetailItem
                label="Duration"
                value={`${tour.duration} days`}
                description="Complete tour duration"
              />
              {selectedPackage && (
                <div className="pt-3 border-t border-gray-100">
                  <SLTourDetailsDetailItem
                    label="Package Details"
                    value={selectedPackage.packageName}
                    description={`Includes accommodation, transport, and meals for ${selectedPackage.packageDayByDayDtoList.length} days`}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <TourAssignedUser assignUser={assignUser} />
    </>
  );
};

export default SLTourDetailsBookingSidebar;
