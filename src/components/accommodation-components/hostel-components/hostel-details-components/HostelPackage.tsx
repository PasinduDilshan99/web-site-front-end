// components/hostel/HostelPackages.tsx
import React from 'react';
import { Calendar, Users, Clock, Star, CheckCircle, Bed, MapPin, Globe } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hostel Packages & Deals</h2>
          <p className="text-gray-600 mt-1">Special offers for solo travelers and groups</p>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <Star className="w-5 h-5" />
          <span className="font-semibold">Best Value for Budget Travelers</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.serviceProviderPackageId}
            className="border-2 border-blue-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:translate-y-[-2px]"
          >
            {/* Package Header with Badges */}
            <div className="relative p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{pkg.packageName}</h3>
                {pkg.packageCategory && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {pkg.packageCategory}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {pkg.discountPercentage && pkg.discountPercentage > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {pkg.discountPercentage}% OFF
                  </span>
                )}
                {pkg.isCustomizable && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Customizable
                  </span>
                )}
                {pkg.seasonType && (
                  <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-semibold">
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
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.packageDescription}</p>
              
              {/* Price Section */}
              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(pkg.localPrice, pkg.currencyCode)}
                  </div>
                  {pkg.foreignPrice && pkg.foreignPrice !== pkg.localPrice && (
                    <div className="text-sm text-gray-500">
                      ~{formatPrice(pkg.foreignPrice, 'USD')}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500">total for {pkg.durationDays} nights</div>
              </div>
              
              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span>{pkg.durationDays} Nights</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Users className="w-3 h-3 text-blue-600" />
                  <span>
                    {pkg.minPersons === pkg.maxPersons 
                      ? `${pkg.minPersons} ${pkg.minPersons > 1 ? 'People' : 'Person'}`
                      : `${pkg.minPersons}-${pkg.maxPersons} People`
                    }
                  </span>
                </div>
                
                {pkg.includesChildren && (
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Bed className="w-3 h-3 text-green-600" />
                    <span>Kids {pkg.maxChildrenIncluded ? `(${pkg.maxChildrenIncluded} max)` : 'Included'}</span>
                  </div>
                )}
                
                {pkg.advanceBookingDays && (
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Calendar className="w-3 h-3 text-purple-600" />
                    <span>Book {pkg.advanceBookingDays} days ahead</span>
                  </div>
                )}
              </div>
              
              {/* Date Range */}
              {pkg.startDate && pkg.endDate && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-blue-700">
                    <Calendar className="w-3 h-3" />
                    <span>Available:</span>
                  </div>
                  <div className="text-xs text-gray-700 mt-1">
                    {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}
                  </div>
                </div>
              )}
              
              {/* Quick Features */}
              {pkg.features.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-800 mb-2">Features:</div>
                  <div className="space-y-1">
                    {pkg.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-700 truncate">
                          {feature.featureName}
                        </span>
                      </div>
                    ))}
                    {pkg.features.length > 2 && (
                      <div className="text-xs text-blue-600 font-medium">
                        + {pkg.features.length - 2} more features
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Inclusions */}
              {pkg.inclusions.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-800 mb-2">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {pkg.inclusions.slice(0, 3).map((inclusion, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-200"
                      >
                        {inclusion.inclusionName}
                      </span>
                    ))}
                    {pkg.inclusions.length > 3 && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200">
                        +{pkg.inclusions.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Highlights */}
              {pkg.highlights && (
                <div className="mb-4 p-3 bg-amber-50 rounded-lg">
                  <div className="text-xs font-semibold text-amber-800 mb-1">Highlights</div>
                  <div className="text-xs text-amber-700 line-clamp-2">{pkg.highlights}</div>
                </div>
              )}
              
              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200">
                  Book Now
                </button>
                <button className="px-3 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors duration-200">
                  Details
                </button>
              </div>
              
              {/* Policy Info */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  {pkg.cancellationPolicy && (
                    <span className="truncate">{pkg.cancellationPolicy}</span>
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
          <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold py-2 px-6 border-2 border-blue-600 hover:border-blue-700 rounded-full transition-colors duration-200">
            <Globe className="w-4 h-4" />
            View All Packages ({packages.length})
          </button>
        </div>
      )}
      
      {/* Empty State */}
      {packages.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Bed className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Packages Available</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Check back later for special hostel packages and deals for solo travelers, groups, and budget adventures.
          </p>
        </div>
      )}
    </div>
  );
};

export default HostelPackages;