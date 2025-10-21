import { PopularDestinationsType } from "@/types/destinations-types";
import React from "react";

interface DestinationInfoProps {
  destination: PopularDestinationsType;
  duration: number;
}

const DestinationInfo: React.FC<DestinationInfoProps> = ({
  destination,
  duration,
}) => {
  return (
    <>
      {/* Duration and Rating */}
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <Duration duration={duration} />
        <Rating rating={destination.rating} />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 leading-tight">
        {destination.destinationName}
      </h3>

      {/* Location */}
      <Location location={destination.location} />
    </>
  );
};

// Sub-components
interface DurationProps {
  duration: number;
}

const Duration: React.FC<DurationProps> = ({ duration }) => {
  return (
    <div className="flex items-center text-gray-500 text-xs sm:text-sm">
      <svg
        className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {duration} days
    </div>
  );
};

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${
            i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs sm:text-sm font-semibold text-gray-700">
        {rating}
      </span>
    </div>
  );
};

interface LocationProps {
  location: string;
}

const Location: React.FC<LocationProps> = ({ location }) => {
  return (
    <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 flex items-center">
      <svg
        className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-purple-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      {location}
    </p>
  );
};

export default DestinationInfo;
