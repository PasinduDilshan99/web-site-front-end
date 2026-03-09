"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import AnimatedButton from "../../../common-components/buttons/AnimatedButton";
import SectionHeader from "../../../common-components/section-header/SectionHeader";
import Image from "next/image";
import { ActiveActivitiesCategoriesType, CategoryImage } from "@/types/activity-types";
import { ActivityService } from "@/services/activityService";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { useRouter } from "next/navigation";

// Category Image Component with Fallback
const CategoryImageComponent = React.memo(
  ({
    primaryImage,
    categoryName,
    categoryId,
    images,
  }: {
    primaryImage: string;
    categoryName: string;
    categoryId: number;
    images: CategoryImage[];
  }) => {
    const [imgSrc, setImgSrc] = useState(primaryImage);
    const [hasError, setHasError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      setImgSrc(primaryImage);
      setHasError(false);
    }, [primaryImage]);

    // Image rotation effect on hover
    useEffect(() => {
      if (isHovered && images.length > 1) {
        imageIntervalRef.current = setInterval(() => {
          setCurrentImageIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % images.length;
            setImgSrc(images[nextIndex].imageUrl);
            return nextIndex;
          });
        }, 1500);
      }

      return () => {
        if (imageIntervalRef.current) {
          clearInterval(imageIntervalRef.current);
        }
      };
    }, [isHovered, images]);

    const handleError = () => {
      if (!hasError) {
        setImgSrc(PLACE_HOLDER_IMAGE);
        setHasError(true);
      }
    };

    return (
      <div
        className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0);
          setImgSrc(primaryImage);
        }}
      >
        <Image
          key={`${categoryId}-${currentImageIndex}-${hasError}`}
          src={imgSrc}
          alt={categoryName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={400}
          height={400}
          onError={handleError}
          priority={categoryId < 4}
        />

        {/* Image indicators for multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white w-3" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {hasError && <div className="absolute inset-0 bg-black/20" />}
      </div>
    );
  },
);

CategoryImageComponent.displayName = "CategoryImageComponent";

// GAP between cards in pixels — keep in sync with the inline style below
const GAP_PX = 24; // matches gap-6 (1.5rem = 24px at base 16px)

const ActivityCategoriesHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeActivitiesCategories, setActiveActivitiesCategories] = useState<
    ActiveActivitiesCategoriesType[]
  >([]);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  // When true, the transition is disabled so we can silently snap back to start
  const [isTransitioning, setIsTransitioning] = useState(true);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  // outerRef: full-width section wrapper — used for width measurement only (no padding applied to it)
  const outerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Side padding in px — must stay in sync with px-* on the padded wrapper div below
  const getSidePadding = useCallback(() => {
    if (typeof window === "undefined") return 16;
    const w = window.innerWidth;
    if (w >= 1280) return 48; // xl:px-12
    if (w >= 1024) return 40; // lg:px-10
    if (w >= 768)  return 32; // md:px-8
    if (w >= 640)  return 24; // sm:px-6
    return 16;                // px-4
  }, []);

  // Card width = (outerWidth - 2×sidePadding - gaps) / cardsPerView
  const measureCardWidth = useCallback(() => {
    if (!outerRef.current) return;
    const outerWidth = outerRef.current.offsetWidth;
    const padding = getSidePadding();
    const innerWidth = outerWidth - padding * 2;
    const totalGap = GAP_PX * (cardsPerView - 1);
    const computed = (innerWidth - totalGap) / cardsPerView;
    setCardWidth(Math.floor(computed));
  }, [cardsPerView, getSidePadding]);

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else if (width < 1280) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Re-measure card width whenever cardsPerView or categories change
  useEffect(() => {
    measureCardWidth();
    window.addEventListener("resize", measureCardWidth);
    return () => window.removeEventListener("resize", measureCardWidth);
  }, [measureCardWidth, activeActivitiesCategories.length]);

  const totalReal = activeActivitiesCategories.length;
  // We append `cardsPerView` clones at the end for the infinite effect
  const cloneCount = cardsPerView;
  // The real last slide index (before clones) — scrolls up to and including the clones
  const maxIndex = Math.max(0, totalReal); // currentIndex can go up to totalReal (into clones)
  const canShowCarousel = totalReal > cardsPerView;

  // Infinite loop: when we land on a clone position, snap silently back to real start
  useEffect(() => {
    if (currentIndex >= totalReal) {
      // Wait for the CSS transition to finish (500ms), then silently snap to 0
      const snapTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
      return () => clearTimeout(snapTimer);
    }
  }, [currentIndex, totalReal]);

  // Re-enable transition after the silent snap
  useEffect(() => {
    if (!isTransitioning) {
      const reenableTimer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(reenableTimer);
    }
  }, [isTransitioning]);

  // Auto-play carousel — always advances forward, infinite
  useEffect(() => {
    if (isAutoPlaying && canShowCarousel) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 3000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, canShowCarousel]);

  // Reset index when cardsPerView changes to avoid out-of-bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsPerView]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const { data: categories, error } =
          await ActivityService.fetchActiveActivitiesCategories();

        if (error) {
          setError(error);
        } else {
          setActiveActivitiesCategories(categories);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching activity categories:", err);
        setError("Something went wrong while fetching activity categories");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getPrimaryImage = (category: ActiveActivitiesCategoriesType) => {
    if (category.images && category.images.length > 0) {
      return category.images[0].imageUrl;
    }
    return PLACE_HOLDER_IMAGE;
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/activities?category=${encodeURIComponent(categoryName)}`);
  };

  const handleExploreClick = (e: React.MouseEvent, categoryName: string) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/activities?category=${encodeURIComponent(categoryName)}`);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // The correct translate: shift by (cardWidth + gap) per step
  const translateX = currentIndex * (cardWidth + GAP_PX);

  // Build display list: real items + cloned first `cloneCount` items for seamless loop
  const displayCategories = [
    ...activeActivitiesCategories,
    ...activeActivitiesCategories.slice(0, cloneCount),
  ];

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-500/30">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>
              <span className="text-teal-300 text-sm">
                Loading activity categories...
              </span>
            </div>
          </div>

          <div className="flex gap-6">
            {[...Array(cardsPerView)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-xl sm:rounded-2xl overflow-hidden animate-pulse border border-teal-500/20"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-gray-700 to-teal-800/50" />
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="h-5 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-700 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="bg-white py-6 lg:py-8 xl:py-12">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Popular Activities"
            title="Discover Actual Adventure"
            description="Explore our diverse range of activity categories and find your perfect adventure"
            fromColor="#A855F7"
            toColor="#F59E0B"
          />
        </div>

        {/* Carousel Container */}
        {activeActivitiesCategories.length > 0 && (
          /* outerRef: full section width, no padding — used only for card width math */
          <div className="relative" ref={outerRef}>
            {/* Padded + clipped container — padding is symmetric so both edges show */}
            <div className="overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
              <div
                className="flex"
                style={{
                  gap: `${GAP_PX}px`,
                  transform: `translateX(-${translateX}px)`,
                  transition: isTransitioning ? "transform 500ms ease-out" : "none",
                }}
              >
                {displayCategories.map((category, displayIndex) => {
                  const primaryImage = getPrimaryImage(category);
                  // Use a composite key so clones don't collide with originals
                  const key = `${category.categoryId}-${displayIndex}`;

                  return (
                    <div
                      key={key}
                      style={{
                        width: cardWidth > 0 ? `${cardWidth}px` : undefined,
                        flex: cardWidth > 0 ? "0 0 auto" : "1 0 0",
                      }}
                    >
                      <div
                        className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 lg:hover:-translate-y-3 cursor-pointer h-full"
                        onMouseEnter={() =>
                          setHoveredCategory(category.categoryId)
                        }
                        onMouseLeave={() => setHoveredCategory(null)}
                        onClick={() =>
                          handleCategoryClick(category.categoryName)
                        }
                      >
                        {/* Category Image */}
                        <div className="relative">
                          <CategoryImageComponent
                            primaryImage={primaryImage}
                            categoryName={category.categoryName}
                            categoryId={category.categoryId}
                            images={category.images || []}
                          />

                          {/* Default Transparent Overlay */}
                          <div
                            className="absolute inset-0 transition-all duration-300"
                            style={{
                              backgroundColor: ActivityService.hexToRgba(
                                category.color,
                                0.15,
                              ),
                            }}
                          />

                          {/* Hover Overlay */}
                          <div
                            className={`absolute inset-0 transition-all duration-300 ${
                              hoveredCategory === category.categoryId
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            style={{
                              backgroundColor: ActivityService.hexToRgba(
                                category.hoverColor,
                                0.25,
                              ),
                            }}
                          />

                          {/* Activity Count Badge */}
                          {category.numberOfActivities > 1 && (
                            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                              {category.numberOfActivities} activities
                            </div>
                          )}

                          {/* Category Name Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                            <div
                              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur-sm"
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                border: `2px solid ${ActivityService.hexToRgba(category.color, 0.2)}`,
                              }}
                            >
                              <h3
                                className="text-base sm:text-lg lg:text-xl font-bold text-center"
                                style={{ color: category.color }}
                              >
                                {category.categoryName}
                              </h3>
                            </div>
                          </div>

                          {/* Hover Content */}
                          <div
                            className={`absolute inset-0 flex flex-col justify-center items-center p-3 sm:p-4 lg:p-6 text-center transition-all duration-300 ${
                              hoveredCategory === category.categoryId
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                            }`}
                          >
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 transform transition-transform duration-300 hover:scale-105 max-w-[90%]">
                              <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                                {category.categoryDescription}
                              </p>

                              {category.numberOfActivities > 0 && (
                                <div className="flex justify-center mb-2 sm:mb-3">
                                  <span className="text-xs text-gray-500">
                                    {category.numberOfActivities} activit
                                    {category.numberOfActivities !== 1
                                      ? "ies"
                                      : "y"}{" "}
                                    available
                                  </span>
                                </div>
                              )}

                              <button
                                className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                                style={{ backgroundColor: category.color }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    category.hoverColor;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    category.color;
                                }}
                                onClick={(e) =>
                                  handleExploreClick(e, category.categoryName)
                                }
                              >
                                Explore {category.categoryName}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots Indicator — only real slides, active uses modulo so clones map back */}
            {canShowCarousel && (
              <div className="flex justify-center mt-6 sm:mt-8 gap-2">
                {Array.from({ length: totalReal - cardsPerView + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      (currentIndex % totalReal) === index
                        ? "w-8 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500"
                        : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Auto-play Toggle */}
            {canShowCarousel && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {isAutoPlaying ? "Pause" : "Play"} Auto-scroll
                </button>
              </div>
            )}
          </div>
        )}

        {/* View All Button */}
        {activeActivitiesCategories.length > 0 && (
          <div className="text-center mt-6 sm:mt-8 lg:mt-10">
            <AnimatedButton onClick={() => router.push("/activities")}>
              More Activities
            </AnimatedButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCategoriesHome;