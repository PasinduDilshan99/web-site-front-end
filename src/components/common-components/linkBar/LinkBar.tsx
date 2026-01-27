"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LinkBarItem } from "@/types/link-bar-types";
import { DEFAULT_ICON_URL } from "@/utils/constant";
import { FULL, ICON_ONLY } from "../../../../public/data/link-bar-data";
import { LinkBarService } from "@/services/linkBarService";
import BasicLoading from "../basic-loading/BasicLoading";

const LinkBar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fullItems, setFullItems] = useState<LinkBarItem[]>([]);
  const [imageOnlyItems, setImageOnlyItems] = useState<LinkBarItem[]>([]);

  useEffect(() => {
    const fetchLinkBarItems = async () => {
      try {
        const { data: items, error } =
          await LinkBarService.fetchAllLinkBarData();

        if (error) {
          setError(error);
        } else {
          setFullItems(items.filter((item) => item.typeName === FULL));
          setImageOnlyItems(
            items.filter((item) => item.typeName === ICON_ONLY),
          );
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

  if (loading) return <BasicLoading width="w-full" height="h-8" />;
  if (error) return null;

  return (
    <div
      className="relative flex items-center justify-between backdrop-blur-lg border-b px-4 md:px-6 lg:px-8 shadow-xl overflow-hidden"
      style={{
        height: "clamp(36px, 5vw, 48px)",
        background:
          "linear-gradient(90deg, oklch(41.4% 0.112 45.904) 0%, oklch(42.4% 0.199 265.638) 50%, oklch(38.1% 0.176 304.987) 100%)",
        borderColor: "rgba(124, 58, 237, 0.3)",
        boxShadow:
          "0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 2px 6px -1px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Animated Background Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(124, 58, 237, 0.2) 0%, rgba(180, 83, 9, 0.15) 50%, rgba(124, 58, 237, 0.2) 100%)",
          animation: "shimmer 3s ease-in-out infinite",
          opacity: 0.8,
        }}
      />

      {/* Full Items Section */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative z-10 h-full">
        {fullItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="relative inline-flex items-center gap-1.5 sm:gap-2 backdrop-blur-md rounded-full px-2.5 sm:px-3 md:px-3.5 lg:px-4 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group"
            style={{
              height: "clamp(24px, 3.5vw, 30px)",
              background:
                "linear-gradient(90deg, rgba(124, 58, 237, 0.3), rgba(180, 83, 9, 0.2))",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, rgba(124, 58, 237, 0.5), rgba(180, 83, 9, 0.4))";
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.8)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, rgba(124, 58, 237, 0.3), rgba(180, 83, 9, 0.2))";
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)";
              e.currentTarget.style.boxShadow =
                "0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
            }}
            aria-label={`Visit ${item.name} - ${item.description}`}
          >
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(251, 191, 36, 0.15))",
              }}
            />

            {/* Icon */}
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={item.iconUrl}
                alt={item.name}
                width={14}
                height={14}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
                }}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <span
              className="relative z-10 font-medium leading-none text-white transition-all duration-300 hidden sm:inline"
              style={{
                fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                textShadow:
                  "0 1px 2px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.1)",
              }}
            >
              {item.description}
            </span>
          </a>
        ))}
      </div>

      {/* Icon-Only Items Section */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 relative z-10 h-full">
        {imageOnlyItems.map((item) => (
          <a
            key={item.name}
            href={item.linkUrl}
            className="relative inline-flex items-center justify-center backdrop-blur-md rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group"
            style={{
              width: "clamp(22px, 3vw, 28px)",
              height: "clamp(22px, 3vw, 28px)",
              background:
                "linear-gradient(135deg, rgba(124, 58, 237, 0.4), rgba(180, 83, 9, 0.3))",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(124, 58, 237, 0.6), rgba(180, 83, 9, 0.5))";
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.8)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(124, 58, 237, 0.4), rgba(180, 83, 9, 0.3))";
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)";
              e.currentTarget.style.boxShadow =
                "0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
            }}
            aria-label={`Visit ${item.name}`}
          >
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(168, 85, 247, 0.3), transparent 70%)",
              }}
            />

            {/* Icon */}
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={item.iconUrl || DEFAULT_ICON_URL}
                alt={item.name}
                width={12}
                height={12}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                style={{
                  filter: "brightness(0) invert(1)",
                }}
                loading="lazy"
              />
            </div>
          </a>
        ))}
      </div>

      {/* Add shimmer animation to global styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
        }

        @media (max-width: 640px) {
          .sm\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LinkBar;