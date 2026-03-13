"use client";

import React from "react";
import { ChevronLeft, ChevronRight, X, Download, MapPin, Activity } from "lucide-react";

interface ImageModalProps {
  imageModal: {
    isOpen: boolean;
    data: {
      imageUrl: string;
      title: string;
      description?: string;
      type: "destination" | "activity";
    } | null;
    images: Array<{ url: string; title: string; description?: string }>;
    currentIndex: number;
  };
  isClosingModal: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  onDownload: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageModal,
  isClosingModal,
  onClose,
  onNavigate,
  onDownload,
}) => {
  const isOpen = imageModal.isOpen && !isClosingModal;
  const { images, currentIndex, data } = imageModal;
  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{
        background: "rgba(4, 24, 36, 0.95)",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      {/* ── Modal shell ── */}
      <div
        className="w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{
          background: "#0a1e2b",
          border: "1px solid rgba(11,126,168,0.25)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.96) translateY(16px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top gradient bar ── */}
        <div
          style={{
            height: 3,
            flexShrink: 0,
            background: "linear-gradient(90deg, #0B7EA8, #0E9E8E)",
          }}
        />

        {/* ── Header ── */}
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
            {/* Type badge + counter */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  background: data?.type === "destination" ? "rgba(11,126,168,0.2)" : "rgba(14,158,142,0.2)",
                  color: data?.type === "destination" ? "#3aadd4" : "#3dbfb1",
                  border: `1px solid ${data?.type === "destination" ? "rgba(11,126,168,0.3)" : "rgba(14,158,142,0.3)"}`,
                }}
              >
                {data?.type === "destination" ? "📍 Destination" : "⚡ Activity"}
              </span>
              {hasMultiple && (
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {data?.title}
            </h3>
            {data?.description && (
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {data.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <button
              onClick={onDownload}
              title="Download"
              style={{
                width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer",
                background: "rgba(11,126,168,0.15)", color: "#3aadd4",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Download size={15} />
            </button>
            <button
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer",
                background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── Main image ── */}
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
          {data?.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={data.imageUrl}
              src={data.imageUrl}
              alt={data.title}
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
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(11,126,168,0.4)",
                background: "rgba(11,126,168,0.3)", backdropFilter: "blur(4px)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10, transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next button */}
          {hasMultiple && (
            <button
              onClick={() => onNavigate("next")}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(14,158,142,0.4)",
                background: "rgba(14,158,142,0.3)", backdropFilter: "blur(4px)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10, transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Progress dots */}
          {hasMultiple && images.length <= 8 && (
            <div
              style={{
                position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === currentIndex ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === currentIndex
                      ? "linear-gradient(90deg, #0B7EA8, #0E9E8E)"
                      : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Thumbnail strip ── */}
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
                display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4,
                scrollbarWidth: "none",
              }}
            >
              {images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const diff = idx - currentIndex;
                    const direction = diff > 0 ? "next" : "prev";
                    const steps = Math.abs(diff);
                    for (let i = 0; i < steps; i++) onNavigate(direction);
                  }}
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: 56,
                    height: 42,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: idx === currentIndex ? "2px solid #0B7EA8" : "2px solid transparent",
                    opacity: idx === currentIndex ? 1 : 0.45,
                    transform: idx === currentIndex ? "scale(1.06)" : "scale(1)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    padding: 0,
                    background: "transparent",
                  }}
                  onMouseEnter={e => {
                    if (idx !== currentIndex) (e.currentTarget as HTMLElement).style.opacity = "0.8";
                  }}
                  onMouseLeave={e => {
                    if (idx !== currentIndex) (e.currentTarget as HTMLElement).style.opacity = "0.45";
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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

export default ImageModal;