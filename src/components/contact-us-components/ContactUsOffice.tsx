"use client";
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, AlertCircle, Navigation, Building, Check } from 'lucide-react';

interface OfficeInfo {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  appointmentRequired: boolean;
  workingHours: string;
  landmarks?: string[];
  description?: string;
}

const ContactUsOffice = () => {
  const [selectedOffice, setSelectedOffice] = useState<number>(0);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const offices: OfficeInfo[] = [
    {
      id: 1,
      name: "Colombo Headquarters",
      address: "123 Galle Road, Colombo 03",
      city: "Colombo",
      country: "Sri Lanka",
      phone: "+94 11 234 5678",
      email: "colombo@felicita.com",
      lat: 6.9271,
      lng: 79.8612,
      appointmentRequired: true,
      workingHours: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM\nSun: Closed",
      landmarks: [
        "Galle Face Green (5 min walk)",
        "Colombo City Center (10 min drive)",
        "Dutch Hospital Shopping Precinct (15 min drive)"
      ],
      description: "Main office located in the heart of Colombo's business district."
    },
    {
      id: 2,
      name: "Kandy Branch Office",
      address: "45 Dalada Veediya, Kandy",
      city: "Kandy",
      country: "Sri Lanka",
      phone: "+94 81 234 5678",
      email: "kandy@felicita.com",
      lat: 7.2906,
      lng: 80.6337,
      appointmentRequired: false,
      workingHours: "Mon-Fri: 8:30 AM - 5:30 PM\nSat: 9:00 AM - 1:00 PM\nSun: Closed",
      landmarks: [
        "Temple of the Tooth (10 min walk)",
        "Kandy Lake (5 min walk)",
        "Royal Botanical Gardens (15 min drive)"
      ],
      description: "Cultural tours and hill country expeditions specialist."
    },
    {
      id: 3,
      name: "Galle Southern Office",
      address: "78 Church Street, Galle Fort",
      city: "Galle",
      country: "Sri Lanka",
      phone: "+94 91 234 5678",
      email: "galle@felicita.com",
      lat: 6.0535,
      lng: 80.2210,
      appointmentRequired: true,
      workingHours: "Mon-Fri: 9:00 AM - 5:00 PM\nSat: 9:00 AM - 12:00 PM\nSun: Closed",
      landmarks: [
        "Galle Fort (2 min walk)",
        "Unawatuna Beach (15 min drive)",
        "Hikkaduwa Beach (30 min drive)"
      ],
      description: "Beach tours and southern coast adventures specialist."
    }
  ];

  const currentOffice = offices[selectedOffice];

  // Load OpenStreetMap script
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapLoaded) {
      // Check if Leaflet is already loaded
      if ((window as any).L) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);

      return () => {
        // Only remove if we're the ones who added it
        const existingScript = document.querySelector('script[src*="leaflet"]');
        if (existingScript && existingScript.parentNode) {
          document.head.removeChild(existingScript);
        }
        const existingLink = document.querySelector('link[href*="leaflet"]');
        if (existingLink && existingLink.parentNode) {
          document.head.removeChild(existingLink);
        }
      };
    }
  }, [mapLoaded]);

  // Initialize map only once
  const initMap = () => {
    if (!mapLoaded || typeof window === 'undefined' || !mapContainerRef.current) return;
    
    const L = (window as any).L;
    if (!L) return;

    // Check if map already exists
    if (mapRef.current) {
      // Update existing map
      updateMap();
      return;
    }

    // Create new map
    mapRef.current = L.map(mapContainerRef.current).setView(
      [currentOffice.lat, currentOffice.lng], 
      16
    );

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Add initial marker
    addMarker();

    // Fit bounds
    mapRef.current.fitBounds([[currentOffice.lat, currentOffice.lng]], {
      padding: [50, 50],
      maxZoom: 16
    });
  };

  // Add marker to map
  const addMarker = () => {
    if (!mapRef.current) return;
    
    const L = (window as any).L;
    
    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.remove();
    }

    // Create custom icon
    const customIcon = L.divIcon({
      html: `
        <div class="relative">
          <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"></div>
        </div>
      `,
      className: '',
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48]
    });

    // Add new marker
    markerRef.current = L.marker([currentOffice.lat, currentOffice.lng], { 
      icon: customIcon 
    })
      .addTo(mapRef.current)
      .bindPopup(`
        <div class="p-2 min-w-[200px]">
          <strong class="text-blue-600">${currentOffice.name}</strong><br>
          <span class="text-sm">${currentOffice.address}</span><br>
          <span class="text-sm">${currentOffice.city}, ${currentOffice.country}</span>
        </div>
      `);
  };

  // Update map when office changes
  const updateMap = () => {
    if (!mapRef.current) return;
    
    const L = (window as any).L;
    
    // Update map view
    mapRef.current.setView([currentOffice.lat, currentOffice.lng], 16);
    
    // Update marker
    if (markerRef.current) {
      markerRef.current.setLatLng([currentOffice.lat, currentOffice.lng]);
      markerRef.current.setPopupContent(`
        <div class="p-2 min-w-[200px]">
          <strong class="text-blue-600">${currentOffice.name}</strong><br>
          <span class="text-sm">${currentOffice.address}</span><br>
          <span class="text-sm">${currentOffice.city}, ${currentOffice.country}</span>
        </div>
      `);
    } else {
      addMarker();
    }
  };

  // Initialize map when loaded
  useEffect(() => {
    if (mapLoaded) {
      initMap();
    }
  }, [mapLoaded]);

  // Update map when office changes
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      updateMap();
    }
  }, [selectedOffice, mapLoaded]);

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle office selection
  const handleOfficeSelect = (index: number) => {
    setSelectedOffice(index);
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Offices
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Visit us at any of our conveniently located offices across Sri Lanka.
          </p>
          <div className="w-24 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Office Selection */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Select an Office
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {offices.map((office, index) => (
                <button
                  key={office.id}
                  onClick={() => handleOfficeSelect(index)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedOffice === index
                      ? 'border-teal-500 bg-teal-50 transform scale-105'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${
                        selectedOffice === index ? 'bg-teal-500' : 'bg-gray-300'
                      }`}></div>
                      <h4 className="font-semibold text-gray-800">{office.city}</h4>
                    </div>
                    {selectedOffice === index && (
                      <Check className="w-5 h-5 text-teal-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 text-left">
                    {office.address}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Office Details */}
          <div className="space-y-6">
            {/* Office Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <Building className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {currentOffice.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{currentOffice.address}</p>
                        <p>{currentOffice.city}, {currentOffice.country}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-medium">{currentOffice.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-medium">{currentOffice.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {currentOffice.description && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">About This Office</h4>
                  <p className="text-gray-600">{currentOffice.description}</p>
                </div>
              )}

              {/* Working Hours */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold text-gray-800">Working Hours</h4>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <pre className="text-gray-700 whitespace-pre-line text-sm font-medium">
                    {currentOffice.workingHours}
                  </pre>
                </div>
              </div>

              {/* Appointment Notice */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <h4 className="font-semibold text-gray-800">
                    {currentOffice.appointmentRequired ? 'Appointment Required' : 'Walk-ins Welcome'}
                  </h4>
                </div>
                <div className={`rounded-lg p-4 ${
                  currentOffice.appointmentRequired 
                    ? 'bg-amber-50 border border-amber-100' 
                    : 'bg-green-50 border border-green-100'
                }`}>
                  <p className="text-gray-700">
                    {currentOffice.appointmentRequired 
                      ? 'Please schedule an appointment before visiting for personalized consultations.'
                      : 'You can visit us anytime during working hours without an appointment.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
                <a
                  href={`https://www.openstreetmap.org/directions?engine=graphhopper_car&route=0;${currentOffice.lng}%2C${currentOffice.lat}#map=16/${currentOffice.lat}/${currentOffice.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Nearby Landmarks */}
            {currentOffice.landmarks && currentOffice.landmarks.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Nearby Landmarks
                </h4>
                <ul className="space-y-3">
                  {currentOffice.landmarks.map((landmark, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span>{landmark}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - OpenStreetMap */}
          <div className="space-y-6">
            {/* Map Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="font-medium text-gray-800">Location Map</span>
                  </div>
                  <span className="text-sm text-gray-500">{currentOffice.city}</span>
                </div>
              </div>
              
              <div 
                ref={mapContainerRef}
                id="openstreet-map"
                className="h-[400px] w-full"
              >
                {/* Loading State */}
                {!mapLoaded && (
                  <div className="h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Controls Info */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span>Click on marker for details</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Drag to pan</span>
                    </div>
                  </div>
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${currentOffice.lat}&mlon=${currentOffice.lng}#map=16/${currentOffice.lat}/${currentOffice.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View on OpenStreetMap →
                  </a>
                </div>
              </div>
            </div>

            {/* All Offices Quick View */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                All Our Offices
              </h4>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div 
                    key={office.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedOffice === index
                        ? 'border-teal-300 bg-teal-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleOfficeSelect(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          selectedOffice === index ? 'bg-teal-500' : 'bg-gray-300'
                        }`}></div>
                        <div>
                          <h5 className="font-medium text-gray-800">{office.name}</h5>
                          <p className="text-sm text-gray-600">{office.city}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-teal-600">
                        {office.phone.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4">Need Assistance?</h4>
              <p className="mb-4 text-teal-100">
                Contact the {currentOffice.city} office directly:
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-teal-100">Phone:</span>
                  <a 
                    href={`tel:${currentOffice.phone.replace(/\s+/g, '')}`}
                    className="text-lg font-bold hover:text-white"
                  >
                    {currentOffice.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-100">Email:</span>
                  <a 
                    href={`mailto:${currentOffice.email}`}
                    className="text-lg font-bold hover:text-white"
                  >
                    {currentOffice.email}
                  </a>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-teal-400">
                <p className="text-sm text-teal-100">
                  For immediate assistance, call our emergency line: 
                  <a href="tel:+94771234567" className="font-bold ml-2 hover:text-white">
                    +94 77 123 4567
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Leaflet CSS styles */}
      <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 400px;
          z-index: 1;
        }
        
        .leaflet-popup-content {
          margin: 12px !important;
          font-size: 14px;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 0.75rem !important;
          border: 2px solid #3b82f6;
        }
        
        .leaflet-control-attribution {
          font-size: 11px;
        }
      `}</style>
    </div>
  );
};

export default ContactUsOffice;