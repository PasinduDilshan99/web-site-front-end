// components/resort/ResortHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Waves, Anchor } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface ResortHeaderProps {
  resort: ServiceProviderDetails;
}

const ResortHeader: React.FC<ResortHeaderProps> = ({ resort }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-[#0A2F44]/10 relative overflow-hidden">
      {/* Wave Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="header-wave" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q15 5 30 10 T60 10" stroke="#0A2F44" fill="none" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#header-wave)"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#0A2F44] to-[#144A5E] text-white px-3 py-1.5 rounded-full">
                <Waves className="w-4 h-4" />
                <span className="text-sm font-medium">Ultra-Luxury Resort</span>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < resort.starRating 
                        ? 'fill-[#1F5F72] text-[#1F5F72]' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] bg-clip-text text-transparent">
              {resort.name}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2 bg-[#E6F0F5] px-3 py-1.5 rounded-lg">
                <MapPin className="w-5 h-5 text-[#0A2F44]" />
                <span className="font-medium">{resort.address}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#E6F0F5] px-3 py-1.5 rounded-lg">
                <Phone className="w-5 h-5 text-[#0A2F44]" />
                <span>{resort.contactNumber}</span>
              </div>
              {resort.websiteUrl && (
                <div className="flex items-center gap-2 bg-[#E6F0F5] px-3 py-1.5 rounded-lg hover:bg-[#0A2F44]/10 transition-colors">
                  <Globe className="w-5 h-5 text-[#0A2F44]" />
                  <a 
                    href={resort.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0A2F44] hover:text-[#1F5F72] underline font-medium"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#0A2F44] via-[#144A5E] to-[#1F5F72] text-white rounded-2xl p-6 min-w-[280px] shadow-xl relative overflow-hidden">
            {/* Decorative Anchor */}
            <Anchor className="absolute top-2 right-2 w-12 h-12 text-white/10" />
            
            <div className="text-center relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Waves className="w-6 h-6" />
                <span className="text-lg font-semibold">Resort Hours</span>
              </div>
              <div className="text-2xl font-bold">
                {resort.checkInTime} - {resort.checkOutTime}
              </div>
              <div className="text-sm opacity-90 mt-1">Check-in / Check-out</div>
              <div className="text-xs opacity-75 mt-2 flex items-center justify-center gap-1">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                24/7 Concierge Service
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortHeader;