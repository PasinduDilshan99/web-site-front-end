import { ActivePackagesType } from "@/types/packages-types";
import React from "react";

interface PackageHeaderProps {
  packageData: ActivePackagesType;
}

const PackageHeader: React.FC<PackageHeaderProps> = ({ packageData }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const calculateDiscountedPrice = (): number => {
    return packageData.totalPrice * (1 - packageData.discountPercentage / 100);
  };

  return (
    <div 
      className="bg-gradient-to-r from-purple-600 to-amber-600 text-white py-12"
      style={{
        background: `linear-gradient(135deg, ${packageData.color}20, ${packageData.hoverColor}20)`,
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-white/80 mb-4">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href="/packages" className="hover:text-white transition-colors">Packages</a>
              <span className="mx-2">/</span>
              <span className="text-white">{packageData.packageName}</span>
            </nav>

            {/* Package Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {packageData.packageName}
            </h1>

            {/* Package Description */}
            <p className="text-xl text-white/90 mb-6 max-w-3xl">
              {packageData.packageDescription}
            </p>

            {/* Package Meta */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{packageData.duration} Day{packageData.duration > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{packageData.minPersonCount}-{packageData.maxPersonCount} People</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{packageData.startLocation} → {packageData.endLocation}</span>
              </div>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[200px] text-center">
            {packageData.discountPercentage > 0 ? (
              <>
                <div className="text-2xl font-bold mb-1">
                  {formatPrice(calculateDiscountedPrice())}
                </div>
                <div className="text-lg line-through text-white/70 mb-2">
                  {formatPrice(packageData.totalPrice)}
                </div>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save {packageData.discountPercentage}%
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold">
                {formatPrice(packageData.totalPrice)}
              </div>
            )}
            <div className="text-sm text-white/80 mt-2">per package</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageHeader;