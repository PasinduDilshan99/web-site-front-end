import { ActivePackagesType } from "@/types/package-types";
import Link from "next/link";
import React from "react";

interface PackageHeaderProps {
  packageData: ActivePackagesType;
}

const PackageHeader: React.FC<PackageHeaderProps> = ({ packageData }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscountedPrice = (): number => {
    return packageData.totalPrice * (1 - packageData.discountPercentage / 100);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div 
      className="bg-gradient-to-r from-purple-600 to-amber-600 text-white py-8 sm:py-10 md:py-12 lg:py-16"
      style={{
        background: `linear-gradient(135deg, ${packageData.color}60, ${packageData.hoverColor}60)`,
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="flex text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-1 sm:mx-2">/</span>
              <Link href="/packages" className="hover:text-white transition-colors">Packages</Link>
              <span className="mx-1 sm:mx-2">/</span>
              <span className="text-white truncate">{packageData.packageName}</span>
            </nav>

            {/* Package Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
              {packageData.packageName}
            </h1>

            {/* Package Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-5 md:mb-6 max-w-3xl line-clamp-2 sm:line-clamp-3">
              {packageData.packageDescription}
            </p>

            {/* Package Meta */}
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Valid: {formatDate(packageData.startDate)} - {formatDate(packageData.endDate)}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{packageData.minPersonCount}-{packageData.maxPersonCount} People</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{packageData.packageTypeName}</span>
              </div>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 min-w-[160px] sm:min-w-[200px] text-center mt-4 md:mt-0">
            {packageData.discountPercentage > 0 ? (
              <>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                  {formatPrice(calculateDiscountedPrice())}
                </div>
                <div className="text-sm sm:text-base md:text-lg line-through text-white/70 mb-2">
                  {formatPrice(packageData.totalPrice)}
                </div>
                <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  Save {packageData.discountPercentage}%
                </div>
              </>
            ) : (
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                {formatPrice(packageData.totalPrice)}
              </div>
            )}
            <div className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2">per package</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageHeader;