// components/villa/VillaRooms.tsx
import React from 'react';
import { Users, Square, Wifi, Car, Coffee, Bath, Bed, Eye } from 'lucide-react';
import { RoomDetails } from '@/types/accommodations-types/service-provider-types';

interface VillaRoomsProps {
  rooms: RoomDetails[];
}

const VillaRooms: React.FC<VillaRoomsProps> = ({ rooms }) => {
  if (!rooms.length) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-emerald-200">
        <div className="text-gray-400 text-lg">No room information available</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-200">
      <div className="flex items-center gap-3 mb-8">
        <Bed className="w-7 h-7 text-emerald-600" />
        <h2 className="text-3xl font-bold text-gray-900">Luxury Accommodations</h2>
      </div>
      
      <div className="space-y-8">
        {rooms.map((room) => (
          <div key={room.roomId} className="border-2 border-emerald-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-emerald-300 group">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Room Images */}
              {room.images.length > 0 && (
                <div className="lg:w-2/5">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={room.images[0].roomImageUrl}
                      alt={room.images[0].roomImageName}
                      className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {room.roomTypeName}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all">
                        <Eye className="w-5 h-5 text-emerald-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Room Details */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.roomTypeName}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{room.roomDescription}</p>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ${room.localPricePerNight}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                    {room.discountPercentage && room.discountPercentage > 0 && (
                      <div className="text-sm text-emerald-600 font-semibold mt-1">
                        Save {room.discountPercentage}%
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Room Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-gray-800">{room.capacity}</div>
                      <div className="text-xs text-gray-600">Guests</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                    <Square className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="font-semibold text-gray-800">{room.roomSize} m²</div>
                      <div className="text-xs text-gray-600">Size</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <Bed className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-gray-800">{room.bedType}</div>
                      <div className="text-xs text-gray-600">Bed</div>
                    </div>
                  </div>
                  
                  {room.hasAirConditioning && (
                    <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                      <div className="w-5 h-5 text-teal-600 font-bold text-center">AC</div>
                      <div className="text-xs text-gray-600">Air Conditioned</div>
                    </div>
                  )}
                </div>
                
                {/* Room Amenities */}
                {room.amenities.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Room Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 6).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm border border-emerald-200 font-medium"
                        >
                          {amenity.amenityName}
                        </span>
                      ))}
                      {room.amenities.length > 6 && (
                        <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm border border-gray-300">
                          +{room.amenities.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                    Book This Room
                  </button>
                  <button className="px-6 py-4 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VillaRooms;