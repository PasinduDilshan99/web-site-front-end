// components/map-utils.tsx
import L from "leaflet";
import { TourMapLocation, TourMapImage } from "@/types/tour-map-types";

// Re-export for internal use clarity
type Location = TourMapLocation;
type Image = TourMapImage;

type AirportLocation = {
  lat: number;
  lng: number;
  name: string;
};

const FALLBACK_IMAGE_URL = "/placeholder-image.jpg";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeImageUrl = (url: string | undefined): string => {
  if (!url) return FALLBACK_IMAGE_URL;
  const trimmed = url.trim();
  if (trimmed.startsWith("/")) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return trimmed;
    }
  } catch {
    return FALLBACK_IMAGE_URL;
  }
  return FALLBACK_IMAGE_URL;
};

export function createAirportMarker(
  map: L.Map,
  airport: AirportLocation
): L.Marker {
  const iconHtml = `
    <div class="relative flex items-center justify-center w-14 h-14 rounded-xl bg-purple-600 border-2 border-white shadow-xl transition-transform duration-200 hover:scale-105">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
      </svg>
      <div class="absolute -top-1 -right-1 bg-white text-purple-700 text-xs font-bold px-1.5 py-0.5 rounded-full shadow-lg border border-purple-200">✈</div>
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: "custom-airport-icon",
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  });

  const marker = L.marker([airport.lat, airport.lng], {
    icon: customIcon,
  }).addTo(map);

  const popupContent = `
    <div class="w-64 bg-white rounded-xl shadow-xl overflow-hidden">
      <div class="bg-purple-600 px-4 py-3 flex items-center gap-2">
        <span class="text-2xl">✈️</span>
        <div>
          <h3 class="text-white font-bold text-sm">Departure & Return Point</h3>
          <p class="text-purple-200 text-xs">Tour starts and ends here</p>
        </div>
      </div>
      <div class="p-3">
        <p class="text-gray-800 font-semibold text-sm">${escapeHtml(airport.name)}</p>
        <div class="mt-2 flex gap-2">
          <span class="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">🛫 Departs here</span>
          <span class="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">🛬 Returns here</span>
        </div>
        <p class="text-gray-400 text-xs mt-2">${airport.lat.toFixed(4)}, ${airport.lng.toFixed(4)}</p>
      </div>
    </div>
  `;

  marker.bindPopup(
    L.popup({ maxWidth: 280, className: "custom-popup" }).setContent(
      popupContent
    )
  );

  return marker;
}

export function createPhotoMarker(
  map: L.Map,
  location: Location,
  index: number,
  totalLocations: number
) {
  const isStart = index === 0;
  const isEnd = index === totalLocations - 1;

  const getMarkerBadge = () => {
    if (isStart)
      return `<div class="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">1ST</div>`;
    if (isEnd)
      return `<div class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">LAST</div>`;
    return `<div class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">${
      index + 1
    }</div>`;
  };

  const markerImage = sanitizeImageUrl(location.images[0]?.url);
  const locationName = escapeHtml(location.name);

  const iconHtml = `
    <div class="relative w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white shadow-lg transition-transform duration-200 hover:scale-105">
      <img src="${markerImage}" alt="${locationName}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMAGE_URL}'" />
      ${getMarkerBadge()}
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: "custom-photo-icon",
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });

  const marker = L.marker([location.lat, location.lng], {
    icon: customIcon,
  }).addTo(map);
  const popupContent = createPopupContent(location, index, totalLocations);
  const popup = L.popup({
    maxWidth: 400,
    maxHeight: 480,
    autoPan: true,
    className: "custom-popup scrollable-popup",
  }).setContent(popupContent);

  marker.bindPopup(popup);
  marker.on("popupopen", () => {
    initializeCarousel(location.id.toString());

    // Allow scrolling inside the popup without the map intercepting wheel/touch events
    const popupEl = document.querySelector(
      `.scrollable-popup .leaflet-popup-content`
    ) as HTMLElement | null;
    if (popupEl) {
      L.DomEvent.disableScrollPropagation(popupEl);
      L.DomEvent.disableClickPropagation(popupEl);
    }
  });

  return marker;
}

export function createPopupContent(
  location: Location,
  index: number,
  totalLocations: number
) {
  const isStart = index === 0;
  const isEnd = index === totalLocations - 1;
  const carouselId = `carousel-${location.id}`;
  const hasMultipleImages = location.images.length > 1;

  const carouselStyles = `
    <style>
      .carousel-item { display: none; transition: opacity 0.7s ease-in-out; }
      .carousel-item.active { display: block; }
      .carousel-indicator { width: 10px; height: 10px; border-radius: 50%; cursor: pointer; transition: background-color 0.3s ease; }
      .carousel-indicator.active { background-color: #2563eb; }
      .carousel-control { position: absolute; top: 0; bottom: 0; display: flex; align-items: center; justify-content: center; width: 32px; cursor: pointer; transition: background-color 0.3s ease; z-index: 40; }
      .carousel-control:hover { background-color: rgba(255, 255, 255, 0.2); }
      .carousel-control.prev { left: 0; }
      .carousel-control.next { right: 0; }
      .carousel-image { position: absolute; width: 100%; height: 200px; object-fit: cover; border-radius: 8px; }
      @media (min-width: 640px) { .carousel-image { height: 240px; } }
      .carousel-caption { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); padding: 12px; border-radius: 0 0 8px 8px; z-index: 30; }
      .carousel-indicators-container { position: absolute; z-index: 30; display: flex; gap: 6px; bottom: 12px; left: 50%; transform: translateX(-50%); }
      .scrollable-popup .leaflet-popup-content-wrapper { padding: 0; overflow: hidden; }
      .scrollable-popup .leaflet-popup-content { margin: 0; overflow-y: auto; max-height: 460px; overscroll-behavior: contain; }
      .scrollable-popup .leaflet-popup-content::-webkit-scrollbar { width: 4px; }
      .scrollable-popup .leaflet-popup-content::-webkit-scrollbar-track { background: #f1f5f9; }
      .scrollable-popup .leaflet-popup-content::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
    </style>
  `;

  const carouselIndicators = location.images
    .map(
      (_, imgIndex) => `
    <button type="button" class="carousel-indicator ${
      imgIndex === 0 ? "active bg-blue-600" : "bg-gray-300"
    }" data-carousel-index="${imgIndex}"></button>
  `
    )
    .join("");

  const carouselItems = location.images
    .map(
      (image, imgIndex) => {
        const imageUrl = sanitizeImageUrl(image.url);
        const imageName = escapeHtml(image.name);
        const imageDescription = image.description
          ? escapeHtml(image.description)
          : "";
        return `
    <div class="carousel-item ${
      imgIndex === 0 ? "active" : ""
    }" data-carousel-item="${imgIndex}">
      <img src="${imageUrl}" class="carousel-image" alt="${imageName}" onerror="this.src='${FALLBACK_IMAGE_URL}'">
      <div class="carousel-caption">
        <h4 class="text-white font-semibold text-xs sm:text-sm">${imageName}</h4>
        ${
          imageDescription
            ? `<p class="text-white/80 text-xs mt-1 hidden sm:block">${imageDescription}</p>`
            : ""
        }
      </div>
    </div>
  `;
      }
    )
    .join("");

  const carouselControls = hasMultipleImages
    ? `
    <div class="carousel-control prev" data-carousel-prev>
      <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/30 hover:bg-white/50">
        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </span>
    </div>
    <div class="carousel-control next" data-carousel-next>
      <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/30 hover:bg-white/50">
        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </span>
    </div>
  `
    : "";

  return `
    ${carouselStyles}
    <div class="w-72 sm:w-80 md:w-96 bg-white rounded-lg sm:rounded-xl shadow-xl overflow-hidden" data-location-id="${
      location.id
    }">
      <div id="${carouselId}" class="relative overflow-hidden rounded-t-lg sm:rounded-t-xl">
        <div class="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          ${carouselItems}
        </div>
        ${carouselControls}
        ${
          hasMultipleImages
            ? `<div class="carousel-indicators-container">${carouselIndicators}</div>`
            : ""
        }
      </div>
      <div class="p-3 sm:p-4">
        <div class="flex items-start justify-between mb-2 sm:mb-3">
          <div class="flex-1">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800">${escapeHtml(location.name)}</h3>
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
              ${
                isStart
                  ? '<span class="bg-green-100 text-green-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">🚩 1st Stop</span>'
                  : ""
              }
              ${
                isEnd
                  ? '<span class="bg-red-100 text-red-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">🏁 Last Stop</span>'
                  : ""
              }
              ${
                !isStart && !isEnd
                  ? `<span class="bg-blue-100 text-blue-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">📍 Stop ${
                      index + 1
                    }</span>`
                  : ""
              }
            </div>
          </div>
          <span class="text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-1 rounded whitespace-nowrap ml-2">ID: ${
            location.id
          }</span>
        </div>
        ${
          location.description
            ? `<div class="mb-3 sm:mb-4"><p class="text-gray-600 text-xs sm:text-sm leading-relaxed">${escapeHtml(location.description)}</p></div>`
            : ""
        }
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-500 border-t border-gray-100 pt-2 sm:pt-3">
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            ${location.images.length} ${
    location.images.length === 1 ? "image" : "images"
  }
          </span>
          <span class="text-xs bg-gray-100 px-1.5 sm:px-2 py-1 rounded">
            ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  `;
}

export function initializeCarousel(locationId: string) {
  const carouselId = `carousel-${locationId}`;
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const items = carousel.querySelectorAll("[data-carousel-item]");
  const indicators = carousel.querySelectorAll("[data-carousel-index]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  let currentIndex = 0;

  const switchCarouselImage = (index: number) => {
    items.forEach((item) => item.classList.remove("active"));
    indicators.forEach((indicator) => {
      indicator.classList.remove("active", "bg-blue-600");
      indicator.classList.add("bg-gray-300");
    });
    items[index].classList.add("active");
    indicators[index].classList.add("active", "bg-blue-600");
    indicators[index].classList.remove("bg-gray-300");
    currentIndex = index;
  };

  const nextCarouselImage = () =>
    switchCarouselImage((currentIndex + 1) % items.length);
  const prevCarouselImage = () =>
    switchCarouselImage((currentIndex - 1 + items.length) % items.length);

  if (prevButton) prevButton.addEventListener("click", prevCarouselImage);
  if (nextButton) nextButton.addEventListener("click", nextCarouselImage);
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => switchCarouselImage(index));
  });

  switchCarouselImage(0);
}
