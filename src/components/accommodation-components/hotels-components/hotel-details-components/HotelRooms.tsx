// components/hotel/HotelRooms.tsx
import React from 'react';
import { Users, Square, Wifi, Car, Coffee, Bed } from 'lucide-react';
import { RoomDetails } from '@/types/accommodations-types/service-provider-types';

interface HotelRoomsProps {
  rooms: RoomDetails[];
}

const HotelRooms: React.FC<HotelRoomsProps> = ({ rooms }) => {
  if (!rooms.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {rooms.map((room) => (
        <div key={room.roomId} className="border border-[#2A6F97]/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-[#F0F7FF]">
          <div className="flex flex-col lg:flex-row gap-6">
            {room.images.length > 0 && (
              <div className="lg:w-1/3">
                <img
                  src={room.images[0].roomImageUrl}
                  alt={room.images[0].roomImageName}
                  className="w-full h-48 lg:h-full object-cover rounded-lg border border-[#2A6F97]/10"
                />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#1D4F6E]">{room.roomTypeName}</h3>
                  <p className="text-[#3F8AB2] mt-1">{room.roomDescription}</p>
                </div>
                
                <div className="mt-4 lg:mt-0 text-right">
                  <div className="text-2xl font-bold text-[#2A6F97]">
                    ${room.localPricePerNight}
                  </div>
                  <div className="text-sm text-[#54A5CC]">per night</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center gap-2 p-2 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10">
                  <Users className="w-4 h-4 text-[#2A6F97]" />
                  <span className="text-sm text-[#1D4F6E]">{room.capacity} guests</span>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10">
                  <Square className="w-4 h-4 text-[#2A6F97]" />
                  <span className="text-sm text-[#1D4F6E]">{room.roomSize} m²</span>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10">
                  <Bed className="w-4 h-4 text-[#2A6F97]" />
                  <span className="text-sm text-[#1D4F6E]">{room.bedType}</span>
                </div>
                
                {room.hasAirConditioning && (
                  <div className="flex items-center gap-2 p-2 bg-[#F0F7FF] rounded-lg border border-[#2A6F97]/10">
                    <div className="w-4 h-4 text-[#2A6F97] font-bold text-center">AC</div>
                    <span className="text-sm text-[#1D4F6E]">Climate Control</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {room.amenities.slice(0, 4).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#F0F7FF] text-[#1D4F6E] rounded-full text-sm border border-[#2A6F97]/10"
                  >
                    {amenity.amenityName}
                  </span>
                ))}
                {room.amenities.length > 4 && (
                  <span className="px-3 py-1 bg-[#E6F0FA] text-[#1D4F6E] rounded-full text-sm border border-[#3F8AB2]/20">
                    +{room.amenities.length - 4} more
                  </span>
                )}
              </div>
              
              <button className="mt-2 w-full lg:w-auto bg-gradient-to-r from-[#2A6F97] to-[#54A5CC] hover:from-[#1D4F6E] hover:to-[#3F8AB2] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelRooms;