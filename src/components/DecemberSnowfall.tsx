"use client";

import React, { useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import useSound from "use-sound";

const DecemberSnowfall = () => {
  const [isDecember, setIsDecember] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
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
      
      <style>{`
        @keyframes ripple-green {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }
        @keyframes ripple-red {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes pulse-red {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
        .ripple-green-1 {
          animation: ripple-green 2.4s infinite ease-out;
        }
        .ripple-green-2 {
          animation: ripple-green 2.4s infinite ease-out 0.8s;
        }
        .ripple-green-3 {
          animation: ripple-green 2.4s infinite ease-out 1.6s;
        }
        .ripple-red-1 {
          animation: ripple-red 3s infinite ease-out;
        }
        .ripple-red-2 {
          animation: ripple-red 3s infinite ease-out 1s;
        }
        .pulse-red {
          animation: pulse-red 2s infinite;
        }
      `}</style>
      
      <div 
        className="fixed bottom-4 right-4 z-[10000] pointer-events-auto"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex flex-col items-center gap-2">
          <div 
            className="relative"
            style={{ 
              width: '80px', 
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Green water drop ripple circles - when playing */}
            {isPlaying && (
              <>
                <div 
                  className="ripple-green-1"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.8)',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(74, 222, 128, 0.7)',
                    width: '40px',
                    height: '40px',
                  }}
                ></div>
                <div 
                  className="ripple-green-2"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.8)',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(74, 222, 128, 0.5)',
                    width: '40px',
                    height: '40px',
                  }}
                ></div>
                <div 
                  className="ripple-green-3"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.8)',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(74, 222, 128, 0.3)',
                    width: '40px',
                    height: '40px',
                  }}
                ></div>
              </>
            )}
            
            {/* Red subtle ripple circles - when NOT playing */}
            {!isPlaying && (
              <>
                <div 
                  className="ripple-red-1"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.9)',
                    borderRadius: '9999px',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    width: '40px',
                    height: '40px',
                  }}
                ></div>
                <div 
                  className="ripple-red-2"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.9)',
                    borderRadius: '9999px',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    width: '40px',
                    height: '40px',
                  }}
                ></div>
              </>
            )}
            
            {/* Hover status text - positioned lower and to the left */}
            {isHovering && (
              <div 
                style={{
                  position: 'absolute',
                  top: '70px',  // Lower position
                  left: '0px',  // More to the left
                  transform: 'translateX(0)',
                  whiteSpace: 'nowrap',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  color: '#1f2937',
                  fontSize: '11px',
                  padding: '6px 10px',
                  borderRadius: '16px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  zIndex: 20,
                  pointerEvents: 'none',
                  minWidth: '140px',
                  textAlign: 'center'
                }}
              >
                {isPlaying ? '🎵 Click to stop music' : '🔇 Click to play music'}
              </div>
            )}
            
            {/* Clickable circle - always visible */}
            <button
              onClick={toggleSound}
              style={{
                position: 'relative',
                borderRadius: '9999px',
                width: isPlaying ? '32px' : '36px',
                height: isPlaying ? '32px' : '36px',
                backgroundColor: isPlaying 
                  ? 'rgba(74, 222, 128, 0.95)' 
                  : 'rgba(239, 68, 68, 0.9)',
                border: isPlaying 
                  ? '2px solid rgba(74, 222, 128, 1)' 
                  : '2px solid rgba(239, 68, 68, 1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                boxShadow: isHovering 
                  ? (isPlaying 
                    ? '0 0 0 4px rgba(74, 222, 128, 0.3)' 
                    : '0 0 0 4px rgba(239, 68, 68, 0.3)'
                  ) 
                  : (isPlaying 
                    ? '0 4px 12px rgba(34, 197, 94, 0.3)' 
                    : '0 4px 12px rgba(239, 68, 68, 0.3)'
                  ),
                transform: isHovering ? 'scale(1.15)' : 'scale(1)',
                outline: 'none',
                animation: !isPlaying ? 'pulse-red 2s infinite' : 'none'
              }}
              aria-label={isPlaying ? "Stop Christmas music" : "Play Christmas music"}
            >
              {/* Minimal dot indicator */}
              <div 
                style={{
                  width: isPlaying ? '10px' : '14px',
                  height: isPlaying ? '10px' : '14px',
                  borderRadius: '9999px',
                  backgroundColor: isPlaying ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
                  transition: 'all 0.3s ease',
                  boxShadow: isPlaying 
                    ? '0 2px 4px rgba(34, 197, 94, 0.3)' 
                    : '0 2px 4px rgba(239, 68, 68, 0.3)'
                }}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DecemberSnowfall;