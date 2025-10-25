// app/hotels/components/DetailedHotelCard.tsx
import React, { useState } from "react";
import { HotelSectionHotel } from "@/types/accommodations-types/hotel-types";
import Image from "next/image";

interface DetailedHotelCardProps {
  hotel: HotelSectionHotel;
}

const DetailedHotelCard: React.FC<DetailedHotelCardProps> = ({ hotel }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayImages = showAllImages ? hotel.hotelImages : (hotel.hotelImages?.slice(0, 4) || []);
  const displayRooms = showAllRooms ? hotel.rooms : (hotel.rooms?.slice(0, 3) || []);
  const displayReviews = showAllReviews ? hotel.reviews.recentReviews : (hotel.reviews.recentReviews?.slice(0, 2) || []);
  const displayMeals = hotel.meals?.slice(0, 4) || [];

  // Calculate price range
  const priceRange = hotel.rooms && hotel.rooms.length > 0 
    ? {
        min: Math.min(...hotel.rooms.map(room => room.localPricePerNight)),
        max: Math.max(...hotel.rooms.map(room => room.localPricePerNight))
      }
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
      {/* Hotel Header */}
      <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">{hotel.hotelName}</h2>
            <p className="text-purple-100 text-lg mb-2">{hotel.hotelDescription}</p>
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <span className="text-yellow-300 text-lg">⭐</span>
                <span className="ml-1 font-bold">{hotel.starRating} Star</span>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {hotel.hotelType}
              </span>
              {priceRange && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                  ${priceRange.min} - ${priceRange.max}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:text-right">
            <button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Images Gallery */}
        {hotel.hotelImages && hotel.hotelImages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              Gallery
            </h3>
            <div className={`grid gap-4 ${showAllImages ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'}`}>
              {displayImages.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden group">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm text-center px-2">{image.caption}</span>
                  </div>
                </div>
              ))}
            </div>
            {hotel.hotelImages.length > 4 && (
              <button
                onClick={() => setShowAllImages(!showAllImages)}
                className="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center"
              >
                {showAllImages ? 'Show Less' : `Show All ${hotel.hotelImages.length} Images`}
                <svg className={`w-4 h-4 ml-1 transition-transform ${showAllImages ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact & Location */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Contact & Location
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">📍</span>
                  <span>{hotel.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">📞</span>
                  <span>{hotel.contactNumber}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">📧</span>
                  <span className="truncate">{hotel.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">🌐</span>
                  <a href={hotel.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline truncate">
                    {hotel.websiteUrl}
                  </a>
                </div>
              </div>
            </div>

            {/* Check-in/out */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Check-in & Check-out
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-600 font-bold">Check-in</div>
                  <div className="text-gray-600">{hotel.checkInTime}</div>
                </div>
                <div className="text-center">
                  <div className="text-red-600 font-bold">Check-out</div>
                  <div className="text-gray-600">{hotel.checkOutTime}</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                {hotel.wifiAvailable && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    ✓ WiFi
                  </span>
                )}
                {hotel.parkingFacility && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    ✓ Parking
                  </span>
                )}
                {hotel.petFriendly && (
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    ✓ Pet Friendly
                  </span>
                )}
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                  {hotel.totalRooms} Rooms
                </span>
              </div>
            </div>
          </div>

          {/* Middle Column - Rooms & Meals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rooms */}
            {displayRooms.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  Room Options
                </h3>
                <div className="space-y-4">
                  {displayRooms.map((room, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg">{room.roomType}</h4>
                          <p className="text-gray-600 text-sm mt-1">{room.roomDescription}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                            <span>👥 {room.capacity} guests</span>
                            <span>🛏️ {room.bedType}</span>
                            {room.hasAirConditioning && <span>❄️ A/C</span>}
                            {room.hasTv && <span>📺 TV</span>}
                            {room.internetAccess && <span>🌐 Internet</span>}
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:text-right">
                          <div className="text-2xl font-bold text-green-600">${room.localPricePerNight}</div>
                          <div className="text-gray-500 text-sm">per night</div>
                          <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                            Select Room
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {hotel.rooms && hotel.rooms.length > 3 && (
                  <button
                    onClick={() => setShowAllRooms(!showAllRooms)}
                    className="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center"
                  >
                    {showAllRooms ? 'Show Less Rooms' : `Show All ${hotel.rooms.length} Rooms`}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${showAllRooms ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Dining Options */}
            {displayMeals.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                  Dining & Meals
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayMeals.map((meal, index) => (
                    <div key={index} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">{meal.mealType}</h4>
                          <p className="text-gray-600 text-sm mt-1">{meal.mealDescription}</p>
                          <span className="inline-block bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium mt-2">
                            {meal.cuisineType}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-amber-600">${meal.localPrice}</div>
                          <div className={`text-xs ${meal.available ? 'text-green-600' : 'text-red-600'}`}>
                            {meal.available ? 'Available' : 'Not Available'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {hotel.reviews && hotel.reviews.totalReviews > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Guest Reviews
              <span className="ml-4 flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                <span className="font-bold mr-1">{hotel.reviews.averageRating}</span>
                <span className="text-yellow-400">⭐</span>
                <span className="ml-2 text-gray-600">({hotel.reviews.totalReviews} reviews)</span>
              </span>
            </h3>
            <div className="space-y-4">
              {displayReviews.map((review, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {'⭐'.repeat(review.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{review.rating}/5</span>
                  </div>
                  <p className="text-gray-700 italic">{review.comment}</p>
                </div>
              ))}
            </div>
            {hotel.reviews.recentReviews && hotel.reviews.recentReviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center"
              >
                {showAllReviews ? 'Show Less Reviews' : `Show All ${hotel.reviews.recentReviews.length} Reviews`}
                <svg className={`w-4 h-4 ml-1 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Cancellation Policy */}
        <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-200">
          <h4 className="font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Cancellation Policy
          </h4>
          <p className="text-gray-700 text-sm">{hotel.cancellationPolicy}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailedHotelCard;