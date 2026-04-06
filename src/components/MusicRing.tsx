"use client";

import React, { useState, useEffect } from "react";
import useSound from "use-sound";

const MusicRing: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Replace this URL with your actual audio file URL
  const audioUrl =
    "https://res.cloudinary.com/dkfonkmwr/raw/upload/v1775492267/csq7lhozsooevpgk7kz6.mp3";

  const [play, { stop, sound }] = useSound(audioUrl, {
    volume: 0.3,
    loop: true,
    interrupt: true,
    onplay: () => setIsPlaying(true),
    onstop: () => setIsPlaying(false),
    onpause: () => setIsPlaying(false),
    onend: () => setIsPlaying(false),
    onloaderror: (error: unknown) =>
      console.error("Failed to load audio:", error),
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isPlaying) {
        stop();
      }
    };
  }, [stop, isPlaying]);

  const toggleSound = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  // Prevent drag events from bubbling up to parent draggable components
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <style>{`
        @keyframes ripple-green {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
        @keyframes ripple-red {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes pulse-red {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .ripple-green-1 { animation: ripple-green 2.4s infinite ease-out; }
        .ripple-green-2 { animation: ripple-green 2.4s infinite ease-out 0.8s; }
        .ripple-green-3 { animation: ripple-green 2.4s infinite ease-out 1.6s; }
        .ripple-red-1 { animation: ripple-red 3s infinite ease-out; }
        .ripple-red-2 { animation: ripple-red 3s infinite ease-out 1s; }
        .pulse-red { animation: pulse-red 2s infinite; }
      `}</style>

      <div
        className="fixed bottom-1 left-1 z-[10000]"
        onPointerDown={handlePointerDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="relative"
            style={{
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Green ripple when playing */}
            {isPlaying && (
              <>
                <div
                  className="ripple-green-1"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0.8)",
                    borderRadius: "9999px",
                    border: "1.5px solid rgba(74, 222, 128, 0.7)",
                    width: "40px",
                    height: "40px",
                  }}
                />
                <div
                  className="ripple-green-2"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0.8)",
                    borderRadius: "9999px",
                    border: "1.5px solid rgba(74, 222, 128, 0.5)",
                    width: "40px",
                    height: "40px",
                  }}
                />
                <div
                  className="ripple-green-3"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0.8)",
                    borderRadius: "9999px",
                    border: "1.5px solid rgba(74, 222, 128, 0.3)",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </>
            )}

            {/* Red ripple when not playing */}
            {!isPlaying && (
              <>
                <div
                  className="ripple-red-1"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0.9)",
                    borderRadius: "9999px",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    width: "40px",
                    height: "40px",
                  }}
                />
                <div
                  className="ripple-red-2"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0.9)",
                    borderRadius: "9999px",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </>
            )}

            {/* Hover tooltip */}
            {isHovering && (
              <div
                style={{
                  position: "absolute",
                  top: "70px",
                  left: "0px",
                  whiteSpace: "nowrap",
                  backgroundColor: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  color: "#1f2937",
                  fontSize: "11px",
                  padding: "6px 10px",
                  borderRadius: "16px",
                  fontWeight: "600",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  zIndex: 20,
                  pointerEvents: "none",
                  minWidth: "140px",
                  textAlign: "center",
                }}
              >
                {isPlaying
                  ? "🎵 Click to stop music"
                  : "🔇 Click to play music"}
              </div>
            )}

            {/* Clickable circle */}
            <button
              onClick={toggleSound}
              onPointerDown={handlePointerDown}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{
                position: "relative",
                borderRadius: "9999px",
                width: isPlaying ? "32px" : "36px",
                height: isPlaying ? "32px" : "36px",
                backgroundColor: isPlaying
                  ? "rgba(74, 222, 128, 0.95)"
                  : "rgba(239, 68, 68, 0.9)",
                border: isPlaying
                  ? "2px solid rgba(74, 222, 128, 1)"
                  : "2px solid rgba(239, 68, 68, 1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                boxShadow: isHovering
                  ? isPlaying
                    ? "0 0 0 4px rgba(74, 222, 128, 0.3)"
                    : "0 0 0 4px rgba(239, 68, 68, 0.3)"
                  : isPlaying
                    ? "0 4px 12px rgba(34, 197, 94, 0.3)"
                    : "0 4px 12px rgba(239, 68, 68, 0.3)",
                transform: isHovering ? "scale(1.15)" : "scale(1)",
                outline: "none",
                animation: !isPlaying ? "pulse-red 2s infinite" : "none",
              }}
              aria-label={
                isPlaying ? "Stop Christmas music" : "Play Christmas music"
              }
            >
              <div
                style={{
                  width: isPlaying ? "10px" : "14px",
                  height: isPlaying ? "10px" : "14px",
                  borderRadius: "9999px",
                  backgroundColor: isPlaying
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.95)",
                  transition: "all 0.3s ease",
                  boxShadow: isPlaying
                    ? "0 2px 4px rgba(34,197,94,0.3)"
                    : "0 2px 4px rgba(239,68,68,0.3)",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicRing;
