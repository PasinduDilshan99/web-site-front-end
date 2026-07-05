// components/home-page-components/ChatBot.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { COMPANY_LOGO_IMAGE } from "@/utils/constant";
import Image from "next/image";
import { useCommon } from "@/context/CommonContext";
import { InquiryService } from "@/services/inquiryService";

// Types
interface ChatBotMessage {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  isSelectionUI?: boolean;
  selectionOptions?: string[];
  selectionType?: ChatBotSelectionType;
  selectionTitle?: string;
}

export interface ChatBotInquiryData {
  name: string;
  email: string;
  phone: string;
  preferences: {
    flowType: ChatBotFlowType;
    selections: ChatBotToursData | ChatBotActivitiesData | ChatBotDestinationsData;
  };
}

interface ChatBotToursData {
  category: string[];
  duration: string[];
  tourType: string[];
  season: string[];
  budget: string[];
}

interface ChatBotActivitiesData {
  category: string[];
  season: string[];
  duration: string[];
}

interface ChatBotDestinationsData {
  category: string[];
  location: string[];
  rating: string[];
}

type ChatBotFlowType = "main" | "tours" | "activities" | "destinations" | "contact" | "social" | "inquiry";
type ChatBotSelectionType = "tourCategory" | "tourDuration" | "tourType" | "tourSeason" | "tourBudget" | "activityCategory" | "activitySeason" | "activityDuration" | "destinationCategory" | "destinationLocation" | "destinationRating";
type ChatBotInputFieldType = "name" | "email" | "phone" | null;

// Selection option configurations with labels
interface ChatBotSelectionConfig {
  type: ChatBotSelectionType;
  title: string;
  options: string[];
}

const ChatBot = () => {
  const router = useRouter();
  const { categories, loading: categoriesLoading } = useCommon();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<ChatBotMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<ChatBotFlowType>("main");
  
  // Tours state
  const [toursData, setToursData] = useState<ChatBotToursData>({
    category: [],
    duration: [],
    tourType: [],
    season: [],
    budget: [],
  });
  
  // Activities state
  const [activitiesData, setActivitiesData] = useState<ChatBotActivitiesData>({
    category: [],
    season: [],
    duration: [],
  });
  
  // Destinations state
  const [destinationsData, setDestinationsData] = useState<ChatBotDestinationsData>({
    category: [],
    location: [],
    rating: [],
  });
  
  // Store the flow type when collecting data
  const [activeFlowType, setActiveFlowType] = useState<ChatBotFlowType>("tours");
  
  // Inquiry form data
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [currentInputField, setCurrentInputField] = useState<ChatBotInputFieldType>(null);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get dynamic options from context
  const getTourCategoryOptions = (): string[] => {
    if (categories?.tourCategoryList) {
      return categories.tourCategoryList.map(cat => cat.tourCategoryName);
    }
    return ["Luxury", "Budget", "Family", "Solo Traveler", "Group", "Cultural", "Wildlife", "Beach", "Adventure", "Honeymoon", "Wellness", "Photography", "Food & Culinary", "Short Getaway", "Extended Tour"];
  };

  const getTourTypeOptions = (): string[] => {
    if (categories?.tourTypeList) {
      return categories.tourTypeList.map(type => type.tourTypeName);
    }
    return ["Adventure", "Cultural", "Wildlife", "Beach", "Wellness & Ayurveda", "Hill Country", "Honeymoon", "Family", "Photography", "Food & Culinary", "Luxury", "Budget", "Solo Traveler", "Group Tours", "Private Tours", "Short Breaks", "Extended Tours"];
  };

  const getActivityCategoryOptions = (): string[] => {
    if (categories?.activityCategoryList) {
      return categories.activityCategoryList.map(cat => cat.activityCategoryName);
    }
    return ["Adventure & Outdoor", "Water Sports & Marine", "Wildlife & Safari", "Cultural & Heritage", "Sightseeing & Scenic", "Wellness & Ayurveda", "Food & Culinary", "Beach & Coastal", "Tea Trails & Plantations", "Village & Rural Experiences", "Railway & Scenic Journeys", "Festivals & Events"];
  };

  const getDestinationCategoryOptions = (): string[] => {
    if (categories?.destinationCategoryList) {
      return categories.destinationCategoryList.map(cat => cat.destinationCategoryName);
    }
    return ["Cultural & Heritage", "Beach & Coastal", "Wildlife & Nature", "Hill Country & Tea", "Adventure & Sports", "Wellness & Ayurveda", "Religious & Sacred", "Village & Rural Experiences", "Luxury & Honeymoon", "Budget & Backpacker"];
  };

  const getPackageCategoryOptions = (): string[] => {
    if (categories?.packageCategoryList) {
      return categories.packageCategoryList.map(cat => cat.packageCategoryName);
    }
    return [];
  };

  // Build selection configs dynamically
  const getSelectionConfigs = (): Record<ChatBotSelectionType, ChatBotSelectionConfig> => {
    return {
      tourCategory: {
        type: "tourCategory",
        title: "📋 Select Tour Categories",
        options: getTourCategoryOptions()
      },
      tourDuration: {
        type: "tourDuration",
        title: "⏱️ Select Tour Duration",
        options: ["5 Days", "7 Days", "9 Days", "12 Days", "14 Days", "Custom Duration"]
      },
      tourType: {
        type: "tourType",
        title: "🎯 Select Tour Type",
        options: getTourTypeOptions()
      },
      tourSeason: {
        type: "tourSeason",
        title: "🌤️ Select Travel Season",
        options: ["Adventure Sports Season", "Bird Watching Premium", "North Coast Season", "Cultural Triangle Shoulder", "Whale Watching Peak", "Surfing Peak Season", "Wildlife Gathering Season", "Hill Country Cool Season", "Wet Inter-Monsoon", "Hot Inter-Monsoon", "Peak East Coast", "Peak West & South", "All Year Round"]
      },
      tourBudget: {
        type: "tourBudget",
        title: "💰 Select Budget Range (USD)",
        options: ["$500", "$1,000", "$1,500", "$2,000", "$3,000", "$5,000", "No Limit"]
      },
      activityCategory: {
        type: "activityCategory",
        title: "🎪 Select Activity Types",
        options: getActivityCategoryOptions()
      },
      activitySeason: {
        type: "activitySeason",
        title: "🌤️ Select Travel Season for Activities",
        options: ["Adventure Sports Season", "Bird Watching Premium", "North Coast Season", "Cultural Triangle Shoulder", "Whale Watching Peak", "Surfing Peak Season", "Wildlife Gathering Season", "Hill Country Cool Season", "Wet Inter-Monsoon", "Hot Inter-Monsoon", "Peak East Coast", "Peak West & South", "All Year Round"]
      },
      activityDuration: {
        type: "activityDuration",
        title: "⏱️ Select Activity Duration",
        options: ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "8 Days"]
      },
      destinationCategory: {
        type: "destinationCategory",
        title: "🏝️ Select Destination Types",
        options: getDestinationCategoryOptions()
      },
      destinationLocation: {
        type: "destinationLocation",
        title: "📍 Select Preferred Regions",
        options: ["Central Province", "Uva Province", "Southern Province", "North Central Province", "Northern Province", "Western Province", "Eastern Province", "Hambantota, Sri Lanka", "Gal Oya, Sri Lanka", "North Western Province", "Sabaragamuwa Province", "Belihuloya, Sabaragamuwa Province, Sri Lanka"]
      },
      destinationRating: {
        type: "destinationRating",
        title: "⭐ Select Minimum Rating",
        options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"]
      }
    };
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        !isMobile &&
        chatWindowRef.current &&
        buttonRef.current &&
        !chatWindowRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, quickReplies]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 280);
  };

  const handleToggle = () => {
    if (isOpen) handleClose();
    else setIsOpen(true);
  };

  const addBotMessage = (text: string, delay: number = 350): Promise<void> => {
    return new Promise((resolve) => {
      setIsTyping(true);
      setTimeout(() => {
        const newId = Date.now();
        setMessages(prev => [...prev, { id: newId, text, sender: "bot", timestamp: new Date() }]);
        setIsTyping(false);
        setTimeout(() => {
          setVisibleMessages(prev => new Set([...prev, newId]));
          scrollToBottom();
          resolve();
        }, 30);
      }, delay);
    });
  };

  const addUserMessage = (text: string) => {
    const newId = Date.now();
    setMessages(prev => [...prev, { id: newId, text, sender: "user", timestamp: new Date() }]);
    setTimeout(() => {
      setVisibleMessages(prev => new Set([...prev, newId]));
      scrollToBottom();
    }, 30);
  };

  const addSelectionUIMessage = (selectionType: ChatBotSelectionType, currentSelections: string[] = []) => {
    const configs = getSelectionConfigs();
    const config = configs[selectionType];
    const newId = Date.now();
    setMessages(prev => [...prev, {
      id: newId,
      text: config.title,
      sender: "bot",
      timestamp: new Date(),
      isSelectionUI: true,
      selectionOptions: config.options,
      selectionType: config.type,
      selectionTitle: config.title,
    }]);
    setTimeout(() => {
      setVisibleMessages(prev => new Set([...prev, newId]));
      scrollToBottom();
    }, 30);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0 && !categoriesLoading) {
      const init = async () => {
        await addBotMessage("Good day! Welcome to Felicita Trips. How may I assist you with your Sri Lanka travel plans today?", 500);
        setQuickReplies(["Tour Packages", "Activities & Experiences", "Destinations", "Contact Support", "Social Media"]);
        scrollToBottom();
      };
      init();
    }
  }, [isOpen, categoriesLoading]);

  const resetToMain = async () => {
    setCurrentFlow("main");
    setToursData({ category: [], duration: [], tourType: [], season: [], budget: [] });
    setActivitiesData({ category: [], season: [], duration: [] });
    setDestinationsData({ category: [], location: [], rating: [] });
    await addBotMessage("How may I assist you further with your Sri Lanka travel plans?", 500);
    setQuickReplies(["Tour Packages", "Activities & Experiences", "Destinations", "Contact Support", "Social Media"]);
    scrollToBottom();
  };

  const getCurrentSelections = (selectionType: ChatBotSelectionType): string[] => {
    switch (selectionType) {
      case "tourCategory": return toursData.category;
      case "tourDuration": return toursData.duration;
      case "tourType": return toursData.tourType;
      case "tourSeason": return toursData.season;
      case "tourBudget": return toursData.budget;
      case "activityCategory": return activitiesData.category;
      case "activitySeason": return activitiesData.season;
      case "activityDuration": return activitiesData.duration;
      case "destinationCategory": return destinationsData.category;
      case "destinationLocation": return destinationsData.location;
      case "destinationRating": return destinationsData.rating;
      default: return [];
    }
  };

  const updateSelections = (selectionType: ChatBotSelectionType, selections: string[]) => {
    switch (selectionType) {
      case "tourCategory": setToursData(prev => ({ ...prev, category: selections })); break;
      case "tourDuration": setToursData(prev => ({ ...prev, duration: selections })); break;
      case "tourType": setToursData(prev => ({ ...prev, tourType: selections })); break;
      case "tourSeason": setToursData(prev => ({ ...prev, season: selections })); break;
      case "tourBudget": setToursData(prev => ({ ...prev, budget: selections })); break;
      case "activityCategory": setActivitiesData(prev => ({ ...prev, category: selections })); break;
      case "activitySeason": setActivitiesData(prev => ({ ...prev, season: selections })); break;
      case "activityDuration": setActivitiesData(prev => ({ ...prev, duration: selections })); break;
      case "destinationCategory": setDestinationsData(prev => ({ ...prev, category: selections })); break;
      case "destinationLocation": setDestinationsData(prev => ({ ...prev, location: selections })); break;
      case "destinationRating": setDestinationsData(prev => ({ ...prev, rating: selections })); break;
    }
  };

  const getNextSelectionType = (currentType: ChatBotSelectionType): ChatBotSelectionType | null => {
    const flowMap: Record<string, ChatBotSelectionType[]> = {
      tours: ["tourCategory", "tourDuration", "tourType", "tourSeason", "tourBudget"],
      activities: ["activityCategory", "activitySeason", "activityDuration"],
      destinations: ["destinationCategory", "destinationLocation", "destinationRating"]
    };
    
    const currentFlowType = activeFlowType === "tours" ? "tours" : activeFlowType === "activities" ? "activities" : "destinations";
    const steps = flowMap[currentFlowType];
    const currentIndex = steps.indexOf(currentType);
    
    if (currentIndex < steps.length - 1) {
      return steps[currentIndex + 1];
    }
    return null;
  };

  const handleSelectionConfirm = async (selectionType: ChatBotSelectionType, selectedOptions: string[]) => {
    updateSelections(selectionType, selectedOptions);
    
    const nextType = getNextSelectionType(selectionType);
    
    if (nextType) {
      // Move to next selection
      addSelectionUIMessage(nextType, getCurrentSelections(nextType));
    } else {
      // All selections complete, show summary
      await showSummaryAndInquiry();
    }
  };

  const showSummaryAndInquiry = async () => {
    let summary = "";
    if (activeFlowType === "tours") {
      summary = `📋 *Your Tour Preferences Summary*\n\n${formatSelectionList("Categories", toursData.category)}\n${formatSelectionList("Durations", toursData.duration)}\n${formatSelectionList("Tour Types", toursData.tourType)}\n${formatSelectionList("Seasons", toursData.season)}\n${formatSelectionList("Budgets", toursData.budget)}`;
    } else if (activeFlowType === "activities") {
      summary = `📋 *Your Activities Preferences Summary*\n\n${formatSelectionList("Categories", activitiesData.category)}\n${formatSelectionList("Seasons", activitiesData.season)}\n${formatSelectionList("Durations", activitiesData.duration)}`;
    } else {
      summary = `📋 *Your Destinations Preferences Summary*\n\n${formatSelectionList("Categories", destinationsData.category)}\n${formatSelectionList("Locations", destinationsData.location)}\n${formatSelectionList("Ratings", destinationsData.rating)}`;
    }
    
    await addBotMessage(summary, 500);
    await addBotMessage("Would you like to send these preferences as an inquiry? Our travel specialists will get back to you with personalized recommendations within 24 hours.", 500);
    setQuickReplies(["Yes, Send Inquiry", "No, Just Navigate to Filters", "Start Over"]);
    setCurrentFlow("inquiry");
  };

  const formatSelectionList = (label: string, items: string[]): string => {
    if (!items || items.length === 0) return `• ${label}: Not specified`;
    return `• ${label}: ${items.join(", ")}`;
  };

  // Updated API call using InquiryService
  const sendInquiryToAPI = async (chatBotInquiryData: ChatBotInquiryData): Promise<{ success: boolean; error?: string }> => {
    console.log('=================== Sending ChatBot Inquiry =================');
    console.log(JSON.stringify(chatBotInquiryData, null, 2));
    console.log('=============================================================');
    
    try {
      const result = await InquiryService.createChatBotInquiry(chatBotInquiryData);
      
      if (result.data && !result.error) {
        return { success: true };
      } else {
        return { success: false, error: result.error || "Failed to send inquiry" };
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      return { success: false, error: error instanceof Error ? error.message : "Network error" };
    }
  };

  // Build navigation URL - only using first selected value for each filter
  const buildNavigationUrl = (): string | null => {
    const params = new URLSearchParams();
    
    if (activeFlowType === "tours" && (toursData.category.length > 0 || toursData.duration.length > 0 || toursData.tourType.length > 0)) {
      // Only take the first selected value for each filter
      if (toursData.tourType.length) params.append("tourType", toursData.tourType[0]);
      if (toursData.category.length) params.append("tourCategory", toursData.category[0]);
      if (toursData.season.length) params.append("season", toursData.season[0]);
      if (toursData.budget.length) params.append("maxPrice", toursData.budget[0]);
      if (toursData.duration.length) params.append("duration", toursData.duration[0]);
      return `/sri-lankan-tours${params.toString() ? `?${params.toString()}` : ""}`;
    }
    
    if (activeFlowType === "activities" && activitiesData.category.length > 0) {
      // Only take the first selected value for each filter
      if (activitiesData.category.length) params.append("category", activitiesData.category[0]);
      if (activitiesData.duration.length) params.append("duration", activitiesData.duration[0]);
      if (activitiesData.season.length) params.append("season", activitiesData.season[0]);
      return `/activities${params.toString() ? `?${params.toString()}` : ""}`;
    }
    
    if (activeFlowType === "destinations" && destinationsData.category.length > 0) {
      // Only take the first selected value for each filter
      if (destinationsData.category.length) params.append("category", destinationsData.category[0]);
      if (destinationsData.location.length) params.append("location", destinationsData.location[0]);
      if (destinationsData.rating.length) params.append("rating", destinationsData.rating[0]);
      return `/destinations${params.toString() ? `?${params.toString()}` : ""}`;
    }
    
    return null;
  };

  const handleNavigation = async () => {
    const url = buildNavigationUrl();
    
    if (url) {
      await addBotMessage("Redirecting you to the filtered results page...", 500);
      scrollToBottom();
      setTimeout(() => {
        router.push(url);
        setTimeout(() => handleClose(), 100);
      }, 1500);
    } else {
      await addBotMessage("No preferences selected. Please start over to make selections.", 500);
      setTimeout(() => resetToMain(), 2000);
    }
  };

  const handleInquiryFlow = async (selection: string) => {
    if (selection === "Start Over") {
      await resetToMain();
      return;
    }

    if (selection === "Yes, Send Inquiry") {
      setCurrentInputField("name");
      await addBotMessage("Great! Please enter your full name:", 500);
      setQuickReplies([]);
    } else if (selection === "No, Just Navigate to Filters") {
      await handleNavigation();
    } else if (selection === "Yes, Navigate to Results") {
      await handleNavigation();
    } else if (selection === "No, Stay Here") {
      await addBotMessage("Thank you for using Felicita Trips. Feel free to start over whenever you're ready!", 500);
      setQuickReplies(["Start Over"]);
    } else if (currentInputField === "name") {
      setInquiryForm(prev => ({ ...prev, name: selection }));
      setCurrentInputField("email");
      await addBotMessage(`Thank you, ${selection}. Please enter your email address:`, 500);
    } else if (currentInputField === "email") {
      setInquiryForm(prev => ({ ...prev, email: selection }));
      setCurrentInputField("phone");
      await addBotMessage("Please enter your contact number:", 500);
    } else if (currentInputField === "phone") {
      const updatedForm = { ...inquiryForm, phone: selection };
      setInquiryForm(updatedForm);
      
      const chatBotInquiryData: ChatBotInquiryData = {
        name: updatedForm.name,
        email: updatedForm.email,
        phone: selection,
        preferences: {
          flowType: activeFlowType,
          selections: activeFlowType === "tours" ? toursData : activeFlowType === "activities" ? activitiesData : destinationsData,
        },
      };
      
      await addBotMessage("Thank you! Sending your inquiry to our travel specialists...", 500);
      setIsSubmittingInquiry(true);
      const result = await sendInquiryToAPI(chatBotInquiryData);
      setIsSubmittingInquiry(false);
      
      if (result.success) {
        await addBotMessage("✅ Your inquiry has been sent successfully! Our team will contact you within 24 hours with personalized recommendations.", 500);
      } else {
        await addBotMessage(`⚠️ There was an issue sending your inquiry: ${result.error}. Please try again later or contact us directly at +94701774488.`, 500);
      }
      
      await addBotMessage("Would you like to navigate to see filtered results based on your preferences?", 500);
      setQuickReplies(["Yes, Navigate to Results", "No, Stay Here", "Start Over"]);
      setCurrentInputField(null);
    }
  };

  const handleMainMenu = async (selection: string) => {
    if (selection.includes("Tour")) {
      setActiveFlowType("tours");
      setCurrentFlow("tours");
      await addBotMessage("Thank you for your interest in our tour packages. Let me help you find the perfect itinerary.", 500);
      addSelectionUIMessage("tourCategory", toursData.category);
    } else if (selection.includes("Activities")) {
      setActiveFlowType("activities");
      setCurrentFlow("activities");
      await addBotMessage("Excellent choice! Sri Lanka offers a diverse range of exceptional experiences.", 500);
      addSelectionUIMessage("activityCategory", activitiesData.category);
    } else if (selection.includes("Destinations")) {
      setActiveFlowType("destinations");
      setCurrentFlow("destinations");
      await addBotMessage("Wonderful! Let me help you discover Sri Lanka's most captivating destinations.", 500);
      addSelectionUIMessage("destinationCategory", destinationsData.category);
    } else if (selection.includes("Contact")) {
      setCurrentFlow("contact");
      await addBotMessage("I'd be happy to connect you with our support team. Please select your preferred method of contact:", 500);
      setQuickReplies(["WhatsApp", "Phone Call", "Email", "Submit Inquiry"]);
    } else if (selection.includes("Social")) {
      setCurrentFlow("social");
      await addBotMessage("Stay connected with us on social media. Which platform would you like to visit?", 500);
      setQuickReplies(["Instagram", "LinkedIn", "YouTube"]);
    }
  };

  const handleContactFlow = async (selection: string) => {
    const actions: Record<string, { message: string; action: () => void }> = {
      WhatsApp: {
        message: "Opening WhatsApp to connect with our support team...",
        action: () => window.open("https://wa.me/94701774488", "_blank")
      },
      "Phone Call": {
        message: "Initiating call to our support line...",
        action: () => window.location.href = "tel:+94701774488"
      },
      Email: {
        message: "Opening email client...",
        action: () => window.location.href = "mailto:felicitatrips@gmail.com"
      },
      "Submit Inquiry": {
        message: "Redirecting to our inquiry form...",
        action: () => router.push("/contact-us#contact-form")
      }
    };
    
    const action = actions[selection];
    if (action) {
      await addBotMessage(action.message, 500);
      setTimeout(() => {
        action.action();
        handleClose();
      }, 800);
    }
    await resetToMain();
  };

  const handleSocialFlow = async (selection: string) => {
    const actions: Record<string, { message: string; url: string }> = {
      Instagram: { message: "Opening Instagram page...", url: "https://www.instagram.com/felicitatrips" },
      LinkedIn: { message: "Opening LinkedIn page...", url: "https://linkedin.com/company/felicita-trips" },
      YouTube: { message: "Opening YouTube channel...", url: "https://youtube.com/@felicita-trips" }
    };
    
    const action = actions[selection];
    if (action) {
      await addBotMessage(action.message, 500);
      setTimeout(() => {
        window.open(action.url, "_blank");
        handleClose();
      }, 800);
    }
    await resetToMain();
  };

  const handleUserResponse = async (selection: string) => {
    addUserMessage(selection);
    scrollToBottom();

    if (currentFlow === "main") {
      await handleMainMenu(selection);
    } else if (currentFlow === "contact") {
      await handleContactFlow(selection);
    } else if (currentFlow === "social") {
      await handleSocialFlow(selection);
    } else if (currentFlow === "inquiry" || currentInputField) {
      await handleInquiryFlow(selection);
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const refreshChat = () => {
    setMessages([]);
    setCurrentFlow("main");
    setActiveFlowType("tours");
    setToursData({ category: [], duration: [], tourType: [], season: [], budget: [] });
    setActivitiesData({ category: [], season: [], duration: [] });
    setDestinationsData({ category: [], location: [], rating: [] });
    setQuickReplies([]);
    setVisibleMessages(new Set());
    setInquiryForm({ name: "", email: "", phone: "" });
    setCurrentInputField(null);
    setIsOpen(false);
    setTimeout(() => setIsOpen(true), 300);
  };

  // Selection UI Component
  const SelectionUI = ({ options, selectionType, title }: { options: string[]; selectionType: ChatBotSelectionType; title: string }) => {
    const currentSelections = getCurrentSelections(selectionType);
    const [selected, setSelected] = useState<Set<string>>(new Set(currentSelections));

    const toggleOption = (option: string) => {
      const newSelected = new Set(selected);
      if (newSelected.has(option)) newSelected.delete(option);
      else newSelected.add(option);
      setSelected(newSelected);
    };

    const handleConfirm = () => {
      handleSelectionConfirm(selectionType, Array.from(selected));
    };

    if (options.length === 0) {
      return (
        <div className="flex flex-col gap-3 p-4 bg-teal-50 rounded-2xl rounded-bl-1 max-w-[95%] shadow-sm">
          <div className="border-b border-teal-200 pb-2">
            <h4 className="text-sm font-semibold text-teal-800 m-0">{title}</h4>
            <p className="text-xs text-teal-600 mt-1">Loading options...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 p-4 bg-teal-50 rounded-2xl rounded-bl-1 max-w-[95%] shadow-sm">
        <div className="border-b border-teal-200 pb-2">
          <h4 className="text-sm font-semibold text-teal-800 m-0">{title}</h4>
          <p className="text-xs text-teal-600 mt-1">Select all that apply • {selected.size} selected</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selected.has(option)
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-teal-600 border border-teal-200 hover:bg-teal-50"
              }`}
            >
              {selected.has(option) && "✓ "}{option}
            </button>
          ))}
        </div>
        <div className="flex gap-2 justify-end pt-1">
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-all shadow-sm"
          >
            ✅ Done ({selected.size} selected)
          </button>
        </div>
      </div>
    );
  };

  // Show loading while categories are being fetched
  if (categoriesLoading && isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-[1000]">
        <button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full bg-teal-600 shadow-lg flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <>
      {isMobile && isOpen && (
        <div
          className={`fixed inset-0 z-[998] bg-black/45 backdrop-blur-sm transition-opacity duration-250 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleClose}
        />
      )}

      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="fixed bottom-5 right-5 z-[1000] w-14 h-14 rounded-full bg-teal-600 shadow-[0_8px_32px_rgba(13,148,136,0.33)] hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-250 flex items-center justify-center cursor-pointer outline-none lg:bottom-7 lg:right-7 lg:w-[60px] lg:h-[60px]"
        aria-label="Toggle chat"
      >
        <span className="flex items-center justify-center">
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </span>
        {!isOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />}
      </button>

      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`fixed z-[999] flex flex-col overflow-hidden shadow-xl bg-white ${
            isMobile
              ? "bottom-0 right-0 left-0 w-full h-[92dvh] rounded-t-2xl"
              : "bottom-[84px] right-5 w-[clamp(360px,35vw,480px)] h-[clamp(560px,80vh,700px)] rounded-2xl border border-teal-50"
          } ${
            isClosing
              ? isMobile
                ? "animate-[sheet-exit_0.28s_cubic-bezier(0.55,0,1,0.45)_forwards]"
                : "animate-[window-exit_0.28s_cubic-bezier(0.55,0,1,0.45)_forwards]"
              : isMobile
              ? "animate-[sheet-enter_0.38s_cubic-bezier(0.34,1.3,0.64,1)_forwards]"
              : "animate-[window-enter_0.35s_cubic-bezier(0.34,1.45,0.64,1)_forwards]"
          }`}
          style={{ transformOrigin: "bottom right" }}
        >
          {/* Header */}
          <div className="flex-shrink-0 px-4 py-3.5 flex items-center justify-between bg-teal-600">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full border-2 border-white bg-white flex items-center justify-center">
                <Image src={COMPANY_LOGO_IMAGE} alt="Felicita Trips Logo" className="w-full h-full rounded-full object-cover" width={1000} height={1000} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white m-0">Felicita Trips Concierge</h3>
                <p className="text-[11px] text-white/80 mt-0.5">Online • Travel Specialist</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/15 rounded-lg w-[34px] h-[34px] flex items-center justify-center text-white cursor-pointer transition-all hover:bg-white/30 hover:rotate-180" onClick={refreshChat} aria-label="Start over">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button className="bg-white/15 rounded-lg w-[34px] h-[34px] flex items-center justify-center text-white cursor-pointer transition-all hover:bg-white/30 hover:scale-105" onClick={handleClose} aria-label="Close chat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((message) => {
              const configs = getSelectionConfigs();
              const selectionConfig = message.isSelectionUI && message.selectionType 
                ? configs[message.selectionType] 
                : null;
              
              return (
                <div
                  key={message.id}
                  className={`flex gap-2 items-start transition-all duration-300 ${
                    visibleMessages.has(message.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="flex-shrink-0 w-8">
                      <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14" className="text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className={`flex-1 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {message.isSelectionUI && message.selectionOptions && message.selectionType ? (
                      <SelectionUI
                        options={message.selectionOptions}
                        selectionType={message.selectionType}
                        title={selectionConfig?.title || message.selectionTitle || "Select Options"}
                      />
                    ) : (
                      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                        message.sender === "user"
                          ? "bg-teal-600 text-white rounded-br-1"
                          : "bg-teal-50 text-gray-800 rounded-bl-1"
                      }`}>
                        <p className="text-sm leading-relaxed m-0 whitespace-pre-wrap">{message.text}</p>
                        <span className={`text-[10px] block mt-1 opacity-70 ${message.sender === "user" ? "text-white/65" : "text-gray-500"}`}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    )}
                  </div>
                  {message.sender === "user" && <div className="flex-shrink-0 w-8" />}
                </div>
              );
            })}

            {/* Input field for name/email/phone */}
            {currentInputField && (
              <div className="flex gap-2 items-start">
                <div className="flex-shrink-0 w-8">
                  <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14" className="text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex justify-start">
                  <div className="bg-teal-50 rounded-2xl rounded-bl-1 p-3 max-w-[80%]">
                    <input
                      type={currentInputField === "email" ? "email" : "text"}
                      placeholder={
                        currentInputField === "name" ? "Enter your full name" :
                        currentInputField === "email" ? "Enter your email address" :
                        "Enter your phone number"
                      }
                      className="w-full px-3 py-2 rounded-lg border border-teal-200 focus:outline-none focus:border-teal-500 text-sm"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const value = (e.target as HTMLInputElement).value;
                          if (value.trim()) {
                            handleUserResponse(value.trim());
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                      autoFocus
                    />
                    <p className="text-xs text-gray-500 mt-1">Press Enter to submit</p>
                  </div>
                </div>
              </div>
            )}

            {isTyping && !currentInputField && !isSubmittingInquiry && (
              <div className="flex gap-2 items-start">
                <div className="flex-shrink-0 w-8">
                  <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14" className="text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex justify-start">
                  <div className="bg-teal-50 rounded-2xl rounded-bl-1 px-4 py-3 flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-[typing-bounce_1.2s_ease-in-out_infinite]" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-[typing-bounce_1.2s_ease-in-out_infinite_0.16s]" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-[typing-bounce_1.2s_ease-in-out_infinite_0.32s]" />
                  </div>
                </div>
              </div>
            )}

            {isSubmittingInquiry && (
              <div className="flex gap-2 items-start">
                <div className="flex-shrink-0 w-8">
                  <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex justify-start">
                  <div className="bg-teal-50 rounded-2xl rounded-bl-1 px-4 py-3">
                    <p className="text-sm text-teal-600 m-0">Sending your inquiry...</p>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {quickReplies.length > 0 && !currentInputField && !isSubmittingInquiry && (
            <div className="flex-shrink-0 px-3 pb-3 pt-2 flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUserResponse(reply)}
                  className="px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all hover:-translate-y-0.5 bg-teal-50 text-teal-600 border border-teal-200"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex-shrink-0 px-4 py-2 text-center border-t border-teal-50">
            <p className="text-[10px] m-0 opacity-70 text-gray-500">Felicita Trips | Premium Sri Lanka Travel Experiences | 24/7 Concierge Support</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes window-enter {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes window-exit {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.9) translateY(20px); }
        }
        @keyframes sheet-enter {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sheet-exit {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(100%); }
        }
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
};

export default ChatBot;