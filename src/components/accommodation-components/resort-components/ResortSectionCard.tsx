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
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-white hover:border-amber-200 transform hover:-translate-y-1">
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-50 via-amber-50 to-purple-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">🏖️</div>
              <span className="text-amber-600 text-sm font-semibold">Luxury Resort</span>
            </div>
          </div>
        )}
        
        {/* All-Inclusive Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl uppercase tracking-wide">
            All-Inclusive
          </span>
        </div>

        {/* Star Rating & Resort Type */}
        <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-1">
              <span className="text-amber-500 text-sm">⭐</span>
              <span className="text-gray-800 font-bold text-sm">{resort.starRating}</span>
            </div>
          </div>
          <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {resort.resortType}
          </div>
        </div>

        {/* Resort Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl lg:text-2xl drop-shadow-2xl line-clamp-1">
            {resort.resortName}
          </h3>
          <p className="text-amber-200 text-sm font-medium drop-shadow-lg line-clamp-1">
            {resort.resortDescription}
          </p>
        </div>
      </div>

      {/* Resort Details */}
      <div className="p-6">
        {/* Location & Contact */}
        <div className="mb-4">
          <div className="flex items-center text-cyan-600 text-sm font-medium mb-2">
            <span className="mr-2">🌴</span>
            <span className="line-clamp-1">{resort.address}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>📞 {resort.contactNumber}</span>
            <span>🕒 {resort.checkInTime} - {resort.checkOutTime}</span>
          </div>
        </div>

        {/* Capacity & Rooms */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gradient-to-r from-cyan-50 to-amber-50 rounded-2xl border border-cyan-100">
          <div className="text-center">
            <div className="text-cyan-600 font-bold text-lg">{resort.totalRooms}</div>
            <div className="text-gray-600 text-xs">Rooms</div>
          </div>
          <div className="text-center border-x border-cyan-200">
            <div className="text-purple-600 font-bold text-lg">
              {displayAccommodations.reduce((max, acc) => Math.max(max, acc.capacity), 0) || 2}
            </div>
            <div className="text-gray-600 text-xs">Max/Unit</div>
          </div>
          <div className="text-center">
            <div className="text-amber-600 font-bold text-lg">
              {resort.petFriendly ? 'Yes' : 'No'}
            </div>
            <div className="text-gray-600 text-xs">Pets</div>
          </div>
        </div>

        {/* Accommodations */}
        {displayAccommodations.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mr-2"></span>
              Accommodations
            </h4>
            <div className="space-y-2">
              {displayAccommodations.map((acc, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-xl hover:bg-cyan-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{acc.roomType}</div>
                    <div className="text-gray-500 text-xs flex items-center space-x-2 mt-1">
                      <span>👥 {acc.capacity} guests</span>
                      <span>🛏️ {acc.bedType}</span>
                      {acc.hasBalcony && <span>🌅 Balcony</span>}
                    </div>
                  </div>
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
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
            <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full mr-2"></span>
              Dining
            </h4>
            <div className="space-y-2">
              {displayDining.map((dining, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-2 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  <div>
                    <span className="font-medium text-gray-800">{dining.mealType}</span>
                    <span className="text-gray-500 text-xs ml-2">• {dining.cuisineType}</span>
                  </div>
                  <span className="text-amber-600 font-semibold text-sm">
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
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Resort Features</h4>
            <div className="flex flex-wrap gap-2">
              {displayFacilities.map((facility, index) => (
                <span
                  key={`facility-${index}`}
                  className="bg-gradient-to-r from-cyan-100 to-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium border border-cyan-200"
                >
                  {facility.facilityName}
                </span>
              ))}
              {displayAmenities.map((amenity, index) => (
                <span
                  key={`amenity-${index}`}
                  className="bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-200"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {resort.guestReviews && resort.guestReviews.totalReviews > 0 && (
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-2xl border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border">
                  <span className="text-purple-600 font-bold text-sm mr-1">
                    {resort.guestReviews.averageRating}
                  </span>
                  <span className="text-amber-400 text-xs">⭐</span>
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {resort.guestReviews.totalReviews} guest reviews
                </span>
              </div>
            </div>
            {resort.guestReviews.recentReviews && resort.guestReviews.recentReviews.length > 0 && (
              <div className="text-gray-600 text-xs italic line-clamp-2">
                {resort.guestReviews.recentReviews[0].comment}
                {resort.guestReviews.recentReviews[0].guestName && (
                  <span className="text-gray-500 ml-1 not-italic">
                    - {resort.guestReviews.recentReviews[0].guestName}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
            Book Resort
          </button>
          <button className="px-6 py-3 border border-cyan-300 text-cyan-600 hover:bg-cyan-50 rounded-xl font-semibold text-sm transition-colors">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResortSectionCard;