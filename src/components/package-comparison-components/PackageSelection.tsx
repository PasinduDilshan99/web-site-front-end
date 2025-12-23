import React from "react";
import { Package } from "@/types/package-comparison-types";

interface PackageSelectionProps {
  packages: Package[];
  package1Id: string;
  package2Id: string;
  onPackageSelect: (packageId: string, isFirstPackage: boolean) => void;
  formatCurrency: (amount: number) => string;
  selectedPackage1: Package | null;
  selectedPackage2: Package | null;
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
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Select Packages to Compare
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Package 1 Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select First Package
            </label>
            <select
              value={package1Id}
              onChange={(e) => onPackageSelect(e.target.value, true)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
            >
              <option value="">Select a package</option>
              {packages.map((pkg) => (
                <option key={pkg.packageId} value={pkg.packageId}>
                  {pkg.packageName} - {formatCurrency(pkg.totalPrice)} (
                  {pkg.discount}% off)
                </option>
              ))}
            </select>
          </div>

          {/* Package 2 Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Second Package
            </label>
            <select
              value={package2Id}
              onChange={(e) => onPackageSelect(e.target.value, false)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
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
          </div>
        </div>

        {/* Comparison Button */}
        {selectedPackage1 && selectedPackage2 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              <span>
                Comparing {selectedPackage1.packageName} vs{" "}
                {selectedPackage2.packageName}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSelection;