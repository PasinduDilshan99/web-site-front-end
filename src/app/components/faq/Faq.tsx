"use client";
import {
  GET_ALL_FAQ_DATA,
  UPDATE_FAQ_VIEW_COUNT,
} from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";

interface FaqItem {
  faqId: number;
  faqQuestion: string;
  faqAnswer1: string;
  faqAnswer2: string;
  faqAnswer3: string;
  faqAnswer4: string;
  faqAnswer5: string;
  faqDisplayAnswer: string;
  faqStatus: string;
  faqStatusStatus: string;
  faqCreatedAt: string;
  faqCreatedBy: number;
  faqUpdatedAt: string;
  faqUpdatedBy: number;
  faqTerminatedAt: string | null;
  faqTerminatedBy: number;
  faqViewCount: number;
  faqLastView: string | null;
}

// Plus/Minus Icon Component with better mobile scaling
const PlusIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
);

// Up/Down Arrow Icon Component with better mobile scaling
const DownArrowIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const UpArrowIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);

const Faq = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Responsive display limits
  const getDisplayLimit = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 5; // Mobile: show 5
      if (window.innerWidth < 1024) return 6; // Tablet: show 6
      return 7; // Desktop: show 7
    }
    return 7;
  };

  const [displayLimit, setDisplayLimit] = useState(getDisplayLimit());

  // Update display limit on window resize
  useEffect(() => {
    const handleResize = () => {
      setDisplayLimit(getDisplayLimit());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedFaqs = showAll ? faqData : faqData.slice(0, displayLimit);
  const hasMoreFaqs = faqData.length > displayLimit;

  const updateViewCount = async ({ faqId }: { faqId: number }) => {
    try {
      console.log("=================faqId===================");
      console.log(faqId);
      console.log("====================================");
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
      console.log("FAQ view count updated successfully:", data);
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

  const goToFaqPage = () => {
    window.location.href = "/faq";
  };

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

  const getDisplayAnswer = (item: FaqItem): string => {
    switch (item.faqDisplayAnswer) {
      case "answer1":
        return item.faqAnswer1;
      case "answer2":
        return item.faqAnswer2;
      case "answer3":
        return item.faqAnswer3;
      case "answer4":
        return item.faqAnswer4;
      case "answer5":
        return item.faqAnswer5;
      default:
        return item.faqAnswer1;
    }
  };

  // Loading state with responsive design
  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-purple-50 to-orange-50 min-h-screen">
        <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 md:h-10 bg-gradient-to-r from-purple-200 to-amber-200 rounded-lg w-48 sm:w-64 md:w-80 lg:w-96 mx-auto mb-3 sm:mb-4"></div>
              <div className="h-3 sm:h-4 bg-gradient-to-r from-amber-100 to-purple-100 rounded w-32 sm:w-48 md:w-64 mx-auto"></div>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-purple-100">
                  <div className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-purple-200 to-amber-200 rounded mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gradient-to-r from-amber-100 to-purple-100 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state with responsive design
  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-purple-50 to-orange-50 min-h-screen">
        <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-xl p-6 sm:p-8 border border-red-200">
            <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
              ❌
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Failed to Load FAQs
            </h3>
            <p className="text-red-500 text-sm sm:text-base mb-4 sm:mb-6">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No data state with responsive design
  if (faqData.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-purple-50 to-orange-50 min-h-screen">
        <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-xl p-6 sm:p-8 border border-purple-100">
            <div className="text-purple-400 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
              💬
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-2">
              No FAQs Available
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Check back later for frequently asked questions.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-purple-100 to-orange-100">
      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header - Fully Responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Find answers to common questions about our services and policies
          </p>
          <div className="mt-4 sm:mt-6 w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-purple-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* FAQ Items - Enhanced Responsive Grid */}
        <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          {displayedFaqs.map((item, index) => {
            const isOpen = openItems.has(item.faqId);
            const displayAnswer = getDisplayAnswer(item);

            return (
              <div
                key={item.faqId}
                className="group bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl border border-purple-100 overflow-hidden transition-all duration-300 hover:border-purple-200"
              >
                {/* Question Header - Mobile Optimized */}
                <button
                  onClick={() => toggleFaqItem(item.faqId)}
                  className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 text-left flex items-start justify-between hover:bg-gradient-to-r hover:from-purple-50 hover:to-amber-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
                >
                  <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
                    {/* Question Number - Responsive Sizing */}
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-500 to-amber-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold shadow-lg">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Question Text - Better Mobile Typography */}
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium sm:font-semibold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-amber-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200 pr-1 sm:pr-2 leading-tight sm:leading-relaxed flex-1">
                      {item.faqQuestion}
                    </h3>
                  </div>

                  {/* Toggle Icon - Consistent Sizing */}
                  <div
                    className={`flex-shrink-0 text-gray-400 group-hover:text-purple-500 transition-all duration-200 ml-2 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  >
                    {isOpen ? <DownArrowIcon /> : <UpArrowIcon />}
                  </div>
                </button>

                {/* Answer Content - Enhanced Mobile Experience */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "max-h-[600px] sm:max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <div
                    className={`px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-4 md:pb-5 lg:pb-6 transform transition-transform duration-500 ease-in-out ${
                      isOpen ? "translate-y-0" : "-translate-y-4"
                    }`}
                  >
                    <div className="pl-7 sm:pl-9 md:pl-11 lg:pl-12">
                      <div className="border-l-2 sm:border-l-3 md:border-l-4 border-gradient-to-b from-purple-400 to-amber-400 pl-2 sm:pl-3 md:pl-4 lg:pl-5">
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed sm:leading-loose">
                          {displayAnswer}
                        </p>

                        {/* View Count - Mobile Friendly */}
                        {item.faqViewCount > 0 && (
                          <div className="mt-2 sm:mt-3 md:mt-4 flex items-center text-xs sm:text-sm text-purple-600">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            <span className="font-medium">
                              Viewed {item.faqViewCount} times
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Border Animation - Sunset Colors */}
                <div
                  className={`h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-amber-500 transition-all duration-300 ${
                    isOpen ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Wrapper for both sections */}
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between lg:gap-8 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          {/* Show More Button */}
          {hasMoreFaqs && !showAll && (
            <div className="flex-1">
              <div className="h-full flex flex-col justify-between bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-purple-100 bg-gradient-to-br from-white to-purple-50">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6">
                  Showing{" "}
                  <span className="font-semibold text-purple-600">
                    {displayedFaqs.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-amber-600">
                    {faqData.length}
                  </span>{" "}
                  questions
                </p>
                <button
                  onClick={goToFaqPage}
                  className="w-full px-6 py-3 text-sm md:text-base lg:text-lg bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="sm:hidden">View All ({faqData.length})</span>
                  <span className="hidden sm:inline md:hidden">
                    View All FAQs ({faqData.length})
                  </span>
                  <span className="hidden md:inline">
                    View All FAQs ({faqData.length} questions)
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="flex-1 mt-6 lg:mt-0">
            <div className="h-full flex flex-col justify-between bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-purple-100 bg-gradient-to-br from-white to-purple-50">
              <div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-4">
                  Still have questions?
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 leading-relaxed">
                  Can’t find the answer you’re looking for? Please chat to our
                  friendly team.
                </p>
              </div>
              <button className="w-full px-6 py-3 text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
