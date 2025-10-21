import { ActivePackagesType } from "@/types/packages-types";
import React from "react";

interface PackageInfoProps {
  packageData: ActivePackagesType;
}

const PackageInfo: React.FC<PackageInfoProps> = ({ packageData }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Package Details</h2>

      {/* Package Type */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Package Type</h3>
        <div className="flex items-center gap-3">
          <span
            className="px-4 py-2 rounded-full text-sm font-medium border"
            style={{
              backgroundColor: `${packageData.color}15`,
              color: packageData.color,
              borderColor: `${packageData.color}30`,
            }}
          >
            {packageData.packageTypeName}
          </span>
          <p className="text-gray-600">{packageData.packageTypeDescription}</p>
        </div>
      </div>

      {/* Features */}
      {packageData.features.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Included Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {packageData.features.map((feature) => (
              <div
                key={feature.featureId}
                className="flex items-start gap-3 p-3 rounded-lg border"
                style={{
                  backgroundColor: `${feature.color}10`,
                  borderColor: `${feature.color}20`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: feature.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {feature.featureName}:
                    </span>
                    <span className="text-gray-700">{feature.featureValue}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {feature.featureDescription}
                  </p>
                  {feature.specialNote && (
                    <p className="text-sm text-amber-600">💡 {feature.specialNote}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedules */}
      {packageData.schedules.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Schedules</h3>
          <div className="space-y-3">
            {packageData.schedules.map((schedule) => (
              <div
                key={schedule.scheduleId}
                className="p-4 rounded-lg border border-purple-200 bg-purple-50"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-purple-900">
                    {schedule.scheduleName}
                  </h4>
                  <div className="text-sm text-purple-700">
                    {new Date(schedule.assumeStartDate).toLocaleDateString()} -{" "}
                    {new Date(schedule.assumeEndDate).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{schedule.scheduleDescription}</p>
                {schedule.specialNote && (
                  <p className="text-sm text-amber-600">💡 {schedule.specialNote}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Pricing Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Package Price:</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(packageData.totalPrice)}
              </span>
            </div>
            {packageData.discountPercentage > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="font-semibold text-green-600">
                  -{packageData.discountPercentage}%
                </span>
              </div>
            )}
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600 font-semibold">Final Price:</span>
              <span className="font-bold text-lg text-green-600">
                {formatPrice(packageData.totalPrice * (1 - packageData.discountPercentage / 100))}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Price Per Person:</span>
              <span className="font-semibold text-gray-900">
                {packageData.pricePerPerson ? formatPrice(packageData.pricePerPerson) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Group Size:</span>
              <span className="font-semibold text-gray-900">
                {packageData.minPersonCount}-{packageData.maxPersonCount} people
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageInfo;