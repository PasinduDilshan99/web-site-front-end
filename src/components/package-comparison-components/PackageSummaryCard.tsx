import React from "react";
import { PackageComparison } from "@/types/package-comparison-types";
import { Calendar, DollarSign, Tag } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-lg p-6 border border-sky-100 h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ color: pkg.color }}>
        {pkg.packageName}
      </h3>
      
      <div className="space-y-4">
        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(pkg.totalPrice)}
            </span>
          </div>
          {pkg.discount > 0 && (
            <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
              <Tag className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">
                {pkg.discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5 text-sky-500" />
          <span>{pkg.packageDayByDayDtoList.length} Days</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {pkg.packageDescription}
        </p>

        {/* Package Images */}
        {renderPackageImages(pkg)}
      </div>
    </div>
  );
};

export default PackageSummaryCard;