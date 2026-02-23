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
    <div className="group bg-white/95 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#B5E5D4] hover:border-[#C9EFE3] transform hover:-translate-y-1 overflow-hidden">
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
                {/* Light Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#B5E5D4]/30 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#B5E5D4] to-[#DDF9F2] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🏕️</div>
              <span className="text-[#2D4F43] text-sm font-medium">
                Fresh Hostel Space
              </span>
            </div>
          </div>
        )}

        {/* Social Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#2D4F43] px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-[#B5E5D4]">
            SOCIAL SPOT
          </span>
        </div>

        {/* Star Rating */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-[#B5E5D4]">
          <div className="flex items-center space-x-1">
            <span className="text-[#B5E5D4] text-sm">★</span>
            <span className="text-[#2D4F43] font-bold text-sm">
              {hostel.starRating}
            </span>
          </div>
        </div>

        {/* Hostel Type */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#2D4F43] px-2 py-1 rounded text-xs font-semibold border border-[#C9EFE3]">
            {hostel.hostelType}
          </span>
        </div>
      </div>

      {/* Hostel Details */}
      <div className="p-4">
        {/* Hostel Name and Description */}
        <div className="mb-3">
          <h3 className="font-bold text-[#2D4F43] text-lg lg:text-xl mb-1 line-clamp-1 group-hover:text-[#3F6B5C] transition-colors">
            {hostel.hostelName}
          </h3>
          <p className="text-[#5A8F7A] text-sm leading-relaxed line-clamp-2 mb-2">
            {hostel.hostelDescription}
          </p>

          {/* Location */}
          <div className="flex items-center text-[#3F6B5C] text-xs font-medium">
            <span className="mr-1">📍</span>
            <span className="line-clamp-1">{hostel.address.split(",")[0]}</span>
          </div>
        </div>

        {/* Price Range & Capacity */}
        <div className="flex items-center justify-between mb-3 p-3 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
          {priceRange && (
            <div className="text-center flex-1">
              <div className="text-[#2D4F43] font-bold text-base">
                ${priceRange.min}
                {priceRange.max > priceRange.min && ` - $${priceRange.max}`}
              </div>
              <div className="text-[#5A8F7A] text-xs">per night</div>
            </div>
          )}
          <div className="h-8 w-px bg-[#B5E5D4] mx-2"></div>
          <div className="text-center flex-1">
            <div className="text-[#2D4F43] font-bold text-base">
              {hostel.totalRooms}
            </div>
            <div className="text-[#5A8F7A] text-xs">Rooms</div>
          </div>
        </div>

        {/* Room Types */}
        {displayRooms.length > 0 && (
          <div className="mb-3">
            <h4 className="font-semibold text-[#2D4F43] text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-[#B5E5D4] rounded-full mr-2"></span>
              Dorm & Private Options
            </h4>
            <div className="space-y-1">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-2 hover:bg-[#F5FDFA] rounded-lg transition-colors border border-transparent hover:border-[#B5E5D4]"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-[#2D4F43]">
                      {room.roomType}
                    </span>
                    <span className="text-[#5A8F7A]">•</span>
                    <span className="text-[#5A8F7A]">👥 {room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5A8F7A] text-xs">{room.bedType}</span>
                    <span className="text-[#2D4F43] font-bold bg-[#F5FDFA] px-2 py-1 rounded-full">
                      ${room.localPricePerNight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meals */}
        {displayMeals.length > 0 && (
          <div className="mb-3">
            <h4 className="font-semibold text-[#2D4F43] text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-[#C9EFE3] rounded-full mr-2"></span>
              Food Options
            </h4>
            <div className="space-y-1">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-2 hover:bg-[#F5FDFA] rounded-lg transition-colors"
                >
                  <span className="text-[#2D4F43]">{meal.mealType}</span>
                  <span className="text-[#2D4F43] font-medium bg-[#FAFFFD] px-2 py-1 rounded-full border border-[#DDF9F2]">
                    ${meal.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {hostel.reviews && hostel.reviews.totalReviews > 0 && (
          <div className="mb-3 p-3 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm border border-[#B5E5D4]">
                  <span className="text-[#2D4F43] font-bold text-xs mr-1">
                    {hostel.reviews.averageRating}
                  </span>
                  <span className="text-[#B5E5D4] text-xs">★</span>
                </div>
                <span className="text-[#5A8F7A] text-xs font-medium">
                  {hostel.reviews.totalReviews} reviews
                </span>
              </div>
            </div>
            {hostel.reviews.recentReviews &&
              hostel.reviews.recentReviews.length > 0 && (
                <p className="text-[#2D4F43] text-xs mt-1 line-clamp-2 italic">
                  {hostel.reviews.recentReviews[0].comment}
                </p>
              )}
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {hostel.wifiAvailable && (
            <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs font-medium border border-[#B5E5D4]">
              📶 Free WiFi
            </span>
          )}
          {hostel.parkingFacility && (
            <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs font-medium border border-[#C9EFE3]">
              🅿️ Parking
            </span>
          )}
          {hostel.petFriendly && (
            <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs font-medium border border-[#DDF9F2]">
              🐾 Pet Friendly
            </span>
          )}
          {hostel.rooms?.some((room) => room.hasAirConditioning) && (
            <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs font-medium border border-[#B5E5D4]">
              ❄️ A/C
            </span>
          )}
          <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs font-medium border border-[#C9EFE3]">
            🎮 Common Room
          </span>
        </div>

        {/* Check-in/out */}
        <div className="flex items-center justify-between text-xs text-[#5A8F7A] mb-3 bg-[#F5FDFA] p-2 rounded-lg">
          <span className="flex items-center gap-1">
            <span>🕒</span> Check-in: {hostel.checkInTime}
          </span>
          <span className="flex items-center gap-1">
            <span>🕛</span> Check-out: {hostel.checkOutTime}
          </span>
        </div>

        {/* Social Features */}
        <div className="flex items-center justify-between text-xs text-[#5A8F7A] mb-3">
          <span className="flex items-center gap-1">
            <span>🌍</span> Free Walking Tours
          </span>
          <span className="flex items-center gap-1">
            <span>🍳</span> Shared Kitchen
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2 border-t border-[#B5E5D4]">
          <button className="flex-1 bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] hover:from-[#9FD4C0] hover:to-[#C9EFE3] text-[#2D4F43] py-2.5 rounded-lg font-bold text-xs transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
            Book Bed
          </button>
          <button className="px-3 py-2 border border-[#B5E5D4] text-[#2D4F43] hover:bg-[#F5FDFA] rounded-lg font-medium text-xs transition-colors">
            Details
          </button>
        </div>

        {/* Social Vibe */}
        <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-[#5A8F7A]">
          <span>✨</span>
          <span>Great for meeting travelers</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};

export default HostelSectionCard;