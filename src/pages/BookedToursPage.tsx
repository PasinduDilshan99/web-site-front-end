"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

// Types
interface BookedTour {
  bookingId: number;
  bookingReference: string;
  bookingInvoiceNumber: string | null;
  packageName: string;
  packageScheduleName: string;
  tourName: string;
}

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

// Custom Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-semibold text-gray-800 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Label = ({ children, htmlFor, className = '' }: { children: React.ReactNode; htmlFor?: string; className?: string }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    {children}
  </label>
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
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }: any) => (
  <option value={value}>{children}</option>
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
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
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

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
      type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      <div className="flex justify-between items-center">
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 text-lg">&times;</button>
      </div>
    </div>
  );
};

const Separator = ({ className = '' }: { className?: string }) => (
  <hr className={`border-t border-gray-200 ${className}`} />
);

const BookedToursPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";

  // States
  const [bookedTours, setBookedTours] = useState<BookedTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>(bookingId || "");
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Show toast message
  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ message, type });
  };

  // Fetch booked tours
  useEffect(() => {
    const fetchBookedTours = async () => {
      try {
        const response = await fetch('http://localhost:8080/felicita/api/v0/booking/booked-tours', {
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
        setBookedTours(data.data);
        
        // If URL has bookingId, auto-select and fetch receipt
        if (bookingId) {
          setSelectedBookingId(bookingId);
          fetchReceipt(parseInt(bookingId));
        }
      } catch (error) {
        console.error('Error fetching booked tours:', error);
        showToast('Failed to load booked tours', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchBookedTours();
  }, [bookingId]);

  // Fetch receipt
  const fetchReceipt = async (bookingId: number) => {
    setReceiptLoading(true);
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
      }
    } catch (error) {
      console.error('Error fetching receipt:', error);
      showToast('Failed to load receipt', 'error');
    } finally {
      setReceiptLoading(false);
    }
  };

  // Handle booking selection
  const handleBookingSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bookingId = e.target.value;
    setSelectedBookingId(bookingId);
    if (bookingId) {
      fetchReceipt(parseInt(bookingId));
    } else {
      setShowReceipt(false);
      setReceiptData(null);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    if (!receiptData) return {
      activitiesTotal: 0,
      destinationsTotal: 0,
      accommodationsTotal: 0,
      calculatedSubtotal: 0
    };

    const activitiesTotal = receiptData.activityDetailsList.reduce((sum, activity) => sum + activity.totalPrice, 0);
    const destinationsTotal = receiptData.destiantionDetails.reduce((sum, destination) => sum + destination.extraPrice, 0);
    
    const accommodationsTotal = receiptData.accommodationDetailsList.reduce((sum, accommodation) => {
      const basePrice = accommodation.price;
      const transportPrice = accommodation.transportPrice;
      const discountAmount = (basePrice * accommodation.discount) / 100;
      const serviceCharge = ((basePrice - discountAmount) * accommodation.serviceCharge) / 100;
      const tax = ((basePrice - discountAmount + serviceCharge) * accommodation.tax) / 100;
      const extraCharge = accommodation.extraCharge;
      
      return sum + basePrice + transportPrice - discountAmount + serviceCharge + tax + extraCharge;
    }, 0);

    const calculatedSubtotal = activitiesTotal + destinationsTotal + accommodationsTotal + receiptData.packagePrice;

    return {
      activitiesTotal,
      destinationsTotal,
      accommodationsTotal,
      calculatedSubtotal
    };
  };

  // Download receipt as PDF (simulated - for actual PDF generation you'd need a library)
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
    
    showToast('Receipt downloaded successfully', 'success');
  };

  // Generate receipt content
  const generateReceiptContent = () => {
    if (!receiptData) return '';
    
    const totals = calculateTotals();
    
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
    content += `         BILLING INFORMATION\n`;
    content += `========================================\n`;
    content += `Name: ${receiptData.billingFullName}\n`;
    content += `Address: ${receiptData.billingAddress}\n`;
    content += `Email: ${receiptData.billingEmail}\n`;
    content += `Phone: ${receiptData.billingPhone}\n\n`;
    
    content += `========================================\n`;
    content += `         PRICE BREAKDOWN\n`;
    content += `========================================\n`;
    
    // Package Price
    content += `Package Price: $${receiptData.packagePrice.toFixed(2)}\n\n`;
    
    // Activities
    if (receiptData.activityDetailsList.length > 0) {
      content += `Activities:\n`;
      receiptData.activityDetailsList.forEach((activity, index) => {
        content += `  ${index + 1}. ${activity.activityName}\n`;
        content += `     Description: ${activity.activityDescription}\n`;
        content += `     Participants: ${activity.numberOfParticipants}\n`;
        content += `     Price/Person: $${activity.pricePerPerson.toFixed(2)}\n`;
        content += `     Total: $${activity.totalPrice.toFixed(2)}\n`;
      });
      content += `  Activities Total: $${totals.activitiesTotal.toFixed(2)}\n\n`;
    }
    
    // Destinations
    if (receiptData.destiantionDetails.length > 0) {
      content += `Destinations:\n`;
      receiptData.destiantionDetails.forEach((destination, index) => {
        content += `  ${index + 1}. ${destination.destinationName}\n`;
        content += `     Description: ${destination.destinationDescription}\n`;
        content += `     Extra Price: $${destination.extraPrice.toFixed(2)}\n`;
        content += `     Note: ${destination.extraPriceNote}\n`;
      });
      content += `  Destinations Total: $${totals.destinationsTotal.toFixed(2)}\n\n`;
    }
    
    // Accommodation
    if (receiptData.accommodationDetailsList.length > 0) {
      content += `Accommodation:\n`;
      receiptData.accommodationDetailsList.forEach((accommodation, index) => {
        const basePrice = accommodation.price;
        const transportPrice = accommodation.transportPrice;
        const discountAmount = (basePrice * accommodation.discount) / 100;
        const serviceCharge = ((basePrice - discountAmount) * accommodation.serviceCharge) / 100;
        const tax = ((basePrice - discountAmount + serviceCharge) * accommodation.tax) / 100;
        const extraCharge = accommodation.extraCharge;
        const dayTotal = basePrice + transportPrice - discountAmount + serviceCharge + tax + extraCharge;
        
        content += `  Day ${accommodation.dayNumber} - ${accommodation.hotelName}:\n`;
        content += `     Base Price: $${basePrice.toFixed(2)}\n`;
        content += `     Transport: $${transportPrice.toFixed(2)}\n`;
        content += `     Discount (${accommodation.discount}%): -$${discountAmount.toFixed(2)}\n`;
        content += `     Service Charge (${accommodation.serviceCharge}%): $${serviceCharge.toFixed(2)}\n`;
        content += `     Tax (${accommodation.tax}%): $${tax.toFixed(2)}\n`;
        content += `     Extra (${accommodation.extraChargeNote}): $${extraCharge.toFixed(2)}\n`;
        content += `     Day Total: $${dayTotal.toFixed(2)}\n`;
      });
      content += `  Accommodation Total: $${totals.accommodationsTotal.toFixed(2)}\n\n`;
    }
    
    content += `========================================\n`;
    content += `         SUMMARY\n`;
    content += `========================================\n`;
    content += `Package Price: $${receiptData.packagePrice.toFixed(2)}\n`;
    content += `Activities: $${totals.activitiesTotal.toFixed(2)}\n`;
    content += `Destinations: $${totals.destinationsTotal.toFixed(2)}\n`;
    content += `Accommodation: $${totals.accommodationsTotal.toFixed(2)}\n`;
    content += `Calculated Subtotal: $${totals.calculatedSubtotal.toFixed(2)}\n`;
    content += `Actual Subtotal: $${receiptData.subtotal.toFixed(2)}\n`;
    content += `Difference: $${(totals.calculatedSubtotal - receiptData.subtotal).toFixed(2)}\n\n`;
    
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
    content += `         PARTICIPANTS\n`;
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

  // Print receipt
  const printReceipt = () => {
    const printContent = document.getElementById('receipt-content');
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
        <CardTitle>Select Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bookingSelect">Select Booking Reference or Invoice Number</Label>
            <Select 
              id="bookingSelect"
              value={selectedBookingId} 
              onChange={handleBookingSelect}
            >
              <SelectItem value="">Select a booking</SelectItem>
              {bookedTours.map(tour => (
                <SelectItem key={tour.bookingId} value={tour.bookingId.toString()}>
                  {tour.bookingReference} - {tour.tourName} ({tour.packageName})
                  {tour.bookingInvoiceNumber ? ` - Invoice: ${tour.bookingInvoiceNumber}` : ''}
                </SelectItem>
              ))}
            </Select>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Select a booking from the list above to view its receipt.</p>
            <p>If you have a booking ID in the URL, it will be automatically selected.</p>
          </div>
        </div>
      </CardContent>
    </Card>
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
                  Download Receipt
                </Button>
                <Button variant="outline" onClick={printReceipt}>
                  Print Receipt
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowReceipt(false);
                  setReceiptData(null);
                  setSelectedBookingId("");
                }}>
                  Back to Selection
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div id="receipt-print-content" className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">BOOKING CONFIRMATION</h2>
                <p className="text-gray-600 mt-1">Receipt for Booking #{receiptData.bookingReference}</p>
              </div>

              {/* Booking Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><strong className="text-gray-700">Booking ID:</strong> {receiptData.bookingId}</p>
                  <p><strong className="text-gray-700">Reference:</strong> {receiptData.bookingReference}</p>
                  <p><strong className="text-gray-700">Invoice:</strong> {receiptData.invoiceNumber}</p>
                  <p><strong className="text-gray-700">Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      receiptData.bookingStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      receiptData.bookingStatus === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {receiptData.bookingStatus}
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p><strong className="text-gray-700">Invoice Date:</strong> {receiptData.invoiceDate}</p>
                  <p><strong className="text-gray-700">Due Date:</strong> {receiptData.dueDate}</p>
                  <p><strong className="text-gray-700">Booking Date:</strong> {receiptData.bookingDate}</p>
                  <p><strong className="text-gray-700">Tour Dates:</strong> {receiptData.assumeStartDate} to {receiptData.assumeEndDate}</p>
                </div>
              </div>

              <Separator />

              {/* Tour Details */}
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Tour Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong className="text-gray-700">Tour:</strong> {receiptData.tourName}</p>
                  <p><strong className="text-gray-700">Package:</strong> {receiptData.packageName}</p>
                  <p className="text-gray-600 mt-2">{receiptData.tourDescription}</p>
                </div>
              </div>

              {/* Billing Info */}
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Billing Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong className="text-gray-700">Name:</strong> {receiptData.billingFullName}</p>
                  <p><strong className="text-gray-700">Address:</strong> {receiptData.billingAddress}</p>
                  <p><strong className="text-gray-700">Email:</strong> {receiptData.billingEmail}</p>
                  <p><strong className="text-gray-700">Phone:</strong> {receiptData.billingPhone}</p>
                </div>
              </div>

              {/* Detailed Price Breakdown */}
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-4">Detailed Price Breakdown</h3>
                
                {/* Package Price */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Package Price</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left">Item</th>
                          <th className="border border-gray-300 p-2 text-left">Description</th>
                          <th className="border border-gray-300 p-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2">Tour Package</td>
                          <td className="border border-gray-300 p-2">{receiptData.tourName} - {receiptData.packageName}</td>
                          <td className="border border-gray-300 p-2 text-right">${receiptData.packagePrice.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Activities Table */}
                {receiptData.activityDetailsList.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Activities</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Activity</th>
                            <th className="border border-gray-300 p-2 text-left">Description</th>
                            <th className="border border-gray-300 p-2 text-center">Participants</th>
                            <th className="border border-gray-300 p-2 text-right">Price/Person</th>
                            <th className="border border-gray-300 p-2 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.activityDetailsList.map((activity, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2">{activity.activityName}</td>
                              <td className="border border-gray-300 p-2">{activity.activityDescription}</td>
                              <td className="border border-gray-300 p-2 text-center">{activity.numberOfParticipants}</td>
                              <td className="border border-gray-300 p-2 text-right">${activity.pricePerPerson.toFixed(2)}</td>
                              <td className="border border-gray-300 p-2 text-right">${activity.totalPrice.toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50 font-medium">
                            <td colSpan={4} className="border border-gray-300 p-2 text-right">Activities Total:</td>
                            <td className="border border-gray-300 p-2 text-right">${totals.activitiesTotal.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Destinations Table */}
                {receiptData.destiantionDetails.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Destinations</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Destination</th>
                            <th className="border border-gray-300 p-2 text-left">Description</th>
                            <th className="border border-gray-300 p-2 text-left">Note</th>
                            <th className="border border-gray-300 p-2 text-right">Extra Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.destiantionDetails.map((destination, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2">{destination.destinationName}</td>
                              <td className="border border-gray-300 p-2">{destination.destinationDescription}</td>
                              <td className="border border-gray-300 p-2">{destination.extraPriceNote}</td>
                              <td className="border border-gray-300 p-2 text-right">${destination.extraPrice.toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50 font-medium">
                            <td colSpan={3} className="border border-gray-300 p-2 text-right">Destinations Total:</td>
                            <td className="border border-gray-300 p-2 text-right">${totals.destinationsTotal.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Accommodation Table */}
                {receiptData.accommodationDetailsList.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Accommodation</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Day</th>
                            <th className="border border-gray-300 p-2 text-left">Hotel</th>
                            <th className="border border-gray-300 p-2 text-right">Base Price</th>
                            <th className="border border-gray-300 p-2 text-right">Transport</th>
                            <th className="border border-gray-300 p-2 text-right">Discount</th>
                            <th className="border border-gray-300 p-2 text-right">Service</th>
                            <th className="border border-gray-300 p-2 text-right">Tax</th>
                            <th className="border border-gray-300 p-2 text-right">Extra</th>
                            <th className="border border-gray-300 p-2 text-right">Day Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.accommodationDetailsList.map((accommodation, index) => {
                            const basePrice = accommodation.price;
                            const transportPrice = accommodation.transportPrice;
                            const discountAmount = (basePrice * accommodation.discount) / 100;
                            const serviceCharge = ((basePrice - discountAmount) * accommodation.serviceCharge) / 100;
                            const tax = ((basePrice - discountAmount + serviceCharge) * accommodation.tax) / 100;
                            const extraCharge = accommodation.extraCharge;
                            const dayTotal = basePrice + transportPrice - discountAmount + serviceCharge + tax + extraCharge;
                            
                            return (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-center">{accommodation.dayNumber}</td>
                                <td className="border border-gray-300 p-2">{accommodation.hotelName}</td>
                                <td className="border border-gray-300 p-2 text-right">${basePrice.toFixed(2)}</td>
                                <td className="border border-gray-300 p-2 text-right">${transportPrice.toFixed(2)}</td>
                                <td className="border border-gray-300 p-2 text-right">-${discountAmount.toFixed(2)} (${accommodation.discount}%)</td>
                                <td className="border border-gray-300 p-2 text-right">${serviceCharge.toFixed(2)} (${accommodation.serviceCharge}%)</td>
                                <td className="border border-gray-300 p-2 text-right">${tax.toFixed(2)} (${accommodation.tax}%)</td>
                                <td className="border border-gray-300 p-2 text-right">${extraCharge.toFixed(2)}<br/><span className="text-xs text-gray-600">{accommodation.extraChargeNote}</span></td>
                                <td className="border border-gray-300 p-2 text-right font-medium">${dayTotal.toFixed(2)}</td>
                              </tr>
                            );
                          })}
                          <tr className="bg-gray-50 font-medium">
                            <td colSpan={8} className="border border-gray-300 p-2 text-right">Accommodation Total:</td>
                            <td className="border border-gray-300 p-2 text-right">${totals.accommodationsTotal.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Summary Table */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Summary</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left">Category</th>
                          <th className="border border-gray-300 p-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2">Package Price</td>
                          <td className="border border-gray-300 p-2 text-right">${receiptData.packagePrice.toFixed(2)}</td>
                        </tr>
                        {totals.activitiesTotal > 0 && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">Activities</td>
                            <td className="border border-gray-300 p-2 text-right">${totals.activitiesTotal.toFixed(2)}</td>
                          </tr>
                        )}
                        {totals.destinationsTotal > 0 && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">Destinations</td>
                            <td className="border border-gray-300 p-2 text-right">${totals.destinationsTotal.toFixed(2)}</td>
                          </tr>
                        )}
                        {totals.accommodationsTotal > 0 && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">Accommodation</td>
                            <td className="border border-gray-300 p-2 text-right">${totals.accommodationsTotal.toFixed(2)}</td>
                          </tr>
                        )}
                        <tr className="bg-gray-100 font-medium">
                          <td className="border border-gray-300 p-2">Calculated Subtotal</td>
                          <td className="border border-gray-300 p-2 text-right">${totals.calculatedSubtotal.toFixed(2)}</td>
                        </tr>
                        <tr className="bg-gray-100 font-medium">
                          <td className="border border-gray-300 p-2">Actual Subtotal</td>
                          <td className="border border-gray-300 p-2 text-right">${receiptData.subtotal.toFixed(2)}</td>
                        </tr>
                        <tr className={`font-medium ${subtotalDifference === 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <td className="border border-gray-300 p-2">Difference</td>
                          <td className="border border-gray-300 p-2 text-right">${subtotalDifference.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Final Price Summary */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Final Price Summary</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Subtotal:</span>
                        <span className="font-medium">${receiptData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Tax:</span>
                        <span className="font-medium">${receiptData.taxAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Discount:</span>
                        <span className="font-medium">-${receiptData.discountAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Package Price:</span>
                        <span className="font-medium">${receiptData.packagePrice.toFixed(2)}</span>
                      </div>
                      {receiptData.insuranceAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">Insurance:</span>
                          <span className="font-medium">${receiptData.insuranceAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-gray-800">Total Amount:</span>
                        <span className="text-blue-600">${receiptData.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Amount Paid:</span>
                        <span className="font-medium">${receiptData.amountPaid.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-gray-800">Balance Due:</span>
                        <span className="text-red-600">${receiptData.balanceDue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
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
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Participants</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left">Name</th>
                          <th className="border border-gray-300 p-2 text-left">Date of Birth</th>
                          <th className="border border-gray-300 p-2 text-left">Gender</th>
                          <th className="border border-gray-300 p-2 text-left">Passport</th>
                          <th className="border border-gray-300 p-2 text-left">Contact</th>
                          <th className="border border-gray-300 p-2 text-left">Medical Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receiptData.participentDetails.map((participant, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">
                              {participant.firstName} {participant.lastName}
                            </td>
                            <td className="border border-gray-300 p-2">{participant.dateOfBirth}</td>
                            <td className="border border-gray-300 p-2">{participant.gender}</td>
                            <td className="border border-gray-300 p-2">{participant.passportNumber}</td>
                            <td className="border border-gray-300 p-2">
                              <div>{participant.email}</div>
                              <div>{participant.mobileNumber}</div>
                            </td>
                            <td className="border border-gray-300 p-2">
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
              <div className="text-center text-gray-500 mt-6 pt-6 border-t">
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">View Booked Tours Receipt</h1>
      
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      {receiptLoading ? (
        <LoadingSpinner />
      ) : showReceipt ? (
        renderReceipt()
      ) : (
        renderFilterSection()
      )}
    </div>
  );
};

export default BookedToursPage;