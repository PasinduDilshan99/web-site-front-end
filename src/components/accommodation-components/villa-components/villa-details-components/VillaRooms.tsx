// components/villa/VillaRooms.tsx
import React from 'react';
import { Users, Square, Wifi, Car, Coffee, Bath, Bed, Eye, Leaf } from 'lucide-react';
import { RoomDetails } from '@/types/accommodations-types/service-provider-types';

interface VillaRoomsProps {
  rooms: RoomDetails[];
}

const VillaRooms: React.FC<VillaRoomsProps> = ({ rooms }) => {
  if (!rooms.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-[#1B4D3E]/10">
        <Bed className="w-16 h-16 text-[#1B4D3E]/30 mx-auto mb-4" />
        <div className="text-[#1B4D3E] text-lg font-medium">No room information available</div>
        <p className="text-[#2E6B5C] text-sm mt-2">Room details will be updated soon</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#1B4D3E]/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-[#1B4D3E] to-[#428577] rounded-xl">
          <Bed className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#1B4D3E]">Private Suites</h2>
      </div>
      
      <div className="space-y-8">
        {rooms.map((room) => (
          <div key={room.roomId} className="border border-[#1B4D3E]/10 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 hover:border-[#428577]/30 group bg-white">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Room Images */}
              {room.images.length > 0 && (
                <div className="lg:w-2/5">
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={room.images[0].roomImageUrl}
                      alt={room.images[0].roomImageName}
                      className="w-full h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-[#1B4D3E] to-[#428577] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {room.roomTypeName}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button className="bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                        <Eye className="w-5 h-5 text-[#1B4D3E]" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Room Details */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1B4D3E] mb-2 group-hover:text-[#428577] transition-colors">
                      {room.roomTypeName}
                    </h3>
                    <p className="text-[#2E6B5C] text-lg leading-relaxed">{room.roomDescription}</p>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#1B4D3E] to-[#428577] bg-clip-text text-transparent">
                      ${room.localPricePerNight}
                    </div>
                    <div className="text-sm text-[#2E6B5C]">per night</div>
                    {room.discountPercentage && room.discountPercentage > 0 && (
                      <div className="text-sm text-[#428577] font-semibold mt-1">
                        Save {room.discountPercentage}%
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Room Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-[#E8F3EF] rounded-lg">
                    <Users className="w-5 h-5 text-[#1B4D3E]" />
                    <div>
                      <div className="font-semibold text-[#1B4D3E]">{room.capacity}</div>
                      <div className="text-xs text-[#2E6B5C]">Guests</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-[#E8F3EF] rounded-lg">
                    <Square className="w-5 h-5 text-[#428577]" />
                    <div>
                      <div className="font-semibold text-[#1B4D3E]">{room.roomSize} m²</div>
                      <div className="text-xs text-[#2E6B5C]">Size</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-[#E8F3EF] rounded-lg">
                    <Bed className="w-5 h-5 text-[#1B4D3E]" />
                    <div>
                      <div className="font-semibold text-[#1B4D3E]">{room.bedType}</div>
                      <div className="text-xs text-[#2E6B5C]">Bed</div>
                    </div>
                  </div>
                  
                  {room.hasAirConditioning && (
                    <div className="flex items-center gap-3 p-3 bg-[#E8F3EF] rounded-lg">
                      <div className="w-5 h-5 text-[#428577] font-bold text-center">AC</div>
                      <div className="text-xs text-[#2E6B5C]">Climate Control</div>
                    </div>
                  )}
                </div>
                
                {/* Room Amenities */}
                {room.amenities.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#1B4D3E] mb-3">Suite Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 6).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-[#E8F3EF] to-[#F0F9F5] text-[#1B4D3E] rounded-full text-sm border border-[#1B4D3E]/10 font-medium"
                        >
                          {amenity.amenityName}
                        </span>
                      ))}
                      {room.amenities.length > 6 && (
                        <span className="px-4 py-2 bg-gray-100 text-[#2E6B5C] rounded-full text-sm border border-gray-200">
                          +{room.amenities.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-gradient-to-r from-[#1B4D3E] to-[#428577] hover:from-[#0F3A2E] hover:to-[#2E6B5C] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Book This Suite
                  </button>
                  <button className="px-6 py-4 border-2 border-[#1B4D3E]/20 text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white rounded-xl transition-all duration-300 font-semibold">
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