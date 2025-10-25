// app/villas/components/CompactVillaCard.tsx
import React, { useState } from "react";
import { VillaSectionVilla } from "@/types/accommodations-types/villa-types";
import Image from "next/image";

interface CompactVillaCardProps {
  villa: VillaSectionVilla;
}

const DetailedVillaCard: React.FC<CompactVillaCardProps> = ({ villa }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-teal-200 hover:shadow-xl transition-all duration-300 group">
      {/* Villa Header - Luxury Theme */}
      <div className="bg-gradient-to-r from-teal-600 to-amber-500 p-4 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 line-clamp-1">{villa.villaName}</h2>
              <p className="text-teal-100 text-sm mb-2 line-clamp-2">{villa.villaDescription}</p>
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex items-center bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <span className="text-yellow-300 text-sm">⭐</span>
                  <span className="ml-1 text-xs font-bold">{villa.starRating}</span>
                </div>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                  {villa.villaType}
                </span>
                {priceRange && (
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                    ${priceRange.min}+
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Images Gallery - Luxury Focus */}
        {villa.villaImages && villa.villaImages.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                Villa Views
              </h3>
              {villa.villaImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-teal-600 hover:text-teal-700 text-xs font-medium flex items-center"
                >
                  {showAllImages ? 'Show Less' : `+${villa.villaImages.length - 3}`}
                </button>
              )}
            </div>
            <div className={`grid gap-2 ${showAllImages ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {displayImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group/image border-2 border-teal-100">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover/image:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact & Location - Luxury Style */}
        <div className="mb-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
          <div className="space-y-1 text-xs">
            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-teal-600">📍</span>
              <span className="line-clamp-1">{villa.address.split(',')[0]}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-teal-600">📞</span>
              <span>{villa.contactNumber}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <span className="mr-1 text-teal-600">🕒</span>
                {villa.checkInTime}
              </span>
              <span className="flex items-center">
                <span className="mr-1 text-amber-600">🕛</span>
                {villa.checkOutTime}
              </span>
            </div>
          </div>
        </div>

        {/* Luxury Features */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2 bg-gradient-to-r from-teal-50 to-amber-50 rounded-lg border border-teal-100">
          <div className="text-center">
            <div className="text-teal-600 font-bold text-sm">{villa.totalRooms}</div>
            <div className="text-gray-600 text-xs">Villas</div>
          </div>
          <div className="text-center border-x border-teal-200">
            <div className="text-amber-600 font-bold text-sm">
              {maxCapacity}
            </div>
            <div className="text-gray-600 text-xs">Max Guests</div>
          </div>
          <div className="text-center">
            <div className="text-purple-600 font-bold text-sm">
              {villa.petFriendly ? 'Yes' : 'No'}
            </div>
            <div className="text-gray-600 text-xs">Pets</div>
          </div>
        </div>

        {/* Villa Suites */}
        {displayRooms.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Villa Suites
              </h3>
              {villa.rooms && villa.rooms.length > 2 && (
                <button
                  onClick={() => setShowAllRooms(!showAllRooms)}
                  className="text-teal-600 hover:text-teal-700 text-xs font-medium flex items-center"
                >
                  {showAllRooms ? 'Show Less' : `+${villa.rooms.length - 2}`}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {displayRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-2 bg-white border border-amber-200 rounded-lg hover:border-amber-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{room.roomType}</div>
                    <div className="text-gray-500 flex items-center space-x-2 mt-1">
                      <span>👥 {room.capacity} guests</span>
                      <span>🛏️ {room.bedType}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {room.hasAirConditioning && (
                        <span className="text-blue-500 text-xs">❄️</span>
                      )}
                      {room.hasTv && (
                        <span className="text-purple-500 text-xs">📺</span>
                      )}
                      {room.internetAccess && (
                        <span className="text-teal-500 text-xs">🌐</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold">${room.localPricePerNight}</div>
                    <div className="text-gray-500 text-xs">per night</div>
                    <button className="mt-1 bg-teal-600 hover:bg-teal-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Amenities */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Premium Features
          </h3>
          <div className="flex flex-wrap gap-1">
            {villa.wifiAvailable && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs border border-blue-200">
                High-Speed WiFi
              </span>
            )}
            {villa.parkingFacility && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs border border-green-200">
                Private Parking
              </span>
            )}
            {villa.petFriendly && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs border border-purple-200">
                Pet Friendly
              </span>
            )}
            {villa.rooms?.some(room => room.hasAirConditioning) && (
              <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs border border-teal-200">
                Air Conditioning
              </span>
            )}
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs border border-amber-200">
              Private Villa
            </span>
          </div>
        </div>

        {/* Reviews */}
        {villa.reviews && villa.reviews.totalReviews > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Guest Experiences
              </h3>
              <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs border border-green-200">
                <span className="font-bold mr-1">{villa.reviews.averageRating}</span>
                <span className="text-yellow-400">⭐</span>
                <span className="ml-1 text-gray-600">({villa.reviews.totalReviews})</span>
              </div>
            </div>
            {displayReviews.length > 0 && (
              <div className="space-y-2">
                {displayReviews.map((review, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400 text-xs">
                        {'⭐'.repeat(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600 italic line-clamp-2">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            )}
            {villa.reviews.recentReviews && villa.reviews.recentReviews.length > 1 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-2 text-teal-600 hover:text-teal-700 text-xs font-medium flex items-center"
              >
                {showAllReviews ? 'Show Less' : `+${villa.reviews.recentReviews.length - 1} more`}
              </button>
            )}
          </div>
        )}

        {/* Cancellation Policy */}
        <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-gray-800 text-sm mb-1 flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Cancellation Policy
          </h4>
          <p className="text-gray-700 text-xs line-clamp-2">{villa.cancellationPolicy}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <button className="flex-1 bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-700 hover:to-amber-600 text-white py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
            Book Villa
          </button>
          <button className="px-3 py-2 border border-teal-300 text-teal-600 hover:bg-teal-50 rounded-lg font-medium text-xs transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedVillaCard;