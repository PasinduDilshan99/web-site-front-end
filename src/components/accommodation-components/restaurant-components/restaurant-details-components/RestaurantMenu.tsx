// components/restaurant/RestaurantMenu.tsx
import React from 'react';
import { Clock, Users, ChefHat, Star, Thermometer, Waves } from 'lucide-react';
import { MealDetails } from '@/types/accommodations-types/service-provider-types';

interface RestaurantMenuProps {
  meals: MealDetails[];
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ meals }) => {
  if (!meals.length) {
    return null;
  }

  // Group meals by meal type
  const mealsByType = meals.reduce((acc, meal) => {
    const type = meal.mealTypeName;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(meal);
    return acc;
  }, {} as Record<string, MealDetails[]>);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#3A9B9B]">Coastal Menu</h2>
        <div className="flex items-center gap-2 text-[#5FB3B3]">
          <ChefHat className="w-5 h-5" />
          <span className="font-semibold">Fresh from the Ocean</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {Object.entries(mealsByType).map(([mealType, typeMeals]) => (
          <div key={mealType} className="border-b border-[#3A9B9B]/10 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] px-4 py-2 rounded-lg">
              {mealType}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {typeMeals.map((meal) => (
                <div 
                  key={meal.mealId}
                  className="border border-[#3A9B9B]/10 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-[#84CACA]/30 bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#3A9B9B] text-lg">{meal.description}</h4>
                      <p className="text-sm text-[#5FB3B3] mt-1">{meal.cuisineType}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-[#3A9B9B]">
                        ${meal.localPrice}
                      </div>
                      {meal.discountPercentage > 0 && (
                        <div className="text-sm text-[#84CACA] line-through">
                          ${(meal.localPrice / (1 - meal.discountPercentage / 100)).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3 text-sm text-[#5FB3B3]">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Serves {meal.servesPeople}</span>
                    </div>
                    {meal.isSpicy && (
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-red-500">Spicy</span>
                      </div>
                    )}
                    {meal.isChefSpecial && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#84CACA]" />
                        <span className="text-[#84CACA]">Chefs Special</span>
                      </div>
                    )}
                  </div>
                  
                  {meal.dietaryTags && meal.dietaryTags !== '[]' && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {JSON.parse(meal.dietaryTags).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#E8F6F6] text-[#3A9B9B] rounded-full text-xs border border-[#3A9B9B]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {meal.images.length > 0 && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img
                        src={meal.images[0].imageUrl}
                        alt={meal.images[0].imageName}
                        className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <button className="mt-3 w-full bg-gradient-to-r from-[#3A9B9B] to-[#84CACA] hover:from-[#2D7D7D] hover:to-[#5FB3B3] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-[#3A9B9B] hover:text-[#84CACA] font-semibold text-lg border-2 border-[#3A9B9B] hover:border-[#84CACA] px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
          View Full Coastal Menu
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;