// components/hotel/HotelPackages.tsx
import React from 'react';
import { Calendar, Users, Clock, Star, CheckCircle } from 'lucide-react';
import { PackageDetails } from '@/types/accommodations-types/service-provider-types';

interface HotelPackagesProps {
  packages: PackageDetails[];
}

const HotelPackages: React.FC<HotelPackagesProps> = ({ packages }) => {
  if (!packages.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Special Packages</h2>
        <div className="flex items-center gap-2 text-amber-600">
          <Star className="w-5 h-5" />
          <span className="font-semibold">Best Value Deals</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.serviceProviderPackageId}
            className="border-2 border-amber-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-amber-300"
          >
            {pkg.images.length > 0 && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.images[0].packageImageUrl}
                  alt={pkg.images[0].packageImageName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Special Offer
                  </span>
                </div>
                {pkg.discountPercentage && pkg.discountPercentage > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save {pkg.discountPercentage}%
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">{pkg.packageName}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">
                    ${pkg.localPrice}
                  </div>
                  <div className="text-sm text-gray-500">total package</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">{pkg.packageDescription}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{pkg.durationDays} nights</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>
                    {pkg.minPersons === pkg.maxPersons 
                      ? `${pkg.minPersons} person${pkg.minPersons > 1 ? 's' : ''}`
                      : `${pkg.minPersons}-${pkg.maxPersons} people`
                    }
                  </span>
                </div>
                
                {pkg.startDate && pkg.endDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>
                      {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              
              {pkg.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Package Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">
                          <strong>{feature.featureName}:</strong> {feature.featureValue}
                        </span>
                      </div>
                    ))}
                    {pkg.features.length > 3 && (
                      <div className="text-sm text-amber-600 font-medium">
                        + {pkg.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {pkg.inclusions.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Whats Included:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm border border-purple-200"
                      >
                        {inclusion.inclusionName}
                      </span>
                    ))}
                    {pkg.inclusions.length > 4 && (
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200">
                        +{pkg.inclusions.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Book Package
                </button>
                <button className="px-4 py-3 border border-amber-500 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {packages.length > 2 && (
        <div className="mt-6 text-center">
          <button className="text-amber-600 hover:text-amber-700 font-semibold underline">
            View All Packages ({packages.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelPackages;