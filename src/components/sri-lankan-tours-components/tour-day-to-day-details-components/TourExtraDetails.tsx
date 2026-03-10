"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
  Shield,
  AlertTriangle,
  Info,
  Coffee,
  Car,
  Hotel,
  Ticket,
  Plane,
  CreditCard,
  Sun,
  User,
  Globe,
  Briefcase,
  Umbrella,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react";
import { TourExtraDetails as TourExtraDetailsType } from "@/types/sri-lankan-tour-types";
import TourExtraDetailsLoadingError from "./TourExtraDetailsLoadingError";

interface TourExtraDetailsProps {
  details: TourExtraDetailsType | null;
  loading?: boolean;
  error?: string | null;
}

type TabType = "inclusions" | "exclusions" | "conditions" | "travelTips";

interface ColorClasses {
  bg: string;
  text: string;
  border: string;
  hover: string;
  dark: string;
}

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

const TourExtraDetails: React.FC<TourExtraDetailsProps> = ({
  details,
  loading = false,
  error = null,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("inclusions");

  const tabs: TabItem[] = [
    {
      id: "inclusions",
      label: "Inclusions",
      icon: CheckCircle,
      color: "emerald",
      description: "What's included",
    },
    {
      id: "exclusions",
      label: "Exclusions",
      icon: XCircle,
      color: "red",
      description: "What's not included",
    },
    {
      id: "conditions",
      label: "Conditions",
      icon: Shield,
      color: "amber",
      description: "Terms & Policies",
    },
    {
      id: "travelTips",
      label: "Travel Tips",
      icon: Lightbulb,
      color: "blue",
      description: "Helpful advice",
    },
  ];

  const getColorClasses = (color: string): ColorClasses => {
    const colors: Record<string, ColorClasses> = {
      emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-200",
        hover: "hover:bg-emerald-100",
        dark: "bg-emerald-600",
      },
      red: {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-200",
        hover: "hover:bg-red-100",
        dark: "bg-red-600",
      },
      amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-200",
        hover: "hover:bg-amber-100",
        dark: "bg-amber-600",
      },
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:bg-blue-100",
        dark: "bg-blue-600",
      },
    };
    return colors[color] || colors.emerald;
  };

  const getIconForInclusion = (description?: string): React.ReactNode => {
    if (!description) return <CheckCircle className="w-3 h-3 sm:w-4" />;

    const desc = description.toLowerCase();
    if (desc.includes("breakfast") || desc.includes("meal"))
      return <Coffee className="w-3 h-3 sm:w-4" />;
    if (
      desc.includes("vehicle") ||
      desc.includes("driver") ||
      desc.includes("transport")
    )
      return <Car className="w-3 h-3 sm:w-4" />;
    if (desc.includes("hotel") || desc.includes("accommodation"))
      return <Hotel className="w-3 h-3 sm:w-4" />;
    if (
      desc.includes("entrance") ||
      desc.includes("ticket") ||
      desc.includes("fee")
    )
      return <Ticket className="w-3 h-3 sm:w-4" />;
    if (desc.includes("airport")) return <Plane className="w-3 h-3 sm:w-4" />;
    if (desc.includes("tax")) return <CreditCard className="w-3 h-3 sm:w-4" />;
    if (desc.includes("water") || desc.includes("drink"))
      return <Coffee className="w-3 h-3 sm:w-4" />;
    if (desc.includes("guide") || desc.includes("tour"))
      return <User className="w-3 h-3 sm:w-4" />;
    if (desc.includes("parking") || desc.includes("fuel"))
      return <Car className="w-3 h-3 sm:w-4" />;
    if (desc.includes("government")) return <Briefcase className="w-3 h-3 sm:w-4" />;
    return <CheckCircle className="w-3 h-3 sm:w-4" />;
  };

  const getIconForCondition = (description?: string): React.ReactNode => {
    if (!description) return <AlertCircle className="w-3 h-3 sm:w-4" />;

    const desc = description.toLowerCase();
    if (desc.includes("passenger") || desc.includes("people"))
      return <User className="w-3 h-3 sm:w-4" />;
    if (desc.includes("availability") || desc.includes("book"))
      return <Clock className="w-3 h-3 sm:w-4" />;
    if (desc.includes("price") || desc.includes("rate") || desc.includes("fee"))
      return <DollarSign className="w-3 h-3 sm:w-4" />;
    if (desc.includes("cancel")) return <XCircle className="w-3 h-3 sm:w-4" />;
    if (desc.includes("passport") || desc.includes("document"))
      return <FileText className="w-3 h-3 sm:w-4" />;
    if (desc.includes("weather") || desc.includes("itinerary"))
      return <Umbrella className="w-3 h-3 sm:w-4" />;
    if (desc.includes("child") || desc.includes("adult"))
      return <User className="w-3 h-3 sm:w-4" />;
    if (desc.includes("refund")) return <DollarSign className="w-3 h-3 sm:w-4" />;
    if (
      desc.includes("check-in") ||
      desc.includes("check-out") ||
      desc.includes("hotel")
    )
      return <Clock className="w-3 h-3 sm:w-4" />;
    if (desc.includes("payment")) return <CreditCard className="w-3 h-3 sm:w-4" />;
    if (desc.includes("minimum")) return <User className="w-3 h-3 sm:w-4" />;
    return <AlertCircle className="w-3 h-3 sm:w-4" />;
  };

  const getIconForTravelTip = (title?: string): React.ReactNode => {
    if (!title) return <Lightbulb className="w-3 h-3 sm:w-4" />;

    const titleLower = title.toLowerCase();
    if (titleLower.includes("footwear") || titleLower.includes("shoe"))
      return <User className="w-3 h-3 sm:w-4" />;
    if (titleLower.includes("sun") || titleLower.includes("protection"))
      return <Sun className="w-3 h-3 sm:w-4" />;
    if (titleLower.includes("clothing") || titleLower.includes("dress"))
      return <User className="w-3 h-3 sm:w-4" />;
    if (titleLower.includes("hydrat") || titleLower.includes("water"))
      return <Coffee className="w-3 h-3 sm:w-4" />;
    if (
      titleLower.includes("document") ||
      titleLower.includes("passport") ||
      titleLower.includes("insurance")
    )
      return <FileText className="w-3 h-3 sm:w-4" />;
    if (titleLower.includes("money") || titleLower.includes("currency"))
      return <DollarSign className="w-3 h-3 sm:w-4" />;
    if (titleLower.includes("medication") || titleLower.includes("health"))
      return <Briefcase className="w-3 h-3 sm:w-4" />;
    if (titleLower.includes("culture") || titleLower.includes("local"))
      return <Globe className="w-3 h-3 sm:w-4" />;
    if (titleLower.includes("luggage") || titleLower.includes("baggage"))
      return <Briefcase className="w-3 h-3 sm:w-4" />;
    return <Lightbulb className="w-3 h-3 sm:w-4" />;
  };

  // Loading State
  if (loading) {
    return (
      <div className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gray-100 rounded-full mb-4 sm:mb-5 md:mb-6">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 border-2 border-gray-900 border-t-transparent"></div>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">
              Loading Tour Information
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-500">
              Preparing your tour details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return <TourExtraDetailsLoadingError />;
  }

  // Empty State
  if (
    !details ||
    !details.inclusions ||
    !details.exclusions ||
    !details.conditions ||
    !details.travelTips
  ) {
    return (
      <div className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-2xl mx-auto px-3 sm:px-4">
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-50 rounded-full mb-3 sm:mb-4">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-400" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
              Additional Information
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Detailed tour information will be available soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = (): React.ReactNode => {
    const colorClasses = getColorClasses(
      activeTab === "inclusions"
        ? "emerald"
        : activeTab === "exclusions"
          ? "red"
          : activeTab === "conditions"
            ? "amber"
            : "blue",
    );

    switch (activeTab) {
      case "inclusions":
        return (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg ${colorClasses.bg} flex items-center justify-center flex-shrink-0`}
              >
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-600" />
              </div>
              <span className="text-xs sm:text-sm md:text-base">
                What&apos;s Included in Your Tour
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {details.inclusions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="flex-shrink-0">
                      <div
                        className={`text-emerald-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${colorClasses.bg} rounded-lg flex items-center justify-center`}
                      >
                        {getIconForInclusion(item.description)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-[10px] sm:text-xs md:text-sm leading-relaxed group-hover:text-gray-900 line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "exclusions":
        return (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg ${colorClasses.bg} flex items-center justify-center flex-shrink-0`}
              >
                <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-red-600" />
              </div>
              <span className="text-xs sm:text-sm md:text-base">
                What&apos;s Not Included
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {details.exclusions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 hover:border-red-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${colorClasses.bg} rounded-lg flex items-center justify-center`}
                      >
                        <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-[10px] sm:text-xs md:text-sm leading-relaxed group-hover:text-gray-900 line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "conditions":
        return (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg ${colorClasses.bg} flex items-center justify-center flex-shrink-0`}
              >
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-amber-600" />
              </div>
              <span className="text-xs sm:text-sm md:text-base">
                Terms & Conditions
              </span>
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {details.conditions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 hover:border-amber-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <div className="flex-shrink-0">
                      <div
                        className={`text-amber-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${colorClasses.bg} rounded-lg flex items-center justify-center`}
                      >
                        {getIconForCondition(item.description)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-[10px] sm:text-xs md:text-sm leading-relaxed group-hover:text-gray-900">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "travelTips":
        return (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg ${colorClasses.bg} flex items-center justify-center flex-shrink-0`}
              >
                <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-600" />
              </div>
              <span className="text-xs sm:text-sm md:text-base">
                Travel Tips
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {details.travelTips.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 hover:border-blue-300 hover:shadow-sm transition-all duration-200 group h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                      <div className="flex-shrink-0">
                        <div
                          className={`text-blue-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${colorClasses.bg} rounded-lg flex items-center justify-center`}
                        >
                          {getIconForTravelTip(tip.title)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm group-hover:text-blue-700 line-clamp-2">
                          {tip.title}
                        </h4>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-[8px] sm:text-[10px] md:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gray-900 rounded-full mb-2 sm:mb-3 md:mb-4">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
          </div>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 tracking-tight mb-1 sm:mb-2">
            Tour Information & Details
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Everything you need to know about your tour package
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const colorClasses = getColorClasses(tab.color);
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    cursor-pointer relative flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl
                    transition-all duration-300 ease-out min-h-[70px] sm:min-h-[80px] md:min-h-[90px] lg:min-h-[100px]
                    ${
                      isActive
                        ? `${colorClasses.dark} text-white shadow-md sm:shadow-lg transform scale-[1.02]`
                        : `bg-white ${colorClasses.border} border text-gray-700 hover:shadow-sm`
                    }
                  `}
                >
                  <div
                    className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-md sm:rounded-lg mb-1 sm:mb-1.5 ${
                      isActive ? "bg-white/20" : colorClasses.bg
                    }`}
                  >
                    <Icon
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 ${
                        isActive ? "text-white" : colorClasses.text
                      }`}
                    />
                  </div>

                  <div className="text-center space-y-0.5">
                    <h3
                      className={`font-semibold text-[8px] sm:text-[10px] md:text-xs lg:text-sm ${
                        isActive ? "text-white" : "text-gray-900"
                      } line-clamp-1`}
                    >
                      {tab.label}
                    </h3>
                    <p
                      className={`text-[6px] xs:text-[7px] sm:text-[8px] md:text-[10px] ${
                        isActive ? "text-white/90" : "text-gray-500"
                      } line-clamp-1 hidden sm:block`}
                    >
                      {tab.description}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rotate-45"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4 md:p-5 lg:p-6">{renderContent()}</div>
        </div>

        {/* Important Note */}
        <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">
                Important Information
              </h4>
              <p className="text-gray-600 text-[8px] sm:text-[10px] md:text-xs leading-relaxed">
                All details are subject to change based on availability, weather
                conditions, and local circumstances. Prices may vary during peak
                seasons. Please reconfirm all details with our travel
                consultants 48 hours prior to departure.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 sm:mt-5 md:mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-0.5">
              {details.inclusions.length}
            </div>
            <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600">Inclusions</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-0.5">
              {details.exclusions.length}
            </div>
            <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600">Exclusions</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-0.5">
              {details.conditions.length}
            </div>
            <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600">Conditions</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-0.5">
              {details.travelTips.length}
            </div>
            <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-600">Travel Tips</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourExtraDetails;