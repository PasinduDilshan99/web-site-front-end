import { ActivePackagesType } from "@/types/package-types";
import React, { useState } from "react";

interface InclusionsExclusionsProps {
  packageData: ActivePackagesType;
}

const InclusionsExclusions: React.FC<InclusionsExclusionsProps> = ({ packageData }) => {
  const [activeTab, setActiveTab] = useState<'inclusions' | 'exclusions' | 'conditions'>('inclusions');

  const getActiveItems = () => {
    switch (activeTab) {
      case 'inclusions':
        return packageData.inclusions.filter(item => item.status === 'ACTIVE');
      case 'exclusions':
        return packageData.exclusions.filter(item => item.status === 'ACTIVE');
      case 'conditions':
        return packageData.conditions.filter(item => item.status === 'ACTIVE');
      default:
        return [];
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'inclusions':
        return 'What\'s Included';
      case 'exclusions':
        return 'What\'s Not Included';
      case 'conditions':
        return 'Terms & Conditions';
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Package Details</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('inclusions')}
          className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'inclusions'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Inclusions ({packageData.inclusions.filter(i => i.status === 'ACTIVE').length})
        </button>
        <button
          onClick={() => setActiveTab('exclusions')}
          className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'exclusions'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Exclusions ({packageData.exclusions.filter(i => i.status === 'ACTIVE').length})
        </button>
        <button
          onClick={() => setActiveTab('conditions')}
          className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'conditions'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Conditions ({packageData.conditions.filter(i => i.status === 'ACTIVE').length})
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">{getTabTitle()}</h3>
        <div className="space-y-2 sm:space-y-3">
          {getActiveItems().map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
            >
              {activeTab === 'inclusions' ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : activeTab === 'exclusions' ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-gray-700 text-sm sm:text-base">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InclusionsExclusions;