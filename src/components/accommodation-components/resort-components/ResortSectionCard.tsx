// components/resorts-components/ResortSectionCard.tsx
import React from "react";
import { ResortSectionResort } from "@/types/accommodations-types/resort-types";
import Image from "next/image";

interface ResortSectionCardProps {
  resort: ResortSectionResort;
}

const ResortSectionCard: React.FC<ResortSectionCardProps> = ({ resort }) => {
  const displayImages = resort.resortImages?.slice(0, 3) || []; // Show multiple resort images
  const displayAccommodations = resort.accommodations?.slice(0, 2) || [];
  const displayDining = resort.diningOptions?.slice(0, 2) || [];
  const displayFacilities = resort.resortFacilities?.slice(0, 3) || [];
  const displayAmenities = resort.amenities?.slice(0, 2) || [];

  return (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-[#0A2F44]/10 hover:border-[#1F5F72]/30 transform hover:-translate-y-2 relative">
      {/* Ocean-Inspired Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="card-wave-pattern" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
              <path d="M0 15 Q15 8 30 15 T60 15" stroke="#0A2F44" fill="none" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#card-wave-pattern)"/>
        </svg>
      </div>

      {/* Resort Images Carousel */}
      <div className="relative h-56 sm:h-64 md:h-60 lg:h-64 xl:h-72 overflow-hidden">
        {displayImages.length > 0 ? (
          <div className="flex h-full">
            {displayImages.map((image, index) => (
              <div key={index} className="flex-1 relative overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.caption}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                {/* Ocean-Inspired Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2F44]/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Depth Indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0A2F44] via-[#144A5E] to-[#1F5F72] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#E6F0F5] via-[#D9E9F0] to-[#C0D9E5] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-3 opacity-50">🏖️</div>
              <span className="text-[#0A2F44] text-sm font-semibold">Oceanfront Resort</span>
            </div>
          </div>
        )}
        
        {/* All-Inclusive Badge - Ocean Themed */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-[#0A2F44] via-[#144A5E] to-[#1F5F72] text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl uppercase tracking-wider border border-white/20">
            All-Inclusive
          </span>
        </div>

        {/* Star Rating & Resort Type */}
        <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-lg border border-[#0A2F44]/10">
            <div className="flex items-center space-x-1">
              <span className="text-[#1F5F72] text-sm">★</span>
              <span className="text-[#0A2F44] font-bold text-sm">{resort.starRating}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#144A5E] to-[#1F5F72] text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
            {resort.resortType}
          </div>
        </div>

        {/* Resort Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl lg:text-2xl drop-shadow-2xl line-clamp-1 mb-1">
            {resort.resortName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#1F5F72] rounded-full"></span>
            <p className="text-white/80 text-sm font-medium drop-shadow-lg line-clamp-1">
              {resort.resortDescription}
            </p>
            <span className="w-1 h-1 bg-[#0A2F44] rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Resort Details */}
      <div className="p-6 relative">
        {/* Location & Contact */}
        <div className="mb-4">
          <div className="flex items-center text-[#0A2F44] text-sm font-medium mb-2 bg-[#E6F0F5] px-3 py-2 rounded-xl">
            <span className="mr-2 text-[#1F5F72]">🌊</span>
            <span className="line-clamp-1 flex-1">{resort.address}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-[#144A5E] bg-white border border-[#0A2F44]/10 px-3 py-2 rounded-lg">
            <span className="flex items-center gap-1">
              <span className="text-[#1F5F72]">📞</span> {resort.contactNumber}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[#1F5F72]">🕒</span> {resort.checkInTime} - {resort.checkOutTime}
            </span>
          </div>
        </div>

        {/* Capacity & Rooms */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#D9E9F0] rounded-2xl border border-[#0A2F44]/10">
          <div className="text-center">
            <div className="text-[#0A2F44] font-bold text-lg">{resort.totalRooms}</div>
            <div className="text-[#144A5E] text-xs">Suites</div>
          </div>
          <div className="text-center border-x border-[#1F5F72]/20">
            <div className="text-[#144A5E] font-bold text-lg">
              {displayAccommodations.reduce((max, acc) => Math.max(max, acc.capacity), 0) || 2}
            </div>
            <div className="text-[#144A5E] text-xs">Capacity</div>
          </div>
          <div className="text-center">
            <div className="text-[#1F5F72] font-bold text-lg">
              {resort.petFriendly ? '✓' : '✗'}
            </div>
            <div className="text-[#144A5E] text-xs">Pets</div>
          </div>
        </div>

        {/* Accommodations */}
        {displayAccommodations.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-[#0A2F44] text-sm mb-3 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full mr-2"></span>
              Oceanfront Suites
            </h4>
            <div className="space-y-2">
              {displayAccommodations.map((acc, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-3 bg-white border border-[#0A2F44]/10 rounded-xl hover:border-[#1F5F72]/30 hover:shadow-md transition-all duration-300 group/room"
                >
                  <div className="flex-1">
                    <div className="font-medium text-[#0A2F44] group-hover/room:text-[#1F5F72] transition-colors">
                      {acc.roomType}
                    </div>
                    <div className="text-[#144A5E] text-xs flex items-center flex-wrap gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <span>👥</span> {acc.capacity} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🛏️</span> {acc.bedType}
                      </span>
                      {acc.hasBalcony && (
                        <span className="flex items-center gap-1">
                          <span>🌊</span> Ocean View
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] text-white px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-md">
                    ${acc.localPricePerNight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dining Options */}
        {displayDining.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-[#0A2F44] text-sm mb-3 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-[#144A5E] to-[#1F5F72] rounded-full mr-2"></span>
              Culinary Experiences
            </h4>
            <div className="space-y-2">
              {displayDining.map((dining, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-3 bg-gradient-to-r from-[#E6F0F5] to-white rounded-xl border border-[#0A2F44]/10 hover:border-[#1F5F72]/30 transition-all duration-300"
                >
                  <div>
                    <span className="font-medium text-[#0A2F44]">{dining.mealType}</span>
                    <span className="text-[#144A5E] text-xs ml-2">• {dining.cuisineType}</span>
                  </div>
                  <span className="text-[#1F5F72] font-semibold bg-[#1F5F72]/10 px-3 py-1 rounded-lg text-sm">
                    ${dining.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Facilities & Amenities */}
        {(displayFacilities.length > 0 || displayAmenities.length > 0) && (
          <div className="mb-4">
            <h4 className="font-semibold text-[#0A2F44] text-sm mb-3 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-[#1F5F72] to-[#0A2F44] rounded-full mr-2"></span>
              Resort Features
            </h4>
            <div className="flex flex-wrap gap-2">
              {displayFacilities.map((facility, index) => (
                <span
                  key={`facility-${index}`}
                  className="bg-gradient-to-r from-[#0A2F44]/10 to-[#144A5E]/10 text-[#0A2F44] px-3 py-1.5 rounded-full text-xs font-medium border border-[#0A2F44]/20"
                >
                  {facility.facilityName}
                </span>
              ))}
              {displayAmenities.map((amenity, index) => (
                <span
                  key={`amenity-${index}`}
                  className="bg-gradient-to-r from-[#144A5E]/10 to-[#1F5F72]/10 text-[#144A5E] px-3 py-1.5 rounded-full text-xs font-medium border border-[#144A5E]/20"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {resort.guestReviews && resort.guestReviews.totalReviews > 0 && (
          <div className="mb-4 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#D9E9F0] rounded-2xl border border-[#0A2F44]/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#0A2F44]/10">
                  <span className="text-[#0A2F44] font-bold text-sm mr-1">
                    {resort.guestReviews.averageRating}
                  </span>
                  <span className="text-[#1F5F72] text-xs">★</span>
                </div>
                <span className="text-[#144A5E] text-sm font-medium">
                  {resort.guestReviews.totalReviews} guest reviews
                </span>
              </div>
            </div>
            {resort.guestReviews.recentReviews && resort.guestReviews.recentReviews.length > 0 && (
              <div className="relative">
                <p className="text-[#0A2F44] text-xs italic leading-relaxed line-clamp-2">
                  {resort.guestReviews.recentReviews[0].comment}
                </p>
                {resort.guestReviews.recentReviews[0].guestName && (
                  <span className="text-[#144A5E] text-xs ml-1 not-italic font-medium">
                    — {resort.guestReviews.recentReviews[0].guestName}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-[#0A2F44]/10">
          <button className="flex-1 bg-gradient-to-r from-[#0A2F44] via-[#144A5E] to-[#1F5F72] hover:from-[#052230] hover:to-[#0A2F44] text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Book Resort
          </button>
          <button className="px-6 py-3.5 border-2 border-[#0A2F44]/20 text-[#0A2F44] hover:bg-[#0A2F44] hover:text-white rounded-xl font-semibold text-sm transition-all duration-300">
            Explore
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-3 flex items-center justify-end">
          <span className="text-[10px] text-gray-400 flex items-center">
            <span className="w-1 h-1 bg-[#0A2F44] rounded-full mr-1"></span>
            Ultra-Luxury Resort Collection
            <span className="w-1 h-1 bg-[#1F5F72] rounded-full ml-1"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResortSectionCard;