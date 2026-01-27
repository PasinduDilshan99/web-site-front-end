"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AirplaneScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth curve from top-left to bottom-right
  const getCurvePoint = (t: number) => {
    // Start from top-left corner (5, 5) slightly inset
    // Curve down and across to bottom-right corner (95, 780)
    const p0 = { x: 5, y: 5 };       // Start: slightly inset from top-left
    const p1 = { x: 40, y: 300 };    // Control point 1: curve down
    const p2 = { x: 60, y: 500 };    // Control point 2: continue across
    const p3 = { x: 95, y: 780 };    // End: slightly inset from bottom-right

    // Cubic Bezier formula
    const x = Math.pow(1 - t, 3) * p0.x +
              3 * Math.pow(1 - t, 2) * t * p1.x +
              3 * (1 - t) * Math.pow(t, 2) * p2.x +
              Math.pow(t, 3) * p3.x;

    const y = Math.pow(1 - t, 3) * p0.y +
              3 * Math.pow(1 - t, 2) * t * p1.y +
              3 * (1 - t) * Math.pow(t, 2) * p2.y +
              Math.pow(t, 3) * p3.y;

    return { x, y };
  };

  // Calculate airplane rotation based on the curve direction
  const getRotation = (t: number) => {
    // Sample points around t to calculate direction
    const t1 = Math.max(t - 0.01, 0);
    const t2 = Math.min(t + 0.01, 1);
    
    const point1 = getCurvePoint(t1);
    const point2 = getCurvePoint(t2);
    
    // Calculate angle between the two points
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    
    // Convert to degrees and adjust for airplane orientation
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Start with airplane pointing right (90 degrees initial rotation)
    return angle + 90;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const containerOffset = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      const progress = Math.min(
        Math.max(
          (scrollTop - containerOffset + windowHeight) / (containerHeight + windowHeight),
          0
        ),
        1
      );

      setScrollProgress(progress);

      // Update airplane position
      if (airplaneRef.current) {
        const { x, y } = getCurvePoint(progress);
        const rotation = getRotation(progress);
        
        // Add some parallax effect
        const parallaxY = y * 0.85;
        
        airplaneRef.current.style.transform = `
          translate(${x}vw, ${parallaxY}px) 
          rotate(${rotation}deg)
        `;
        
        // Fade in and out effect
        const opacity = Math.min(1, progress * 3) * Math.min(1, (1 - progress) * 3 + 0.3);
        airplaneRef.current.style.opacity = opacity.toString();
        
        // Scale effect - smaller at start and end
        const scale = 0.8 + Math.sin(progress * Math.PI) * 0.4;
        airplaneRef.current.style.transform += ` scale(${scale})`;
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Set initial position

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  // Content sections
  const sections = [
    { title: "Discover", color: "from-blue-50/0 to-white/0", icon: "🌍" },
    { title: "Explore", color: "from-white/0 to-blue-100/0", icon: "🧭" },
    { title: "Experience", color: "from-blue-100/0 to-sky-50/0", icon: "🎯" },
    { title: "Journey", color: "from-sky-50/0 to-blue-50/0", icon: "✈️" },
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[400vh] w-full overflow-hidden pointer-events-none"
      style={{ zIndex: 9999 }} // High z-index to stay above page content
    >
      {/* Airplane with Image */}
      <div
        ref={airplaneRef}
        className="fixed z-[10000] transition-all duration-150 ease-out pointer-events-none"
        style={{
          top: '0',
          left: '0',
          willChange: 'transform',
          width: '80px',
          height: '80px',
        }}
      >
        <div className="relative">
          {/* Airplane image rotated 90 degrees */}
          <div className="relative w-40 h-40">
            <Image
              src="/airplane.png"  // Update this path to your actual image location
              alt="Airplane"
              width={400}
              height={400}
              className="object-contain drop-shadow-lg"
              style={{
                transform: 'rotate(225deg)', // Initial 90-degree rotation
              }}
              priority
            />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 bg-blue-400/10 rounded-full blur-md -z-10"></div>
          
          {/* Contrails effect */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-blue-300/40 via-blue-200/30 to-transparent rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Minimal progress indicator */}
      <div className="fixed top-24 right-6 z-[10000] bg-white/10 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white/20">
        <div className="w-2 h-24 bg-gray-200/30 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 rounded-full transition-all duration-200"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Transparent content sections (just for airplane path) */}
      {sections.map((section, index) => {
        // Position content along the curve path
        const t = index * 0.25;
        
        return (
          <section
            key={index}
            className={`h-screen ${section.color} transition-all duration-700`}
            style={{
              opacity: 0.3 - Math.abs((index * 0.25) - scrollProgress) * 0.6,
            }}
          >
            {/* Section indicator (minimal) */}
            <div 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-6xl mb-4">{section.icon}</div>
                <div className="text-2xl font-semibold text-gray-700/50">{section.title}</div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Flying dots background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/10 rounded-full"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 400}vh`,
              animation: `fly ${4 + Math.random() * 6}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fly {
          0% {
            transform: translateX(-100px) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateX(100vw) translateY(-100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AirplaneScrollAnimation;