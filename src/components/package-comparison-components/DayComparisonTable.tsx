import React from "react";
import { Star, MapPin, Hotel, Car, Utensils } from "lucide-react";
import { Package, PackageDayByDay } from "@/types/package-comparison-types";

interface DayComparisonTableProps {
  selectedPackage1: Package;
  selectedPackage2: Package;
}

interface DayDataProps {
  dayData: PackageDayByDay | null;
}

const DayData: React.FC<DayDataProps> = ({ dayData }) => {
  if (!dayData) {
    return (
      <div className="text-gray-400 italic">No data for this day</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="font-semibold text-gray-900">{dayData.otherNotes}</div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Utensils className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Meals:</span>
        </div>
        <div className="space-y-2 ml-6">
          {dayData.breakfast && (
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Breakfast: {dayData.breakfastDescription || "Not specified"}</span>
            </div>
          )}
          {dayData.lunch && (
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Lunch: {dayData.lunchDescription || "Not specified"}</span>
            </div>
          )}
          {dayData.dinner && (
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Dinner: {dayData.dinnerDescription || "Not specified"}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 mb-2">
          <Hotel className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            Accommodation:
          </span>
        </div>
        <div className="ml-6">
          <div className="font-medium text-gray-900">{dayData.hotelName || "Not specified"}</div>
          <div className="text-sm text-gray-600 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {dayData.hotelLocation || "Location not specified"}
          </div>
          {dayData.hotelCategory && (
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < dayData.hotelCategory
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {dayData.hotelCategory}-star
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 mb-2">
          <Car className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Transport:</span>
        </div>
        <div className="ml-6">
          <div className="text-sm text-gray-600">
            {dayData.vehicleModel ? `${dayData.vehicleModel} (${dayData.vehicleTypeName})` : "Not specified"}
          </div>
          <div className="text-sm text-gray-600">
            {dayData.seatCapacity && `Seats: ${dayData.seatCapacity}`}
            {dayData.airCondition !== undefined && (
              <>
                {dayData.seatCapacity && " • "}
                AC: {dayData.airCondition ? "Yes" : "No"}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DayComparisonTable: React.FC<DayComparisonTableProps> = ({
  selectedPackage1,
  selectedPackage2,
}) => {
  const maxDays = Math.max(
    selectedPackage1.packageDayByDayDtoList.length,
    selectedPackage2.packageDayByDayDtoList.length
  );

  const getDayData = (pkg: Package, dayIndex: number): PackageDayByDay | null => {
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