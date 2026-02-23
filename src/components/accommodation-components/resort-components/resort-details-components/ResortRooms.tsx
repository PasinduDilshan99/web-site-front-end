// components/resort/ResortRooms.tsx
import React from 'react';
import { Users, Square, Wifi, Waves, Bed, Eye, Anchor } from 'lucide-react';
import { RoomDetails } from '@/types/accommodations-types/service-provider-types';

interface ResortRoomsProps {
  rooms: RoomDetails[];
}

const ResortRooms: React.FC<ResortRoomsProps> = ({ rooms }) => {
  if (!rooms.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-[#0A2F44]/10">
        <Waves className="w-16 h-16 text-[#0A2F44]/30 mx-auto mb-4" />
        <div className="text-2xl font-bold text-[#0A2F44] mb-2">Luxury Accommodations</div>
        <div className="text-[#144A5E]">Room information coming soon</div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#0A2F44]/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] rounded-xl">
            <Bed className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#0A2F44]">Luxury Rooms & Suites</h2>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] text-white px-4 py-2 rounded-full">
          <Anchor className="w-5 h-5" />
          <span className="font-semibold">{rooms.length} Oceanfront Options</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {rooms.map((room) => (
          <div key={room.roomId} className="border border-[#0A2F44]/10 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-[#F0F7FA] hover:border-[#1F5F72]/30">
            <div className="flex flex-col lg:flex-row gap-8">
              {room.images.length > 0 && (
                <div className="lg:w-2/5">
                  <div className="relative group overflow-hidden rounded-xl">
                    <img
                      src={room.images[0].roomImageUrl}
                      alt={room.images[0].roomImageName}
                      className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
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
                    <h3 className="text-2xl font-bold text-[#0A2F44] mb-2">{room.roomTypeName}</h3>
                    <p className="text-[#144A5E] text-lg leading-relaxed">{room.roomDescription}</p>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="text-3xl font-bold text-[#1F5F72]">
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
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10">
                    <Users className="w-5 h-5 text-[#0A2F44]" />
                    <div>
                      <div className="text-sm text-[#144A5E]">Capacity</div>
                      <div className="font-semibold text-[#0A2F44]">{room.capacity} guests</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10">
                    <Square className="w-5 h-5 text-[#144A5E]" />
                    <div>
                      <div className="text-sm text-[#144A5E]">Size</div>
                      <div className="font-semibold text-[#0A2F44]">{room.roomSize} m²</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] rounded-xl border border-[#0A2F44]/10">
                    <Bed className="w-5 h-5 text-[#1F5F72]" />
                    <div>
                      <div className="text-sm text-[#144A5E]">Bed</div>
                      <div className="font-semibold text-[#0A2F44]">{room.bedType}</div>
                    </div>
                  </div>
                </div>
                
                {room.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0A2F44] mb-3 text-lg">Room Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.features.slice(0, 6).map((feature, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-[#E6F0F5] to-[#F0F7FA] text-[#0A2F44] rounded-full text-sm font-medium border border-[#0A2F44]/10 shadow-sm"
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
                  <button className="flex-1 bg-gradient-to-r from-[#0A2F44] via-[#144A5E] to-[#1F5F72] hover:from-[#052230] hover:to-[#0A2F44] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Book This Room
                  </button>
                  <button className="px-8 py-4 border-2 border-[#0A2F44]/20 text-[#0A2F44] hover:bg-[#0A2F44] hover:text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
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
          <button className="bg-gradient-to-r from-[#0A2F44] to-[#1F5F72] hover:from-[#052230] hover:to-[#144A5E] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            View All {rooms.length} Room Options
          </button>
        </div>
      )}
    </div>
  );
};

export default ResortRooms;