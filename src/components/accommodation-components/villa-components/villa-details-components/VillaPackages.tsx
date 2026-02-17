// components/villa/VillaPackages.tsx
import React from 'react';
import { Calendar, Users, Clock, Star, CheckCircle, Gift, Sparkles, Leaf } from 'lucide-react';
import { PackageDetails } from '@/types/accommodations-types/service-provider-types';

interface VillaPackagesProps {
  packages: PackageDetails[];
}

const VillaPackages: React.FC<VillaPackagesProps> = ({ packages }) => {
  if (!packages.length) {
    return null;
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#1B4D3E]/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-xl">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#1B4D3E]">Exclusive Packages</h2>
        </div>
        <div className="flex items-center gap-2 text-[#428577]">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Premium Experiences</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.serviceProviderPackageId}
            className="border border-[#1B4D3E]/10 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-[#428577]/30 group bg-white"
          >
            {/* Package Header */}
            <div className="bg-gradient-to-r from-[#1B4D3E] to-[#428577] p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{pkg.packageName}</h3>
                <p className="text-white/80">{pkg.packageDescription}</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <Leaf className="absolute bottom-2 left-2 w-12 h-12 text-white/10" />
              
              {pkg.discountPercentage && pkg.discountPercentage > 0 && (
                <div className="absolute top-6 right-6">
                  <span className="bg-white text-[#1B4D3E] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Save {pkg.discountPercentage}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              {/* Price and Duration */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-3xl font-bold text-[#1B4D3E]">${pkg.localPrice}</div>
                  <div className="text-[#2E6B5C]">total package</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-[#1B4D3E]">
                    <Clock className="w-5 h-5 text-[#428577]" />
                    <span className="font-semibold">{pkg.durationDays} nights</span>
                  </div>
                  <div className="text-sm text-[#2E6B5C]">perfect getaway</div>
                </div>
              </div>
              
              {/* Package Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-[#E8F3EF] rounded-lg">
                  <Users className="w-5 h-5 text-[#1B4D3E]" />
                  <div>
                    <div className="font-semibold text-[#1B4D3E]">
                      {pkg.minPersons === pkg.maxPersons 
                        ? `${pkg.minPersons} person${pkg.minPersons > 1 ? 's' : ''}`
                        : `${pkg.minPersons}-${pkg.maxPersons} guests`
                      }
                    </div>
                    <div className="text-sm text-[#2E6B5C]">Group size</div>
                  </div>
                </div>
                
                {pkg.startDate && pkg.endDate && (
                  <div className="flex items-center gap-3 p-3 bg-[#E8F3EF] rounded-lg">
                    <Calendar className="w-5 h-5 text-[#428577]" />
                    <div>
                      <div className="font-semibold text-[#1B4D3E]">
                        {new Date(pkg.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-sm text-[#2E6B5C]">Start date</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Key Features */}
              {pkg.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-[#1B4D3E] mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#428577]" />
                    Package Highlights
                  </h4>
                  <div className="space-y-2">
                    {pkg.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-[#E8F3EF] rounded-lg transition-colors">
                        <CheckCircle className="w-5 h-5 text-[#428577] flex-shrink-0" />
                        <span className="text-[#1B4D3E]">
                          <strong>{feature.featureName}:</strong> {feature.featureValue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Inclusions */}
              {pkg.inclusions.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-[#1B4D3E] mb-3">Whats Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.inclusions.slice(0, 5).map((inclusion, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] text-[#1B4D3E] rounded-lg text-sm border border-[#1B4D3E]/10 font-medium"
                      >
                        {inclusion.inclusionName}
                      </span>
                    ))}
                    {pkg.inclusions.length > 5 && (
                      <span className="px-3 py-2 bg-gray-100 text-[#2E6B5C] rounded-lg text-sm border border-gray-200">
                        +{pkg.inclusions.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-[#1B4D3E] to-[#428577] hover:from-[#0F3A2E] hover:to-[#2E6B5C] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Book Package
                </button>
                <button className="px-6 py-4 border-2 border-[#1B4D3E]/20 text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white rounded-xl transition-all duration-300 font-semibold">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {packages.length > 2 && (
        <div className="mt-8 text-center">
          <button className="text-[#1B4D3E] hover:text-[#428577] font-semibold text-lg underline transition-colors">
            View All Exclusive Packages ({packages.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default VillaPackages;