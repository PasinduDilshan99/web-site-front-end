"use client"
import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface CeoData {
  name: string;
  title: string;
  imageUrl: string | null;
  speech: string[];
}

const CeoSpeech: React.FC = () => {
  const [typingText, setTypingText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);

  // Sample CEO data - replace with your API data
  const ceoData: CeoData = {
    name: "Pasindu Dilshan",
    title: "Chief Executive Officer",
    imageUrl: "/images/users/user-1.jpg", // Replace with actual image URL from your API
    speech: [
      "Welcome to our journey of innovation and excellence. Since our founding, we have been committed to delivering exceptional experiences to our clients and creating meaningful opportunities for our team.",
      "Our vision extends beyond business success—we aim to make a lasting positive impact on the communities we serve. Through dedication, creativity, and unwavering integrity, we continue to push boundaries and set new standards in our industry.",
      "Together, we are building something truly remarkable."
    ]
  };

  const lastParagraph = ceoData.speech[ceoData.speech.length - 1];
  const fullText = lastParagraph;

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50); // Adjust speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, [fullText, isTyping]);

  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-purple-50 to-amber-50 py-4 sm:py-4 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Side - CEO Image */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Decorative background circles */}
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-400 to-amber-400 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              
              {/* Main image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px]">
                {ceoData.imageUrl ? (
                  <img
                    src={ceoData.imageUrl}
                    alt={ceoData.name}
                    className="w-full h-full rounded-3xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-amber-400 via-purple-500 to-purple-600 flex items-center justify-center text-white text-7xl sm:text-8xl md:text-9xl font-bold shadow-2xl transition-transform duration-500 group-hover:scale-105">
                    {getInitials(ceoData.name)}
                  </div>
                )}
                
                {/* Corner accent */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-600 to-amber-500 rounded-2xl opacity-80 -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute -top-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-400 to-purple-400 rounded-2xl opacity-60 -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              </div>

              {/* Name badge */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-4 text-center min-w-[280px] sm:min-w-[320px]">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{ceoData.name}</h3>
                <p className="text-amber-600 font-semibold text-sm sm:text-base">{ceoData.title}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Speech */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Quote icon */}
            <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-amber-100 rounded-2xl shadow-lg">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2">
                A Message from Our CEO
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"></div>
            </div>

            {/* Speech content */}
            <div className="space-y-5 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
              {ceoData.speech.slice(0, -1).map((paragraph, index) => (
                <p 
                  key={index}
                  className="opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
                >
                  {paragraph}
                </p>
              ))}
              
              {/* Typing animation for last paragraph */}
              <p className="font-semibold text-purple-800">
                {typingText}
                {isTyping && (
                  <span className="inline-block w-0.5 h-5 sm:h-6 bg-purple-600 ml-1 animate-blink"></span>
                )}
              </p>
            </div>

            {/* Signature */}
            <div className="pt-6">
              <div className="inline-block">
                <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-amber-600 mb-1">
                  {ceoData.name}
                </p>
                <p className="text-sm sm:text-base text-gray-500 italic">{ceoData.title}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default CeoSpeech;