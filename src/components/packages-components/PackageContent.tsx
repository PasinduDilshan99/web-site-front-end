import { ActivePackagesType } from "@/types/packages-types";
import { useRouter } from "next/navigation";
import React from "react";

interface PackageContentProps {
  package: ActivePackagesType;
  showViewDetails?: boolean;
}

const PackageContent: React.FC<PackageContentProps> = ({
  package: pkg,
  showViewDetails = false,
}) => {
  const router = useRouter();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const calculateDiscountedPrice = (): number => {
    return pkg.totalPrice * (1 - pkg.discountPercentage / 100);
  };

  const handleButtonClick = () => {
    router.push(`/packages/${pkg.packageId}`);
  };

  return (
    <div className="p-6">
      {/* Package Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {pkg.packageName}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {pkg.packageDescription}
        </p>
      </div>

      {/* Package Meta Information */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Tour:</span>
          <span className="text-gray-900">{pkg.tourName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Duration:</span>
          <span className="text-gray-900">
            {pkg.duration} Day{pkg.duration > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Route:</span>
          <span className="text-gray-900">
            {pkg.startLocation} → {pkg.endLocation}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Group Size:</span>
          <span className="text-gray-900">
            {pkg.minPersonCount}-{pkg.maxPersonCount} people
          </span>
        </div>
      </div>

      {/* Features */}
      {pkg.features && pkg.features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Features:
          </h4>
          <div className="flex flex-wrap gap-1">
            {pkg.features.map((feature) => (
              <span
                key={feature.featureId}
                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {feature.featureName}: {feature.featureValue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Schedules */}
      {pkg.schedules && pkg.schedules.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Available Schedules:
          </h4>
          <div className="space-y-2">
            {pkg.schedules.slice(0, 2).map((schedule) => (
              <div
                key={schedule.scheduleId}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded text-xs"
              >
                <span className="font-medium text-gray-900">
                  {schedule.scheduleName}
                </span>
                <span className="text-gray-600">
                  {new Date(schedule.assumeStartDate).toLocaleDateString()}
                </span>
              </div>
            ))}
            {pkg.schedules.length > 2 && (
              <div className="text-xs text-gray-500 text-center">
                +{pkg.schedules.length - 2} more schedules
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing */}
      <div className="mb-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(calculateDiscountedPrice())}
          </span>
          {pkg.discountPercentage > 0 && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(pkg.totalPrice)}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600">
          {pkg.pricePerPerson
            ? formatPrice(pkg.pricePerPerson) + " per person"
            : "Contact for pricing"}
        </div>
      </div>

      {/* Action Button */}
      {showViewDetails ? (
        <button
          onClick={handleButtonClick}
          className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          See Details
        </button>
      ) : (
        <button
          onClick={handleButtonClick}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200"
          style={{
            backgroundColor: pkg.color,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = pkg.hoverColor;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = pkg.color;
          }}
        >
          Book Now
        </button>
      )}
    </div>
  );
};

export default PackageContent;
