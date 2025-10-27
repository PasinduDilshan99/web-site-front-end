// components/HotelCard.tsx
import React from "react";
import { HotelSectionHotel } from "@/types/accommodations-types/hotel-types";
import Image from "next/image";

interface HotelCardProps {
  hotel: HotelSectionHotel;
}

const HotelSectionCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const displayImages = hotel.hotelImages?.slice(0, 2) || [];
  const displayRooms = hotel.rooms?.slice(0, 2) || [];
  const displayMeals = hotel.meals?.slice(0, 2) || [];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Hotel Images */}
      <div className="relative">
        {displayImages.length > 0 ? (
          <div className="flex h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60">
            {displayImages.map((image, index) => (
              <div key={index} className="flex-1">
                <Image
                  src={image.imageUrl}
                  alt={image.caption}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm sm:text-base">
              No Images
            </span>
          </div>
        )}

        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
          <div className="flex items-center">
            <span className="text-yellow-500 text-sm sm:text-base">★</span>
            <span className="ml-1 text-gray-800 font-semibold text-sm sm:text-base">
              {hotel.starRating}
            </span>
          </div>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="p-4 sm:p-5">
        {/* Hotel Name and Location */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl lg:text-xl xl:text-2xl line-clamp-1">
            {hotel.hotelName}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-2">
            {hotel.hotelDescription}
          </p>
          <div className="flex items-center mt-2 text-gray-500 text-xs sm:text-sm">
            <span>📍 {hotel.address.split(",")[0]}</span>
          </div>
        </div>

        {/* Reviews */}
        {hotel.reviews && hotel.reviews.totalReviews > 0 && (
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                <span className="text-green-700 font-bold text-sm sm:text-base">
                  {hotel.reviews.averageRating}
                </span>
                <span className="text-yellow-500 ml-1 text-sm">★</span>
              </div>
              <span className="ml-2 text-gray-600 text-sm sm:text-base">
                ({hotel.reviews.totalReviews} reviews)
              </span>
            </div>
            {hotel.reviews.recentReviews &&
              hotel.reviews.recentReviews.length > 0 && (
                <div className="text-right">
                  <p className="text-gray-500 text-xs line-clamp-1">
                    {hotel.reviews.recentReviews[0].comment}
                  </p>
                </div>
              )}
          </div>
        )}

        {/* Rooms Section */}
        {displayRooms.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
              Rooms
            </h4>
            <div className="space-y-2">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs sm:text-sm"
                >
                  <span className="text-gray-700 font-medium">
                    {room.roomType}
                  </span>
                  <span className="text-green-600 font-bold">
                    ${room.localPricePerNight}
                    <span className="text-gray-500 text-xs ml-1">/night</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Food Section */}
        {displayMeals.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
              Dining
            </h4>
            <div className="space-y-2">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs sm:text-sm"
                >
                  <span className="text-gray-700">{meal.mealType}</span>
                  <span className="text-blue-600 font-semibold">
                    ${meal.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-4">
          {hotel.wifiAvailable && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
              WiFi
            </span>
          )}
          {hotel.parkingFacility && (
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
              Parking
            </span>
          )}
          {hotel.petFriendly && (
            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">
              Pets
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-gray-600">{hotel.contactNumber}</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSectionCard;
