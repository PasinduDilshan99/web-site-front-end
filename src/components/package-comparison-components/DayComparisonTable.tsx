import React from "react";
import { Star, MapPin, Hotel, Car, Utensils, Users, Info } from "lucide-react";
import { Package } from "@/types/package-types";
import { PackageDayByDay } from "@/types/package-comparison-types";

interface DayComparisonTableProps {
  selectedPackage1: Package;
  selectedPackage2: Package;
}

interface DayDataProps {
  dayData: PackageDayByDay | null;
}

const DayData: React.FC<DayDataProps> = ({ dayData }) => {
  if (!dayData) {
    return <div className="text-gray-400 italic">No data for this day</div>;
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Day Notes */}
      {dayData.otherNotes && (
        <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-blue-50/30 rounded-lg sm:rounded-xl border border-blue-100">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed">
                {dayData.otherNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Meals Section */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
            <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <span className="text-sm sm:text-base font-semibold text-gray-900">
            Meals Included
          </span>
        </div>

        <div className="space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
          {dayData.breakfast && (
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 sm:p-3 rounded-lg border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
              <span className="font-medium text-gray-900">Breakfast</span>
              <span className="text-gray-500">•</span>
              <span className="flex-1 text-gray-600 truncate">
                {dayData.breakfastDescription || "Standard breakfast included"}
              </span>
            </div>
          )}
          {dayData.lunch && (
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 sm:p-3 rounded-lg border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
              <span className="font-medium text-gray-900">Lunch</span>
              <span className="text-gray-500">•</span>
              <span className="flex-1 text-gray-600 truncate">
                {dayData.lunchDescription || "Standard lunch included"}
              </span>
            </div>
          )}
          {dayData.dinner && (
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 sm:p-3 rounded-lg border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
              <span className="font-medium text-gray-900">Dinner</span>
              <span className="text-gray-500">•</span>
              <span className="flex-1 text-gray-600 truncate">
                {dayData.dinnerDescription || "Standard dinner included"}
              </span>
            </div>
          )}

          {/* Show message if no meals specified */}
          {!dayData.breakfast && !dayData.lunch && !dayData.dinner && (
            <div className="text-sm text-gray-500 italic p-2 sm:p-3 bg-gray-50 rounded-lg">
              Meals not specified for this day
            </div>
          )}
        </div>
      </div>

      {/* Accommodation Section */}
      {(dayData.hotelName || dayData.hotelLocation) && (
        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
              <Hotel className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              Accommodation
            </span>
          </div>

          <div className="ml-2 sm:ml-4 space-y-1.5 sm:space-y-2">
            {dayData.hotelName && (
              <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
                {dayData.hotelName}
              </div>
            )}

            {dayData.hotelLocation && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                <span className="truncate">{dayData.hotelLocation}</span>
              </div>
            )}

            {dayData.hotelCategory && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        i < dayData.hotelCategory
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {dayData.hotelCategory}-star hotel
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transport Section */}
      {(dayData.vehicleModel || dayData.vehicleTypeName) && (
        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              Transportation
            </span>
          </div>

          <div className="ml-2 sm:ml-4 space-y-1.5 sm:space-y-2">
            {dayData.vehicleModel && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  Vehicle:
                </span>
                <span className="text-sm text-gray-600 truncate">
                  {dayData.vehicleModel}
                  {dayData.vehicleTypeName && ` (${dayData.vehicleTypeName})`}
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {dayData.seatCapacity && (
                <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{dayData.seatCapacity} seats</span>
                </div>
              )}

              {dayData.airCondition !== undefined && (
                <div
                  className={`flex items-center gap-1 text-sm px-2 py-1 rounded-lg ${
                    dayData.airCondition
                      ? "bg-green-50 text-green-800"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {dayData.airCondition ? (
                    <>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Air Conditioned</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>No A/C</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DayComparisonTable: React.FC<DayComparisonTableProps> = ({
  selectedPackage1,
  selectedPackage2,
}) => {
  const maxDays = Math.max(
    selectedPackage1.packageDayByDayDtoList.length,
    selectedPackage2.packageDayByDayDtoList.length,
  );

  const getDayData = (
    pkg: Package,
    dayIndex: number,
  ): PackageDayByDay | null => {
    return (
      pkg.packageDayByDayDtoList.find((d) => d.dayNumber === dayIndex + 1) ||
      null
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                Day
              </th>
              <th
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
                style={{ color: selectedPackage1.color }}
              >
                {selectedPackage1.packageName}
              </th>
              <th
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
                style={{ color: selectedPackage2.color }}
              >
                {selectedPackage2.packageName}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: maxDays }).map((_, dayIndex) => {
              const day1Data = getDayData(selectedPackage1, dayIndex);
              const day2Data = getDayData(selectedPackage2, dayIndex);

              return (
                <tr key={dayIndex} className="hover:bg-gray-50">
                  <td className="py-6 px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                        Day {dayIndex + 1}
                      </div>
                    </div>
                  </td>

                  {/* Package 1 Day Data */}
                  <td className="py-6 px-6">
                    <DayData dayData={day1Data} />
                  </td>

                  {/* Package 2 Day Data */}
                  <td className="py-6 px-6">
                    <DayData dayData={day2Data} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DayComparisonTable;
