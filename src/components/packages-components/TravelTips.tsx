import { TravelTipItem } from "@/types/package-types";
import React, { useState } from "react";

interface TravelTipsProps {
  travelTips: TravelTipItem[];
}

const TravelTips: React.FC<TravelTipsProps> = ({ travelTips }) => {
  const activeTips = travelTips.filter(tip => tip.status === 'ACTIVE');

  if (activeTips.length === 0) {
    return null;
  }

  const groupedTips = activeTips.reduce((acc, tip) => {
    const category = tip.title || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tip);
    return acc;
  }, {} as Record<string, TravelTipItem[]>);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Travel Tips</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Object.entries(groupedTips).map(([category, tips]) => (
          <div
            key={category}
            className="border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {category}
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {tips.map((tip) => (
                <li key={tip.id} className="flex items-start gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-xs sm:text-sm">{tip.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelTips;