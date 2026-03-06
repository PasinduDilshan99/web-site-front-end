import { useCommon } from "@/context/CommonContext";
import { ActivePackagesType } from "@/types/package-types";
import { PACKAGE_TYPE_PATH } from "@/utils/urls";
import Link from "next/link";
import React, { useState } from "react";

interface PackageInfoProps {
  packageData: ActivePackagesType;
}

const PackageInfo: React.FC<PackageInfoProps> = ({ packageData }) => {
  const { categories } = useCommon();
  const [isHover, setIsHover] = useState(false);

  const chooseCategoryColor = (tourtype: string) => {
    const category = categories?.packageCategoryList.find(
      (category) =>
        category.packageCategoryName.toLowerCase() === tourtype.toLowerCase(),
    );

    return {
      color: category?.packageCategoryColor,
      hoverColor: category?.packageCategoryHoverColor,
    };
  };
  const categoryColors = chooseCategoryColor(packageData.packageTypeName);
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-sky-100">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-4 sm:mb-6">
        Package Details
      </h2>

      {/* Package Type */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <h3 className="text-lg sm:text-xl font-semibold text-sky-800">
            Package Type
          </h3>

          <Link
            href={`${PACKAGE_TYPE_PATH}${packageData.packageTypeName}`}
            className="self-start sm:self-auto"
          >
            <span
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium border cursor-pointer transition-colors duration-200"
              style={{
                backgroundColor: `${
                  (isHover
                    ? categoryColors?.hoverColor
                    : categoryColors?.color) ?? ""
                }15`,
                color: isHover
                  ? categoryColors?.hoverColor || ""
                  : categoryColors?.color || "",
                borderColor: `${
                  (isHover
                    ? categoryColors?.hoverColor
                    : categoryColors?.color) ?? ""
                }30`,
              }}
            >
              {packageData.packageTypeName}
            </span>
          </Link>
        </div>

        <p className="text-gray-600 text-sm sm:text-base mt-2">
          {packageData.tourName}
        </p>
      </div>

      {/* Features */}
      {packageData.packageFeatures &&
        packageData.packageFeatures.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-sky-800 mb-2 sm:mb-3">
              Included Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {packageData.packageFeatures.map((feature) => (
                <div
                  key={feature.featureId}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border"
                  style={{
                    backgroundColor: `${feature.color}10`,
                    borderColor: `${feature.color}20`,
                  }}
                >
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                    style={{ backgroundColor: feature.color }}
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        {feature.featureName}:
                      </span>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {feature.featureValue}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      {feature.featureDescription}
                    </p>
                    {feature.specialNote && (
                      <p className="text-xs sm:text-sm text-sky-600 font-medium">
                        💡 {feature.specialNote}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Validity Period */}
      {/* <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-sky-800 mb-2 sm:mb-3">Validity Period</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-sky-50 rounded-lg border border-sky-100">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-sky-800 text-sm sm:text-base">From:</span>
            <span className="text-gray-700 text-sm sm:text-base">{formatDate(packageData.startDate)}</span>
          </div>
          <div className="hidden sm:block text-sky-400">→</div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-teal-800 text-sm sm:text-base">To:</span>
            <span className="text-gray-700 text-sm sm:text-base">{formatDate(packageData.endDate)}</span>
          </div>
        </div>
      </div> */}

      {/* Pricing Details */}
      {/* <div>
        <h3 className="text-lg sm:text-xl font-semibold text-sky-800 mb-2 sm:mb-3">Pricing Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Total Package Price:</span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {formatPrice(packageData.totalPrice)}
              </span>
            </div>
            {packageData.discountPercentage > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm sm:text-base">Discount:</span>
                <span className="font-semibold text-teal-600 text-sm sm:text-base">
                  -{packageData.discountPercentage}%
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-sky-200 pt-1.5 sm:pt-2">
              <span className="text-sky-700 font-semibold text-sm sm:text-base">Final Price:</span>
              <span className="font-bold text-base sm:text-lg md:text-xl text-teal-600">
                {formatPrice(packageData.totalPrice * (1 - packageData.discountPercentage / 100))}
              </span>
            </div>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Price Per Person:</span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {packageData.pricePerPerson ? formatPrice(packageData.pricePerPerson) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Group Size:</span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {packageData.minPersonCount}-{packageData.maxPersonCount} people
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Package Status:</span>
              <span className={`font-semibold text-sm sm:text-base ${
                packageData.packageStatus === 'ACTIVE' ? 'text-teal-600' : 'text-red-600'
              }`}>
                {packageData.packageStatus}
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PackageInfo;
