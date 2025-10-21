import { ActivePackagesType } from "@/types/packages-types";
import React, { useState } from "react";

interface BookingSectionProps {
  packageData: ActivePackagesType;
}

const BookingSection: React.FC<BookingSectionProps> = ({ packageData }) => {
  const [selectedSchedule, setSelectedSchedule] = useState<string>("");
  const [participants, setParticipants] = useState(packageData.minPersonCount);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const calculateDiscountedPrice = (): number => {
    return packageData.totalPrice * (1 - packageData.discountPercentage / 100);
  };

  const calculateTotalPrice = (): number => {
    return calculateDiscountedPrice();
  };

  const handleBookNow = () => {
    // TODO: Implement booking logic
    alert("Booking functionality to be implemented!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Book This Package
      </h3>

      {/* Price Display */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl border border-purple-200">
        {packageData.discountPercentage > 0 ? (
          <>
            <div className="text-3xl font-bold text-gray-900 text-center mb-2">
              {formatPrice(calculateDiscountedPrice())}
            </div>
            <div className="text-lg line-through text-gray-500 text-center mb-2">
              {formatPrice(packageData.totalPrice)}
            </div>
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold text-center">
              Save {packageData.discountPercentage}%
            </div>
          </>
        ) : (
          <div className="text-3xl font-bold text-gray-900 text-center">
            {formatPrice(packageData.totalPrice)}
          </div>
        )}
        <div className="text-sm text-gray-600 text-center mt-2">
          per package
        </div>
      </div>

      {/* Booking Form */}
      <div className="space-y-4">
        {/* Schedule Selection */}
        {packageData.schedules.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Select Schedule
            </label>
            <select
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Choose a schedule</option>
              {packageData.schedules.map((schedule) => (
                <option key={schedule.scheduleId} value={schedule.scheduleId}>
                  {schedule.scheduleName} -{" "}
                  {new Date(schedule.assumeStartDate).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Participants */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Number of Participants
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setParticipants(
                  Math.max(packageData.minPersonCount, participants - 1)
                )
              }
              disabled={participants <= packageData.minPersonCount}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="font-semibold text-gray-900">{participants}</span>
            <button
              onClick={() =>
                setParticipants(
                  Math.min(packageData.maxPersonCount, participants + 1)
                )
              }
              disabled={participants >= packageData.maxPersonCount}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
            <span className="text-sm text-gray-600 ml-2">
              ({packageData.minPersonCount}-{packageData.maxPersonCount})
            </span>
          </div>
        </div>

        {/* Package Details Summary */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-gray-800 mb-3">Package Includes</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
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
              {packageData.duration} Day Tour
            </li>
            <li className="flex items-center gap-2">
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
              Professional Guide
            </li>
            {packageData.features.map((feature) => (
              <li key={feature.featureId} className="flex items-center gap-2">
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
                {feature.featureName}: {feature.featureValue}
              </li>
            ))}
          </ul>
        </div>

        {/* Total Price */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-800">Total Price:</span>
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(calculateTotalPrice())}
            </span>
          </div>
          <div className="text-sm text-gray-600 text-center">
            For {participants} participant{participants > 1 ? "s" : ""}
          </div>
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-amber-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Book Now
        </button>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
            Save for Later
          </button>
          <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
