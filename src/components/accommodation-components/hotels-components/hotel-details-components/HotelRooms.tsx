// components/hotel/HotelRooms.tsx
import React from 'react';
import { Users, Square, Wifi, Car, Coffee } from 'lucide-react';
import { RoomDetails } from '@/types/accommodations-types/service-provider-types';

interface HotelRoomsProps {
  rooms: RoomDetails[];
}

const HotelRooms: React.FC<HotelRoomsProps> = ({ rooms }) => {
  if (!rooms.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Rooms & Suites</h2>
      
      <div className="space-y-6">
        {rooms.map((room) => (
          <div key={room.roomId} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              {room.images.length > 0 && (
                <div className="lg:w-1/3">
                  <img
                    src={room.images[0].roomImageUrl}
                    alt={room.images[0].roomImageName}
                    className="w-full h-48 lg:h-full object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{room.roomTypeName}</h3>
                    <p className="text-gray-600 mt-1">{room.roomDescription}</p>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="text-2xl font-bold text-amber-600">
                      ${room.localPricePerNight}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">{room.capacity} guests</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">{room.roomSize} m²</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{room.bedType} bed</span>
                  </div>
                  
                  {room.wifiAvailable && (
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">WiFi</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200"
                    >
                      {amenity.amenityName}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm border border-purple-200">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
                
                <button className="mt-4 w-full lg:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelRooms;