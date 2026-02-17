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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#2A6F97]/10 hover:shadow-2xl transition-all duration-500 group hover:border-[#2A6F97]/30">
      {/* Hotel Header - Luxury Styling */}
      <div className="bg-gradient-to-r from-[#2A6F97] via-[#3F8AB2] to-[#54A5CC] p-5 text-white relative overflow-hidden">
        {/* Decorative wave pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
        
        <div className="flex items-start justify-between relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                {hotel.hotelType}
              </span>
              {priceRange && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                  From ${priceRange.min}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold mb-1 line-clamp-1 group-hover:translate-x-1 transition-transform">
              {hotel.hotelName}
            </h2>
            <p className="text-white/80 text-sm mb-2 line-clamp-2">
              {hotel.hotelDescription}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                <span className="text-yellow-300 text-sm">★</span>
                <span className="ml-1 text-xs font-bold">
                  {hotel.starRating}
                </span>
              </div>
              {hotel.reviews && hotel.reviews.totalReviews > 0 && (
                <span className="text-white/80 text-xs">
                  {hotel.reviews.totalReviews} reviews
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Images Gallery - Luxury Styling */}
        {hotel.hotelImages && hotel.hotelImages.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#2A6F97] rounded-full mr-2"></span>
                Photo Gallery
              </h3>
              {hotel.hotelImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-[#2A6F97] hover:text-[#1D4F6E] text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{showAllImages ? "Show Less" : `+${hotel.hotelImages.length - 3} more`}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllImages ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
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
                  className="relative aspect-square rounded-xl overflow-hidden group/image shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover/image:scale-110 transition-transform duration-500"
                  />
                  {index === 2 && !showAllImages && hotel.hotelImages && hotel.hotelImages.length > 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                      +{hotel.hotelImages.length - 3}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact & Location - Luxury Styling */}
        <div className="mb-5 p-4 bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] rounded-xl border border-[#2A6F97]/10">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center text-gray-700">
              <span className="text-[#2A6F97] mr-2 text-base">📍</span>
              <span className="font-medium line-clamp-1">{hotel.address.split(",")[0]}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#2A6F97] mr-2 text-base">📞</span>
              <span className="font-medium">{hotel.contactNumber}</span>
            </div>
            <div className="flex items-center text-gray-600 col-span-2 bg-white/50 p-2 rounded-lg">
              <span className="text-[#2A6F97] mr-2">🕒</span>
              <span>Check-in: {hotel.checkInTime} | Check-out: {hotel.checkOutTime}</span>
            </div>
          </div>
        </div>

        {/* Quick Info - Luxury Styling */}
        <div className="grid grid-cols-4 gap-2 mb-5 p-3 bg-white border border-[#2A6F97]/10 rounded-xl shadow-sm">
          <div className="text-center">
            <div className="text-[#2A6F97] font-bold text-sm">{hotel.totalRooms}</div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Rooms</div>
          </div>
          <div className="text-center border-l border-[#2A6F97]/10">
            <div className="text-[#3F8AB2] font-bold text-sm">
              {displayRooms.reduce((max, room) => Math.max(max, room.capacity), 0)}
            </div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Capacity</div>
          </div>
          <div className="text-center border-l border-[#2A6F97]/10">
            <div className="text-[#54A5CC] font-bold text-sm">
              {hotel.petFriendly ? "✓" : "✗"}
            </div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Pets</div>
          </div>
          <div className="text-center border-l border-[#2A6F97]/10">
            <div className="text-green-600 font-bold text-sm">
              {hotel.wifiAvailable ? "✓" : "✗"}
            </div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">WiFi</div>
          </div>
        </div>

        {/* Rooms - Luxury Styling */}
        {displayRooms.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#2A6F97] rounded-full mr-2"></span>
                Luxury Accommodations
              </h3>
              {hotel.rooms && hotel.rooms.length > 2 && (
                <button
                  onClick={() => setShowAllRooms(!showAllRooms)}
                  className="text-[#2A6F97] hover:text-[#1D4F6E] text-xs font-medium flex items-center gap-1"
                >
                  {showAllRooms ? "Show Less" : `+${hotel.rooms.length - 2} more`}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-xl hover:border-[#2A6F97]/30 hover:shadow-md transition-all duration-300 group/room"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 group-hover/room:text-[#2A6F97] transition-colors">
                      {room.roomType}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="text-[#2A6F97]">👥</span> {room.capacity} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-[#2A6F97]">🛏️</span> {room.bedType}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#2A6F97] font-bold">
                      ${room.localPricePerNight}
                      <span className="text-gray-400 text-xs ml-1 font-normal">/night</span>
                    </div>
                    <button className="mt-1 bg-[#2A6F97]/10 hover:bg-[#2A6F97] text-[#2A6F97] hover:text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dining Options - Luxury Styling */}
        {displayMeals.length > 0 && (
          <div className="mb-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#54A5CC] rounded-full mr-2"></span>
              Fine Dining
            </h3>
            <div className="space-y-2">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gradient-to-r from-[#F0F7FF] to-white rounded-xl border border-[#54A5CC]/20"
                >
                  <div>
                    <span className="font-medium text-gray-800">{meal.mealType}</span>
                    <span className="text-gray-500 text-xs ml-2">• {meal.cuisineType}</span>
                  </div>
                  <span className="text-[#54A5CC] font-semibold bg-[#54A5CC]/10 px-2 py-1 rounded-lg">
                    ${meal.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities - Luxury Styling */}
        <div className="mb-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center">
            <span className="w-1.5 h-1.5 bg-[#3F8AB2] rounded-full mr-2"></span>
            Premium Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
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
            {hotel.rooms?.some((room) => room.hasAirConditioning) && (
              <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-200">
                Climate Control
              </span>
            )}
            <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200">
              24/7 Concierge
            </span>
          </div>
        </div>

        {/* Reviews - Luxury Styling */}
        {hotel.reviews && hotel.reviews.totalReviews > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Guest Reviews
              </h3>
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
                <span className="font-bold mr-1">{hotel.reviews.averageRating}</span>
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-500">({hotel.reviews.totalReviews})</span>
              </div>
            </div>
            {displayReviews.length > 0 && (
              <div className="space-y-2">
                {displayReviews.map((review, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-xs">
                        {"★".repeat(review.rating)}
                      </div>
                      <span className="text-gray-400 text-xs ml-2">• Recent</span>
                    </div>
                    <p className="text-gray-600 text-sm italic line-clamp-2">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {hotel.reviews.recentReviews && hotel.reviews.recentReviews.length > 1 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-2 text-[#2A6F97] hover:text-[#1D4F6E] text-xs font-medium flex items-center gap-1"
              >
                {showAllReviews ? "Show Less" : `Read ${hotel.reviews.recentReviews.length - 1} more reviews`}
              </button>
            )}
          </div>
        )}

        {/* Cancellation Policy - Luxury Styling */}
        <div className="mb-5 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
          <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
            Cancellation Policy
          </h4>
          <p className="text-gray-700 text-xs leading-relaxed">
            {hotel.cancellationPolicy}
          </p>
        </div>

        {/* Action Buttons - Luxury Styling */}
        <div className="flex space-x-3 pt-4 border-t border-[#2A6F97]/10">
          <button
            onClick={handleBookNow}
            className="flex-1 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] hover:from-[#1D4F6E] hover:to-[#3F8AB2] text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
          >
            Book Luxury Stay
          </button>
          <button className="p-3 border-2 border-[#2A6F97]/20 rounded-xl hover:border-[#2A6F97] hover:bg-[#2A6F97]/5 transition-all duration-300 group/heart">
            <svg className="w-5 h-5 text-[#2A6F97] group-hover/heart:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
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

export default CompactDetailedHotelCard;