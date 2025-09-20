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
  faqDisplayAnswer: string; // e.g. "answer1"
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

// Plus/Minus Icon Component
const PlusIcon = () => (
  <svg
    className="w-5 h-5 transition-transform duration-200"
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
    className="w-5 h-5 transition-transform duration-200"
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

const Faq = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Limit to 7 questions initially
  const displayedFaqs = showAll ? faqData : faqData.slice(0, 7);
  const hasMoreFaqs = faqData.length > 7;

  const updateViewCount = async ({ faqId }: { faqId: number }) => {
    try {
        console.log('=================faqId===================');
        console.log(faqId);
        console.log('====================================');
      const response = await fetch(UPDATE_FAQ_VIEW_COUNT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ faqId }), // Send id in request body
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
      // Don't set global error for view count failures
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
          console.log('====================================');
          console.log(items);
          console.log('====================================');
          // Filter active and visible FAQs
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

  // Navigate to FAQ page
  const goToFaqPage = () => {
    window.location.href = "/faq"; // Adjust the URL as needed
  };

  // Toggle FAQ item and update view count
  const toggleFaqItem = async (faqId: number) => {
    const wasOpen = openItems.has(faqId);

    // Update UI state immediately for better UX
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });

    // If opening the FAQ (not closing), update view count
    if (!wasOpen) {
      try {
        // Call the API to update view count
        const result = await updateViewCount({ faqId: faqId });
        
        // Update local state with new view count if API call was successful
        if (result) {
          setFaqData(prevData => 
            prevData.map(item => 
              item.faqId === faqId 
                ? { ...item, faqViewCount: (item.faqViewCount || 0) + 1 }
                : item
            )
          );
        }
      } catch (error) {
        // View count update failed, but don't prevent the FAQ from opening
        console.error('Failed to update view count:', error);
      }
    }
  };

  // Get the display answer based on faqDisplayAnswer field
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
        return item.faqAnswer1; // fallback to answer1
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded-lg w-96 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to Load FAQs
            </h3>
            <p className="text-red-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (faqData.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-gray-400 text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No FAQs Available
            </h3>
            <p className="text-gray-500">
              Check back later for frequently asked questions.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services and policies
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* FAQ Items */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {displayedFaqs.map((item, index) => {
            const isOpen = openItems.has(item.faqId);
            const displayAnswer = getDisplayAnswer(item);

            return (
              <div
                key={item.faqId}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 overflow-hidden transition-all duration-300"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFaqItem(item.faqId)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:bg-gray-50/50"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    {/* Question Number */}
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Question Text */}
                    <h3 className="text-sm sm:text-base lg:text-lg font-medium sm:font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 pr-2 sm:pr-4 leading-tight sm:leading-relaxed">
                      {item.faqQuestion}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <div
                    className={`flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  >
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <div
                    className={`px-4 sm:px-6 pb-4 sm:pb-6 transform transition-transform duration-500 ease-in-out ${
                      isOpen ? "translate-y-0" : "-translate-y-4"
                    }`}
                  >
                    <div className="pl-9 sm:pl-12">
                      {" "}
                      {/* Align with question text */}
                      <div className="border-l-2 sm:border-l-4 border-gradient-to-b from-blue-400 to-purple-600 pl-3 sm:pl-4">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {displayAnswer}
                        </p>

                        {/* View Count */}
                        {item.faqViewCount > 0 && (
                          <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
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
                            Viewed {item.faqViewCount} times
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Border Animation */}
                <div
                  className={`h-1 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 ${
                    isOpen ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {hasMoreFaqs && !showAll && (
          <div className="text-center mt-6 sm:mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-white/20">
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Showing {displayedFaqs.length} of {faqData.length} questions
              </p>
              <button
                onClick={goToFaqPage}
                className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium sm:font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="sm:hidden">View All ({faqData.length})</span>
                <span className="hidden sm:inline">
                  View All FAQs ({faqData.length} questions)
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 border border-white/20">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-md sm:max-w-lg mx-auto leading-relaxed">
              Can't find the answer you're looking for? Please chat to our
              friendly team.
            </p>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium sm:font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;