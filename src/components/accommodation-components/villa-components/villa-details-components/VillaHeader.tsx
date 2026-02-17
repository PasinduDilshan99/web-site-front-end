// components/villa/VillaHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail, Home, Leaf } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface VillaHeaderProps {
  villa: ServiceProviderDetails;
}

const VillaHeader: React.FC<VillaHeaderProps> = ({ villa }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#1B4D3E]/10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B4D3E]/5 rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#428577]/5 rounded-full -ml-8 -mb-8"></div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-xl">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#1B4D3E]">
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
                      ? 'fill-[#428577] text-[#428577]' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-[#1B4D3E] to-[#428577] bg-clip-text text-transparent">
              Luxury {villa.starRating} Star Villa
            </span>
            <span className="px-3 py-1 bg-[#1B4D3E]/10 text-[#1B4D3E] rounded-full text-xs font-medium border border-[#1B4D3E]/20">
              Exclusive Retreat
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-2 bg-[#E8F3EF] px-3 py-1.5 rounded-lg">
              <MapPin className="w-5 h-5 text-[#1B4D3E]" />
              <span className="font-medium">{villa.address}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#E8F3EF] px-3 py-1.5 rounded-lg">
              <Phone className="w-5 h-5 text-[#1B4D3E]" />
              <span>{villa.contactNumber}</span>
            </div>
            {villa.websiteUrl && (
              <div className="flex items-center gap-2 bg-[#E8F3EF] px-3 py-1.5 rounded-lg hover:bg-[#1B4D3E]/10 transition-colors">
                <Globe className="w-5 h-5 text-[#1B4D3E]" />
                <a 
                  href={villa.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#1B4D3E] hover:text-[#428577] underline font-medium transition-colors"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-2xl p-6 min-w-[220px] text-white shadow-lg relative overflow-hidden">
          {/* Decorative Leaf */}
          <Leaf className="absolute top-2 right-2 w-12 h-12 text-white/10" />
          
          <div className="text-center relative z-10">
            <div className="text-2xl font-bold">
              {villa.checkInTime} - {villa.checkOutTime}
            </div>
            <div className="text-sm opacity-90 mt-1">Check-in / Check-out</div>
            <div className="text-xs opacity-75 mt-2 flex items-center justify-center gap-1">
              <span className="w-1 h-1 bg-white rounded-full"></span>
              Flexible timing available
              <span className="w-1 h-1 bg-white rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaHeader;