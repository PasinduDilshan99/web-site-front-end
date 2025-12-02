"use client";

import React, { useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import useSound from "use-sound";

const DecemberSnowfall = () => {
  const [isDecember, setIsDecember] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [play, { stop }] = useSound("/sounds/christmas-jingle.mp3", {
    volume: 0.3,
    loop: true,
    interrupt: true,
    onplay: () => setIsPlaying(true),
    onstop: () => setIsPlaying(false),
    onpause: () => setIsPlaying(false),
    onend: () => setIsPlaying(false),
  });
  
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    setIsDecember(currentMonth === 12);
  }, []);
  
  // Auto-play when December starts
  useEffect(() => {
    if (isDecember) {
      const timer = setTimeout(() => {
        try {
          play();
        } catch (error) {
          console.log("Autoplay might be blocked. User interaction required.");
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isDecember, play]);
  
  const toggleSound = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  
  if (!isDecember) return null;
  
  return (
    <>
      <Snowfall
        color="#fff"
        snowflakeCount={127}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      
      {/* Enhanced Sound Controls */}
      <div 
        className="fixed bottom-4 right-4 z-[10000] pointer-events-auto"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={toggleSound}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
            aria-label={isPlaying ? "Pause Christmas music" : "Play Christmas music"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          
          {/* Volume indicator */}
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow">
            {isPlaying ? "Jingle Bells 🎄" : "Sound Off"}
          </div>
        </div>
      </div>
    </>
  );
};

export default DecemberSnowfall;