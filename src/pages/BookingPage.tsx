"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

// Types (same as before)
interface PackageSchedule {
  packageScheduleId: number;
  packageScheduleName: string;
  packageScheduleDescription: string;
  startDate: string;
  endDate: string;
}

interface Package {
  packageId: number;
  packageName: string;
  packageDescription: string;
  packageSchedulesDetails: PackageSchedule[];
}

interface Tour {
  tourId: number;
  tourName: string;
  tourDescription: string;
  packageDetails: Package[];
}

interface Participant {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  passportNumber: string;
  country: string;
  email: string;
  mobileNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  medicalConditions: string;
  allergies: string;
  specialAssistanceRequired: boolean;
  assistantDetails: string | null;
  roomSharingWith: string | null;
}

interface BookingPrice {
  itemType: string;
  itemName: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Transport {
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  departureLocation: string;
  arrivalLocation: string;
}

interface BookingNote {
  noteType: string;
  noteText: string;
}

interface Activity {
  activityScheduleId: number;
  numberOfParticipants: number;
}

interface Invoice {
  billingFullName: string;
  billingAddress: string;
  billingEmail: string;
  billingPhone: string;
}

interface BookingFormData {
  packageScheduleId: number;
  specialRequirements: string;
  dietaryRestrictions: string;
  insuranceRequired: boolean;
  transport: Transport;
  bookingPrices: BookingPrice[];
  participants: Participant[];
  bookingNotes: BookingNote[];
  activities: Activity[];
  invoices: Invoice;
}

// Receipt Types
interface ParticipantDetail {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  passportNumber: string;
  nationality: string;
  email: string;
  mobileNumber: string;
  medicalConditions: string;
  allergies: string;
}

interface ActivityDetail {
  activityName: string;
  activityDescription: string;
  numberOfParticipants: number;
  pricePerPerson: number;
  totalPrice: number;
}

interface DestinationDetail {
  destinationName: string;
  destinationDescription: string;
  extraPrice: number;
  extraPriceNote: string;
}

interface AccommodationDetail {
  dayNumber: number;
  hotelName: string;
  transportPrice: number;
  price: number;
  discount: number;
  serviceCharge: number;
  tax: number;
  extraCharge: number;
  extraChargeNote: string;
}

interface ReceiptData {
  bookingId: number;
  bookingReference: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  insuranceAmount: number | null;
  packagePrice: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  billingFullName: string;
  billingAddress: string;
  billingEmail: string;
  billingPhone: string;
  packageName: string;
  packageScheduleId: number;
  assumeStartDate: string;
  assumeEndDate: string;
  tourName: string;
  tourDescription: string;
  finalAmount: number;
  bookingDate: string;
  bookingStatus: string;
  participentDetails: ParticipantDetail[];
  activityDetailsList: ActivityDetail[];
  destiantionDetails: DestinationDetail[];
  accommodationDetailsList: AccommodationDetail[];
}

// Custom Components with Purple & Amber Theme
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md border border-purple-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-amber-50 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Label = ({ children, htmlFor, className = '' }: { children: React.ReactNode; htmlFor?: string; className?: string }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-900 mb-1 ${className}`}>
    {children}
  </label>
);

const Input = ({ 
  type = 'text', 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  required = false,
  readOnly = false,
  min,
  step
}: any) => (
  <input
    type={type}
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    readOnly={readOnly}
    min={min}
    step={step}
    className={`w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 ${className}`}
  />
);

const Textarea = ({ 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  rows = 3,
  required = false 
}: any) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    required={required}
    className={`w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 ${className}`}
  />
);

const Select = ({ 
  id, 
  name, 
  value, 
  onChange, 
  children, 
  className = '', 
  disabled = false 
}: any) => (
  <select
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 ${className}`}
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }: any) => (
  <option value={value} className="text-gray-900">{children}</option>
);

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '',
  disabled = false 
}: any) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 focus:ring-purple-500',
    secondary: 'bg-gradient-to-r from-amber-600 to-amber-800 text-white hover:from-amber-700 hover:to-amber-900 focus:ring-amber-500',
    outline: 'border border-purple-300 text-gray-900 hover:bg-purple-50 focus:ring-purple-500',
    ghost: 'text-gray-900 hover:bg-purple-50 focus:ring-purple-500'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Switch = ({ checked, onCheckedChange, id }: any) => (
  <button
    type="button"
    id={id}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

const Separator = ({ className = '' }: { className?: string }) => (
  <hr className={`border-t border-purple-200 ${className}`} />
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

const Toast = ({ message, type = 'error', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-md shadow-lg ${
      type === 'success' ? 'bg-green-100 text-green-900 border border-green-200' : 'bg-red-100 text-red-900 border border-red-200'
    }`}>
      <div className="flex justify-between items-center">
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 text-lg">&times;</button>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageScheduleName = searchParams.get("packageScheduleName") || "";
  const packageScheduleId = searchParams.get("packageScheduleId") || "";

  // States
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Filter states
  const [selectedTourId, setSelectedTourId] = useState<string>("");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");

  // Form states
  const [formData, setFormData] = useState<BookingFormData>({
    packageScheduleId: packageScheduleId ? parseInt(packageScheduleId) : 0,
    specialRequirements: "",
    dietaryRestrictions: "",
    insuranceRequired: false,
    transport: {
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      departureLocation: "",
      arrivalLocation: ""
    },
    bookingPrices: [
      {
        itemType: "PACKAGE",
        itemName: "",
        itemDescription: "",
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0
      }
    ],
    participants: [
      {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        passportNumber: "",
        country: "",
        email: "",
        mobileNumber: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelationship: "",
        medicalConditions: "",
        allergies: "",
        specialAssistanceRequired: false,
        assistantDetails: null,
        roomSharingWith: null
      }
    ],
    bookingNotes: [
      {
        noteType: "CUSTOMER",
        noteText: ""
      }
    ],
    activities: [
      {
        activityScheduleId: 0,
        numberOfParticipants: 1
      }
    ],
    invoices: {
      billingFullName: "",
      billingAddress: "",
      billingEmail: "",
      billingPhone: ""
    }
  });

  // Show toast message
  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ message, type });
  };

  // Fetch filter data
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const response = await fetch('http://localhost:8080/felicita/api/v0/booking/book-tour-filter', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTours(data.data);
        
        if (packageScheduleId) {
          const scheduleId = parseInt(packageScheduleId);
          let foundSchedule = false;
          
          for (const tour of data.data) {
            for (const pkg of tour.packageDetails) {
              const schedule = pkg.packageSchedulesDetails.find((s: PackageSchedule) => s.packageScheduleId === scheduleId);
              if (schedule) {
                setSelectedTourId(tour.tourId.toString());
                setSelectedPackageId(pkg.packageId.toString());
                setSelectedScheduleId(scheduleId.toString());
                setShowForm(true);
                foundSchedule = true;
                break;
              }
            }
            if (foundSchedule) break;
          }
        }
      } catch (error) {
        console.error('Error fetching filter data:', error);
        showToast('Failed to load tour data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, [packageScheduleId]);

  // Get selected tour
  const selectedTour = tours.find(t => t.tourId.toString() === selectedTourId);

  // Get selected package
  const selectedPackage = selectedTour?.packageDetails.find(p => p.packageId.toString() === selectedPackageId);

  // Get selected schedule
  const selectedSchedule = selectedPackage?.packageSchedulesDetails.find(s => s.packageScheduleId.toString() === selectedScheduleId);

  // Handle filter changes
  const handleTourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTourId(e.target.value);
    setSelectedPackageId("");
    setSelectedScheduleId("");
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPackageId(e.target.value);
    setSelectedScheduleId("");
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const scheduleId = e.target.value;
    setSelectedScheduleId(scheduleId);
    setFormData(prev => ({
      ...prev,
      packageScheduleId: scheduleId ? parseInt(scheduleId) : 0
    }));
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTransportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      transport: {
        ...prev.transport,
        [name]: value
      }
    }));
  };

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      invoices: {
        ...prev.invoices,
        [name]: value
      }
    }));
  };

  // Handle participant changes
  const handleParticipantChange = (index: number, field: keyof Participant, value: string | boolean) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      participants: updatedParticipants
    }));
  };

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [
        ...prev.participants,
        {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          passportNumber: "",
          country: "",
          email: "",
          mobileNumber: "",
          emergencyContactName: "",
          emergencyContactPhone: "",
          emergencyContactRelationship: "",
          medicalConditions: "",
          allergies: "",
          specialAssistanceRequired: false,
          assistantDetails: null,
          roomSharingWith: null
        }
      ]
    }));
  };

  const removeParticipant = (index: number) => {
    if (formData.participants.length > 1) {
      const updatedParticipants = [...formData.participants];
      updatedParticipants.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        participants: updatedParticipants
      }));
    }
  };

  // Handle booking price changes
  const handleBookingPriceChange = (index: number, field: keyof BookingPrice, value: string | number) => {
    const updatedPrices = [...formData.bookingPrices];
    updatedPrices[index] = {
      ...updatedPrices[index],
      [field]: field === 'quantity' || field === 'unitPrice' || field === 'totalPrice' 
        ? (typeof value === 'string' ? parseFloat(value) || 0 : value)
        : value
    };
    
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' 
        ? (typeof value === 'string' ? parseFloat(value) || 0 : value)
        : updatedPrices[index].quantity;
      const unitPrice = field === 'unitPrice'
        ? (typeof value === 'string' ? parseFloat(value) || 0 : value)
        : updatedPrices[index].unitPrice;
      
      updatedPrices[index].totalPrice = quantity * unitPrice;
    }
    
    setFormData(prev => ({
      ...prev,
      bookingPrices: updatedPrices
    }));
  };

  const addBookingPrice = () => {
    setFormData(prev => ({
      ...prev,
      bookingPrices: [
        ...prev.bookingPrices,
        {
          itemType: "EXTRA",
          itemName: "",
          itemDescription: "",
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0
        }
      ]
    }));
  };

  const removeBookingPrice = (index: number) => {
    if (formData.bookingPrices.length > 1) {
      const updatedPrices = [...formData.bookingPrices];
      updatedPrices.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        bookingPrices: updatedPrices
      }));
    }
  };

  // Handle activity changes
  const handleActivityChange = (index: number, field: keyof Activity, value: number) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      activities: updatedActivities
    }));
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [
        ...prev.activities,
        {
          activityScheduleId: 0,
          numberOfParticipants: 1
        }
      ]
    }));
  };

  const removeActivity = (index: number) => {
    if (formData.activities.length > 1) {
      const updatedActivities = [...formData.activities];
      updatedActivities.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        activities: updatedActivities
      }));
    }
  };

  // Handle booking note changes
  const handleBookingNoteChange = (index: number, field: keyof BookingNote, value: string) => {
    const updatedNotes = [...formData.bookingNotes];
    updatedNotes[index] = {
      ...updatedNotes[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      bookingNotes: updatedNotes
    }));
  };

  const addBookingNote = () => {
    setFormData(prev => ({
      ...prev,
      bookingNotes: [
        ...prev.bookingNotes,
        {
          noteType: "CUSTOMER",
          noteText: ""
        }
      ]
    }));
  };

  const removeBookingNote = (index: number) => {
    if (formData.bookingNotes.length > 1) {
      const updatedNotes = [...formData.bookingNotes];
      updatedNotes.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        bookingNotes: updatedNotes
      }));
    }
  };

  // Handle form submission using fetch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.packageScheduleId) {
      showToast('Please select a package schedule', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/felicita/api/v0/booking/book-tour', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.code === 200) {
        const newBookingId = result.data.bookingId;
        setBookingId(newBookingId);
        showToast('Booking submitted successfully!', 'success');
        
        // Fetch receipt data
        await fetchReceiptData(newBookingId);
      } else {
        showToast('Failed to submit booking', 'error');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      showToast('Error submitting booking', 'error');
    }
  };

  // Fetch receipt data using fetch
  const fetchReceiptData = async (bookingId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/felicita/api/v0/booking/book-receipt/${bookingId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.code === 200) {
        setReceiptData(result.data);
        setShowReceipt(true);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error fetching receipt:', error);
      showToast('Failed to load receipt', 'error');
    }
  };

  // Calculate accommodation total per person using your backend logic
  const calculateAccommodationTotalPerPerson = (accommodations: AccommodationDetail[]): number => {
    let totalAmount = 0.0;
    
    for (const p of accommodations) {
      const priceWithServiceCharge = p.price * (100.0 + p.serviceCharge) / 100;
      const discount = priceWithServiceCharge * p.discount / 100;
      const tax = priceWithServiceCharge * p.tax / 100;
      const total = priceWithServiceCharge - discount + tax + p.extraCharge + p.transportPrice;
      totalAmount += total;
    }
    
    return totalAmount;
  };

  // Calculate activity total per person using your backend logic
  const calculateActivityTotalPerPerson = (activities: ActivityDetail[]): number => {
    let totalAmount = 0.0;
    
    for (const p of activities) {
      totalAmount += p.pricePerPerson;
    }
    
    return totalAmount;
  };

  // Calculate destination extra total per person using your backend logic
  const calculateDestinationExtraTotalPerPerson = (destinations: DestinationDetail[]): number => {
    let totalAmount = 0.0;
    
    for (const p of destinations) {
      totalAmount += p.extraPrice;
    }
    
    return totalAmount;
  };

  // Calculate totals with participant count using your backend logic
  const calculateTotals = () => {
    if (!receiptData) return {
      activitiesTotalPerPerson: 0,
      destinationsTotalPerPerson: 0,
      accommodationsTotalPerPerson: 0,
      activitiesTotal: 0,
      destinationsTotal: 0,
      accommodationsTotal: 0,
      calculatedSubtotal: 0,
      participantsCount: 0
    };

    const participantsCount = receiptData.participentDetails.length;
    
    const activitiesTotalPerPerson = calculateActivityTotalPerPerson(receiptData.activityDetailsList);
    const destinationsTotalPerPerson = calculateDestinationExtraTotalPerPerson(receiptData.destiantionDetails);
    const accommodationsTotalPerPerson = calculateAccommodationTotalPerPerson(receiptData.accommodationDetailsList);
    
    const activitiesTotal = activitiesTotalPerPerson * participantsCount;
    const destinationsTotal = destinationsTotalPerPerson * participantsCount;
    const accommodationsTotal = accommodationsTotalPerPerson * participantsCount;

    const calculatedSubtotal = activitiesTotal + destinationsTotal + accommodationsTotal + receiptData.packagePrice;

    return {
      activitiesTotalPerPerson,
      destinationsTotalPerPerson,
      accommodationsTotalPerPerson,
      activitiesTotal,
      destinationsTotal,
      accommodationsTotal,
      calculatedSubtotal,
      participantsCount
    };
  };

  // Generate receipt content for download
  const generateReceiptContent = () => {
    if (!receiptData) return '';
    
    const totals = calculateTotals();
    const subtotalDifference = totals.calculatedSubtotal - receiptData.subtotal;
    
    let content = `========================================\n`;
    content += `         BOOKING RECEIPT\n`;
    content += `========================================\n\n`;
    content += `Booking ID: ${receiptData.bookingId}\n`;
    content += `Booking Reference: ${receiptData.bookingReference}\n`;
    content += `Invoice Number: ${receiptData.invoiceNumber}\n`;
    content += `Invoice Date: ${receiptData.invoiceDate}\n`;
    content += `Due Date: ${receiptData.dueDate}\n`;
    content += `Booking Status: ${receiptData.bookingStatus}\n\n`;
    
    content += `========================================\n`;
    content += `         TOUR DETAILS\n`;
    content += `========================================\n`;
    content += `Tour Name: ${receiptData.tourName}\n`;
    content += `Package: ${receiptData.packageName}\n`;
    content += `Start Date: ${receiptData.assumeStartDate}\n`;
    content += `End Date: ${receiptData.assumeEndDate}\n`;
    content += `Description: ${receiptData.tourDescription}\n\n`;
    
    content += `========================================\n`;
    content += `         PARTICIPANTS (${totals.participantsCount})\n`;
    content += `========================================\n`;
    content += `All prices below are multiplied by ${totals.participantsCount} participants\n\n`;
    
    content += `========================================\n`;
    content += `         PRICE BREAKDOWN (PER PERSON)\n`;
    content += `========================================\n`;
    
    // Package Price (total, not per person)
    content += `Package Price: $${receiptData.packagePrice.toFixed(2)}\n\n`;
    
    // Activities per person
    if (receiptData.activityDetailsList.length > 0) {
      content += `Activities (Per Person):\n`;
      receiptData.activityDetailsList.forEach((activity, index) => {
        content += `  ${index + 1}. ${activity.activityName}\n`;
        content += `     Description: ${activity.activityDescription}\n`;
        content += `     Participants: ${activity.numberOfParticipants}\n`;
        content += `     Price/Person: $${activity.pricePerPerson.toFixed(2)}\n`;
      });
      content += `  Activities Total Per Person: $${totals.activitiesTotalPerPerson.toFixed(2)}\n`;
      content += `  Activities Total (x${totals.participantsCount}): $${totals.activitiesTotal.toFixed(2)}\n\n`;
    }
    
    // Destinations per person
    if (receiptData.destiantionDetails.length > 0) {
      content += `Destinations (Per Person):\n`;
      receiptData.destiantionDetails.forEach((destination, index) => {
        content += `  ${index + 1}. ${destination.destinationName}\n`;
        content += `     Description: ${destination.destinationDescription}\n`;
        content += `     Price per person: $${destination.extraPrice.toFixed(2)}\n`;
      });
      content += `  Destinations Total Per Person: $${totals.destinationsTotalPerPerson.toFixed(2)}\n`;
      content += `  Destinations Total (x${totals.participantsCount}): $${totals.destinationsTotal.toFixed(2)}\n\n`;
    }
    
    // Accommodation per person (using your calculation logic)
    if (receiptData.accommodationDetailsList.length > 0) {
      content += `Accommodation (Per Person - calculated as per backend logic):\n`;
      receiptData.accommodationDetailsList.forEach((accommodation, index) => {
        const priceWithServiceCharge = accommodation.price * (100.0 + accommodation.serviceCharge) / 100;
        const discount = priceWithServiceCharge * accommodation.discount / 100;
        const tax = priceWithServiceCharge * accommodation.tax / 100;
        const dayTotalPerPerson = priceWithServiceCharge - discount + tax + accommodation.extraCharge + accommodation.transportPrice;
        
        content += `  Day ${accommodation.dayNumber} - ${accommodation.hotelName}:\n`;
        content += `     Base Price: $${accommodation.price.toFixed(2)}\n`;
        content += `     With Service Charge (${accommodation.serviceCharge}%): $${priceWithServiceCharge.toFixed(2)}\n`;
        content += `     Discount (${accommodation.discount}%): -$${discount.toFixed(2)}\n`;
        content += `     Tax (${accommodation.tax}%): $${tax.toFixed(2)}\n`;
        content += `     Extra Charge: $${accommodation.extraCharge.toFixed(2)}\n`;
        content += `     Transport: $${accommodation.transportPrice.toFixed(2)}\n`;
        content += `     Day Total Per Person: $${dayTotalPerPerson.toFixed(2)}\n`;
      });
      content += `  Accommodation Total Per Person: $${totals.accommodationsTotalPerPerson.toFixed(2)}\n`;
      content += `  Accommodation Total (x${totals.participantsCount}): $${totals.accommodationsTotal.toFixed(2)}\n\n`;
    }
    
    content += `========================================\n`;
    content += `         SUMMARY\n`;
    content += `========================================\n`;
    content += `Participants: ${totals.participantsCount}\n\n`;
    content += `PER PERSON CALCULATIONS:\n`;
    content += `  Activities: $${totals.activitiesTotalPerPerson.toFixed(2)}\n`;
    content += `  Destinations: $${totals.destinationsTotalPerPerson.toFixed(2)}\n`;
    content += `  Accommodation: $${totals.accommodationsTotalPerPerson.toFixed(2)}\n`;
    content += `  Total Per Person (excl. package): $${(totals.activitiesTotalPerPerson + totals.destinationsTotalPerPerson + totals.accommodationsTotalPerPerson).toFixed(2)}\n\n`;
    
    content += `TOTAL CALCULATIONS (x${totals.participantsCount}):\n`;
    content += `  Package Price: $${receiptData.packagePrice.toFixed(2)}\n`;
    content += `  Activities Total: $${totals.activitiesTotal.toFixed(2)}\n`;
    content += `  Destinations Total: $${totals.destinationsTotal.toFixed(2)}\n`;
    content += `  Accommodation Total: $${totals.accommodationsTotal.toFixed(2)}\n`;
    content += `  Calculated Subtotal: $${totals.calculatedSubtotal.toFixed(2)}\n`;
    content += `  Actual Subtotal: $${receiptData.subtotal.toFixed(2)}\n`;
    content += `  Difference: $${subtotalDifference.toFixed(2)}\n\n`;
    
    content += `INVOICE SUMMARY:\n`;
    content += `Tax: $${receiptData.taxAmount.toFixed(2)}\n`;
    content += `Discount: $${receiptData.discountAmount.toFixed(2)}\n`;
    if (receiptData.insuranceAmount) {
      content += `Insurance: $${receiptData.insuranceAmount.toFixed(2)}\n`;
    }
    content += `Total Amount: $${receiptData.totalAmount.toFixed(2)}\n`;
    content += `Amount Paid: $${receiptData.amountPaid.toFixed(2)}\n`;
    content += `Balance Due: $${receiptData.balanceDue.toFixed(2)}\n`;
    content += `Final Amount: $${receiptData.finalAmount.toFixed(2)}\n\n`;
    
    content += `========================================\n`;
    content += `         PARTICIPANT DETAILS\n`;
    content += `========================================\n`;
    receiptData.participentDetails.forEach((participant, index) => {
      content += `Participant ${index + 1}:\n`;
      content += `  Name: ${participant.firstName} ${participant.lastName}\n`;
      content += `  Date of Birth: ${participant.dateOfBirth}\n`;
      content += `  Gender: ${participant.gender}\n`;
      content += `  Passport: ${participant.passportNumber}\n`;
      content += `  Email: ${participant.email}\n`;
      content += `  Phone: ${participant.mobileNumber}\n`;
      content += `  Medical Conditions: ${participant.medicalConditions}\n`;
      content += `  Allergies: ${participant.allergies}\n\n`;
    });
    
    content += `========================================\n`;
    content += `Thank you for your booking!\n`;
    content += `========================================\n`;
    
    return content;
  };

  // Download receipt as text file
  const downloadReceipt = () => {
    if (!receiptData) return;
    
    const receiptContent = generateReceiptContent();
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptData.bookingReference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Print receipt
  const printReceipt = () => {
    const printContent = document.getElementById('receipt-print-content');
    if (printContent) {
      const originalContent = document.body.innerHTML;
      const printStyles = `
        <style>
          @media print {
            body * {
              visibility: hidden;
            }
            #receipt-print-content, #receipt-print-content * {
              visibility: visible;
            }
            #receipt-print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              color: #000 !important;
            }
            #receipt-print-content th,
            #receipt-print-content td {
              color: #000 !important;
            }
            #receipt-print-content .text-gray-900 {
              color: #000 !important;
            }
            #receipt-print-content .text-gray-800 {
              color: #000 !important;
            }
            #receipt-print-content .text-gray-700 {
              color: #000 !important;
            }
          }
        </style>
      `;
      
      document.body.innerHTML = printStyles + printContent.innerHTML;
      window.print();
      window.location.reload();
    }
  };

  // Render filter section
  const renderFilterSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Select Tour Package</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Tour Select */}
          <div>
            <Label htmlFor="tour">Tour</Label>
            <Select 
              id="tour"
              value={selectedTourId} 
              onChange={handleTourChange}
            >
              <SelectItem value="">Select a tour</SelectItem>
              {tours.map(tour => (
                <SelectItem key={tour.tourId} value={tour.tourId.toString()}>
                  {tour.tourName}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Package Select */}
          <div>
            <Label htmlFor="package">Package</Label>
            <Select 
              id="package"
              value={selectedPackageId} 
              onChange={handlePackageChange}
              disabled={!selectedTourId}
            >
              <SelectItem value="">Select a package</SelectItem>
              {selectedTour?.packageDetails.map(pkg => (
                <SelectItem key={pkg.packageId} value={pkg.packageId.toString()}>
                  {pkg.packageName}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Schedule Select */}
          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Select 
              id="schedule"
              value={selectedScheduleId} 
              onChange={handleScheduleChange}
              disabled={!selectedPackageId}
            >
              <SelectItem value="">Select a schedule</SelectItem>
              {selectedPackage?.packageSchedulesDetails.map(schedule => (
                <SelectItem 
                  key={schedule.packageScheduleId} 
                  value={schedule.packageScheduleId.toString()}
                >
                  {schedule.packageScheduleName} ({schedule.startDate})
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Selected Schedule Info */}
        {selectedSchedule && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-lg mb-3 text-gray-900">Selected Schedule Details:</h3>
            <div className="space-y-2">
              <p className='text-purple-900'><strong className="text-gray-900">Name:</strong> {selectedSchedule.packageScheduleName}</p>
              <p className='text-purple-900'><strong className="text-gray-900">Description:</strong> {selectedSchedule.packageScheduleDescription}</p>
              <p className='text-purple-900'><strong className="text-gray-900">Dates:</strong> {selectedSchedule.startDate} to {selectedSchedule.endDate}</p>
              <p className='text-purple-900'><strong className="text-gray-900">Tour:</strong> {selectedTour?.tourName}</p>
              <p className='text-purple-900'><strong className="text-gray-900">Package:</strong> {selectedPackage?.packageName}</p>
            </div>
            
            <Button 
              className="mt-4"
              onClick={() => setShowForm(true)}
            >
              Proceed to Booking Form
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Render booking form
  const renderBookingForm = () => (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Package Info */}
      <Card>
        <CardHeader>
          <CardTitle>Package Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Tour Name</Label>
              <Input value={selectedTour?.tourName || ''} readOnly />
            </div>
            <div>
              <Label>Package Name</Label>
              <Input value={selectedPackage?.packageName || ''} readOnly />
            </div>
            <div>
              <Label>Schedule Name</Label>
              <Input value={selectedSchedule?.packageScheduleName || ''} readOnly />
            </div>
            <div>
              <Label>Package Schedule ID</Label>
              <Input 
                name="packageScheduleId"
                value={formData.packageScheduleId}
                readOnly 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Special Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              placeholder="Any special requirements..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
            <Input
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleInputChange}
              placeholder="e.g., Vegetarian, Vegan, Gluten-free"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Switch
              id="insuranceRequired"
              checked={formData.insuranceRequired}
              onCheckedChange={(checked: boolean) => 
                setFormData(prev => ({ ...prev, insuranceRequired: checked }))
              }
            />
            <Label htmlFor="insuranceRequired">Travel Insurance Required</Label>
          </div>
        </CardContent>
      </Card>

      {/* Transport Details */}
      <Card>
        <CardHeader>
          <CardTitle>Transport Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.transport.departureDate}
                onChange={handleTransportChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                type="time"
                id="departureTime"
                name="departureTime"
                value={formData.transport.departureTime}
                onChange={handleTransportChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="arrivalDate">Arrival Date</Label>
              <Input
                type="date"
                id="arrivalDate"
                name="arrivalDate"
                value={formData.transport.arrivalDate}
                onChange={handleTransportChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="arrivalTime">Arrival Time</Label>
              <Input
                type="time"
                id="arrivalTime"
                name="arrivalTime"
                value={formData.transport.arrivalTime}
                onChange={handleTransportChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="departureLocation">Departure Location</Label>
              <Input
                id="departureLocation"
                name="departureLocation"
                value={formData.transport.departureLocation}
                onChange={handleTransportChange}
                placeholder="e.g., Colombo"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="arrivalLocation">Arrival Location</Label>
              <Input
                id="arrivalLocation"
                name="arrivalLocation"
                value={formData.transport.arrivalLocation}
                onChange={handleTransportChange}
                placeholder="e.g., Ella"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Prices */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Booking Prices</CardTitle>
            <Button type="button" variant="outline" onClick={addBookingPrice}>
              + Add Price Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.bookingPrices.map((price, index) => (
            <div key={index} className="mb-6 p-4 border border-purple-300 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Price Item {index + 1}</h4>
                {formData.bookingPrices.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeBookingPrice(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Item Type</Label>
                  <Select
                    value={price.itemType}
                    onChange={(e) => handleBookingPriceChange(index, 'itemType', e.target.value)}
                  >
                    <SelectItem value="PACKAGE">Package</SelectItem>
                    <SelectItem value="EXTRA">Extra</SelectItem>
                    <SelectItem value="INSURANCE">Insurance</SelectItem>
                    <SelectItem value="TRANSPORT">Transport</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <Label>Item Name</Label>
                  <Input
                    value={price.itemName}
                    onChange={(e) => handleBookingPriceChange(index, 'itemName', e.target.value)}
                    placeholder="e.g., Hotel Upgrade"
                  />
                </div>
                
                <div>
                  <Label>Item Description</Label>
                  <Input
                    value={price.itemDescription}
                    onChange={(e) => handleBookingPriceChange(index, 'itemDescription', e.target.value)}
                    placeholder="Description"
                  />
                </div>
                
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={price.quantity}
                    onChange={(e) => handleBookingPriceChange(index, 'quantity', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Unit Price ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={price.unitPrice}
                    onChange={(e) => handleBookingPriceChange(index, 'unitPrice', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Total Price ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={price.totalPrice}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Participants */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Participants</CardTitle>
            <Button type="button" variant="outline" onClick={addParticipant}>
              + Add Participant
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.participants.map((participant, index) => (
            <div key={index} className="mb-6 p-4 border border-purple-300 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Participant {index + 1}</h4>
                {formData.participants.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeParticipant(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={participant.firstName}
                    onChange={(e) => handleParticipantChange(index, 'firstName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={participant.lastName}
                    onChange={(e) => handleParticipantChange(index, 'lastName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={participant.dateOfBirth}
                    onChange={(e) => handleParticipantChange(index, 'dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Gender</Label>
                  <Select
                    value={participant.gender}
                    onChange={(e) => handleParticipantChange(index, 'gender', e.target.value)}
                  >
                    <SelectItem value="">Select gender</SelectItem>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <Label>Passport Number</Label>
                  <Input
                    value={participant.passportNumber}
                    onChange={(e) => handleParticipantChange(index, 'passportNumber', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Country</Label>
                  <Input
                    value={participant.country}
                    onChange={(e) => handleParticipantChange(index, 'country', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={participant.email}
                    onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Mobile Number</Label>
                  <Input
                    value={participant.mobileNumber}
                    onChange={(e) => handleParticipantChange(index, 'mobileNumber', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Emergency Contact Name</Label>
                  <Input
                    value={participant.emergencyContactName}
                    onChange={(e) => handleParticipantChange(index, 'emergencyContactName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Emergency Contact Phone</Label>
                  <Input
                    value={participant.emergencyContactPhone}
                    onChange={(e) => handleParticipantChange(index, 'emergencyContactPhone', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Emergency Contact Relationship</Label>
                  <Input
                    value={participant.emergencyContactRelationship}
                    onChange={(e) => handleParticipantChange(index, 'emergencyContactRelationship', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Medical Conditions</Label>
                  <Input
                    value={participant.medicalConditions}
                    onChange={(e) => handleParticipantChange(index, 'medicalConditions', e.target.value)}
                    placeholder="None"
                  />
                </div>
                
                <div>
                  <Label>Allergies</Label>
                  <Input
                    value={participant.allergies}
                    onChange={(e) => handleParticipantChange(index, 'allergies', e.target.value)}
                    placeholder="None"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={participant.specialAssistanceRequired}
                    onCheckedChange={(checked: boolean) => 
                      handleParticipantChange(index, 'specialAssistanceRequired', checked)
                    }
                  />
                  <Label>Special Assistance Required?</Label>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activities */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Activities</CardTitle>
            <Button type="button" variant="outline" onClick={addActivity}>
              + Add Activity
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.activities.map((activity, index) => (
            <div key={index} className="mb-4 p-4 border border-purple-300 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Activity {index + 1}</h4>
                {formData.activities.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeActivity(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Activity Schedule ID</Label>
                  <Input
                    type="number"
                    value={activity.activityScheduleId}
                    onChange={(e) => handleActivityChange(index, 'activityScheduleId', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Number of Participants</Label>
                  <Input
                    type="number"
                    min="1"
                    value={activity.numberOfParticipants}
                    onChange={(e) => handleActivityChange(index, 'numberOfParticipants', parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Booking Notes */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Booking Notes</CardTitle>
            <Button type="button" variant="outline" onClick={addBookingNote}>
              + Add Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.bookingNotes.map((note, index) => (
            <div key={index} className="mb-4 p-4 border border-purple-300 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Note {index + 1}</h4>
                {formData.bookingNotes.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeBookingNote(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Note Type</Label>
                  <Select
                    value={note.noteType}
                    onChange={(e) => handleBookingNoteChange(index, 'noteType', e.target.value)}
                  >
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="AGENT">Agent</SelectItem>
                    <SelectItem value="SYSTEM">System</SelectItem>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <Label>Note Text</Label>
                  <Textarea
                    value={note.noteText}
                    onChange={(e) => handleBookingNoteChange(index, 'noteText', e.target.value)}
                    placeholder="Enter note here..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billingFullName">Full Name</Label>
              <Input
                id="billingFullName"
                name="billingFullName"
                value={formData.invoices.billingFullName}
                onChange={handleInvoiceChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="billingEmail">Email</Label>
              <Input
                id="billingEmail"
                name="billingEmail"
                type="email"
                value={formData.invoices.billingEmail}
                onChange={handleInvoiceChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="billingPhone">Phone</Label>
              <Input
                id="billingPhone"
                name="billingPhone"
                value={formData.invoices.billingPhone}
                onChange={handleInvoiceChange}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="billingAddress">Address</Label>
              <Textarea
                id="billingAddress"
                name="billingAddress"
                value={formData.invoices.billingAddress}
                onChange={handleInvoiceChange}
                rows={3}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
          Back to Selection
        </Button>
        <Button type="submit">
          Submit Booking
        </Button>
      </div>
    </form>
  );

  // Render receipt
  const renderReceipt = () => {
    if (!receiptData) return null;
    
    const totals = calculateTotals();
    const subtotalDifference = totals.calculatedSubtotal - receiptData.subtotal;
    
    return (
      <div id="receipt-content">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Booking Receipt</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={downloadReceipt}>
                  Download Text
                </Button>
                <Button variant="outline" onClick={printReceipt}>
                  Print Receipt
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowReceipt(false);
                  setShowForm(false);
                  setSelectedTourId("");
                  setSelectedPackageId("");
                  setSelectedScheduleId("");
                }}>
                  New Booking
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div id="receipt-print-content" className="space-y-6 text-gray-900">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">BOOKING CONFIRMATION</h2>
                <p className="text-gray-700 mt-1">Receipt for Booking #{receiptData.bookingReference}</p>
              </div>

              {/* Booking Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><strong className="text-gray-900">Booking ID:</strong> {receiptData.bookingId}</p>
                  <p><strong className="text-gray-900">Reference:</strong> {receiptData.bookingReference}</p>
                  <p><strong className="text-gray-900">Invoice:</strong> {receiptData.invoiceNumber}</p>
                  <p><strong className="text-gray-900">Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      receiptData.bookingStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-900' :
                      receiptData.bookingStatus === 'CONFIRMED' ? 'bg-green-100 text-green-900' :
                      'bg-gray-100 text-gray-900'
                    }`}>
                      {receiptData.bookingStatus}
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p><strong className="text-gray-900">Invoice Date:</strong> {receiptData.invoiceDate}</p>
                  <p><strong className="text-gray-900">Due Date:</strong> {receiptData.dueDate}</p>
                  <p><strong className="text-gray-900">Booking Date:</strong> {receiptData.bookingDate}</p>
                  <p><strong className="text-gray-900">Tour Dates:</strong> {receiptData.assumeStartDate} to {receiptData.assumeEndDate}</p>
                </div>
              </div>

              <Separator />

              {/* Tour Details */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Tour Details</h3>
                <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border border-purple-200">
                  <p><strong className="text-gray-900">Tour:</strong> {receiptData.tourName}</p>
                  <p><strong className="text-gray-900">Package:</strong> {receiptData.packageName}</p>
                  <p><strong className="text-gray-900">Participants:</strong> {totals.participantsCount} persons</p>
                  <p className="text-gray-700 mt-2">{receiptData.tourDescription}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">Price Breakdown</h3>
                <p className="text-gray-700 mb-4">
                  <em>Note: Per person prices are multiplied by {totals.participantsCount} participants</em>
                </p>
                
                {/* Package Price */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Package Price (Total)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-purple-300">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Item</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Description</th>
                          <th className="border border-purple-300 p-2 text-right text-gray-900">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-purple-50">
                          <td className="border border-purple-300 p-2 text-gray-900">Tour Package</td>
                          <td className="border border-purple-300 p-2 text-gray-900">{receiptData.tourName} - {receiptData.packageName}</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${receiptData.packagePrice.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Activities Table */}
                {receiptData.activityDetailsList.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Activities</h4>
                    <p className="text-gray-700 mb-2">
                      <em>Per Person: ${totals.activitiesTotalPerPerson.toFixed(2)} | Total (x{totals.participantsCount}): ${totals.activitiesTotal.toFixed(2)}</em>
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-purple-300">
                        <thead>
                          <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                            <th className="border border-purple-300 p-2 text-left text-gray-900">Activity</th>
                            <th className="border border-purple-300 p-2 text-left text-gray-900">Description</th>
                            <th className="border border-purple-300 p-2 text-center text-gray-900">Participants</th>
                            <th className="border border-purple-300 p-2 text-right text-gray-900">Price/Person</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.activityDetailsList.map((activity, index) => (
                            <tr key={index} className="hover:bg-purple-50">
                              <td className="border border-purple-300 p-2 text-gray-900">{activity.activityName}</td>
                              <td className="border border-purple-300 p-2 text-gray-900">{activity.activityDescription}</td>
                              <td className="border border-purple-300 p-2 text-center text-gray-900">{activity.numberOfParticipants}</td>
                              <td className="border border-purple-300 p-2 text-right text-gray-900">${activity.pricePerPerson.toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr className="bg-gradient-to-r from-purple-100 to-amber-100 font-medium">
                            <td colSpan={3} className="border border-purple-300 p-2 text-right text-gray-900">Activities Total Per Person:</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.activitiesTotalPerPerson.toFixed(2)}</td>
                          </tr>
                          <tr className="bg-gradient-to-r from-purple-200 to-amber-200 font-medium">
                            <td colSpan={3} className="border border-purple-300 p-2 text-right text-gray-900">Activities Total (x{totals.participantsCount}):</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.activitiesTotal.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Destinations Table */}
                {receiptData.destiantionDetails.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Destinations</h4>
                    <p className="text-gray-700 mb-2">
                      <em>Per Person: ${totals.destinationsTotalPerPerson.toFixed(2)} | Total (x{totals.participantsCount}): ${totals.destinationsTotal.toFixed(2)}</em>
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-purple-300">
                        <thead>
                          <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                            <th className="border border-purple-300 p-2 text-left text-gray-900">Destination</th>
                            <th className="border border-purple-300 p-2 text-left text-gray-900">Description</th>
                            <th className="border border-purple-300 p-2 text-center text-gray-900">Price/Person</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.destiantionDetails.map((destination, index) => (
                            <tr key={index} className="hover:bg-purple-50">
                              <td className="border border-purple-300 p-2 text-gray-900">{destination.destinationName}</td>
                              <td className="border border-purple-300 p-2 text-gray-900">{destination.destinationDescription}</td>
                              <td className="border border-purple-300 p-2 text-center text-gray-900">${destination.extraPrice.toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr className="bg-gradient-to-r from-purple-100 to-amber-100 font-medium">
                            <td colSpan={2} className="border border-purple-300 p-2 text-right text-gray-900">Destinations Total Per Person:</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.destinationsTotalPerPerson.toFixed(2)}</td>
                          </tr>
                          <tr className="bg-gradient-to-r from-purple-200 to-amber-200 font-medium">
                            <td colSpan={2} className="border border-purple-300 p-2 text-right text-gray-900">Destinations Total (x{totals.participantsCount}):</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.destinationsTotal.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Accommodation Table */}
                {receiptData.accommodationDetailsList.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Accommodation</h4>
                    <p className="text-gray-700 mb-2">
                      <em>Per Person: ${totals.accommodationsTotalPerPerson.toFixed(2)} | Total (x{totals.participantsCount}): ${totals.accommodationsTotal.toFixed(2)}</em>
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-purple-300">
                        <thead>
                          <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                            <th className="border border-purple-300 p-2 text-left text-gray-900">Day</th>
                            <th className="border border-purple-300 p-2 text-left text-gray-900">Hotel</th>
                            <th className="border border-purple-300 p-2 text-right text-gray-900">Price/Person</th>
                            <th className="border border-purple-300 p-2 text-right text-gray-900">Transport/Person</th>
                            <th className="border border-purple-300 p-2 text-right text-gray-900">Day Total/Person</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.accommodationDetailsList.map((accommodation, index) => {
                            const priceWithServiceCharge = accommodation.price * (100.0 + accommodation.serviceCharge) / 100;
                            const discount = priceWithServiceCharge * accommodation.discount / 100;
                            const tax = priceWithServiceCharge * accommodation.tax / 100;
                            const dayTotalPerPerson = priceWithServiceCharge - discount + tax + accommodation.extraCharge + accommodation.transportPrice;
                            
                            return (
                              <tr key={index} className="hover:bg-purple-50">
                                <td className="border border-purple-300 p-2 text-center text-gray-900">{accommodation.dayNumber}</td>
                                <td className="border border-purple-300 p-2 text-gray-900">{accommodation.hotelName}</td>
                                <td className="border border-purple-300 p-2 text-right text-gray-900">${accommodation.price.toFixed(2)}</td>
                                <td className="border border-purple-300 p-2 text-right text-gray-900">${accommodation.transportPrice.toFixed(2)}</td>
                                <td className="border border-purple-300 p-2 text-right font-medium text-gray-900">${dayTotalPerPerson.toFixed(2)}</td>
                              </tr>
                            );
                          })}
                          <tr className="bg-gradient-to-r from-purple-100 to-amber-100 font-medium">
                            <td colSpan={4} className="border border-purple-300 p-2 text-right text-gray-900">Accommodation Total Per Person:</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.accommodationsTotalPerPerson.toFixed(2)}</td>
                          </tr>
                          <tr className="bg-gradient-to-r from-purple-200 to-amber-200 font-medium">
                            <td colSpan={4} className="border border-purple-300 p-2 text-right text-gray-900">Accommodation Total (x{totals.participantsCount}):</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.accommodationsTotal.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Summary Table */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-purple-300">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Category</th>
                          <th className="border border-purple-300 p-2 text-right text-gray-900">Per Person</th>
                          <th className="border border-purple-300 p-2 text-right text-gray-900">Total (x{totals.participantsCount})</th>
                        </tr>
                      </thead>
                      <tbody>
                        {totals.activitiesTotal > 0 && (
                          <tr className="hover:bg-purple-50">
                            <td className="border border-purple-300 p-2 text-gray-900">Activities</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.activitiesTotalPerPerson.toFixed(2)}</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.activitiesTotal.toFixed(2)}</td>
                          </tr>
                        )}
                        {totals.destinationsTotal > 0 && (
                          <tr className="hover:bg-purple-50">
                            <td className="border border-purple-300 p-2 text-gray-900">Destinations</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.destinationsTotalPerPerson.toFixed(2)}</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.destinationsTotal.toFixed(2)}</td>
                          </tr>
                        )}
                        {totals.accommodationsTotal > 0 && (
                          <tr className="hover:bg-purple-50">
                            <td className="border border-purple-300 p-2 text-gray-900">Accommodation</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.accommodationsTotalPerPerson.toFixed(2)}</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.accommodationsTotal.toFixed(2)}</td>
                          </tr>
                        )}
                        <tr className="bg-gradient-to-r from-purple-200 to-amber-200 font-medium">
                          <td className="border border-purple-300 p-2 text-gray-900">Calculated Subtotal</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">
                            ${(totals.activitiesTotalPerPerson + totals.destinationsTotalPerPerson + totals.accommodationsTotalPerPerson).toFixed(2)}
                          </td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${totals.calculatedSubtotal.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Final Price Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Final Price Summary</h4>
                  <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border border-purple-200">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-900">Total Amount:</span>
                        <span className="font-medium text-gray-900">${receiptData.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Tax:</span>
                        <span className="font-medium text-gray-900">${receiptData.taxAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Discount:</span>
                        <span className="font-medium text-gray-900">-${receiptData.discountAmount.toFixed(2)}</span>
                      </div>
                      {receiptData.insuranceAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-900">Insurance:</span>
                          <span className="font-medium text-gray-900">${receiptData.insuranceAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-gray-900">Sub Total Amount:</span>
                        <span className="text-purple-600">${receiptData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Amount Paid:</span>
                        <span className="font-medium text-gray-900">${receiptData.amountPaid.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-gray-900">Balance Due:</span>
                        <span className="text-red-600">${receiptData.balanceDue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-700 mt-2">
                        <span>Final Amount (incl. all charges):</span>
                        <span>${receiptData.finalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participants Table */}
              {receiptData.participentDetails.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Participants ({totals.participantsCount})</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-purple-300">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Name</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Date of Birth</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Gender</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Passport</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Contact</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Medical Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receiptData.participentDetails.map((participant, index) => (
                          <tr key={index} className="hover:bg-purple-50">
                            <td className="border border-purple-300 p-2 text-gray-900">
                              {participant.firstName} {participant.lastName}
                            </td>
                            <td className="border border-purple-300 p-2 text-gray-900">{participant.dateOfBirth}</td>
                            <td className="border border-purple-300 p-2 text-gray-900">{participant.gender}</td>
                            <td className="border border-purple-300 p-2 text-gray-900">{participant.passportNumber}</td>
                            <td className="border border-purple-300 p-2 text-gray-900">
                              <div>{participant.email}</div>
                              <div>{participant.mobileNumber}</div>
                            </td>
                            <td className="border border-purple-300 p-2 text-gray-900">
                              <div><strong>Medical:</strong> {participant.medicalConditions}</div>
                              <div><strong>Allergies:</strong> {participant.allergies}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="text-center text-gray-700 mt-6 pt-6 border-t border-purple-200">
                <p>For any queries, please contact our customer service.</p>
                <p className="mt-1">Thank you for choosing our services!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Book a Tour</h1>
      
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      {showReceipt ? (
        renderReceipt()
      ) : showForm ? (
        <>
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => setShowForm(false)}
          >
            ← Back to Selection
          </Button>
          {renderBookingForm()}
        </>
      ) : (
        renderFilterSection()
      )}
    </div>
  );
};

export default BookingPage;