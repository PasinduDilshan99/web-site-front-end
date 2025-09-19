"use client";

import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Image from "next/image";

interface LinkBarItem {
  name: string;
  description: string;
  typeName: string;
  typeStatus: string;
  iconUrl: string;
  linkUrl: string;
  itemStatus: string;
  itemStatusStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number | null;
}

const LinkBar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fullItems, setFullItems] = useState<LinkBarItem[]>([]);
  const [imageOnlyItems, setImageOnlyItems] = useState<LinkBarItem[]>([]);

  useEffect(() => {
    const fetchLinkBarItems = async () => {
      try {
        const response = await fetch("/api/link-bar");
        const data = await response.json();

        if (response.ok) {
          const items: LinkBarItem[] = data.data || [];

          setFullItems(items.filter((item) => item.typeName === "FULL"));
          setImageOnlyItems(
            items.filter((item) => item.typeName === "IMAGE_ONLY")
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
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-[28px] px-2">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 h-full">
        {fullItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="
              flex items-center gap-1 sm:gap-2 bg-blue-600 
              px-1 sm:px-2 md:px-3 
              h-[20px] rounded shadow 
              hover:bg-gray-100 transition 
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
            <span className="font-medium text-gray-800 leading-none hidden sm:inline">
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
              bg-blue-600 rounded-full shadow 
              hover:scale-110 transition-transform 
              w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]
            "
          >
            <Image
              src={item.iconUrl || "/images/link-bar-images/default.png"}
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
