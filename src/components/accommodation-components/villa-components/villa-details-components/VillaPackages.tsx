// components/villa/VillaPackages.tsx
import React from 'react';
import { Calendar, Users, Clock, Star, CheckCircle, Gift, Sparkles } from 'lucide-react';
import { PackageDetails } from '@/types/accommodations-types/service-provider-types';

interface VillaPackagesProps {
  packages: PackageDetails[];
}

const VillaPackages: React.FC<VillaPackagesProps> = ({ packages }) => {
  if (!packages.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Gift className="w-7 h-7 text-emerald-600" />
          <h2 className="text-3xl font-bold text-gray-900">Exclusive Packages</h2>
        </div>
        <div className="flex items-center gap-2 text-emerald-600">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Premium Experiences</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.serviceProviderPackageId}
            className="border-2 border-emerald-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-emerald-300 group"
          >
            {/* Package Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{pkg.packageName}</h3>
                <p className="text-emerald-100 opacity-90">{pkg.packageDescription}</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              
              {pkg.discountPercentage && pkg.discountPercentage > 0 && (
                <div className="absolute top-6 right-6">
                  <span className="bg-white text-emerald-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Save {pkg.discountPercentage}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              {/* Price and Duration */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-3xl font-bold text-emerald-600">${pkg.localPrice}</div>
                  <div className="text-gray-500">total package</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold">{pkg.durationDays} nights</span>
                  </div>
                  <div className="text-sm text-gray-500">perfect getaway</div>
                </div>
              </div>
              
              {/* Package Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {pkg.minPersons === pkg.maxPersons 
                        ? `${pkg.minPersons} person${pkg.minPersons > 1 ? 's' : ''}`
                        : `${pkg.minPersons}-${pkg.maxPersons} people`
                      }
                    </div>
                    <div className="text-sm text-gray-600">Group size</div>
                  </div>
                </div>
                
                {pkg.startDate && pkg.endDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {new Date(pkg.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-sm text-gray-600">Start date</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Key Features */}
              {pkg.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-emerald-600" />
                    Package Highlights
                  </h4>
                  <div className="space-y-2">
                    {pkg.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong className="text-emerald-600">{feature.featureName}:</strong> {feature.featureValue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Inclusions */}
              {pkg.inclusions.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Whats Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.inclusions.slice(0, 5).map((inclusion, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-lg text-sm border border-emerald-200 font-medium"
                      >
                        {inclusion.inclusionName}
                      </span>
                    ))}
                    {pkg.inclusions.length > 5 && (
                      <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm border border-gray-300">
                        +{pkg.inclusions.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                  Book Package
                </button>
                <button className="px-6 py-4 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 font-semibold">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {packages.length > 2 && (
        <div className="mt-8 text-center">
          <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-lg underline">
            View All Exclusive Packages ({packages.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default VillaPackages;