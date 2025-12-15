"use client";
import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  MessageSquare,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle as MessageCircleIcon,
  Phone,
  Video,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface BestFor {
  bestForId: number;
  bestForName: string;
  bestForDescription: string;
  bestForStatus: string;
}

interface SocialMediaChannel {
  socialMediaId: number;
  socialMediaName: string;
  socialMediaUsername: string;
  socialMediaDescription: string;
  link: string;
  iconUrl: string;
  color: string;
  hoverColor: string;
  socialMediaStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string | null;
  updatedBy: number | null;
  bestForList: BestFor[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: SocialMediaChannel[];
  timestamp: string;
}

interface QuickContactOption {
  id: number;
  name: string;
  icon: React.ReactNode;
  url: string;
  description: string;
  responseTime: string;
  color: string;
}

const ContactUsSocialMedia = () => {
  const [socialMediaChannels, setSocialMediaChannels] = useState<
    SocialMediaChannel[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("info@felicita.com").then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  useEffect(() => {
    const fetchSocialMediaData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "http://localhost:8080/felicita/api/v0/social-media/with-best-for",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.code === 200 && data.data) {
          setSocialMediaChannels(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching social media data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load social media data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMediaData();
  }, []);

  const getSocialIcon = (platformName: string) => {
    const name = platformName.toLowerCase();
    const iconClass = "w-6 h-6";

    switch (name) {
      case "facebook":
        return <Facebook className={iconClass} />;
      case "instagram":
        return <Instagram className={iconClass} />;
      case "youtube":
        return <Youtube className={iconClass} />;
      case "twitter":
        return <Twitter className={iconClass} />;
      case "linkedin":
        return <Linkedin className={iconClass} />;
      case "tiktok":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.302-.002.603.058.89.18v-3.41a6.34 6.34 0 00-5.51 1.77 6.34 6.34 0 009.48 8.12 6.34 6.34 0 002.22-4.89v-7a8.16 8.16 0 004.39 1.27v-3.45a4.83 4.83 0 01-1.16-.12z" />
          </svg>
        );
      case "whatsapp":
        return <MessageCircle className={iconClass} />;
      case "messenger":
        return <MessageSquare className={iconClass} />;
      default:
        return <MessageCircle className={iconClass} />;
    }
  };

  const getBgColorClass = (platformName: string) => {
    const name = platformName.toLowerCase();
    switch (name) {
      case "facebook":
        return "bg-blue-50";
      case "instagram":
        return "bg-pink-50";
      case "youtube":
        return "bg-red-50";
      case "twitter":
        return "bg-blue-50";
      case "linkedin":
        return "bg-blue-50";
      case "tiktok":
        return "bg-gray-100";
      case "whatsapp":
        return "bg-green-50";
      case "messenger":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  const quickContactOptions: QuickContactOption[] = [
    {
      id: 1,
      name: "Live Chat",
      icon: <MessageCircleIcon className="w-5 h-5" />,
      url: "#",
      description: "Chat with our travel experts",
      responseTime: "Usually replies in 5 minutes",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      name: "Video Call",
      icon: <Video className="w-5 h-5" />,
      url: "#",
      description: "Schedule a virtual consultation",
      responseTime: "By appointment",
      color: "from-blue-500 to-teal-500",
    },
    {
      id: 3,
      name: "Call Back",
      icon: <Phone className="w-5 h-5" />,
      url: "#",
      description: "Request a phone call",
      responseTime: "Within 2 hours",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "Book Appointment",
      icon: <Calendar className="w-5 h-5" />,
      url: "#",
      description: "Schedule in-person meeting",
      responseTime: "24 hours notice",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const handleSocialClick = (url: string, name: string) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-600">Loading social media channels...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-red-600 mb-2">Error loading social media data</p>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Connect With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Follow us on social media for travel inspiration, or reach out
            through your preferred communication channel.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Social Media Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Follow Our Journey
          </h3>

          {socialMediaChannels.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No social media channels available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {socialMediaChannels.map((channel) => {
                const isActive = channel.socialMediaStatus === "ACTIVE";
                const bgColorClass = getBgColorClass(channel.socialMediaName);

                return (
                  <div
                    key={channel.socialMediaId}
                    onClick={() =>
                      handleSocialClick(channel.link, channel.socialMediaName)
                    }
                    className={`${bgColorClass} rounded-2xl p-6 border border-gray-200 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
                    style={
                      {
                        "--channel-color": channel.color,
                        "--channel-hover-color": channel.hoverColor,
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-3 rounded-xl bg-white/50 group-hover:bg-white transition-colors"
                        style={{ color: channel.color }}
                      >
                        {getSocialIcon(channel.socialMediaName)}
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/50"
                        style={{ color: channel.color }}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </div>
                    </div>

                    <div>
                      <h4
                        className="text-lg font-bold mb-2"
                        style={{ color: channel.color }}
                      >
                        {channel.socialMediaName}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3">
                        {channel.socialMediaDescription}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <span className="font-medium">Handle:</span>
                          <span className="font-mono">
                            {channel.socialMediaUsername}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {channel.bestForList.slice(0, 2).map((bestFor) => (
                            <span
                              key={bestFor.bestForId}
                              className="px-2 py-1 bg-white/50 text-gray-700 rounded-full text-xs"
                            >
                              {bestFor.bestForName}
                            </span>
                          ))}
                          {channel.bestForList.length > 2 && (
                            <span className="px-2 py-1 bg-white/50 text-gray-500 rounded-full text-xs">
                              +{channel.bestForList.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Click to connect
                        </span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          style={{ color: channel.color }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Email Subscription */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-blue-100">
                  Get travel tips, exclusive deals, and destination updates
                  delivered straight to your inbox.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-blue-100 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSocialMedia;
