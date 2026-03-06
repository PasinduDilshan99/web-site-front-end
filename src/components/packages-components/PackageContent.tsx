import { useAuth } from "@/context/AuthContext";
import { addBrowserHistory } from "@/services/browserHistoryService";
import { ActivePackagesForFilters } from "@/types/packages-types";
import { PACKAGE_BROWSER_HISTORY_TYPE } from "@/utils/constant";
import { PACKAGE_DETAILS_PAGE_PATH } from "@/utils/urls";
import { useRouter } from "next/navigation";
import React from "react";

interface PackageContentProps {
  package: ActivePackagesForFilters;
  showViewDetails?: boolean;
}

const PackageContent: React.FC<PackageContentProps> = ({
  package: pkg,
  showViewDetails = false,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const calculateDiscountedPrice = (): number => {
    return pkg.pricePerPerson * (1 - pkg.discountPercentage / 100);
  };

  const handleButtonClick = async () => {
    if (user) {
      try {
        await addBrowserHistory({
          type: PACKAGE_BROWSER_HISTORY_TYPE,
          dataId: pkg.packageId,
        });
      } catch (err) {
        console.error("Failed to record browser history:", err);
      }
    }

    router.push(
      `${PACKAGE_DETAILS_PAGE_PATH}/${pkg.packageId}?${pkg.packageName}`,
    );
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
          <span className="font-medium text-sky-700">Tour:</span>
          <span className="text-gray-900">{pkg.tourName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-sky-700">Duration:</span>
          <span className="text-gray-900">
            {pkg.duration} Day{pkg.duration > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-sky-700">Route:</span>
          <span className="text-gray-900">
            {pkg.startLocation} → {pkg.endLocation}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-sky-700">Group Size:</span>
          <span className="text-gray-900">
            {pkg.maxPersonCount === 0
              ? "any participants"
              : pkg.minPersonCount === pkg.maxPersonCount
                ? `${pkg.minPersonCount} people`
                : `${pkg.minPersonCount}-${pkg.maxPersonCount} people`}
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
                className="inline-block bg-gradient-to-r from-sky-50 to-teal-50 text-sky-800 border border-sky-200 px-2 py-1 rounded text-xs hover:from-sky-100 hover:to-teal-100 transition-all duration-200"
              >
                {feature.featureName}: {feature.featureValue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pricing */}
      <div className="mb-4 pt-4 border-t border-sky-200 text-gray-500 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            {formatPrice(calculateDiscountedPrice())}
          </span>
          {pkg.discountPercentage > 0 && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(pkg.pricePerPerson)}
            </span>
          )}
          <span className="text-sm text-sky-600 ml-1"> per person</span>
        </div>
      </div>

      {/* Action Button */}
      {showViewDetails ? (
        <button
          onClick={handleButtonClick}
          className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          See Details
        </button>
      ) : (
        <button
          onClick={handleButtonClick}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300"
          style={{
            background: pkg.color
              ? pkg.color
              : "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)",
          }}
          onMouseOver={(e) => {
            if (pkg.hoverColor) {
              e.currentTarget.style.background = pkg.hoverColor;
            } else {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #0284c7 0%, #0f766e 100%)";
            }
          }}
          onMouseOut={(e) => {
            if (pkg.color) {
              e.currentTarget.style.background = pkg.color;
            } else {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)";
            }
          }}
        >
          More Details
        </button>
      )}
    </div>
  );
};

export default PackageContent;
