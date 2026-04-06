"use client";
import React, { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

export const CurrencySelector: React.FC = () => {
  const {
    currencies,
    currentCurrency,
    setCurrentCurrency,
    isLoading,
    refreshRates,
  } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearch(""); // Clear search when closed
    }
  }, [isOpen]);

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(search.toLowerCase()) ||
      currency.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCurrencySelect = (currency: typeof currentCurrency) => {
    setCurrentCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-white border border-teal-200 rounded-lg hover:border-teal-500 transition-all duration-200"
        disabled={isLoading}
      >
        <span className="text-sm">{currentCurrency.flag}</span>
        <span className="text-sm font-medium text-teal-700">
          {currentCurrency.code}
        </span>
        <svg
          className={`w-3 h-3 text-teal-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-lg border border-teal-100 z-50 overflow-hidden"
          >
            <div className="p-2">
              <div className="flex items-center justify-between mb-2 px-2 py-1">
                <span className="text-xs font-medium text-cyan-600">
                  Select Currency
                </span>
                <button
                  onClick={() => refreshRates()}
                  className="p-1 hover:bg-teal-50 rounded-lg transition-colors"
                  title="Refresh rates"
                >
                  <svg
                    className="w-3.5 h-3.5 text-teal-400"
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
              </div>

              {/* Search Bar */}
              <div className="relative mb-2 px-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-teal-400"
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
                  placeholder="Search currency..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-teal-100 bg-teal-50/50 text-gray-700 placeholder-teal-300 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-300 hover:text-teal-500 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
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
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencySelect(currency)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer duration-300 ${
                        currentCurrency.code === currency.code
                          ? "bg-teal-500/10 text-teal-600"
                          : "hover:bg-cyan-50"
                      }`}
                    >
                      <span className="text-xl">{currency.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {currency.code}
                        </div>
                        <div className="text-xs text-cyan-500">
                          {currency.name}
                        </div>
                      </div>
                      <div className="text-sm text-teal-600">
                        {currency.symbol}
                      </div>
                      {currentCurrency.code === currency.code && (
                        <svg
                          className="w-4 h-4 text-teal-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-6 text-center text-xs text-teal-400">
                    No currencies found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
