// components/TourImageGallery.tsx
import React, { useEffect, useState, useCallback } from "react";
import { WishListService } from "@/services/wishListService";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { useAuth } from "@/context/AuthContext";
import { ActiveToursType } from "@/types/tour-types";

interface TourImageGalleryProps {
  tour: ActiveToursType;
}

// ── Main Image ────────────────────────────────────────────────────────────────
const MainImage = React.memo(({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => { setImgSrc(src); setHasError(false); }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => { if (!hasError) { setImgSrc(PLACE_HOLDER_IMAGE); setHasError(true); } }}
    />
  );
});
MainImage.displayName = "MainImage";

// ── Thumbnail Image ───────────────────────────────────────────────────────────
const ThumbnailImage = React.memo(({ src, alt, className, onClick }: {
  src: string; alt: string; className: string; onClick: (e: React.MouseEvent) => void;
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => { setImgSrc(src); setHasError(false); }, [src]);

  return (
    <div onClick={onClick} className={`${className} cursor-pointer relative overflow-hidden`}>
      <img
        src={imgSrc}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => { if (!hasError) { setImgSrc(PLACE_HOLDER_IMAGE); setHasError(true); } }}
      />
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
});
ThumbnailImage.displayName = "ThumbnailImage";

// ── Lightbox ──────────────────────────────────────────────────────────────────
const Lightbox = ({ images, startIndex, onClose }: {
  images: { url: string; name: string }[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const prev = useCallback(() => setActiveIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActiveIndex(i => (i + 1) % images.length), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(4, 30, 45, 0.97)" }}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #0B7EA8, #0E9E8E)" }}
          />
          <span className="text-white/70 text-sm font-medium">
            {activeIndex + 1} <span className="text-white/40">/ {images.length}</span>
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Main image area ── */}
      <div
        className="flex-1 flex items-center justify-center relative px-4 sm:px-16 min-h-0"
        onClick={e => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(11,126,168,0.25)", border: "1px solid rgba(11,126,168,0.4)" }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Image */}
        <div className="w-full max-w-4xl h-full flex items-center justify-center">
          <img
            src={images[activeIndex]?.url || PLACE_HOLDER_IMAGE}
            alt={images[activeIndex]?.name}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            style={{ maxHeight: "calc(100vh - 220px)" }}
          />
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(14,158,142,0.25)", border: "1px solid rgba(14,158,142,0.4)" }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Caption ── */}
      <div
        className="text-center px-4 py-2 flex-shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-white/60 text-sm truncate">{images[activeIndex]?.name}</p>
      </div>

      {/* ── Thumbnail strip ── */}
      <div
        className="flex gap-2 justify-center px-4 pb-4 overflow-x-auto flex-shrink-0"
        style={{ scrollbarWidth: "none" }}
        onClick={e => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="flex-shrink-0 transition-all duration-200"
            style={{
              width: 56,
              height: 40,
              borderRadius: 8,
              overflow: "hidden",
              border: i === activeIndex
                ? "2px solid #0B7EA8"
                : "2px solid transparent",
              opacity: i === activeIndex ? 1 : 0.5,
              transform: i === activeIndex ? "scale(1.05)" : "scale(1)",
            }}
          >
            <img src={img.url || PLACE_HOLDER_IMAGE} alt={img.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const TourImageGallery: React.FC<TourImageGalleryProps> = ({ tour }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(tour.wish);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);
  const { user } = useAuth();

  const allImages = tour.images
    .map(img => ({ url: img.imageUrl, name: img.imageName || "Tour image" }))
    .filter(img => img.url);

  const displayImages = allImages.length > 0
    ? allImages
    : [{ url: PLACE_HOLDER_IMAGE, name: tour.tourName }];

  // Auto-rotate
  useEffect(() => {
    if (displayImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % displayImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayImages.length]);

  const openLightbox = (index: number) => {
    setLightboxStartIndex(index);
    setLightboxOpen(true);
  };

  const handleWishlistToggle = async () => {
    if (loadingWishlist) return;
    setLoadingWishlist(true);
    try {
      await WishListService.addTourWishList({ tourId: tour.tourId });
      setIsWishlisted(prev => !prev);
    } catch (err) {
      console.error("Failed to update wishlist", err);
      alert("Failed to update wishlist. Try again.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <>
      {/* ── Lightbox overlay ── */}
      {lightboxOpen && (
        <Lightbox
          images={displayImages}
          startIndex={lightboxStartIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div className="relative h-48 sm:h-56 md:h-64 lg:h-56 xl:h-60 2xl:h-64 w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">

        {/* Main image */}
        <MainImage
          src={displayImages[currentImageIndex]?.url}
          alt={displayImages[currentImageIndex]?.name || tour.tourName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist button */}
        {user && (
          <button
            onClick={handleWishlistToggle}
            disabled={loadingWishlist}
            className={`cursor-pointer absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-10 group ${loadingWishlist ? "opacity-60 cursor-not-allowed" : "hover:scale-110 active:scale-95"}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {loadingWishlist ? (
              <svg className="w-5 h-5 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : isWishlisted ? (
              <svg className="w-5 h-5 text-red-500 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-500 transition-all duration-300 group-hover:text-red-400 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/0 via-red-400/0 to-purple-400/0 group-hover:from-pink-400/10 group-hover:via-red-400/10 group-hover:to-purple-400/10 transition-all duration-500" />
          </button>
        )}

        {/* Image counter */}
        {displayImages.length > 1 && (
          <div className="absolute top-3 sm:top-4 right-12 sm:right-16 bg-black/60 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm">
            {currentImageIndex + 1} / {displayImages.length}
          </div>
        )}

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <>
            {/* Mobile */}
            <div className="absolute bottom-2 left-2 right-2 flex sm:hidden gap-1 justify-center">
              {displayImages.slice(0, 4).map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image.url}
                  alt={image.name}
                  onClick={e => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={`w-8 h-6 rounded border-2 transition-all duration-200 flex-shrink-0 ${index === currentImageIndex ? "border-white shadow-lg" : "border-white/60 hover:border-white"}`}
                />
              ))}
              {displayImages.length > 4 && (
                <button
                  onClick={e => { e.stopPropagation(); openLightbox(4); }}
                  className="cursor-pointer w-8 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg, rgba(11,126,168,0.85), rgba(14,158,142,0.85))" }}
                >
                  <span className="text-white text-xs font-semibold">+{displayImages.length - 4}</span>
                </button>
              )}
            </div>

            {/* Desktop */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 hidden sm:flex gap-1">
              {displayImages.slice(0, 3).map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image.url}
                  alt={image.name}
                  onClick={e => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={`w-8 h-6 sm:w-10 sm:h-8 rounded border-2 transition-all duration-200 ${index === currentImageIndex ? "border-white" : "border-white/60 hover:border-white"}`}
                />
              ))}
              {displayImages.length > 3 && (
                <button
                  onClick={e => { e.stopPropagation(); openLightbox(3); }}
                  className="cursor-pointer w-8 h-6 sm:w-10 sm:h-8 rounded flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg, rgba(11,126,168,0.85), rgba(14,158,142,0.85))" }}
                >
                  <span className="text-white text-xs font-semibold">+{displayImages.length - 3}</span>
                </button>
              )}
            </div>
          </>
        )}

        {/* ── Navigation dots — click opens lightbox ── */}
        {displayImages.length > 1 && (
          <div className={`absolute bottom-3 left-3 gap-1.5 ${displayImages.length > 1 ? "hidden sm:flex" : "flex"}`}>
            {displayImages.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={e => {
                  e.stopPropagation();
                  openLightbox(index);
                }}
                title="View all photos"
                className="cursor-pointer transition-all duration-200 hover:scale-125 focus:outline-none"
                style={{
                  width: index === currentImageIndex ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: index === currentImageIndex
                    ? "linear-gradient(90deg, #0B7EA8, #0E9E8E)"
                    : "rgba(255,255,255,0.5)",
                  boxShadow: index === currentImageIndex
                    ? "0 0 6px rgba(11,126,168,0.6)"
                    : "none",
                }}
              />
            ))}
            {displayImages.length > 5 && (
              <div style={{ width: 8, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.3)" }} />
            )}
          </div>
        )}

        {/* Season badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span
            className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border"
            style={{
              background: "rgba(14,158,142,0.65)",
              borderColor: "rgba(14,158,142,0.4)",
              color: "#fff",
              backdropFilter: "blur(4px)",
            }}
          >
            {tour.seasonName}
          </span>
        </div>
      </div>
    </>
  );
};

export default TourImageGallery;