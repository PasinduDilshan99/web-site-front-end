import React from "react";
import { PackageComparison } from "@/types/package-comparison-types";

interface PackageSummaryCardProps {
  package: PackageComparison;
  formatCurrency: (amount: number) => string;
  renderPackageImages: (pkg: PackageComparison) => React.ReactNode;
}

const PackageSummaryCard: React.FC<PackageSummaryCardProps> = ({
  package: pkg,
  formatCurrency,
  renderPackageImages,
}) => {
  return (
    <div
  className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-5 lg:p-6 border-l-4 relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
  style={{ borderLeftColor: pkg.color }}
>
  {/* Discount Badge - Responsive positioning */}
  {pkg.discount > 0 && (
    <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-lg">
      {pkg.discount}% OFF
    </div>
  )}
  
  {/* Package Name */}
  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 truncate" style={{ color: pkg.color }}>
    {pkg.packageName}
  </h3>
  
  {/* Package Details Grid */}
  <div className="space-y-2.5 sm:space-y-3">
    {/* Total Price */}
    {/* <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
      <span className="text-gray-600 text-sm sm:text-base">Total Price:</span>
      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
        {formatCurrency(pkg.totalPrice)}
      </span>
    </div> */}
    
    {/* Per Person Price */}
    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
      <div>
        <span className="text-gray-600 text-sm sm:text-base">Per Person:</span>
        <div className="text-xs text-gray-500">All inclusive</div>
      </div>
      <span className="text-lg sm:text-xl font-semibold text-gray-900">
        {formatCurrency(pkg.pricePerPerson)}
      </span>
    </div>
    
    {/* Discount Display */}
    {pkg.discount > 0 && (
      <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
        <span className="text-gray-600 text-sm sm:text-base">You Save:</span>
        <div className="text-right">
          <span className="text-lg sm:text-xl font-bold text-green-600">
            {formatCurrency(pkg.totalPrice * pkg.discount / 100)}
          </span>
          <div className="text-xs sm:text-sm text-green-700 font-semibold">
            ({pkg.discount}% discount)
          </div>
        </div>
      </div>
    )}
    
    {/* Package Description */}
    <div className="mt-3 sm:mt-4">
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
        {pkg.packageDescription}
      </p>
    </div>
    
    {/* Package Images - Responsive grid */}
    {renderPackageImages(pkg)}
    
    {/* Action Buttons */}
    <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
      <button className="flex-1 sm:flex-none sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm sm:text-base font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-sm hover:shadow">
        Book Now
      </button>
      <button className="flex-1 sm:flex-none sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 text-sm sm:text-base font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
        Details
      </button>
    </div>
  </div>
</div>
  );
};

export default PackageSummaryCard;