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
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-amber-300 transform hover:-translate-y-1">
      {/* Restaurant Header with Image */}
      <div className="relative h-40 sm:h-44 md:h-40 lg:h-44 xl:h-48 overflow-hidden">
        {displayImages.length > 0 ? (
          <>
            <Image
              src={displayImages[0].imageUrl}
              alt={displayImages[0].caption}
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <span className="text-emerald-600 text-sm font-medium">
                Fine Dining
              </span>
            </div>
          </div>
        )}

        {/* Restaurant Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide">
            {restaurant.resortType}
          </span>
        </div>

        {/* Star Rating */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <div className="flex items-center space-x-1">
            <span className="text-amber-500 text-sm">⭐</span>
            <span className="text-gray-800 font-bold text-sm">
              {restaurant.starRating}
            </span>
          </div>
        </div>

        {/* Restaurant Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg lg:text-xl drop-shadow-lg line-clamp-1">
            {restaurant.restaurantName}
          </h3>
          <p className="text-amber-200 text-xs font-medium drop-shadow line-clamp-1">
            {restaurant.restaurantDescription}
          </p>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="p-4 sm:p-5">
        {/* Cuisine Types */}
        {cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {cuisineTypes.map((cuisine, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium border border-emerald-200"
              >
                {cuisine}
              </span>
            ))}
          </div>
        )}

        {/* Location & Contact */}
        <div className="mb-4">
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <span className="mr-2">📍</span>
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>📞 {restaurant.contactNumber}</span>
            <span>📧 {restaurant.email.split("@")[0]}...</span>
          </div>
        </div>

        {/* Popular Dishes */}
        {displayDining.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Popular Dishes
            </h4>
            <div className="space-y-2">
              {displayDining.map((dish, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm p-2 hover:bg-amber-50 rounded-lg transition-colors group/dish"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 line-clamp-1">
                      {dish.mealDescription}
                    </div>
                    <div className="text-gray-500 text-xs flex items-center space-x-2 mt-1">
                      <span>{dish.mealType}</span>
                      <span>•</span>
                      <span>{dish.cuisineType}</span>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold text-sm whitespace-nowrap ml-2">
                    ${dish.localPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Facilities */}
        {displayFacilities.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Features
            </h4>
            <div className="flex flex-wrap gap-2">
              {displayFacilities.map((facility, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium border border-amber-200"
                >
                  {facility.facilityName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.wifiAvailable && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
              WiFi
            </span>
          )}
          {restaurant.parkingFacility && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1"></span>
              Parking
            </span>
          )}
          {restaurant.petFriendly && (
            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span>
              Pet Friendly
            </span>
          )}
        </div>

        {/* Reviews */}
        {restaurant.guestReviews &&
          restaurant.guestReviews.totalReviews > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border">
                    <span className="text-emerald-600 font-bold text-sm mr-1">
                      {restaurant.guestReviews.averageRating}
                    </span>
                    <span className="text-amber-400 text-xs">⭐</span>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">
                    ({restaurant.guestReviews.totalReviews} reviews)
                  </span>
                </div>
              </div>
              {restaurant.guestReviews.recentReviews &&
                restaurant.guestReviews.recentReviews.length > 0 && (
                  <p className="text-gray-600 text-xs italic line-clamp-2">
                    {restaurant.guestReviews.recentReviews[0].comment}
                  </p>
                )}
            </div>
          )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-3 border-t border-gray-100">
          <button className="flex-1 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
            Reserve Table
          </button>
          <button className="px-4 py-3 border border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-xl font-semibold text-sm transition-colors">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSectionCard;
