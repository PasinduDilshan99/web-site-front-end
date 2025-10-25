// app/hotels/components/CompactHotelCard.tsx
import React from "react";
import { HotelSectionHotel } from "@/types/accommodations-types/hotel-types";
import Image from "next/image";

interface CompactHotelCardProps {
  hotel: HotelSectionHotel;
}

const CompactHotelCard: React.FC<CompactHotelCardProps> = ({ hotel }) => {
  const mainImage = hotel.hotelImages?.[0];
  const displayRooms = hotel.rooms?.slice(0, 2) || [];
  const displayMeals = hotel.meals?.slice(0, 1) || [];

  // Calculate price range
  const priceRange = hotel.rooms && hotel.rooms.length > 0 
    ? {
        min: Math.min(...hotel.rooms.map(room => room.localPricePerNight)),
        max: Math.max(...hotel.rooms.map(room => room.localPricePerNight))
      }
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 group">
      {/* Hotel Image */}
      <div className="relative h-48 overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage.imageUrl}
            alt={mainImage.caption}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-amber-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-2">🏨</div>
              <span className="text-purple-600 text-sm font-medium">Hotel</span>
            </div>
          </div>
        )}
        
        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="text-gray-800 font-bold text-sm">{hotel.starRating}</span>
          </div>
        </div>

        {/* Hotel Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
            {hotel.hotelType}
          </span>
        </div>

        {/* Price Range */}
        {priceRange && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-green-600/90 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
              ${priceRange.min}+
            </span>
          </div>
        )}
      </div>

      {/* Hotel Details */}
      <div className="p-4">
        {/* Hotel Name and Description */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
            {hotel.hotelName}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-2">
            {hotel.hotelDescription}
          </p>
          
          {/* Location */}
          <div className="flex items-center text-purple-600 text-xs font-medium">
            <span className="mr-1">📍</span>
            <span className="line-clamp-1">{hotel.address.split(',')[0]}</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 rounded-lg">
          <div className="text-center flex-1">
            <div className="text-purple-600 font-bold text-sm">{hotel.totalRooms}</div>
            <div className="text-gray-600 text-xs">Rooms</div>
          </div>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <div className="text-center flex-1">
            <div className="text-amber-600 font-bold text-sm">
              {displayRooms.reduce((max, room) => Math.max(max, room.capacity), 0)}
            </div>
            <div className="text-gray-600 text-xs">Max Guests</div>
          </div>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <div className="text-center flex-1">
            <div className="text-green-600 font-bold text-sm">
              {hotel.checkInTime.split(':')[0]}h
            </div>
            <div className="text-gray-600 text-xs">Check-in</div>
          </div>
        </div>

        {/* Room Types */}
        {displayRooms.length > 0 && (
          <div className="mb-3">
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Room Types</h4>
            <div className="space-y-1">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs"
                >
                  <span className="text-gray-700 font-medium">{room.roomType}</span>
                  <span className="text-green-600 font-bold">
                    ${room.localPricePerNight}
                  </span>
                </div>
              ))}
              {hotel.rooms && hotel.rooms.length > 2 && (
                <div className="text-center">
                  <span className="text-purple-600 text-xs font-medium">
                    +{hotel.rooms.length - 2} more rooms
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dining Options */}
        {displayMeals.length > 0 && (
          <div className="mb-3">
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Dining</h4>
            <div className="space-y-1">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs"
                >
                  <span className="text-gray-700">{meal.mealType}</span>
                  <span className="text-amber-600 font-semibold">
                    ${meal.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {hotel.wifiAvailable && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              WiFi
            </span>
          )}
          {hotel.parkingFacility && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
              Parking
            </span>
          )}
          {hotel.petFriendly && (
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
              Pets
            </span>
          )}
          {hotel.rooms?.some(room => room.hasAirConditioning) && (
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
              A/C
            </span>
          )}
        </div>

        {/* Reviews */}
        {hotel.reviews && hotel.reviews.totalReviews > 0 && (
          <div className="mb-3 p-2 bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm border">
                  <span className="text-purple-600 font-bold text-xs mr-1">
                    {hotel.reviews.averageRating}
                  </span>
                  <span className="text-yellow-400 text-xs">⭐</span>
                </div>
                <span className="text-gray-700 text-xs font-medium">
                  {hotel.reviews.totalReviews} reviews
                </span>
              </div>
            </div>
            {hotel.reviews.recentReviews && hotel.reviews.recentReviews.length > 0 && (
              <p className="text-gray-600 text-xs mt-1 line-clamp-2 italic">
                {hotel.reviews.recentReviews[0].comment}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <button className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105">
            Book Now
          </button>
          <button className="px-3 py-2 border border-purple-300 text-purple-600 hover:bg-purple-50 rounded-lg font-medium text-xs transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompactHotelCard;