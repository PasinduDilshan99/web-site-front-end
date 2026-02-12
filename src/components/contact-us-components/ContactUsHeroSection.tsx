"use client";
import { HeroSectionService } from "@/services/heroSectionService";
import { ContactUsHeroData } from "@/types/hero-section-types";
import { COMPANY_EMERGENCY_CONTACT_NUMBER } from "@/utils/constant";
import React, { useState, useEffect } from "react";
import HeroSectionLoading from "../loading-components/HeroSectionLoading";

const ContactUsHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<ContactUsHeroData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: items, error } = await HeroSectionService.fetchContactUsHeroData();

        if (error) {
          setError(error);
        } else {
          setHeroData(items);
        }
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to load contact us content");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || heroData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroData.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroData.length) % heroData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getFallbackImage = (index: number) => {
    const fallbackImages = [
      "1551632811-561732d1e306", // Beach contact image
      "1556761175-5973dc0f32e7", // Office meeting
      "1517248135467-4c7edcad34c4", // Travel office
      "1521791136064-7986c2920216", // Customer service
    ];
    return `https://images.unsplash.com/photo-${
      fallbackImages[index % fallbackImages.length]
    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80`;
  };

  const handleButtonClick = (link?: string) => {
    if (link) {
      if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else if (link.startsWith('#')) {
        // Handle anchor links for in-page navigation
        const element = document.querySelector(link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = link;
      }
    }
  };

  if (loading) {
    return <HeroSectionLoading  text = "Loading contact us hero content..."/>
  }

  if (error || heroData.length === 0) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-blue-900 to-teal-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
            <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-blue-200 mb-6">
            {error || "No contact content available"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 mr-4"
            >
              Retry
            </button>
            <a
              href="tel:+94112345678"
              className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Call Us: +94 11 234 5678
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentSlideData = heroData[currentSlide];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-blue-900 to-teal-800">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {heroData.map((item, index) => (
          <div
            key={item.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 40, 85, 0.7), rgba(0, 60, 95, 0.7)), url('${
                  item.imageUrl || getFallbackImage(index)
                }')`,
              }}
              onError={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundImage = `linear-gradient(rgba(0, 40, 85, 0.7), rgba(0, 60, 95, 0.7)), url('${getFallbackImage(
                  index
                )}')`;
              }}
            />
          </div>
        ))}
      </div>

      {/* CENTERED Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 md:px-8 max-w-5xl w-full">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
              {currentSlideData.title || "Contact Us"}
              <span className="block text-2xl md:text-3xl font-semibold mt-3 text-blue-200">
                {currentSlideData.subtitle || "Your Journey Starts Here"}
              </span>
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-3xl mx-auto mb-8">
            <p className="text-md md:text-lg lg:text-xl  mb-6 text-gray-100 leading-relaxed">
              {currentSlideData.description || 
                "Get in touch with our travel experts to plan your perfect journey in Sri Lanka. We're just a message away."}
            </p>
            
            {(currentSlideData.primaryButtonText || currentSlideData.secondaryButtonText) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentSlideData.primaryButtonText && (
                  <button
                    onClick={() => handleButtonClick(currentSlideData.primaryButtonLink)}
                    className="text-sm md:text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {currentSlideData.primaryButtonText}
                  </button>
                )}
                {currentSlideData.secondaryButtonText && (
                  <button
                    onClick={() => handleButtonClick(currentSlideData.secondaryButtonLink)}
                    className="text-sm md:text-lg px-8 py-4 border-2 border-blue-300 text-white font-semibold rounded-full hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {currentSlideData.secondaryButtonText}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Contact Info - Centered */}
          <div className="hidden lg:flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Mon-Sat: 9AM-6PM</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Colombo, Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {heroData.length > 1 && (
        <div className="hidden md:flex">
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group border border-blue-300/30"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group border border-blue-300/30"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Slide Indicators */}
      {heroData.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-blue-400 scale-125 shadow-lg shadow-blue-500/50"
                  : "bg-white/50 hover:bg-blue-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {heroData.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / heroData.length) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Slide Counter */}
      {heroData.length > 1 && (
        <div className="absolute top-6 left-6 text-white/70 text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full border border-blue-300/30">
          {currentSlide + 1} / {heroData.length}
        </div>
      )}

      {/* Emergency Contact Badge */}
      <div className="hidden lg:flex absolute top-6 right-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 backdrop-blur-sm rounded-full border border-blue-400/30">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">
            <a href="tel:+94771234567" className="hover:text-blue-200 transition-colors">
              Emergency: {COMPANY_EMERGENCY_CONTACT_NUMBER}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactUsHeroSection;