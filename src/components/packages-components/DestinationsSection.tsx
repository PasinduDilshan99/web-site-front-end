import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Destination, Activity } from "@/types/packages-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { ACTIVITIES_PAGE_PATH } from "@/utils/urls";

interface DestinationsSectionProps {
  destinations: Destination[];
}

/* ── Animated collapse/expand using max-height + opacity ─── */
const Collapsible = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) return;
    if (open) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(ref.current.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    }
  }, [open]);

  return (
    <div
      style={{
        height: height !== undefined ? `${height}px` : open ? "auto" : "0px",
        overflow: "hidden",
        transition:
          "height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
        opacity: open ? 1 : 0,
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
};

/* ── Activity card with subtle entrance stagger ─────────── */
const ActivityCard = ({
  activity,
  index,
  visible,
}: {
  activity: Activity;
  index: number;
  visible: boolean;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(
          `${ACTIVITIES_PAGE_PATH}/${activity.activityId}?name=${encodeURIComponent(activity.activityName)}`,
        );
      }}
      style={{
        transitionDelay: visible ? `${index * 60}ms` : "0ms",
        transform: visible ? "translateY(0)" : "translateY(10px)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
      }}
      className="cursor-pointer group flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 hover:bg-sky-50/40 transition-all duration-200 bg-white w-full text-left"
    >
      {/* Left: index number - responsive */}
      <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-xs sm:text-sm font-bold text-sky-500">
        {index + 1}
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0">
        {/* Activity name + category badge - responsive wrap */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          <h5 className="font-semibold text-slate-800 text-sm sm:text-base md:text-lg leading-snug truncate max-w-[200px] sm:max-w-full">
            {activity.activityName}
          </h5>
          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-100 rounded-full text-[10px] sm:text-xs font-medium flex-shrink-0">
            {activity.activitiesCategory}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-2 sm:mb-2.5">
          {activity.activityDescription}
        </p>

        {/* Chips row - responsive */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-2.5">
          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[10px] sm:text-xs font-medium">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {activity.durationHours}h
          </span>
          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-teal-50 text-teal-700 border border-teal-100 rounded-lg text-[10px] sm:text-xs font-medium">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            {activity.minParticipate}–{activity.maxParticipate}
          </span>
          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-violet-50 text-violet-700 border border-violet-100 rounded-lg text-[10px] sm:text-xs font-medium">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate max-w-[60px] sm:max-w-full">{activity.season}</span>
          </span>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-slate-400 pt-1.5 sm:pt-2 border-t border-slate-100">
          <svg
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="truncate">
            {activity.availableFrom} – {activity.availableTo}
          </span>
        </div>
      </div>
    </button>
  );
};

/* ── Main component ─────────────────────────────────────── */
const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  destinations,
}) => {
  const [expandedDestination, setExpandedDestination] = useState<number | null>(
    null,
  );
  const router = useRouter();

  const toggleDestination = (destinationId: number) => {
    setExpandedDestination(
      expandedDestination === destinationId ? null : destinationId,
    );
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-200 overflow-hidden w-full">
      {/* ── Header with responsive padding ── */}
      <div className="bg-gradient-to-r from-sky-600 to-teal-500 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-7">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-3">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Destinations & Activities
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">
              Explore every stop on your journey
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/20 text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-full self-start xs:self-auto">
            {destinations.length} {destinations.length === 1 ? "Stop" : "Stops"}
          </div>
        </div>
      </div>

      {/* ── Destination list ── */}
      <div className="divide-y divide-slate-100">
        {destinations.map((destination, destIdx) => {
          const isOpen = expandedDestination === destination.destinationId;

          return (
            <div
              key={destination.destinationId}
              className={`transition-colors duration-200 ${isOpen ? "bg-sky-50/40" : "bg-white"}`}
            >
              {/* ── Toggle row with responsive padding ── */}
              <button
                onClick={() => toggleDestination(destination.destinationId)}
                className={`cursor-pointer w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 text-left transition-colors duration-200 ${
                  isOpen ? "bg-sky-50" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
                  {/* Number badge - responsive */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                      isOpen
                        ? "bg-sky-600 text-white shadow-lg shadow-sky-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {destIdx + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-800 leading-snug truncate pr-2">
                        {destination.destinationName}
                      </h3>
                      
                      {/* Activity count - hidden on mobile, visible on sm+ */}
                      <div className="hidden sm:flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                        <span className="text-xs md:text-sm text-slate-400 font-medium whitespace-nowrap">
                          {destination.activities.length} activities
                        </span>
                        <span
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} text-slate-400`}
                        >
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed">
                      {destination.destinationDescription}
                    </p>

                    {/* Tags - responsive */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
                      <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 bg-sky-100 text-sky-700 rounded-full text-[10px] sm:text-xs font-medium">
                        {destination.categoryName}
                      </span>
                      <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 bg-teal-50 text-teal-700 rounded-full text-[10px] sm:text-xs font-medium">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        <span className="truncate max-w-[80px] sm:max-w-full">{destination.location}</span>
                      </span>
                      {/* Activity count - visible only on mobile */}
                      <span className="sm:hidden inline-flex items-center px-1.5 sm:px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] sm:text-xs font-medium">
                        {destination.activities.length} activities
                      </span>
                    </div>
                  </div>

                  {/* Chevron - visible only on mobile */}
                  <span
                    className={`sm:hidden flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} text-slate-400 mt-0.5`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </button>

              {/* ── Expanded panel with smooth height animation ── */}
              <Collapsible open={isOpen}>
                <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-7 space-y-4 sm:space-y-5 md:space-y-6 border-t border-slate-100 bg-white">
                  
                  {/* Gallery */}
                  {destination.images.length > 0 && (
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-700 mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-1.5 sm:gap-2">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Gallery</span>
                      </h4>
                      
                      {/* Responsive gallery grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                        {destination.images.map((image, imgIdx) => (
                          <div
                            key={image.imageId}
                            style={{
                              transitionDelay: isOpen
                                ? `${imgIdx * 50}ms`
                                : "0ms",
                              transform: isOpen ? "scale(1)" : "scale(0.97)",
                              opacity: isOpen ? 1 : 0,
                              transition:
                                "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
                            }}
                            className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 group cursor-pointer border border-slate-200 hover:border-sky-300 hover:shadow-md transition-shadow duration-300"
                          >
                            <Image
                              src={image.imageUrl || PLACE_HOLDER_IMAGE}
                              alt={
                                image.imageDescription ||
                                destination.destinationName
                              }
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              onError={(e) => {
                                e.currentTarget.src = "/images/placeholder.jpg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {destination.activities.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                        <h4 className="text-sm sm:text-base font-semibold text-slate-700 flex items-center gap-1.5 sm:gap-2">
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <span>Available Activities</span>
                        </h4>
                        <span className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                          {destination.activities.length} total
                        </span>
                      </div>

                      <div className="flex flex-col divide-y divide-slate-100 border border-slate-200 rounded-lg sm:rounded-xl overflow-hidden">
                        {destination.activities.map((activity, actIdx) => (
                          <ActivityCard
                            key={activity.activityId}
                            activity={activity}
                            index={actIdx}
                            visible={isOpen}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Collapsible>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DestinationsSection;