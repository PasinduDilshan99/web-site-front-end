// components/hostel/HostelRooms.tsx
import React from 'react';
import { Users, Square, Wifi, Users2, Bed, Lock, Share2, Coffee } from 'lucide-react';
import { RoomDetails } from '@/types/accommodations-types/service-provider-types';

interface HostelRoomsProps {
  rooms: RoomDetails[] | null | undefined;
}

const HostelRooms: React.FC<HostelRoomsProps> = ({ rooms }) => {
  // Handle null/undefined/empty rooms
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-[#B5E5D4] text-6xl mb-4">🏨</div>
        <h3 className="text-lg font-semibold text-[#2D4F43] mb-2">No Rooms Available</h3>
        <p className="text-[#5A8F7A]">There are currently no rooms or dorms available at this hostel.</p>
      </div>
    );
  }

  const getRoomTypeColor = (roomType: string) => {
    switch (roomType.toLowerCase()) {
      case 'dormitory':
        return 'bg-[#F5FDFA] text-[#2D4F43] border-[#B5E5D4]';
      case 'private':
        return 'bg-[#FAFFFD] text-[#2D4F43] border-[#C9EFE3]';
      case 'shared':
        return 'bg-[#F5FDFA] text-[#2D4F43] border-[#DDF9F2]';
      case 'mixed dorm':
        return 'bg-[#F5FDFA] text-[#2D4F43] border-[#B5E5D4]';
      case 'female dorm':
        return 'bg-[#FAFFFD] text-[#2D4F43] border-[#C9EFE3]';
      case 'male dorm':
        return 'bg-[#F5FDFA] text-[#2D4F43] border-[#DDF9F2]';
      default:
        return 'bg-[#F5FDFA] text-[#2D4F43] border-[#B5E5D4]';
    }
  };

  const getRoomIcon = (roomType: string) => {
    switch (roomType.toLowerCase()) {
      case 'dormitory':
      case 'mixed dorm':
      case 'female dorm':
      case 'male dorm':
        return <Users2 className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
      case 'shared':
        return <Share2 className="w-4 h-4" />;
      default:
        return <Bed className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {rooms.map((room) => (
        <div key={room.roomId} className="border border-[#B5E5D4] rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-[#F5FDFA] to-white">
          <div className="flex flex-col lg:flex-row gap-6">
            {room.images && room.images.length > 0 && (
              <div className="lg:w-1/3">
                <img
                  src={room.images[0].roomImageUrl}
                  alt={room.images[0].roomImageName || `Room ${room.roomNumber}`}
                  className="w-full h-48 lg:h-full object-cover rounded-lg border border-[#B5E5D4]"
                />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-1 ${getRoomTypeColor(room.roomTypeName)}`}>
                      {getRoomIcon(room.roomTypeName)}
                      {room.roomTypeName}
                    </span>
                    <span className="text-sm text-[#5A8F7A]">Room {room.roomNumber}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#2D4F43]">{room.roomTypeName}</h3>
                  <p className="text-[#5A8F7A] mt-1">{room.roomDescription || 'No description available.'}</p>
                </div>
                
                <div className="mt-4 lg:mt-0 text-right">
                  <div className="text-2xl font-bold text-[#2D4F43]">
                    ${room.localPricePerNight || 'N/A'}
                  </div>
                  <div className="text-sm text-[#5A8F7A]">per night</div>
                  {room.capacity && room.capacity > 1 && (
                    <div className="text-xs text-[#3A9B9B] mt-1">
                      ${((room.localPricePerNight || 0) / room.capacity).toFixed(0)} per person
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 p-2 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4]">
                  <Users className="w-4 h-4 text-[#3A9B9B]" />
                  <span className="text-sm text-[#2D4F43]">
                    {room.capacity || 0} {room.capacity === 1 ? 'guest' : 'guests'}
                  </span>
                </div>
                
                {room.roomSize && (
                  <div className="flex items-center gap-2 p-2 bg-[#F5FDFA] rounded-lg border border-[#C9EFE3]">
                    <Square className="w-4 h-4 text-[#3A9B9B]" />
                    <span className="text-sm text-[#2D4F43]">{room.roomSize} m²</span>
                  </div>
                )}
                
                {room.bedType && (
                  <div className="flex items-center gap-2 p-2 bg-[#F5FDFA] rounded-lg border border-[#DDF9F2]">
                    <Bed className="w-4 h-4 text-[#3A9B9B]" />
                    <span className="text-sm text-[#2D4F43]">{room.bedType}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 p-2 bg-[#F5FDFA] rounded-lg border border-[#B5E5D4]">
                  <Coffee className="w-4 h-4 text-[#3A9B9B]" />
                  <span className="text-sm text-[#2D4F43]">Free Breakfast</span>
                </div>
              </div>
              
              {room.amenities && room.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#F5FDFA] text-[#2D4F43] rounded-full text-sm border border-[#B5E5D4]"
                    >
                      {amenity.amenityName}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="px-3 py-1 bg-[#F5FDFA] text-[#2D4F43] rounded-full text-sm border border-[#C9EFE3]">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Availability */}
              {room.availability && room.availability.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-[#5A8F7A] mb-2">Available dates:</div>
                  <div className="flex flex-wrap gap-2">
                    {room.availability.slice(0, 3).map((avail, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#F5FDFA] text-[#2D4F43] rounded text-xs border border-[#B5E5D4]"
                      >
                        {new Date(avail.availabilityDate).toLocaleDateString()}
                      </span>
                    ))}
                    {room.availability.length > 3 && (
                      <span className="px-2 py-1 bg-[#F5FDFA] text-[#5A8F7A] rounded text-xs border border-[#C9EFE3]">
                        +{room.availability.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <button className="w-full lg:w-auto bg-gradient-to-r from-[#B5E5D4] to-[#DDF9F2] hover:from-[#9FD4C0] hover:to-[#C9EFE3] text-[#2D4F43] font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 border border-[#B5E5D4]">
                Book This {room.roomTypeName.toLowerCase().includes('dorm') ? 'Bed' : 'Room'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HostelRooms;