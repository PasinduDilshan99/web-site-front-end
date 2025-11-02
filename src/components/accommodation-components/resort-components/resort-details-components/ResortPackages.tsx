// components/resort/ResortPackages.tsx
import React from 'react';
import { Calendar, Users, Clock, Star, CheckCircle, Gift, Sparkles } from 'lucide-react';
import { PackageDetails } from '@/types/accommodations-types/service-provider-types';

interface ResortPackagesProps {
  packages: PackageDetails[];
}

const ResortPackages: React.FC<ResortPackagesProps> = ({ packages }) => {
  if (!packages.length) {
    return null;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-teal-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Exclusive Packages
          </h2>
          <p className="text-gray-600 mt-2">Curated experiences for the perfect stay</p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Special Offers</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.serviceProviderPackageId}
            className="border-2 border-teal-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-blue-50/50 group"
          >
            {pkg.images.length > 0 && (
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.images[0].packageImageUrl}
                  alt={pkg.images[0].packageImageName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Premium Package
                  </span>
                </div>
                {pkg.discountPercentage && pkg.discountPercentage > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Save {pkg.discountPercentage}%
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{pkg.packageName}</h3>
                  <p className="text-blue-100">{pkg.packageDescription}</p>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-gray-700">{pkg.durationDays} Nights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">
                      For {pkg.minPersons === pkg.maxPersons 
                        ? `${pkg.minPersons} person${pkg.minPersons > 1 ? 's' : ''}`
                        : `${pkg.minPersons}-${pkg.maxPersons} people`
                      }
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-teal-600">
                    ${pkg.localPrice}
                  </div>
                  <div className="text-sm text-gray-500">total package</div>
                  <div className="text-xs text-teal-600 font-semibold mt-1">
                    ${Math.round(pkg.localPrice / pkg.durationDays)}/night
                  </div>
                </div>
              </div>
              
              {pkg.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Package Highlights
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {pkg.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong className="text-teal-600">{feature.featureName}:</strong> {feature.featureValue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {pkg.inclusions.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg flex items-center gap-2">
                    <Gift className="w-5 h-5 text-blue-500" />
                    Whats Included
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.inclusions.slice(0, 5).map((inclusion, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 rounded-xl text-sm font-medium border border-blue-200 shadow-sm"
                      >
                        {inclusion.inclusionName}
                      </span>
                    ))}
                    {pkg.inclusions.length > 5 && (
                      <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-xl text-sm font-medium border border-amber-200">
                        +{pkg.inclusions.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Book This Package
                </button>
                <button className="px-6 py-4 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-semibold rounded-xl transition-all duration-300">
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {packages.length > 2 && (
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore All {packages.length} Packages
          </button>
        </div>
      )}
    </div>
  );
};

export default ResortPackages;