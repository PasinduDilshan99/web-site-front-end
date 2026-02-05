import { ActivePackagesType } from "@/types/package-types";
import React, { useState } from "react";

interface BookingSectionProps {
  packageData: ActivePackagesType;
}

const BookingSection: React.FC<BookingSectionProps> = ({ packageData }) => {
  const [participants, setParticipants] = useState(packageData.minPersonCount);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscountedPrice = (): number => {
    return packageData.totalPrice * (1 - packageData.discountPercentage / 100);
  };

  const calculateTotalPrice = (): number => {
    const basePrice = calculateDiscountedPrice();
    return basePrice;
  };

  const handleBookNow = () => {
    alert("Booking functionality to be implemented!");
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
          per package
        </div>
      </div>

      {/* Validity Period */}
      {/* <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm text-sky-700 mb-2">
          <span>Valid From:</span>
          <span className="font-medium">{formatDate(packageData.startDate)}</span>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm text-sky-700">
          <span>Valid To:</span>
          <span className="font-medium">{formatDate(packageData.endDate)}</span>
        </div>
      </div> */}

      {/* Participants */}
      {/* <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-semibold text-sky-800 mb-1.5 sm:mb-2">
          Number of Participants
        </label>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() =>
              setParticipants(
                Math.max(packageData.minPersonCount, participants - 1)
              )
            }
            disabled={participants <= packageData.minPersonCount}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-200 hover:bg-sky-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base text-sky-800 transition-colors"
          >
            -
          </button>
          <span className="font-semibold text-sky-900 text-base sm:text-lg">{participants}</span>
          <button
            onClick={() =>
              setParticipants(
                Math.min(packageData.maxPersonCount, participants + 1)
              )
            }
            disabled={participants >= packageData.maxPersonCount}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-200 hover:bg-sky-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base text-sky-800 transition-colors"
          >
            +
          </button>
          <span className="text-xs sm:text-sm text-sky-700 ml-1 sm:ml-2">
            ({packageData.minPersonCount}-{packageData.maxPersonCount})
          </span>
        </div>
      </div> */}

      {/* Package Features Summary */}
      {packageData.packageFeatures && packageData.packageFeatures.length > 0 && (
        <div className="border-t border-sky-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
          <h4 className="font-semibold text-sky-800 text-sm sm:text-base mb-2 sm:mb-3">Package Includes</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-sky-700">
            {packageData.packageFeatures.slice(0, 3).map((feature) => (
              <li key={feature.featureId} className="flex items-center gap-1.5 sm:gap-2">
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
                <span>{feature.featureName}: {feature.featureValue}</span>
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

      {/* Total Price */}
      {/* <div className="border-t border-sky-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <span className="font-semibold text-sky-800 text-sm sm:text-base">Total Price:</span>
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600">
            {formatPrice(calculateTotalPrice())}
          </span>
        </div>
        <div className="text-xs sm:text-sm text-sky-700 text-center">
          For {participants} participant{participants > 1 ? "s" : ""}
        </div>
      </div> */}

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        className="w-full py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-sky-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
      >
        Book Now
      </button>

      {/* Quick Actions */}
      <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
        <button className="flex-1 py-1.5 sm:py-2 border border-sky-300 text-sky-700 rounded-lg hover:border-sky-400 hover:bg-sky-50 transition-colors text-xs sm:text-sm">
          Save for Later
        </button>
        <button className="flex-1 py-1.5 sm:py-2 border border-sky-300 text-sky-700 rounded-lg hover:border-sky-400 hover:bg-sky-50 transition-colors text-xs sm:text-sm">
          Share
        </button>
      </div>
    </div>
  );
};

export default BookingSection;