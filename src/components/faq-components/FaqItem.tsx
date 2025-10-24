import { useState } from "react";
import { DownArrowIcon, UpArrowIcon } from "./FaqIcons";
import { FaqItem } from "@/types/faq-types";

interface FaqItemProps {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: (faqId: number) => void;
}

export const FaqItemComponent = ({
  item,
  index,
  isOpen,
  onToggle,
}: FaqItemProps) => {
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

  const displayAnswer = getDisplayAnswer(item);

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl border border-purple-100 overflow-hidden transition-all duration-300 hover:border-purple-200">
      {/* Question Header */}
      <button
        onClick={() => onToggle(item.faqId)}
        className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 text-left flex items-start justify-between hover:bg-gradient-to-r hover:from-purple-50 hover:to-amber-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
      >
        <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
          {/* Question Number */}
          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-500 to-amber-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold shadow-lg">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Question Text */}
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium sm:font-semibold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-amber-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200 pr-1 sm:pr-2 leading-tight sm:leading-relaxed flex-1">
            {item.faqQuestion}
          </h3>
        </div>

        {/* Toggle Icon */}
        <div
          className={`flex-shrink-0 text-gray-400 group-hover:text-purple-500 transition-all duration-200 ml-2 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        >
          {isOpen ? <DownArrowIcon /> : <UpArrowIcon />}
        </div>
      </button>

      {/* Answer Content */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-[600px] sm:max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
        style={{ overflow: "hidden" }}
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

              {/* View Count */}
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

      {/* Bottom Border Animation */}
      <div
        className={`h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-amber-500 transition-all duration-300 ${
          isOpen ? "w-full" : "w-0"
        }`}
      ></div>
    </div>
  );
};
