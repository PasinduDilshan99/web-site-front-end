// components/restaurant/RestaurantMenu.tsx
import React from 'react';
import { Clock, Users, ChefHat, Star, Thermometer } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Our Menu</h2>
        <div className="flex items-center gap-2 text-rose-600">
          <ChefHat className="w-5 h-5" />
          <span className="font-semibold">Fresh & Delicious</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {Object.entries(mealsByType).map(([mealType, typeMeals]) => (
          <div key={mealType} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold text-rose-700 mb-4 bg-rose-50 px-4 py-2 rounded-lg">
              {mealType}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {typeMeals.map((meal) => (
                <div 
                  key={meal.mealId}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg">{meal.description}</h4>
                      <p className="text-sm text-gray-600 mt-1">{meal.cuisineType}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-orange-600">
                        ${meal.localPrice}
                      </div>
                      {meal.discountPercentage > 0 && (
                        <div className="text-sm text-rose-600 line-through">
                          ${(meal.localPrice / (1 - meal.discountPercentage / 100)).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
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
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-500">Chefs Special</span>
                      </div>
                    )}
                  </div>
                  
                  {meal.dietaryTags && meal.dietaryTags !== '[]' && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {JSON.parse(meal.dietaryTags).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-rose-50 text-rose-700 rounded-full text-xs border border-rose-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {meal.images.length > 0 && (
                    <div className="mt-3">
                      <img
                        src={meal.images[0].imageUrl}
                        alt={meal.images[0].imageName}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <button className="mt-3 w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-rose-600 hover:text-rose-700 font-semibold text-lg border-2 border-rose-600 hover:border-rose-700 px-6 py-3 rounded-full transition-colors duration-200">
          View Full Menu
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;