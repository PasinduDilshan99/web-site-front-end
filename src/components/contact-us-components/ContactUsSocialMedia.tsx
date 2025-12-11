"use client";
import React, { useState } from 'react';
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
  Calendar
} from 'lucide-react';

interface SocialMediaChannel {
  id: number;
  name: string;
  icon: React.ReactNode;
  username: string;
  url: string;
  description: string;
  bestFor: string[];
  color: string;
  bgColor: string;
  active: boolean;
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
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('info@felicita.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const socialMediaChannels: SocialMediaChannel[] = [
    {
      id: 1,
      name: "WhatsApp",
      icon: <MessageCircle className="w-6 h-6" />,
      username: "+94 77 123 4567",
      url: "https://wa.me/94771234567",
      description: "Instant chat support for quick queries",
      bestFor: ["Quick Questions", "Booking Confirmations", "Urgent Updates"],
      color: "text-green-600",
      bgColor: "bg-green-50",
      active: true
    },
    {
      id: 2,
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      username: "@FelicitaTravel",
      url: "https://facebook.com/FelicitaTravel",
      description: "Follow for travel tips and promotions",
      bestFor: ["Travel Inspiration", "Promotions", "Customer Reviews"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      active: true
    },
    {
      id: 3,
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      username: "@FelicitaTravel",
      url: "https://instagram.com/FelicitaTravel",
      description: "Beautiful travel photos and stories",
      bestFor: ["Travel Photos", "Reels", "Destination Ideas"],
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      active: true
    },
    {
      id: 4,
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      username: "Felicita Travel",
      url: "https://youtube.com/c/FelicitaTravel",
      description: "Travel guides and destination videos",
      bestFor: ["Video Tours", "Travel Guides", "Testimonials"],
      color: "text-red-600",
      bgColor: "bg-red-50",
      active: true
    },
    {
      id: 5,
      name: "TikTok",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.302-.002.603.058.89.18v-3.41a6.34 6.34 0 00-5.51 1.77 6.34 6.34 0 009.48 8.12 6.34 6.34 0 002.22-4.89v-7a8.16 8.16 0 004.39 1.27v-3.45a4.83 4.83 0 01-1.16-.12z"/>
        </svg>
      ),
      username: "@FelicitaTravel",
      url: "https://tiktok.com/@FelicitaTravel",
      description: "Short travel videos and tips",
      bestFor: ["Quick Tips", "Trending Destinations", "Fun Content"],
      color: "text-black",
      bgColor: "bg-gray-100",
      active: true
    },
    {
      id: 6,
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      username: "@FelicitaTravel",
      url: "https://twitter.com/FelicitaTravel",
      description: "Travel updates and customer service",
      bestFor: ["Customer Service", "Updates", "Travel News"],
      color: "text-blue-400",
      bgColor: "bg-blue-50",
      active: true
    },
    {
      id: 7,
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      username: "Felicita Travel",
      url: "https://linkedin.com/company/FelicitaTravel",
      description: "Professional travel services",
      bestFor: ["Business Travel", "Corporate Partnerships", "Industry News"],
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      active: true
    },
    {
      id: 8,
      name: "Messenger",
      icon: <MessageSquare className="w-6 h-6" />,
      username: "m.me/FelicitaTravel",
      url: "https://m.me/FelicitaTravel",
      description: "Facebook Messenger chat",
      bestFor: ["General Inquiries", "Customer Support", "Quick Chat"],
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      active: true
    }
  ];

  const quickContactOptions: QuickContactOption[] = [
    {
      id: 1,
      name: "Live Chat",
      icon: <MessageCircleIcon className="w-5 h-5" />,
      url: "#",
      description: "Chat with our travel experts",
      responseTime: "Usually replies in 5 minutes",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Video Call",
      icon: <Video className="w-5 h-5" />,
      url: "#",
      description: "Schedule a virtual consultation",
      responseTime: "By appointment",
      color: "from-blue-500 to-teal-500"
    },
    {
      id: 3,
      name: "Call Back",
      icon: <Phone className="w-5 h-5" />,
      url: "#",
      description: "Request a phone call",
      responseTime: "Within 2 hours",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Book Appointment",
      icon: <Calendar className="w-5 h-5" />,
      url: "#",
      description: "Schedule in-person meeting",
      responseTime: "24 hours notice",
      color: "from-orange-500 to-amber-500"
    }
  ];

  const handleSocialClick = (url: string, name: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Connect With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Follow us on social media for travel inspiration, or reach out through 
            your preferred communication channel.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Social Media Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Follow Our Journey
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialMediaChannels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => handleSocialClick(channel.url, channel.name)}
                className={`${channel.bgColor} rounded-2xl p-6 border border-gray-200 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${channel.color} bg-white/50 group-hover:bg-white transition-colors`}>
                    {channel.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${channel.color} bg-white/50`}>
                    {channel.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
                
                <div>
                  <h4 className={`text-lg font-bold mb-2 ${channel.color}`}>
                    {channel.name}
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    {channel.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="font-medium">Handle:</span>
                      <span className="font-mono">{channel.username}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {channel.bestFor.slice(0, 2).map((use, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-white/50 text-gray-700 rounded-full text-xs"
                        >
                          {use}
                        </span>
                      ))}
                      {channel.bestFor.length > 2 && (
                        <span className="px-2 py-1 bg-white/50 text-gray-500 rounded-full text-xs">
                          +{channel.bestFor.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Click to connect</span>
                    <svg 
                      className={`w-5 h-5 ${channel.color} transform group-hover:translate-x-1 transition-transform`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Quick Contact Options
              </h3>
              <p className="text-gray-600">
                Choose the most convenient way to get in touch with our team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickContactOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer"
                  onClick={() => option.url !== '#' && handleSocialClick(option.url, option.name)}
                >
                  <div className={`inline-flex p-3 bg-gradient-to-r ${option.color} rounded-lg mb-4`}>
                    <div className="text-white">
                      {option.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {option.name}
                  </h4>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {option.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{option.responseTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Direct Email */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Email Us Directly</h4>
                <p className="text-gray-600 text-sm">For detailed inquiries</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">General Inquiries</div>
                <div className="font-mono text-gray-800">info@felicita.com</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Bookings & Reservations</div>
                <div className="font-mono text-gray-800">bookings@felicita.com</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Support</div>
                <div className="font-mono text-gray-800">support@felicita.com</div>
              </div>
            </div>
            
            <button
              onClick={copyEmailToClipboard}
              className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
            >
              {copiedEmail ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy All Emails
                </>
              )}
            </button>
          </div>

          {/* Most Active Channels */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-6">Most Active Channels</h4>
            
            <div className="space-y-4">
              {socialMediaChannels
                .filter(channel => channel.active)
                .slice(0, 3)
                .map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => handleSocialClick(channel.url, channel.name)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${channel.bgColor}`}>
                        <div className={channel.color}>
                          {channel.icon}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{channel.name}</div>
                        <div className="text-sm text-gray-500">{channel.username}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        Live Now
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center text-gray-600 text-sm">
                Average response time: <span className="font-bold text-green-600">Under 2 hours</span>
              </div>
            </div>
          </div>

          {/* Contact Hours */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-bold text-gray-800 mb-6">Best Time to Contact</h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">WhatsApp</span>
                  <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">24/7</span>
                </div>
                <p className="text-sm text-gray-600">Instant responses at any time</p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">Phone & Email</span>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">9AM-6PM</span>
                </div>
                <p className="text-sm text-gray-600">Sri Lanka time (GMT+5:30)</p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">Social Media</span>
                  <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Always On</span>
                </div>
                <p className="text-sm text-gray-600">We check regularly throughout the day</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-blue-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  For urgent matters outside business hours, use WhatsApp or call our emergency line:
                </p>
                <a 
                  href="tel:+94771234567"
                  className="inline-block mt-2 text-lg font-bold text-red-600 hover:text-red-700"
                >
                  +94 77 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-6 bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto border border-gray-200">
            <div className="flex flex-wrap justify-center gap-4">
              {socialMediaChannels.slice(0, 5).map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl ${channel.bgColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className={channel.color}>
                    {channel.icon}
                  </div>
                </a>
              ))}
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Join Our Travel Community
              </h3>
              <p className="text-gray-600 max-w-2xl">
                Follow us on social media for daily travel inspiration, exclusive offers, 
                and real-time updates from beautiful destinations across Sri Lanka.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <a
                href="https://instagram.com/FelicitaTravel"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSocialMedia;