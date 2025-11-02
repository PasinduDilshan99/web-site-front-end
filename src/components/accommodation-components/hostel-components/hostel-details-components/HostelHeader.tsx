// components/hostel/HostelHeader.tsx
import React from 'react';
import { Star, MapPin, Globe, Phone, Mail, Users, Coffee } from 'lucide-react';
import { ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface HostelHeaderProps {
  hostel: ServiceProviderDetails | null;
}

const HostelHeader: React.FC<HostelHeaderProps> = ({ hostel }) => {
  // Return null or loading state if hostel is null
  if (!hostel) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
              Hostel
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < (hostel.starRating || 0)
                      ? 'fill-blue-500 text-blue-500' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {hostel.name || 'Hostel Name Not Available'}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
            {hostel.address && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>{hostel.address}</span>
              </div>
            )}
            {hostel.contactNumber && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>{hostel.contactNumber}</span>
              </div>
            )}
            {hostel.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>{hostel.email}</span>
              </div>
            )}
            {hostel.websiteUrl && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-indigo-600" />
                <a 
                  href={hostel.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        {(hostel.checkInTime || hostel.checkOutTime) && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 min-w-[200px]">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {hostel.checkInTime || 'N/A'} - {hostel.checkOutTime || 'N/A'}
              </div>
              <div className="text-sm text-gray-600 mt-1">Check-in / Check-out</div>
            </div>
          </div>
        )}
      </div>

      {/* Hostel Specific Features */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-indigo-700">Social Atmosphere</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Coffee className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-blue-700">Common Areas</div>
        </div>
        {hostel.wifiAvailable && (
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="w-6 h-6 text-green-600 mx-auto mb-2">📶</div>
            <div className="text-sm font-semibold text-green-700">Free WiFi</div>
          </div>
        )}
        {hostel.petFriendly && (
          <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="w-6 h-6 text-amber-600 mx-auto mb-2">🐾</div>
            <div className="text-sm font-semibold text-amber-700">Pet Friendly</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelHeader;