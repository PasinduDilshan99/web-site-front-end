// components/hotels-components/HotelSectionCard.tsx
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-[#2A6F97]/10 hover:border-[#2A6F97]/30 group">
      {/* Hotel Images */}
      <div className="relative overflow-hidden">
        {displayImages.length > 0 ? (
          <div className="flex h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60">
            {displayImages.map((image, index) => (
              <div key={index} className="flex-1 overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.caption}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60 bg-gradient-to-br from-[#E6F0FA] to-[#D9E9F5] flex items-center justify-center">
            <span className="text-[#2A6F97] text-sm sm:text-base font-medium">
              No Images Available
            </span>
          </div>
        )}

        {/* Star Rating Badge - Luxury Style */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-[#2A6F97]/20">
          <div className="flex items-center gap-1">
            <span className="text-[#2A6F97] text-sm sm:text-base">★</span>
            <span className="text-gray-900 font-semibold text-sm sm:text-base">
              {hotel.starRating}
            </span>
            <span className="text-gray-500 text-xs">Stars</span>
          </div>
        </div>

        {/* Luxury Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          Premium Selection
        </div>
      </div>

      {/* Hotel Details */}
      <div className="p-5 sm:p-6">
        {/* Hotel Name and Location */}
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl lg:text-xl xl:text-2xl line-clamp-1 group-hover:text-[#2A6F97] transition-colors">
            {hotel.hotelName}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mt-2 line-clamp-2 leading-relaxed">
            {hotel.hotelDescription}
          </p>
          <div className="flex items-center mt-3 text-gray-500 text-xs sm:text-sm">
            <span className="text-[#2A6F97] mr-1">📍</span>
            <span className="font-medium">{hotel.address.split(",")[0]}</span>
          </div>
        </div>

        {/* Reviews - Enhanced with Luxury Styling */}
        {hotel.reviews && hotel.reviews.totalReviews > 0 && (
          <div className="flex items-center justify-between mb-5 p-4 bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] rounded-xl border border-[#2A6F97]/10">
            <div className="flex items-center">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#2A6F97]/20">
                <span className="text-[#2A6F97] font-bold text-sm sm:text-base">
                  {hotel.reviews.averageRating}
                </span>
                <span className="text-[#2A6F97] ml-1 text-sm">★</span>
              </div>
              <span className="ml-3 text-gray-600 text-sm sm:text-base font-medium">
                {hotel.reviews.totalReviews} Verified Reviews
              </span>
            </div>
            {hotel.reviews.recentReviews &&
              hotel.reviews.recentReviews.length > 0 && (
                <div className="text-right hidden sm:block">
                  <p className="text-gray-500 text-xs italic line-clamp-1">
                    {hotel.reviews.recentReviews[0].comment}
                  </p>
                </div>
              )}
          </div>
        )}

        {/* Rooms Section - Luxury Styling */}
        {displayRooms.length > 0 && (
          <div className="mb-5">
            <h4 className="font-semibold text-[#2A6F97] text-sm sm:text-base mb-3 flex items-center">
              <span className="w-1 h-4 bg-[#2A6F97] rounded-full mr-2"></span>
              Luxury Accommodations
            </h4>
            <div className="space-y-3">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs sm:text-sm p-2 hover:bg-[#F0F7FF] rounded-lg transition-colors"
                >
                  <span className="text-gray-700 font-medium">
                    {room.roomType}
                  </span>
                  <span className="text-[#2A6F97] font-bold">
                    ${room.localPricePerNight}
                    <span className="text-gray-500 text-xs ml-1 font-normal">/night</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Food Section - Luxury Styling */}
        {displayMeals.length > 0 && (
          <div className="mb-5">
            <h4 className="font-semibold text-[#2A6F97] text-sm sm:text-base mb-3 flex items-center">
              <span className="w-1 h-4 bg-[#2A6F97] rounded-full mr-2"></span>
              Fine Dining
            </h4>
            <div className="space-y-3">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs sm:text-sm p-2 hover:bg-[#F0F7FF] rounded-lg transition-colors"
                >
                  <span className="text-gray-700">{meal.mealType}</span>
                  <span className="text-[#54A5CC] font-semibold">
                    ${meal.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities - Enhanced with Luxury Colors */}
        <div className="flex flex-wrap gap-2 mt-4">
          {hotel.wifiAvailable && (
            <span className="bg-[#2A6F97]/10 text-[#2A6F97] px-3 py-1.5 rounded-full text-xs font-medium border border-[#2A6F97]/20">
              Premium WiFi
            </span>
          )}
          {hotel.parkingFacility && (
            <span className="bg-[#3F8AB2]/10 text-[#3F8AB2] px-3 py-1.5 rounded-full text-xs font-medium border border-[#3F8AB2]/20">
              Valet Parking
            </span>
          )}
          {hotel.petFriendly && (
            <span className="bg-[#54A5CC]/10 text-[#54A5CC] px-3 py-1.5 rounded-full text-xs font-medium border border-[#54A5CC]/20">
              Pet Friendly
            </span>
          )}
          <span className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200">
            24/7 Concierge
          </span>
        </div>

        {/* Contact Info & Booking - Enhanced */}
        <div className="mt-6 pt-5 border-t border-[#2A6F97]/10">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">24/7 Guest Support</span>
              <span className="text-[#2A6F97] font-semibold text-sm sm:text-base">
                {hotel.contactNumber}
              </span>
            </div>
            <button className="bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] hover:from-[#1D4F6E] hover:to-[#3F8AB2] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Book Luxury Stay
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-3 flex items-center justify-end">
          <span className="text-[10px] text-gray-400 flex items-center">
            <span className="w-1 h-1 bg-[#2A6F97] rounded-full mr-1"></span>
            Verified Luxury Property
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotelSectionCard;