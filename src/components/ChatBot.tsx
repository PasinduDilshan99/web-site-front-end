// components/ChatBot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Bot, User, Minimize2 } from 'lucide-react';

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

const travelOptions: Record<string, { question: string; options: Option[] }> = {
  initial: {
    question: "Hi! Good morning! How can I assist you today?",
    options: [
      { id: 1, text: "I want to book a trip", nextQuestion: "booking" },
      { id: 2, text: "Check available packages", nextQuestion: "packages" },
      { id: 3, text: "Get travel recommendations", nextQuestion: "recommendations" },
      { id: 4, text: "Contact customer support", nextQuestion: "contact" }
    ]
  },
  booking: {
    question: "Great! What type of trip are you interested in?",
    options: [
      { id: 1, text: "Beach vacation", action: () => window.location.href = "/packages/beach" },
      { id: 2, text: "Mountain trekking", action: () => window.location.href = "/packages/mountain" },
      { id: 3, text: "City tour", action: () => window.location.href = "/packages/city" },
      { id: 4, text: "Cultural experience", action: () => window.location.href = "/packages/cultural" }
    ]
  },
  packages: {
    question: "Here are our package categories:",
    options: [
      { id: 1, text: "Budget friendly", action: () => window.location.href = "/packages/budget" },
      { id: 2, text: "Luxury travel", action: () => window.location.href = "/packages/luxury" },
      { id: 3, text: "Family packages", action: () => window.location.href = "/packages/family" },
      { id: 4, text: "Adventure trips", action: () => window.location.href = "/packages/adventure" }
    ]
  },
  recommendations: {
    question: "What type of experience are you looking for?",
    options: [
      { id: 1, text: "Relaxing getaway", action: () => window.location.href = "/recommendations/relaxing" },
      { id: 2, text: "Adventure & thrill", action: () => window.location.href = "/recommendations/adventure" },
      { id: 3, text: "Romantic escape", action: () => window.location.href = "/recommendations/romantic" },
      { id: 4, text: "Cultural immersion", action: () => window.location.href = "/recommendations/cultural" }
    ]
  },
  contact: {
    question: "How would you like to contact us?",
    options: [
      { id: 1, text: "Call us directly", action: () => window.open('tel:+1234567890') },
      { id: 2, text: "Send an email", action: () => window.location.href = "mailto:info@travelagency.com" },
      { id: 3, text: "Live chat with agent", action: () => window.location.href = "/contact/live-chat" },
      { id: 4, text: "Visit our office", action: () => window.location.href = "/contact/locations" }
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

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

  const resetChat = () => {
    setMessages([{ id: 1, text: travelOptions.initial.question, sender: 'bot' }]);
    setCurrentStep('initial');
  };

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else if (isMinimized) {
      setIsMinimized(false);
    } else {
      // Minimize animation
      setIsMinimized(true);
      // Close completely after minimize animation
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

  return (
    <>
      {/* Chat Button - Changes icon based on state */}
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
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-blue-50 max-h-80">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 ${
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
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Options */}
        <div className="p-4 border-t bg-white rounded-b-2xl">
          <div className="grid grid-cols-2 gap-2">
            {travelOptions[currentStep].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="p-3 text-sm text-blue-300 text-left bg-gray-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-transparent rounded-xl transition-all duration-200"
              >
                {option.text}
              </button>
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-4 pt-4 border-t text-center">
            <p className="text-xs text-gray-500">
              Powered by Travel Agency Assistant • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
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

        /* Custom scrollbar */
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