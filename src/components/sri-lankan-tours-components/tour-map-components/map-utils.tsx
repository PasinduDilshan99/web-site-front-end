// components/map-utils.tsx
import L from "leaflet";

type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  images: Image[];
};

type Image = {
  id: number;
  url: string;
  name: string;
  description?: string;
};

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
      return `<div class="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">START</div>`;
    if (isEnd)
      return `<div class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">END</div>`;
    return `<div class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">${
      index + 1
    }</div>`;
  };

  const markerImage = location.images[0]?.url || "/placeholder-image.jpg";

  const iconHtml = `
    <div class="relative w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white shadow-lg transition-transform duration-200 hover:scale-105">
      <img src="${markerImage}" alt="${
    location.name
  }" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'" />
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
    className: "custom-popup",
  }).setContent(popupContent);

  marker.bindPopup(popup);
  marker.on("popupopen", () => initializeCarousel(location.id.toString()));

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
      (image, imgIndex) => `
    <div class="carousel-item ${
      imgIndex === 0 ? "active" : ""
    }" data-carousel-item="${imgIndex}">
      <img src="${image.url}" class="carousel-image" alt="${
        image.name
      }" onerror="this.src='https://via.placeholder.com/400x240?text=Image+Not+Found'">
      <div class="carousel-caption">
        <h4 class="text-white font-semibold text-xs sm:text-sm">${
          image.name
        }</h4>
        ${
          image.description
            ? `<p class="text-white/80 text-xs mt-1 hidden sm:block">${image.description}</p>`
            : ""
        }
      </div>
    </div>
  `
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
            <h3 class="text-lg sm:text-xl font-bold text-gray-800">${
              location.name
            }</h3>
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
              ${
                isStart
                  ? '<span class="bg-green-100 text-green-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">🚩 Start</span>'
                  : ""
              }
              ${
                isEnd
                  ? '<span class="bg-red-100 text-red-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">🏁 End</span>'
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
            ? `<div class="mb-3 sm:mb-4"><p class="text-gray-600 text-xs sm:text-sm leading-relaxed">${location.description}</p></div>`
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
