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

const AUTO_CYCLE_INTERVAL = 3000;

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(destination.wish || false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const router = useRouter();

  const totalImages = destination.images.length;

  useEffect(() => {
    if (totalImages <= 1) return;
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => {
          setPrevImageIndex(prev);
          return (prev + 1) % totalImages;
        });
      }, AUTO_CYCLE_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, totalImages]);

  const handleImageSwitch = (imageIndex: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPrevImageIndex(activeImageIndex);
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
    setWishlistAnimating(true);
    setLoadingWishlist(true);
    setTimeout(() => setWishlistAnimating(false), 500);
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

  const categories = destination.destinationCategoryDetailsDtos || [];
  const visibleCategories = categoriesExpanded
    ? categories
    : categories.slice(0, 2);
  const hasMoreCategories = categories.length > 2;

  return (
    <>
      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Crossfade image layers */
        @keyframes imageFadeIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Heart beat pop */
        @keyframes heartPop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.4); }
          60%  { transform: scale(0.88); }
          80%  { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        /* Ripple from wishlist button */
        @keyframes rippleOut {
          0%   { transform: scale(0.6); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* Stagger-in for category tags */
        @keyframes tagSlideIn {
          from { opacity: 0; transform: translateY(6px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Card shadow bloom */
        .destination-card {
          transition:
            box-shadow 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
            transform  0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .destination-card:hover {
          box-shadow:
            0 20px 60px -12px rgba(11,126,168,0.22),
            0 8px 24px -8px  rgba(14,158,142,0.15);
          transform: translateY(-5px);
        }

        /* Explore button */
        .explore-btn {
          transition:
            box-shadow 0.3s ease,
            transform  0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .explore-btn:hover {
          box-shadow:
            0 8px 20px -4px rgba(11,126,168,0.45),
            0 4px 12px -4px rgba(14,158,142,0.35);
          transform: translateY(-2px) scale(1.02);
        }
        .explore-btn:active {
          transform: translateY(0) scale(0.97);
          box-shadow: 0 2px 8px -2px rgba(11,126,168,0.3);
        }
        .explore-btn .shimmer {
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-110%);
        }
        .explore-btn:hover .shimmer {
          transform: translateX(110%);
        }

        /* Wishlist button */
        .wishlist-btn {
          transition:
            transform  0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.3s ease,
            background 0.25s ease;
        }
        .wishlist-btn:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 16px -4px rgba(244,63,94,0.4);
        }
        .wishlist-btn:active {
          transform: scale(0.92);
        }
        .wishlist-btn.animating .heart-icon {
          animation: heartPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .wishlist-btn.animating .ripple {
          animation: rippleOut 0.5s ease-out forwards;
        }

        /* Thumbnail */
        .thumb-item {
          transition:
            transform  0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
            border-color 0.2s ease,
            box-shadow  0.25s ease;
        }
        .thumb-item:hover { transform: scale(1.1); }
        .thumb-item.active {
          box-shadow: 0 0 0 2px #38bdf8, 0 4px 12px -4px rgba(56,189,248,0.5);
        }

        /* Smooth height for description expand */
        .description-content {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: -webkit-line-clamp 0.3s ease;
        }
        .description-content.collapsed {
          -webkit-line-clamp: 3;
        }
        .description-content.expanded {
          -webkit-line-clamp: unset;
        }

        /* Dots */
        .dot-indicator {
          transition:
            width      0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        /* Category tag stagger */
        .category-tag {
          animation: tagSlideIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        /* Image fade */
        .image-layer {
          position: absolute;
          inset: 0;
          transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .image-layer.entering {
          animation: imageFadeIn 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Rating badge pulse on hover */
        .rating-badge {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        }
        .rating-badge:hover {
          transform: scale(1.08);
          box-shadow: 0 2px 8px -2px rgba(11,126,168,0.25);
        }

        /* Show more/less button */
        .toggle-btn {
          transition: color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .toggle-btn:hover { transform: translateX(2px); }
        .toggle-btn:active { transform: scale(0.96); }
      `}</style>

      <div className="destination-card bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-full flex flex-col border border-sky-100 relative">
        {/* ── Image Gallery ── */}
        <div
          className="relative h-44 sm:h-52 md:h-56 overflow-hidden flex-shrink-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {destination.images.length > 0 ? (
            <>
              {/* Previous image fading out */}
              {prevImageIndex !== null &&
                prevImageIndex !== activeImageIndex && (
                  <div
                    className="image-layer"
                    style={{ opacity: 0, zIndex: 1 }}
                  >
                    <Image
                      src={
                        destination.images[prevImageIndex]?.imageUrl ||
                        PLACE_HOLDER_IMAGE
                      }
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
              {/* Active image fading in */}
              <div className="image-layer entering" style={{ zIndex: 2 }}>
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
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    e.currentTarget.src = PLACE_HOLDER_IMAGE;
                  }}
                />
              </div>
            </>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)",
              }}
            >
              <span className="text-white font-semibold text-base sm:text-lg px-4 text-center">
                {destination.destinationName}
              </span>
            </div>
          )}

          {/* Gradient overlay — subtle depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 3,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(0,0,0,0.18) 100%)",
            }}
          />

          {/* Wishlist Button */}
          {user && (
            <button
              onClick={handleWishlistToggle}
              disabled={loadingWishlist}
              className={`wishlist-btn ${wishlistAnimating ? "animating" : ""} absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full shadow-lg z-10 cursor-pointer ${
                loadingWishlist ? "opacity-60 cursor-not-allowed" : ""
              }`}
              style={{ zIndex: 10 }}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {/* Ripple ring */}
              <span
                className="ripple absolute inset-0 rounded-full border-2 border-rose-400 opacity-0"
                style={{ zIndex: 0 }}
              />

              {loadingWishlist ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 animate-spin relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : isWishlisted ? (
                <svg
                  className="heart-icon w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    filter: "drop-shadow(0 1px 4px rgba(244,63,94,0.5))",
                    transition: "filter 0.3s ease",
                  }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  className="heart-icon w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                  style={{ transition: "color 0.25s ease" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>
          )}

          {/* Thumbnail Strip */}
          {destination.images.length > 1 && (
            <div
              className="absolute bottom-3 right-3 flex flex-row gap-1.5"
              style={{ zIndex: 10 }}
            >
              {destination.images.slice(0, 4).map((image, index) => (
                <div
                  key={image.imageId}
                  onClick={() => handleImageSwitch(index)}
                  className={`thumb-item w-10 h-7 sm:w-12 sm:h-9 rounded-md overflow-hidden border-2 cursor-pointer ${
                    activeImageIndex === index
                      ? "active border-sky-400"
                      : "border-white/80 hover:border-sky-300"
                  }`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={70}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = PLACE_HOLDER_IMAGE;
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Dot indicators + progress bar */}
          {destination.images.length > 1 && (
            <div
              className="absolute bottom-3 left-3 flex flex-col gap-1.5"
              style={{ zIndex: 10 }}
            >
              <div className="flex items-center gap-1.5">
                {destination.images.slice(0, 4).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSwitch(index)}
                    className="dot-indicator cursor-pointer rounded-full focus:outline-none"
                    style={{
                      width: activeImageIndex === index ? 18 : 6,
                      height: 6,
                      background:
                        activeImageIndex === index
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.5)",
                      boxShadow:
                        activeImageIndex === index
                          ? "0 0 8px rgba(0,0,0,0.4)"
                          : "none",
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Auto-cycle progress bar */}
              {!isHovered && (
                <div
                  className="h-0.5 rounded-full overflow-hidden"
                  style={{ width: 56, background: "rgba(255,255,255,0.25)" }}
                >
                  <div
                    key={activeImageIndex}
                    className="h-full rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      animation: `slideProgress ${AUTO_CYCLE_INTERVAL}ms cubic-bezier(0.4,0,0.2,1) forwards`,
                    }}
                  />
                </div>
              )}
            </div>
          )}
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
            <div className="rating-badge flex items-center gap-1 flex-shrink-0 px-2 py-1 rounded-lg border border-[#b3e0f2] bg-[#f0faff] cursor-default select-none">
              <svg
                className="w-3.5 h-3.5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span
                className="text-xs font-semibold"
                style={{ color: "#0B7EA8" }}
              >
                {destination.rating}
              </span>
            </div>
          </div>

          {/* Description with animated Show More/Less */}
          <div className="flex flex-col gap-1">
            <p
              className={`description-content text-gray-500 text-sm leading-relaxed ${
                descriptionExpanded ? "expanded" : "collapsed"
              }`}
            >
              {destination.destinationDescription}
            </p>
            {destination.destinationDescription &&
              destination.destinationDescription.length > 150 && (
                <button
                  onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                  className="toggle-btn text-xs font-semibold text-[#0B7EA8] hover:text-[#0E9E8E] self-start mt-1 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7EA8]/30 rounded px-1"
                >
                  {descriptionExpanded ? "Show less" : "Show more"}
                </button>
              )}
          </div>

          {/* Location + Categories */}
          <div className="flex flex-col gap-2">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span
                className="font-medium text-sm"
                style={{ color: "#095f82" }}
              >
                {destination.location}
              </span>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "#228B22" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
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
                    className={`category-tag inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      category.isPrimary
                        ? "ring-1 ring-offset-1 ring-[#228B22]/50"
                        : ""
                    }`}
                    style={{
                      background: category.isPrimary
                        ? "linear-gradient(135deg, rgba(34,139,34,0.15), rgba(60,179,113,0.15))"
                        : "linear-gradient(135deg, rgba(34,139,34,0.08), rgba(60,179,113,0.08))",
                      borderColor: "#228B22",
                      color: "#006400",
                      animationDelay: `${index * 45}ms`,
                      transition:
                        "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
                    }}
                    title={category.description || category.name}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.transform =
                        "scale(1.05)";
                      (e.currentTarget as HTMLSpanElement).style.boxShadow =
                        "0 2px 8px -2px rgba(34,139,34,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.transform =
                        "scale(1)";
                      (e.currentTarget as HTMLSpanElement).style.boxShadow =
                        "none";
                    }}
                  >
                    {category.name}
                    {category.isPrimary && (
                      <span className="ml-1 text-[10px] opacity-70">
                        (Primary)
                      </span>
                    )}
                  </span>
                ))}

                {hasMoreCategories && (
                  <button
                    onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                    style={{
                      background: categoriesExpanded
                        ? "linear-gradient(135deg, rgba(34,139,34,0.12), rgba(60,179,113,0.12))"
                        : "linear-gradient(135deg, rgba(34,139,34,0.08), rgba(60,179,113,0.08))",
                      borderColor: "#228B22",
                      color: "#006400",
                      transition:
                        "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1.06)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 2px 10px -2px rgba(34,139,34,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "none";
                    }}
                    onMouseDown={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(0.95)";
                    }}
                    onMouseUp={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1.06)";
                    }}
                    aria-expanded={categoriesExpanded}
                  >
                    {categoriesExpanded ? (
                      <>
                        <svg
                          className="w-3 h-3"
                          style={{
                            transition:
                              "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                          }}
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

                {categories.length === 0 && (
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,139,34,0.08), rgba(60,179,113,0.08))",
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                {destination.activities.length} activities
              </span>
            </div>

            {/* Explore CTA */}
            <button
              onClick={handleExploreClick}
              className="explore-btn group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer relative overflow-hidden flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9E8E]/50 focus-visible:ring-offset-1"
              style={{
                background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)",
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="shimmer absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                  pointerEvents: "none",
                }}
              />
              <span className="relative flex items-center gap-1.5">
                Explore
                <svg
                  className="w-3.5 h-3.5"
                  style={{
                    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ref={(el) => {
                    // Handled via CSS group-hover in parent
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationCard;
