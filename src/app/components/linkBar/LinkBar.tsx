"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GET_ALL_LINK_BAR_DATA } from "@/utils/frontEndConstant";
import { LinkBarItem } from "@/types/link-bar-types";
import { DEFAULT_ICON_URL } from "@/utils/constant";
import { FULL, ICON_ONLY } from "../../../../public/data/link-bar-data";
import Loading from "../loading/Loading";

const LinkBar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fullItems, setFullItems] = useState<LinkBarItem[]>([]);
  const [imageOnlyItems, setImageOnlyItems] = useState<LinkBarItem[]>([]);

  useEffect(() => {
    const fetchLinkBarItems = async () => {
      try {
        const response = await fetch(GET_ALL_LINK_BAR_DATA);
        const data = await response.json();

        if (response.ok) {
          const items: LinkBarItem[] = data.data || [];
          setFullItems(items.filter((item) => item.typeName === FULL));
          setImageOnlyItems(
            items.filter((item) => item.typeName === ICON_ONLY)
          );
        } else {
          setError(data.error || "Failed to fetch link bar items");
        }
      } catch (err) {
        console.error("Error fetching LinkBar items:", err);
        setError("Something went wrong while fetching LinkBar items");
      } finally {
        setLoading(false);
      }
    };

    fetchLinkBarItems();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-400 text-sm p-2">Error: {error}</div>;

  return (
    <div
      className="flex items-center justify-between backdrop-blur-lg border-b h-[32px] md:h-[36px] lg:h-[40px] px-3 md:px-4 lg:px-6 shadow-xl relative overflow-hidden"
      style={{
        background: `linear-gradient(to right, oklch(41.4% 0.112 45.904), oklch(42.4% 0.199 265.638),oklch(38.1% 0.176 304.987))`,
        borderColor: "rgba(124, 58, 237, 0.6)",
      }}
    >
      <div
        className="absolute inset-0 animate-pulse-slow"
        style={{
          background: `linear-gradient(to right, rgba(124, 58, 237, 0.2) 0%, rgba(180, 83, 9, 0.15) 50%, rgba(124, 58, 237, 0.2) 100%)`,
        }}
      ></div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 h-full relative z-10">
        {fullItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="flex items-center gap-1 sm:gap-2 backdrop-blur-md px-2 sm:px-3 md:px-3 lg:px-4 h-[22px] md:h-[24px] lg:h-[26px] rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-[10px] sm:text-xs md:text-sm lg:text-base group relative overflow-hidden"
            style={{
              background: `linear-gradient(to right, rgba(124, 58, 237, 0.4), rgba(180, 83, 9, 0.3))`,
              border: "1px solid rgba(168, 85, 247, 0.6)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, rgba(124, 58, 237, 0.6), rgba(180, 83, 9, 0.5))`;
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, rgba(124, 58, 237, 0.4), rgba(180, 83, 9, 0.3))`;
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.6)";
            }}
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <Image
              src={item.iconUrl}
              alt={item.name}
              width={12}
              height={12}
              className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px] group-hover:scale-110 transition-transform duration-300 relative z-10"
            />
            <span
              className="font-medium leading-none hidden sm:inline transition-all duration-300 relative z-10 drop-shadow-sm"
              style={{
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              {item.description}
            </span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 h-full relative z-10">
        {imageOnlyItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="flex items-center justify-center backdrop-blur-md rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px] group relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(180, 83, 9, 0.4))`,
              border: "1px solid rgba(168, 85, 247, 0.6)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, rgba(124, 58, 237, 0.7), rgba(180, 83, 9, 0.6))`;
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(180, 83, 9, 0.4))`;
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.6)";
            }}
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/25 to-amber-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <Image
              src={item.iconUrl || DEFAULT_ICON_URL}
              alt={item.name}
              width={10}
              height={10}
              className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[12px] md:h-[12px] lg:w-[14px] lg:h-[14px] group-hover:scale-110 transition-transform duration-300 relative z-10 filter brightness-0 invert"
              style={{
                filter: "brightness(0) invert(1)",
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkBar;
