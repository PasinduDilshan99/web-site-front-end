// components/hostel/HostelHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail, Users, Coffee, Wifi } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface HostelHeaderProps {
  hostel: ServiceProviderDetails | null;
}

const HostelHeader: React.FC<HostelHeaderProps> = ({ hostel }) => {
  // Return null or loading state if hostel is null
  if (!hostel) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-[#B5E5D4]">
        <div className="animate-pulse">
          <div className="h-6 bg-[#B5E5D4] rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-[#C9EFE3] rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-[#DDF9F2] rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-[#B5E5D4] relative overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#B5E5D4]/10 rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DDF9F2]/20 rounded-full -ml-8 -mb-8"></div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="px-3 py-1 bg-[#F5FDFA] text-[#2D4F43] rounded-full text-sm font-semibold border border-[#B5E5D4]">
              🏕️ Adventure Hostel
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < (hostel.starRating || 0)
                      ? 'fill-[#B5E5D4] text-[#B5E5D4]' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-[#2D4F43] mb-2">
            {hostel.name || 'Hostel Name Not Available'}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-[#5A8F7A]">
            {hostel.address && (
              <div className="flex items-center gap-1 bg-[#F5FDFA] px-3 py-1 rounded-full border border-[#B5E5D4]">
                <MapPin className="w-4 h-4 text-[#3A9B9B]" />
                <span className="text-sm">{hostel.address}</span>
              </div>
            )}
            {hostel.contactNumber && (
              <div className="flex items-center gap-1 bg-[#F5FDFA] px-3 py-1 rounded-full border border-[#B5E5D4]">
                <Phone className="w-4 h-4 text-[#3A9B9B]" />
                <span className="text-sm">{hostel.contactNumber}</span>
              </div>
            )}
            {hostel.email && (
              <div className="flex items-center gap-1 bg-[#F5FDFA] px-3 py-1 rounded-full border border-[#B5E5D4]">
                <Mail className="w-4 h-4 text-[#3A9B9B]" />
                <span className="text-sm">{hostel.email}</span>
              </div>
            )}
            {hostel.websiteUrl && (
              <div className="flex items-center gap-1 bg-[#F5FDFA] px-3 py-1 rounded-full border border-[#B5E5D4] hover:bg-[#B5E5D4]/20 transition-colors">
                <Globe className="w-4 h-4 text-[#3A9B9B]" />
                <a 
                  href={hostel.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#2D4F43] hover:text-[#3A9B9B] text-sm"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        {(hostel.checkInTime || hostel.checkOutTime) && (
          <div className="bg-gradient-to-r from-[#F5FDFA] to-[#FAFFFD] border border-[#B5E5D4] rounded-xl p-4 min-w-[200px]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2D4F43]">
                {hostel.checkInTime || 'N/A'} - {hostel.checkOutTime || 'N/A'}
              </div>
              <div className="text-sm text-[#5A8F7A] mt-1">Check-in / Check-out</div>
              <div className="text-xs text-[#5A8F7A] mt-1">Flexible for travelers</div>
            </div>
          </div>
        )}
      </div>

      {/* Hostel Specific Features */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4] hover:shadow-md transition-all">
          <Users className="w-6 h-6 text-[#3A9B9B] mx-auto mb-2" />
          <div className="text-sm font-semibold text-[#2D4F43]">Social Atmosphere</div>
        </div>
        <div className="text-center p-3 bg-[#F5FDFA] rounded-xl border border-[#C9EFE3] hover:shadow-md transition-all">
          <Coffee className="w-6 h-6 text-[#3A9B9B] mx-auto mb-2" />
          <div className="text-sm font-semibold text-[#2D4F43]">Common Areas</div>
        </div>
        {hostel.wifiAvailable && (
          <div className="text-center p-3 bg-[#F5FDFA] rounded-xl border border-[#DDF9F2] hover:shadow-md transition-all">
            <Wifi className="w-6 h-6 text-[#3A9B9B] mx-auto mb-2" />
            <div className="text-sm font-semibold text-[#2D4F43]">Free WiFi</div>
          </div>
        )}
        {hostel.petFriendly && (
          <div className="text-center p-3 bg-[#F5FDFA] rounded-xl border border-[#B5E5D4] hover:shadow-md transition-all">
            <div className="w-6 h-6 text-[#3A9B9B] mx-auto mb-2">🐾</div>
            <div className="text-sm font-semibold text-[#2D4F43]">Pet Friendly</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelHeader;