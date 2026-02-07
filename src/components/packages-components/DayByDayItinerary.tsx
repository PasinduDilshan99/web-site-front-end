import { PackageDayAccommodation } from "@/types/package-types";
import React, { useState } from "react";

interface DayByDayItineraryProps {
  itinerary: PackageDayAccommodation[];
}

const DayByDayItinerary: React.FC<DayByDayItineraryProps> = ({ itinerary }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (dayNumber: number) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber);
  };

  const getMealIcon = (hasMeal: boolean) => {
    return hasMeal ? (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  };

  const getTransportIcon = (airCondition: boolean) => {
    return airCondition ? (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-sky-100">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-4 sm:mb-6">Day-by-Day Itinerary</h2>

      <div className="space-y-3 sm:space-y-4">
        {itinerary.map((day) => (
          <div
            key={day.packageDayAccommodationId}
            className="border border-sky-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-sky-300 transition-colors duration-200"
          >
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day.dayNumber)}
              className="w-full p-3 sm:p-4 text-left bg-gradient-to-r from-sky-50 to-white hover:from-sky-100 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-lg w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-sm sm:text-base shadow-sm">
                    Day {day.dayNumber}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-sky-900">{day.hotelName}</h3>
                    <p className="text-xs sm:text-sm text-sky-700 truncate">{day.hotelLocation}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-sky-500 transition-transform duration-200 ${
                    expandedDay === day.dayNumber ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Expanded Content */}
            {expandedDay === day.dayNumber && (
              <div className="p-3 sm:p-4 border-t border-sky-100">
                {/* Hotel Information */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-sm sm:text-base font-semibold text-sky-800 mb-1.5 sm:mb-2">Accommodation</h4>
                  <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-lg p-2.5 sm:p-3 border border-sky-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sky-900 text-sm sm:text-base">{day.hotelName}</p>
                        <p className="text-xs sm:text-sm text-sky-700 mt-0.5">{day.hotelLocation}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(day.hotelCategory)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-sky-600 ml-1">{day.hotelType} • {day.hotelCategory}-star</span>
                        </div>
                      </div>
                      {day.hotelWebsite && (
                        <a
                          href={day.hotelWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 hover:text-sky-700 text-xs sm:text-sm font-medium hover:underline"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-sky-700 mt-1.5">{day.hotelDescription}</p>
                  </div>
                </div>

                {/* Meals */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-sm sm:text-base font-semibold text-sky-800 mb-1.5 sm:mb-2">Meals Included</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="flex items-center gap-2 p-2 bg-teal-50 rounded border border-teal-100">
                      {getMealIcon(day.breakfast)}
                      <span className="text-xs sm:text-sm text-sky-700 font-medium">Breakfast</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-teal-50 rounded border border-teal-100">
                      {getMealIcon(day.lunch)}
                      <span className="text-xs sm:text-sm text-sky-700 font-medium">Lunch</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-teal-50 rounded border border-teal-100">
                      {getMealIcon(day.dinner)}
                      <span className="text-xs sm:text-sm text-sky-700 font-medium">Dinner</span>
                    </div>
                    {day.morningTea && (
                      <div className="flex items-center gap-2 p-2 bg-sky-50 rounded border border-sky-100">
                        {getMealIcon(day.morningTea)}
                        <span className="text-xs sm:text-sm text-sky-700 font-medium">Morning Tea</span>
                      </div>
                    )}
                    {day.eveningTea && (
                      <div className="flex items-center gap-2 p-2 bg-sky-50 rounded border border-sky-100">
                        {getMealIcon(day.eveningTea)}
                        <span className="text-xs sm:text-sm text-sky-700 font-medium">Evening Tea</span>
                      </div>
                    )}
                    {day.snacks && (
                      <div className="flex items-center gap-2 p-2 bg-amber-50 rounded border border-amber-100">
                        {getMealIcon(day.snacks)}
                        <span className="text-xs sm:text-sm text-amber-700 font-medium">Snacks</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transport */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-sm sm:text-base font-semibold text-sky-800 mb-1.5 sm:mb-2">Transport</h4>
                  <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-lg p-2.5 sm:p-3 border border-cyan-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <p className="font-medium text-sky-900 text-sm sm:text-base">{day.vehicleTypeName} - {day.vehicleModel}</p>
                        <p className="text-xs sm:text-sm text-sky-700">Reg: {day.vehicleRegistrationNumber}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTransportIcon(day.airCondition)}
                        <span className="text-xs text-sky-600 font-medium">{day.airCondition ? 'A/C' : 'Non-A/C'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-sky-600">
                      <span>Seats: {day.seatCapacity}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {day.otherNotes && (
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-sky-800 mb-1.5 sm:mb-2">Notes</h4>
                    <p className="text-xs sm:text-sm text-sky-700 bg-amber-50 p-2.5 sm:p-3 rounded-lg border border-amber-100">{day.otherNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayByDayItinerary;