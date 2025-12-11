"use client";
import React, { useState, useEffect, useRef } from 'react';

interface StatisticsData {
  id: number;
  name: string;
  imageUrl: string;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  value: number;
  statusName: string;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
  terminatedAt: string | null;
  terminatedByName: string | null;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: StatisticsData[];
  timestamp: string;
}

const AboutUsStatistics = () => {
  const [statistics, setStatistics] = useState<StatisticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animatedValues, setAnimatedValues] = useState<{ [key: number]: number }>({});
  const countersRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // Format value with appropriate suffix
  const formatValue = (name: string, value: number): string => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('destinations') || 
        lowerName.includes('tours') || 
        lowerName.includes('bookings') || 
        lowerName.includes('employees') || 
        lowerName.includes('partners') ||
        lowerName.includes('awards')) {
      return value.toString() + '+';
    } else if (lowerName.includes('years')) {
      return value.toString() + '+ Years';
    } else if (lowerName.includes('completed')) {
      return value.toString() + ' Tours';
    } else {
      return value.toString();
    }
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8080/felicita/api/v0/statistics/about-us', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();

        if (apiResponse.code === 200 && apiResponse.data) {
          // Filter only ACTIVE statistics
          const activeStats = apiResponse.data.filter(item => 
            item.statusName === 'ACTIVE'
          );
          
          // Initialize animated values starting from 0
          const initialAnimatedValues: { [key: number]: number } = {};
          activeStats.forEach(stat => {
            initialAnimatedValues[stat.id] = 0;
          });
          setAnimatedValues(initialAnimatedValues);
          
          setStatistics(activeStats);
        } else {
          setError(apiResponse.message || "Failed to fetch statistics");
        }
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError(err instanceof Error ? err.message : "Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Animation effect - FIXED VERSION
  useEffect(() => {
    if (statistics.length === 0 || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            
            // Animate each counter with optimized timing
            statistics.forEach((stat) => {
              const startValue = 0;
              const endValue = stat.value;
              const duration = 1500; // Reduced from 2000ms to 1500ms
              
              // Use requestAnimationFrame for smoother animation
              let startTime: number | null = null;
              
              const animateCounter = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuad = (t: number) => t * (2 - t);
                const easedProgress = easeOutQuad(progress);
                
                const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
                
                setAnimatedValues(prev => ({
                  ...prev,
                  [stat.id]: currentValue
                }));

                if (progress < 1) {
                  requestAnimationFrame(animateCounter);
                }
              };

              requestAnimationFrame(animateCounter);
            });
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of component is visible
        rootMargin: '0px 0px -50px 0px' // Reduced offset
      }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current);
      }
    };
  }, [statistics]);

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center animate-pulse w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)] max-w-[180px]">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div className="h-8 bg-gray-200 rounded mb-2 mx-auto w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-1 mx-auto w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded mx-auto w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div 
      ref={countersRef} 
      className="py-16 px-4 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="mx-auto">
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {statistics.map((stat) => {
            const animatedValue = animatedValues[stat.id] || 0;
            const displayValue = formatValue(stat.name, animatedValue);
            const finalValue = formatValue(stat.name, stat.value);
            
            return (
              <div
                key={stat.id}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)] max-w-[300px]"
                style={{
                  borderTop: `4px solid ${stat.color}`,
                }}
              >
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    color: stat.color,
                  }}
                >
                  {stat.imageUrl ? (
                    <img 
                      src={stat.imageUrl} 
                      alt={stat.name}
                      className="w-6 h-6"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallbackIcon = document.createElement('div');
                        fallbackIcon.className = 'w-6 h-6 bg-current rounded-full';
                        target.parentNode?.appendChild(fallbackIcon);
                      }}
                    />
                  ) : (
                    <div className="w-6 h-6 bg-current rounded-full"></div>
                  )}
                </div>

                {/* Animated Counter */}
                <div className="mb-2">
                  <span 
                    className="text-3xl font-bold transition-all duration-300"
                    style={{ color: stat.color }}
                  >
                    {displayValue}
                  </span>
                  {animatedValue < stat.value && (
                    <span className="text-xs ml-1 text-gray-400 animate-pulse">
                      ↗
                    </span>
                  )}
                </div>

                {/* Title */}
                <div 
                  className="font-semibold mb-1 transition-colors duration-300 group-hover:text-gray-900"
                  style={{ color: stat.color }}
                >
                  {stat.title}
                </div>

                {/* Description */}
                {stat.description && (
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {stat.description}
                  </div>
                )}

                {/* Progress indicator */}
                <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(animatedValue / stat.value) * 100}%`,
                      backgroundColor: stat.hoverColor || stat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUsStatistics;