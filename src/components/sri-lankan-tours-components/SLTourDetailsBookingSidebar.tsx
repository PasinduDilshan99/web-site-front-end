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
import { useAuth } from "@/context/AuthContext";
import BookingModal, { BookingFormData } from "../booking-components/BookingModal";
import BookingSuccessMessage from "../booking-components/BookingSuccessMessage";

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
      const response = await fetch("/api/booking-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: formData.userId,
          tourId: formData.tourId,
          tourName: formData.tourName,
          packageId: formData.packageId,
          packageName: formData.packageName,
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
          country: formData.country,
          status: "pending",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking request");
      }

      setIsBookingModalOpen(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("Failed to submit booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Booking Card */}
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-5 lg:p-6 top-4 sm:top-6 mt-4">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Book This Tour
        </h3>

        {/* Package Info if selected */}
        {selectedPackage && (
          <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-gradient-to-r from-sky-50 to-teal-50 rounded-lg border border-sky-100">
            <div className="flex items-start sm:items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  Selected Package:
                </span>
                <h4 className="text-base sm:text-lg font-bold text-sky-700 truncate">
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
                <span className="text-2xl sm:text-3xl font-bold text-sky-600">
                  ${(price - (price * discount) / 100).toLocaleString()}
                </span>
                {hasDiscount && (
                  <div className="text-xs text-emerald-600 font-medium bg-emerald-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                    Save {discount}%
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">per person</p>
            </div>
          </div>

          {/* Book Now Button */}
          <button 
            onClick={handleBookNow}
            className="w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-[1.02] sm:hover:scale-105 shadow-md hover:shadow-lg active:scale-95"
          >
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
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-sky-500" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-teal-500" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-cyan-500" />
              <span>Flexible dates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Details Card */}
      {/* <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      </div> */}

      <TourAssignedUser assignUser={assignUser} />

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