// components/home-page-components/ChatBot.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { COMPANY_LOGO_IMAGE } from "@/utils/constant";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

type FlowType =
  | "main"
  | "tours"
  | "activities"
  | "destinations"
  | "contact"
  | "social";
type ToursStep = "category" | "duration" | "tourType" | "season" | "budget";
type ActivitiesStep = "category" | "season" | "duration";
type DestinationsStep = "category" | "location" | "rating";

const seaTheme = {
  primary: "#0D9488",
  primaryDark: "#0F766E",
  primaryLight: "#14B8A6",
  background: "#FFFFFF",
  surface: "#F0FDFA",
  border: "#CCFBF1",
  text: "#1F2937",
  textSecondary: "#6B7280",
  accent: "#06B6D4",
};

const ChatBot = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<FlowType>("main");

  // Tours state
  const [toursData, setToursData] = useState({
    category: "",
    duration: "",
    tourType: "",
    season: "",
    budget: "",
  });
  const [toursStep, setToursStep] = useState<ToursStep>("category");

  // Activities state
  const [activitiesData, setActivitiesData] = useState({
    category: "",
    season: "",
    duration: "",
  });
  const [activitiesStep, setActivitiesStep] =
    useState<ActivitiesStep>("category");

  // Destinations state
  const [destinationsData, setDestinationsData] = useState({
    category: "",
    location: "",
    rating: "",
  });
  const [destinationsStep, setDestinationsStep] =
    useState<DestinationsStep>("category");

  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<Set<number>>(
    new Set(),
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 640);
      setIsSmallScreen(height < 700 || width < 480);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
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

  // Improved scroll to bottom function with multiple attempts
  const scrollToBottom = () => {
    // Immediate scroll
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Scroll after a short delay for content rendering
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    // Additional scroll after animation frames
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
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
        setMessages((prev) => [
          ...prev,
          { id: newId, text, sender: "bot", timestamp: new Date() },
        ]);
        setIsTyping(false);
        setTimeout(() => {
          setVisibleMessages((prev) => new Set([...prev, newId]));
          scrollToBottom(); // Scroll after message becomes visible
          resolve();
        }, 30);
      }, delay);
    });
  };

  const addUserMessage = (text: string) => {
    const newId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: newId, text, sender: "user", timestamp: new Date() },
    ]);
    setTimeout(() => {
      setVisibleMessages((prev) => new Set([...prev, newId]));
      scrollToBottom();
    }, 30);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const init = async () => {
        await addBotMessage(
          "Good day! Welcome to Felicita Trips. How may I assist you with your Sri Lanka travel plans today?",
          500,
        );
        setQuickReplies([
          "Tour Packages",
          "Activities & Experiences",
          "Destinations",
          "Contact Support",
          "Social Media",
        ]);
        scrollToBottom();
      };
      init();
    }
  }, [isOpen]);

  const resetToMain = async () => {
    setCurrentFlow("main");
    setToursData({
      category: "",
      duration: "",
      tourType: "",
      season: "",
      budget: "",
    });
    setActivitiesData({ category: "", season: "", duration: "" });
    setDestinationsData({ category: "", location: "", rating: "" });
    await addBotMessage(
      "How may I assist you further with your Sri Lanka travel plans?",
      500,
    );
    setQuickReplies([
      "Tour Packages",
      "Activities & Experiences",
      "Destinations",
      "Contact Support",
      "Social Media",
    ]);
    scrollToBottom();
  };

  const handleMainMenu = async (selection: string) => {
    if (selection.includes("Tour")) {
      setCurrentFlow("tours");
      setToursStep("category");
      await addBotMessage(
        "Thank you for your interest in our tour packages. I'll help you find the perfect itinerary.",
        500,
      );
      await addBotMessage(
        "Please select the tour category that best aligns with your travel preferences:",
        500,
      );
      setQuickReplies([
        "Luxury",
        "Budget",
        "Family",
        "Solo Traveler",
        "Group",
        "Cultural",
        "Wildlife",
        "Beach",
        "Adventure",
        "Honeymoon",
        "Wellness",
        "Photography",
        "Food & Culinary",
        "Short Getaway",
        "Extended Tour",
      ]);
      scrollToBottom();
    } else if (selection.includes("Activities")) {
      setCurrentFlow("activities");
      setActivitiesStep("category");
      await addBotMessage(
        "Excellent choice. Sri Lanka offers a diverse range of exceptional experiences.",
        500,
      );
      await addBotMessage(
        "Please specify the type of activities you're interested in:",
        500,
      );
      setQuickReplies([
        "Adventure & Outdoor",
        "Water Sports & Marine",
        "Wildlife & Safari",
        "Cultural & Heritage",
        "Sightseeing & Scenic",
        "Wellness & Ayurveda",
        "Food & Culinary",
        "Beach & Coastal",
        "Tea Trails & Plantations",
        "Village & Rural Experiences",
        "Railway & Scenic Journeys",
        "Festivals & Events",
      ]);
      scrollToBottom();
    } else if (selection.includes("Destinations")) {
      setCurrentFlow("destinations");
      setDestinationsStep("category");
      await addBotMessage(
        "Wonderful. Let me help you discover Sri Lanka's most captivating destinations.",
        500,
      );
      await addBotMessage("What type of destination appeals to you most?", 500);
      setQuickReplies([
        "Cultural & Heritage",
        "Beach & Coastal",
        "Wildlife & Nature",
        "Hill Country & Tea",
        "Adventure & Sports",
        "Wellness & Ayurveda",
        "Religious & Sacred",
        "Village & Rural Experiences",
        "Luxury & Honeymoon",
        "Budget & Backpacker",
      ]);
      scrollToBottom();
    } else if (selection.includes("Contact")) {
      setCurrentFlow("contact");
      await addBotMessage(
        "I'd be happy to connect you with our support team. Please select your preferred method of contact:",
        500,
      );
      setQuickReplies(["WhatsApp", "Phone Call", "Email", "Submit Inquiry"]);
      scrollToBottom();
    } else if (selection.includes("Social")) {
      setCurrentFlow("social");
      await addBotMessage(
        "Stay connected with us on social media. Which platform would you like to visit?",
        500,
      );
      setQuickReplies(["Instagram", "LinkedIn", "YouTube"]);
      scrollToBottom();
    }
  };

  const handleToursFlow = async (selection: string) => {
    const updateData = { ...toursData };

    switch (toursStep) {
      case "category":
        updateData.category = selection;
        setToursData(updateData);
        await addBotMessage(
          `Thank you. ${selection} tours are an excellent choice for experiencing Sri Lanka's finest offerings.`,
          500,
        );
        await addBotMessage(
          "Please indicate your preferred tour duration (in days). You may select from our standard packages or specify a custom duration:",
          500,
        );
        setQuickReplies([
          "5 Days",
          "7 Days",
          "9 Days",
          "12 Days",
          "14 Days",
          "Custom Duration",
        ]);
        setToursStep("duration");
        scrollToBottom();
        break;

      case "duration":
        updateData.duration =
          selection === "Custom Duration"
            ? "null"
            : selection.replace(" Days", "");
        setToursData(updateData);
        await addBotMessage(`Noted: ${selection}`, 500);
        await addBotMessage(
          "Please specify the tour type that best matches your interests:",
          500,
        );
        setQuickReplies([
          "Adventure",
          "Cultural",
          "Wildlife",
          "Beach",
          "Wellness & Ayurveda",
          "Hill Country",
          "Honeymoon",
          "Family",
          "Photography",
          "Food & Culinary",
          "Luxury",
          "Budget",
          "Solo Traveler",
          "Group Tours",
          "Private Tours",
          "Short Breaks",
          "Extended Tours",
        ]);
        setToursStep("tourType");
        scrollToBottom();
        break;

      case "tourType":
        updateData.tourType = selection;
        setToursData(updateData);
        await addBotMessage(
          `Excellent choice. ${selection} tours showcase some of Sri Lanka's most remarkable experiences.`,
          500,
        );
        await addBotMessage(
          "Which travel season do you prefer? This will help us recommend the most suitable destinations and experiences:",
          500,
        );
        setQuickReplies([
          "Adventure Sports Season",
          "Bird Watching Premium",
          "North Coast Season",
          "Cultural Triangle Shoulder",
          "Whale Watching Peak",
          "Surfing Peak Season",
          "Wildlife Gathering Season",
          "Hill Country Cool Season",
          "Wet Inter-Monsoon",
          "Hot Inter-Monsoon",
          "Peak East Coast",
          "Peak West & South",
          "All Year Round",
        ]);
        setToursStep("season");
        scrollToBottom();
        break;

      case "season":
        updateData.season = selection;
        setToursData(updateData);
        await addBotMessage(
          `Thank you. ${selection} offers wonderful travel conditions for your chosen itinerary.`,
          500,
        );
        await addBotMessage(
          "Please specify your maximum budget per person (in USD). This will help us curate the best options within your range:",
          500,
        );
        setQuickReplies([
          "$500",
          "$1,000",
          "$1,500",
          "$2,000",
          "$3,000",
          "$5,000",
          "No Limit",
        ]);
        setToursStep("budget");
        scrollToBottom();
        break;

      case "budget":
        const maxPrice =
          selection === "No Limit"
            ? "999999"
            : selection.replace("$", "").replace(",", "");
        updateData.budget = maxPrice;
        setToursData(updateData);

        const params = new URLSearchParams();
        if (updateData.tourType && updateData.tourType !== "null")
          params.append("tourType", encodeURIComponent(updateData.tourType));
        if (updateData.category && updateData.category !== "null")
          params.append(
            "tourCategory",
            encodeURIComponent(updateData.category),
          );
        if (updateData.season && updateData.season !== "null")
          params.append("season", encodeURIComponent(updateData.season));
        if (updateData.budget && updateData.budget !== "null")
          params.append("maxPrice", updateData.budget);
        if (updateData.duration && updateData.duration !== "null")
          params.append("duration", updateData.duration);

        const url = `/sri-lankan-tours${params.toString() ? `?${params.toString()}` : ""}`;

        await addBotMessage(
          `Perfect. I've gathered all your preferences. I will now redirect you to our curated selection of ${updateData.category} tours that match your criteria.`,
          800,
        );
        await addBotMessage(
          `Please wait while I retrieve the best options for you...`,
          500,
        );
        scrollToBottom();

        setTimeout(() => {
          router.push(url);
          handleClose();
        }, 1500);
        break;
    }
  };

  const handleActivitiesFlow = async (selection: string) => {
    const updateData = { ...activitiesData };

    switch (activitiesStep) {
      case "category":
        updateData.category = selection;
        setActivitiesData(updateData);
        await addBotMessage(
          `Thank you. ${selection} activities are among Sri Lanka's most cherished experiences.`,
          500,
        );
        await addBotMessage(
          "Please indicate your preferred travel season, as this affects activity availability and conditions:",
          500,
        );
        setQuickReplies([
          "Adventure Sports Season",
          "Bird Watching Premium",
          "North Coast Season",
          "Cultural Triangle Shoulder",
          "Whale Watching Peak",
          "Surfing Peak Season",
          "Wildlife Gathering Season",
          "Hill Country Cool Season",
          "Wet Inter-Monsoon",
          "Hot Inter-Monsoon",
          "Peak East Coast",
          "Peak West & South",
          "All Year Round",
        ]);
        setActivitiesStep("season");
        scrollToBottom();
        break;

      case "season":
        updateData.season = selection;
        setActivitiesData(updateData);
        await addBotMessage(
          `Excellent. ${selection} provides optimal conditions for your selected activities.`,
          500,
        );
        await addBotMessage(
          "How many days would you like to allocate for these activities? This will help us structure an appropriate itinerary:",
          500,
        );
        setQuickReplies([
          "1 Day",
          "2 Days",
          "3 Days",
          "4 Days",
          "5 Days",
          "8 Days",
        ]);
        setActivitiesStep("duration");
        scrollToBottom();
        break;

      case "duration":
        updateData.duration = selection
          .replace(" Days", "")
          .replace(" Day", "");
        setActivitiesData(updateData);

        const params = new URLSearchParams();
        if (updateData.category && updateData.category !== "null")
          params.append("category", encodeURIComponent(updateData.category));
        if (updateData.duration && updateData.duration !== "null")
          params.append("duration", updateData.duration);
        if (updateData.season && updateData.season !== "null")
          params.append("season", encodeURIComponent(updateData.season));

        const url = `/activities${params.toString() ? `?${params.toString()}` : ""}`;

        await addBotMessage(
          `Thank you. I've processed your preferences. I will now direct you to our comprehensive selection of ${updateData.category} activities.`,
          800,
        );
        await addBotMessage(`Redirecting you to view the best options...`, 500);
        scrollToBottom();

        setTimeout(() => {
          router.push(url);
          handleClose();
        }, 1500);
        break;
    }
  };

  const handleDestinationsFlow = async (selection: string) => {
    const updateData = { ...destinationsData };

    switch (destinationsStep) {
      case "category":
        updateData.category = selection;
        setDestinationsData(updateData);
        await addBotMessage(
          `Thank you. ${selection} destinations showcase the remarkable diversity of Sri Lanka's landscape and culture.`,
          500,
        );
        await addBotMessage(
          "Please specify your preferred region or province for a more targeted recommendation:",
          500,
        );
        setQuickReplies([
          "Central Province",
          "Uva Province",
          "Southern Province",
          "North Central Province",
          "Northern Province",
          "Western Province",
          "Eastern Province",
          "Hambantota, Sri Lanka",
          "Gal Oya, Sri Lanka",
          "North Western Province",
          "Sabaragamuwa Province",
          "Belihuloya, Sabaragamuwa Province, Sri Lanka",
        ]);
        setDestinationsStep("location");
        scrollToBottom();
        break;

      case "location":
        updateData.location = selection;
        setDestinationsData(updateData);
        await addBotMessage(
          `Thank you. ${selection} offers wonderful travel opportunities.`,
          500,
        );
        await addBotMessage(
          "Please select your minimum preferred rating (1-5 stars) to ensure we recommend only the highest-quality destinations:",
          500,
        );
        setQuickReplies(["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"]);
        setDestinationsStep("rating");
        scrollToBottom();
        break;

      case "rating":
        updateData.rating = selection
          .replace(" Stars", "")
          .replace(" Star", "");
        setDestinationsData(updateData);

        const params = new URLSearchParams();
        if (updateData.category && updateData.category !== "null")
          params.append("category", encodeURIComponent(updateData.category));
        if (updateData.location && updateData.location !== "null")
          params.append("location", encodeURIComponent(updateData.location));
        if (updateData.rating && updateData.rating !== "null")
          params.append("rating", updateData.rating);

        const url = `/destinations${params.toString() ? `?${params.toString()}` : ""}`;

        await addBotMessage(
          `Perfect. Based on your criteria, I will now show you the finest ${updateData.rating}-star ${updateData.category} destinations in ${updateData.location}.`,
          800,
        );
        await addBotMessage(
          `Preparing your personalized destination recommendations...`,
          500,
        );
        scrollToBottom();

        setTimeout(() => {
          router.push(url);
          handleClose();
        }, 1500);
        break;
    }
  };

  const handleContactFlow = async (selection: string) => {
    if (selection.includes("WhatsApp")) {
      await addBotMessage(
        "Thank you. I'm opening WhatsApp so you can connect directly with our support team. They typically respond within minutes.",
        500,
      );
      scrollToBottom();
      setTimeout(() => {
        window.open("https://wa.me/94701774488", "_blank");
        handleClose();
      }, 800);
    } else if (selection.includes("Phone")) {
      await addBotMessage(
        "Thank you. I will initiate a call to our support line. Our team is available 24/7 to assist you.",
        500,
      );
      scrollToBottom();
      setTimeout(() => {
        window.location.href = "tel:+94701774488";
        handleClose();
      }, 800);
    } else if (selection.includes("Email")) {
      await addBotMessage(
        "Thank you. I'll open your email client with our address pre-filled. We typically respond to all inquiries within 2-4 hours.",
        500,
      );
      scrollToBottom();
      setTimeout(() => {
        window.location.href = "mailto:felicitatrips@gmail.com";
        handleClose();
      }, 800);
    } else if (selection.includes("Inquiry")) {
      await addBotMessage(
        "Thank you. I'll direct you to our inquiry form where you can provide your details, and our travel specialists will prepare a customized response.",
        500,
      );
      scrollToBottom();
      setTimeout(() => {
        router.push("/contact-us#contact-form");
        handleClose();
      }, 800);
    }
  };

  const handleSocialFlow = async (selection: string) => {
    if (selection.includes("Instagram")) {
      await addBotMessage(
        "Thank you for your interest. Opening our Instagram page where we regularly share stunning visuals and travel inspiration from across Sri Lanka.",
        500,
      );
      scrollToBottom();
      setTimeout(() => {
        window.open("https://www.instagram.com/felicitatrips", "_blank");
        handleClose();
      }, 800);
    } else if (selection.includes("LinkedIn")) {
      await addBotMessage(
        "Thank you. Opening our LinkedIn page where we share industry insights, company updates, and professional travel resources.",
        500,
      );
      scrollToBottom();
      setTimeout(() => {
        window.open("https://linkedin.com/company/felicita-trips", "_blank");
        handleClose();
      }, 800);
    } else if (selection.includes("YouTube")) {
      await addBotMessage(
        "Thank you. Opening our YouTube channel featuring destination guides, travel tips, and virtual tours of Sri Lanka's most spectacular locations.",
        500,
      );
      scrollToBottom();
      setTimeout(() => {
        window.open("https://youtube.com/@felicita-trips", "_blank");
        handleClose();
      }, 800);
    }
  };

  const handleUserResponse = async (selection: string) => {
    addUserMessage(selection);
    setQuickReplies([]);
    scrollToBottom();

    if (currentFlow === "main") {
      await handleMainMenu(selection);
    } else if (currentFlow === "tours") {
      await handleToursFlow(selection);
    } else if (currentFlow === "activities") {
      await handleActivitiesFlow(selection);
    } else if (currentFlow === "destinations") {
      await handleDestinationsFlow(selection);
    } else if (currentFlow === "contact") {
      await handleContactFlow(selection);
      await resetToMain();
    } else if (currentFlow === "social") {
      await handleSocialFlow(selection);
      await resetToMain();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const refreshChat = () => {
    setMessages([]);
    setCurrentFlow("main");
    setToursData({
      category: "",
      duration: "",
      tourType: "",
      season: "",
      budget: "",
    });
    setActivitiesData({ category: "", season: "", duration: "" });
    setDestinationsData({ category: "", location: "", rating: "" });
    setQuickReplies([]);
    setVisibleMessages(new Set());
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 300);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className={`chat-backdrop ${isClosing ? "chat-backdrop--closing" : "chat-backdrop--open"}`}
          onClick={handleClose}
        />
      )}

      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="chat-fab"
        style={{
          backgroundColor: seaTheme.primary,
          boxShadow: `0 8px 32px ${seaTheme.primary}55`,
        }}
        aria-label="Toggle chat"
      >
        <span
          className={`chat-fab-icon ${isOpen ? "chat-fab-icon--close" : "chat-fab-icon--open"}`}
        >
          {isOpen ? (
            <svg
              className="icon-svg"
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
          ) : (
            <svg
              className="icon-svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </span>
        {!isOpen && <span className="chat-fab-badge" />}
      </button>

      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`chat-window ${isClosing ? "chat-window--closing" : "chat-window--open"} ${isMobile ? "chat-window--mobile" : ""} ${isSmallScreen ? "chat-window--small" : ""}`}
          style={{
            backgroundColor: seaTheme.background,
            border: isMobile ? "none" : `1px solid ${seaTheme.border}`,
          }}
        >
          <div
            className="chat-header"
            style={{ backgroundColor: seaTheme.primary }}
          >
            <div className="chat-header-left">
              <div className="chat-avatar">
                <Image
                  src={COMPANY_LOGO_IMAGE}
                  alt="Felicita Trips Logo"
                  className="chat-avatar-logo"
                  width={1000}
                  height={1000}
                />
                <span className="chat-avatar-status" />
              </div>
              <div>
                <h3 className="chat-title">Felicita Trips Concierge</h3>
                <p className="chat-subtitle">Online • Travel Specialist</p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                className="chat-refresh-btn"
                onClick={refreshChat}
                aria-label="Start over"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
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
                className="chat-close-btn"
                onClick={handleClose}
                aria-label="Close chat"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-messages" ref={messagesContainerRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message-wrapper ${visibleMessages.has(message.id) ? "chat-message-wrapper--visible" : ""}`}
              >
                {message.sender === "bot" && (
                  <div className="chat-message-avatar">
                    <div
                      className="chat-message-avatar-icon"
                      style={{ backgroundColor: seaTheme.primaryLight }}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div
                  className={`chat-message-content ${message.sender === "user" ? "chat-message-content--user" : "chat-message-content--bot"}`}
                >
                  <div
                    className={`chat-bubble ${message.sender === "user" ? "chat-bubble--user" : "chat-bubble--bot"}`}
                    style={{
                      backgroundColor:
                        message.sender === "user"
                          ? seaTheme.primary
                          : seaTheme.surface,
                      color:
                        message.sender === "user" ? "#ffffff" : seaTheme.text,
                    }}
                  >
                    <p
                      className="chat-bubble-text"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {message.text}
                    </p>
                    <span
                      className="chat-bubble-time"
                      style={{
                        color:
                          message.sender === "user"
                            ? "rgba(255,255,255,0.65)"
                            : seaTheme.textSecondary,
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className="chat-message-avatar-placeholder" />
                )}
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-wrapper chat-message-wrapper--visible">
                <div className="chat-message-avatar">
                  <div
                    className="chat-message-avatar-icon"
                    style={{ backgroundColor: seaTheme.primaryLight }}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="chat-message-content chat-message-content--bot">
                  <div
                    className="chat-bubble chat-bubble--bot chat-bubble--typing"
                    style={{ backgroundColor: seaTheme.surface }}
                  >
                    <span
                      className="typing-dot"
                      style={{ backgroundColor: seaTheme.textSecondary }}
                    />
                    <span
                      className="typing-dot"
                      style={{ backgroundColor: seaTheme.textSecondary }}
                    />
                    <span
                      className="typing-dot"
                      style={{ backgroundColor: seaTheme.textSecondary }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {quickReplies.length > 0 && (
            <div className="chat-quick-replies">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUserResponse(reply)}
                  className="chat-quick-reply-btn"
                  style={{
                    backgroundColor: `${seaTheme.primary}10`,
                    border: `1px solid ${seaTheme.primary}30`,
                    color: seaTheme.primary,
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div className="chat-footer" style={{ borderColor: seaTheme.border }}>
            <p
              className="chat-footer-text"
              style={{ color: seaTheme.textSecondary }}
            >
              Felicita Trips | Premium Sri Lanka Travel Experiences | 24/7
              Concierge Support
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .chat-fab {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition:
            transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.25s ease;
          outline: none;
        }
        .chat-fab:hover {
          transform: scale(1.1) translateY(-2px);
        }
        .chat-fab:active {
          transform: scale(0.94);
        }
        .chat-fab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-svg {
          width: 24px;
          height: 24px;
          color: white;
        }
        .chat-fab-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
          animation: badge-pulse 2s ease-in-out infinite;
        }
        .chat-backdrop {
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(2px);
        }
        .chat-backdrop--open {
          animation: fade-in 0.25s ease forwards;
        }
        .chat-backdrop--closing {
          animation: fade-out 0.28s ease forwards;
        }
        .chat-window {
          position: fixed;
          bottom: 84px;
          right: 20px;
          z-index: 999;
          width: clamp(340px, 35vw, 480px);
          height: clamp(480px, 75vh, 700px);
          max-height: calc(100vh - 120px);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
        }
        .chat-window--open {
          animation: window-enter 0.35s cubic-bezier(0.34, 1.45, 0.64, 1)
            forwards;
        }
        .chat-window--closing {
          animation: window-exit 0.28s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }
        .chat-window--small {
          height: clamp(380px, 65vh, 500px) !important;
          max-height: calc(100vh - 100px) !important;
          bottom: 76px !important;
          right: 12px !important;
          width: clamp(300px, 30vw, 400px) !important;
        }
        .chat-window--mobile {
          bottom: 0 !important;
          right: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 92dvh !important;
          max-height: 92dvh !important;
          border-radius: 20px 20px 0 0 !important;
        }
        .chat-window--mobile.chat-window--open {
          animation: sheet-enter 0.38s cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
        }
        .chat-window--mobile .chat-header {
          padding: 12px 14px;
        }
        .chat-window--mobile .chat-messages {
          padding: 12px;
        }
        .chat-window--mobile .chat-quick-replies {
          padding: 6px 10px 10px;
          max-height: 90px;
        }
        .chat-window--mobile .chat-quick-reply-btn {
          padding: 6px 12px;
          font-size: 12px;
        }
        .chat-window--small .chat-header {
          padding: 10px 12px;
        }
        .chat-window--small .chat-title {
          font-size: 13px;
        }
        .chat-window--small .chat-subtitle {
          font-size: 10px;
        }
        .chat-window--small .chat-avatar {
          width: 32px;
          height: 32px;
        }
        .chat-window--small .chat-messages {
          padding: 10px;
          gap: 8px;
        }
        .chat-window--small .chat-bubble {
          padding: 8px 12px;
        }
        .chat-window--small .chat-bubble-text {
          font-size: 13px;
        }
        .chat-window--small .chat-quick-replies {
          padding: 4px 8px 8px;
          max-height: 80px;
          gap: 6px;
        }
        .chat-window--small .chat-quick-reply-btn {
          padding: 5px 10px;
          font-size: 11px;
        }
        .chat-window--small .chat-footer {
          padding: 4px 12px;
        }
        .chat-window--small .chat-footer-text {
          font-size: 9px;
        }
        .chat-window--small .chat-refresh-btn,
        .chat-window--small .chat-close-btn {
          width: 28px;
          height: 28px;
        }
        .chat-window--small .chat-refresh-btn svg,
        .chat-window--small .chat-close-btn svg {
          width: 14px;
          height: 14px;
        }
        .chat-header {
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          min-height: 60px;
        }
        .chat-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chat-header-actions {
          display: flex;
          gap: 8px;
        }
        .chat-avatar {
          position: relative;
          width: 40px;
          height: 40px;
          border-width: 2px;
          border-radius: 50%;
          background: rgb(255, 255, 255);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chat-avatar-icon {
          width: 22px;
          height: 22px;
          color: white;
        }
        .chat-avatar-status {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: #22c55e;
          border-radius: 50%;
          border: 2px solid white;
        }
        .chat-title {
          font-size: 15px;
          font-weight: 600;
          color: white;
          margin: 0;
          line-height: 1.2;
        }
        .chat-subtitle {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          margin: 2px 0 0;
          line-height: 1.2;
        }
        .chat-refresh-btn,
        .chat-close-btn {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          border-radius: 8px;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .chat-refresh-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(180deg);
        }
        .chat-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 0;
        }
        .chat-messages::-webkit-scrollbar {
          width: 4px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 4px;
        }
        .chat-message-wrapper {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 0.3s ease,
            transform 0.35s ease;
        }
        .chat-message-wrapper--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .chat-message-avatar {
          flex-shrink: 0;
          width: 32px;
        }
        .chat-message-avatar-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chat-message-avatar-placeholder {
          flex-shrink: 0;
          width: 32px;
        }
        .chat-message-content {
          flex: 1;
          display: flex;
        }
        .chat-message-content--bot {
          justify-content: flex-start;
        }
        .chat-message-content--user {
          justify-content: flex-end;
        }
        .chat-bubble {
          max-width: 80%;
          border-radius: 18px;
          padding: 10px 14px;
          word-break: break-word;
        }
        .chat-bubble--bot {
          border-bottom-left-radius: 4px;
        }
        .chat-bubble--user {
          border-bottom-right-radius: 4px;
        }
        .chat-bubble-text {
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }
        .chat-bubble-time {
          font-size: 10px;
          display: block;
          margin-top: 4px;
          opacity: 0.7;
        }
        .chat-bubble--typing {
          padding: 12px 16px;
          display: flex;
          gap: 5px;
        }
        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          animation: typing-bounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(1) {
          animation-delay: 0ms;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 160ms;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 320ms;
        }
        .chat-quick-replies {
          padding: 8px 12px 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          flex-shrink: 0;
          max-height: 120px;
          overflow-y: auto;
          align-items: center;
        }
        .chat-quick-replies::-webkit-scrollbar {
          width: 3px;
        }
        .chat-quick-replies::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        .chat-quick-reply-btn {
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .chat-quick-reply-btn:hover {
          transform: translateY(-2px);
          background: rgba(13, 148, 136, 0.2) !important;
        }
        .chat-quick-reply-btn:active {
          transform: scale(0.95);
        }
        .chat-avatar-logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        .chat-footer {
          padding: 8px 16px;
          text-align: center;
          border-top: 1px solid;
          flex-shrink: 0;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-footer-text {
          font-size: 10px;
          margin: 0;
          opacity: 0.7;
          line-height: 1.3;
        }
        @media (min-width: 1024px) {
          .chat-fab {
            bottom: 28px;
            right: 28px;
            width: 60px;
            height: 60px;
          }
          .chat-window {
            width: 440px;
            height: 640px;
            bottom: 100px;
            right: 28px;
            max-height: calc(100vh - 140px);
          }
          .chat-window--small {
            height: 520px !important;
            max-height: calc(100vh - 120px) !important;
            bottom: 92px !important;
            right: 24px !important;
            width: 380px !important;
          }
        }
        @media (max-width: 480px) {
          .chat-window--small {
            height: 75vh !important;
            max-height: 75vh !important;
            bottom: 72px !important;
            right: 8px !important;
            width: calc(100% - 16px) !important;
          }
        }
        @keyframes window-enter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes window-exit {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
        }
        @keyframes sheet-enter {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes sheet-exit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(100%);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes badge-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(0.85);
          }
        }
        @keyframes typing-bounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
