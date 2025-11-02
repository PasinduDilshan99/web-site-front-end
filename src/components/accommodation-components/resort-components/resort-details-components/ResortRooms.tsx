// components/resort/ResortRooms.tsx
import React from 'react';
import { Users, Square, Wifi, Car, Coffee, Waves, Bed, Eye } from 'lucide-react';
import { RoomDetails } from '@/types/accommodations-types/service-provider-types';

interface ResortRoomsProps {
  rooms: RoomDetails[];
}

const ResortRooms: React.FC<ResortRoomsProps> = ({ rooms }) => {
  if (!rooms.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center border border-teal-200">
        <Waves className="w-16 h-16 text-teal-400 mx-auto mb-4" />
        <div className="text-2xl font-bold text-gray-900 mb-2">Luxury Accommodations</div>
        <div className="text-gray-600">Room information coming soon</div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-teal-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Luxury Rooms & Suites
        </h2>
        <div className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full">
          <Bed className="w-5 h-5" />
          <span className="font-semibold">{rooms.length} Options</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {rooms.map((room) => (
          <div key={room.roomId} className="border-2 border-teal-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-blue-50/50">
            <div className="flex flex-col lg:flex-row gap-8">
              {room.images.length > 0 && (
                <div className="lg:w-2/5">
                  <div className="relative group">
                    <img
                      src={room.images[0].roomImageUrl}
                      alt={room.images[0].roomImageName}
                      className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {room.roomTypeName}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                      <div className="text-xl font-bold">${room.localPricePerNight}</div>
                      <div className="text-xs opacity-90">per night</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.roomTypeName}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{room.roomDescription}</p>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="text-3xl font-bold text-teal-600">
                      ${room.localPricePerNight}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                    {room.discountPercentage && room.discountPercentage > 0 && (
                      <div className="text-sm text-amber-600 font-semibold mt-1">
                        Save {room.discountPercentage}%
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-200">
                    <Users className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="text-sm text-gray-600">Capacity</div>
                      <div className="font-semibold text-gray-800">{room.capacity} guests</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <Square className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Size</div>
                      <div className="font-semibold text-gray-800">{room.roomSize} m²</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-200">
                    <Bed className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="text-sm text-gray-600">Bed</div>
                      <div className="font-semibold text-gray-800">{room.bedType}</div>
                    </div>
                  </div>
                  
                  {room.wifiAvailable && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <Wifi className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-600">WiFi</div>
                        <div className="font-semibold text-gray-800">Free</div>
                      </div>
                    </div>
                  )}
                </div>
                
                {room.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Room Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.features.slice(0, 6).map((feature, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-teal-100 to-blue-100 text-teal-800 rounded-full text-sm font-medium border border-teal-200 shadow-sm"
                        >
                          {feature.featureValue}
                        </span>
                      ))}
                      {room.features.length > 6 && (
                        <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200">
                          +{room.features.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Book This Room
                  </button>
                  <button className="px-8 py-4 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {rooms.length > 3 && (
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            View All {rooms.length} Room Options
          </button>
        </div>
      )}
    </div>
  );
};

export default ResortRooms;