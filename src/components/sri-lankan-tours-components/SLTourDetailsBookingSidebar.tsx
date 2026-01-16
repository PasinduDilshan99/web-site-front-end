import {
  Package,
  TourAssignedEmployeeResponse,
} from "@/app/sri-lankan-tours/[sriLankanTourId]/page";
import { TourDetails } from "@/types/packages-types";
import React, { useState } from "react";
import { SLTourDetailsDetailItem } from "./tour-day-to-day-details-components/SLTourDetailsDetailItem";
import TourAssignedUser from "./tour-day-to-day-details-components/TourAssignedUser";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      <div className="bg-white rounded-2xl shadow-lg p-6 top-6 mt-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Book This Tour</h3>

        {/* Package Info if selected */}
        {selectedPackage && (
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Selected Package:
                </span>
                <h4 className="text-lg font-bold text-purple-700">
                  {selectedPackage.packageName}
                </h4>
              </div>
              {selectedPackage.color && (
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: selectedPackage.color }}
                />
              )}
            </div>
            <p className="text-sm text-gray-600">
              {selectedPackage.packageDescription}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <div className="text-left">
              <span className="text-gray-600 block">Starting from</span>
              {hasDiscount && (
                <span className="text-xs text-gray-500 line-through">
                  ${price?.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-amber-600">
                ${(price-price*discount/100).toLocaleString()}
              </span>
              {hasDiscount && (
                <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full inline-block mt-1">
                  Save {discount}%
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">per person</p>
            </div>
          </div>
          {/* <button className="w-full bg-gradient-to-r from-amber-600 to-purple-600 hover:from-purple-700 hover:to-amber-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            {selectedPackage ? "Book This Package" : "Book Now"}
          </button> */}

          <p className="text-xs text-gray-500 text-center">
            Secure your spot with easy booking
          </p>

          {/* Package Days Info */}
          {selectedPackage && (
            <div className="text-center text-sm text-gray-600 pt-2 border-t border-gray-100">
              <span className="font-medium">
                {selectedPackage.packageDayByDayDtoList.length} days
              </span>
              <span className="mx-2">•</span>
              <span>Complete itinerary</span>
            </div>
          )}
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
