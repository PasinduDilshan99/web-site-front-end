// app/restaurants/components/CulinaryRestaurantCard.tsx
import React, { useState } from "react";
import { RestaurantSectionRestaurant } from "@/types/accommodations-types/restaurant-types";
import Image from "next/image";

interface CulinaryRestaurantCardProps {
  restaurant: RestaurantSectionRestaurant;
}

const DetailedRestaurantCard: React.FC<CulinaryRestaurantCardProps> = ({ restaurant }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllDishes, setShowAllDishes] = useState(false);

  const displayImages = showAllImages ? restaurant.restaurantImages : (restaurant.restaurantImages?.slice(0, 3) || []);
  const displayDishes = showAllDishes ? restaurant.diningOptions : (restaurant.diningOptions?.slice(0, 4) || []);
  const displayFacilities = restaurant.restaurantFacilities?.slice(0, 2) || [];
  const displayReviews = restaurant.guestReviews?.recentReviews?.slice(0, 1) || [];

  // Calculate price range and extract cuisine types
  const priceRange = restaurant.diningOptions && restaurant.diningOptions.length > 0 
    ? {
        min: Math.min(...restaurant.diningOptions.map(dish => dish.localPrice)),
        max: Math.max(...restaurant.diningOptions.map(dish => dish.localPrice))
      }
    : null;

  // Get unique cuisine types
  const cuisineTypes = Array.from(new Set(
    restaurant.diningOptions?.map(dish => dish.cuisineType).filter(Boolean) || []
  ));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200 hover:shadow-xl transition-all duration-300 group">
      {/* Restaurant Header - Culinary Theme */}
      <div className="bg-gradient-to-r from-red-600 to-amber-500 p-4 text-white relative overflow-hidden">
        {/* Culinary Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 text-2xl">🍳</div>
          <div className="absolute bottom-2 left-2 text-2xl">🍷</div>
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 line-clamp-1">{restaurant.restaurantName}</h2>
              <p className="text-red-100 text-sm mb-2 line-clamp-2">{restaurant.restaurantDescription}</p>
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex items-center bg-white/20 px-2 py-1 rounded-full">
                  <span className="text-yellow-300 text-sm">⭐</span>
                  <span className="ml-1 text-xs font-bold">{restaurant.starRating}</span>
                </div>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {restaurant.resortType}
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
        {/* Images Gallery - Food Focused */}
        {restaurant.restaurantImages && restaurant.restaurantImages.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Restaurant Gallery
              </h3>
              {restaurant.restaurantImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-red-600 hover:text-red-700 text-xs font-medium flex items-center"
                >
                  {showAllImages ? 'Show Less' : `+${restaurant.restaurantImages.length - 3}`}
                </button>
              )}
            </div>
            <div className={`grid gap-2 ${showAllImages ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {displayImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group/image border-2 border-amber-200">
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

        {/* Cuisine Types */}
        {cuisineTypes.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Cuisine Types
            </h3>
            <div className="flex flex-wrap gap-1">
              {cuisineTypes.map((cuisine, index) => (
                <span
                  key={index}
                  className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Location & Contact - Foodie Style */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
          <div className="space-y-1 text-xs">
            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-red-600">📍</span>
              <span className="line-clamp-1">{restaurant.address}</span>
            </div>
            <div className="flex items-center justify-between text-gray-500">
              <span>📞 {restaurant.contactNumber}</span>
              <span>📧 {restaurant.email.split('@')[0]}...</span>
            </div>
          </div>
        </div>

        {/* Menu Highlights */}
        {displayDishes.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Menu Highlights
              </h3>
              {restaurant.diningOptions && restaurant.diningOptions.length > 4 && (
                <button
                  onClick={() => setShowAllDishes(!showAllDishes)}
                  className="text-red-600 hover:text-red-700 text-xs font-medium flex items-center"
                >
                  {showAllDishes ? 'Show Less' : `+${restaurant.diningOptions.length - 4}`}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {displayDishes.map((dish, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs p-2 bg-white border border-red-200 rounded-lg hover:border-red-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{dish.mealDescription}</div>
                    <div className="text-gray-500 flex items-center space-x-2 mt-1">
                      <span>{dish.mealType}</span>
                      <span>•</span>
                      <span>{dish.cuisineType}</span>
                      <span className={`text-xs ${dish.available ? 'text-green-600' : 'text-red-600'}`}>
                        {dish.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold">${dish.localPrice}</div>
                    <button className="mt-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors">
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restaurant Facilities */}
        {displayFacilities.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Restaurant Features
            </h3>
            <div className="flex flex-wrap gap-1">
              {displayFacilities.map((facility, index) => (
                <span
                  key={index}
                  className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {facility.facilityName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Amenities
          </h3>
          <div className="flex flex-wrap gap-1">
            {restaurant.wifiAvailable && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                🌐 WiFi
              </span>
            )}
            {restaurant.parkingFacility && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                🅿️ Parking
              </span>
            )}
            {restaurant.petFriendly && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                🐾 Pet Friendly
              </span>
            )}
          </div>
        </div>

        {/* Customer Reviews - Food Focused */}
        {restaurant.guestReviews && restaurant.guestReviews.totalReviews > 0 && (
          <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm border">
                  <span className="text-red-600 font-bold text-xs mr-1">
                    {restaurant.guestReviews.averageRating}
                  </span>
                  <span className="text-yellow-400 text-xs">⭐</span>
                </div>
                <span className="text-gray-700 text-xs font-medium">
                  {restaurant.guestReviews.totalReviews} food reviews
                </span>
              </div>
            </div>
            {displayReviews.length > 0 && (
              <div className="text-xs">
                <p className="text-gray-600 italic line-clamp-2">
                  "{displayReviews[0].comment}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons - Foodie Theme */}
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <button className="flex-1 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105">
            Reserve Table
          </button>
          <button className="px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-medium text-xs transition-colors">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedRestaurantCard;