// components/restaurants-components/RestaurantSectionCard.tsx
import React from "react";
import { RestaurantSectionRestaurant } from "@/types/accommodations-types/restaurant-types";
import Image from "next/image";

interface RestaurantSectionCardProps {
  restaurant: RestaurantSectionRestaurant;
}

const RestaurantSectionCard: React.FC<RestaurantSectionCardProps> = ({
  restaurant,
}) => {
  const displayImages = restaurant.restaurantImages?.slice(0, 2) || [];
  const displayDining = restaurant.diningOptions?.slice(0, 4) || [];
  const displayFacilities = restaurant.restaurantFacilities?.slice(0, 2) || [];

  // Get cuisine types from dining options
  const cuisineTypes = Array.from(
    new Set(restaurant.diningOptions?.map((option) => option.cuisineType) || [])
  ).slice(0, 3);

  return (
    <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-[#3A9B9B]/10 hover:border-[#84CACA]/30 transform hover:-translate-y-2">
      {/* Restaurant Header with Coastal Image */}
      <div className="relative h-44 sm:h-48 md:h-44 lg:h-48 xl:h-52 overflow-hidden">
        {displayImages.length > 0 ? (
          <>
            <Image
              src={displayImages[0].imageUrl}
              alt={displayImages[0].caption}
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            {/* Gradient Overlay - Coastal Inspired */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A9B9B]/80 via-transparent to-transparent" />
            
            {/* Wave Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="card-wave" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 10 Q10 5 20 10 T40 10" stroke="white" fill="none" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#card-wave)"/>
              </svg>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#E8F6F6] to-[#D9F0F0] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-50">🍽️</div>
              <span className="text-[#3A9B9B] text-sm font-medium">
                Coastal Dining
              </span>
            </div>
          </div>
        )}

        {/* Restaurant Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide border border-white/20">
            {restaurant.resortType}
          </span>
        </div>

        {/* Star Rating */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-[#3A9B9B]/10">
          <div className="flex items-center space-x-1">
            <span className="text-[#5FB3B3] text-sm">★</span>
            <span className="text-[#3A9B9B] font-bold text-sm">
              {restaurant.starRating}
            </span>
          </div>
        </div>

        {/* Restaurant Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl lg:text-2xl drop-shadow-lg line-clamp-1 mb-1">
            {restaurant.restaurantName}
          </h3>
          <p className="text-white/90 text-xs font-medium drop-shadow line-clamp-1 flex items-center">
            <span className="w-1.5 h-1.5 bg-[#84CACA] rounded-full mr-2"></span>
            {restaurant.restaurantDescription}
          </p>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="p-5 sm:p-6">
        {/* Cuisine Types - Coastal Style */}
        {cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cuisineTypes.map((cuisine, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-[#E8F6F6] to-[#D9F0F0] text-[#3A9B9B] px-3 py-1.5 rounded-full text-xs font-medium border border-[#3A9B9B]/20"
              >
                {cuisine}
              </span>
            ))}
          </div>
        )}

        {/* Location & Contact - Coastal Style */}
        <div className="mb-5 p-3 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
          <div className="flex items-center text-[#3A9B9B] text-sm mb-2">
            <span className="mr-2 text-[#5FB3B3] text-base">📍</span>
            <span className="line-clamp-1 font-medium">{restaurant.address}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#5FB3B3]">
            <span className="flex items-center">
              <span className="mr-1">📞</span> {restaurant.contactNumber}
            </span>
            <span className="flex items-center">
              <span className="mr-1">📧</span> {restaurant.email.split("@")[0]}...
            </span>
          </div>
        </div>

        {/* Popular Dishes - Coastal Style */}
        {displayDining.length > 0 && (
          <div className="mb-5">
            <h4 className="font-semibold text-[#3A9B9B] text-sm mb-3 flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-full mr-2"></span>
              Signature Dishes
            </h4>
            <div className="space-y-2">
              {displayDining.map((dish, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-2.5 bg-white border border-[#3A9B9B]/10 rounded-xl hover:border-[#84CACA]/30 hover:shadow-md transition-all duration-300 group/dish"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#3A9B9B] group-hover/dish:text-[#5FB3B3] transition-colors line-clamp-1">
                      {dish.mealDescription}
                    </div>
                    <div className="text-gray-500 text-xs flex items-center space-x-2 mt-1">
                      <span className="bg-[#E8F6F6] px-2 py-0.5 rounded-full">
                        {dish.mealType}
                      </span>
                      <span>•</span>
                      <span>{dish.cuisineType}</span>
                    </div>
                  </div>
                  <span className="text-[#3A9B9B] font-bold text-sm whitespace-nowrap ml-3 bg-[#E8F6F6] px-3 py-1.5 rounded-full">
                    ${dish.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Facilities - Coastal Style */}
        {displayFacilities.length > 0 && (
          <div className="mb-5">
            <h4 className="font-semibold text-[#3A9B9B] text-sm mb-3 flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#5FB3B3] to-[#84CACA] rounded-full mr-2"></span>
              Premium Features
            </h4>
            <div className="flex flex-wrap gap-2">
              {displayFacilities.map((facility, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] text-[#3A9B9B] px-3 py-1.5 rounded-full text-xs font-medium border border-[#3A9B9B]/20"
                >
                  {facility.facilityName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Amenities - Coastal Style */}
        <div className="flex flex-wrap gap-2 mb-5">
          {restaurant.wifiAvailable && (
            <span className="bg-[#3A9B9B]/10 text-[#3A9B9B] px-3 py-1.5 rounded-full text-xs font-medium border border-[#3A9B9B]/20 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#3A9B9B] rounded-full mr-1.5"></span>
              Coastal WiFi
            </span>
          )}
          {restaurant.parkingFacility && (
            <span className="bg-[#5FB3B3]/10 text-[#5FB3B3] px-3 py-1.5 rounded-full text-xs font-medium border border-[#5FB3B3]/20 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#5FB3B3] rounded-full mr-1.5"></span>
              Valet Parking
            </span>
          )}
          {restaurant.petFriendly && (
            <span className="bg-[#84CACA]/10 text-[#84CACA] px-3 py-1.5 rounded-full text-xs font-medium border border-[#84CACA]/20 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#84CACA] rounded-full mr-1.5"></span>
              Pet Friendly
            </span>
          )}
          <span className="bg-gradient-to-r from-[#3A9B9B]/5 to-[#84CACA]/5 text-[#5FB3B3] px-3 py-1.5 rounded-full text-xs font-medium border border-[#84CACA]/20 flex items-center">
            <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-full mr-1.5"></span>
            Ocean View
          </span>
        </div>

        {/* Reviews - Coastal Style */}
        {restaurant.guestReviews &&
          restaurant.guestReviews.totalReviews > 0 && (
            <div className="mb-5 p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#3A9B9B]/10">
                    <span className="text-[#3A9B9B] font-bold text-sm mr-1">
                      {restaurant.guestReviews.averageRating}
                    </span>
                    <span className="text-[#5FB3B3] text-xs">★</span>
                  </div>
                  <span className="text-[#5FB3B3] text-sm font-medium">
                    {restaurant.guestReviews.totalReviews} reviews
                  </span>
                </div>
              </div>
              {restaurant.guestReviews.recentReviews &&
                restaurant.guestReviews.recentReviews.length > 0 && (
                  <p className="text-gray-600 text-xs italic line-clamp-2 leading-relaxed">
                    {restaurant.guestReviews.recentReviews[0].comment}
                  </p>
                )}
            </div>
          )}

        {/* Action Buttons - Coastal Style */}
        <div className="flex space-x-3 pt-4 border-t border-[#3A9B9B]/10">
          <button className="flex-1 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] hover:from-[#2D7D7D] hover:to-[#5FB3B3] text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Reserve Table
          </button>
          <button className="px-5 py-3.5 border-2 border-[#3A9B9B]/20 text-[#3A9B9B] hover:bg-[#3A9B9B] hover:text-white rounded-xl font-semibold text-sm transition-all duration-300">
            View Menu
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-3 flex items-center justify-end">
          <span className="text-[10px] text-gray-400 flex items-center">
            <span className="w-1 h-1 bg-[#3A9B9B] rounded-full mr-1"></span>
            Coastal Dining Experience
            <span className="w-1 h-1 bg-[#84CACA] rounded-full ml-1"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSectionCard;