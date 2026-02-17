// components/villas-components/VillaSectionCard.tsx
import React from "react";
import { VillaSectionVilla } from "@/types/accommodations-types/villa-types";
import Image from "next/image";

interface VillaSectionCardProps {
  villa: VillaSectionVilla;
}

const VillaSectionCard: React.FC<VillaSectionCardProps> = ({ villa }) => {
  const displayImages = villa.villaImages?.slice(0, 1) || []; // Show only 1 main image for villas
  const displayRooms = villa.rooms?.slice(0, 3) || []; // Show up to 3 rooms

  return (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-[#1B4D3E]/10 hover:border-[#428577]/30 transform hover:-translate-y-2">
      {/* Villa Image with Nature-Inspired Overlay */}
      <div className="relative h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60 overflow-hidden">
        {displayImages.length > 0 ? (
          <>
            <Image
              src={displayImages[0].imageUrl}
              alt={displayImages[0].caption}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            {/* Gradient Overlay - Nature Inspired */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E]/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
            
            {/* Decorative Leaf Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="leaf-overlay" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M20 5 Q25 5 28 10 Q30 15 25 20 Q20 25 15 20 Q10 15 15 10 Q18 5 20 5" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf-overlay)"/>
              </svg>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#E8F3EF] to-[#D9ECE5] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-50">🏡</div>
              <span className="text-[#1B4D3E] text-sm font-medium">
                Private Villa
              </span>
            </div>
          </div>
        )}

        {/* Exclusive Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-[#1B4D3E] to-[#428577] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg tracking-wide">
            EXCLUSIVE
          </span>
        </div>

        {/* Star Rating */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-[#1B4D3E]/10">
          <div className="flex items-center space-x-1">
            <span className="text-[#2E6B5C] text-sm">★</span>
            <span className="text-[#1B4D3E] font-bold text-sm">
              {villa.starRating}
            </span>
          </div>
        </div>

        {/* Villa Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 text-[#1B4D3E] px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm border border-[#428577]/20 shadow-lg">
            {villa.villaType}
          </span>
        </div>

        {/* Price Tag */}
        {villa.rooms && villa.rooms.length > 0 && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-[#1B4D3E] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg border border-[#428577]/30">
              From ${Math.min(...villa.rooms.map(r => r.localPricePerNight))}
            </span>
          </div>
        )}
      </div>

      {/* Villa Details */}
      <div className="p-6 sm:p-7">
        {/* Villa Name and Description */}
        <div className="mb-5">
          <h3 className="font-bold text-[#1B4D3E] text-xl lg:text-2xl mb-2 line-clamp-1 group-hover:text-[#2E6B5C] transition-colors">
            {villa.villaName}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
            {villa.villaDescription}
          </p>

          {/* Location */}
          <div className="flex items-center text-[#2E6B5C] text-sm font-medium">
            <span className="mr-1 text-[#1B4D3E]">🌿</span>
            <span className="line-clamp-1">{villa.address.split(",")[0]}</span>
          </div>
        </div>

        {/* Capacity and Features */}
        <div className="flex items-center justify-between mb-5 p-4 bg-gradient-to-r from-[#F0F9F5] to-[#E8F3EF] rounded-xl border border-[#1B4D3E]/10">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-[#1B4D3E] font-bold text-xl">
                {villa.totalRooms}
              </div>
              <div className="text-[#2E6B5C] text-xs tracking-wide">ROOMS</div>
            </div>
            <div className="h-8 w-px bg-[#428577]/30"></div>
            <div className="text-center">
              <div className="text-[#428577] font-bold text-xl">
                {villa.rooms?.reduce(
                  (max, room) => Math.max(max, room.capacity),
                  0
                ) || 0}
              </div>
              <div className="text-[#2E6B5C] text-xs tracking-wide">GUESTS</div>
            </div>
            <div className="h-8 w-px bg-[#428577]/30"></div>
            <div className="text-center">
              <div className="text-[#2E6B5C] font-bold text-xl">
                {villa.rooms?.length || 0}
              </div>
              <div className="text-[#2E6B5C] text-xs tracking-wide">SUITES</div>
            </div>
          </div>
        </div>

        {/* Rooms Section - Nature Inspired */}
        {displayRooms.length > 0 && (
          <div className="mb-5">
            <h4 className="font-semibold text-[#1B4D3E] text-sm mb-3 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#428577] rounded-full mr-2"></span>
              Private Suites
            </h4>
            <div className="space-y-2">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-3 bg-white border border-[#1B4D3E]/10 rounded-xl hover:border-[#428577]/30 hover:shadow-md transition-all duration-300 group/room"
                >
                  <div>
                    <span className="font-semibold text-[#1B4D3E] group-hover/room:text-[#428577] transition-colors">
                      {room.roomType}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-500 text-xs flex items-center">
                        <span className="mr-1">🛏️</span> {room.bedType}
                      </span>
                      <span className="text-gray-500 text-xs flex items-center">
                        <span className="mr-1">👥</span> {room.capacity} guests
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-[#1B4D3E] text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                      ${room.localPricePerNight}
                    </span>
                    <div className="text-[10px] text-gray-400 mt-1">per night</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {villa.reviews && villa.reviews.totalReviews > 0 && (
          <div className="mb-5 p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl border border-[#428577]/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#1B4D3E]/10">
                  <span className="text-[#1B4D3E] font-bold text-sm mr-1">
                    {villa.reviews.averageRating}
                  </span>
                  <span className="text-[#428577] text-xs">★</span>
                </div>
                <span className="text-[#2E6B5C] text-sm font-medium">
                  {villa.reviews.totalReviews} verified reviews
                </span>
              </div>
            </div>
            {villa.reviews.recentReviews &&
              villa.reviews.recentReviews.length > 0 && (
                <p className="text-gray-600 text-xs mt-2 line-clamp-2 italic leading-relaxed">
                  {villa.reviews.recentReviews[0].comment}
                </p>
              )}
          </div>
        )}

        {/* Amenities - Nature Inspired */}
        <div className="flex flex-wrap gap-2 mb-5">
          {villa.wifiAvailable && (
            <span className="bg-[#1B4D3E]/10 text-[#1B4D3E] px-3 py-1.5 rounded-full text-xs font-medium border border-[#1B4D3E]/20 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#1B4D3E] rounded-full mr-1.5"></span>
              High-Speed WiFi
            </span>
          )}
          {villa.parkingFacility && (
            <span className="bg-[#2E6B5C]/10 text-[#2E6B5C] px-3 py-1.5 rounded-full text-xs font-medium border border-[#2E6B5C]/20 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#2E6B5C] rounded-full mr-1.5"></span>
              Private Parking
            </span>
          )}
          {villa.petFriendly && (
            <span className="bg-[#428577]/10 text-[#428577] px-3 py-1.5 rounded-full text-xs font-medium border border-[#428577]/20 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#428577] rounded-full mr-1.5"></span>
              Pet Friendly
            </span>
          )}
          <span className="bg-gradient-to-r from-[#1B4D3E]/5 to-[#428577]/5 text-[#2E6B5C] px-3 py-1.5 rounded-full text-xs font-medium border border-[#428577]/20 flex items-center">
            <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-full mr-1.5"></span>
            Private Pool
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-[#1B4D3E]/10">
          <button className="flex-1 bg-gradient-to-r from-[#1B4D3E] to-[#428577] hover:from-[#0F3A2E] hover:to-[#2E6B5C] text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Reserve Villa
          </button>
          <button className="px-6 py-3.5 border-2 border-[#1B4D3E]/20 text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white rounded-xl font-medium text-sm transition-all duration-300">
            View Details
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-3 flex items-center justify-end">
          <span className="text-[10px] text-gray-400 flex items-center">
            <span className="w-1 h-1 bg-[#428577] rounded-full mr-1"></span>
            Private Luxury Retreat
          </span>
        </div>
      </div>
    </div>
  );
};

export default VillaSectionCard;