// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import { MapPin, Clock, AlertCircle, Navigation, Building, Check, Phone, Mail, Globe, Users, Car, Wifi, Coffee } from 'lucide-react';
// import Image from 'next/image';

// // Define Leaflet types
// interface LeafletMap {
//   remove: () => void;
//   setView: (coords: [number, number], zoom: number) => LeafletMap;
//   fitBounds: (bounds: [[number, number]], options?: { padding: [number, number], maxZoom: number }) => LeafletMap;
// }

// interface LeafletTileLayer {
//   addTo: (map: LeafletMap) => void;
// }

// interface LeafletMarker {
//   remove: () => void;
//   addTo: (map: LeafletMap) => LeafletMarker;
//   bindPopup: (content: string) => LeafletMarker;
//   setLatLng: (coords: [number, number]) => LeafletMarker;
//   setPopupContent: (content: string) => LeafletMarker;
// }

// interface LeafletControl {
//   L: {
//     map: (element: HTMLElement) => LeafletMap;
//     tileLayer: (url: string, options: unknown) => LeafletTileLayer;
//     marker: (coords: [number, number], options?: { icon?: unknown }) => LeafletMarker;
//     divIcon: (options: unknown) => unknown;
//   };
// }

// declare global {
//   interface Window {
//     L: LeafletControl["L"] | undefined;
//   }
// }

// interface OfficeInfo {
//   id: number;
//   name: string;
//   address: string;
//   city: string;
//   country: string;
//   phone: string;
//   email: string;
//   lat: number;
//   lng: number;
//   appointmentRequired: boolean;
//   workingHours: string;
//   imageUrl: string;
//   features: string[];
//   landmarks?: string[];
//   description?: string;
// }

// const ContactUsOffice = () => {
//   const [selectedOffice, setSelectedOffice] = useState<number>(0);
//   const [mapLoaded, setMapLoaded] = useState<boolean>(false);
//   const mapRef = useRef<LeafletMap | null>(null);
//   const markerRef = useRef<LeafletMarker | null>(null);

//   const offices: OfficeInfo[] = [
//     {
//       id: 1,
//       name: "Colombo Headquarters",
//       address: "123 Galle Road, Colombo 03",
//       city: "Colombo",
//       country: "Sri Lanka",
//       phone: "+94 11 234 5678",
//       email: "colombo@felicita.com",
//       lat: 6.9271,
//       lng: 79.8612,
//       appointmentRequired: true,
//       workingHours: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM\nSun: Closed",
//       imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       features: ["Free Wi-Fi", "Parking Available", "Meeting Rooms", "Coffee Station", "Multilingual Staff"],
//       landmarks: [
//         "Galle Face Green (5 min walk)",
//         "Colombo City Center (10 min drive)",
//         "Dutch Hospital Shopping Precinct (15 min drive)"
//       ],
//       description: "Main office located in the heart of Colombo's business district."
//     },
//     {
//       id: 2,
//       name: "Kandy Branch Office",
//       address: "45 Dalada Veediya, Kandy",
//       city: "Kandy",
//       country: "Sri Lanka",
//       phone: "+94 81 234 5678",
//       email: "kandy@felicita.com",
//       lat: 7.2906,
//       lng: 80.6337,
//       appointmentRequired: false,
//       workingHours: "Mon-Fri: 8:30 AM - 5:30 PM\nSat: 9:00 AM - 1:00 PM\nSun: Closed",
//       imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       features: ["Cultural Tours Desk", "Local Guide Services", "Currency Exchange", "Hotel Bookings", "Transport Services"],
//       landmarks: [
//         "Temple of the Tooth (10 min walk)",
//         "Kandy Lake (5 min walk)",
//         "Royal Botanical Gardens (15 min drive)"
//       ],
//       description: "Cultural tours and hill country expeditions specialist."
//     },
//     {
//       id: 3,
//       name: "Galle Southern Office",
//       address: "78 Church Street, Galle Fort",
//       city: "Galle",
//       country: "Sri Lanka",
//       phone: "+94 91 234 5678",
//       email: "galle@felicita.com",
//       lat: 6.0535,
//       lng: 80.2210,
//       appointmentRequired: true,
//       workingHours: "Mon-Fri: 9:00 AM - 5:00 PM\nSat: 9:00 AM - 12:00 PM\nSun: Closed",
//       imageUrl: "https://images.unsplash.com/photo-1592201426555-45a73ac6c5e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       features: ["Beach Tour Planning", "Wildlife Safari Bookings", "Water Sports", "Luxury Transport", "Hotel Reservations"],
//       landmarks: [
//         "Galle Fort (2 min walk)",
//         "Unawatuna Beach (15 min drive)",
//         "Hikkaduwa Beach (30 min drive)"
//       ],
//       description: "Beach tours and southern coast adventures specialist."
//     }
//   ];

//   const currentOffice = offices[selectedOffice];

//   // Image component with fallback
//   const OfficeImage = ({ src, alt }: { src: string; alt: string }) => {
//     const [imgSrc, setImgSrc] = useState(src);
    
//     return (
//       <div className="relative w-full h-64 md:h-80">
//         <Image
//           src={imgSrc}
//           alt={alt}
//           fill
//           className="object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
//           sizes="(max-width: 768px) 100vw, 50vw"
//           onError={() => {
//             setImgSrc("/images/default-office.jpg");
//           }}
//         />
//       </div>
//     );
//   };

//   // Load OpenStreetMap script
//   useEffect(() => {
//     if (typeof window !== 'undefined' && !mapLoaded) {
//       // Check if Leaflet is already loaded
//       if (window.L) {
//         setMapLoaded(true);
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
//       script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
//       script.crossOrigin = '';
//       script.onload = () => setMapLoaded(true);
//       document.head.appendChild(script);

//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//       link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
//       link.crossOrigin = '';
//       document.head.appendChild(link);

//       return () => {
//         // Only remove if we're the ones who added it
//         const existingScript = document.querySelector('script[src*="leaflet"]');
//         if (existingScript && existingScript.parentNode) {
//           document.head.removeChild(existingScript);
//         }
//         const existingLink = document.querySelector('link[href*="leaflet"]');
//         if (existingLink && existingLink.parentNode) {
//           document.head.removeChild(existingLink);
//         }
//       };
//     }
//   }, [mapLoaded]);

//   // Initialize map when loaded or office changes
//   useEffect(() => {
//     if (mapLoaded && typeof window !== 'undefined' && window.L) {
//       const L = window.L;
//       const mapContainer = document.getElementById('map');
      
//       if (!mapContainer) return;

//       // Remove existing map if any
//       if (mapRef.current) {
//         mapRef.current.remove();
//       }
//       if (markerRef.current) {
//         markerRef.current.remove();
//       }

//       // Clear container
//       mapContainer.innerHTML = '';

//       // Initialize map
//       const map = L.map(mapContainer).setView([currentOffice.lat, currentOffice.lng], 16);
//       mapRef.current = map;

//       // Add OpenStreetMap tiles
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors',
//         maxZoom: 19,
//       }).addTo(map);

//       // Create custom icon
//       const customIcon = L.divIcon({
//         html: `
//           <div class="relative">
//             <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                 <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
//                 <circle cx="12" cy="10" r="3"/>
//               </svg>
//             </div>
//             <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"></div>
//           </div>
//         `,
//         className: '',
//         iconSize: [48, 48],
//         iconAnchor: [24, 48],
//         popupAnchor: [0, -48]
//       });

//       // Add marker
//       markerRef.current = L.marker([currentOffice.lat, currentOffice.lng], { 
//         icon: customIcon 
//       })
//         .addTo(map)
//         .bindPopup(`
//           <div class="p-2 min-w-[200px]">
//             <strong class="text-blue-600">${currentOffice.name}</strong><br>
//             <span class="text-sm">${currentOffice.address}</span><br>
//             <span class="text-sm">${currentOffice.city}, ${currentOffice.country}</span>
//           </div>
//         `);

//       // Fit bounds
//       map.fitBounds([[currentOffice.lat, currentOffice.lng]], {
//         padding: [50, 50],
//         maxZoom: 16
//       });
//     }
//   }, [mapLoaded, currentOffice]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   // Handle office selection
//   const handleOfficeSelect = (index: number) => {
//     setSelectedOffice(index);
//   };

//   return (
//     <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
//       <div className="container mx-auto max-w-6xl">
        
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Our <span className="text-blue-600">Offices</span>
//           </h2>
//           <div className="w-24 h-1.5 bg-amber-400 mx-auto mb-6 rounded-full"></div>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Visit us at any of our conveniently located offices across Sri Lanka. 
//             Our friendly team is ready to help plan your perfect journey.
//           </p>
//         </div>

//         {/* Office Selection Tabs */}
//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           {offices.map((office, index) => (
//             <button
//               key={office.id}
//               onClick={() => handleOfficeSelect(index)}
//               className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
//                 selectedOffice === index
//                   ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform -translate-y-1'
//                   : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
//               }`}
//             >
//               <MapPin className="w-4 h-4" />
//               {office.city}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
//           {/* Left Column - Office Details */}
//           <div className="space-y-8">
//             {/* Office Image */}
//             <div className="relative rounded-2xl overflow-hidden shadow-xl group">
//               <OfficeImage src={currentOffice.imageUrl} alt={currentOffice.name} />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
//               <div className="absolute bottom-6 left-6">
//                 <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-semibold shadow-lg">
//                   {currentOffice.name}
//                 </span>
//               </div>
//             </div>

//             {/* Office Information Card */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//               <div className="flex items-start gap-4 mb-6">
//                 <div className="p-3 bg-teal-50 rounded-lg">
//                   <Building className="w-6 h-6 text-teal-600" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                     {currentOffice.name}
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3 text-gray-600">
//                       <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="font-medium">{currentOffice.address}</p>
//                         <p>{currentOffice.city}, {currentOffice.country}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3 text-gray-600">
//                       <Phone className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="font-medium">{currentOffice.phone}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3 text-gray-600">
//                       <Mail className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="font-medium">{currentOffice.email}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               {currentOffice.description && (
//                 <div className="mb-6">
//                   <h4 className="font-semibold text-gray-800 mb-2">About This Office</h4>
//                   <p className="text-gray-600 leading-relaxed">{currentOffice.description}</p>
//                 </div>
//               )}

