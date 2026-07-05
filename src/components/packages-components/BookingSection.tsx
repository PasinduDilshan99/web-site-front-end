import { ActivePackagesType } from "@/types/package-types";
import React, { useState } from "react";
import BookingModal, {
  BookingFormData,
} from "../booking-components/BookingModal";
import BookingSuccessMessage from "../booking-components/BookingSuccessMessage";
import { bookingService } from "@/services/bookingService";
import { useAuth } from "@/context/AuthContext";
import { WishListService } from "@/services/wishListService";
import { useCurrency } from "@/context/CurrencyContext";

interface BookingSectionProps {
  packageData: ActivePackagesType;
}

const BookingSection: React.FC<BookingSectionProps> = ({ packageData }) => {
  const [participants, setParticipants] = useState(packageData.minPersonCount);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(packageData.isWished);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const { formatPrice, currentCurrency, convertPrice } = useCurrency();
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

  const handleWishlistToggle = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (loadingWishlist || !user) return;

    setLoadingWishlist(true);
    const previousState = isWishlisted;

    // Optimistically update UI
    setIsWishlisted(!previousState);

    try {
      await WishListService.addPackageWishList({
        packageId: packageData.packageId,
      });
    } catch (err) {
      console.error("Failed to update wishlist", err);
      // Revert on error
      setIsWishlisted(previousState);
      alert("Failed to update wishlist. Try again.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  const calculateDiscountedPrice = (): number => {
    return packageData.totalPrice * (1 - packageData.discountPercentage / 100);
  };

  const calculateTotalPrice = (): number => {
    const basePrice = calculateDiscountedPrice();
    return basePrice;
  };

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check out this amazing package!",
      text: "I found this great travel package you might like",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch(() => {
        alert("URL: " + window.location.href);
      });
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 sticky top-4 sm:top-16 border border-sky-100">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-4 sm:mb-6">
        Book This Package
      </h3>

      {/* Price Display */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-lg sm:rounded-xl border border-sky-200">
        {packageData.discountPercentage > 0 ? (
          <>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-900 text-center mb-1 sm:mb-2">
              {formatPrice(calculateDiscountedPrice())}
            </div>
            <div className="text-base sm:text-lg line-through text-sky-600 text-center mb-1 sm:mb-2">
              {formatPrice(packageData.totalPrice)}
            </div>
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-center shadow-sm">
              Save {packageData.discountPercentage}%
            </div>
          </>
        ) : (
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-900 text-center">
            {formatPrice(packageData.totalPrice)}
          </div>
        )}
        <div className="text-xs sm:text-sm text-sky-700 text-center mt-1 sm:mt-2">
          per person
        </div>
      </div>

      {/* Package Features Summary */}
      {packageData.packageFeatures &&
        packageData.packageFeatures.length > 0 && (
          <div className="border-t border-sky-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
            <h4 className="font-semibold text-sky-800 text-sm sm:text-base mb-2 sm:mb-3">
              Package Includes
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-sky-700">
              {packageData.packageFeatures.slice(0, 3).map((feature) => (
                <li
                  key={feature.featureId}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {feature.featureName}: {feature.featureValue}
                  </span>
                </li>
              ))}
              {packageData.packageFeatures.length > 3 && (
                <li className="text-sky-600 hover:text-sky-700 text-xs sm:text-sm font-medium cursor-pointer">
                  + {packageData.packageFeatures.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        )}

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        className="cursor-pointer w-full py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
      >
        Book Now
      </button>

      {/* Quick Actions */}
      <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
        {/* ── Wishlist button ── */}
        <button
          onClick={handleWishlistToggle}
          disabled={!user || loadingWishlist}
          className={`cursor-pointer flex-1 py-1.5 sm:py-2 border rounded-lg transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-1.5 font-medium ${
            !user
              ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
              : isWishlisted
                ? "border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100 hover:border-rose-400"
                : "border-sky-300 text-sky-700 hover:border-sky-400 hover:bg-sky-50"
          }`}
        >
          {loadingWishlist ? (
            /* Spinner while toggling */
            <svg
              className="w-3.5 h-3.5 animate-spin flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          ) : (
            /* Heart icon — filled when wishlisted */
            <svg
              className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-200"
              fill={user && isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
          {!user
            ? "Login to Save"
            : isWishlisted
              ? "Wishlisted"
              : "Save for Later"}
        </button>

        {/* ── Share button ── */}
        <button
          onClick={handleShare}
          className="cursor-pointer flex-1 py-1.5 sm:py-2 border border-sky-300 text-sky-700 rounded-lg hover:border-sky-400 hover:bg-sky-50 transition-colors text-xs sm:text-sm flex items-center justify-center gap-1.5 font-medium"
        >
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </button>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tourName={packageData?.tourName}
        packageName={packageData?.packageName}
        packageId={packageData?.packageId}
        tourId={packageData?.tourId}
        user={user || null}
        onSubmit={handleSubmitBooking}
        loading={isSubmitting}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <BookingSuccessMessage onClose={() => setShowSuccessMessage(false)} />
      )}
    </div>
  );
};

export default BookingSection;
