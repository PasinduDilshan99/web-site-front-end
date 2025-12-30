"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Globe, Users, Car, Wifi, Coffee } from 'lucide-react';

// Define Leaflet types to avoid any
interface LeafletMap {
  remove: () => void;
  setView: (coords: [number, number], zoom: number) => LeafletMap;
}

interface LeafletTileLayer {
  addTo: (map: LeafletMap) => void;
}

interface LeafletMarker {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindPopup: (content: string) => LeafletMarker;
}

interface LeafletControl {
  L: {
    map: (element: HTMLElement) => LeafletMap;
    tileLayer: (url: string, options: unknown) => LeafletTileLayer;
    marker: (coords: [number, number], options: unknown) => LeafletMarker;
    divIcon: (options: unknown) => unknown;
  };
}

declare global {
  interface Window {
    L: LeafletControl["L"] | undefined;
  }
}

interface OfficeLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  imageUrl: string;
  workingHours: string;
  description: string;
  features: string[];
}

const OurOffice = () => {
  const [selectedOffice, setSelectedOffice] = useState<number>(0);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const mapRef = useRef<LeafletMap | null>(null);

  // Office locations data
  const offices: OfficeLocation[] = [
    {
      id: 1,
      name: "Colombo Headquarters",
      address: "123 Galle Road, Colombo 03",
      city: "Colombo",
      country: "Sri Lanka",
      postalCode: "00300",
      phone: "+94 11 234 5678",
      email: "colombo@felicita.com",
      lat: 6.9271,
      lng: 79.8612,
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      workingHours: "Mon - Fri: 8:30 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",
      description: "Our flagship office located in the heart of Colombo. This modern facility serves as our main operations center and welcomes visitors for consultations.",
      features: ["Free Wi-Fi", "Parking Available", "Meeting Rooms", "Coffee Station", "Tourist Information", "Multilingual Staff"]
    },
    {
      id: 2,
      name: "Kandy Branch Office",
      address: "45 Dalada Veediya, Kandy",
      city: "Kandy",
      country: "Sri Lanka",
      postalCode: "20000",
      phone: "+94 81 234 5678",
      email: "kandy@felicita.com",
      lat: 7.2906,
      lng: 80.6337,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      workingHours: "Mon - Fri: 8:30 AM - 5:30 PM, Sat: 9:00 AM - 1:00 PM",
      description: "Located in the cultural capital, our Kandy office specializes in cultural tours and hill country expeditions.",
      features: ["Cultural Tours Desk", "Local Guide Services", "Currency Exchange", "Hotel Bookings", "Transport Services"]
    },
    {
      id: 3,
      name: "Galle Southern Office",
      address: "78 Church Street, Galle Fort",
      city: "Galle",
      country: "Sri Lanka",
      postalCode: "80000",
      phone: "+94 91 234 5678",
      email: "galle@felicita.com",
      lat: 6.0535,
      lng: 80.2210,
      imageUrl: "https://images.unsplash.com/photo-1592201426555-45a73ac6c5e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      workingHours: "Mon - Fri: 9:00 AM - 5:00 PM, Sat: 9:00 AM - 12:00 PM",
      description: "Situated in the historic Galle Fort, this office focuses on beach tours, wildlife safaris, and southern coast adventures.",
      features: ["Beach Tour Planning", "Wildlife Safari Bookings", "Water Sports", "Luxury Transport", "Hotel Reservations"]
    }
  ];

  const currentOffice = offices[selectedOffice];

  // Image component with fallback
  const OfficeImage = ({ src, alt }: { src: string; alt: string }) => {
    const [imgSrc, setImgSrc] = useState(src);
    
    return (
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => {
            setImgSrc("/images/default-office.jpg");
          }}
        />
      </div>
    );
  };

  // Initialize OpenStreetMap
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapLoaded) {
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
        document.head.removeChild(script);
        document.head.removeChild(link);
      };
    }
  }, [mapLoaded]);

  // Initialize map when component mounts or office changes
  useEffect(() => {
    if (mapLoaded && typeof window !== 'undefined' && window.L) {
      const L = window.L;
      const mapContainer = document.getElementById('map');
      
      if (L && mapContainer) {
        // Remove existing map if any
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }

        // Clear container
        mapContainer.innerHTML = '';

        // Initialize map
        const map = L.map(mapContainer).setView([currentOffice.lat, currentOffice.lng], 15);
        mapRef.current = map;

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add custom marker
        const customIcon = L.divIcon({
          html: `
            <div class="relative">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
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

        // Add marker
        const marker = L.marker([currentOffice.lat, currentOffice.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div class="p-2">
              <strong class="text-blue-600">${currentOffice.name}</strong><br>
              ${currentOffice.address}<br>
              ${currentOffice.city}, ${currentOffice.country}
            </div>
          `);

        // Cleanup
        return () => {
          if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
          }
        };
      }
    }
  }, [mapLoaded, currentOffice]);

  return (
    <section className="py-4 md:py-8 lg:py-12 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Offices</span>
          </h1>
          <div className="w-24 h-1.5 bg-amber-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Visit us at any of our conveniently located offices across Sri Lanka. 
            Our friendly team is ready to help plan your perfect journey.
          </p>
        </div>

        {/* Office Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {offices.map((office, index) => (
            <button
              key={office.id}
              onClick={() => setSelectedOffice(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedOffice === index
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform -translate-y-1'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {office.city}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Office Details */}
          <div className="space-y-8">
            {/* Office Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <OfficeImage src={currentOffice.imageUrl} alt={currentOffice.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-semibold shadow-lg">
                  {currentOffice.name}
                </span>
              </div>
            </div>

            {/* Office Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Office Details
              </h2>
              
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-600">{currentOffice.address}</p>
                        <p className="text-gray-600">{currentOffice.city}, {currentOffice.country}</p>
                        <p className="text-gray-600">Postal: {currentOffice.postalCode}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-600">{currentOffice.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">{currentOffice.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                        <p className="text-gray-600 whitespace-pre-line">{currentOffice.workingHours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About This Office</h3>
                  <p className="text-gray-600 leading-relaxed">{currentOffice.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-amber-600" />
                    Office Features
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {currentOffice.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {feature === 'Free Wi-Fi' && <Wifi className="w-4 h-4 text-blue-500" />}
                        {feature === 'Parking Available' && <Car className="w-4 h-4 text-green-500" />}
                        {feature === 'Coffee Station' && <Coffee className="w-4 h-4 text-amber-500" />}
                        {feature === 'Multilingual Staff' && <Users className="w-4 h-4 text-purple-500" />}
                        {!['Free Wi-Fi', 'Parking Available', 'Coffee Station', 'Multilingual Staff'].includes(feature) && 
                          <div className="w-4 h-4 rounded-full bg-blue-100"></div>}
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-8">
            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[400px] md:h-[500px] relative">
              <div id="map" className="w-full h-full"></div>
              
              {/* Map Loading State */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}

              {/* Map Controls */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2">
                <div className="text-sm font-medium text-gray-700">
                  <span className="text-blue-600">{currentOffice.city}</span> Office
                </div>
              </div>
            </div>

            {/* Directions & Additional Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Getting Here
              </h3>
              
              <div className="space-y-6">
                {/* Transportation */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Transportation Options</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-blue-600 font-bold mb-1">Tuk-tuk</div>
                      <div className="text-sm text-gray-600">Available throughout the city</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-green-600 font-bold mb-1">Taxi</div>
                      <div className="text-sm text-gray-600">Book via app or phone</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="text-purple-600 font-bold mb-1">Bus</div>
                      <div className="text-sm text-gray-600">Multiple routes available</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <div className="text-amber-600 font-bold mb-1">Parking</div>
                      <div className="text-sm text-gray-600">Available on premises</div>
                    </div>
                  </div>
                </div>

                {/* Best Time to Visit */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Best Time to Visit</h4>
                  <p className="text-gray-600">
                    Weekday mornings (9:00 AM - 11:00 AM) are usually the quietest. 
                    We recommend booking an appointment for personalized consultations.
                  </p>
                </div>

                {/* Services Available */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Services Available</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-sm">
                      Tour Planning
                    </span>
                    <span className="px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-full text-sm">
                      Hotel Bookings
                    </span>
                    <span className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-full text-sm">
                      Transport
                    </span>
                    <span className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 rounded-full text-sm">
                      Visa Assistance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto border border-blue-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Ready to Visit Us?
            </h3>
            <p className="text-gray-600">
              Schedule an appointment for a personalized travel consultation
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Book Appointment
              </button>
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300">
                Call Now: {currentOffice.phone}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leaflet CSS */}
      <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
        }
        
        .leaflet-popup-content {
          margin: 12px !important;
          font-size: 14px;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 0.75rem !important;
          border: 2px solid #3b82f6;
        }
      `}</style>
    </section>
  );
};

export default OurOffice;