// components/resort/ResortHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail, Waves, Umbrella } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface ResortHeaderProps {
  resort: ServiceProviderDetails;
}

const ResortHeader: React.FC<ResortHeaderProps> = ({ resort }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-teal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
                <Waves className="w-4 h-4" />
                <span className="text-sm font-medium">Luxury Resort</span>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < resort.starRating 
                        ? 'fill-teal-500 text-teal-500' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              {resort.name}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                <span className="font-medium">{resort.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-teal-600" />
                <span>{resort.contactNumber}</span>
              </div>
              {resort.websiteUrl && (
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-600" />
                  <a 
                    href={resort.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-2xl p-6 min-w-[280px] shadow-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Umbrella className="w-6 h-6" />
                <span className="text-lg font-semibold">Resort Hours</span>
              </div>
              <div className="text-2xl font-bold">
                {resort.checkInTime} - {resort.checkOutTime}
              </div>
              <div className="text-sm opacity-90 mt-1">Check-in / Check-out</div>
              <div className="text-xs opacity-75 mt-2">24/7 Reception Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortHeader;