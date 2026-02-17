// app/restaurants/components/DetailedRestaurantCard.tsx
import React, { useState } from "react";
import { RestaurantSectionRestaurant } from "@/types/accommodations-types/restaurant-types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DetailedRestaurantCardProps {
  restaurant: RestaurantSectionRestaurant;
}

const DetailedRestaurantCard: React.FC<DetailedRestaurantCardProps> = ({ restaurant }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllDishes, setShowAllDishes] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const router = useRouter();

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

  const handleReserve = () => {
    router.push(`/accommodations/restaurants/${restaurant.restaurantId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#3A9B9B]/10 hover:shadow-2xl transition-all duration-500 group hover:border-[#84CACA]/30 transform hover:-translate-y-1">
      {/* Restaurant Header - Coastal Theme */}
      <div className="bg-gradient-to-r from-[#3A9B9B] via-[#5FB3B3] to-[#84CACA] p-5 text-white relative overflow-hidden">
        {/* Coastal Pattern */}
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
        
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                  {restaurant.resortType}
                </span>
                {priceRange && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                    ${priceRange.min} - ${priceRange.max}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-1 line-clamp-1 group-hover:translate-x-1 transition-transform">
                {restaurant.restaurantName}
              </h2>
              <p className="text-white/80 text-sm mb-2 line-clamp-2">{restaurant.restaurantDescription}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <span className="text-yellow-300 text-sm">★</span>
                  <span className="ml-1 text-xs font-bold">{restaurant.starRating}</span>
                </div>
                {restaurant.guestReviews?.totalReviews > 0 && (
                  <span className="text-white/80 text-xs">
                    {restaurant.guestReviews.totalReviews} reviews
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Images Gallery - Coastal Focused */}
        {restaurant.restaurantImages && restaurant.restaurantImages.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#3A9B9B] rounded-full mr-2"></span>
                Coastal Gallery
              </h3>
              {restaurant.restaurantImages.length > 3 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-[#3A9B9B] hover:text-[#2D7D7D] text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{showAllImages ? 'Show Less' : `+${restaurant.restaurantImages.length - 3} more`}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllImages ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
              )}
            </div>
            <div className={`grid gap-2 ${showAllImages ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {displayImages?.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group/image shadow-md hover:shadow-xl transition-all duration-300 border border-[#3A9B9B]/10">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover/image:scale-110 transition-transform duration-500"
                  />
                  {index === 2 && !showAllImages && restaurant.restaurantImages && restaurant.restaurantImages.length > 3 && (
                    <div className="absolute inset-0 bg-[#3A9B9B]/70 flex items-center justify-center text-white font-bold text-lg">
                      +{restaurant.restaurantImages.length - 3}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cuisine Types */}
        {cuisineTypes.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#5FB3B3] rounded-full mr-2"></span>
              Cuisine Types
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cuisineTypes.map((cuisine, index) => (
                <span
                  key={index}
                  className="bg-[#E8F6F6] text-[#3A9B9B] px-3 py-1.5 rounded-full text-xs font-medium border border-[#3A9B9B]/20"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Location & Contact - Coastal Style */}
        <div className="mb-5 p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center text-gray-700">
              <span className="text-[#3A9B9B] mr-2 text-base">📍</span>
              <span className="font-medium line-clamp-1">{restaurant.address.split(',')[0]}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#3A9B9B] mr-2 text-base">📞</span>
              <span className="font-medium">{restaurant.contactNumber}</span>
            </div>
            <div className="flex items-center text-gray-600 col-span-2 bg-white/50 p-2 rounded-lg">
              <span className="text-[#3A9B9B] mr-2">📧</span>
              <span className="font-medium">{restaurant.email}</span>
            </div>
          </div>
        </div>

        {/* Menu Highlights */}
        {displayDishes && displayDishes.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#84CACA] rounded-full mr-2"></span>
                Signature Dishes
              </h3>
              {restaurant.diningOptions && restaurant.diningOptions.length > 4 && (
                <button
                  onClick={() => setShowAllDishes(!showAllDishes)}
                  className="text-[#3A9B9B] hover:text-[#2D7D7D] text-xs font-medium flex items-center gap-1"
                >
                  {showAllDishes ? 'Show Less' : `+${restaurant.diningOptions.length - 4} more`}
                </button>
              )}
            </div>
            <div className="space-y-2">
              {displayDishes.map((dish, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-xl hover:border-[#3A9B9B]/30 hover:shadow-md transition-all duration-300 group/dish"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 group-hover/dish:text-[#3A9B9B] transition-colors">
                      {dish.mealDescription}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className="bg-[#E8F6F6] px-2 py-0.5 rounded-full text-[#3A9B9B]">
                        {dish.mealType}
                      </span>
                      <span>•</span>
                      <span>{dish.cuisineType}</span>
                      <span className={`text-xs ${dish.available ? 'text-green-600' : 'text-red-600'}`}>
                        {dish.available ? '● Available' : '○ Unavailable'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#3A9B9B] font-bold">
                      ${dish.localPrice}
                    </div>
                    <button className="mt-1 bg-[#3A9B9B]/10 hover:bg-[#3A9B9B] text-[#3A9B9B] hover:text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300">
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
              <span className="w-1.5 h-1.5 bg-[#5FB3B3] rounded-full mr-2"></span>
              Premium Features
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {displayFacilities.map((facility, index) => (
                <span
                  key={index}
                  className="bg-[#E8F6F6] text-[#3A9B9B] px-3 py-1.5 rounded-full text-xs font-medium border border-[#3A9B9B]/20"
                >
                  {facility.facilityName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="mb-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center">
            <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] rounded-full mr-2"></span>
            Dining Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Customer Reviews - Coastal Focused */}
        {restaurant.guestReviews && restaurant.guestReviews.totalReviews > 0 && (
          <div className="mb-5 p-4 bg-gradient-to-r from-[#E8F6F6] to-[#F0FAFA] rounded-xl border border-[#3A9B9B]/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
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
            {displayReviews.length > 0 && (
              <p className="text-gray-600 text-xs italic line-clamp-2 leading-relaxed">
                {displayReviews[0].comment}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons - Coastal Theme */}
        <div className="flex space-x-3 pt-4 border-t border-[#3A9B9B]/10">
          <button
            onClick={handleReserve}
            className="flex-1 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] hover:from-[#2D7D7D] hover:to-[#5FB3B3] text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Reserve Table
          </button>
          <button className="px-5 py-3 border-2 border-[#3A9B9B]/20 text-[#3A9B9B] hover:bg-[#3A9B9B] hover:text-white rounded-xl font-semibold text-sm transition-all duration-300">
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

export default DetailedRestaurantCard;