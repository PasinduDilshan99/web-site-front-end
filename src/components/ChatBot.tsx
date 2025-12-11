// components/ChatBot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Bot, User, Minimize2, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

interface Option {
  id: number;
  text: string;
  nextQuestion?: string;
  action?: () => void;
}

interface UserInfo {
  name: string;
  email: string;
  mobile: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const travelOptions: Record<string, { question: string; options: Option[] }> = {
  initial: {
    question: `${getGreeting()}! I'm your travel assistant. To provide you personalized assistance, could you please share your details?`,
    options: []
  },
  userInfo: {
    question: "Please fill in your details:",
    options: []
  },
  mainMenu: {
    question: "How can I assist you today?",
    options: [
      { id: 1, text: "Book a trip or holiday package", nextQuestion: "booking" },
      { id: 2, text: "Check travel deals & offers", nextQuestion: "deals" },
      { id: 3, text: "Get destination recommendations", nextQuestion: "recommendations" },
      { id: 4, text: "Contact travel agent", nextQuestion: "contactAgent" }
    ]
  },
  booking: {
    question: "Great! What type of trip are you looking for?",
    options: [
      { id: 1, text: "Beach & Resort holidays", nextQuestion: "beachDetails" },
      { id: 2, text: "Mountain & Adventure trips", nextQuestion: "mountainDetails" },
      { id: 3, text: "City tours & Shopping", nextQuestion: "cityDetails" },
      { id: 4, text: "Contact travel agent for booking", nextQuestion: "contactAgent" }
    ]
  },
  beachDetails: {
    question: "Perfect! Beach holidays available. Would you like details about:",
    options: [
      { id: 1, text: "Maldives packages", action: () => window.location.href = "/packages/maldives" },
      { id: 2, text: "Bali vacation deals", action: () => window.location.href = "/packages/bali" },
      { id: 3, text: "Thailand island hopping", action: () => window.location.href = "/packages/thailand" },
      { id: 4, text: "Contact agent for beach holidays", nextQuestion: "contactAgent" }
    ]
  },
  mountainDetails: {
    question: "Adventure awaits! Which mountain destination interests you?",
    options: [
      { id: 1, text: "Swiss Alps trekking", action: () => window.location.href = "/packages/swiss-alps" },
      { id: 2, text: "Himalayan expeditions", action: () => window.location.href = "/packages/himalayas" },
      { id: 3, text: "New Zealand adventure", action: () => window.location.href = "/packages/new-zealand" },
      { id: 4, text: "Contact agent for adventure trips", nextQuestion: "contactAgent" }
    ]
  },
  cityDetails: {
    question: "City tours available! Choose your preferred destination:",
    options: [
      { id: 1, text: "European city tours", action: () => window.location.href = "/packages/europe" },
      { id: 2, text: "Asian metropolis tours", action: () => window.location.href = "/packages/asia" },
      { id: 3, text: "USA & Canada cities", action: () => window.location.href = "/packages/usa-canada" },
      { id: 4, text: "Contact agent for city tours", nextQuestion: "contactAgent" }
    ]
  },
  deals: {
    question: "Here are our current travel deals:",
    options: [
      { id: 1, text: "Last minute offers (50% off)", action: () => window.location.href = "/deals/last-minute" },
      { id: 2, text: "Early bird discounts", action: () => window.location.href = "/deals/early-bird" },
      { id: 3, text: "Group travel discounts", action: () => window.location.href = "/deals/group" },
      { id: 4, text: "Contact agent for best deals", nextQuestion: "contactAgent" }
    ]
  },
  recommendations: {
    question: "Based on popular choices, I recommend:",
    options: [
      { id: 1, text: "Romantic getaways", nextQuestion: "romanticDetails" },
      { id: 2, text: "Family vacation spots", nextQuestion: "familyDetails" },
      { id: 3, text: "Solo travel destinations", nextQuestion: "soloDetails" },
      { id: 4, text: "Contact agent for recommendations", nextQuestion: "contactAgent" }
    ]
  },
  romanticDetails: {
    question: "Perfect for couples! Which romantic destination?",
    options: [
      { id: 1, text: "Paris & Venice", action: () => window.location.href = "/romantic/paris-venice" },
      { id: 2, text: "Maldives overwater villas", action: () => window.location.href = "/romantic/maldives" },
      { id: 3, text: "Greek islands cruise", action: () => window.location.href = "/romantic/greece" },
      { id: 4, text: "Contact agent for romantic trips", nextQuestion: "contactAgent" }
    ]
  },
  familyDetails: {
    question: "Family-friendly destinations:",
    options: [
      { id: 1, text: "Disney World packages", action: () => window.location.href = "/family/disney" },
      { id: 2, text: "Bali family resorts", action: () => window.location.href = "/family/bali" },
      { id: 3, text: "Japan family tour", action: () => window.location.href = "/family/japan" },
      { id: 4, text: "Contact agent for family trips", nextQuestion: "contactAgent" }
    ]
  },
  soloDetails: {
    question: "Great for solo travelers:",
    options: [
      { id: 1, text: "Backpacking Southeast Asia", action: () => window.location.href = "/solo/se-asia" },
      { id: 2, text: "Europe solo tour", action: () => window.location.href = "/solo/europe" },
      { id: 3, text: "Australia adventure", action: () => window.location.href = "/solo/australia" },
      { id: 4, text: "Contact agent for solo travel", nextQuestion: "contactAgent" }
    ]
  },
  contactAgent: {
    question: "I'll connect you with a travel expert. How would you prefer to communicate?",
    options: [
      { id: 1, text: "Call me on my mobile", action: () => window.open('tel:+1234567890') },
      { id: 2, text: "Email me the details", action: () => window.location.href = "mailto:info@travelagency.com" },
      { id: 3, text: "WhatsApp conversation", action: () => window.open('https://wa.me/1234567890') },
      { id: 4, text: "Visit office for discussion", action: () => window.location.href = "/contact/locations" }
    ]
  },
  visaInfo: {
    question: "Visa assistance available for:",
    options: [
      { id: 1, text: "Schengen visa Europe", action: () => window.location.href = "/visa/schengen" },
      { id: 2, text: "USA visa process", action: () => window.location.href = "/visa/usa" },
      { id: 3, text: "UK visa guidance", action: () => window.location.href = "/visa/uk" },
      { id: 4, text: "Contact visa expert", nextQuestion: "contactAgent" }
    ]
  },
  flights: {
    question: "Flight booking options:",
    options: [
      { id: 1, text: "Search international flights", action: () => window.location.href = "/flights/international" },
      { id: 2, text: "Domestic flight deals", action: () => window.location.href = "/flights/domestic" },
      { id: 3, text: "Business class offers", action: () => window.location.href = "/flights/business" },
      { id: 4, text: "Contact flight agent", nextQuestion: "contactAgent" }
    ]
  },
  hotels: {
    question: "Hotel booking assistance:",
    options: [
      { id: 1, text: "Luxury 5-star hotels", action: () => window.location.href = "/hotels/luxury" },
      { id: 2, text: "Budget accommodations", action: () => window.location.href = "/hotels/budget" },
      { id: 3, text: "Resorts & Villas", action: () => window.location.href = "/hotels/resorts" },
      { id: 4, text: "Contact hotel specialist", nextQuestion: "contactAgent" }
    ]
  }
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: travelOptions.initial.question, sender: 'bot' }
  ]);
  const [currentStep, setCurrentStep] = useState<string>('initial');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    mobile: ''
  });
  const [infoStep, setInfoStep] = useState<'name' | 'email' | 'mobile'>('name');
  const [isInfoComplete, setIsInfoComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const validateInfo = () => {
    return userInfo.name.trim() !== '' && userInfo.mobile.trim() !== '';
  };

  const handleContinue = () => {
    if (!validateInfo()) {
      alert('Please provide at least your name and mobile number');
      return;
    }

    // Add user info summary to chat
    const infoMessage = `Name: ${userInfo.name}\nEmail: ${userInfo.email || 'Not provided'}\nMobile: ${userInfo.mobile}`;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: infoMessage,
      sender: 'user'
    };

    const botMessage: Message = {
      id: messages.length + 2,
      text: `Thank you, ${userInfo.name}! ${travelOptions.mainMenu.question}`,
      sender: 'bot'
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setCurrentStep('mainMenu');
    setIsInfoComplete(true);
  };

  const handleOptionClick = (option: Option) => {
    // Add user's choice to messages
    const userMessage: Message = {
      id: messages.length + 1,
      text: option.text,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Handle option action
    if (option.action) {
      setTimeout(() => option.action!(), 300);
      return;
    }

    // Move to next question if specified
    if (option.nextQuestion && travelOptions[option.nextQuestion]) {
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: travelOptions[option.nextQuestion!].question,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
        setCurrentStep(option.nextQuestion!);
      }, 500);
    }
  };

  const handleInfoSubmit = (value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [infoStep]: value
    }));

    // Move to next step or complete
    if (infoStep === 'name') {
      setInfoStep('email');
      const botMessage: Message = {
        id: messages.length + 1,
        text: "Great! What's your email address? (Optional)",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    } else if (infoStep === 'email') {
      setInfoStep('mobile');
      const botMessage: Message = {
        id: messages.length + 1,
        text: "Please provide your mobile number:",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    } else if (infoStep === 'mobile') {
      handleContinue();
    }
  };

  const resetChat = () => {
    setMessages([{ id: 1, text: travelOptions.initial.question, sender: 'bot' }]);
    setCurrentStep('initial');
    setUserInfo({ name: '', email: '', mobile: '' });
    setInfoStep('name');
    setIsInfoComplete(false);
  };

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsMinimized(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const getInfoPrompt = () => {
    switch (infoStep) {
      case 'name':
        return "What's your name?";
      case 'email':
        return "What's your email address? (Optional)";
      case 'mobile':
        return "Please provide your mobile number:";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-50
          ${!isOpen ? 'animate-bounce-once hover:scale-110' : 'scale-100 hover:scale-105'}
        `}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        style={{
          boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
          animation: !isOpen ? 'bounceOnce 2s infinite' : 'none'
        }}
      >
        {!isOpen ? (
          <MessageSquare size={28} />
        ) : (
          <X size={28} />
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden
        transition-all duration-300 ease-out
        ${isOpen && !isMinimized ? 
          'opacity-100 scale-100 translate-y-0' : 
          isOpen && isMinimized ?
          'opacity-0 scale-95 -translate-y-4' :
          'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bot className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold">Travel Assistant</h3>
              <p className="text-sm text-blue-100">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetChat}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Reset chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={handleMinimize}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 size={20} />
            </button>
            <button
              onClick={handleToggle}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-blue-50 max-h-96">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 whitespace-pre-line ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'bot' ? (
                      <Bot size={16} className="text-blue-500" />
                    ) : (
                      <User size={16} className="text-white" />
                    )}
                    <span className="text-xs font-medium">
                      {message.sender === 'bot' ? 'Travel Assistant' : 'You'}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Info Collection Form (if not completed) */}
            {!isInfoComplete && currentStep === 'initial' && (
              <div className="space-y-4 mt-4">
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl p-3 bg-white border border-gray-200 rounded-bl-none">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} className="text-blue-500" />
                      <span className="text-xs font-medium">Travel Assistant</span>
                    </div>
                    <p className="text-sm mb-2">{getInfoPrompt()}</p>
                    <input
                      type={infoStep === 'email' ? 'email' : infoStep === 'mobile' ? 'tel' : 'text'}
                      placeholder={
                        infoStep === 'name' ? 'Your name' :
                        infoStep === 'email' ? 'your.email@example.com' :
                        '+1234567890'
                      }
                      value={userInfo[infoStep]}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, [infoStep]: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleInfoSubmit(userInfo[infoStep])}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {infoStep === 'mobile' ? 'Required' : infoStep === 'name' ? 'Required' : 'Optional'}
                      </span>
                      <button
                        onClick={() => handleInfoSubmit(userInfo[infoStep])}
                        disabled={infoStep === 'name' && !userInfo.name.trim() || infoStep === 'mobile' && !userInfo.mobile.trim()}
                        className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                      >
                        {infoStep === 'mobile' ? 'Continue →' : 'Next'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Options (only show if not in info collection) */}
        {isInfoComplete && travelOptions[currentStep].options.length > 0 && (
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {travelOptions[currentStep].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="p-3 text-sm text-blue-300 text-left bg-gray-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-sm"
                >
                  {option.text}
                </button>
              ))}
            </div>
            
            {/* Quick Access Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => handleOptionClick(travelOptions.flights.options[0])}
                className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
              >
                ✈️ Flights
              </button>
              <button
                onClick={() => handleOptionClick(travelOptions.hotels.options[0])}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 transition-colors"
              >
                🏨 Hotels
              </button>
              <button
                onClick={() => handleOptionClick(travelOptions.visaInfo.options[0])}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
              >
                📋 Visa Info
              </button>
              <button
                onClick={() => handleOptionClick(travelOptions.contactAgent.options[0])}
                className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
              >
                📞 Call Agent
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-xs text-gray-500">
                Powered by Travel Agency Assistant • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • User: {userInfo.name}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes bounceOnce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-once {
          animation: bounceOnce 2s ease-in-out infinite;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
}