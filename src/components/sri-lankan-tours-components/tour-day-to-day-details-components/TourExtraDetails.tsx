// components/tour-day-to-day-details-components/TourExtraDetails.tsx
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
    if (!description) return <CheckCircle className="w-4 h-4" />;
    
    const desc = description.toLowerCase();
    if (desc.includes('breakfast') || desc.includes('meal')) return <Coffee className="w-4 h-4" />;
    if (desc.includes('vehicle') || desc.includes('driver') || desc.includes('transport')) return <Car className="w-4 h-4" />;
    if (desc.includes('hotel') || desc.includes('accommodation')) return <Hotel className="w-4 h-4" />;
    if (desc.includes('entrance') || desc.includes('ticket') || desc.includes('fee')) return <Ticket className="w-4 h-4" />;
    if (desc.includes('airport')) return <Plane className="w-4 h-4" />;
    if (desc.includes('tax')) return <CreditCard className="w-4 h-4" />;
    if (desc.includes('water') || desc.includes('drink')) return <Coffee className="w-4 h-4" />;
    if (desc.includes('guide') || desc.includes('tour')) return <User className="w-4 h-4" />;
    if (desc.includes('parking') || desc.includes('fuel')) return <Car className="w-4 h-4" />;
    if (desc.includes('government')) return <Briefcase className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getIconForCondition = (description?: string): React.ReactNode => {
    if (!description) return <AlertCircle className="w-4 h-4" />;
    
    const desc = description.toLowerCase();
    if (desc.includes('passenger') || desc.includes('people')) return <User className="w-4 h-4" />;
    if (desc.includes('availability') || desc.includes('book')) return <Clock className="w-4 h-4" />;
    if (desc.includes('price') || desc.includes('rate') || desc.includes('fee')) return <DollarSign className="w-4 h-4" />;
    if (desc.includes('cancel')) return <XCircle className="w-4 h-4" />;
    if (desc.includes('passport') || desc.includes('document')) return <FileText className="w-4 h-4" />;
    if (desc.includes('weather') || desc.includes('itinerary')) return <Umbrella className="w-4 h-4" />;
    if (desc.includes('child') || desc.includes('adult')) return <User className="w-4 h-4" />;
    if (desc.includes('refund')) return <DollarSign className="w-4 h-4" />;
    if (desc.includes('check-in') || desc.includes('check-out') || desc.includes('hotel')) return <Clock className="w-4 h-4" />;
    if (desc.includes('payment')) return <CreditCard className="w-4 h-4" />;
    if (desc.includes('minimum')) return <User className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const getIconForTravelTip = (title?: string): React.ReactNode => {
    if (!title) return <Lightbulb className="w-4 h-4" />;
    
    const titleLower = title.toLowerCase();
    if (titleLower.includes('footwear') || titleLower.includes('shoe')) return <User className="w-4 h-4" />;
    if (titleLower.includes('sun') || titleLower.includes('protection')) return <Sun className="w-4 h-4" />;
    if (titleLower.includes('clothing') || titleLower.includes('dress')) return <User className="w-4 h-4" />;
    if (titleLower.includes('hydrat') || titleLower.includes('water')) return <Coffee className="w-4 h-4" />;
    if (titleLower.includes('document') || titleLower.includes('passport') || titleLower.includes('insurance')) return <FileText className="w-4 h-4" />;
    if (titleLower.includes('money') || titleLower.includes('currency')) return <DollarSign className="w-4 h-4" />;
    if (titleLower.includes('medication') || titleLower.includes('health')) return <Briefcase className="w-4 h-4" />;
    if (titleLower.includes('culture') || titleLower.includes('local')) return <Globe className="w-4 h-4" />;
    if (titleLower.includes('luggage') || titleLower.includes('baggage')) return <Briefcase className="w-4 h-4" />;
    return <Lightbulb className="w-4 h-4" />;
  };

  // Loading State
  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Loading Tour Information
            </h2>
            <p className="text-gray-500">Preparing your tour details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Unable to Load Details
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State - Fixed to handle null details properly
  if (!details || !details.inclusions || !details.exclusions || !details.conditions || !details.travelTips) {
    return (
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
              <Info className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Additional Information
            </h3>
            <p className="text-gray-500">
              Detailed tour information will be available soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = (): React.ReactNode => {
    const colorClasses = getColorClasses(activeTab === "inclusions" ? "emerald" : 
                                       activeTab === "exclusions" ? "red" : 
                                       activeTab === "conditions" ? "amber" : "blue");

    switch (activeTab) {
      case "inclusions":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              What&apos;s Included in Your Tour
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.inclusions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`text-emerald-600 w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        {getIconForInclusion(item.description)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 leading-relaxed group-hover:text-gray-900">
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
              What&apos;s Not Included in Your Tour
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.exclusions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        <XCircle className="w-4 h-4 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 leading-relaxed group-hover:text-gray-900">
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
                <Shield className="w-4 h-4 text-amber-600" />
              </div>
              Terms, Conditions & Important Policies
            </h3>
            <div className="space-y-4">
              {details.conditions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-amber-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`text-amber-600 w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        {getIconForCondition(item.description)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 leading-relaxed group-hover:text-gray-900">
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
                <Lightbulb className="w-4 h-4 text-blue-600" />
              </div>
              Essential Travel Tips & Advice
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.travelTips.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="flex-shrink-0">
                        <div className={`text-blue-600 w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                          {getIconForTravelTip(tip.title)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-700">
                          {tip.title}
                        </h4>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed">
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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-6">
            <Info className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
            Tour Information & Details
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about your tour package
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const colorClasses = getColorClasses(tab.color);
              const Icon = tab.icon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex flex-col items-center justify-center p-5 rounded-xl
                    transition-all duration-300 ease-out
                    ${isActive 
                      ? `${colorClasses.dark} text-white shadow-lg transform scale-[1.02]` 
                      : `bg-white ${colorClasses.border} border text-gray-700 hover:shadow-md hover:transform hover:scale-[1.01]`
                    }
                  `}
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${
                    isActive ? 'bg-white/20' : colorClasses.bg
                  }`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : colorClasses.text}`} />
                  </div>
                  
                  <div className="text-center">
                    <h3 className={`font-semibold text-sm md:text-base mb-1 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                      {tab.label}
                    </h3>
                    <p className={`text-xs ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
                      {tab.description}
                    </p>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            {renderContent()}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-10 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">
                Important Information
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                All details are subject to change based on availability, weather conditions, and local circumstances. 
                Prices may vary during peak seasons. Please reconfirm all details with our travel consultants 48 hours 
                prior to departure. For the most current information and any last-minute changes, refer to your 
                booking confirmation documents.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{details.inclusions.length}</div>
            <div className="text-sm text-gray-600">Inclusions</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{details.exclusions.length}</div>
            <div className="text-sm text-gray-600">Exclusions</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{details.conditions.length}</div>
            <div className="text-sm text-gray-600">Conditions</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{details.travelTips.length}</div>
            <div className="text-sm text-gray-600">Travel Tips</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourExtraDetails;