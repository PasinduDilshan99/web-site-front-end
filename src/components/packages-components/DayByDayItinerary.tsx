import { PackageDayAccommodation } from "@/types/package-types";
import React, { useState } from "react";
import Link from "next/link";
import { VEHICLE_SPECIFICATION_DETAILS_PATH } from "@/utils/urls";

interface DayByDayItineraryProps {
  itinerary: PackageDayAccommodation[];
}

const meals = [
  { key: "breakfast", label: "Breakfast", descKey: "breakfastDescription" },
  { key: "lunch", label: "Lunch", descKey: "lunchDescription" },
  { key: "dinner", label: "Dinner", descKey: "dinnerDescription" },
  { key: "morningTea", label: "Morning Tea", descKey: "morningTeaDescription" },
  { key: "eveningTea", label: "Evening Tea", descKey: "eveningTeaDescription" },
  { key: "snacks", label: "Snacks", descKey: "snackNote" },
] as const;

/* ── Icons with responsive sizing ──────────────────────────────────── */
const IconPin = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const IconStar = ({
  filled,
  className = "",
}: {
  filled: boolean;
  className?: string;
}) => (
  <svg
    className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${filled ? "text-amber-400" : "text-slate-200"} ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const IconChevron = ({
  open,
  className = "",
}: {
  open: boolean;
  className?: string;
}) => (
  <svg
    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 ${open ? "rotate-180" : ""} ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const IconCheck = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-emerald-500 flex-shrink-0 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const IconCar = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-sky-500 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 17H5a2 2 0 01-2-2v-5l2-5h14l2 5v5a2 2 0 01-2 2h-3m-8 0a2 2 0 104 0m4 0a2 2 0 104 0"
    />
  </svg>
);

const IconHotel = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-sky-500 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4"
    />
  </svg>
);

const IconUtensils = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-sky-500 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3v18M3 9h4a2 2 0 002-2V3M9 21V9M21 3v4a4 4 0 01-4 4h-1v10"
    />
  </svg>
);

const IconExternalLink = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 ml-1 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

/* ── Section wrapper with responsive spacing ── */
const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-4 sm:mb-5 lg:mb-6 last:mb-0">
    <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 mb-2 sm:mb-3 lg:mb-4">
      <div className="flex-shrink-0">{icon}</div>
      <h4 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-slate-700">
        {title}
      </h4>
    </div>
    {children}
  </div>
);

