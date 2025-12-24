"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Tour, BookingFormData, ReceiptData } from "@/types/booking-types";
import {
  LoadingSpinner,
  Toast,
  Button,
} from "@/components/booking-components/BookingComponents";
import BookingForm from "@/components/booking-components/BookingForm";
import BookingFilterSection from "@/components/booking-components/BookingFilterSection";
import BookingReceipt from "@/components/booking-components/BookingReceipt";
import BookHeroSection from "@/components/booking-components/BookHeroSection";

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
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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
      arrivalLocation: "",
    },
    // bookingPrices: [
    //   {
    //     itemType: "PACKAGE",
    //     itemName: "",
    //     itemDescription: "",
    //     quantity: 1,
    //     unitPrice: 0,
    //     totalPrice: 0
    //   }
    // ],
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
        roomSharingWith: null,
      },
    ],
    bookingNotes: [
      {
        noteType: "CUSTOMER",
        noteText: "",
      },
    ],
    // activities: [
    //   {
    //     activityScheduleId: 0,
    //     numberOfParticipants: 1
    //   }
    // ],
    invoices: {
      billingFullName: "",
      billingAddress: "",
      billingEmail: "",
      billingPhone: "",
    },
  });

  // Show toast message
  const showToast = (message: string, type: "success" | "error" = "error") => {
    setToast({ message, type });
  };

  // Fetch filter data
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/felicita/api/v0/booking/book-tour-filter",
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
        setTours(data.data);

        if (packageScheduleId) {
          const scheduleId = parseInt(packageScheduleId);
          let foundSchedule = false;

          for (const tour of data.data) {
            for (const pkg of tour.packageDetails) {
              const schedule = pkg.packageSchedulesDetails.find(
                (s: any) => s.packageScheduleId === scheduleId
              );
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
        console.error("Error fetching filter data:", error);
        showToast("Failed to load tour data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, [packageScheduleId]);

  // Get selected tour
  const selectedTour = tours.find(
    (t) => t.tourId.toString() === selectedTourId
  );

  // Get selected package
  const selectedPackage = selectedTour?.packageDetails.find(
    (p) => p.packageId.toString() === selectedPackageId
  );

  // Get selected schedule
  const selectedSchedule = selectedPackage?.packageSchedulesDetails.find(
    (s) => s.packageScheduleId.toString() === selectedScheduleId
  );

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
    setFormData((prev) => ({
      ...prev,
      packageScheduleId: scheduleId ? parseInt(scheduleId) : 0,
    }));
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTransportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      transport: {
        ...prev.transport,
        [name]: value,
      },
    }));
  };

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      invoices: {
        ...prev.invoices,
        [name]: value,
      },
    }));
  };

  // Handle participant changes
  const handleParticipantChange = (
    index: number,
    field: keyof Participant,
    value: string | boolean
  ) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      participants: updatedParticipants,
    }));
  };

  const addParticipant = () => {
    setFormData((prev) => ({
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
          roomSharingWith: null,
        },
      ],
    }));
  };

  const removeParticipant = (index: number) => {
    if (formData.participants.length > 1) {
      const updatedParticipants = [...formData.participants];
      updatedParticipants.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        participants: updatedParticipants,
      }));
    }
  };

  // Handle booking price changes
  // const handleBookingPriceChange = (index: number, field: keyof BookingPrice, value: string | number) => {
  //   const updatedPrices = [...formData.bookingPrices];
  //   updatedPrices[index] = {
  //     ...updatedPrices[index],
  //     [field]: field === 'quantity' || field === 'unitPrice' || field === 'totalPrice'
  //       ? (typeof value === 'string' ? parseFloat(value) || 0 : value)
  //       : value
  //   };

  //   if (field === 'quantity' || field === 'unitPrice') {
  //     const quantity = field === 'quantity'
  //       ? (typeof value === 'string' ? parseFloat(value) || 0 : value)
  //       : updatedPrices[index].quantity;
  //     const unitPrice = field === 'unitPrice'
  //       ? (typeof value === 'string' ? parseFloat(value) || 0 : value)
  //       : updatedPrices[index].unitPrice;

  //     updatedPrices[index].totalPrice = quantity * unitPrice;
  //   }

  //   setFormData(prev => ({
  //     ...prev,
  //     bookingPrices: updatedPrices
  //   }));
  // };

  // const addBookingPrice = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     bookingPrices: [
  //       ...prev.bookingPrices,
  //       {
  //         itemType: "EXTRA",
  //         itemName: "",
  //         itemDescription: "",
  //         quantity: 1,
  //         unitPrice: 0,
  //         totalPrice: 0
  //       }
  //     ]
  //   }));
  // };

  // const removeBookingPrice = (index: number) => {
  //   if (formData.bookingPrices.length > 1) {
  //     const updatedPrices = [...formData.bookingPrices];
  //     updatedPrices.splice(index, 1);
  //     setFormData(prev => ({
  //       ...prev,
  //       bookingPrices: updatedPrices
  //     }));
  //   }
  // };

  // Handle activity changes
  // const handleActivityChange = (index: number, field: keyof Activity, value: number) => {
  //   const updatedActivities = [...formData.activities];
  //   updatedActivities[index] = {
  //     ...updatedActivities[index],
  //     [field]: value
  //   };
  //   setFormData(prev => ({
  //     ...prev,
  //     activities: updatedActivities
  //   }));
  // };

  // const addActivity = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     activities: [
  //       ...prev.activities,
  //       {
  //         activityScheduleId: 0,
  //         numberOfParticipants: 1
  //       }
  //     ]
  //   }));
  // };

  // const removeActivity = (index: number) => {
  //   if (formData.activities.length > 1) {
  //     const updatedActivities = [...formData.activities];
  //     updatedActivities.splice(index, 1);
  //     setFormData(prev => ({
  //       ...prev,
  //       activities: updatedActivities
  //     }));
  //   }
  // };

  // Handle booking note changes
  const handleBookingNoteChange = (
    index: number,
    field: keyof BookingNote,
    value: string
  ) => {
    const updatedNotes = [...formData.bookingNotes];
    updatedNotes[index] = {
      ...updatedNotes[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      bookingNotes: updatedNotes,
    }));
  };

  const addBookingNote = () => {
    setFormData((prev) => ({
      ...prev,
      bookingNotes: [
        ...prev.bookingNotes,
        {
          noteType: "CUSTOMER",
          noteText: "",
        },
      ],
    }));
  };

  const removeBookingNote = (index: number) => {
    if (formData.bookingNotes.length > 1) {
      const updatedNotes = [...formData.bookingNotes];
      updatedNotes.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        bookingNotes: updatedNotes,
      }));
    }
  };

  // Handle form submission using fetch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.packageScheduleId) {
      showToast("Please select a package schedule", "error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/felicita/api/v0/booking/book-tour",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.code === 200) {
        const newBookingId = result.data.bookingId;
        setBookingId(newBookingId);
        showToast("Booking submitted successfully!", "success");

        // Fetch receipt data
        await fetchReceiptData(newBookingId);
      } else {
        showToast("Failed to submit booking", "error");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      showToast("Error submitting booking", "error");
    }
  };

  // Fetch receipt data using fetch
  const fetchReceiptData = async (bookingId: number) => {
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
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error fetching receipt:", error);
      showToast("Failed to load receipt", "error");
    }
  };

  // Generate receipt content for download
  const generateReceiptContent = () => {
    if (!receiptData) return "";

    const participantsCount = receiptData.participentDetails.length;

    // Calculate totals
    const calculateAccommodationTotalPerPerson = (accommodations: any[]) => {
      let totalAmount = 0.0;
      for (const p of accommodations) {
        const priceWithServiceCharge =
          (p.price * (100.0 + p.serviceCharge)) / 100;
        const discount = (priceWithServiceCharge * p.discount) / 100;
        const tax = (priceWithServiceCharge * p.tax) / 100;
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

    const calculateActivityTotalPerPerson = (activities: any[]) => {
      let totalAmount = 0.0;
      for (const p of activities) {
        totalAmount += p.pricePerPerson;
      }
      return totalAmount;
    };

    const calculateDestinationExtraTotalPerPerson = (destinations: any[]) => {
      let totalAmount = 0.0;
      for (const p of destinations) {
        totalAmount += p.extraPrice;
      }
      return totalAmount;
    };

    const activitiesTotalPerPerson = calculateActivityTotalPerPerson(
      receiptData.activityDetailsList
    );
    const destinationsTotalPerPerson = calculateDestinationExtraTotalPerPerson(
      receiptData.destiantionDetails
    );
    const accommodationsTotalPerPerson = calculateAccommodationTotalPerPerson(
      receiptData.accommodationDetailsList
    );

    const activitiesTotal = activitiesTotalPerPerson * participantsCount;
    const destinationsTotal = destinationsTotalPerPerson * participantsCount;
    const accommodationsTotal =
      accommodationsTotalPerPerson * participantsCount;

    const calculatedSubtotal =
      activitiesTotal +
      destinationsTotal +
      accommodationsTotal +
      receiptData.packagePrice;
    const subtotalDifference = calculatedSubtotal - receiptData.subtotal;

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
    content += `         PARTICIPANTS (${participantsCount})\n`;
    content += `========================================\n`;
    content += `All prices below are multiplied by ${participantsCount} participants\n\n`;

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
      content += `  Activities Total Per Person: $${activitiesTotalPerPerson.toFixed(
        2
      )}\n`;
      content += `  Activities Total (x${participantsCount}): $${activitiesTotal.toFixed(
        2
      )}\n\n`;
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
      content += `  Destinations Total Per Person: $${destinationsTotalPerPerson.toFixed(
        2
      )}\n`;
      content += `  Destinations Total (x${participantsCount}): $${destinationsTotal.toFixed(
        2
      )}\n\n`;
    }

    // Accommodation per person (using your calculation logic)
    if (receiptData.accommodationDetailsList.length > 0) {
      content += `Accommodation (Per Person - calculated as per backend logic):\n`;
      receiptData.accommodationDetailsList.forEach((accommodation, index) => {
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
      content += `  Accommodation Total Per Person: $${accommodationsTotalPerPerson.toFixed(
        2
      )}\n`;
      content += `  Accommodation Total (x${participantsCount}): $${accommodationsTotal.toFixed(
        2
      )}\n\n`;
    }

    content += `========================================\n`;
    content += `         SUMMARY\n`;
    content += `========================================\n`;
    content += `Participants: ${participantsCount}\n\n`;
    content += `PER PERSON CALCULATIONS:\n`;
    content += `  Activities: $${activitiesTotalPerPerson.toFixed(2)}\n`;
    content += `  Destinations: $${destinationsTotalPerPerson.toFixed(2)}\n`;
    content += `  Accommodation: $${accommodationsTotalPerPerson.toFixed(2)}\n`;
    content += `  Total Per Person (excl. package): $${(
      activitiesTotalPerPerson +
      destinationsTotalPerPerson +
      accommodationsTotalPerPerson
    ).toFixed(2)}\n\n`;

    content += `TOTAL CALCULATIONS (x${participantsCount}):\n`;
    content += `  Package Price: $${receiptData.packagePrice.toFixed(2)}\n`;
    content += `  Activities Total: $${activitiesTotal.toFixed(2)}\n`;
    content += `  Destinations Total: $${destinationsTotal.toFixed(2)}\n`;
    content += `  Accommodation Total: $${accommodationsTotal.toFixed(2)}\n`;
    content += `  Calculated Subtotal: $${calculatedSubtotal.toFixed(2)}\n`;
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
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${receiptData.bookingReference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Print receipt
  const printReceipt = () => {
    const printContent = document.getElementById("receipt-print-content");
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

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto bg-gradient-to-r from-purple-100 to-amber-100">
      {selectedScheduleId && (
        <BookHeroSection packageScheduleId={selectedScheduleId} />
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Book a Tour</h1>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {showReceipt && receiptData ? (
        <BookingReceipt
          receiptData={receiptData}
          onDownloadReceipt={downloadReceipt}
          onPrintReceipt={printReceipt}
          onNewBooking={() => {
            setShowReceipt(false);
            setShowForm(false);
            setSelectedTourId("");
            setSelectedPackageId("");
            setSelectedScheduleId("");
          }}
        />
      ) : showForm ? (
        <>
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setShowForm(false)}
          >
            ← Back to Selection
          </Button>
          <BookingForm
            formData={formData}
            selectedTour={selectedTour}
            selectedPackage={selectedPackage}
            selectedSchedule={selectedSchedule}
            onInputChange={handleInputChange}
            onTransportChange={handleTransportChange}
            onInvoiceChange={handleInvoiceChange}
            onParticipantChange={handleParticipantChange}
            onAddParticipant={addParticipant}
            onRemoveParticipant={removeParticipant}
            // onBookingPriceChange={handleBookingPriceChange}
            // onAddBookingPrice={addBookingPrice}
            // onRemoveBookingPrice={removeBookingPrice}
            // onActivityChange={handleActivityChange}
            // onAddActivity={addActivity}
            // onRemoveActivity={removeActivity}
            onBookingNoteChange={handleBookingNoteChange}
            onAddBookingNote={addBookingNote}
            onRemoveBookingNote={removeBookingNote}
            onSubmit={handleSubmit}
            onBackToSelection={() => setShowForm(false)}
          />
        </>
      ) : (
        <BookingFilterSection
          tours={tours}
          selectedTourId={selectedTourId}
          selectedPackageId={selectedPackageId}
          selectedScheduleId={selectedScheduleId}
          selectedTour={selectedTour}
          selectedPackage={selectedPackage}
          selectedSchedule={selectedSchedule}
          onTourChange={handleTourChange}
          onPackageChange={handlePackageChange}
          onScheduleChange={handleScheduleChange}
          onProceedToForm={() => setShowForm(true)}
        />
      )}
    </div>
  );
};

export default BookingPage;
