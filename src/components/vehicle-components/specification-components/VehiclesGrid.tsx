import React from "react";
import Link from "next/link";
import Image from "next/image";
import { VehicleBasicDetails } from "@/types/vehicle-types";
import { VEHICLE_SPECIFICATION_DETAILS_PATH } from "@/utils/urls";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

interface VehiclesGridProps {
  vehicles: VehicleBasicDetails[];
}

const VehiclesGrid: React.FC<VehiclesGridProps> = ({ vehicles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {vehicles.map((vehicle) => (
        <Link
          key={vehicle.specificationId}
          href={`${VEHICLE_SPECIFICATION_DETAILS_PATH}/${vehicle.specificationId}?name=${vehicle.model}`}
          className="group bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-teal-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
        >
          <div className="relative h-40 sm:h-44 lg:h-48 bg-gradient-to-br from-teal-100 to-cyan-100">
            {vehicle.imageUrl ? (
              <Image
                src={vehicle.imageUrl || PLACE_HOLDER_IMAGE}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                width={400}
                height={300}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-teal-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            {/* Year Badge */}
            <div className="absolute top-2 right-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              {vehicle.year}
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors line-clamp-1">
              {vehicle.make} {vehicle.model}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-1">{vehicle.bodyType}</p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>{vehicle.horsepowerHp} HP</span>
              </div>

              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>{vehicle.seatCapacity} seats</span>
              </div>
            </div>

            <div className="border-t border-teal-100 pt-2 sm:pt-3 mt-2 sm:mt-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-500">View Details</span>
                <span className="text-teal-600 group-hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VehiclesGrid;