//               {/* Working Hours */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Clock className="w-5 h-5 text-blue-500" />
//                   <h4 className="font-semibold text-gray-800">Working Hours</h4>
//                 </div>
//                 <div className="bg-blue-50 rounded-xl p-4">
//                   <pre className="text-gray-700 whitespace-pre-line text-sm font-medium">
//                     {currentOffice.workingHours}
//                   </pre>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="mb-6">
//                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   <Globe className="w-5 h-5 text-amber-600" />
//                   Office Features
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {currentOffice.features.map((feature, index) => (
//                     <span
//                       key={index}
//                       className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-sm font-medium"
//                     >
//                       {feature === 'Free Wi-Fi' && <Wifi className="w-4 h-4" />}
//                       {feature === 'Parking Available' && <Car className="w-4 h-4" />}
//                       {feature === 'Coffee Station' && <Coffee className="w-4 h-4" />}
//                       {feature === 'Multilingual Staff' && <Users className="w-4 h-4" />}
//                       {!['Free Wi-Fi', 'Parking Available', 'Coffee Station', 'Multilingual Staff'].includes(feature) && 
//                         <div className="w-4 h-4 rounded-full bg-blue-100"></div>}
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Appointment Notice */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <AlertCircle className="w-5 h-5 text-amber-500" />
//                   <h4 className="font-semibold text-gray-800">
//                     {currentOffice.appointmentRequired ? 'Appointment Required' : 'Walk-ins Welcome'}
//                   </h4>
//                 </div>
//                 <div className={`rounded-xl p-4 ${
//                   currentOffice.appointmentRequired 
//                     ? 'bg-amber-50 border border-amber-100' 
//                     : 'bg-green-50 border border-green-100'
//                 }`}>
//                   <p className="text-gray-700">
//                     {currentOffice.appointmentRequired 
//                       ? 'Please schedule an appointment before visiting for personalized consultations.'
//                       : 'You can visit us anytime during working hours without an appointment.'}
//                   </p>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-wrap gap-4">
//                 <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   Book Appointment
//                 </button>
//                 <a
//                   href={`https://www.openstreetmap.org/directions?engine=graphhopper_car&route=0;${currentOffice.lng}%2C${currentOffice.lat}#map=16/${currentOffice.lat}/${currentOffice.lng}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-6 py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-2"
//                 >
//                   <Navigation className="w-5 h-5" />
//                   Get Directions
//                 </a>
//               </div>
//             </div>

//             {/* Nearby Landmarks */}
//             {currentOffice.landmarks && currentOffice.landmarks.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   Nearby Landmarks
//                 </h4>
//                 <ul className="space-y-3">
//                   {currentOffice.landmarks.map((landmark, index) => (
//                     <li key={index} className="flex items-center gap-3 text-gray-600">
//                       <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
//                       <span>{landmark}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Map & Additional Info */}
//           <div className="space-y-8">
//             {/* Map Container */}
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[400px] md:h-[500px] relative">
//               <div id="map" className="w-full h-full"></div>
              
//               {/* Map Loading State */}
//               {!mapLoaded && (
//                 <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-2xl">
//                   <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading map...</p>
//                   </div>
//                 </div>
//               )}

//               {/* Map Controls */}
//               <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
//                 <div className="text-sm font-medium text-gray-700">
//                   <span className="text-blue-600">{currentOffice.city}</span> Office
//                 </div>
//               </div>
//             </div>

//             {/* All Offices Quick View */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">
//                 All Our Offices
//               </h4>
//               <div className="space-y-4">
//                 {offices.map((office, index) => (
//                   <div 
//                     key={office.id}
//                     className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
//                       selectedOffice === index
//                         ? 'border-blue-300 bg-blue-50 transform scale-[1.02]'
//                         : 'border-gray-200 hover:bg-gray-50'
//                     }`}
//                     onClick={() => handleOfficeSelect(index)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-3 h-3 rounded-full ${
//                           selectedOffice === index ? 'bg-blue-500' : 'bg-gray-300'
//                         }`}></div>
//                         <div>
//                           <h5 className="font-semibold text-gray-800">{office.name}</h5>
//                           <p className="text-sm text-gray-600">{office.city}</p>
//                         </div>
//                       </div>
//                       <span className="text-sm font-medium text-blue-600">
//                         {office.phone.split(' ')[0]}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Contact & Additional Info */}
//             <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 text-white">
//               <h4 className="text-xl font-bold mb-4">Need Assistance?</h4>
//               <p className="mb-4 text-blue-100">
//                 Contact the {currentOffice.city} office directly:
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-5 h-5" />
//                     <span className="font-medium">Phone:</span>
//                   </div>
//                   <a 
//                     href={`tel:${currentOffice.phone.replace(/\s+/g, '')}`}
//                     className="text-lg font-bold hover:text-white"
//                   >
//                     {currentOffice.phone}
//                   </a>
//                 </div>
//                 <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                   <div className="flex items-center gap-3">
//                     <Mail className="w-5 h-5" />
//                     <span className="font-medium">Email:</span>
//                   </div>
//                   <a 
//                     href={`mailto:${currentOffice.email}`}
//                     className="text-lg font-bold hover:text-white"
//                   >
//                     {currentOffice.email}
//                   </a>
//                 </div>
//               </div>
              
//               <div className="mt-6 pt-6 border-t border-blue-400">
//                 <h5 className="font-semibold mb-2">Getting Here</h5>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//                     <div className="font-bold mb-1">Tuk-tuk</div>
//                     <div className="text-sm text-blue-100">Readily available</div>
//                   </div>
//                   <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//                     <div className="font-bold mb-1">Taxi</div>
//                     <div className="text-sm text-blue-100">App booking</div>
//                   </div>
//                   <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//                     <div className="font-bold mb-1">Bus</div>
//                     <div className="text-sm text-blue-100">Multiple routes</div>
//                   </div>
//                   <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//                     <div className="font-bold mb-1">Parking</div>
//                     <div className="text-sm text-blue-100">Available</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 pt-6 border-t border-blue-400">
//                 <p className="text-sm text-blue-100">
//                   For immediate assistance, call our 24/7 emergency line: 
//                   <a href="tel:+94771234567" className="font-bold ml-2 hover:text-white">
//                     +94 77 123 4567
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex flex-col items-center gap-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto border border-blue-100">
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
//               Ready to Visit Us?
//             </h3>
//             <p className="text-gray-600">
//               Schedule an appointment for a personalized travel consultation
//             </p>
//             <div className="flex flex-wrap gap-4 justify-center">
//               <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
//                 Book Appointment
//               </button>
//               <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300">
//                 Call Now: {currentOffice.phone}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Leaflet CSS styles */}
//       <style jsx global>{`
//         .leaflet-container {
//           width: 100%;
//           height: 100%;
//           border-radius: 1rem;
//           z-index: 1;
//         }
        
//         .leaflet-popup-content {
//           margin: 12px !important;
//           font-size: 14px;
//         }
        
//         .leaflet-popup-content-wrapper {
//           border-radius: 0.75rem !important;
//           border: 2px solid #3b82f6;
//         }
        
//         .leaflet-control-attribution {
//           font-size: 11px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ContactUsOffice;

import React from 'react'

const ContactUsOffice = () => {
  return (
    <div>
      
    </div>
  )
}

export default ContactUsOffice
