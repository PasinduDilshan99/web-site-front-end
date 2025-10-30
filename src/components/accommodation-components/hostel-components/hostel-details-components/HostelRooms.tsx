// components/hostel/HostelRooms.tsx
import React from 'react';
import { Users, Square, Wifi, Users2, Bed, Bath, Lock, Share2 } from 'lucide-react';
import { RoomDetails } from '@/types/accommodations-types/service-provider-types';

interface HostelRoomsProps {
  rooms: RoomDetails[] | null | undefined;
}

const HostelRooms: React.FC<HostelRoomsProps> = ({ rooms }) => {
  // Handle null/undefined/empty rooms
  if (!rooms || rooms.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rooms & Dorms</h2>
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">🏨</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Rooms Available</h3>
          <p className="text-gray-500">There are currently no rooms or dorms available at this hostel.</p>
        </div>
      </div>
    );
  }

  const getRoomTypeColor = (roomType: string) => {
    switch (roomType.toLowerCase()) {
      case 'dormitory':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'private':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'shared':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'mixed dorm':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'female dorm':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'male dorm':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Rooms & Dorms</h2>
      
      <div className="space-y-6">
        {rooms.map((room) => (
          <div key={room.roomId} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-white">
            <div className="flex flex-col lg:flex-row gap-6">
              {room.images && room.images.length > 0 && (
                <div className="lg:w-1/3">
                  <img
                    src={room.images[0].roomImageUrl}
                    alt={room.images[0].roomImageName || `Room ${room.roomNumber}`}
                    className="w-full h-48 lg:h-full object-cover rounded-lg"
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
                      <span className="text-sm text-gray-500">Room {room.roomNumber}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{room.roomTypeName}</h3>
                    <p className="text-gray-600 mt-1">{room.roomDescription || 'No description available.'}</p>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${room.localPricePerNight || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                    {room.capacity && room.capacity > 1 && (
                      <div className="text-xs text-blue-600 mt-1">
                        ${((room.localPricePerNight || 0) / room.capacity).toFixed(0)} per person
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-600">
                      {room.capacity || 0} {room.capacity === 1 ? 'guest' : 'guests'}
                    </span>
                  </div>
                  
                  {room.roomSize && (
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{room.roomSize} m²</span>
                    </div>
                  )}
                  
                  {room.bedType && (
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{room.bedType}</span>
                    </div>
                  )}
                  
                  {room.wifiAvailable && (
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">Free WiFi</span>
                    </div>
                  )}
                </div>
                
                {room.amenities && room.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200"
                      >
                        {amenity.amenityName}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-200">
                        +{room.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Availability */}
                {room.availability && room.availability.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Available dates:</div>
                    <div className="flex flex-wrap gap-2">
                      {room.availability.slice(0, 3).map((avail, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-200"
                        >
                          {new Date(avail.availabilityDate).toLocaleDateString()}
                        </span>
                      ))}
                      {room.availability.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs border border-gray-200">
                          +{room.availability.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <button className="w-full lg:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Book This {room.roomTypeName.toLowerCase().includes('dorm') ? 'Bed' : 'Room'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelRooms;