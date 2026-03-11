"use client";
import { useEffect, useState } from "react";
import { FaqList } from "./FaqList";
import { FaqFooter } from "./FaqFooter";
import { FaqLoading } from "./FaqLoading";
import { FaqEmpty } from "./FaqEmpty";
import { FaqItem, FaqProps } from "@/types/faq-types";
import { FaqHeader } from "./FaqHeader";
import { FaqService } from "@/services/faqService";
import FaqError from "./FaqError";

export const FaqComponent = ({ showAll = false, displayLimit }: FaqProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  // Pagination state
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Responsive display limits
  const getResponsiveLimit = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 7; // Mobile
      if (window.innerWidth < 768) return 9; // Small tablet
      if (window.innerWidth < 1024) return 12; // Tablet
      if (window.innerWidth < 1280) return 15; // Laptop
      return 20; // Desktop
    }
    return 7; // Default for SSR
  };

  // Initialize visible items based on screen size
  useEffect(() => {
    if (!displayLimit) {
      setVisibleItems(getResponsiveLimit());
    }
  }, [displayLimit]);

  // Update visible items on window resize
  useEffect(() => {
    if (displayLimit) return; // Don't auto-adjust if displayLimit is provided

    const handleResize = () => {
      setVisibleItems(getResponsiveLimit());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [displayLimit]);

  // Get displayed FAQs based on visible items
  const displayedFaqs = showAll ? faqData : faqData.slice(0, visibleItems);

  const hasMoreFaqs = faqData.length > visibleItems;

  // Load more FAQs (5 items at a time)
  const handleLoadMore = () => {
    setIsLoadingMore(true);

    // Simulate loading for better UX
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 5, faqData.length));
      setIsLoadingMore(false);
    }, 300);
  };

  const incrementLocalViewCount = (faqId: number) => {
    setFaqData((prevData) =>
      prevData.map((item) =>
        item.faqId === faqId
          ? {
              ...item,
              faqViewCount: (item.faqViewCount || 0) + 1,
            }
          : item,
      ),
    );
  };

  useEffect(() => {
    const fetchFaqItems = async () => {
      try {
        setLoading(true);

        const { data: faqs, error } = await FaqService.fetchAllFaqs();

        if (error) {
          setError(error);
        } else {
          setFaqData(faqs);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching FAQ items:", err);
        setError("Something went wrong while fetching FAQ items");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqItems();
  }, []);

  const toggleFaqItem = async (faqId: number) => {
    const wasOpen = openItems.has(faqId);

    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });

    if (!wasOpen) {
      incrementLocalViewCount(faqId);

      try {
        await FaqService.incrementViewCount(faqId);
      } catch (error) {
        console.error("Failed to update view count on server:", error);
      }
    }
  };

  // Loading state
  if (loading) {
    return <FaqLoading />;
  }

  // Error state
  if (error) {
    return <FaqError />;
  }

  // No data state
  if (faqData.length === 0) {
    return <FaqEmpty />;
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-sky-50 to-teal-50">
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <FaqHeader />

        {/* FAQ List */}
        <FaqList
          faqData={displayedFaqs}
          openItems={openItems}
          onToggleItem={toggleFaqItem}
        />

        {/* Show More Button - Now appears after the list */}
        {!showAll && hasMoreFaqs && (
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="cursor-pointer group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-semibold rounded-full sm:rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Button content */}
              <span className="relative flex items-center gap-2">
                {isLoadingMore ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Show More</span>
                    <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
                      +5
                    </span>
                    <span className="text-sm opacity-80 hidden sm:inline">
                      ({faqData.length - visibleItems} remaining)
                    </span>
                  </>
                )}
              </span>
            </button>
          </div>
        )}

        {/* Progress indicator */}
        {!showAll && (
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-sky-600">
                {displayedFaqs.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-teal-600">
                {faqData.length}
              </span>{" "}
              questions
            </p>
            <div className="w-full max-w-md mx-auto h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full transition-all duration-300"
                style={{
                  width: `${(displayedFaqs.length / faqData.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Footer with Contact Support */}
        <FaqFooter
          displayedCount={displayedFaqs.length}
          totalCount={faqData.length}
          hasMoreFaqs={hasMoreFaqs}
          showAll={showAll}
          onViewAll={handleLoadMore}
        />
      </div>
    </section>
  );
};
