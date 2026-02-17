// app/resorts/components/DetailedResortCard.tsx
import React, { useState } from "react";
import { ResortSectionResort } from "@/types/accommodations-types/resort-types";
import Image from "next/image";

interface DetailedResortCardProps {
  resort: ResortSectionResort;
}

const DetailedResortCard: React.FC<DetailedResortCardProps> = ({ resort }) => {
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
    amenity.name.toLowerCase().includes('spa') || amenity.description?.toLowerCase().includes('spa')
  ) || resort.resortFacilities?.some(facility => 
    facility.facilityName.toLowerCase().includes('spa') || facility.description?.toLowerCase().includes('spa')
  );

  const hasPool = resort.amenities?.some(amenity => 
    amenity.name.toLowerCase().includes('pool') || amenity.description?.toLowerCase().includes('pool')
  ) || resort.resortFacilities?.some(facility => 
    facility.facilityName.toLowerCase().includes('pool') || facility.description?.toLowerCase().includes('pool')
  );

  const hasBeachAccess = resort.resortDescription?.toLowerCase().includes('beach') || 
    resort.address?.toLowerCase().includes('beach');

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#0A2F44]/10 hover:shadow-2xl transition-all duration-500 group hover:border-[#1F5F72]/30 transform hover:-translate-y-1">
      {/* Resort Header - Deep Ocean Luxury Theme */}
      <div className="bg-gradient-to-r from-[#0A2F44] via-[#144A5E] to-[#1F5F72] p-5 text-white relative overflow-hidden">
        {/* Wave Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="card-header-wave" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q10 5 20 10 T40 10" stroke="white" fill="none" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#card-header-wave)"/>
          </svg>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                  {resort.resortType}
                </span>
                {priceRange && (
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                    From ${priceRange.min}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2 line-clamp-1 group-hover:translate-x-1 transition-transform">
                {resort.resortName}
              </h2>
              <p className="text-white/80 text-sm mb-3 line-clamp-2">{resort.resortDescription}</p>
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <span className="text-yellow-300 text-sm">★</span>
                  <span className="ml-1 text-sm font-bold">{resort.starRating} Star Luxury</span>
                </div>
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
              <h3 className="font-semibold text-[#0A2F44] text-base flex items-center">
                <span className="w-1.5 h-1.5 bg-[#0A2F44] rounded-full mr-2"></span>
                Resort Gallery
              </h3>
              {resort.resortImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-[#0A2F44] hover:text-[#144A5E] text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{showAllImages ? 'Show Less' : `+${resort.resortImages.length - 3} more`}</span>
                </button>
              )}
            </div>
            <div className={`grid gap-2 ${showAllImages ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {displayImages?.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group/image border border-[#0A2F44]/10 shadow-md hover:shadow-xl transition-all">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover/image:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2F44]/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-white text-xs opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 line-clamp-1">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Luxury Features Quick View */}
        <div className="grid grid-cols-4 gap-2 mb-5 p-3 bg-gradient-to-r from-[#E6F0F5] to-[#D9E9F0] rounded-xl border border-[#0A2F44]/10">
          <div className="text-center">
            <div className="text-[#0A2F44] font-bold text-base">{resort.totalRooms}</div>
            <div className="text-[#144A5E] text-xs">Suites</div>
          </div>
          <div className="text-center border-l border-[#0A2F44]/10">
            <div className="text-[#144A5E] font-bold text-base">
              {hasSpa ? '✓' : '✗'}
            </div>
            <div className="text-[#144A5E] text-xs">Spa</div>
          </div>
          <div className="text-center border-l border-[#0A2F44]/10">
            <div className="text-[#1F5F72] font-bold text-base">
              {hasPool ? '✓' : '✗'}
            </div>
            <div className="text-[#144A5E] text-xs">Pool</div>
          </div>
          <div className="text-center border-l border-[#0A2F44]/10">
            <div className="text-green-600 font-bold text-base">
              {hasBeachAccess ? '✓' : '✗'}
            </div>
            <div className="text-[#144A5E] text-xs">Beach</div>
          </div>
        </div>

        {/* Location & Contact - Luxury Style */}
        <div className="mb-5 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center text-gray-700">
              <span className="text-[#0A2F44] mr-2 text-base">📍</span>
              <span className="font-medium line-clamp-1">{resort.address}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#0A2F44] mr-2 text-base">📞</span>
              <span className="font-medium">{resort.contactNumber}</span>
            </div>
            <div className="flex items-center text-gray-600 col-span-2 bg-white/50 p-2 rounded-lg">
              <span className="text-[#0A2F44] mr-2">🕒</span>
              <span>Check-in: {resort.checkInTime} | Check-out: {resort.checkOutTime}</span>
            </div>
          </div>
        </div>

        {/* Luxury Accommodations */}
        {displayAccommodations && displayAccommodations.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[#0A2F44] text-base flex items-center">
                <span className="w-1.5 h-1.5 bg-[#144A5E] rounded-full mr-2"></span>
                Oceanfront Suites
              </h3>
              {resort.accommodations && resort.accommodations.length > 2 && (
                <button
                  onClick={() => setShowAllAccommodations(!showAllAccommodations)}
                  className="text-[#0A2F44] hover:text-[#144A5E] text-xs font-medium flex items-center gap-1"
                >
                  {showAllAccommodations ? 'Show Less' : `+${resort.accommodations.length - 2}`}
                </button>
              )}
            </div>
            <div className="space-y-3">
              {displayAccommodations.map((room, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start text-sm p-3 bg-white border border-[#0A2F44]/10 rounded-xl hover:border-[#1F5F72]/30 hover:shadow-md transition-all duration-300 group/room"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-[#0A2F44] group-hover/room:text-[#1F5F72] transition-colors">
                      {room.roomType}
                    </div>
                    <div className="text-[#144A5E] text-xs mt-1 line-clamp-1">{room.roomDescription}</div>
                    <div className="text-gray-500 flex items-center flex-wrap gap-2 mt-2 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="text-[#0A2F44]">👥</span> {room.capacity} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-[#0A2F44]">🛏️</span> {room.bedType}
                      </span>
                      {room.hasBalcony && (
                        <span className="flex items-center gap-1 text-green-600">
                          🌅 Ocean View
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#1F5F72] font-bold text-base">${room.localPricePerNight}</div>
                    <div className="text-gray-400 text-xs">per night</div>
                    <button className="mt-2 bg-gradient-to-r from-[#0A2F44] to-[#144A5E] hover:from-[#052230] hover:to-[#0A2F44] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105">
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
            <h3 className="font-semibold text-[#0A2F44] text-base mb-3 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#1F5F72] rounded-full mr-2"></span>
              Culinary Excellence
            </h3>
            <div className="space-y-2">
              {displayDining.map((dining, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-3 bg-gradient-to-r from-[#E6F0F5] to-white rounded-xl border border-[#0A2F44]/10 hover:border-[#1F5F72]/30 transition-all"
                >
                  <div>
                    <div className="font-medium text-[#0A2F44]">{dining.mealType}</div>
                    <span className="inline-block bg-[#0A2F44]/10 text-[#0A2F44] px-2 py-0.5 rounded-full text-xs font-medium mt-1">
                      {dining.cuisineType}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#1F5F72] font-semibold">${dining.localPrice}</div>
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
            <h3 className="font-semibold text-[#0A2F44] text-base mb-3 flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-full mr-2"></span>
              Resort Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {displayFacilities.map((facility, index) => (
                <span
                  key={`facility-${index}`}
                  className="bg-[#0A2F44]/10 text-[#0A2F44] px-3 py-1.5 rounded-full text-xs font-medium border border-[#0A2F44]/20"
                >
                  {facility.facilityName}
                </span>
              ))}
              {displayAmenities.map((amenity, index) => (
                <span
                  key={`amenity-${index}`}
                  className="bg-[#144A5E]/10 text-[#144A5E] px-3 py-1.5 rounded-full text-xs font-medium border border-[#144A5E]/20"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Guest Reviews - Luxury Focus */}
        {resort.guestReviews && resort.guestReviews.totalReviews > 0 && (
          <div className="mb-5 p-4 bg-gradient-to-r from-[#E6F0F5] to-[#D9E9F0] rounded-xl border border-[#0A2F44]/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#0A2F44]/10">
                  <span className="text-[#0A2F44] font-bold text-sm mr-1">
                    {resort.guestReviews.averageRating}
                  </span>
                  <span className="text-yellow-400 text-xs">★</span>
                </div>
                <span className="text-[#144A5E] text-sm font-medium">
                  {resort.guestReviews.totalReviews} guest reviews
                </span>
              </div>
            </div>
            {displayReviews.length > 0 && (
              <div className="relative">
                <p className="text-[#0A2F44] text-sm italic leading-relaxed line-clamp-2">
                  {displayReviews[0].comment}
                </p>
                {displayReviews[0].guestName && (
                  <span className="text-[#144A5E] text-xs ml-1 not-italic font-medium">
                    — {displayReviews[0].guestName}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Cancellation Policy - Luxury Assurance */}
        <div className="mb-5 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <h4 className="font-semibold text-[#0A2F44] text-sm mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
            Flexible Cancellation
          </h4>
          <p className="text-[#144A5E] text-sm line-clamp-2">{resort.cancellationPolicy}</p>
        </div>

        {/* Action Buttons - Luxury Theme */}
        <div className="flex space-x-3 pt-4 border-t border-[#0A2F44]/10">
          <button className="flex-1 bg-gradient-to-r from-[#0A2F44] via-[#144A5E] to-[#1F5F72] hover:from-[#052230] hover:to-[#0A2F44] text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Book Ultra-Luxury Stay
          </button>
          <button className="px-4 py-3 border-2 border-[#0A2F44]/20 text-[#0A2F44] hover:bg-[#0A2F44] hover:text-white rounded-xl font-medium text-sm transition-all duration-300">
            Explore
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-3 flex items-center justify-end">
          <span className="text-[10px] text-gray-400 flex items-center">
            <span className="w-1 h-1 bg-[#0A2F44] rounded-full mr-1"></span>
            Deep Sea Blues Ultra-Luxury Collection
            <span className="w-1 h-1 bg-[#1F5F72] rounded-full ml-1"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailedResortCard;