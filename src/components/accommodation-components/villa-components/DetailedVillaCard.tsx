// app/villas/components/DetailedVillaCard.tsx
import React, { useState } from "react";
import { VillaSectionVilla } from "@/types/accommodations-types/villa-types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DetailedVillaCardProps {
  villa: VillaSectionVilla;
}

const DetailedVillaCard: React.FC<DetailedVillaCardProps> = ({ villa }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const router = useRouter();

  const displayImages = showAllImages ? villa.villaImages : (villa.villaImages?.slice(0, 3) || []);
  const displayRooms = showAllRooms ? villa.rooms : (villa.rooms?.slice(0, 2) || []);
  const displayReviews = showAllReviews ? villa.reviews.recentReviews : (villa.reviews.recentReviews?.slice(0, 1) || []);

  // Calculate price range and max capacity
  const priceRange = villa.rooms && villa.rooms.length > 0 
    ? {
        min: Math.min(...villa.rooms.map(room => room.localPricePerNight)),
        max: Math.max(...villa.rooms.map(room => room.localPricePerNight))
      }
    : null;

  const maxCapacity = villa.rooms?.reduce((max, room) => Math.max(max, room.capacity), 0) || 0;

  const handleBookNow = () => {
    router.push(`/accommodations/villas/${villa.villaId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#1B4D3E]/10 hover:shadow-2xl transition-all duration-500 group hover:border-[#428577]/30 transform hover:-translate-y-1">
      {/* Villa Header - Nature Luxury Theme */}
      <div className="bg-gradient-to-r from-[#1B4D3E] via-[#2E6B5C] to-[#428577] p-5 text-white relative overflow-hidden">
        {/* Decorative Nature Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
        
        {/* Leaf Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="header-leaf" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5 Q25 5 28 10 Q30 15 25 20 Q20 25 15 20 Q10 15 15 10 Q18 5 20 5" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#header-leaf)"/>
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                  {villa.villaType}
                </span>
                {priceRange && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                    From ${priceRange.min}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-1 line-clamp-1 group-hover:translate-x-1 transition-transform">
                {villa.villaName}
              </h2>
              <p className="text-white/80 text-sm mb-2 line-clamp-2">
                {villa.villaDescription}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <span className="text-yellow-300 text-sm">★</span>
                  <span className="ml-1 text-xs font-bold">{villa.starRating}</span>
                </div>
                {villa.reviews && villa.reviews.totalReviews > 0 && (
                  <span className="text-white/80 text-xs">
                    {villa.reviews.totalReviews} reviews
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Images Gallery */}
        {villa.villaImages && villa.villaImages.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#1B4D3E] rounded-full mr-2"></span>
                Villa Views
              </h3>
              {villa.villaImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-[#1B4D3E] hover:text-[#0F3A2E] text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{showAllImages ? 'Show Less' : `+${villa.villaImages.length - 3} more`}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllImages ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
              )}
            </div>
            <div className={`grid gap-2 ${showAllImages ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {displayImages?.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group/image shadow-md hover:shadow-xl transition-all duration-300 border border-[#1B4D3E]/10">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover/image:scale-110 transition-transform duration-500"
                  />
                  {index === 2 && !showAllImages && villa.villaImages && villa.villaImages.length > 3 && (
                    <div className="absolute inset-0 bg-[#1B4D3E]/70 flex items-center justify-center text-white font-bold text-lg">
                      +{villa.villaImages.length - 3}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact & Location */}
        <div className="mb-5 p-4 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] rounded-xl border border-[#1B4D3E]/10">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center text-gray-700">
              <span className="text-[#1B4D3E] mr-2 text-base">📍</span>
              <span className="font-medium line-clamp-1">{villa.address.split(',')[0]}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#1B4D3E] mr-2 text-base">📞</span>
              <span className="font-medium">{villa.contactNumber}</span>
            </div>
            <div className="flex items-center text-gray-600 col-span-2 bg-white/50 p-2 rounded-lg">
              <span className="text-[#1B4D3E] mr-2">🕒</span>
              <span>Check-in: {villa.checkInTime} | Check-out: {villa.checkOutTime}</span>
            </div>
          </div>
        </div>

        {/* Villa Features */}
        <div className="grid grid-cols-4 gap-2 mb-5 p-3 bg-white border border-[#1B4D3E]/10 rounded-xl shadow-sm">
          <div className="text-center">
            <div className="text-[#1B4D3E] font-bold text-sm">{villa.totalRooms}</div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Suites</div>
          </div>
          <div className="text-center border-l border-[#1B4D3E]/10">
            <div className="text-[#2E6B5C] font-bold text-sm">{maxCapacity}</div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Guests</div>
          </div>
          <div className="text-center border-l border-[#1B4D3E]/10">
            <div className="text-[#428577] font-bold text-sm">
              {villa.petFriendly ? '✓' : '✗'}
            </div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Pets</div>
          </div>
          <div className="text-center border-l border-[#1B4D3E]/10">
            <div className="text-green-600 font-bold text-sm">
              {villa.wifiAvailable ? '✓' : '✗'}
            </div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">WiFi</div>
          </div>
        </div>

        {/* Villa Suites */}
        {displayRooms && displayRooms.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#1B4D3E] rounded-full mr-2"></span>
                Private Suites
              </h3>
              {villa.rooms && villa.rooms.length > 2 && (
                <button
                  onClick={() => setShowAllRooms(!showAllRooms)}
                  className="text-[#1B4D3E] hover:text-[#0F3A2E] text-xs font-medium flex items-center gap-1"
                >
                  {showAllRooms ? 'Show Less' : `+${villa.rooms.length - 2} more`}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-xl hover:border-[#1B4D3E]/30 hover:shadow-md transition-all duration-300 group/room"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 group-hover/room:text-[#1B4D3E] transition-colors">
                      {room.roomType}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="text-[#1B4D3E]">👥</span> {room.capacity} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-[#1B4D3E]">🛏️</span> {room.bedType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {room.hasAirConditioning && (
                        <span className="text-blue-500 text-xs" title="Air Conditioning">❄️</span>
                      )}
                      {room.hasTv && (
                        <span className="text-purple-500 text-xs" title="TV">📺</span>
                      )}
                      {room.internetAccess && (
                        <span className="text-[#1B4D3E] text-xs" title="Internet">🌐</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#1B4D3E] font-bold">
                      ${room.localPricePerNight}
                      <span className="text-gray-400 text-xs ml-1 font-normal">/night</span>
                    </div>
                    <button className="mt-1 bg-[#1B4D3E]/10 hover:bg-[#1B4D3E] text-[#1B4D3E] hover:text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Amenities */}
        <div className="mb-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center">
            <span className="w-1.5 h-1.5 bg-[#428577] rounded-full mr-2"></span>
            Premium Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {villa.wifiAvailable && (
              <span className="bg-[#1B4D3E]/10 text-[#1B4D3E] px-3 py-1.5 rounded-full text-xs font-medium border border-[#1B4D3E]/20">
                High-Speed WiFi
              </span>
            )}
            {villa.parkingFacility && (
              <span className="bg-[#2E6B5C]/10 text-[#2E6B5C] px-3 py-1.5 rounded-full text-xs font-medium border border-[#2E6B5C]/20">
                Private Parking
              </span>
            )}
            {villa.petFriendly && (
              <span className="bg-[#428577]/10 text-[#428577] px-3 py-1.5 rounded-full text-xs font-medium border border-[#428577]/20">
                Pet Friendly
              </span>
            )}
            {villa.rooms?.some(room => room.hasAirConditioning) && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200">
                Climate Control
              </span>
            )}
            <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-200">
              Private Pool
            </span>
          </div>
        </div>

        {/* Reviews */}
        {villa.reviews && villa.reviews.totalReviews > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Guest Experiences
              </h3>
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
                <span className="font-bold mr-1">{villa.reviews.averageRating}</span>
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-500">({villa.reviews.totalReviews})</span>
              </div>
            </div>
            {displayReviews && displayReviews.length > 0 && (
              <div className="space-y-2">
                {displayReviews.map((review, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-xs">
                        {'★'.repeat(review.rating)}
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
            {villa.reviews.recentReviews && villa.reviews.recentReviews.length > 1 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-2 text-[#1B4D3E] hover:text-[#0F3A2E] text-xs font-medium flex items-center gap-1"
              >
                {showAllReviews ? 'Show Less' : `Read ${villa.reviews.recentReviews.length - 1} more reviews`}
              </button>
            )}
          </div>
        )}

        {/* Cancellation Policy */}
        <div className="mb-5 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
            Cancellation Policy
          </h4>
          <p className="text-gray-700 text-xs leading-relaxed line-clamp-2">
            {villa.cancellationPolicy}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-[#1B4D3E]/10">
          <button
            onClick={handleBookNow}
            className="flex-1 bg-gradient-to-r from-[#1B4D3E] to-[#428577] hover:from-[#0F3A2E] hover:to-[#2E6B5C] text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
          >
            Reserve Villa
          </button>
          <button className="px-4 py-3 border-2 border-[#1B4D3E]/20 rounded-xl hover:border-[#1B4D3E] hover:bg-[#1B4D3E]/5 transition-all duration-300">
            <svg className="w-5 h-5 text-[#1B4D3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-3 flex items-center justify-end">
          <span className="text-[10px] text-gray-400 flex items-center">
            <span className="w-1 h-1 bg-[#1B4D3E] rounded-full mr-1"></span>
            Private Luxury Retreat
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailedVillaCard;