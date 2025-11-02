// components/villa/VillaHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail, Home } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface VillaHeaderProps {
  villa: ServiceProviderDetails;
}

const VillaHeader: React.FC<VillaHeaderProps> = ({ villa }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-200">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {villa.name}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < villa.starRating 
                      ? 'fill-emerald-500 text-emerald-500' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-emerald-600">
              Luxury {villa.starRating} Star Villa
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span className="font-medium">{villa.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-teal-600" />
              <span>{villa.contactNumber}</span>
            </div>
            {villa.websiteUrl && (
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-600" />
                <a 
                  href={villa.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 min-w-[220px] text-white shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {villa.checkInTime} - {villa.checkOutTime}
            </div>
            <div className="text-sm opacity-90 mt-1">Check-in / Check-out</div>
            <div className="text-xs opacity-75 mt-2">Flexible timing available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaHeader;