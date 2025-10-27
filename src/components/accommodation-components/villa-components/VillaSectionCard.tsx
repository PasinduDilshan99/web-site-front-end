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
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-amber-200 hover:border-purple-300 transform hover:-translate-y-2">
      {/* Villa Image with Gradient Overlay */}
      <div className="relative h-48 sm:h-56 md:h-52 lg:h-56 xl:h-60 overflow-hidden">
        {displayImages.length > 0 ? (
          <>
            <Image
              src={displayImages[0].imageUrl}
              alt={displayImages[0].caption}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 via-purple-50 to-amber-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🏡</div>
              <span className="text-amber-600 text-sm font-medium">
                Luxury Villa
              </span>
            </div>
          </div>
        )}

        {/* Premium Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            PREMIUM
          </span>
        </div>

        {/* Star Rating */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <div className="flex items-center space-x-1">
            <span className="text-amber-500 text-sm">★</span>
            <span className="text-gray-800 font-bold text-sm">
              {villa.starRating}
            </span>
          </div>
        </div>

        {/* Villa Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 text-purple-700 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
            {villa.villaType}
          </span>
        </div>
      </div>

      {/* Villa Details */}
      <div className="p-5 sm:p-6">
        {/* Villa Name and Description */}
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 text-xl lg:text-2xl mb-2 line-clamp-1 bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
            {villa.villaName}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
            {villa.villaDescription}
          </p>

          {/* Location */}
          <div className="flex items-center text-amber-600 text-sm font-medium">
            <span className="mr-1">📍</span>
            <span className="line-clamp-1">{villa.address.split(",")[0]}</span>
          </div>
        </div>

        {/* Capacity and Rooms */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-amber-50 to-purple-50 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-amber-600 font-bold text-lg">
                {villa.totalRooms}
              </div>
              <div className="text-gray-600 text-xs">Rooms</div>
            </div>
            <div className="h-8 w-px bg-amber-200"></div>
            <div className="text-center">
              <div className="text-purple-600 font-bold text-lg">
                {villa.rooms?.reduce(
                  (max, room) => Math.max(max, room.capacity),
                  0
                ) || 0}
              </div>
              <div className="text-gray-600 text-xs">Max Guests</div>
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        {displayRooms.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Villa Features
            </h4>
            <div className="space-y-2">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-2 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  <div>
                    <span className="font-medium text-gray-800">
                      {room.roomType}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                      • {room.bedType}
                    </span>
                  </div>
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ${room.localPricePerNight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {villa.reviews && villa.reviews.totalReviews > 0 && (
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-amber-500 font-bold text-sm mr-1">
                    {villa.reviews.averageRating}
                  </span>
                  <span className="text-amber-400 text-xs">★</span>
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {villa.reviews.totalReviews} review
                  {villa.reviews.totalReviews !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            {villa.reviews.recentReviews &&
              villa.reviews.recentReviews.length > 0 && (
                <p className="text-gray-600 text-xs mt-2 line-clamp-2 italic">
                  {villa.reviews.recentReviews[0].comment}
                </p>
              )}
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {villa.wifiAvailable && (
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span>
              WiFi
            </span>
          )}
          {villa.parkingFacility && (
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1"></span>
              Parking
            </span>
          )}
          {villa.petFriendly && (
            <span className="bg-gradient-to-r from-amber-100 to-purple-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full mr-1"></span>
              Pet Friendly
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-3 border-t border-amber-100">
          <button className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
            Book Now
          </button>
          <button className="px-4 py-3 border border-amber-300 text-amber-600 hover:bg-amber-50 rounded-xl font-medium text-sm transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VillaSectionCard;
