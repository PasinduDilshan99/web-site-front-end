import { TravelTipItem } from "@/types/package-types";
import React, { useState } from "react";

interface TravelTipsProps {
  travelTips: TravelTipItem[];
}

const TravelTips: React.FC<TravelTipsProps> = ({ travelTips }) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const activeTips = travelTips.filter(tip => tip.status === 'ACTIVE');
  if (activeTips.length === 0) return null;

  const groupedTips = activeTips.reduce((acc, tip) => {
    const category = tip.title || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tip);
    return acc;
  }, {} as Record<string, TravelTipItem[]>);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      next.has(category) ? next.delete(category) : next.add(category);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border border-sky-100">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        Travel Tips
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {Object.entries(groupedTips).map(([category, tips]) => {
          const isOpen = openCategories.has(category);
          return (
            <div
              key={category}
              className="border border-sky-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-sky-400 hover:shadow-md transition-all duration-300 bg-gradient-to-b from-white to-sky-50/30"
            >
              {/* Header / Toggle Button */}
              <button
                onClick={() => toggleCategory(category)}
                className="cursor-pointer w-full flex items-center justify-between p-2.5 sm:p-3 md:p-4 text-left group"
              >
                <span className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-sky-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-sky-800 truncate">
                    {category}
                  </span>
                  <span className="text-[10px] sm:text-xs text-sky-400 font-normal flex-shrink-0">
                    ({tips.length})
                  </span>
                </span>

                {/* Arrow icon */}
                <svg
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-sky-500 flex-shrink-0 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expandable content with smooth animation */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="px-2.5 sm:px-3 md:px-4 pb-2.5 sm:pb-3 md:pb-4 space-y-1 sm:space-y-1.5 md:space-y-2 border-t border-sky-100 pt-1.5 sm:pt-2 md:pt-3">
                  {tips.map((tip) => (
                    <li key={tip.id} className="flex items-start gap-1.5 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-teal-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sky-700 text-[10px] sm:text-xs md:text-sm leading-relaxed">
                        {tip.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TravelTips;