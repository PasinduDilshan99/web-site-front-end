"use client";

import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { EmployeeService } from "@/services/employeeService";
import CeoSpeechLoading from "./CeoSpeechLoading";

interface CeoData {
  name: string;
  title: string;
  imageUrl: string | null;
  speech: string[];
}

const CeoSpeech: React.FC = () => {
  const [ceoData, setCeoData] = useState<CeoData | null>(null);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCeo = async () => {
      setLoading(true);

      const { data, error } = await EmployeeService.getCeoDetails();

      if (error) {
        setError(error);
      } else if (data) {
        setCeoData(data);
      }

      setLoading(false);
    };

    fetchCeo();
  }, []);

  useEffect(() => {
    if (!ceoData || !isTyping) return;

    const lastParagraph = ceoData.speech[ceoData.speech.length - 1] || "";

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= lastParagraph.length) {
        setTypingText(lastParagraph.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [ceoData, isTyping]);

  if (loading) {
    return <CeoSpeechLoading />;
  }

  if (error || !ceoData) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load CEO message
      </div>
    );
  }

  const getInitials = (name: string): string =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  // If no image, render a different layout without the image column
  if (!ceoData.imageUrl) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-6 md:py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl">
              <Quote className="w-8 h-8 text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-2">
                A Message from Our CEO
              </h2>

              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"></div>
            </div>

            <div className="space-y-4 text-gray-700 text-base md:text-lg lg:text-xl">
              {ceoData.speech.slice(0, -1).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <p className="font-semibold text-blue-800">
                {typingText}

                {isTyping && (
                  <span className="inline-block w-0.5 h-5 bg-blue-600 ml-1 animate-pulse"></span>
                )}
              </p>
            </div>

            <div className="pt-6">
              <p className="text-2xl font-bold text-blue-700">{ceoData.name}</p>
              <p className="text-gray-500 italic">{ceoData.title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original layout with image
  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-6 md:py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT IMAGE */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-20 blur-2xl"></div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
                <img
                  src={ceoData.imageUrl}
                  alt={ceoData.name}
                  className="w-full h-full rounded-3xl object-cover shadow-2xl"
                />
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-4 text-center min-w-[260px] border border-blue-100">
                <h3 className="text-xl font-bold text-slate-800">
                  {ceoData.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm">
                  {ceoData.title}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SPEECH */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl">
              <Quote className="w-8 h-8 text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-2">
                A Message from Our CEO
              </h2>

              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"></div>
            </div>

            <div className="space-y-4 text-gray-700 text-base md:text-lg lg:text-xl">
              {ceoData.speech.slice(0, -1).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <p className="font-semibold text-blue-800">
                {typingText}

                {isTyping && (
                  <span className="inline-block w-0.5 h-5 bg-blue-600 ml-1 animate-pulse"></span>
                )}
              </p>
            </div>

            <div className="pt-6">
              <p className="text-2xl font-bold text-blue-700">{ceoData.name}</p>
              <p className="text-gray-500 italic">{ceoData.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoSpeech;