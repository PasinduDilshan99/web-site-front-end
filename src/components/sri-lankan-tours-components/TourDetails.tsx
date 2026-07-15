// components/TourDetails.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { addBrowserHistory } from "@/services/browserHistoryService";
import { ActiveToursType } from "@/types/tour-types";
import { TOUR_BROWSER_HISTORY_TYPE } from "@/utils/constant";
import { SRI_LANKAN_TOUR_PAGE_PATH } from "@/utils/urls";

interface TourDetailsProps {
  tour: ActiveToursType;
}

// ── Reusable animated tag group ──────────────────────────────────────────────
interface TagGroupProps {
  items: { id?: number; name: string }[];
  colorScheme: "teal" | "green";
  maxVisible?: number;
}

const TagGroup: React.FC<TagGroupProps> = ({
  items,
  colorScheme,
  maxVisible = 3,
}) => {
  const [expanded, setExpanded] = useState(false);
  const overflowRef = useRef<HTMLDivElement>(null);
  const [overflowHeight, setOverflowHeight] = useState(0);

  const hidden = items.slice(maxVisible);
  const visible = items.slice(0, maxVisible);
  const hasMore = hidden.length > 0;

  useEffect(() => {
    if (overflowRef.current) {
      setOverflowHeight(overflowRef.current.scrollHeight);
    }
  }, [items]);

  const tealStyle = {
    background:
      "linear-gradient(135deg, rgba(11,126,168,0.08), rgba(14,158,142,0.08))",
    borderColor: "#40E0D0",
    color: "#095f82",
  };

  const greenStyle = {
    background:
      "linear-gradient(135deg, rgba(34,139,34,0.08), rgba(60,179,113,0.08))",
    borderColor: "#228B22",
    color: "#006400",
  };

  const tagStyle = colorScheme === "teal" ? tealStyle : greenStyle;

  const moreButtonStyle =
    colorScheme === "teal"
      ? {
          background:
            "linear-gradient(135deg, rgba(11,126,168,0.12), rgba(14,158,142,0.12))",
          borderColor: "#40E0D0",
          color: "#095f82",
        }
      : {
          background:
            "linear-gradient(135deg, rgba(34,139,34,0.12), rgba(60,179,113,0.12))",
          borderColor: "#228B22",
          color: "#006400",
        };

  if (!items || items.length === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
        General
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1.5 flex-wrap">
        {visible.map((item, index) => (
          <span
            key={item.id ?? index}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200"
            style={tagStyle}
          >
            {item.name}
          </span>
        ))}

        {hasMore && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-all duration-200 hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
            style={moreButtonStyle}
            aria-expanded={expanded}
            aria-label={
              expanded ? "Show fewer tags" : `Show ${hidden.length} more tags`
            }
          >
            {expanded ? (
              <>
                <svg
                  className="w-3 h-3 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Less
              </>
            ) : (
              <>+{hidden.length} more</>
            )}
          </button>
        )}
      </div>

      {hasMore && (
        <div
          ref={overflowRef}
          className="flex gap-1.5 flex-wrap overflow-hidden"
          style={{
            maxHeight: expanded ? overflowHeight + 8 : 0,
            opacity: expanded ? 1 : 0,
            transition:
              "max-height 320ms cubic-bezier(0.4,0,0.2,1), opacity 240ms ease",
            paddingTop: expanded ? 2 : 0,
          }}
          aria-hidden={!expanded}
        >
          {hidden.map((item, index) => (
            <span
              key={item.id ?? index + maxVisible}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
              style={{
                ...tagStyle,
                transitionDelay: expanded ? `${index * 30}ms` : "0ms",
                transform: expanded ? "translateY(0)" : "translateY(-4px)",
                transition: "transform 200ms ease, opacity 200ms ease",
                opacity: expanded ? 1 : 0,
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  const { user } = useAuth();
  const { formatPrice, currentCurrency } = useCurrency();

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

  const typeItems = (tour.tourTypeDtos ?? []).map((t) => ({
    id: t.tourTypeId,
    name: t.tourTypeName,
  }));

  const categoryItems = (tour.tourCategoryDto ?? []).map((c) => ({
    id: c.tourCategoryId,
    name: c.tourCategoryName,
  }));

  // SAFE PRICE HANDLING - Check if price exists and is a valid number
  const safePrice = tour.tourStartingPrice && !isNaN(tour.tourStartingPrice) 
    ? tour.tourStartingPrice 
    : 0;

  // Format the price in the selected currency
  const formattedPrice = formatPrice(safePrice);
  
  // Extract the numeric part and symbol for display
  const getPriceDisplay = () => {
    const formatted = formattedPrice;
    // Try to extract symbol and number
    const match = formatted.match(/^([^\d]+)?([\d,.]+)$/);
    if (match) {
      return {
        symbol: match[1]?.trim() || currentCurrency.symbol,
        number: match[2] || formatted,
      };
    }
    return {
      symbol: currentCurrency.symbol,
      number: formatted,
    };
  };

  const priceDisplay = getPriceDisplay();

  return (
    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col gap-3 sm:gap-4">
      {/* ── Tour Name ── */}
      <h3
        className="text-base sm:text-lg font-bold leading-snug line-clamp-2"
        style={{ color: "#095f82" }}
      >
        {tour.tourName}
      </h3>

      {/* ── Duration Badge + Starting Price ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Duration */}
        <div className="inline-flex items-stretch rounded-xl overflow-hidden border border-[#b3e0f2] shadow-sm text-xs font-semibold tracking-wide self-start">
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

        {/* ── Starting Price - Updated for multi-currency ── */}
        <div
          className="inline-flex flex-col items-end rounded-xl px-3 py-1.5 border self-start"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,126,168,0.06), rgba(14,158,142,0.06))",
            borderColor: "#b3e0f2",
          }}
        >
          <span
            className="text-[9px] font-semibold uppercase tracking-widest"
            style={{ color: "#0B7EA8" }}
          >
            Starting from
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className="text-[11px] font-semibold"
              style={{ color: "#0E9E8E" }}
            >
              {currentCurrency.code}
            </span>
            <span
              className="text-base font-bold leading-none"
              style={{ color: "#095f82" }}
            >
              {priceDisplay.number}
            </span>
          </div>
        </div>
      </div>

      {/* ── Locations ── */}
      <div className="flex flex-col gap-1.5">
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
        <div className="flex items-center gap-2 ml-2.5">
          <div
            className="w-px h-3 ml-[7px] rounded-full"
            style={{
              background: "linear-gradient(to bottom, #0B7EA8, #0E9E8E)",
            }}
          />
        </div>
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

      {/* ── Footer: Tags + CTA ── */}
      <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
        {/* Tour Types */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "#0B7EA8" }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Tour Types
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#40E0D0]/30 to-transparent" />
          </div>
          <TagGroup items={typeItems} colorScheme="teal" maxVisible={3} />
        </div>

        {/* Tour Categories */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex items-center gap-1.5">
            <span
              className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "#228B22" }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Tour Categories
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#228B22]/30 to-transparent" />
          </div>
          <TagGroup items={categoryItems} colorScheme="green" maxVisible={3} />
        </div>

        {/* CTA */}
        <div className="flex mt-1">
          <Link
            href={`${SRI_LANKAN_TOUR_PAGE_PATH}/${tour.tourId}?name=${tour.tourName}`}
            onClick={handleMoreDetailsClick}
            className="w-full group inline-flex justify-center items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white flex-shrink-0 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
          >
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              }}
            />
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: "0 0 0 3px rgba(14,158,142,0.3)" }}
            />
            <span className="relative flex content-center text-center justify-center items-center gap-1.5 transition-transform duration-200 group-hover:-translate-y-px group-active:translate-y-0 group-active:scale-95">
              More Details
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;