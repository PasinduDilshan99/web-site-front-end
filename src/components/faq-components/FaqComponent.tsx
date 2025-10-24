"use client";
import { useEffect, useState } from "react";
import {
  GET_ALL_FAQ_DATA,
  UPDATE_FAQ_VIEW_COUNT,
} from "@/utils/frontEndConstant";
import { FaqList } from "./FaqList";
import { FaqFooter } from "./FaqFooter";
import { FaqLoading } from "./FaqLoading";
import { FaqError } from "./FaqError";
import { FaqEmpty } from "./FaqEmpty";
import { FaqItem, FaqProps } from "@/types/faq-types";
import { FaqHeader } from "./FaqHeader";

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
      const response = await fetch(UPDATE_FAQ_VIEW_COUNT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ faqId }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Backend returned error:", text);
        throw new Error("Failed to update FAQ view count");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error updating FAQ item:", err);
      console.warn("View count update failed, but continuing...");
    }
  };

  useEffect(() => {
    const fetchFaqItems = async () => {
      try {
        setLoading(true);

        const response = await fetch(GET_ALL_FAQ_DATA);
        const data = await response.json();

        if (response.ok && data.code === 200) {
          const items: FaqItem[] = data.data || [];
          const activeFaqs = items.filter(
            (item) =>
              item.faqStatus === "VISIBLE" && item.faqStatusStatus === "ACTIVE"
          );

          setFaqData(activeFaqs);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch FAQ items");
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
      try {
        const result = await updateViewCount({ faqId: faqId });

        if (result) {
          setFaqData((prevData) =>
            prevData.map((item) =>
              item.faqId === faqId
                ? { ...item, faqViewCount: (item.faqViewCount || 0) + 1 }
                : item
            )
          );
        }
      } catch (error) {
        console.error("Failed to update view count:", error);
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
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-purple-100 to-orange-100">
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
