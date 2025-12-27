import React, { useState } from "react";
import { Check, X, Info, ChevronDown, ChevronUp } from "lucide-react";
import { 
  Package, 
  TravelTip,
  PackageInclusion,
  PackageExclusion,
  PackageCondition 
} from "@/types/package-comparison-types";

interface ExtraDetailsComparisonProps {
  selectedPackage1: Package;
  selectedPackage2: Package;
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
    packageData: Package,
    section: keyof Package["extraDetails"]
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
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Package Details Comparison
      </h3>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {(["inclusions", "exclusions", "conditions", "tips"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Package 1 Details */}
          <div>
            <div className="font-bold text-lg mb-4 flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: selectedPackage1.color }}
              />
              {selectedPackage1.packageName}
            </div>
            {activeTab === "inclusions" &&
              renderDetailsList(
                getDetailsSection(selectedPackage1, "inclusions") as PackageInclusion[],
                "inclusions",
                showAllPackage1,
                1
              )}
            {activeTab === "exclusions" &&
              renderDetailsList(
                getDetailsSection(selectedPackage1, "exclusions") as PackageExclusion[],
                "exclusions",
                showAllPackage1,
                1
              )}
            {activeTab === "conditions" &&
              renderDetailsList(
                getDetailsSection(selectedPackage1, "conditions") as PackageCondition[],
                "conditions",
                showAllPackage1,
                1
              )}
            {activeTab === "tips" && (
              <div>
                {renderTravelTips(
                  getDetailsSection(selectedPackage1, "travelTips") as TravelTip[],
                  showAllPackage1,
                  1,
                  "bg-blue-50 text-blue-800"
                )}
              </div>
            )}
          </div>

          {/* Package 2 Details */}
          <div>
            <div className="font-bold text-lg mb-4 flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: selectedPackage2.color }}
              />
              {selectedPackage2.packageName}
            </div>
            {activeTab === "inclusions" &&
              renderDetailsList(
                getDetailsSection(selectedPackage2, "inclusions") as PackageInclusion[],
                "inclusions",
                showAllPackage2,
                2
              )}
            {activeTab === "exclusions" &&
              renderDetailsList(
                getDetailsSection(selectedPackage2, "exclusions") as PackageExclusion[],
                "exclusions",
                showAllPackage2,
                2
              )}
            {activeTab === "conditions" &&
              renderDetailsList(
                getDetailsSection(selectedPackage2, "conditions") as PackageCondition[],
                "conditions",
                showAllPackage2,
                2
              )}
            {activeTab === "tips" && (
              <div>
                {renderTravelTips(
                  getDetailsSection(selectedPackage2, "travelTips") as TravelTip[],
                  showAllPackage2,
                  2,
                  "bg-green-50 text-green-800"
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraDetailsComparison;