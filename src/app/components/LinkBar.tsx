"use client";

import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Image from "next/image";
import { GET_ALL_LINK_BAR_DATA } from "@/utils/frontEndConstant";
import { LinkBarItem } from "@/types/link-bar-types";
import { FULL, ICON_ONLY } from "../../../public/data/link-bar-data";
import { DEFAULT_ICON_URL } from "@/utils/constant";

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
  if (error) return <div className="text-red-400 text-sm p-2">Error: {error}</div>;

  return (
    <div 
      className="flex items-center justify-between backdrop-blur-lg border-b h-[32px] md:h-[36px] lg:h-[40px] px-3 md:px-4 lg:px-6 shadow-xl relative overflow-hidden"
      style={{
        background: `linear-gradient(to right, var(--link-bar-bg-from), var(--link-bar-bg-via), var(--link-bar-bg-to))`,
        borderColor: 'var(--link-bar-border)'
      }}
    >
      <div 
        className="absolute inset-0 animate-pulse-slow"
        style={{
          background: `linear-gradient(to right, var(--link-bar-overlay-from), var(--link-bar-overlay-via), var(--link-bar-overlay-to))`
        }}
      ></div>
      
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 h-full relative z-10">
        {fullItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="flex items-center gap-1 sm:gap-2 backdrop-blur-md px-2 sm:px-3 md:px-3 lg:px-4 h-[22px] md:h-[24px] lg:h-[26px] rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-[10px] sm:text-xs md:text-sm lg:text-base group relative overflow-hidden"
            style={{
              background: `linear-gradient(to right, var(--link-bar-full-from), var(--link-bar-full-to))`,
              border: '1px solid var(--link-bar-border)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, var(--link-bar-full-hover-from), var(--link-bar-full-hover-to))`;
              e.currentTarget.style.borderColor = 'var(--link-bar-full-hover-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(to right, var(--link-bar-full-from), var(--link-bar-full-to))`;
              e.currentTarget.style.borderColor = 'var(--link-bar-border)';
            }}
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
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
                color: 'var(--link-bar-text)'
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
              background: `linear-gradient(to bottom right, var(--link-bar-icon-from), var(--link-bar-icon-to))`,
              border: '1px solid var(--link-bar-border)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(to bottom right, var(--link-bar-icon-hover-from), var(--link-bar-icon-hover-to))`;
              e.currentTarget.style.borderColor = 'var(--link-bar-icon-hover-border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(to bottom right, var(--link-bar-icon-from), var(--link-bar-icon-to))`;
              e.currentTarget.style.borderColor = 'var(--link-bar-border)';
            }}
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <Image
              src={item.iconUrl || DEFAULT_ICON_URL}
              alt={item.name}
              width={10}
              height={10}
              className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[12px] md:h-[12px] lg:w-[14px] lg:h-[14px] group-hover:scale-110 transition-transform duration-300 relative z-10"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkBar;