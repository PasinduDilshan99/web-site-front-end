import React, { useState } from "react";
import { Check, X, Info, ChevronDown, ChevronUp } from "lucide-react";
import { 
  PackageComparison, 
  TravelTip,
  PackageInclusion,
  PackageExclusion,
  PackageCondition 
} from "@/types/package-comparison-types";

interface ExtraDetailsComparisonProps {
  selectedPackage1: PackageComparison;
  selectedPackage2: PackageComparison;
  activeTab: "inclusions" | "exclusions" | "conditions" | "tips";
  setActiveTab: (tab: "inclusions" | "exclusions" | "conditions" | "tips") => void;
}

const ExtraDetailsComparison: React.FC<ExtraDetailsComparisonProps> = ({
  selectedPackage1,
  selectedPackage2,
  activeTab,
  setActiveTab,
}) => {
  const [showAllPackage1, setShowAllPackage1] = useState(false);
  const [showAllPackage2, setShowAllPackage2] = useState(false);

  const getDetailsSection = (
    packageData: PackageComparison,
    section: keyof PackageComparison["extraDetails"]
  ) => {
    return packageData.extraDetails[section];
  };

  const renderDetailsList = (
    items: PackageInclusion[] | PackageExclusion[] | PackageCondition[], 
    section: string, 
    showAll: boolean, 
    packageIndex: number
  ) => {
    const itemsToShow = showAll ? items : items.slice(0, 5);
    const hasMoreItems = items.length > 5;

    return (
      <div className="space-y-2">
        {itemsToShow.map((item) => (
          <div key={item.id} className="flex items-start">
            {section === "inclusions" ? (
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            ) : section === "exclusions" ? (
              <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            )}
            <span className="text-sm text-gray-700">{item.description}</span>
          </div>
        ))}
        
        {hasMoreItems && (
          <button
            onClick={() => packageIndex === 1 ? setShowAllPackage1(!showAllPackage1) : setShowAllPackage2(!showAllPackage2)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium mt-2 transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show {items.length - 5} More
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  const renderTravelTips = (
    tips: TravelTip[], 
    showAll: boolean, 
    packageIndex: number,
    colorClass: string
  ) => {
    const tipsToShow = showAll ? tips : tips.slice(0, 5);
    const hasMoreTips = tips.length > 5;

    return (
      <div className="space-y-3">
        {tipsToShow.map((tip) => (
          <div key={tip.id} className={`${colorClass} p-3 rounded-lg`}>
            <div className="font-medium">{tip.title}</div>
            <div className="text-sm mt-1">{tip.description}</div>
          </div>
        ))}
        
        {hasMoreTips && (
          <button
            onClick={() => packageIndex === 1 ? setShowAllPackage1(!showAllPackage1) : setShowAllPackage2(!showAllPackage2)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium mt-2 transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less Tips
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show {tips.length - 5} More Tips
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  // Reset showAll states when tab changes
  React.useEffect(() => {
    setShowAllPackage1(false);
    setShowAllPackage2(false);
  }, [activeTab]);

  return (
    <div className="mt-8">
      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        Package Details Comparison
      </h3>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6">
  {/* Tab Navigation - Scrollable on mobile */}
  <div className="mb-4 sm:mb-5 lg:mb-6">
    <div className="relative">
      <div className="flex overflow-x-auto pb-2 gap-1 sm:gap-2 scrollbar-hide">
        {(["inclusions", "exclusions", "conditions", "tips"] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
              } text-sm sm:text-base min-w-[80px] sm:min-w-[100px] text-center`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </div>
      
      {/* Scroll hint for mobile */}
      <div className="text-center mt-1 sm:hidden">
        <span className="text-xs text-gray-500">← Scroll for more tabs →</span>
      </div>
    </div>
  </div>

  {/* Comparison Grid - Stack on mobile, side-by-side on larger screens */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
    {/* Package 1 Details */}
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: selectedPackage1.color }}
        />
        <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl truncate">
          {selectedPackage1.packageName}
        </h3>
        <span className="ml-auto text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          Package 1
        </span>
      </div>
      
      {activeTab === "inclusions" &&
        renderDetailsList(
          getDetailsSection(selectedPackage1, "inclusions") as PackageInclusion[],
          "inclusions",
          showAllPackage1,
          1,
        )}
      {activeTab === "exclusions" &&
        renderDetailsList(
          getDetailsSection(selectedPackage1, "exclusions") as PackageExclusion[],
          "exclusions",
          showAllPackage1,
          1,        )}
      {activeTab === "conditions" &&
        renderDetailsList(
          getDetailsSection(selectedPackage1, "conditions") as PackageCondition[],
          "conditions",
          showAllPackage1,
          1        )}
      {activeTab === "tips" && (
        <div>
          {renderTravelTips(
            getDetailsSection(selectedPackage1, "travelTips") as TravelTip[],
            showAllPackage1,
            1,
            "bg-blue-50 text-blue-800 border-blue-100"
          )}
        </div>
      )}
    </div>

    {/* Package 2 Details */}
    <div className="space-y-4 sm:space-y-6 lg:border-l lg:border-gray-200 lg:pl-6 lg:pt-0 pt-4 sm:pt-6 border-t border-gray-200 lg:border-t-0">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: selectedPackage2.color }}
        />
        <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl truncate">
          {selectedPackage2.packageName}
        </h3>
        <span className="ml-auto text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          Package 2
        </span>
      </div>
      
      {activeTab === "inclusions" &&
        renderDetailsList(
          getDetailsSection(selectedPackage2, "inclusions") as PackageInclusion[],
          "inclusions",
          showAllPackage2,
          2        )}
      {activeTab === "exclusions" &&
        renderDetailsList(
          getDetailsSection(selectedPackage2, "exclusions") as PackageExclusion[],
          "exclusions",
          showAllPackage2,
          2        )}
      {activeTab === "conditions" &&
        renderDetailsList(
          getDetailsSection(selectedPackage2, "conditions") as PackageCondition[],
          "conditions",
          showAllPackage2,
          2,
        )}
      {activeTab === "tips" && (
        <div>
          {renderTravelTips(
            getDetailsSection(selectedPackage2, "travelTips") as TravelTip[],
            showAllPackage2,
            2,
            "bg-green-50 text-green-800 border-green-100"
          )}
        </div>
      )}
    </div>
  </div>

  {/* Mobile-only quick comparison note */}
  <div className="mt-4 pt-4 border-t border-gray-200 text-center sm:hidden">
    <p className="text-xs text-gray-600">
      Scroll up and down to compare both packages
    </p>
  </div>
</div>
    </div>
  );
};

export default ExtraDetailsComparison;