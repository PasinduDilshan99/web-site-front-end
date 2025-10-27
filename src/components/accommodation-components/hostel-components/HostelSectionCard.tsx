// components/hostels-components/HostelSectionCard.tsx
import React from "react";
import { HostelSectionHostel } from "@/types/accommodations-types/hostel-types";
import Image from "next/image";

interface HostelSectionCardProps {
  hostel: HostelSectionHostel;
}

const HostelSectionCard: React.FC<HostelSectionCardProps> = ({ hostel }) => {
  const displayImages = hostel.hostelImages?.slice(0, 2) || [];
  const displayRooms = hostel.rooms?.slice(0, 3) || [];
  const displayMeals = hostel.meals?.slice(0, 2) || [];

  // Calculate price range
  const priceRange =
    displayRooms.length > 0
      ? {
          min: Math.min(...displayRooms.map((room) => room.localPricePerNight)),
          max: Math.max(...displayRooms.map((room) => room.localPricePerNight)),
        }
      : null;

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-300 transform hover:-translate-y-1">
      {/* Hostel Images */}
      <div className="relative h-40 sm:h-44 md:h-40 lg:h-44 xl:h-48 overflow-hidden">
        {displayImages.length > 0 ? (
          <div className="flex h-full">
            {displayImages.map((image, index) => (
              <div key={index} className="flex-1 relative overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.caption}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🏕️</div>
              <span className="text-orange-600 text-sm font-medium">
                Adventure Hostel
              </span>
            </div>
          </div>
        )}

        {/* Budget Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            BUDGET
          </span>
        </div>

        {/* Star Rating */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
          <div className="flex items-center space-x-1">
            <span className="text-orange-500 text-sm">⭐</span>
            <span className="text-gray-800 font-bold text-sm">
              {hostel.starRating}
            </span>
          </div>
        </div>

        {/* Hostel Type */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 text-blue-700 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
            {hostel.hostelType}
          </span>
        </div>
      </div>

      {/* Hostel Details */}
      <div className="p-4">
        {/* Hostel Name and Description */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg lg:text-xl mb-1 line-clamp-1">
            {hostel.hostelName}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-2">
            {hostel.hostelDescription}
          </p>

          {/* Location */}
          <div className="flex items-center text-blue-600 text-xs font-medium">
            <span className="mr-1">📍</span>
            <span className="line-clamp-1">{hostel.address.split(",")[0]}</span>
          </div>
        </div>

        {/* Price Range & Capacity */}
        <div className="flex items-center justify-between mb-3 p-2 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border border-orange-100">
          {priceRange && (
            <div className="text-center flex-1">
              <div className="text-orange-600 font-bold text-sm">
                ${priceRange.min} - ${priceRange.max}
              </div>
              <div className="text-gray-600 text-xs">per night</div>
            </div>
          )}
          <div className="h-6 w-px bg-orange-200 mx-2"></div>
          <div className="text-center flex-1">
            <div className="text-blue-600 font-bold text-sm">
              {hostel.totalRooms}
            </div>
            <div className="text-gray-600 text-xs">Rooms</div>
          </div>
        </div>

        {/* Room Types */}
        {displayRooms.length > 0 && (
          <div className="mb-3">
            <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Room Options
            </h4>
            <div className="space-y-1">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-1 hover:bg-orange-50 rounded transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">
                      {room.roomType}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">👥 {room.capacity}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{room.bedType}</span>
                  </div>
                  <span className="text-green-600 font-bold text-xs">
                    ${room.localPricePerNight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meals */}
        {displayMeals.length > 0 && (
          <div className="mb-3">
            <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Food Options
            </h4>
            <div className="space-y-1">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-1 hover:bg-blue-50 rounded transition-colors"
                >
                  <span className="text-gray-700">{meal.mealType}</span>
                  <span className="text-orange-600 font-semibold">
                    ${meal.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {hostel.reviews && hostel.reviews.totalReviews > 0 && (
          <div className="mb-3 p-2 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm border">
                  <span className="text-blue-600 font-bold text-xs mr-1">
                    {hostel.reviews.averageRating}
                  </span>
                  <span className="text-orange-400 text-xs">⭐</span>
                </div>
                <span className="text-gray-700 text-xs font-medium">
                  {hostel.reviews.totalReviews} reviews
                </span>
              </div>
            </div>
            {hostel.reviews.recentReviews &&
              hostel.reviews.recentReviews.length > 0 && (
                <p className="text-gray-600 text-xs mt-1 line-clamp-2 italic">
                  {hostel.reviews.recentReviews[0].comment}
                </p>
              )}
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {hostel.wifiAvailable && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              WiFi
            </span>
          )}
          {hostel.parkingFacility && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              Parking
            </span>
          )}
          {hostel.petFriendly && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              Pets
            </span>
          )}
          {hostel.rooms?.some((room) => room.hasAirConditioning) && (
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
              A/C
            </span>
          )}
        </div>

        {/* Check-in/out */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>🕒 Check-in: {hostel.checkInTime}</span>
          <span>🕛 Check-out: {hostel.checkOutTime}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2 border-t border-gray-100">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white py-2 rounded-lg font-bold text-xs transition-all duration-300 transform hover:scale-105">
            Book Now
          </button>
          <button className="px-3 py-2 border border-orange-300 text-orange-600 hover:bg-orange-50 rounded-lg font-medium text-xs transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelSectionCard;