/* ── Main component ─────────────────────────────────────────────────── */
const DayByDayItinerary: React.FC<DayByDayItineraryProps> = ({ itinerary }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-200 overflow-hidden w-full">
      {/* ── Header with responsive padding ── */}
      <div className="bg-gradient-to-r from-sky-600 to-teal-500 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-7">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-3">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
              Day By Day Itinerary
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">
              Your complete travel plan
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/20 text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-full whitespace-nowrap self-start xs:self-auto">
            {itinerary.length} Days
          </div>
        </div>
      </div>

      {/* ── Day list ── */}
      <div className="divide-y divide-slate-100">
        {itinerary.map((day) => {
          const isOpen = expandedDay === day.dayNumber;
          const includedMeals = meals.filter(
            (m) => day[m.key as keyof PackageDayAccommodation],
          );

          return (
            <div key={day.packageDayAccommodationId} className="w-full">
              {/* Collapsed row / toggle */}
              <button
                onClick={() => setExpandedDay(isOpen ? null : day.dayNumber)}
                className={`cursor-pointer w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 text-left transition-colors duration-150 ${
                  isOpen ? "bg-sky-50" : "hover:bg-slate-50"
                }`}
              >
                {/* Day badge - responsive sizing */}
                <div
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                    isOpen
                      ? "bg-sky-600 text-white shadow-lg shadow-sky-200"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`text-[8px] sm:text-[9px] md:text-xs font-bold uppercase tracking-widest leading-none ${isOpen ? "opacity-60" : "opacity-40"}`}
                  >
                    Day
                  </span>
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight">
                    {day.dayNumber}
                  </span>
                </div>

                {/* Hotel name + location - hidden on smallest screens if no hotel */}
                {day.hotelLocation ? (
                  <div className="flex-1 min-w-0 hidden xs:block">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-800 truncate">
                      {day.hotelName}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1 text-slate-400">
                      <IconPin />
                      <span className="text-[10px] sm:text-xs md:text-sm lg:text-base truncate">
                        {day.hotelLocation}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 min-w-0 hidden xs:block">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-800">
                      Day {day.dayNumber}
                    </p>
                  </div>
                )}

                {/* Quick-glance chips - responsive */}
                {!isOpen && (
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0">
                    {includedMeals.length > 0 && (
                      <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm bg-emerald-50 text-emerald-600 border border-emerald-200 font-semibold px-1.5 sm:px-2 md:px-2.5 lg:px-3.5 py-0.5 sm:py-1 md:py-1.5 rounded-md sm:rounded-lg">
                        {includedMeals.length} meals
                      </span>
                    )}
                    <span
                      className={`text-[10px] sm:text-xs md:text-sm font-semibold px-1.5 sm:px-2 md:px-2.5 lg:px-3.5 py-0.5 sm:py-1 md:py-1.5 rounded-md sm:rounded-lg border ${
                        day.airCondition
                          ? "bg-sky-50 text-sky-600 border-sky-200"
                          : "bg-slate-50 text-slate-400 border-slate-200"
                      }`}
                    >
                      <span className="hidden xs:inline">
                        {day.airCondition ? "Air Conditioned" : "Non A/C"}
                      </span>
                      <span className="xs:hidden">
                        {day.airCondition ? "A/C" : "No A/C"}
                      </span>
                    </span>
                  </div>
                )}

                <span
                  className={`flex-shrink-0 transition-colors duration-200 ${isOpen ? "text-sky-500" : "text-slate-300"}`}
                >
                  <IconChevron open={isOpen} />
                </span>
              </button>

              {/* Expanded panel with responsive padding */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-7 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 bg-slate-50/50 border-t border-slate-100">
                  {/* ── Accommodation ── */}
                  {day.hotelName ? (
                    <Section icon={<IconHotel />} title="Accommodation">
                      <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-200 p-3 sm:p-4 md:p-5 lg:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 truncate">
                              {day.hotelName}
                            </p>
                            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mt-1 sm:mt-1.5 text-slate-400">
                              <IconPin />
                              <span className="text-xs sm:text-sm md:text-base truncate">
                                {day.hotelLocation}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mt-2 sm:mt-3">
                              <div className="flex items-center gap-0.5 sm:gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <IconStar
                                    key={i}
                                    filled={i < day.hotelCategory}
                                  />
                                ))}
                              </div>
                              <span className="text-slate-300 text-sm sm:text-base md:text-lg hidden xs:inline">
                                |
                              </span>
                              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-500 bg-slate-100 px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                                {day.hotelType}
                              </span>
                            </div>
                          </div>
                          {day.hotelWebsite && (
                            <a
                              href={day.hotelWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="self-start flex-shrink-0 text-xs sm:text-sm md:text-base font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl transition-colors inline-flex items-center"
                            >
                              <span>Website</span>
                              <IconExternalLink />
                            </a>
                          )}
                        </div>
                        {day.hotelDescription && (
                          <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 leading-relaxed">
                            {day.hotelDescription}
                          </p>
                        )}
                      </div>
                    </Section>
                  ) : (
                    <Section icon={<IconHotel />} title="Accommodation">
                      <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-200 p-2.5 sm:p-3 md:p-4">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          {[...Array(5)].map((_, i) => (
                            <IconStar key={i} filled={i < day.hotelCategory} />
                          ))}
                        </div>
                      </div>
                    </Section>
                  )}

                  {/* ── Meals Included ── */}
                  {includedMeals.length > 0 && (
                    <Section icon={<IconUtensils />} title="Meals Included">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                        {includedMeals.map(({ key, label, descKey }) => {
                          const desc = day[
                            descKey as keyof PackageDayAccommodation
                          ] as string | null;
                          return (
                            <div
                              key={key}
                              className="flex items-start gap-1.5 sm:gap-2 md:gap-2.5 px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl border bg-white border-emerald-100"
                            >
                              <div className="mt-0.5">
                                <IconCheck />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm md:text-base font-semibold leading-tight text-slate-700">
                                  {label}
                                </p>
                                {desc && (
                                  <p
                                    className="text-[10px] sm:text-xs md:text-sm text-slate-400 mt-0.5 sm:mt-1 truncate"
                                    title={desc}
                                  >
                                    {desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Section>
                  )}

                  {/* ── Transport ── */}
                  <Section icon={<IconCar />} title="Transport">
                    <Link
                      href={`${VEHICLE_SPECIFICATION_DETAILS_PATH}/${day.vehicleSpecificationId}?vehicle-model=${day.vehicleModel}`}
                      className="block bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-200 p-3 sm:p-4 md:p-5 lg:p-6 hover:border-sky-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div className="min-w-0">
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800">
                            {day.vehicleTypeName}
                            {day.vehicleModel && (
                              <span className="font-normal text-slate-400 text-xs sm:text-sm md:text-base">
                                {" "}
                                · {day.vehicleModel}
                              </span>
                            )}
                          </p>
                          {day.vehicleRegistrationNumber && (
                            <p className="text-xs sm:text-sm md:text-base text-slate-400 mt-0.5 sm:mt-1">
                              Reg. {day.vehicleRegistrationNumber}
                            </p>
                          )}
                        </div>

                        {/* Chips - responsive */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span
                            className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-md sm:rounded-lg border ${
                              day.airCondition
                                ? "bg-sky-50 text-sky-600 border-sky-200"
                                : "bg-slate-50 text-slate-400 border-slate-200"
                            }`}
                          >
                            <span className="hidden xs:inline">
                              {day.airCondition ? "Air Conditioned" : "Non A/C"}
                            </span>
                            <span className="xs:hidden">
                              {day.airCondition ? "A/C" : "No A/C"}
                            </span>
                          </span>
                          <span className="text-[10px] sm:text-xs md:text-sm lg:text-base bg-slate-100 text-slate-600 font-semibold px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-md sm:rounded-lg border border-slate-200">
                            {day.seatCapacity} Seats
                          </span>
                          <span className="text-sky-600 text-[10px] sm:text-xs md:text-sm font-semibold flex items-center whitespace-nowrap">
                            <span className="hidden xs:inline">
                              View Details
                            </span>
                            <span className="xs:hidden">Details</span>
                            <IconExternalLink />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Section>

                  {/* ── Notes ── */}
                  {day.otherNotes && (
                    <div className="flex gap-2 sm:gap-3 md:gap-4 bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm md:text-base font-semibold text-amber-700 mb-0.5 sm:mb-1">
                          Note
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-amber-800 leading-relaxed">
                          {day.otherNotes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayByDayItinerary;
