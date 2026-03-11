import { ActivePackagesType } from "@/types/package-types";
import React, { useState } from "react";

interface InclusionsExclusionsProps {
  packageData: ActivePackagesType;
}

const InclusionsExclusions: React.FC<InclusionsExclusionsProps> = ({
  packageData,
}) => {
  const [activeTab, setActiveTab] = useState<
    "inclusions" | "exclusions" | "conditions"
  >("inclusions");

  const getActiveItems = () => {
    switch (activeTab) {
      case "inclusions":
        return packageData.inclusions.filter(
          (item) => item.status === "ACTIVE",
        );
      case "exclusions":
        return packageData.exclusions.filter(
          (item) => item.status === "ACTIVE",
        );
      case "conditions":
        return packageData.conditions.filter(
          (item) => item.status === "ACTIVE",
        );
      default:
        return [];
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "inclusions":
        return "What's Included";
      case "exclusions":
        return "What's Not Included";
      case "conditions":
        return "Terms & Conditions";
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border border-sky-100">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        Package Details
      </h2>

      {/* Tabs - Scrollable on mobile */}
      <div className="flex border-b border-sky-200 mb-4 sm:mb-5 md:mb-6 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab("inclusions")}
          className={`cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium border-b-2 transition-colors whitespace-nowrap flex-1 sm:flex-none ${
            activeTab === "inclusions"
              ? "border-sky-600 text-sky-600 bg-sky-50"
              : "border-transparent text-sky-700 hover:text-sky-800 hover:border-sky-300 hover:bg-sky-50/50"
          }`}
        >
          <span className="block sm:inline">Inclusions </span>
          <span className="text-xs opacity-75">
            (
            {packageData.inclusions.filter((i) => i.status === "ACTIVE").length}
            )
          </span>
        </button>
        <button
          onClick={() => setActiveTab("exclusions")}
          className={`cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium border-b-2 transition-colors whitespace-nowrap flex-1 sm:flex-none ${
            activeTab === "exclusions"
              ? "border-teal-600 text-teal-600 bg-teal-50"
              : "border-transparent text-teal-700 hover:text-teal-800 hover:border-teal-300 hover:bg-teal-50/50"
          }`}
        >
          <span className="block sm:inline">Exclusions </span>
          <span className="text-xs opacity-75">
            (
            {packageData.exclusions.filter((i) => i.status === "ACTIVE").length}
            )
          </span>
        </button>
        <button
          onClick={() => setActiveTab("conditions")}
          className={`cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-medium border-b-2 transition-colors whitespace-nowrap flex-1 sm:flex-none ${
            activeTab === "conditions"
              ? "border-cyan-600 text-cyan-600 bg-cyan-50"
              : "border-transparent text-cyan-700 hover:text-cyan-800 hover:border-cyan-300 hover:bg-cyan-50/50"
          }`}
        >
          <span className="block sm:inline">Conditions </span>
          <span className="text-xs opacity-75">
            (
            {packageData.conditions.filter((i) => i.status === "ACTIVE").length}
            )
          </span>
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-sky-800 mb-2 sm:mb-3 md:mb-4">
          {getTabTitle()}
        </h3>
        <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
          {getActiveItems().map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-1.5 sm:gap-2 md:gap-3 p-2 sm:p-2.5 md:p-3 rounded-lg border transition-colors hover:shadow-sm ${
                activeTab === "inclusions"
                  ? "border-sky-200 hover:border-sky-300 hover:bg-sky-50/50"
                  : activeTab === "exclusions"
                    ? "border-teal-200 hover:border-teal-300 hover:bg-teal-50/50"
                    : "border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50/50"
              }`}
            >
              {activeTab === "inclusions" ? (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : activeTab === "exclusions" ? (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="text-gray-700 text-xs sm:text-sm md:text-base flex-1">
                {item.description}
              </span>
            </div>
          ))}

          {getActiveItems().length === 0 && (
            <p className="text-gray-500 text-xs sm:text-sm text-center py-3 sm:py-4">
              No {activeTab} available for this package.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InclusionsExclusions;
