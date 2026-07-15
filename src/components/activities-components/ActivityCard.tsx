"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ActiveActivitiesType } from "@/types/activity-types";
import { useRouter } from "next/navigation";
import { WishListService } from "@/services/wishListService";
import { useAuth } from "@/context/AuthContext";
import { addBrowserHistory } from "@/services/browserHistoryService";
import { ACTIVITY_BROWSER_HISTORY_TYPE, PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { ACTIVITIES_PAGE_PATH } from "@/utils/urls";

interface ActivityCardProps {
  activity: ActiveActivitiesType;
}

const AUTO_CYCLE_INTERVAL = 3000;

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(activity.wish);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalImages = activity.images?.length ?? 0;

  // ── Auto-cycle ────────────────────────────────────────────────────────────
  const startCycle = useCallback(() => {
    if (totalImages <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % totalImages);
    }, AUTO_CYCLE_INTERVAL);
  }, [totalImages]);

  const stopCycle = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startCycle();
    return () => stopCycle();
  }, [startCycle, stopCycle]);

  const handleImageSwitch = (index: number) => {
    setActiveImageIndex(index);
    startCycle();
  };

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleMoreDetails = async () => {
    if (user) {
      try {
        await addBrowserHistory({
          type: ACTIVITY_BROWSER_HISTORY_TYPE,
          dataId: activity.id,
          name: activity.name,
        });
      } catch (err) {
        console.error("Failed to record browser history:", err);
      }
    }
    router.push(`${ACTIVITIES_PAGE_PATH}/${activity.id}?name=${activity.name}`);
  };

  const handleWishlistToggle = async () => {
    if (loadingWishlist) return;
    setLoadingWishlist(true);
    try {
      await WishListService.addActivityWishList({ activityId: activity.id });
      setIsWishlisted((prev) => !prev);
    } catch (err) {
      console.error("Failed to update wishlist", err);
      alert("Failed to update wishlist. Try again.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  // FIXED: Handle null/undefined season
  const getSeasonBadges = (seasonString: string | null | undefined) => {
    if (!seasonString) return [];
    return seasonString.split(",").map((s) => s.trim());
  };

  // Categories logic
  const categories = activity.activities_category || [];
  const visibleCategories = categoriesExpanded 
    ? categories 
    : categories.slice(0, 2);
  const hasMoreCategories = categories.length > 2;

  const primaryCategory = categories.find((c) => c.is_primary) ?? categories[0];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col border border-sky-100 relative">

      {/* ── Image Gallery ── */}
      <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden flex-shrink-0">
        {totalImages > 0 ? (
          <>
            {activity.images.map((img, index) => (
              <div
                key={img.id ?? index}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: activeImageIndex === index ? 1 : 0 }}
              >
                <Image
                  src={img.image_url ?? img.image_url ?? PLACE_HOLDER_IMAGE}
                  alt={img.description ?? img.description ?? activity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => { e.currentTarget.src = PLACE_HOLDER_IMAGE; }}
                />
              </div>
            ))}

            {/* Progress bar */}
            {totalImages > 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-10">
                <div
                  key={activeImageIndex}
                  className="h-full bg-white/80 rounded-full"
                  style={{ animation: `progressBar ${AUTO_CYCLE_INTERVAL}ms linear forwards` }}
                />
              </div>
            )}
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
          >
            <span className="text-white font-semibold text-base sm:text-lg px-4 text-center">
              {activity.name}
            </span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Category badge — top left */}
        {primaryCategory && (
          <div
            className="absolute top-3 left-3 z-10 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm"
            style={{
              background: "rgba(11,126,168,0.85)",
              borderColor: "rgba(255,255,255,0.3)",
              color: "#fff",
            }}
          >
            {primaryCategory.name}
          </div>
        )}

        {/* Wishlist button — top right */}
        {user && (
          <button
            onClick={handleWishlistToggle}
            disabled={loadingWishlist}
            className={`absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-10 group cursor-pointer ${
              loadingWishlist
                ? "opacity-60 cursor-not-allowed scale-95"
                : "hover:scale-110 active:scale-95 hover:bg-white"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {loadingWishlist ? (
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : isWishlisted ? (
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-all duration-300 group-hover:text-rose-400 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            <span className="absolute inset-0 rounded-full group-hover:from-rose-400/10 group-hover:via-rose-400/5 group-hover:to-rose-400/10 transition-all duration-500" />
          </button>
        )}

        {/* Dot indicators */}
        {totalImages > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {activity.images.slice(0, 6).map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageSwitch(index)}
                className="cursor-pointer transition-all duration-300 rounded-full"
                style={{
                  width: activeImageIndex === index ? 16 : 6,
                  height: 6,
                  background: activeImageIndex === index
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.45)",
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {totalImages > 1 && (
          <div className="absolute top-3 left-3 mt-7 bg-black/40 text-white px-2 py-0.5 rounded-md text-xs font-medium backdrop-blur-sm z-10">
            {activeImageIndex + 1} / {totalImages}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">

        {/* Name */}
        <h3
          className="text-base sm:text-lg font-bold leading-snug line-clamp-2"
          style={{ color: "#095f82" }}
        >
          {activity.name}
        </h3>

        {/* Description with Show More/Less */}
        <div className="flex flex-col gap-1">
          <p className={`text-gray-500 text-sm leading-relaxed ${!descriptionExpanded ? 'line-clamp-2' : ''}`}>
            {activity.description}
          </p>
          {activity.description && activity.description.length > 120 && (
            <button
              onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              className="text-xs font-semibold text-[#0B7EA8] hover:text-[#0E9E8E] transition-colors duration-200 self-start mt-1 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7EA8]/30 rounded px-1"
            >
              {descriptionExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Duration + Participants */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Duration */}
          <div className="inline-flex items-stretch rounded-xl overflow-hidden border border-[#b3e0f2] shadow-sm text-xs font-semibold tracking-wide">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B7EA8] text-white">
              <svg className="w-3.5 h-3.5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{activity.duration_hours}h</span>
              <span className="font-normal opacity-80">Duration</span>
            </div>
          </div>

          {/* Participants */}
          <div className="inline-flex items-stretch rounded-xl overflow-hidden border border-[#b3f2e6] shadow-sm text-xs font-semibold tracking-wide">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E9E8E] text-white">
              <svg className="w-3.5 h-3.5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>
                {activity.max_participate === 0
                  ? "Any"
                  : `${activity.min_participate}–${activity.max_participate}`}
              </span>
              <span className="font-normal opacity-80">People</span>
            </div>
          </div>
        </div>

        {/* Best Seasons - FIXED with null check */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "#0B7EA8" }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Best Seasons
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#40E0D0]/30 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {/* FIXED: Added better key and null check */}
            {getSeasonBadges(activity.season).map((season, idx) => (
              <span
                key={`${season}-${idx}`}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                style={{
                  background: "linear-gradient(135deg, rgba(251,191,36,0.10), rgba(245,158,11,0.10))",
                  borderColor: "#f59e0b",
                  color: "#92400e",
                }}
              >
                {season}
              </span>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="flex flex-col gap-1.5">
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
                {categories.length > 1 ? "Categories" : "Category"}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#228B22]/30 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {visibleCategories.map((category, index) => (
                <span
                  key={category.id || index}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    category.is_primary ? "ring-1 ring-offset-1 ring-[#228B22]/50" : ""
                  }`}
                  style={{
                    background: category.is_primary
                      ? "linear-gradient(135deg, rgba(34,139,34,0.15), rgba(60,179,113,0.15))"
                      : "linear-gradient(135deg, rgba(34,139,34,0.08), rgba(60,179,113,0.08))",
                    borderColor: "#228B22",
                    color: "#006400",
                  }}
                  title={category.description || category.name}
                >
                  {category.name}
                  {category.is_primary && (
                    <span className="ml-1 text-[10px] opacity-70">(Primary)</span>
                  )}
                </span>
              ))}

              {/* Categories "More" button */}
              {hasMoreCategories && (
                <button
                  onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-all duration-200 hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                  style={{
                    background: categoriesExpanded
                      ? "linear-gradient(135deg, rgba(34,139,34,0.12), rgba(60,179,113,0.12))"
                      : "linear-gradient(135deg, rgba(34,139,34,0.08), rgba(60,179,113,0.08))",
                    borderColor: "#228B22",
                    color: "#006400",
                  }}
                  aria-expanded={categoriesExpanded}
                >
                  {categoriesExpanded ? (
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
                    <>+{categories.length - 2} more</>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Footer: CTA ── */}
        <div className="pt-3 border-t border-gray-100 mt-auto">
          <button
            onClick={handleMoreDetails}
            className="w-full group inline-flex justify-center items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
          >
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
            />
            {/* Focus ring */}
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: "0 0 0 3px rgba(14,158,142,0.3)" }}
            />
            <span className="relative flex items-center gap-1.5 transition-transform duration-200 group-hover:-translate-y-px group-active:translate-y-0 group-active:scale-95">
              More Details
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Progress bar keyframe */}
      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ActivityCard;