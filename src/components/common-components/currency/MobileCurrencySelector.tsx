// components/currency/MobileCurrencySelector.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

export const MobileCurrencySelector: React.FC = () => {
  const {
    currencies,
    currentCurrency,
    setCurrentCurrency,
    isLoading,
    refreshRates,
  } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleCloseModals = () => setIsOpen(false);

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("closeMobileModals", handleCloseModals);
      // Auto-focus search after sheet animates in
      setTimeout(() => searchRef.current?.focus(), 350);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("closeMobileModals", handleCloseModals);
      setSearch(""); // Clear search on close
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("closeMobileModals", handleCloseModals);
    };
  }, [isOpen]);

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(search.toLowerCase()) ||
      currency.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCurrencySelect = (currency: typeof currentCurrency) => {
    setCurrentCurrency(currency);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        disabled={isLoading}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-teal-100 bg-teal-50/50 active:bg-teal-100 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white border border-teal-100 shadow-sm flex items-center justify-center text-xl">
            {currentCurrency.flag}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-teal-800">
              {currentCurrency.code}
            </span>
            <span className="text-xs text-cyan-500">{currentCurrency.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">
            {currentCurrency.symbol}
          </span>
          <svg
            className="w-4 h-4 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="mt-56">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              ref={modalRef}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-[60] flex flex-col bg-white rounded-t-3xl shadow-2xl max-h-[88vh]"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-teal-200" />
              </div>

              {/* Header */}
              <div className="px-5 pt-3 pb-4 border-b border-teal-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-teal-900">
                      Select Currency
                    </h3>
                    <p className="text-xs text-cyan-500 mt-0.5">
                      Tap to switch your preferred currency
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => refreshRates()}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-teal-50 hover:bg-teal-100 active:bg-teal-200 transition-colors"
                      title="Refresh rates"
                    >
                      <svg
                        className="w-4.5 h-4.5 text-teal-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Active Currency Pill */}
                <div className="mt-3 flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl px-4 py-2.5">
                  <span className="text-2xl">{currentCurrency.flag}</span>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">
                      {currentCurrency.code} — {currentCurrency.name}
                    </p>
                    <p className="text-teal-100 text-xs">Currently selected</p>
                  </div>
                  <span className="text-white font-semibold text-base">
                    {currentCurrency.symbol}
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative mt-3">
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or code..."
                    className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-teal-100 bg-teal-50/50 text-gray-700 placeholder-teal-300 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-teal-200 hover:bg-teal-300 transition-colors"
                    >
                      <svg
                        className="w-3 h-3 text-teal-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Currency List */}
              <div className="flex-1 overflow-y-auto py-2 px-3">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => {
                    const isSelected = currentCurrency.code === currency.code;
                    return (
                      <button
                        key={currency.code}
                        onClick={() => handleCurrencySelect(currency)}
                        className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl mb-1 transition-all duration-200 active:scale-[0.98] ${
                          isSelected
                            ? "bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-sm ${
                            isSelected
                              ? "bg-white border-2 border-teal-300"
                              : "bg-gray-50 border border-gray-100"
                          }`}
                        >
                          {currency.flag}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold ${
                                isSelected ? "text-teal-700" : "text-gray-900"
                              }`}
                            >
                              {currency.code}
                            </span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                                isSelected
                                  ? "bg-teal-100 text-teal-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {currency.symbol}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {currency.name}
                          </p>
                        </div>
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 gap-2">
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-teal-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-teal-400 font-medium">No currencies found</p>
                    <p className="text-xs text-gray-400">Try searching by code or name</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-teal-50 px-5 py-4">
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <p className="text-xs text-teal-500 font-medium">
                    Exchange rates update automatically
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};