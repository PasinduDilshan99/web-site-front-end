// app/hotels/components/CompactDetailedHotelCard.tsx
import React, { useState } from "react";
import { HotelSectionHotel } from "@/types/accommodations-types/hotel-types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CompactDetailedHotelCardProps {
  hotel: HotelSectionHotel;
}

const CompactDetailedHotelCard: React.FC<CompactDetailedHotelCardProps> = ({
  hotel,
}) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const router = useRouter();

  const displayImages = showAllImages
    ? hotel.hotelImages
    : hotel.hotelImages?.slice(0, 3) || [];
  const displayRooms = showAllRooms
    ? hotel.rooms
    : hotel.rooms?.slice(0, 2) || [];
  const displayReviews = showAllReviews
    ? hotel.reviews.recentReviews
    : hotel.reviews.recentReviews?.slice(0, 1) || [];
  const displayMeals = hotel.meals?.slice(0, 2) || [];

  const handleBookNow = () => {
    router.push(`/accommodations/hotels/${hotel.hotelId}`);
  };

  // Calculate price range
  const priceRange =
    hotel.rooms && hotel.rooms.length > 0
      ? {
          min: Math.min(...hotel.rooms.map((room) => room.localPricePerNight)),
          max: Math.max(...hotel.rooms.map((room) => room.localPricePerNight)),
        }
      : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group">
      {/* Hotel Header - Compact */}
      <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-4 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1 line-clamp-1">
              {hotel.hotelName}
            </h2>
            <p className="text-purple-100 text-sm mb-2 line-clamp-2">
              {hotel.hotelDescription}
            </p>
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center bg-white/20 px-2 py-1 rounded-full">
                <span className="text-yellow-300 text-sm">⭐</span>
                <span className="ml-1 text-xs font-bold">
                  {hotel.starRating}
                </span>
              </div>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {hotel.hotelType}
              </span>
              {priceRange && (
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                  ${priceRange.min}+
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Images Gallery - Compact */}
        {hotel.hotelImages && hotel.hotelImages.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Photos
              </h3>
              {hotel.hotelImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-purple-600 hover:text-purple-700 text-xs font-medium flex items-center"
                >
                  {showAllImages
                    ? "Show Less"
                    : `+${hotel.hotelImages.length - 3}`}
                </button>
              )}
            </div>
            <div
              className={`grid gap-2 ${
                showAllImages ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group/image"
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover/image:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact & Location - Compact */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="space-y-1 text-xs">
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📍</span>
              <span className="line-clamp-1">
                {hotel.address.split(",")[0]}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📞</span>
              <span>{hotel.contactNumber}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>🕒 {hotel.checkInTime}</span>
              <span>🕛 {hotel.checkOutTime}</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2 bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg border border-purple-100">
          <div className="text-center">
            <div className="text-purple-600 font-bold text-sm">
              {hotel.totalRooms}
            </div>
            <div className="text-gray-600 text-xs">Rooms</div>
          </div>
          <div className="text-center border-x border-purple-200">
            <div className="text-amber-600 font-bold text-sm">
              {displayRooms.reduce(
                (max, room) => Math.max(max, room.capacity),
                0
              )}
            </div>
            <div className="text-gray-600 text-xs">Max/Unit</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 font-bold text-sm">
              {hotel.petFriendly ? "Yes" : "No"}
            </div>
            <div className="text-gray-600 text-xs">Pets</div>
          </div>
        </div>

        {/* Rooms - Compact */}
        {displayRooms.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Rooms
              </h3>
              {hotel.rooms && hotel.rooms.length > 2 && (
                <button
                  onClick={() => setShowAllRooms(!showAllRooms)}
                  className="text-purple-600 hover:text-purple-700 text-xs font-medium flex items-center"
                >
                  {showAllRooms ? "Show Less" : `+${hotel.rooms.length - 2}`}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-2 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {room.roomType}
                    </div>
                    <div className="text-gray-500 flex items-center space-x-2 mt-1">
                      <span>👥 {room.capacity}</span>
                      <span>🛏️ {room.bedType}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold">
                      ${room.localPricePerNight}
                    </div>
                    <button className="mt-1 bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dining Options - Compact */}
        {displayMeals.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Dining
            </h3>
            <div className="space-y-1">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-2 bg-amber-50 rounded border border-amber-200"
                >
                  <div>
                    <span className="font-medium text-gray-800">
                      {meal.mealType}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                      • {meal.cuisineType}
                    </span>
                  </div>
                  <span className="text-amber-600 font-semibold">
                    ${meal.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities - Compact */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Amenities
          </h3>
          <div className="flex flex-wrap gap-1">
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
            {hotel.rooms?.some((room) => room.hasAirConditioning) && (
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                A/C
              </span>
            )}
          </div>
        </div>

        {/* Reviews - Compact */}
        {hotel.reviews && hotel.reviews.totalReviews > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Reviews
              </h3>
              <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                <span className="font-bold mr-1">
                  {hotel.reviews.averageRating}
                </span>
                <span className="text-yellow-400">⭐</span>
                <span className="ml-1 text-gray-600">
                  ({hotel.reviews.totalReviews})
                </span>
              </div>
            </div>
            {displayReviews.length > 0 && (
              <div className="space-y-2">
                {displayReviews.map((review, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400 text-xs">
                        {"⭐".repeat(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600 italic line-clamp-2">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {hotel.reviews.recentReviews &&
              hotel.reviews.recentReviews.length > 1 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-2 text-purple-600 hover:text-purple-700 text-xs font-medium flex items-center"
                >
                  {showAllReviews
                    ? "Show Less"
                    : `+${hotel.reviews.recentReviews.length - 1} more`}
                </button>
              )}
          </div>
        )}

        {/* Cancellation Policy - Compact */}
        <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <h4 className="font-semibold text-gray-800 text-sm mb-1 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Cancellation
          </h4>
          <p className="text-gray-700 text-xs line-clamp-2">
            {hotel.cancellationPolicy}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <button
            onClick={handleBookNow}
            className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompactDetailedHotelCard;
