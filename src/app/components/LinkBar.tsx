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
    <div
      className="
    flex items-center justify-between 
    bg-gradient-to-r 
    from-[var(--link-bar-gradient-start)] 
    via-[var(--link-bar-gradient-mid)] 
    to-[var(--link-bar-gradient-end)] 
    h-[28px] px-2
  "
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 h-full">
        {fullItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="
          flex items-center gap-1 sm:gap-2 
          bg-[var(--link-bar-full-bg)] 
          px-1 sm:px-2 md:px-3 
          h-[20px] rounded shadow 
          hover:bg-[var(--link-bar-full-hover)] 
          transition 
          text-[10px] sm:text-xs md:text-sm lg:text-base
        "
          >
            <Image
              src={item.iconUrl}
              alt={item.name}
              width={12}
              height={12}
              className="sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px]"
            />
            <span className="font-medium text-[var(--link-bar-text)] leading-none hidden sm:inline">
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
            className="
          flex items-center justify-center 
          bg-[var(--link-bar-icon-bg)] 
          rounded-full shadow 
          hover:scale-110 transition-transform 
          w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]
        "
          >
            <Image
              src={item.iconUrl || DEFAULT_ICON_URL}
              alt={item.name}
              width={12}
              height={12}
              className="sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px]"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkBar;
