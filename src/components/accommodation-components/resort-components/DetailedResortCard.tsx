// app/resorts/components/LuxuryResortCard.tsx
import React, { useState } from "react";
import { ResortSectionResort } from "@/types/accommodations-types/resort-types";
import Image from "next/image";

interface LuxuryResortCardProps {
  resort: ResortSectionResort;
}

const DetailedResortCard: React.FC<LuxuryResortCardProps> = ({ resort }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllAccommodations, setShowAllAccommodations] = useState(false);

  const displayImages = showAllImages ? resort.resortImages : (resort.resortImages?.slice(0, 3) || []);
  const displayAccommodations = showAllAccommodations ? resort.accommodations : (resort.accommodations?.slice(0, 2) || []);
  const displayDining = resort.diningOptions?.slice(0, 2) || [];
  const displayFacilities = resort.resortFacilities?.slice(0, 3) || [];
  const displayAmenities = resort.amenities?.slice(0, 3) || [];
  const displayReviews = resort.guestReviews?.recentReviews?.slice(0, 1) || [];

  // Calculate price range
  const priceRange = resort.accommodations && resort.accommodations.length > 0 
    ? {
        min: Math.min(...resort.accommodations.map(room => room.localPricePerNight)),
        max: Math.max(...resort.accommodations.map(room => room.localPricePerNight))
      }
    : null;

  // Check for luxury features
  const hasSpa = resort.amenities?.some(amenity => 
    amenity.name.toLowerCase().includes('spa') || amenity.description.toLowerCase().includes('spa')
  ) || resort.resortFacilities?.some(facility => 
    facility.facilityName.toLowerCase().includes('spa') || facility.description.toLowerCase().includes('spa')
  );

  const hasPool = resort.amenities?.some(amenity => 
    amenity.name.toLowerCase().includes('pool') || amenity.description.toLowerCase().includes('pool')
  ) || resort.resortFacilities?.some(facility => 
    facility.facilityName.toLowerCase().includes('pool') || facility.description.toLowerCase().includes('pool')
  );

  const hasBeachAccess = resort.resortDescription.toLowerCase().includes('beach') || 
    resort.address.toLowerCase().includes('beach');

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-cyan-200 hover:shadow-2xl transition-all duration-300 group">
      {/* Resort Header - Luxury Theme */}
      <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-5 text-white relative overflow-hidden">
        {/* Luxury Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-3 right-3 text-3xl">🏝️</div>
          <div className="absolute bottom-3 left-3 text-3xl">🌟</div>
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 line-clamp-1">{resort.resortName}</h2>
              <p className="text-cyan-100 text-base mb-3 line-clamp-2">{resort.resortDescription}</p>
              <div className="flex items-center flex-wrap gap-3">
                <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-yellow-300 text-base">⭐</span>
                  <span className="ml-1 text-sm font-bold">{resort.starRating} Star Luxury</span>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {resort.resortType}
                </span>
                {priceRange && (
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                    ${priceRange.min}+
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Images Gallery - Luxury Style */}
        {resort.resortImages && resort.resortImages.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-base flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                Resort Gallery
              </h3>
              {resort.resortImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center"
                >
                  {showAllImages ? 'Show Less' : `+${resort.resortImages.length - 3}`}
                </button>
              )}
            </div>
            <div className={`grid gap-3 ${showAllImages ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {displayImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group/image border-2 border-cyan-200">
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

        {/* Luxury Features Quick View */}
        <div className="grid grid-cols-4 gap-3 mb-5 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl border border-cyan-200">
          <div className="text-center">
            <div className="text-cyan-600 font-bold text-base">{resort.totalRooms}</div>
            <div className="text-gray-600 text-xs">Luxury Rooms</div>
          </div>
          <div className="text-center">
            <div className="text-purple-600 font-bold text-base">
              {hasSpa ? '🏊' : '❌'}
            </div>
            <div className="text-gray-600 text-xs">Spa</div>
          </div>
          <div className="text-center">
            <div className="text-amber-600 font-bold text-base">
              {hasPool ? '💆' : '❌'}
            </div>
            <div className="text-gray-600 text-xs">Pool</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 font-bold text-base">
              {hasBeachAccess ? '🏖️' : '❌'}
            </div>
            <div className="text-gray-600 text-xs">Beach</div>
          </div>
        </div>

        {/* Location & Contact - Luxury Style */}
        <div className="mb-5 p-4 bg-gray-50 rounded-xl border">
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-cyan-600">📍</span>
              <span className="line-clamp-1">{resort.address}</span>
            </div>
            <div className="flex items-center justify-between text-gray-500">
              <span>🕒 {resort.checkInTime} | 🕛 {resort.checkOutTime}</span>
              <span>📞 {resort.contactNumber}</span>
            </div>
          </div>
        </div>

        {/* Luxury Accommodations */}
        {displayAccommodations.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-base flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Luxury Suites
              </h3>
              {resort.accommodations && resort.accommodations.length > 2 && (
                <button
                  onClick={() => setShowAllAccommodations(!showAllAccommodations)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                >
                  {showAllAccommodations ? 'Show Less' : `+${resort.accommodations.length - 2}`}
                </button>
              )}
            </div>
            <div className="space-y-3">
              {displayAccommodations.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start text-sm p-3 bg-white border border-purple-200 rounded-xl hover:border-purple-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 flex items-center">
                      <span className="text-amber-500 mr-2">🏨</span>
                      {room.roomType}
                    </div>
                    <p className="text-gray-600 text-xs mt-1 line-clamp-1">{room.roomDescription}</p>
                    <div className="text-gray-500 flex items-center space-x-3 mt-2 text-xs">
                      <span>👥 {room.capacity} guests</span>
                      <span>🛏️ {room.bedType}</span>
                      {room.hasBalcony && <span className="text-green-600">🌅 Balcony</span>}
                      {room.viewType && <span className="text-cyan-600">🏞️ {room.viewType}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold text-base">${room.localPricePerNight}</div>
                    <div className="text-gray-500 text-xs">per night</div>
                    <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors">
                      Reserve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fine Dining */}
        {displayDining.length > 0 && (
          <div className="mb-5">
            <h3 className="font-semibold text-gray-800 text-base mb-3 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Fine Dining
            </h3>
            <div className="space-y-2">
              {displayDining.map((dining, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-3 bg-amber-50 rounded-xl border border-amber-200"
                >
                  <div>
                    <div className="font-medium text-gray-800">{dining.mealType}</div>
                    <div className="text-gray-600 text-xs">{dining.mealDescription}</div>
                    <span className="inline-block bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium mt-1">
                      {dining.cuisineType}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-600 font-semibold">${dining.localPrice}</div>
                    <div className={`text-xs ${dining.available ? 'text-green-600' : 'text-red-600'}`}>
                      {dining.available ? 'Available' : 'Unavailable'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resort Facilities & Amenities */}
        {(displayFacilities.length > 0 || displayAmenities.length > 0) && (
          <div className="mb-5">
            <h3 className="font-semibold text-gray-800 text-base mb-3 flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
              Resort Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {displayFacilities.map((facility, index) => (
                <span
                  key={`facility-${index}`}
                  className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium border border-cyan-200"
                >
                  🏊 {facility.facilityName}
                </span>
              ))}
              {displayAmenities.map((amenity, index) => (
                <span
                  key={`amenity-${index}`}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-200"
                >
                  💎 {amenity.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Guest Reviews - Luxury Focus */}
        {resort.guestReviews && resort.guestReviews.totalReviews > 0 && (
          <div className="mb-5 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl border border-cyan-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border">
                  <span className="text-cyan-600 font-bold text-sm mr-1">
                    {resort.guestReviews.averageRating}
                  </span>
                  <span className="text-yellow-400 text-sm">⭐</span>
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {resort.guestReviews.totalReviews} guest reviews
                </span>
              </div>
            </div>
            {displayReviews.length > 0 && (
              <div className="text-sm">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm">
                    {'⭐'.repeat(displayReviews[0].rating)}
                  </div>
                  {displayReviews[0].guestName && (
                    <span className="text-gray-600 text-xs ml-2">- {displayReviews[0].guestName}</span>
                  )}
                </div>
                <p className="text-gray-600 italic line-clamp-2">
                  {displayReviews[0].comment}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Cancellation Policy - Luxury Assurance */}
        <div className="mb-5 p-4 bg-green-50 rounded-xl border border-green-200">
          <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Flexible Cancellation
          </h4>
          <p className="text-gray-700 text-sm line-clamp-2">{resort.cancellationPolicy}</p>
        </div>

        {/* Action Buttons - Luxury Theme */}
        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <button className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
            Book Luxury Stay
          </button>
          <button className="px-4 py-3 border border-cyan-300 text-cyan-600 hover:bg-cyan-50 rounded-xl font-medium text-sm transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedResortCard;