import { Package } from "@/types/package-types";
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
import { useAuth } from "@/context/AuthContext";
import BookingModal, {
  BookingFormData,
} from "../booking-components/BookingModal";
import BookingSuccessMessage from "../booking-components/BookingSuccessMessage";
import { bookingService } from "@/services/bookingService";
import { TourDetails } from "@/types/tour-types";
import { useCurrency } from "@/context/CurrencyContext";

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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formatPrice, currentCurrency, convertPrice } = useCurrency();
  const { user } = useAuth();

  const price = selectedPackage?.pricePerPerson || 50;
  const originalPrice = selectedPackage?.totalPrice;
  const discount = selectedPackage?.discount || 0;
  const hasDiscount = discount > 0;

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleSubmitBooking = async (formData: BookingFormData) => {
    setIsSubmitting(true);

    try {
      await bookingService.insertBookingInquiry({
        tourId: formData.tourId,
        packageId: formData.packageId ?? null,
        name: formData?.name,
        email: formData?.email,
        contactNumber: formData?.contactNumber,
        country: formData?.country,
      });

      setIsBookingModalOpen(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("Failed to submit booking inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Booking Card - Sticky with responsive offset */}
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-5 lg:p-6 sticky top-[60px] sm:top-[70px] lg:top-[80px] mt-3 sm:mt-4 z-10">
        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">
          Book This Tour
        </h3>

        {/* Package Info if selected */}
        {selectedPackage && (
          <div className="mb-2 sm:mb-3 lg:mb-4 p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-lg border border-sky-100">
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-2 mb-1 justify-between">
                  <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-600 whitespace-nowrap">
                    Selected Package:
                  </span>
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-sky-700 truncate">
                    {selectedPackage.packageName}
                  </h4>
                </div>
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 line-clamp-2 sm:line-clamp-2">
                  {selectedPackage.packageDescription}
                </p>
              </div>
              {selectedPackage.color && (
                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-2 border-white shadow-sm flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: selectedPackage.color }}
                  aria-label="Package color indicator"
                />
              )}
            </div>
          </div>
        )}

        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          {/* Price Section */}
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center py-2 sm:py-2.5 lg:py-3 border-b border-gray-200 gap-1 sm:gap-2">
            <div className="text-left">
              <span className="text-gray-600 text-xs sm:text-sm lg:text-base">
                Starting from
              </span>
              {hasDiscount && (
                <div className="text-[10px] sm:text-xs text-gray-500 line-through mt-0.5">
                  {formatPrice(price)}
                </div>
              )}
            </div>
            <div className="text-left xs:text-right">
              <div className="flex items-baseline justify-start xs:justify-end gap-1 sm:gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-600">
                  {formatPrice(price - (price * discount) / 100)}
                </span>
                {hasDiscount && (
                  <div className="text-[8px] sm:text-xs text-emerald-600 font-medium bg-emerald-100 px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 rounded-full">
                    Save {discount}%
                  </div>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                per person
              </p>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className="cursor-pointer w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg transition-all duration-200 transform hover:scale-[1.02] sm:hover:scale-105 shadow-md hover:shadow-lg active:scale-95"
          >
            {selectedPackage ? "Book This Package" : "Book Now"}
          </button>

          {/* Secure Booking Text */}
          <p className="text-[10px] sm:text-xs text-gray-500 text-center">
            Secure your spot with easy booking
          </p>

          {/* Package Days Info */}
          {selectedPackage && selectedPackage.packageDayByDayDtoList && (
            <div className="text-center text-[10px] sm:text-xs lg:text-sm text-gray-600 pt-1.5 sm:pt-2 border-t border-gray-100">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="font-medium">
                  {selectedPackage.packageDayByDayDtoList.length} Night
                  {selectedPackage.packageDayByDayDtoList.length > 1 ? "s" : ""}
                </span>
                <span className="text-gray-400">•</span>
                <span className="truncate max-w-[120px] xs:max-w-none">
                  Complete itinerary
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:block mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 lg:gap-3 text-xs lg:text-sm text-gray-600">
            <div className="flex items-center gap-1.5 lg:gap-2">
              <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-sky-500 flex-shrink-0" />
              <span className="truncate">Secure payment</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2">
              <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-teal-500 flex-shrink-0" />
              <span className="truncate">24/7 support</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2">
              <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-cyan-500 flex-shrink-0" />
              <span className="truncate">Flexible dates</span>
            </div>
          </div>
        </div>

        {/* Mobile Additional Info - Simplified */}
        <div className="sm:hidden mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center justify-center gap-3 text-[10px] text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-sky-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-2.5 h-2.5 text-teal-500" />
              <span>24/7</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-cyan-500" />
              <span>Flexible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Details Card - Commented out */}
      {/* <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      </div> */}

      {/* <TourAssignedUser assignUser={assignUser} /> */}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tourName={tour.tourName}
        packageName={selectedPackage?.packageName}
        packageId={selectedPackage?.packageId}
        tourId={tour.tourId}
        user={user || null}
        onSubmit={handleSubmitBooking}
        loading={isSubmitting}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <BookingSuccessMessage onClose={() => setShowSuccessMessage(false)} />
      )}
    </>
  );
};

export default SLTourDetailsBookingSidebar;
