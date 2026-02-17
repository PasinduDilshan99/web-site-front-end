// app/hostels/components/DetailedHostelCard.tsx
import React, { useState } from "react";
import { HostelSectionHostel } from "@/types/accommodations-types/hostel-types";
import Image from "next/image";

interface DetailedHostelCardProps {
  hostel: HostelSectionHostel;
}

const DetailedHostelCard: React.FC<DetailedHostelCardProps> = ({ hostel }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllRooms, setShowAllRooms] = useState(false);

  const displayImages = showAllImages ? hostel.hostelImages : (hostel.hostelImages?.slice(0, 3) || []);
  const displayRooms = showAllRooms ? hostel.rooms : (hostel.rooms?.slice(0, 3) || []);
  const displayMeals = hostel.meals?.slice(0, 2) || [];
  const displayReviews = hostel.reviews?.recentReviews?.slice(0, 1) || [];

  // Calculate price range
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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#B5E5D4] hover:border-[#C9EFE3] overflow-hidden group">
      {/* Hostel Header - Fresh & Social Theme */}
      <div className="bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] p-4 text-[#2D4F43] relative overflow-hidden">
        {/* Adventure Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 text-2xl">⛰️</div>
          <div className="absolute bottom-2 left-2 text-2xl">🌲</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">🌊</div>
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/80 px-2 py-0.5 rounded-full text-xs font-medium border border-[#B5E5D4]">
                  {hostel.hostelType}
                </span>
                {priceRange && (
                  <span className="bg-white/80 px-2 py-0.5 rounded-full text-xs font-medium border border-[#B5E5D4]">
                    From ${priceRange.min}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-1 line-clamp-1 group-hover:translate-x-1 transition-transform">
                {hostel.hostelName}
              </h2>
              <p className="text-[#2D4F43]/80 text-sm mb-2 line-clamp-2">{hostel.hostelDescription}</p>
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex items-center bg-white/80 px-2 py-1 rounded-full border border-[#B5E5D4]">
                  <span className="text-[#3A9B9B] text-sm">⭐</span>
                  <span className="ml-1 text-xs font-bold text-[#2D4F43]">{hostel.starRating}</span>
                </div>
                {hostel.reviews && hostel.reviews.totalReviews > 0 && (
                  <span className="text-[#2D4F43]/70 text-xs">
                    {hostel.reviews.totalReviews} reviews
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Images Gallery - Fresh Style */}
        {hostel.hostelImages && hostel.hostelImages.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-[#2D4F43] text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#B5E5D4] rounded-full mr-2"></span>
                Fresh Spaces
              </h3>
              {hostel.hostelImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-[#3A9B9B] hover:text-[#2D4F43] text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  {showAllImages ? 'Show Less' : `+${hostel.hostelImages.length - 3} more`}
                </button>
              )}
            </div>
            <div className={`grid gap-2 ${showAllImages ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {displayImages?.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group/image border border-[#B5E5D4] shadow-sm">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover/image:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#B5E5D4]/30 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                  {index === 2 && !showAllImages && hostel.hostelImages && hostel.hostelImages.length > 3 && (
                    <div className="absolute inset-0 bg-[#B5E5D4]/70 backdrop-blur-sm flex items-center justify-center text-[#2D4F43] font-bold text-lg">
                      +{hostel.hostelImages.length - 3}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats - Fresh Focused */}
        <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
          <div className="text-center">
            <div className="text-[#2D4F43] font-bold text-sm">{hostel.totalRooms}</div>
            <div className="text-[#5A8F7A] text-[10px] uppercase tracking-wider">Total</div>
          </div>
          <div className="text-center border-l border-[#B5E5D4]">
            <div className="text-[#2D4F43] font-bold text-sm">{dormitoryCount}</div>
            <div className="text-[#5A8F7A] text-[10px] uppercase tracking-wider">Dorms</div>
          </div>
          <div className="text-center border-l border-[#B5E5D4]">
            <div className="text-[#2D4F43] font-bold text-sm">{privateRoomCount}</div>
            <div className="text-[#5A8F7A] text-[10px] uppercase tracking-wider">Private</div>
          </div>
          <div className="text-center border-l border-[#B5E5D4]">
            <div className="text-[#2D4F43] font-bold text-sm">
              {hostel.petFriendly ? '✓' : '✗'}
            </div>
            <div className="text-[#5A8F7A] text-[10px] uppercase tracking-wider">Pets</div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="mb-4 p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4]">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center text-[#2D4F43]">
              <span className="text-[#3A9B9B] mr-2">📍</span>
              <span className="line-clamp-1">{hostel.address.split(',')[0]}</span>
            </div>
            <div className="flex items-center text-[#2D4F43]">
              <span className="text-[#3A9B9B] mr-2">📞</span>
              <span>{hostel.contactNumber}</span>
            </div>
            <div className="flex items-center text-[#5A8F7A] col-span-2 bg-white p-2 rounded-lg">
              <span className="text-[#3A9B9B] mr-2">🕒</span>
              <span>Check-in: {hostel.checkInTime} | Check-out: {hostel.checkOutTime}</span>
            </div>
          </div>
        </div>

        {/* Room Types - Fresh Categorized */}
        {displayRooms && displayRooms.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-[#2D4F43] text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#B5E5D4] rounded-full mr-2"></span>
                Room Options
              </h3>
              {hostel.rooms && hostel.rooms.length > 3 && (
                <button
                  onClick={() => setShowAllRooms(!showAllRooms)}
                  className="text-[#3A9B9B] hover:text-[#2D4F43] text-xs font-medium flex items-center gap-1"
                >
                  {showAllRooms ? 'Show Less' : `+${hostel.rooms.length - 3} more`}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {displayRooms?.map((room, index) => {
                const isDorm = room.capacity > 4 || room.roomType.toLowerCase().includes('dorm');
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-xl border transition-all duration-300 ${
                      isDorm 
                        ? 'bg-[#F5FDFA] border-[#B5E5D4] hover:border-[#3A9B9B]' 
                        : 'bg-white border-[#DDF9F2] hover:border-[#5FB3B3]'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-[#2D4F43] flex items-center">
                        {isDorm ? '🏕️' : '🏠'} {room.roomType}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#5A8F7A]">
                        <span className="flex items-center gap-1">
                          <span>👥</span> {room.capacity} people
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🛏️</span> {room.bedType}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#2D4F43] font-bold">${room.localPricePerNight}</div>
                      <button className="mt-1 bg-[#B5E5D4] hover:bg-[#3A9B9B] text-[#2D4F43] hover:text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300">
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
            <h3 className="font-semibold text-[#2D4F43] text-sm mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#C9EFE3] rounded-full mr-2"></span>
              Budget Meals
            </h3>
            <div className="space-y-1">
              {displayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-[#FAFFFD] rounded-lg border border-[#DDF9F2]"
                >
                  <div>
                    <span className="font-medium text-[#2D4F43]">{meal.mealType}</span>
                    <span className="text-[#5A8F7A] text-xs ml-2">• {meal.mealDescription}</span>
                  </div>
                  <span className="text-[#2D4F43] font-medium bg-white px-2 py-1 rounded-full border border-[#B5E5D4]">
                    ${meal.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Features */}
        <div className="mb-4">
          <h3 className="font-semibold text-[#2D4F43] text-sm mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-[#DDF9F2] rounded-full mr-2"></span>
            Hostel Vibes
          </h3>
          <div className="flex flex-wrap gap-1">
            {hostel.wifiAvailable && (
              <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs border border-[#B5E5D4]">
                📶 Free WiFi
              </span>
            )}
            {hostel.parkingFacility && (
              <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs border border-[#C9EFE3]">
                🅿️ Free Parking
              </span>
            )}
            {hostel.petFriendly && (
              <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs border border-[#DDF9F2]">
                🐾 Pet Friendly
              </span>
            )}
            <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs border border-[#B5E5D4]">
              👥 Common Room
            </span>
            <span className="bg-[#F5FDFA] text-[#2D4F43] px-2 py-1 rounded-full text-xs border border-[#C9EFE3]">
              🍳 Shared Kitchen
            </span>
          </div>
        </div>

        {/* Reviews - Traveler Focused */}
        {hostel.reviews && hostel.reviews.totalReviews > 0 && (
          <div className="mb-4 p-3 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] rounded-xl border border-[#B5E5D4]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm border border-[#B5E5D4]">
                  <span className="text-[#2D4F43] font-bold text-xs mr-1">
                    {hostel.reviews.averageRating}
                  </span>
                  <span className="text-[#B5E5D4] text-xs">⭐</span>
                </div>
                <span className="text-[#2D4F43] text-xs font-medium">
                  {hostel.reviews.totalReviews} traveler reviews
                </span>
              </div>
            </div>
            {displayReviews.length > 0 && (
              <div className="text-xs">
                <p className="text-[#2D4F43] italic line-clamp-2">
                  {displayReviews[0].comment}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Cancellation Policy - Traveler Friendly */}
        <div className="mb-4 p-3 bg-[#FAFFFD] rounded-xl border border-[#DDF9F2]">
          <h4 className="font-semibold text-[#2D4F43] text-sm mb-1 flex items-center">
            <span className="w-1.5 h-1.5 bg-[#C9EFE3] rounded-full mr-2"></span>
            Flexible Cancellation
          </h4>
          <p className="text-[#5A8F7A] text-xs leading-relaxed line-clamp-2">{hostel.cancellationPolicy}</p>
        </div>

        {/* Action Buttons - Fresh Theme */}
        <div className="flex space-x-2 pt-3 border-t border-[#B5E5D4]">
          <button className="flex-1 bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] hover:from-[#3A9B9B] hover:to-[#5FB3B3] text-[#2D4F43] hover:text-white py-2.5 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Book This Hostel
          </button>
          <button className="px-4 py-2 border-2 border-[#B5E5D4] text-[#2D4F43] hover:bg-[#F5FDFA] rounded-xl font-medium text-xs transition-colors">
            <span className="flex items-center gap-1">
              📋 Details
            </span>
          </button>
        </div>

        {/* Social Vibe */}
        <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-[#5A8F7A]">
          <span>✨</span>
          <span>Perfect for meeting fellow travelers</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedHostelCard;