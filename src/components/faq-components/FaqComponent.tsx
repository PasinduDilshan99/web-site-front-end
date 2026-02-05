"use client";
import { useEffect, useState } from "react";
import { FaqList } from "./FaqList";
import { FaqFooter } from "./FaqFooter";
import { FaqLoading } from "./FaqLoading";
import { FaqError } from "./FaqError";
import { FaqEmpty } from "./FaqEmpty";
import { FaqItem, FaqProps } from "@/types/faq-types";
import { FaqHeader } from "./FaqHeader";
import { FaqService } from "@/services/faqService"; // Correct import path

export const FaqComponent = ({ showAll = false, displayLimit }: FaqProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  // Responsive display limits
  const getDefaultDisplayLimit = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 5;
      if (window.innerWidth < 1024) return 6;
      return 7;
    }
    return 7;
  };

  const [currentDisplayLimit, setCurrentDisplayLimit] = useState(
    displayLimit || getDefaultDisplayLimit()
  );

  // Update display limit on window resize
  useEffect(() => {
    if (displayLimit) return; // Don't auto-adjust if displayLimit is provided

    const handleResize = () => {
      setCurrentDisplayLimit(getDefaultDisplayLimit());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [displayLimit]);

  const displayedFaqs = showAll
    ? faqData
    : faqData.slice(0, currentDisplayLimit);
  const hasMoreFaqs = faqData.length > currentDisplayLimit;

  const updateViewCount = async ({ faqId }: { faqId: number }) => {
    try {
      // USING THE SERVICE INSTEAD OF DIRECT FETCH
      const result = await FaqService.updateViewCount(faqId);

      if (result.success) {
        // Update the view count locally
        setFaqData((prevData) =>
          prevData.map((item) =>
            item.faqId === faqId
              ? { 
                  ...item, 
                  faqViewCount: (item.faqViewCount || 0) + 1 
                }
              : item
          )
        );
        return true;
      } else {
        // Show error only in development
        if (process.env.NODE_ENV === 'development') {
          console.warn("View count update failed:", result.error || "Unknown error");
        }
        return false;
      }
    } catch (err) {
      console.error("Error updating FAQ view count:", err);
      return false;
    }
  };

  // Alternative: Simple increment without waiting for server response
  const incrementLocalViewCount = (faqId: number) => {
    setFaqData((prevData) =>
      prevData.map((item) =>
        item.faqId === faqId
          ? { 
              ...item, 
              faqViewCount: (item.faqViewCount || 0) + 1 
            }
          : item
      )
    );
  };

  useEffect(() => {
    const fetchFaqItems = async () => {
      try {
        setLoading(true);

        // USING THE SERVICE INSTEAD OF DIRECT FETCH
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
      // Optimistically update the view count locally first
      incrementLocalViewCount(faqId);
      
      // Then try to update on the server (fire and forget)
      try {
        await FaqService.incrementViewCount(faqId);
      } catch (error) {
        // Silently fail - user doesn't need to know if view count update fails
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
    return <FaqError error={error} />;
  }

  // No data state
  if (faqData.length === 0) {
    return <FaqEmpty />;
  }

  return (
<section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-sky-50 to-teal-50">
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <FaqHeader />
        <FaqList
          faqData={displayedFaqs}
          openItems={openItems}
          onToggleItem={toggleFaqItem}
        />
        <FaqFooter
          displayedCount={displayedFaqs.length}
          totalCount={faqData.length}
          hasMoreFaqs={hasMoreFaqs}
          showAll={showAll}
        />
      </div>
</section>
  );
};