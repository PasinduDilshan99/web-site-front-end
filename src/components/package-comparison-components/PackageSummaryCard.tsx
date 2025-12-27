import React from "react";
import { Package } from "@/types/package-comparison-types";

interface PackageSummaryCardProps {
  package: Package;
  formatCurrency: (amount: number) => string;
  renderPackageImages: (pkg: Package) => React.ReactNode;
}

const PackageSummaryCard: React.FC<PackageSummaryCardProps> = ({
  package: pkg,
  formatCurrency,
  renderPackageImages,
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 border-l-4 relative"
      style={{ borderLeftColor: pkg.color }}
    >
      {pkg.discount > 0 && (
        <div className="absolute -top-3 -right-3 bg-red-500 text-white px-4 py-1 rounded-full font-bold text-sm">
          {pkg.discount}% OFF
        </div>
      )}
      <h3 className="text-xl font-bold mb-4" style={{ color: pkg.color }}>
        {pkg.packageName}
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Price:</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(pkg.totalPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Per Person:</span>
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(pkg.pricePerPerson)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Discount:</span>
          <span className="text-lg font-semibold text-green-600">
            {pkg.discount}%
          </span>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">{pkg.packageDescription}</p>
        </div>
        {renderPackageImages(pkg)}
      </div>
    </div>
  );
};

export default PackageSummaryCard;