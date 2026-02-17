// components/hotel/HotelHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail, Anchor } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface HotelHeaderProps {
  hotel: ServiceProviderDetails;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({ hotel }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-[#2A6F97]/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A6F97]/5 rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#54A5CC]/5 rounded-full -ml-8 -mb-8"></div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="px-3 py-1 bg-[#2A6F97]/10 text-[#1D4F6E] rounded-full text-sm font-semibold border border-[#2A6F97]/20">
              <Anchor className="w-3 h-3 inline mr-1" />
              Luxury Hotel
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < hotel.starRating 
                      ? 'fill-[#2A6F97] text-[#2A6F97]' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1D4F6E] mb-2">
            {hotel.name}
          </h1>
          
          <div className="flex flex-wrap gap-3 text-[#3F8AB2]">
            <div className="flex items-center gap-1 bg-[#F0F7FF] px-3 py-1 rounded-full border border-[#2A6F97]/10">
              <MapPin className="w-4 h-4 text-[#2A6F97]" />
              <span className="text-sm text-[#1D4F6E]">{hotel.address}</span>
            </div>
            <div className="flex items-center gap-1 bg-[#F0F7FF] px-3 py-1 rounded-full border border-[#2A6F97]/10">
              <Phone className="w-4 h-4 text-[#2A6F97]" />
              <span className="text-sm text-[#1D4F6E]">{hotel.contactNumber}</span>
            </div>
            {hotel.websiteUrl && (
              <div className="flex items-center gap-1 bg-[#F0F7FF] px-3 py-1 rounded-full border border-[#2A6F97]/10 hover:bg-[#2A6F97]/10 transition-colors">
                <Globe className="w-4 h-4 text-[#2A6F97]" />
                <a 
                  href={hotel.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#1D4F6E] hover:text-[#2A6F97]"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FA] border border-[#2A6F97]/20 rounded-xl p-4 min-w-[200px] shadow-md">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#2A6F97]">
              {hotel.checkInTime} - {hotel.checkOutTime}
            </div>
            <div className="text-sm text-[#3F8AB2] mt-1">Check-in / Check-out</div>
            <div className="text-xs text-[#54A5CC] mt-1">Flexible timing available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;