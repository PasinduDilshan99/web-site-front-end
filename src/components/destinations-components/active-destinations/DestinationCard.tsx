import { EnhancedDestination } from "@/types/destination-types";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { WishListService } from "@/services/wishListService";
import { useAuth } from "@/context/AuthContext";
import { addBrowserHistory } from "@/services/browserHistoryService";
import {
  DESTINATION_BROWSER_HISTORY_TYPE,
  PLACE_HOLDER_IMAGE,
} from "@/utils/constant";
import { DESTINATIONS_PAGE_PATH } from "@/utils/urls";
import Image from "next/image";

interface DestinationCardProps {
  destination: EnhancedDestination;
}

const AUTO_CYCLE_INTERVAL = 3000; // ms between auto-slides

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(destination.wish || false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const router = useRouter();

  const totalImages = destination.images.length;

  // Auto-cycle: runs when not hovered and there are multiple images
  useEffect(() => {
    if (totalImages <= 1) return;

    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % totalImages);
      }, AUTO_CYCLE_INTERVAL);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, totalImages]);

  const handleImageSwitch = (imageIndex: number) => {
    // Manual click resets the timer
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveImageIndex(imageIndex);
  };

  const handleExploreClick = async () => {
    if (user) {
      try {
        await addBrowserHistory({
          type: DESTINATION_BROWSER_HISTORY_TYPE,
          dataId: destination.destinationId,
          name: destination.destinationName,
        });
      } catch (err) {
        console.error("Failed to record browser history:", err);
      }
    }
    router.push(`${DESTINATIONS_PAGE_PATH}/${destination.destinationId}`);
  };

  const handleWishlistToggle = async () => {
    if (loadingWishlist) return;
    setLoadingWishlist(true);
    try {
      await WishListService.addDestinationWishList({
        destinationId: destination.destinationId,
      });
      setIsWishlisted((prev) => !prev);
    } catch (err) {
      console.error("Failed to update wishlist", err);
      alert("Failed to update wishlist. Try again.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  // Categories logic
  const categories = destination.destinationCategoryDetailsDtos || [];
  const visibleCategories = categoriesExpanded 
    ? categories 
    : categories.slice(0, 2);
  const hasMoreCategories = categories.length > 2;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col border border-sky-100 relative">

      {/* ── Image Gallery ── */}
      <div
        className="relative h-44 sm:h-52 md:h-56 overflow-hidden flex-shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {destination.images.length > 0 ? (
          <Image
            src={
              destination.images[activeImageIndex]?.imageUrl ||
              destination.images[0].imageUrl
            }
            alt={
              destination.images[activeImageIndex]?.imageDescription ||
              destination.destinationName
            }
            fill
            className="object-cover transition-all duration-500 ease-in-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = PLACE_HOLDER_IMAGE;
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
          >
            <span className="text-white font-semibold text-base sm:text-lg px-4 text-center">
              {destination.destinationName}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
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
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : isWishlisted ? (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-all duration-300 group-hover:text-rose-400 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/0 via-rose-400/0 to-rose-400/0 group-hover:from-rose-400/10 group-hover:via-rose-400/5 group-hover:to-rose-400/10 transition-all duration-500" />
          </button>
        )}

        {/* Thumbnail Strip */}
        {destination.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex flex-row gap-1.5">
            {destination.images.slice(0, 4).map((image, index) => (
              <div
                key={image.imageId}
                onClick={() => handleImageSwitch(index)}
                className={`w-10 h-7 sm:w-12 sm:h-9 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  activeImageIndex === index
                    ? "border-sky-400 shadow-lg"
                    : "border-white/80 hover:border-sky-300"
                }`}
              >
                <Image
                  src={image.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={70}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = PLACE_HOLDER_IMAGE; }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Dot indicators + progress bar */}
        {destination.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex flex-col gap-1.5">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {destination.images.slice(0, 4).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSwitch(index)}
                  className="cursor-pointer transition-all duration-300 rounded-full focus:outline-none"
                  style={{
                    width: activeImageIndex === index ? 18 : 6,
                    height: 6,
                    background:
                      activeImageIndex === index
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.5)",
                    boxShadow:
                      activeImageIndex === index
                        ? "0 0 6px rgba(0,0,0,0.4)"
                        : "none",
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-cycle progress bar */}
            {!isHovered && (
              <div className="w-full h-0.5 rounded-full bg-white/30 overflow-hidden" style={{ width: 56 }}>
                <div
                  key={activeImageIndex}
                  className="h-full rounded-full bg-white/90"
                  style={{
                    animation: `slideProgress ${AUTO_CYCLE_INTERVAL}ms linear forwards`,
                  }}
                />
              </div>
            )}
          </div>
        )}

        <style>{`
          @keyframes slideProgress {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>
      </div>

      {/* ── Content ── */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">

        {/* Name + Rating row */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-base sm:text-lg font-bold leading-snug line-clamp-2 flex-1"
            style={{ color: "#095f82" }}
          >
            {destination.destinationName}
          </h3>
          {/* Rating badge */}
          <div className="flex items-center gap-1 flex-shrink-0 px-2 py-1 rounded-lg border border-[#b3e0f2] bg-[#f0faff]">
            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: "#0B7EA8" }}>
              {destination.rating}
            </span>
          </div>
        </div>

        {/* Description with Show More/Less */}
        <div className="flex flex-col gap-1">
          <p className={`text-gray-500 text-sm leading-relaxed ${!descriptionExpanded ? 'line-clamp-3' : ''}`}>
            {destination.destinationDescription}
          </p>
          {destination.destinationDescription && destination.destinationDescription.length > 150 && (
            <button
              onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              className="text-xs font-semibold text-[#0B7EA8] hover:text-[#0E9E8E] transition-colors duration-200 self-start mt-1 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7EA8]/30 rounded px-1"
            >
              {descriptionExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Location + Categories */}
        <div className="flex flex-col gap-2">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm">
            <span
              className="inline-flex w-5 h-5 rounded-full items-center justify-center flex-shrink-0"
              style={{ background: "rgba(11,126,168,0.12)" }}
            >
              <svg
                className="w-3 h-3"
                style={{ color: "#0B7EA8" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span
              className="font-medium text-sm"
              style={{ color: "#095f82" }}
            >
              {destination.location}
            </span>
          </div>

          {/* Categories Section */}
          <div className="flex flex-col gap-1.5">
            {/* Category header */}
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

            {/* Category tags */}
            <div className="flex flex-wrap gap-1.5">
              {visibleCategories.map((category, index) => (
                <span
                  key={category.id || index}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    category.isPrimary ? "ring-1 ring-offset-1 ring-[#228B22]/50" : ""
                  }`}
                  style={{
                    background: category.isPrimary
                      ? "linear-gradient(135deg, rgba(34,139,34,0.15), rgba(60,179,113,0.15))"
                      : "linear-gradient(135deg, rgba(34,139,34,0.08), rgba(60,179,113,0.08))",
                    borderColor: "#228B22",
                    color: "#006400",
                  }}
                  title={category.description || category.name}
                >
                  {category.name}
                  {category.isPrimary && (
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

              {/* Fallback if no categories */}
              {categories.length === 0 && (
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                  style={{
                    background: "linear-gradient(135deg, rgba(34,139,34,0.08), rgba(60,179,113,0.08))",
                    borderColor: "#228B22",
                    color: "#006400",
                  }}
                >
                  Uncategorized
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Footer: activities + CTA ── */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3 mt-auto">
          {/* Activities count */}
          <div className="flex items-center gap-1.5">
            <span
              className="inline-flex w-5 h-5 rounded-full items-center justify-center flex-shrink-0"
              style={{ background: "rgba(14,158,142,0.12)" }}
            >
              <svg
                className="w-3 h-3"
                style={{ color: "#0E9E8E" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              {destination.activities.length} activities
            </span>
          </div>

          {/* Explore CTA — mirrors TourDetails "More Details" button */}
          <button
            onClick={handleExploreClick}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer relative overflow-hidden flex-shrink-0"
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
              Explore
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
    </div>
  );
};

export default DestinationCard;