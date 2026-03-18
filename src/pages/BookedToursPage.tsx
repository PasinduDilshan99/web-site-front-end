"use client";
import BookedTourHeroSection from "@/components/booking-components/BookedTourHeroSection";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

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
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6 ${className}`}>{children}</div>;

const Label = ({
  children,
  htmlFor,
  className = "",
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-900 mb-1 ${className}`}
  >
    {children}
  </label>
);

// Custom Components with proper TypeScript types

const Select = ({
  id,
  name,
  value,
  onChange,
  children,
  className = "",
  disabled = false,
}: {
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) => (
  <select
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${className}`}
  >
    {children}
  </select>
);

const SelectItem = ({ 
  value, 
  children 
}: { 
  value: string; 
  children: React.ReactNode 
}) => (
  <option value={value} className="text-gray-900">
    {children}
  </option>
);

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
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

const Toast = ({
  message,
  type = "error",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-md shadow-lg ${
        type === "success"
          ? "bg-green-100 text-green-900 border border-green-200"
          : "bg-red-100 text-red-900 border border-red-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 text-lg">
          &times;
        </button>
      </div>
    </div>
  );
};

const Separator = ({ className = "" }: { className?: string }) => (
  <hr className={`border-t border-gray-200 ${className}`} />
);

const BookedToursPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get("bookingId") || "";

  // States
  const [bookedTours, setBookedTours] = useState<BookedTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookingId || ""
  );
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Show toast message
  const showToast = (message: string, type: "success" | "error" = "error") => {
    setToast({ message, type });
  };

  // Fetch booked tours
  useEffect(() => {
    const fetchBookedTours = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/felicita/api/v0/booking/booked-tours",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          }
        );

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
        console.error("Error fetching booked tours:", error);
        showToast("Failed to load booked tours", "error");
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
      const response = await fetch(
        `http://localhost:8080/felicita/api/v0/booking/book-receipt/${bookingId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.code === 200) {
        setReceiptData(result.data);
        setShowReceipt(true);
      }
    } catch (error) {
      console.error("Error fetching receipt:", error);
      showToast("Failed to load receipt", "error");
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

  // Calculate accommodation total per person using your backend logic
  const calculateAccommodationTotalPerPerson = (
    accommodations: AccommodationDetail[]
  ): number => {
    let totalAmount = 0.0;

    for (const p of accommodations) {
      // Calculate price with service charge
      const priceWithServiceCharge =
        (p.price * (100.0 + p.serviceCharge)) / 100;

      // Calculate discount
      const discount = (priceWithServiceCharge * p.discount) / 100;

      // Calculate tax
      const tax = (priceWithServiceCharge * p.tax) / 100;

      // Calculate total for this accommodation day
      const total =
        priceWithServiceCharge -
        discount +
        tax +
        p.extraCharge +
        p.transportPrice;
      totalAmount += total;
    }

    return totalAmount;
  };

  // Calculate activity total per person using your backend logic
  const calculateActivityTotalPerPerson = (
    activities: ActivityDetail[]
  ): number => {
    let totalAmount = 0.0;

    for (const p of activities) {
      totalAmount += p.pricePerPerson;
    }

    return totalAmount;
  };

  // Calculate destination extra total per person using your backend logic
  const calculateDestinationExtraTotalPerPerson = (
    destinations: DestinationDetail[]
  ): number => {
    let totalAmount = 0.0;

    for (const p of destinations) {
      totalAmount += p.extraPrice;
    }

    return totalAmount;
  };

  // Calculate totals with participant count using your backend logic
  const calculateTotals = () => {
    if (!receiptData)
      return {
        activitiesTotalPerPerson: 0,
        destinationsTotalPerPerson: 0,
        accommodationsTotalPerPerson: 0,
        activitiesTotal: 0,
        destinationsTotal: 0,
        accommodationsTotal: 0,
        calculatedSubtotal: 0,
        participantsCount: 0,
      };

    const participantsCount = receiptData.participentDetails.length;

    // Calculate per person totals using your backend logic
    const activitiesTotalPerPerson = calculateActivityTotalPerPerson(
      receiptData.activityDetailsList
    );
    const destinationsTotalPerPerson = calculateDestinationExtraTotalPerPerson(
      receiptData.destiantionDetails
    );
    const accommodationsTotalPerPerson = calculateAccommodationTotalPerPerson(
      receiptData.accommodationDetailsList
    );

    // Multiply by participants count for total
    const activitiesTotal = activitiesTotalPerPerson * participantsCount;
    const destinationsTotal = destinationsTotalPerPerson * participantsCount;
    const accommodationsTotal =
      accommodationsTotalPerPerson * participantsCount;

    // Add package price to calculate subtotal
    const calculatedSubtotal =
      activitiesTotal + destinationsTotal + accommodationsTotal;

    return {
      activitiesTotalPerPerson,
      destinationsTotalPerPerson,
      accommodationsTotalPerPerson,
      activitiesTotal,
      destinationsTotal,
      accommodationsTotal,
      calculatedSubtotal,
      participantsCount,
    };
  };

  // Generate PDF using jsPDF (simplified - for production, use a proper PDF library)
  const downloadPDF = () => {
    if (!receiptData) return;

    // For now, we'll create a simple downloadable text file
    // In a real application, you would use jsPDF or similar library
    const receiptContent = generateReceiptContent();

    // Create PDF-like structure
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${receiptData.bookingReference}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #000; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #2c3e50; margin-bottom: 5px; }
          .header p { color: #7f8c8d; }
          .section { margin-bottom: 25px; }
          .section-title { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; margin-bottom: 15px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th { background-color: #f8f9fa; color: #000; text-align: left; padding: 10px; border: 1px solid #dee2e6; }
          td { padding: 10px; border: 1px solid #dee2e6; color: #000; }
          .total-row { background-color: #f8f9fa; font-weight: bold; }
          .amount { text-align: right; }
          .footer { margin-top: 40px; text-align: center; color: #7f8c8d; font-size: 0.9em; }
        </style>
      </head>
      <body>
        ${generatePDFContent()}
      </body>
      </html>
    `;

    // Open in new window for printing/saving
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(pdfContent);
      newWindow.document.close();
    }

    showToast("PDF generated. Use browser print to save as PDF.", "success");
  };

  // Generate receipt content for text file
  const generateReceiptContent = () => {
    if (!receiptData) return "";

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
        content += `     Price/Person: $${activity.pricePerPerson.toFixed(
          2
        )}\n`;
      });
      content += `  Activities Total Per Person: $${totals.activitiesTotalPerPerson.toFixed(
        2
      )}\n`;
      content += `  Activities Total (x${
        totals.participantsCount
      }): $${totals.activitiesTotal.toFixed(2)}\n\n`;
    }

    // Destinations per person
    if (receiptData.destiantionDetails.length > 0) {
      content += `Destinations (Per Person):\n`;
      receiptData.destiantionDetails.forEach((destination, index) => {
        content += `  ${index + 1}. ${destination.destinationName}\n`;
        content += `     Description: ${destination.destinationDescription}\n`;
        content += `     Price per person: $${destination.extraPrice.toFixed(
          2
        )}\n`;
      });
      content += `  Destinations Total Per Person: $${totals.destinationsTotalPerPerson.toFixed(
        2
      )}\n`;
      content += `  Destinations Total (x${
        totals.participantsCount
      }): $${totals.destinationsTotal.toFixed(2)}\n\n`;
    }

    // Accommodation per person (using your calculation logic)
    if (receiptData.accommodationDetailsList.length > 0) {
      content += `Accommodation (Per Person - calculated as per backend logic):\n`;
      receiptData.accommodationDetailsList.forEach((accommodation, index) => {
        // Calculate using your backend logic
        const priceWithServiceCharge =
          (accommodation.price * (100.0 + accommodation.serviceCharge)) / 100;
        const discount =
          (priceWithServiceCharge * accommodation.discount) / 100;
        const tax = (priceWithServiceCharge * accommodation.tax) / 100;
        const dayTotalPerPerson =
          priceWithServiceCharge -
          discount +
          tax +
          accommodation.extraCharge +
          accommodation.transportPrice;

        content += `  Day ${accommodation.dayNumber} - ${accommodation.hotelName}:\n`;
        content += `     Base Price: $${accommodation.price.toFixed(2)}\n`;
        content += `     With Service Charge (${
          accommodation.serviceCharge
        }%): $${priceWithServiceCharge.toFixed(2)}\n`;
        content += `     Discount (${
          accommodation.discount
        }%): -$${discount.toFixed(2)}\n`;
        content += `     Tax (${accommodation.tax}%): $${tax.toFixed(2)}\n`;
        content += `     Extra Charge: $${accommodation.extraCharge.toFixed(
          2
        )}\n`;
        content += `     Transport: $${accommodation.transportPrice.toFixed(
          2
        )}\n`;
        content += `     Day Total Per Person: $${dayTotalPerPerson.toFixed(
          2
        )}\n`;
      });
      content += `  Accommodation Total Per Person: $${totals.accommodationsTotalPerPerson.toFixed(
        2
      )}\n`;
      content += `  Accommodation Total (x${
        totals.participantsCount
      }): $${totals.accommodationsTotal.toFixed(2)}\n\n`;
    }

    content += `========================================\n`;
    content += `         SUMMARY\n`;
    content += `========================================\n`;
    content += `Participants: ${totals.participantsCount}\n\n`;
    content += `PER PERSON CALCULATIONS:\n`;
    content += `  Activities: $${totals.activitiesTotalPerPerson.toFixed(2)}\n`;
    content += `  Destinations: $${totals.destinationsTotalPerPerson.toFixed(
      2
    )}\n`;
    content += `  Accommodation: $${totals.accommodationsTotalPerPerson.toFixed(
      2
    )}\n`;
    content += `  Total Per Person (excl. package): $${(
      totals.activitiesTotalPerPerson +
      totals.destinationsTotalPerPerson +
      totals.accommodationsTotalPerPerson
    ).toFixed(2)}\n\n`;

    content += `TOTAL CALCULATIONS (x${totals.participantsCount}):\n`;
    content += `  Package Price: $${receiptData.packagePrice.toFixed(2)}\n`;
    content += `  Activities Total: $${totals.activitiesTotal.toFixed(2)}\n`;
    content += `  Destinations Total: $${totals.destinationsTotal.toFixed(
      2
    )}\n`;
    content += `  Accommodation Total: $${totals.accommodationsTotal.toFixed(
      2
    )}\n`;
    content += `  Calculated Subtotal: $${totals.calculatedSubtotal.toFixed(
      2
    )}\n`;
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

  // Generate HTML content for PDF
  const generatePDFContent = () => {
    if (!receiptData) return "";

    const totals = calculateTotals();
    const subtotalDifference = totals.calculatedSubtotal - receiptData.subtotal;

    return `
      <div class="header">
        <h1>BOOKING RECEIPT</h1>
        <p>Receipt for Booking #${receiptData.bookingReference}</p>
      </div>
      
      <div class="section">
        <h2 class="section-title">Booking Information</h2>
        <table>
          <tr>
            <td><strong>Booking ID:</strong></td>
            <td>${receiptData.bookingId}</td>
            <td><strong>Booking Date:</strong></td>
            <td>${receiptData.bookingDate}</td>
          </tr>
          <tr>
            <td><strong>Reference:</strong></td>
            <td>${receiptData.bookingReference}</td>
            <td><strong>Status:</strong></td>
            <td>${receiptData.bookingStatus}</td>
          </tr>
          <tr>
            <td><strong>Invoice:</strong></td>
            <td>${receiptData.invoiceNumber}</td>
            <td><strong>Due Date:</strong></td>
            <td>${receiptData.dueDate}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h2 class="section-title">Tour Details</h2>
        <p><strong>Tour:</strong> ${receiptData.tourName}</p>
        <p><strong>Package:</strong> ${receiptData.packageName}</p>
        <p><strong>Dates:</strong> ${receiptData.assumeStartDate} to ${
      receiptData.assumeEndDate
    }</p>
        <p><strong>Participants:</strong> ${
          totals.participantsCount
        } persons</p>
        <p>${receiptData.tourDescription}</p>
      </div>
      
      <div class="section">
        <h2 class="section-title">Price Breakdown</h2>
        <p><em>Note: All per person prices are multiplied by ${
          totals.participantsCount
        } participants</em></p>
        
        <h3>Package Price (Total)</h3>
        <table>
          <tr>
            <th>Item</th>
            <th class="amount">Amount</th>
          </tr>
          <tr>
            <td>Tour Package (${receiptData.tourName})</td>
            <td class="amount">$${receiptData.packagePrice.toFixed(2)}</td>
          </tr>
        </table>
        
        ${
          totals.activitiesTotal > 0
            ? `
        <h3>Activities</h3>
        <p><em>Per Person: $${totals.activitiesTotalPerPerson.toFixed(
          2
        )} | Total (x${
                totals.participantsCount
              }): $${totals.activitiesTotal.toFixed(2)}</em></p>
        <table>
          <tr>
            <th>Activity</th>
            <th>Participants</th>
            <th class="amount">Price/Person</th>
          </tr>
          ${receiptData.activityDetailsList
            .map(
              (activity, index) => `
            <tr>
              <td>${activity.activityName}</td>
              <td>${activity.numberOfParticipants}</td>
              <td class="amount">$${activity.pricePerPerson.toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
          <tr class="total-row">
            <td colspan="2">Activities Total Per Person:</td>
            <td class="amount">$${totals.activitiesTotalPerPerson.toFixed(
              2
            )}</td>
          </tr>
          <tr class="total-row">
            <td colspan="2">Activities Total (x${
              totals.participantsCount
            }):</td>
            <td class="amount">$${totals.activitiesTotal.toFixed(2)}</td>
          </tr>
        </table>
        `
            : ""
        }
        
        ${
          totals.destinationsTotal > 0
            ? `
        <h3>Destinations</h3>
        <p><em>Per Person: $${totals.destinationsTotalPerPerson.toFixed(
          2
        )} | Total (x${
                totals.participantsCount
              }): $${totals.destinationsTotal.toFixed(2)}</em></p>
        <table>
          <tr>
            <th>Destination</th>
            <th class="amount">Price/Person</th>
          </tr>
          ${receiptData.destiantionDetails
            .map(
              (destination, index) => `
            <tr>
              <td>${destination.destinationName}</td>
              <td class="amount">$${destination.extraPrice.toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
          <tr class="total-row">
            <td>Destinations Total Per Person:</td>
            <td class="amount">$${totals.destinationsTotalPerPerson.toFixed(
              2
            )}</td>
          </tr>
          <tr class="total-row">
            <td>Destinations Total (x${totals.participantsCount}):</td>
            <td class="amount">$${totals.destinationsTotal.toFixed(2)}</td>
          </tr>
        </table>
        `
            : ""
        }
        
        ${
          totals.accommodationsTotal > 0
            ? `
        <h3>Accommodation</h3>
        <p><em>Per Person: $${totals.accommodationsTotalPerPerson.toFixed(
          2
        )} | Total (x${
                totals.participantsCount
              }): $${totals.accommodationsTotal.toFixed(2)}</em></p>
        <table>
          <tr>
            <th>Day</th>
            <th>Hotel</th>
            <th class="amount">Price/Person</th>
            <th class="amount">Transport/Person</th>
            <th class="amount">Day Total/Person</th>
          </tr>
          ${receiptData.accommodationDetailsList
            .map((accommodation, index) => {
              // Calculate using your backend logic
              const priceWithServiceCharge =
                (accommodation.price * (100.0 + accommodation.serviceCharge)) /
                100;
              const discount =
                (priceWithServiceCharge * accommodation.discount) / 100;
              const tax = (priceWithServiceCharge * accommodation.tax) / 100;
              const dayTotalPerPerson =
                priceWithServiceCharge -
                discount +
                tax +
                accommodation.extraCharge +
                accommodation.transportPrice;

              return `
              <tr>
                <td>${accommodation.dayNumber}</td>
                <td>${accommodation.hotelName}</td>
                <td class="amount">$${accommodation.price.toFixed(2)}</td>
                <td class="amount">$${accommodation.transportPrice.toFixed(
                  2
                )}</td>
                <td class="amount">$${dayTotalPerPerson.toFixed(2)}</td>
              </tr>
            `;
            })
            .join("")}
          <tr class="total-row">
            <td colspan="4">Accommodation Total Per Person:</td>
            <td class="amount">$${totals.accommodationsTotalPerPerson.toFixed(
              2
            )}</td>
          </tr>
          <tr class="total-row">
            <td colspan="4">Accommodation Total (x${
              totals.participantsCount
            }):</td>
            <td class="amount">$${totals.accommodationsTotal.toFixed(2)}</td>
          </tr>
        </table>
        `
            : ""
        }
        
        <h3>Summary</h3>
        <table>
          <tr>
            <th>Category</th>
            <th class="amount">Per Person</th>
            <th class="amount">Total (x${totals.participantsCount})</th>
          </tr>
          ${
            totals.activitiesTotal > 0
              ? `
          <tr>
            <td>Activities</td>
            <td class="amount">$${totals.activitiesTotalPerPerson.toFixed(
              2
            )}</td>
            <td class="amount">$${totals.activitiesTotal.toFixed(2)}</td>
          </tr>
          `
              : ""
          }
          ${
            totals.destinationsTotal > 0
              ? `
          <tr>
            <td>Destinations</td>
            <td class="amount">$${totals.destinationsTotalPerPerson.toFixed(
              2
            )}</td>
            <td class="amount">$${totals.destinationsTotal.toFixed(2)}</td>
          </tr>
          `
              : ""
          }
          ${
            totals.accommodationsTotal > 0
              ? `
          <tr>
            <td>Accommodation</td>
            <td class="amount">$${totals.accommodationsTotalPerPerson.toFixed(
              2
            )}</td>
            <td class="amount">$${totals.accommodationsTotal.toFixed(2)}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td>Package Price</td>
            <td class="amount">N/A</td>
            <td class="amount">$${receiptData.packagePrice.toFixed(2)}</td>
          </tr>
          <tr class="total-row">
            <td><strong>Calculated Subtotal</strong></td>
            <td class="amount"><strong>$${(
              totals.activitiesTotalPerPerson +
              totals.destinationsTotalPerPerson +
              totals.accommodationsTotalPerPerson
            ).toFixed(2)}</strong></td>
            <td class="amount"><strong>$${totals.calculatedSubtotal.toFixed(
              2
            )}</strong></td>
          </tr>
          <tr>
            <td>Actual Subtotal</td>
            <td class="amount"></td>
            <td class="amount">$${receiptData.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Difference</td>
            <td class="amount"></td>
            <td class="amount ${
              subtotalDifference === 0 ? "text-green-600" : "text-red-600"
            }">$${subtotalDifference.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h2 class="section-title">Final Invoice</h2>
        <table>
          <tr>
            <td>Subtotal:</td>
            <td class="amount">$${receiptData.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td class="amount">$${receiptData.taxAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Discount:</td>
            <td class="amount">-$${receiptData.discountAmount.toFixed(2)}</td>
          </tr>
          ${
            receiptData.insuranceAmount
              ? `
          <tr>
            <td>Insurance:</td>
            <td class="amount">$${receiptData.insuranceAmount.toFixed(2)}</td>
          </tr>
          `
              : ""
          }
          <tr class="total-row">
            <td><strong>Total Amount:</strong></td>
            <td class="amount"><strong>$${receiptData.totalAmount.toFixed(
              2
            )}</strong></td>
          </tr>
          <tr>
            <td>Amount Paid:</td>
            <td class="amount">$${receiptData.amountPaid.toFixed(2)}</td>
          </tr>
          <tr class="total-row">
            <td><strong>Balance Due:</strong></td>
            <td class="amount"><strong>$${receiptData.balanceDue.toFixed(
              2
            )}</strong></td>
          </tr>
          <tr>
            <td>Final Amount:</td>
            <td class="amount">$${receiptData.finalAmount.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      <div class="footer">
        <p>For any queries, please contact our customer service.</p>
        <p>Thank you for choosing our services!</p>
      </div>
    `;
  };

  // Print receipt
  const printReceipt = () => {
    const printContent = document.getElementById("receipt-content");
    if (printContent) {
      const printStyles = `
        <style>
          body {
            margin: 0;
            padding: 16px;
            color: #000;
          }
          @media print {
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
      const printWindow = window.open("", "_blank", "noopener,noreferrer");
      if (!printWindow) return;

      printWindow.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Booking Receipt</title>
            ${printStyles}
          </head>
          <body>
            <div id="receipt-print-content">${printContent.innerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
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
            <Label htmlFor="bookingSelect">
              Select Booking Reference or Invoice Number
            </Label>
            <Select
              id="bookingSelect"
              value={selectedBookingId}
              onChange={handleBookingSelect}
            >
              <SelectItem value="">Select a booking</SelectItem>
              {bookedTours.map((tour) => (
                <SelectItem
                  key={tour.bookingId}
                  value={tour.bookingId.toString()}
                >
                  {tour.bookingReference} - {tour.tourName} ({tour.packageName})
                  {tour.bookingInvoiceNumber
                    ? ` - Invoice: ${tour.bookingInvoiceNumber}`
                    : ""}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="text-sm text-gray-600">
            <p>Select a booking from the list above to view its receipt.</p>
            <p>
              If you have a booking ID in the URL, it will be automatically
              selected.
            </p>
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
                <Button variant="outline" onClick={downloadPDF}>
                  Download PDF
                </Button>
                <Button variant="outline" onClick={printReceipt}>
                  Print Receipt
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReceipt(false);
                    setReceiptData(null);
                    setSelectedBookingId("");
                  }}
                >
                  Back to Selection
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div id="receipt-print-content" className="space-y-6 text-gray-900">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  BOOKING CONFIRMATION
                </h2>
                <p className="text-gray-700 mt-1">
                  Receipt for Booking #{receiptData.bookingReference}
                </p>
              </div>

              {/* Booking Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>
                    <strong className="text-gray-900">Booking ID:</strong>{" "}
                    {receiptData.bookingId}
                  </p>
                  <p>
                    <strong className="text-gray-900">Reference:</strong>{" "}
                    {receiptData.bookingReference}
                  </p>
                  <p>
                    <strong className="text-gray-900">Invoice:</strong>{" "}
                    {receiptData.invoiceNumber}
                  </p>
                  <p>
                    <strong className="text-gray-900">Status:</strong>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${
                        receiptData.bookingStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-900"
                          : receiptData.bookingStatus === "CONFIRMED"
                          ? "bg-green-100 text-green-900"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {receiptData.bookingStatus}
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong className="text-gray-900">Invoice Date:</strong>{" "}
                    {receiptData.invoiceDate}
                  </p>
                  <p>
                    <strong className="text-gray-900">Due Date:</strong>{" "}
                    {receiptData.dueDate}
                  </p>
                  <p>
                    <strong className="text-gray-900">Booking Date:</strong>{" "}
                    {receiptData.bookingDate}
                  </p>
                  <p>
                    <strong className="text-gray-900">Tour Dates:</strong>{" "}
                    {receiptData.assumeStartDate} to {receiptData.assumeEndDate}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Tour Details */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Tour Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong className="text-gray-900">Tour:</strong>{" "}
                    {receiptData.tourName}
                  </p>
                  <p>
                    <strong className="text-gray-900">Package:</strong>{" "}
                    {receiptData.packageName}
                  </p>
                  <p>
                    <strong className="text-gray-900">Participants:</strong>{" "}
                    {totals.participantsCount} persons
                  </p>
                  <p className="text-gray-700 mt-2">
                    {receiptData.tourDescription}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Price Breakdown
                </h3>
                <p className="text-gray-700 mb-4">
                  <em>
                    Note: Per person prices are multiplied by{" "}
                    {totals.participantsCount} participants
                  </em>
                </p>

                {/* Package Price */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Package Price (Total)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Item
                          </th>
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Description
                          </th>
                          <th className="border border-gray-300 p-2 text-right text-gray-900">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2 text-gray-900">
                            Tour Package
                          </td>
                          <td className="border border-gray-300 p-2 text-gray-900">
                            {receiptData.tourName} - {receiptData.packageName}
                          </td>
                          <td className="border border-gray-300 p-2 text-right text-gray-900">
                            ${receiptData.packagePrice.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Activities Table */}
                {receiptData.activityDetailsList.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Activities
                    </h4>
                    <p className="text-gray-700 mb-2">
                      <em>
                        Per Person: $
                        {totals.activitiesTotalPerPerson.toFixed(2)} | Total (x
                        {totals.participantsCount}): $
                        {totals.activitiesTotal.toFixed(2)}
                      </em>
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left text-gray-900">
                              Activity
                            </th>
                            <th className="border border-gray-300 p-2 text-left text-gray-900">
                              Description
                            </th>
                            <th className="border border-gray-300 p-2 text-center text-gray-900">
                              Participants
                            </th>
                            <th className="border border-gray-300 p-2 text-right text-gray-900">
                              Price/Person
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.activityDetailsList.map(
                            (activity, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-gray-900">
                                  {activity.activityName}
                                </td>
                                <td className="border border-gray-300 p-2 text-gray-900">
                                  {activity.activityDescription}
                                </td>
                                <td className="border border-gray-300 p-2 text-center text-gray-900">
                                  {activity.numberOfParticipants}
                                </td>
                                <td className="border border-gray-300 p-2 text-right text-gray-900">
                                  ${activity.pricePerPerson.toFixed(2)}
                                </td>
                              </tr>
                            )
                          )}
                          <tr className="bg-gray-50 font-medium">
                            <td
                              colSpan={3}
                              className="border border-gray-300 p-2 text-right text-gray-900"
                            >
                              Activities Total Per Person:
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.activitiesTotalPerPerson.toFixed(2)}
                            </td>
                          </tr>
                          <tr className="bg-gray-100 font-medium">
                            <td
                              colSpan={3}
                              className="border border-gray-300 p-2 text-right text-gray-900"
                            >
                              Activities Total (x{totals.participantsCount}):
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.activitiesTotal.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Destinations Table */}
                {receiptData.destiantionDetails.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Destinations
                    </h4>
                    <p className="text-gray-700 mb-2">
                      <em>
                        Per Person: $
                        {totals.destinationsTotalPerPerson.toFixed(2)} | Total
                        (x{totals.participantsCount}): $
                        {totals.destinationsTotal.toFixed(2)}
                      </em>
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left text-gray-900">
                              Destination
                            </th>
                            <th className="border border-gray-300 p-2 text-left text-gray-900">
                              Description
                            </th>
                            <th className="border border-gray-300 p-2 text-center text-gray-900">
                              Price/Person
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.destiantionDetails.map(
                            (destination, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-gray-900">
                                  {destination.destinationName}
                                </td>
                                <td className="border border-gray-300 p-2 text-gray-900">
                                  {destination.destinationDescription}
                                </td>
                                <td className="border border-gray-300 p-2 text-center text-gray-900">
                                  ${destination.extraPrice.toFixed(2)}
                                </td>
                              </tr>
                            )
                          )}
                          <tr className="bg-gray-50 font-medium">
                            <td
                              colSpan={2}
                              className="border border-gray-300 p-2 text-right text-gray-900"
                            >
                              Destinations Total Per Person:
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.destinationsTotalPerPerson.toFixed(2)}
                            </td>
                          </tr>
                          <tr className="bg-gray-100 font-medium">
                            <td
                              colSpan={2}
                              className="border border-gray-300 p-2 text-right text-gray-900"
                            >
                              Destinations Total (x{totals.participantsCount}):
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.destinationsTotal.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Accommodation Table */}
                {receiptData.accommodationDetailsList.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Accommodation
                    </h4>
                    <p className="text-gray-700 mb-2">
                      <em>
                        Per Person: $
                        {totals.accommodationsTotalPerPerson.toFixed(2)} | Total
                        (x{totals.participantsCount}): $
                        {totals.accommodationsTotal.toFixed(2)}
                      </em>
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left text-gray-900">
                              Day
                            </th>
                            <th className="border border-gray-300 p-2 text-left text-gray-900">
                              Hotel
                            </th>
                            <th className="border border-gray-300 p-2 text-right text-gray-900">
                              Price/Person
                            </th>
                            <th className="border border-gray-300 p-2 text-right text-gray-900">
                              Transport/Person
                            </th>
                            <th className="border border-gray-300 p-2 text-right text-gray-900">
                              Day Total/Person
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptData.accommodationDetailsList.map(
                            (accommodation, index) => {
                              // Calculate using your backend logic
                              const priceWithServiceCharge =
                                (accommodation.price *
                                  (100.0 + accommodation.serviceCharge)) /
                                100;
                              const discount =
                                (priceWithServiceCharge *
                                  accommodation.discount) /
                                100;
                              const tax =
                                (priceWithServiceCharge * accommodation.tax) /
                                100;
                              const dayTotalPerPerson =
                                priceWithServiceCharge -
                                discount +
                                tax +
                                accommodation.extraCharge +
                                accommodation.transportPrice;

                              return (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-2 text-center text-gray-900">
                                    {accommodation.dayNumber}
                                  </td>
                                  <td className="border border-gray-300 p-2 text-gray-900">
                                    {accommodation.hotelName}
                                  </td>
                                  <td className="border border-gray-300 p-2 text-right text-gray-900">
                                    ${accommodation.price.toFixed(2)}
                                  </td>
                                  <td className="border border-gray-300 p-2 text-right text-gray-900">
                                    ${accommodation.transportPrice.toFixed(2)}
                                  </td>
                                  <td className="border border-gray-300 p-2 text-right font-medium text-gray-900">
                                    ${dayTotalPerPerson.toFixed(2)}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                          <tr className="bg-gray-50 font-medium">
                            <td
                              colSpan={4}
                              className="border border-gray-300 p-2 text-right text-gray-900"
                            >
                              Accommodation Total Per Person:
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.accommodationsTotalPerPerson.toFixed(2)}
                            </td>
                          </tr>
                          <tr className="bg-gray-100 font-medium">
                            <td
                              colSpan={4}
                              className="border border-gray-300 p-2 text-right text-gray-900"
                            >
                              Accommodation Total (x{totals.participantsCount}):
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.accommodationsTotal.toFixed(2)}
                            </td>
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
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Category
                          </th>
                          <th className="border border-gray-300 p-2 text-right text-gray-900">
                            Per Person
                          </th>
                          <th className="border border-gray-300 p-2 text-right text-gray-900">
                            Total (x{totals.participantsCount})
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {totals.activitiesTotal > 0 && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 text-gray-900">
                              Activities
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.activitiesTotalPerPerson.toFixed(2)}
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.activitiesTotal.toFixed(2)}
                            </td>
                          </tr>
                        )}
                        {totals.destinationsTotal > 0 && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 text-gray-900">
                              Destinations
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.destinationsTotalPerPerson.toFixed(2)}
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.destinationsTotal.toFixed(2)}
                            </td>
                          </tr>
                        )}
                        {totals.accommodationsTotal > 0 && (
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2 text-gray-900">
                              Accommodation
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.accommodationsTotalPerPerson.toFixed(2)}
                            </td>
                            <td className="border border-gray-300 p-2 text-right text-gray-900">
                              ${totals.accommodationsTotal.toFixed(2)}
                            </td>
                          </tr>
                        )}
                        <tr className="bg-gray-100 font-medium">
                          <td className="border border-gray-300 p-2 text-gray-900">
                            Calculated Subtotal
                          </td>
                          <td className="border border-gray-300 p-2 text-right text-gray-900">
                            $
                            {(
                              totals.activitiesTotalPerPerson +
                              totals.destinationsTotalPerPerson +
                              totals.accommodationsTotalPerPerson
                            ).toFixed(2)}
                          </td>
                          <td className="border border-gray-300 p-2 text-right text-gray-900">
                            ${totals.calculatedSubtotal.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Final Price Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Final Price Summary
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-900">Total Amount:</span>
                        <span className="font-medium text-gray-900">
                          ${receiptData.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Tax:</span>
                        <span className="font-medium text-gray-900">
                          ${receiptData.taxAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Discount:</span>
                        <span className="font-medium text-gray-900">
                          -${receiptData.discountAmount.toFixed(2)}
                        </span>
                      </div>
                      {receiptData.insuranceAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-900">Insurance:</span>
                          <span className="font-medium text-gray-900">
                            ${receiptData.insuranceAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-gray-900">Sub Total Amount:</span>
                        <span className="text-blue-600">
                          ${receiptData.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">Amount Paid:</span>
                        <span className="font-medium text-gray-900">
                          ${receiptData.amountPaid.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-gray-900">Balance Due:</span>
                        <span className="text-red-600">
                          ${receiptData.balanceDue.toFixed(2)}
                        </span>
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
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Participants ({totals.participantsCount})
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Name
                          </th>
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Date of Birth
                          </th>
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Gender
                          </th>
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Passport
                          </th>
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Contact
                          </th>
                          <th className="border border-gray-300 p-2 text-left text-gray-900">
                            Medical Info
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {receiptData.participentDetails.map(
                          (participant, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 text-gray-900">
                                {participant.firstName} {participant.lastName}
                              </td>
                              <td className="border border-gray-300 p-2 text-gray-900">
                                {participant.dateOfBirth}
                              </td>
                              <td className="border border-gray-300 p-2 text-gray-900">
                                {participant.gender}
                              </td>
                              <td className="border border-gray-300 p-2 text-gray-900">
                                {participant.passportNumber}
                              </td>
                              <td className="border border-gray-300 p-2 text-gray-900">
                                <div>{participant.email}</div>
                                <div>{participant.mobileNumber}</div>
                              </td>
                              <td className="border border-gray-300 p-2 text-gray-900">
                                <div>
                                  <strong>Medical:</strong>{" "}
                                  {participant.medicalConditions}
                                </div>
                                <div>
                                  <strong>Allergies:</strong>{" "}
                                  {participant.allergies}
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="text-center text-gray-700 mt-6 pt-6 border-t">
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
    <div className="bg-gradient-to-r from-purple-100 to-amber-100">
      {selectedBookingId && (
        <BookedTourHeroSection bookingId={selectedBookingId} />
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        View Booked Tours Receipt
      </h1>

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
