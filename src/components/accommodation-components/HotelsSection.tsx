"use client"
import React, { useEffect, useState } from "react";
import { HotelSectionApiResponse, HotelSectionHotel } from "@/types/accommodations-types/hotel-types";
import { GET_HOTEL_DETAILS_SECTION_FE } from "@/utils/frontEndConstant";

const HotelsSection = () => {
  const [hotels, setHotels] = useState<HotelSectionHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_HOTEL_DETAILS_SECTION_FE); // Your API endpoint
        const data: HotelSectionApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch hotels");
        }

        setHotels(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading hotels...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Featured Hotels</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.hotelId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Hotel Images */}
            {hotel.hotelImages && hotel.hotelImages.length > 0 ? (
              <div className="relative h-48">
                <img
                  src={hotel.hotelImages[0].imageUrl}
                  alt={hotel.hotelImages[0].caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                  {hotel.starRating} ★
                </div>
              </div>
            ) : (
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}

            {/* Hotel Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {hotel.hotelName}
              </h2>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {hotel.hotelDescription}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Address:</span>
                  <span className="ml-2">{hotel.address}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Contact:</span>
                  <span className="ml-2">{hotel.contactNumber}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Check-in:</span>
                  <span className="ml-2">{hotel.checkInTime} | Check-out: {hotel.checkOutTime}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.wifiAvailable && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    WiFi
                  </span>
                )}
                {hotel.parkingFacility && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Parking
                  </span>
                )}
                {hotel.petFriendly && (
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                    Pet Friendly
                  </span>
                )}
              </div>

              {/* Rooms */}
              {hotel.rooms && hotel.rooms.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Room Types:</h3>
                  <div className="space-y-2">
                    {hotel.rooms.slice(0, 2).map((room, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <span className="font-medium">{room.roomType}:</span>
                        <span className="ml-1">${room.localPricePerNight}/night</span>
                      </div>
                    ))}
                    {hotel.rooms.length > 2 && (
                      <div className="text-sm text-blue-600">
                        +{hotel.rooms.length - 2} more room types
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {hotel.reviews && hotel.reviews.totalReviews > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="ml-1 font-medium text-gray-700">
                      {hotel.reviews.averageRating}
                    </span>
                    <span className="ml-1 text-gray-500 text-sm">
                      ({hotel.reviews.totalReviews} reviews)
                    </span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hotels found.</p>
        </div>
      )}
    </div>
  );
};

export default HotelsSection;