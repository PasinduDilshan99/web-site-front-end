// app/hostels/components/AdventureHostelCard.tsx
import React, { useState } from "react";
import { HostelSectionHostel } from "@/types/accommodations-types/hostel-types";
import Image from "next/image";

interface AdventureHostelCardProps {
  hostel: HostelSectionHostel;
}

const DetailedHostelCard: React.FC<AdventureHostelCardProps> = ({ hostel }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllRooms, setShowAllRooms] = useState(false);

  const displayImages = showAllImages ? hostel.hostelImages : (hostel.hostelImages?.slice(0, 3) || []);
  const displayRooms = showAllRooms ? hostel.rooms : (hostel.rooms?.slice(0, 3) || []);
  const displayMeals = hostel.meals?.slice(0, 2) || [];
  const displayReviews = hostel.reviews?.recentReviews?.slice(0, 1) || [];

  // Calculate price range and categorize rooms
  const priceRange = hostel.rooms && hostel.rooms.length > 0 
    ? {
        min: Math.min(...hostel.rooms.map(room => room.localPricePerNight)),
        max: Math.max(...hostel.rooms.map(room => room.localPricePerNight))
      }
    : null;

  // Count room types
  const dormitoryCount = hostel.rooms?.filter(room => 
    room.roomType.toLowerCase().includes('dorm') || room.capacity > 4
  ).length || 0;

  const privateRoomCount = hostel.rooms?.filter(room => 
    room.capacity <= 4 && !room.roomType.toLowerCase().includes('dorm')
  ).length || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200 hover:shadow-xl transition-all duration-300 group">
      {/* Hostel Header with Adventure Theme */}
      <div className="bg-gradient-to-r from-green-600 to-blue-500 p-4 text-white relative overflow-hidden">
        {/* Adventure Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 text-2xl">⛰️</div>
          <div className="absolute bottom-2 left-2 text-2xl">🌲</div>
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 line-clamp-1">{hostel.hostelName}</h2>
              <p className="text-green-100 text-sm mb-2 line-clamp-2">{hostel.hostelDescription}</p>
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex items-center bg-white/20 px-2 py-1 rounded-full">
                  <span className="text-yellow-300 text-sm">⭐</span>
                  <span className="ml-1 text-xs font-bold">{hostel.starRating}</span>
                </div>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {hostel.hostelType}
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
      </div>

      <div className="p-4">
        {/* Images Gallery - Adventure Style */}
        {hostel.hostelImages && hostel.hostelImages.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Adventure Photos
              </h3>
              {hostel.hostelImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-green-600 hover:text-green-700 text-xs font-medium flex items-center"
                >
                  {showAllImages ? 'Show Less' : `+${hostel.hostelImages.length - 3}`}
                </button>
              )}
            </div>
            <div className={`grid gap-2 ${showAllImages ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {displayImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group/image border-2 border-green-200">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover/image:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-xs opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 text-center px-1">
                      {image.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats - Adventure Focused */}
        <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="text-green-600 font-bold text-sm">{hostel.totalRooms}</div>
            <div className="text-gray-600 text-xs">Total</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-bold text-sm">{dormitoryCount}</div>
            <div className="text-gray-600 text-xs">Dorms</div>
          </div>
          <div className="text-center">
            <div className="text-orange-600 font-bold text-sm">{privateRoomCount}</div>
            <div className="text-gray-600 text-xs">Private</div>
          </div>
          <div className="text-center">
            <div className="text-purple-600 font-bold text-sm">
              {hostel.petFriendly ? 'Yes' : 'No'}
            </div>
            <div className="text-gray-600 text-xs">Pets</div>
          </div>
        </div>

        {/* Location & Contact - Compact */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
          <div className="space-y-1 text-xs">
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📍</span>
              <span className="line-clamp-1">{hostel.address.split(',')[0]}</span>
            </div>
            <div className="flex items-center justify-between text-gray-500">
              <span>🕒 {hostel.checkInTime}</span>
              <span>📞 {hostel.contactNumber}</span>
            </div>
          </div>
        </div>

        {/* Room Types - Adventure Categorized */}
        {displayRooms.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Room Options
              </h3>
              {hostel.rooms && hostel.rooms.length > 3 && (
                <button
                  onClick={() => setShowAllRooms(!showAllRooms)}
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center"
                >
                  {showAllRooms ? 'Show Less' : `+${hostel.rooms.length - 3}`}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {displayRooms.map((room, index) => {
                const isDorm = room.capacity > 4 || room.roomType.toLowerCase().includes('dorm');
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center text-xs p-2 rounded-lg border transition-colors ${
                      isDorm 
                        ? 'bg-blue-50 border-blue-200 hover:border-blue-300' 
                        : 'bg-orange-50 border-orange-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 flex items-center">
                        {isDorm ? '🏕️' : '🏠'} {room.roomType}
                      </div>
                      <div className="text-gray-500 flex items-center space-x-2 mt-1">
                        <span>👥 {room.capacity} people</span>
                        <span>🛏️ {room.bedType}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-bold">${room.localPricePerNight}</div>
                      <button className="mt-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors">
                        Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Meals - Budget Focused */}
        {displayMeals.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Budget Meals
            </h3>
            <div className="space-y-1">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-2 bg-orange-50 rounded border border-orange-200"
                >
                  <div>
                    <span className="font-medium text-gray-800">{meal.mealType}</span>
                    <span className="text-gray-500 text-xs ml-2">• {meal.mealDescription}</span>
                  </div>
                  <span className="text-orange-600 font-semibold">${meal.localPrice}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Features */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Hostel Features
          </h3>
          <div className="flex flex-wrap gap-1">
            {hostel.wifiAvailable && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                🌐 Free WiFi
              </span>
            )}
            {hostel.parkingFacility && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                🅿️ Parking
              </span>
            )}
            {hostel.petFriendly && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                🐾 Pet Friendly
              </span>
            )}
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
              👥 Social Areas
            </span>
          </div>
        </div>

        {/* Reviews - Traveler Focused */}
        {hostel.reviews && hostel.reviews.totalReviews > 0 && (
          <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm border">
                  <span className="text-green-600 font-bold text-xs mr-1">
                    {hostel.reviews.averageRating}
                  </span>
                  <span className="text-yellow-400 text-xs">⭐</span>
                </div>
                <span className="text-gray-700 text-xs font-medium">
                  {hostel.reviews.totalReviews} traveler reviews
                </span>
              </div>
            </div>
            {displayReviews.length > 0 && (
              <div className="text-xs">
                <p className="text-gray-600 italic line-clamp-2">
                  {displayReviews[0].comment}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Cancellation Policy - Budget Traveler Focused */}
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-gray-800 text-sm mb-1 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Flexible Cancellation
          </h4>
          <p className="text-gray-700 text-xs line-clamp-2">{hostel.cancellationPolicy}</p>
        </div>

        {/* Action Buttons - Adventure Theme */}
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
            Book Adventure
          </button>
          <button className="px-3 py-2 border border-green-300 text-green-600 hover:bg-green-50 rounded-lg font-medium text-xs transition-colors">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedHostelCard;