// components/TourDetails.tsx
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { addBrowserHistory } from "@/services/browserHistoryService";
import { ActiveToursType } from "@/types/tour-types";
import { TOUR_BROWSER_HISTORY_TYPE } from "@/utils/constant";
import { SRI_LANKAN_TOUR_PAGE_PATH } from "@/utils/urls";

interface TourDetailsProps {
  tour: ActiveToursType;
}

const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  const { user } = useAuth();

  const formatDuration = (days: number) => {
    const nights = days > 0 ? days - 1 : 0;
    return {
      days: days < 10 ? "0" + days : days.toString(),
      nights: nights < 10 ? "0" + nights : nights.toString(),
    };
  };

  const handleMoreDetailsClick = async () => {
    if (!user) return;
    try {
      await addBrowserHistory({
        type: TOUR_BROWSER_HISTORY_TYPE,
        dataId: tour.tourId,
        name: tour.tourName,
      });
    } catch (err) {
      console.error("Failed to record browser history:", err);
    }
  };

  const { days, nights } = formatDuration(tour.duration);

  return (
    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col gap-3 sm:gap-4">
      {/* ── Tour Name ── */}
      <h3
        className="text-base sm:text-lg font-bold leading-snug line-clamp-2"
        style={{ color: "#095f82" }}
      >
        {tour.tourName}
      </h3>

      {/* ── Duration Badge ── */}
      <div className="inline-flex items-stretch rounded-xl overflow-hidden border border-[#b3e0f2] shadow-sm text-xs font-semibold tracking-wide self-start">
        {/* Days */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B7EA8] text-white">
          <svg
            className="w-3.5 h-3.5 opacity-90"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>{days}</span>
          <span className="font-normal opacity-80">Days</span>
        </div>
        <div className="w-px bg-white/30" />
        {/* Nights */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E9E8E] text-white">
          <svg
            className="w-3.5 h-3.5 opacity-90"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <span>{nights}</span>
          <span className="font-normal opacity-80">Nights</span>
        </div>
      </div>

      {/* ── Locations ── */}
      <div className="flex flex-col gap-1.5">
        {/* Start */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span
            className="inline-flex w-5 h-5 rounded-full items-center justify-center flex-shrink-0"
            style={{ background: "rgba(11,126,168,0.12)" }}
          >
            <svg
              className="w-3 h-3"
              style={{ color: "#0B7EA8" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="truncate">
            <span className="font-semibold text-gray-500 text-xs uppercase tracking-wide mr-1">
              From
            </span>
            <span className="font-medium text-gray-800">
              {tour.startLocation}
            </span>
          </span>
        </div>

        {/* Connector line */}
        <div className="flex items-center gap-2 ml-2.5">
          <div
            className="w-px h-3 ml-[7px] rounded-full"
            style={{
              background: "linear-gradient(to bottom, #0B7EA8, #0E9E8E)",
            }}
          />
        </div>

        {/* End */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span
            className="inline-flex w-5 h-5 rounded-full items-center justify-center flex-shrink-0"
            style={{ background: "rgba(14,158,142,0.12)" }}
          >
            <svg
              className="w-3 h-3"
              style={{ color: "#0E9E8E" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="truncate">
            <span className="font-semibold text-gray-500 text-xs uppercase tracking-wide mr-1">
              To
            </span>
            <span className="font-medium text-gray-800">
              {tour.endLocation}
            </span>
          </span>
        </div>
      </div>

      {/* ── Description ── */}
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
        {tour.tourDescription}
      </p>

      {/* ── Footer: Tour Types + CTA ── */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2 flex-wrap">
        {/* Tour Type Badges */}
        <div className="flex gap-1.5 flex-wrap">
          {tour.tourTypeDtos && tour.tourTypeDtos.length > 0 ? (
            tour.tourTypeDtos.map((type, index) => (
              <span
                key={type.tourTypeId || index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(11,126,168,0.08), rgba(14,158,142,0.08))",
                  borderColor: "#b3e0f2",
                  color: "#095f82",
                }}
              >
                {type.tourTypeName}
              </span>
            ))
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
              General
            </span>
          )}
        </div>

        {/* More Details CTA */}
        <Link
          href={`${SRI_LANKAN_TOUR_PAGE_PATH}/${tour.tourId}?name=${tour.tourName}`}
          onClick={handleMoreDetailsClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-px active:scale-95 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
        >
          More Details
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default TourDetails;
