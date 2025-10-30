// components/hotel/HotelLocation.tsx
import React from 'react';
import { MapPin, Navigation, Car, Train, Plane, Clock, Star } from 'lucide-react';
import { NearbyDestination, ServiceProviderDetails } from '@/types/accommodations-types/service-provider-types';

interface HotelLocationProps {
  hotel: ServiceProviderDetails;
  nearbyDestinations: NearbyDestination[];
}

const HotelLocation: React.FC<HotelLocationProps> = ({ hotel, nearbyDestinations }) => {
  // Mock transportation data - you can replace with actual data
  const transportation = [
    { type: 'Airport', distance: '25 km', time: '30 min', icon: Plane },
    { type: 'Train Station', distance: '5 km', time: '10 min', icon: Train },
    { type: 'City Center', distance: '3 km', time: '8 min', icon: Car },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
      
      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-6 h-6 text-amber-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
            <p className="text-gray-600 leading-relaxed">{hotel.address}</p>
          </div>
        </div>
        
        <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <Navigation className="w-5 h-5" />
          Get Directions
        </button>
      </div>
      
      {/* Transportation Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Getting Here</h3>
        <div className="space-y-3">
          {transportation.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-800">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{item.distance}</div>
                <div className="text-xs text-gray-500">{item.time} drive</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Nearby Destinations Section */}
      {nearbyDestinations.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Nearby Attractions</h3>
          <div className="space-y-3">
            {nearbyDestinations.slice(0, 4).map((destination) => (
              <div 
                key={destination.destinationId}
                className="p-3 bg-amber-50 rounded-lg border border-amber-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-amber-800">{destination.name}</h4>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {destination.destinationCategory}
                  </span>
                </div>
                
                <p className="text-sm text-amber-700 mb-3 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-amber-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{destination.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Nearby</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {nearbyDestinations.length > 4 && (
            <button className="w-full mt-4 text-center text-amber-600 hover:text-amber-700 font-medium text-sm">
              View All {nearbyDestinations.length} Nearby Places
            </button>
          )}
        </div>
      )}
      
      {/* Map Placeholder */}
      <div className="mt-6">
        <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
          <div className="text-center text-gray-500">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-amber-500" />
            <p className="text-sm">Interactive Map</p>
            <p className="text-xs">Location: {hotel.address.split(',')[0]}</p>
          </div>
          
          {/* Simple map markers */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-amber-500 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-amber-500 rounded-full absolute top-0 left-0 opacity-75 animate-ping"></div>
            </div>
          </div>
          
          {/* Nearby destination markers */}
          {nearbyDestinations.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 bg-purple-500 rounded-full"
              style={{
                top: `${30 + index * 20}%`,
                left: `${40 + index * 15}%`,
              }}
            ></div>
          ))}
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">
            Perfect location for exploring {nearbyDestinations.length > 0 ? nearbyDestinations[0].location : 'the area'}
          </p>
        </div>
      </div>
      
      {/* Location Highlights */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
          <Star className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <div className="text-xs text-purple-700">Prime Location</div>
        </div>
        <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
          <Navigation className="w-5 h-5 text-amber-600 mx-auto mb-1" />
          <div className="text-xs text-amber-700">Easy Access</div>
        </div>
      </div>
    </div>
  );
};

export default HotelLocation;