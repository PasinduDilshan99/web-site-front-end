"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import { SeasonDetails, SeasonImage } from "@/types/season-types";
import { SeasonService } from "@/services/seasonService";
import SeasonDetailsLoading from "@/components/season-components/SeasonDetailsLoading";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

// ─── Gallery Image Modal ───────────────────────────────────────────────────────
interface GalleryModalProps {
  isOpen: boolean;
  isClosing: boolean;
  images: SeasonImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  onGoTo: (index: number) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  isClosing,
  images,
  currentIndex,
  onClose,
  onNavigate,
  onGoTo,
}) => {
  const visible = isOpen && !isClosing;
  const current = images[currentIndex];
  const hasMultiple = images.length > 1;

  const handleDownload = () => {
    if (!current?.imageUrl) return;
    const link = document.createElement("a");
    link.href = current.imageUrl;
    link.download = current.name || `season-image-${currentIndex + 1}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onNavigate, onClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{
        background: "rgba(4, 24, 36, 0.95)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{
          background: "#0a1e2b",
          border: "1px solid rgba(11,126,168,0.25)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.96) translateY(16px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div
          style={{
            height: 3,
            flexShrink: 0,
            background: "linear-gradient(90deg, #0B7EA8, #0E9E8E)",
          }}
        />

        {/* Header */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  background: "rgba(11,126,168,0.2)",
                  color: "#3aadd4",
                  border: "1px solid rgba(11,126,168,0.3)",
                }}
              >
                🌿 Season Gallery
              </span>
              {hasMultiple && (
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.35)",
                    fontWeight: 500,
                  }}
                >
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {current?.name || `Image ${currentIndex + 1}`}
            </h3>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            <button
              onClick={handleDownload}
              title="Download"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: "rgba(11,126,168,0.15)",
                color: "#3aadd4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Download size={15} />
            </button>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "52vh",
            minHeight: 220,
            flexShrink: 0,
            background: "#060f17",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {current?.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={current.imageUrl}
              src={current.imageUrl}
              alt={current.name || `Season image ${currentIndex + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "52vh",
                objectFit: "contain",
                display: "block",
                transition: "opacity 0.25s ease",
              }}
            />
          )}

          {/* Prev button */}
          {hasMultiple && (
            <button
              onClick={() => onNavigate("prev")}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(11,126,168,0.4)",
                background: "rgba(11,126,168,0.3)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-50%) scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
              }
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next button */}
          {hasMultiple && (
            <button
              onClick={() => onNavigate("next")}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(14,158,142,0.4)",
                background: "rgba(14,158,142,0.3)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-50%) scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
              }
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Progress dots */}
          {hasMultiple && images.length <= 8 && (
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === currentIndex ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background:
                      i === currentIndex
                        ? "linear-gradient(90deg, #0B7EA8, #0E9E8E)"
                        : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {hasMultiple && (
          <div
            style={{
              flexShrink: 0,
              padding: "10px 16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "#071520",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                paddingBottom: 4,
                scrollbarWidth: "none",
              }}
            >
              {images.map((image, idx) => (
                <button
                  key={image.id ?? idx}
                  onClick={() => onGoTo(idx)}
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: 56,
                    height: 42,
                    borderRadius: 8,
                    overflow: "hidden",
                    border:
                      idx === currentIndex
                        ? "2px solid #0B7EA8"
                        : "2px solid transparent",
                    opacity: idx === currentIndex ? 1 : 0.45,
                    transform:
                      idx === currentIndex ? "scale(1.06)" : "scale(1)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    padding: 0,
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (idx !== currentIndex)
                      (e.currentTarget as HTMLElement).style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    if (idx !== currentIndex)
                      (e.currentTarget as HTMLElement).style.opacity = "0.45";
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.imageUrl || "/placeholder-season.jpg"}
                    alt={image.name || `Season image ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const SeasonDetailsPage = () => {
  const params = useParams();
  const seasonId = params?.seasonId;
  const [season, setSeason] = useState<SeasonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hero slider
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Gallery modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // ── Fetch season ──────────────────────────────────────────────────────────
  const fetchSeason = useCallback(async () => {
    if (!seasonId) {
      setError("No season ID provided");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const seasonService = new SeasonService();
      const data = await seasonService.getSeasonById(Number(seasonId));
      setSeason(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching season details",
      );
    } finally {
      setLoading(false);
    }
  }, [seasonId]);

  useEffect(() => {
    fetchSeason();
  }, [fetchSeason]);

  // ── Hero auto-play ────────────────────────────────────────────────────────
  useEffect(() => {
    if (
      !isAutoPlaying ||
      !season?.seasonImages ||
      season.seasonImages.length <= 1
    )
      return;
    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % season.seasonImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, season?.seasonImages]);

  // ── Hero controls ─────────────────────────────────────────────────────────
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setSelectedImageIndex(index);
    pauseAutoPlay();
  };

  const nextSlide = () => {
    if (!season?.seasonImages) return;
    setSelectedImageIndex((prev) => (prev + 1) % season.seasonImages.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    if (!season?.seasonImages) return;
    setSelectedImageIndex(
      (prev) =>
        (prev - 1 + season.seasonImages.length) % season.seasonImages.length,
    );
    pauseAutoPlay();
  };

  // ── Gallery modal controls ────────────────────────────────────────────────
  const openModal = (index: number) => {
    setModalIndex(index);
    setModalClosing(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
    }, 300);
  };

  const modalNavigate = (direction: "prev" | "next") => {
    if (!season?.seasonImages) return;
    const len = season.seasonImages.length;
    setModalIndex((prev) =>
      direction === "next" ? (prev + 1) % len : (prev - 1 + len) % len,
    );
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getMonthName = (month: number): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1] || "";
  };

  const getMonsoonTypeColor = (type: string): string => {
    switch (type?.toLowerCase()) {
      case "southwest":
        return "from-blue-400 to-cyan-400";
      case "northeast":
        return "from-teal-400 to-emerald-400";
      case "retreating":
        return "from-sky-400 to-indigo-400";
      default:
        return "from-cyan-400 to-teal-400";
    }
  };

  // ── Render guards ─────────────────────────────────────────────────────────
  if (loading) return <SeasonDetailsLoading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="text-center p-8 max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-cyan-600 text-6xl mb-4">🌊</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Season
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchSeason}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!season) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="text-center p-8 max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-gray-500 text-6xl mb-4">🌿</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Season Not Found
          </h1>
          <p className="text-gray-600">
            The season you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const images = season.seasonImages || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      {/* ── Gallery Modal ── */}
      <GalleryModal
        isOpen={modalOpen}
        isClosing={modalClosing}
        images={images}
        currentIndex={modalIndex}
        onClose={closeModal}
        onNavigate={modalNavigate}
        onGoTo={setModalIndex}
      />

      {/* ── Hero Section ── */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {images.length > 0 ? (
          <div className="relative w-full h-full">
            {images.map((image: SeasonImage, index: number) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === selectedImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.imageUrl || "/placeholder-season.jpg"}
                  alt={image.name || `Season image ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={2000}
                  height={1200}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-800/40 to-transparent" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-800 to-cyan-800">
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-800/40 to-transparent" />
          </div>
        )}

        {/* Navigation Arrows — fixed with type="button" and z-index */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="cursor-pointer absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/30 active:scale-95 transition-all duration-300 group"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
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
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="cursor-pointer absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/30 active:scale-95 transition-all duration-300 group"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
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
          </>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full text-sm md:text-base font-semibold shadow-lg">
                {season.isPeak ? "Peak Season" : "Season"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
              {season.standardName}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-teal-100 mb-4">
              {season.name}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm md:text-base">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {getMonthName(season.startMonth)} –{" "}
                {getMonthName(season.endMonth)}
              </span>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2 md:space-x-3">
            {images.map((_: SeasonImage, index: number) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`cursor-pointer h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-gradient-to-r from-teal-400 to-cyan-400 scale-125 shadow-lg w-4 md:w-5"
                    : "bg-white/50 hover:bg-white/75 w-2 md:w-2.5"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                About the Season
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {season.description}
              </p>
            </div>

            {/* Weather Overview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-cyan-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                Weather Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-white"
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
                    </div>
                    <span className="font-semibold text-gray-700 text-sm md:text-base">
                      Temperature
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-teal-600">
                    {season.temperatureMin}° – {season.temperatureMax}°C
                  </p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 16.5A7.5 7.5 0 0012.5 9H12M20 16.5V12M20 16.5h-4.5M4 7.5A7.5 7.5 0 0111.5 15v0m0 0v3m-3-3h6"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-700 text-sm md:text-base">
                      Rainfall Pattern
                    </span>
                  </div>
                  <p className="text-teal-600 font-medium text-sm md:text-base">
                    {season.rainfallPattern}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-6 p-4 bg-teal-50/50 rounded-xl">
                <p className="text-gray-600 italic text-sm md:text-base">
                  {season.weatherSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 md:space-y-6">
            {/* Monsoon Type */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Monsoon Type
              </h3>
              <div
                className={`p-4 bg-gradient-to-r ${getMonsoonTypeColor(season.monsoonType)} rounded-xl text-white`}
              >
                <p className="text-lg md:text-xl font-semibold capitalize">
                  {season.monsoonType} Monsoon
                </p>
              </div>
            </div>

            {/* Gallery — clicking opens modal */}
            {images.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-teal-500"
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
                  Gallery
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {images
                    .slice(0, 4)
                    .map((image: SeasonImage, index: number) => (
                      <div
                        key={image.id}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => openModal(index)}
                      >
                        <Image
                          src={image.imageUrl || PLACE_HOLDER_IMAGE}
                          alt={image.name || `Season image ${index + 1}`}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/40 transition-all duration-300 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
                {images.length > 4 && (
                  <button
                    type="button"
                    onClick={() => openModal(0)}
                    className="mt-3 w-full text-center text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
                  >
                    View all {images.length} photos →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetailsPage;
