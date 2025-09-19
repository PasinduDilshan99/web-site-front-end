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
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm border-b border-white/10 h-[32px] px-3 shadow-lg">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 h-full">
        {fullItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-2 sm:px-3 md:px-4 h-[24px] rounded-full shadow-lg hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-400/30 hover:scale-105 transition-all duration-300 text-[10px] sm:text-xs md:text-sm lg:text-base group"
          >
            <Image
              src={item.iconUrl}
              alt={item.name}
              width={12}
              height={12}
              className="sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] group-hover:brightness-110 transition-all duration-300"
            />
            <span className="font-medium text-white/90 group-hover:text-white leading-none hidden sm:inline transition-colors duration-300">
              {item.description}
            </span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 h-full">
        {imageOnlyItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-400/30 hover:scale-110 transition-all duration-300 w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] group"
          >
            <Image
              src={item.iconUrl || DEFAULT_ICON_URL}
              alt={item.name}
              width={12}
              height={12}
              className="sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] group-hover:brightness-110 transition-all duration-300"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkBar;