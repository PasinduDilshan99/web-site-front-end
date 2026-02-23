// components/hostel/HostelPackages.tsx
import React from 'react';
import { Calendar, Users, Clock, Star, CheckCircle, Bed, MapPin, Globe, Leaf } from 'lucide-react';
import { PackageDetails } from '@/types/accommodations-types/service-provider-types';

interface HostelPackagesProps {
  packages: PackageDetails[];
}

const HostelPackages: React.FC<HostelPackagesProps> = ({ packages }) => {
  if (!packages.length) {
    return null;
  }

  // Helper function to format currency
  const formatPrice = (price: number, currencyCode: string) => {
    return `${currencyCode} ${price.toLocaleString()}`;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[#5A8F7A] text-sm">Special offers for solo travelers and groups</p>
        </div>
        <div className="flex items-center gap-2 text-[#3A9B9B]">
          <Star className="w-5 h-5" />
          <span className="font-semibold">Budget-Friendly</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.serviceProviderPackageId}
            className="border border-[#B5E5D4] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-[#C9EFE3] hover:translate-y-[-2px] bg-white"
          >
            {/* Package Header with Badges */}
            <div className="relative p-4 bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] border-b border-[#B5E5D4]">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-[#2D4F43] line-clamp-1">{pkg.packageName}</h3>
                {pkg.packageCategory && (
                  <span className="px-2 py-1 bg-[#F5FDFA] text-[#2D4F43] text-xs font-semibold rounded-full border border-[#B5E5D4]">
                    {pkg.packageCategory}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {pkg.discountPercentage && pkg.discountPercentage > 0 && (
                  <span className="bg-[#B5E5D4] text-[#2D4F43] px-2 py-1 rounded text-xs font-semibold border border-[#B5E5D4]">
                    {pkg.discountPercentage}% OFF
                  </span>
                )}
                {pkg.isCustomizable && (
                  <span className="bg-[#C9EFE3] text-[#2D4F43] px-2 py-1 rounded text-xs font-semibold border border-[#C9EFE3]">
                    Customizable
                  </span>
                )}
                {pkg.seasonType && (
                  <span className="bg-[#DDF9F2] text-[#2D4F43] px-2 py-1 rounded text-xs font-semibold border border-[#DDF9F2]">
                    {pkg.seasonType} Season
                  </span>
                )}
              </div>
            </div>
            
            {/* Package Image */}
            {pkg.images.length > 0 && (
              <div className="relative h-40 overflow-hidden">
                <img
                  src={pkg.images[0].packageImageUrl}
                  alt={pkg.images[0].packageImageName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            {/* Package Content */}
            <div className="p-4">
              {/* Description */}
              <p className="text-[#5A8F7A] text-sm mb-4 line-clamp-2">{pkg.packageDescription}</p>
              
              {/* Price Section */}
              <div className="mb-4 p-3 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4]">
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-[#2D4F43]">
                    {formatPrice(pkg.localPrice, pkg.currencyCode)}
                  </div>
                  {pkg.foreignPrice && pkg.foreignPrice !== pkg.localPrice && (
                    <div className="text-sm text-[#5A8F7A]">
                      ~{formatPrice(pkg.foreignPrice, 'USD')}
                    </div>
                  )}
                </div>
                <div className="text-xs text-[#5A8F7A]">total for {pkg.durationDays} nights</div>
              </div>
              
              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-[#2D4F43] bg-[#F5FDFA] p-2 rounded-lg border border-[#B5E5D4]">
                  <Clock className="w-3 h-3 text-[#3A9B9B]" />
                  <span>{pkg.durationDays} Nights</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-[#2D4F43] bg-[#F5FDFA] p-2 rounded-lg border border-[#C9EFE3]">
                  <Users className="w-3 h-3 text-[#3A9B9B]" />
                  <span>
                    {pkg.minPersons === pkg.maxPersons 
                      ? `${pkg.minPersons} ${pkg.minPersons > 1 ? 'People' : 'Person'}`
                      : `${pkg.minPersons}-${pkg.maxPersons} People`
                    }
                  </span>
                </div>
                
                {pkg.includesChildren && (
                  <div className="flex items-center gap-2 text-xs text-[#2D4F43] bg-[#F5FDFA] p-2 rounded-lg border border-[#DDF9F2]">
                    <Bed className="w-3 h-3 text-[#3A9B9B]" />
                    <span>Kids {pkg.maxChildrenIncluded ? `(${pkg.maxChildrenIncluded} max)` : 'Included'}</span>
                  </div>
                )}
                
                {pkg.advanceBookingDays && (
                  <div className="flex items-center gap-2 text-xs text-[#2D4F43] bg-[#F5FDFA] p-2 rounded-lg border border-[#B5E5D4]">
                    <Calendar className="w-3 h-3 text-[#3A9B9B]" />
                    <span>Book {pkg.advanceBookingDays}d ahead</span>
                  </div>
                )}
              </div>
              
              {/* Date Range */}
              {pkg.startDate && pkg.endDate && (
                <div className="mb-4 p-3 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4]">
                  <div className="flex items-center gap-2 text-xs text-[#3A9B9B]">
                    <Calendar className="w-3 h-3" />
                    <span>Available:</span>
                  </div>
                  <div className="text-xs text-[#2D4F43] mt-1">
                    {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}
                  </div>
                </div>
              )}
              
              {/* Quick Features */}
              {pkg.features.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-[#2D4F43] mb-2">Features:</div>
                  <div className="space-y-1">
                    {pkg.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-[#3A9B9B]" />
                        <span className="text-xs text-[#5A8F7A] truncate">
                          {feature.featureName}
                        </span>
                      </div>
                    ))}
                    {pkg.features.length > 2 && (
                      <div className="text-xs text-[#3A9B9B] font-medium">
                        + {pkg.features.length - 2} more features
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Inclusions */}
              {pkg.inclusions.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-[#2D4F43] mb-2">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {pkg.inclusions.slice(0, 3).map((inclusion, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#F5FDFA] text-[#2D4F43] rounded text-xs border border-[#B5E5D4]"
                      >
                        {inclusion.inclusionName}
                      </span>
                    ))}
                    {pkg.inclusions.length > 3 && (
                      <span className="px-2 py-1 bg-[#F5FDFA] text-[#5A8F7A] rounded text-xs border border-[#C9EFE3]">
                        +{pkg.inclusions.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Highlights */}
              {pkg.highlights && (
                <div className="mb-4 p-3 bg-[#FAFFFD] rounded-lg border border-[#DDF9F2]">
                  <div className="text-xs font-semibold text-[#2D4F43] mb-1">Highlights</div>
                  <div className="text-xs text-[#5A8F7A] line-clamp-2">{pkg.highlights}</div>
                </div>
              )}
              
              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] hover:from-[#9FD4C0] hover:to-[#C9EFE3] text-[#2D4F43] font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 border border-[#B5E5D4]">
                  Book Now
                </button>
                <button className="px-3 py-2 border border-[#B5E5D4] text-[#2D4F43] hover:bg-[#F5FDFA] rounded-lg text-sm transition-colors duration-200">
                  Details
                </button>
              </div>
              
              {/* Policy Info */}
              <div className="mt-3 pt-3 border-t border-[#B5E5D4]/30">
                <div className="flex items-center justify-between text-xs text-[#5A8F7A]">
                  {pkg.cancellationPolicy && (
                    <span className="truncate">Free cancellation</span>
                  )}
                  {pkg.packageCode && (
                    <span className="font-mono">Code: {pkg.packageCode}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Button */}
      {packages.length > 3 && (
        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 text-[#2D4F43] hover:text-[#3A9B9B] font-semibold py-2 px-6 border-2 border-[#B5E5D4] hover:border-[#C9EFE3] rounded-full transition-colors duration-200 bg-white/50">
            <Leaf className="w-4 h-4" />
            View All Packages ({packages.length})
          </button>
        </div>
      )}
      
      {/* Empty State */}
      {packages.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F5FDFA] rounded-full mb-4 border border-[#B5E5D4]">
            <Bed className="w-8 h-8 text-[#3A9B9B]" />
          </div>
          <h3 className="text-lg font-semibold text-[#2D4F43] mb-2">No Packages Available</h3>
          <p className="text-[#5A8F7A] max-w-md mx-auto">
            Check back later for special hostel packages and deals for solo travelers, groups, and budget adventures.
          </p>
        </div>
      )}
    </>
  );
};

export default HostelPackages;