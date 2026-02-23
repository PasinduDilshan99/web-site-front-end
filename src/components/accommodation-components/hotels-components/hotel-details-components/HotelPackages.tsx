// components/hotel/HotelPackages.tsx
import React from 'react';
import { Calendar, Users, Clock, Star, CheckCircle, Gift } from 'lucide-react';
import { PackageDetails } from '@/types/accommodations-types/service-provider-types';

interface HotelPackagesProps {
  packages: PackageDetails[];
}

const HotelPackages: React.FC<HotelPackagesProps> = ({ packages }) => {
  if (!packages.length) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[#3F8AB2] text-sm">Exclusive offers for premium stays</p>
        </div>
        <div className="flex items-center gap-2 text-[#2A6F97]">
          <Gift className="w-5 h-5" />
          <span className="font-semibold">Best Value Deals</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.serviceProviderPackageId}
            className="border border-[#2A6F97]/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-[#3F8AB2]/30 bg-white"
          >
            {pkg.images.length > 0 && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.images[0].packageImageUrl}
                  alt={pkg.images[0].packageImageName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Special Offer
                  </span>
                </div>
                {pkg.discountPercentage && pkg.discountPercentage > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#1D4F6E] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Save {pkg.discountPercentage}%
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-[#1D4F6E]">{pkg.packageName}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#2A6F97]">
                    ${pkg.localPrice}
                  </div>
                  <div className="text-sm text-[#54A5CC]">total package</div>
                </div>
              </div>
              
              <p className="text-[#3F8AB2] mb-4 leading-relaxed">{pkg.packageDescription}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#1D4F6E] bg-[#F0F7FF] p-2 rounded-lg border border-[#2A6F97]/10">
                  <Clock className="w-4 h-4 text-[#2A6F97]" />
                  <span>{pkg.durationDays} nights</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-[#1D4F6E] bg-[#F0F7FF] p-2 rounded-lg border border-[#2A6F97]/10">
                  <Users className="w-4 h-4 text-[#2A6F97]" />
                  <span>
                    {pkg.minPersons === pkg.maxPersons 
                      ? `${pkg.minPersons} ${pkg.minPersons > 1 ? 'persons' : 'person'}`
                      : `${pkg.minPersons}-${pkg.maxPersons} guests`
                    }
                  </span>
                </div>
                
                {pkg.startDate && pkg.endDate && (
                  <div className="flex items-center gap-2 text-sm text-[#1D4F6E] bg-[#F0F7FF] p-2 rounded-lg border border-[#2A6F97]/10 col-span-2">
                    <Calendar className="w-4 h-4 text-[#2A6F97]" />
                    <span>
                      {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              
              {pkg.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-[#1D4F6E] mb-2">Package Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#2A6F97]" />
                        <span className="text-sm text-[#1D4F6E]">
                          <strong>{feature.featureName}:</strong> {feature.featureValue}
                        </span>
                      </div>
                    ))}
                    {pkg.features.length > 3 && (
                      <div className="text-sm text-[#2A6F97] font-medium">
                        + {pkg.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {pkg.inclusions.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-[#1D4F6E] mb-2">What&apos;s Included:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#F0F7FF] text-[#1D4F6E] rounded-full text-sm border border-[#2A6F97]/10"
                      >
                        {inclusion.inclusionName}
                      </span>
                    ))}
                    {pkg.inclusions.length > 4 && (
                      <span className="px-3 py-1 bg-[#E6F0FA] text-[#1D4F6E] rounded-full text-sm border border-[#3F8AB2]/20">
                        +{pkg.inclusions.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] hover:from-[#1D4F6E] hover:to-[#3F8AB2] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
                  Book Package
                </button>
                <button className="px-4 py-3 border border-[#2A6F97] text-[#2A6F97] hover:bg-[#F0F7FF] rounded-lg transition-colors duration-200">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {packages.length > 2 && (
        <div className="mt-6 text-center">
          <button className="text-[#2A6F97] hover:text-[#1D4F6E] font-semibold underline">
            View All Packages ({packages.length})
          </button>
        </div>
      )}
    </>
  );
};

export default HotelPackages;