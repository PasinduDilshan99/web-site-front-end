import React from "react";
import { PackageComparison } from "@/types/package-comparison-types";

interface PackageSelectionProps {
  packages: PackageComparison[];
  package1Id: string;
  package2Id: string;
  onPackageSelect: (packageId: string, isFirstPackage: boolean) => void;
  formatCurrency: (amount: number) => string;
  selectedPackage1: PackageComparison | null;
  selectedPackage2: PackageComparison | null;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({
  packages,
  package1Id,
  package2Id,
  onPackageSelect,
  formatCurrency,
  selectedPackage1,
  selectedPackage2,
}) => {
  return (
    <div className="mb-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-sky-100">
        <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-6">
          Select Packages to Compare
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Package 1 Selection */}
          <div>
            <label className="block text-sm font-medium text-sky-700 mb-2">
              Select First Package
            </label>
            <select
              value={package1Id}
              onChange={(e) => onPackageSelect(e.target.value, true)}
              className="cursor-pointer text-gray-700 w-full p-3 border-2 border-sky-300 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none transition-all duration-200 bg-white"
            >
              <option value="">Select a package</option>
              {packages.map((pkg) => (
                <option key={pkg.packageId} value={pkg.packageId}>
                  {pkg.packageName} - {formatCurrency(pkg.totalPrice)} (
                  {pkg.discount}% off)
                </option>
              ))}
            </select>
            
            {/* Selected Package 1 Summary */}
            {selectedPackage1 && (
              <div className="mt-3 p-3 bg-sky-50 rounded-lg border border-sky-200">
                <p className="text-sm text-sky-700">
                  <span className="font-semibold">Selected:</span> {selectedPackage1.packageName}
                </p>
                <p className="text-xs text-sky-600 mt-1">
                  {selectedPackage1.packageDayByDayDtoList.length} days itinerary
                </p>
              </div>
            )}
          </div>

          {/* Package 2 Selection */}
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-2">
              Select Second Package
            </label>
            <select
              value={package2Id}
              onChange={(e) => onPackageSelect(e.target.value, false)}
              className="cursor-pointer text-gray-700 w-full p-3 border-2 border-teal-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all duration-200 bg-white"
            >
              <option value="">Select a package</option>
              {packages
                .filter((pkg) => pkg.packageId.toString() !== package1Id)
                .map((pkg) => (
                  <option key={pkg.packageId} value={pkg.packageId}>
                    {pkg.packageName} - {formatCurrency(pkg.totalPrice)} (
                    {pkg.discount}% off)
                  </option>
                ))}
            </select>
            
            {/* Selected Package 2 Summary */}
            {selectedPackage2 && (
              <div className="mt-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-teal-700">
                  <span className="font-semibold">Selected:</span> {selectedPackage2.packageName}
                </p>
                <p className="text-xs text-teal-600 mt-1">
                  {selectedPackage2.packageDayByDayDtoList.length} days itinerary
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Button */}
        {selectedPackage1 && selectedPackage2 && (
          <div className="mt-8 text-center">
            <div className="text-sm lg:text-lg inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Comparing {selectedPackage1.packageName} vs {selectedPackage2.packageName}
              </span>
            </div>
          </div>
        )}

        {/* No Packages Message */}
        {packages.length === 0 && (
          <div className="mt-6 text-center text-gray-500">
            No packages available for this tour
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSelection;