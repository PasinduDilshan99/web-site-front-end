import { DestinationData } from "@/types/destination-details-types";
import React from "react";

interface BookingCardProps {
  destination: DestinationData;
}

const BookingCard: React.FC<BookingCardProps> = ({ destination }) => {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
      <h3 className="text-lg font-bold mb-4">Ready to Explore?</h3>
      <p className="mb-4 opacity-90">
        Book your adventure today and experience the best of{" "}
        {destination.destinationName}
      </p>
      <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-3">
        Book Now
      </button>
      <button className="w-full bg-transparent border border-white py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
        Contact Guide
      </button>
    </div>
  );
};

export default BookingCard;
