"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ReviewsSection from "@/components/sri-lankan-tours-components/ReviewsSection";
import TourMapContainer from "@/components/sri-lankan-tours-components/tour-map-components/TourMapContainer";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import { EmptyState } from "@/components/common-components/empty-state/EmptyState";
import SLTourDetailsHeroSection from "@/components/sri-lankan-tours-components/SLTourDetailsHeroSection";
import SLTourDetailsOverview from "@/components/sri-lankan-tours-components/SLTourDetailsOverview";
import SLTourDetailsSchedules from "@/components/sri-lankan-tours-components/SLTourDetailsSchedules";
import SLTourDetailsBookingSidebar from "@/components/sri-lankan-tours-components/SLTourDetailsBookingSidebar";
import TourHistorySection from "@/components/sri-lankan-tours-components/TourHistorySection";
import TourHistoryGallery from "@/components/sri-lankan-tours-components/TourHistoryGallery";
import SLTourDayWiseDetails from "@/components/sri-lankan-tours-components/SLTourDayWiseDetails";
import { Calendar } from "lucide-react";
import { PackageSchedulesComponent } from "@/components/sri-lankan-tours-components/tour-day-to-day-details-components/PackageSchedules";
import { PackageService } from "@/services/packageService"; // Import package service
import { EmployeeService } from "@/services/employeeService"; // Import employee service
import {
  Accommodation,
  DayDetails,
  TourDetails,
  TourExtraDetails,
  TourHistory,
  TourHistoryImage,
  TourReview,
} from "@/types/tour-types"; // Import types
import {
  Package,
  PackageDayAccommodation,
  PackageExtraDetailsData,
  PackageSchedule,
  PackageSchedulesData,
} from "@/types/package-types"; // Import package types
import { TourAssignedEmployeeResponse } from "@/types/employee-types"; // Import employee types
import { TourService } from "@/services/tourService";

const SriLankanTourDetailsPage = () => {
  const params = useParams();
  const sriLankanTourId = params?.sriLankanTourId || null;
  const tourId = sriLankanTourId?.[0] || "1";

  const [tour, setTour] = React.useState<TourDetails | null>(null);
  const [reviews, setReviews] = React.useState<TourReview[]>([]);
  const [tourLoading, setTourLoading] = React.useState(true);
  const [reviewsLoading, setReviewsLoading] = React.useState(true);
  const [tourError, setTourError] = React.useState<string | null>(null);
  const [reviewsError, setReviewsError] = React.useState<string | null>(null);
  const [histories, setHistories] = useState<TourHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<TourHistoryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState<boolean>(true);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [dayDetails, setDayDetails] = React.useState<DayDetails[]>([]);
  const [dayDetailsLoading, setDayDetailsLoading] = React.useState(true);
  const [dayDetailsError, setDayDetailsError] = React.useState<string | null>(
    null,
  );
  const router = useRouter();
  const [tourExtraDetails, setTourExtraDetails] =
    useState<TourExtraDetails | null>(null);
  const [tourExtraDetailsLoading, setTourExtraDetailsLoading] = useState(false);
  const [tourExtraDetailsError, setTourExtraDetailsError] = useState<
    string | null
  >(null);

  // Add package states
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [packagesError, setPackagesError] = useState<string | null>(null);
  const [dayDetailsWithAccommodations, setDayDetailsWithAccommodations] =
    useState<DayDetails[]>([]);
  const [packageExtraDetails, setPackageExtraDetails] = useState<
    PackageExtraDetailsData[]
  >([]);
  const [packageExtraDetailsLoading, setPackageExtraDetailsLoading] =
    useState(false);
  const [packageExtraDetailsError, setPackageExtraDetailsError] = useState<
    string | null
  >(null);

  // Add package schedules states
  const [packageSchedules, setPackageSchedules] = useState<
    PackageSchedulesData[]
  >([]);
  const [packageSchedulesLoading, setPackageSchedulesLoading] = useState(false);
  const [packageSchedulesError, setPackageSchedulesError] = useState<
    string | null
  >(null);
  const [assignUser, setAssignUser] =
    useState<TourAssignedEmployeeResponse | null>(null);
  const [assignUserError, setAssignUserError] = useState<string | null>(null);
  const [assignUserLoading, setAssignUserLoading] = useState(false);

  // Function to convert PackageDayAccommodation to Accommodation
  const convertToAccommodation = (
    packageAccommodation: PackageDayAccommodation,
  ): Accommodation => {
    return {
      day: packageAccommodation.dayNumber,
      breakfast: packageAccommodation.breakfast,
      breakfastDescription: packageAccommodation.breakfastDescription,
      lunch: packageAccommodation.lunch,
      lunchDescription: packageAccommodation.lunchDescription,
      dinner: packageAccommodation.dinner,
      dinnerDescription: packageAccommodation.dinnerDescription,
      morningTea: packageAccommodation.morningTea,
      morningTeaDescription: packageAccommodation.morningTeaDescription,
      eveningTea: packageAccommodation.eveningTea,
      eveningTeaDescription: packageAccommodation.eveningTeaDescription,
      snacks: packageAccommodation.snacks,
      snackNote: packageAccommodation.snackNote,
      hotel: {
        hotelId: packageAccommodation.hotelId,
        hotelName: packageAccommodation.hotelName,
        hotelType: packageAccommodation.hotelType,
        hotelCategory: packageAccommodation.hotelCategory.toString(),
        longitude: packageAccommodation.hotelLongitude,
        latitude: packageAccommodation.hotelLatitude,
        location: packageAccommodation.hotelLocation,
        description: packageAccommodation.hotelDescription,
        facilities: null,
      },
      transport: {
        transportId: packageAccommodation.transportId,
        transportType: packageAccommodation.vehicleTypeName,
        vehicleModel: packageAccommodation.vehicleModel,
        seatCount: packageAccommodation.seatCapacity,
        airConditioned: packageAccommodation.airCondition,
        driverIncluded: null,
        fuelIncluded: null,
        description: null,
      },
      otherNotes: packageAccommodation.otherNotes,
    };
  };

  // Function to merge accommodations with day details
  const mergeAccommodationsWithDayDetails = (
    dayDetails: DayDetails[],
    selectedPackage: Package,
  ): DayDetails[] => {
    return dayDetails.map((day) => {
      const packageAccommodation = selectedPackage.packageDayByDayDtoList.find(
        (acc) => acc.dayNumber === day.dayNumber,
      );

      if (packageAccommodation) {
        return {
          ...day,
          accommodations: convertToAccommodation(packageAccommodation),
        };
      }

      return day;
    });
  };

  // Function to get selected package extra details
  const getSelectedPackageExtraDetails = (): TourExtraDetails | null => {
    if (!selectedPackage || packageExtraDetails.length === 0) {
      return null;
    }

    const selectedPackageDetails = packageExtraDetails.find(
      (detail) => detail.packageId === selectedPackage.packageId,
    );

    if (!selectedPackageDetails) {
      return null;
    }

    // Convert to TourExtraDetails format
    return {
      inclusions: selectedPackageDetails.inclusions.map((item) => ({
        id: item.id,
        description: item.description || "",
        displayOrder: item.displayOrder,
        status: item.status,
      })),
      exclusions: selectedPackageDetails.exclusions.map((item) => ({
        id: item.id,
        description: item.description || "",
        displayOrder: item.displayOrder,
        status: item.status,
      })),
      conditions: selectedPackageDetails.conditions.map((item) => ({
        id: item.id,
        description: item.description || "",
        displayOrder: item.displayOrder,
        status: item.status,
      })),
      travelTips: selectedPackageDetails.travelTips.map((item) => ({
        id: item.id,
        title: item.title || "",
        description: item.description || "",
        displayOrder: item.displayOrder,
        status: item.status,
      })),
    };
  };

  // Function to get selected package schedules
  const getSelectedPackageSchedules = (): PackageSchedule[] => {
    if (!selectedPackage || packageSchedules.length === 0) {
      return [];
    }

    const selectedPackageSchedules = packageSchedules.find(
      (schedules) => schedules.packageId === selectedPackage.packageId,
    );

    return selectedPackageSchedules?.packageSchedules || [];
  };

  // Function to get current extra details (either package-specific or general tour details)
  const getCurrentExtraDetails = (): TourExtraDetails | null => {
    // If we have package extra details, use them
    const packageDetails = getSelectedPackageExtraDetails();
    if (packageDetails) {
      return packageDetails;
    }
    return tourExtraDetails;
  };

  React.useEffect(() => {
    const fetchAllData = async () => {
      if (!sriLankanTourId) return;

      try {
        setTourLoading(true);

        // Fetch all data using services
        const [
          tourDetailsResult,
          reviewsResult,
          packagesResult,
          tourExtraDetailsResult,
          packageExtraDetailsResult,
          packageSchedulesResult,
          employeeResult,
          historyResult,
          historyImagesResult,
          dayDetailsResult,
        ] = await Promise.all([
          TourService.getTourDetails(tourId),
          TourService.getTourReviewsById(tourId),
          PackageService.getTourPackages(tourId),
          TourService.getTourExtraDetails(tourId),
          PackageService.getPackageExtraDetails(tourId),
          PackageService.getPackageSchedules(tourId),
          EmployeeService.getAssignedEmployee(tourId),
          TourService.getTourHistoryById(tourId),
          TourService.getTourHistoryImagesById(tourId),
          TourService.getDayWiseDetails(tourId),
        ]);

        // Set tour details
        if (tourDetailsResult.data) setTour(tourDetailsResult.data);
        if (tourDetailsResult.error) setTourError(tourDetailsResult.error);

        // Set reviews
        if (reviewsResult.data) setReviews(reviewsResult.data);
        if (reviewsResult.error) setReviewsError(reviewsResult.error);

        // Set packages
        if (packagesResult.data) {
          setPackages(packagesResult.data);
          if (packagesResult.data.length > 0) {
            setSelectedPackage(packagesResult.data[0]);
          }
        }
        if (packagesResult.error) setPackagesError(packagesResult.error);

        // Set tour extra details
        if (tourExtraDetailsResult.data)
          setTourExtraDetails(tourExtraDetailsResult.data);
        if (tourExtraDetailsResult.error)
          setTourExtraDetailsError(tourExtraDetailsResult.error);

        // Set package extra details
        if (packageExtraDetailsResult.data)
          setPackageExtraDetails(packageExtraDetailsResult.data);
        if (packageExtraDetailsResult.error)
          setPackageExtraDetailsError(packageExtraDetailsResult.error);

        // Set package schedules
        if (packageSchedulesResult.data)
          setPackageSchedules(packageSchedulesResult.data);
        if (packageSchedulesResult.error)
          setPackageSchedulesError(packageSchedulesResult.error);

        // Set employee details
        if (employeeResult.data) setAssignUser(employeeResult.data);
        if (employeeResult.error) setAssignUserError(employeeResult.error);

        // Set history
        if (historyResult.data) setHistories(historyResult.data);
        if (historyResult.error) setHistoryError(historyResult.error);

        // Set history images
        if (historyImagesResult.data)
          setGalleryImages(historyImagesResult.data);
        if (historyImagesResult.error)
          setGalleryError(historyImagesResult.error);

        // Set day details
        if (dayDetailsResult.data) setDayDetails(dayDetailsResult.data);
        if (dayDetailsResult.error) setDayDetailsError(dayDetailsResult.error);
      } catch (err) {
        console.error("Error fetching data:", err);
        setTourError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setTourLoading(false);
        setReviewsLoading(false);
        setPackagesLoading(false);
        setTourExtraDetailsLoading(false);
        setPackageExtraDetailsLoading(false);
        setPackageSchedulesLoading(false);
        setAssignUserLoading(false);
        setHistoryLoading(false);
        setGalleryLoading(false);
        setDayDetailsLoading(false);
      }
    };

    fetchAllData();
  }, [sriLankanTourId]);

  // Effect to update day details with accommodations when package changes
  useEffect(() => {
    if (dayDetails.length > 0 && selectedPackage) {
      const mergedDayDetails = mergeAccommodationsWithDayDetails(
        dayDetails,
        selectedPackage,
      );
      setDayDetailsWithAccommodations(mergedDayDetails);
    } else {
      setDayDetailsWithAccommodations(dayDetails);
    }
  }, [dayDetails, selectedPackage]);

  // Handle package selection
  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const handleRetryDayDetails = () => {
    if (sriLankanTourId) {
      setDayDetailsLoading(true);
      TourService.getDayWiseDetails(tourId)
        .then((result) => {
          if (result.data) setDayDetails(result.data);
          if (result.error) setDayDetailsError(result.error);
        })
        .finally(() => setDayDetailsLoading(false));
    }
  };

  const handleRetryPackages = () => {
    if (sriLankanTourId) {
      setPackagesLoading(true);
      PackageService.getTourPackages(tourId)
        .then((result) => {
          if (result.data) {
            setPackages(result.data);
            if (result.data.length > 0) {
              setSelectedPackage(result.data[0]);
            }
          }
          if (result.error) setPackagesError(result.error);
        })
        .finally(() => setPackagesLoading(false));
    }
  };

  const handleRetryPackageExtraDetails = () => {
    if (sriLankanTourId) {
      setPackageExtraDetailsLoading(true);
      PackageService.getPackageExtraDetails(tourId)
        .then((result) => {
          if (result.data) setPackageExtraDetails(result.data);
          if (result.error) setPackageExtraDetailsError(result.error);
        })
        .finally(() => setPackageExtraDetailsLoading(false));
    }
  };

  const handleRetryPackageSchedules = () => {
    if (sriLankanTourId) {
      setPackageSchedulesLoading(true);
      PackageService.getPackageSchedules(tourId)
        .then((result) => {
          if (result.data) setPackageSchedules(result.data);
          if (result.error) setPackageSchedulesError(result.error);
        })
        .finally(() => setPackageSchedulesLoading(false));
    }
  };

  const handleRetryReviews = () => {
    if (sriLankanTourId) {
      setReviewsLoading(true);
      TourService.getTourReviewsById(tourId)
        .then((result) => {
          if (result.data) setReviews(result.data);
          if (result.error) setReviewsError(result.error);
        })
        .finally(() => setReviewsLoading(false));
    }
  };

  const handleRetryTour = () => {
    if (sriLankanTourId) {
      setTourLoading(true);
      TourService.getTourDetails(tourId)
        .then((result) => {
          if (result.data) setTour(result.data);
          if (result.error) setTourError(result.error);
        })
        .finally(() => setTourLoading(false));
    }
  };

  const handleRetryEmployee = () => {
    if (sriLankanTourId) {
      setAssignUserLoading(true);
      EmployeeService.getAssignedEmployee(tourId)
        .then((result) => {
          if (result.data) setAssignUser(result.data);
          if (result.error) setAssignUserError(result.error);
        })
        .finally(() => setAssignUserLoading(false));
    }
  };

  const handleRetryHistory = () => {
    if (sriLankanTourId) {
      setHistoryLoading(true);
      TourService.getTourHistoryById(tourId)
        .then((result) => {
          if (result.data) setHistories(result.data);
          if (result.error) setHistoryError(result.error);
        })
        .finally(() => setHistoryLoading(false));
    }
  };

  const handleRetryGallery = () => {
    if (sriLankanTourId) {
      setGalleryLoading(true);
      TourService.getTourHistoryImagesById(tourId)
        .then((result) => {
          if (result.data) setGalleryImages(result.data);
          if (result.error) setGalleryError(result.error);
        })
        .finally(() => setGalleryLoading(false));
    }
  };

  // Package selector component
  const PackageSelector = () => {
    if (packagesLoading) {
      return (
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-lg sm:rounded-xl">
          <div className="text-center py-3 sm:py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-sky-600"></div>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Loading packages...
            </p>
          </div>
        </div>
      );
    }

    if (packagesError) {
      return (
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg sm:rounded-xl border border-red-200">
          <div className="text-center">
            <p className="text-red-600 mb-2 text-sm sm:text-base">
              Failed to load packages
            </p>
            <button
              onClick={handleRetryPackages}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:opacity-90 text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (packages.length === 0) {
      return null;
    }

    return (
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-sky-50 to-teal-50 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg lg:shadow-lg">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Select Your Package
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl">
              Choose the package that best suits your preferences and budget
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              className="group flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 text-sky-600 font-medium border-2 border-sky-200 rounded-lg sm:rounded-xl hover:border-sky-600 hover:bg-sky-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md w-full md:w-auto text-sm sm:text-base"
              onClick={() =>
                router.push(
                  `/packages/packages-compare?tour-name=${
                    tour?.tourName || "name"
                  }&tour-id=${sriLankanTourId}`,
                )
              }
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Compare Packages
            </button>
          </div>
        </div>

        {/* Packages grid - responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.packageId}
              onClick={() => handlePackageSelect(pkg)}
              className={`p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md lg:hover:shadow-lg ${
                selectedPackage?.packageId === pkg.packageId
                  ? "border-sky-600 bg-white transform sm:scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-sky-300"
              }`}
              style={{
                borderLeftColor:
                  selectedPackage?.packageId === pkg.packageId
                    ? pkg.color
                    : undefined,
                borderLeftWidth: "4px",
              }}
            >
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                    {pkg.packageName}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                    {pkg.packageDescription}
                  </p>
                </div>
                {selectedPackage?.packageId === pkg.packageId && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-sky-600 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>

              <div className="mb-3 sm:mb-4">
                <div className="flex items-baseline">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    LKR {pkg.pricePerPerson.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">
                    per person
                  </span>
                </div>
                {pkg.discount > 0 && (
                  <div className="flex items-center gap-1 sm:gap-2 mt-1">
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Save {pkg.discount}%
                    </span>
                  </div>
                )}
              </div>
              <div>
                <button
                  className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-white text-sky-600 font-medium rounded-lg border border-sky-200 hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 hover:shadow-sm w-full text-xs sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/packages/${selectedPackage?.packageId}`);
                  }}
                >
                  Show All Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-sky-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                  Selected Package:{" "}
                  <span className="text-sky-600">
                    {selectedPackage.packageName}
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                  {selectedPackage.packageDescription}
                </p>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-sky-600 font-medium">
                  Package-specific details and schedules will be shown below
                </div>
              </div>
              <div className="text-right sm:text-left">
                <div className="text-base sm:text-lg font-bold text-sky-600">
                  LKR {selectedPackage.pricePerPerson.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  per person
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (tourLoading) {
    return (
      <Loading message="Loading tour details..." variant="spinner" size="md" />
    );
  }

  if (tourError) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
            message={tourError}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetryTour}
          />
        </div>
      </section>
    );
  }

  if (!tour) {
    return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <EmptyState
            title="No Content Available"
            message="We're preparing some amazing content for you. Please check back soon!"
            icon="data"
            size="md"
          />
        </div>
      </section>
    );
  }

  const currentExtraDetails = getCurrentExtraDetails();
  const currentPackageSchedules = getSelectedPackageSchedules();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50">
      <SLTourDetailsHeroSection tour={tour} />

      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <SLTourDetailsOverview tour={tour} />

            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Icon container with responsive sizing */}
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-sky-600 to-teal-600 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-lg mb-4 sm:mb-5 md:mb-6 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>

              {/* Responsive heading */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Detailed Tour Itinerary
              </h2>

              {/* Responsive paragraph */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-0">
                Day-by-day breakdown of your journey through Sri Lanka
              </p>
            </div>

            {/* Package Selector */}
            <div className="mt-8">
              <PackageSelector />
            </div>

            <div className="mt-8">
              <SLTourDayWiseDetails
                days={dayDetailsWithAccommodations}
                loading={dayDetailsLoading}
                error={dayDetailsError}
                onRetry={handleRetryDayDetails}
                extraDetails={currentExtraDetails}
                extraDetailsLoading={
                  packageExtraDetailsLoading || tourExtraDetailsLoading
                }
                extraDetailsError={
                  packageExtraDetailsError || tourExtraDetailsError
                }
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 gap-12">
            {/* Show package schedules if available, otherwise show general tour schedules */}
            {/* {packageSchedulesLoading ? (
              <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg">
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <p className="mt-2 text-gray-600 text-sm">
                    Loading schedules...
                  </p>
                </div>
              </div>
            ) : packageSchedulesError ? (
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
                <div className="text-center">
                  <p className="text-red-600 text-sm mb-2">
                    Failed to load schedules
                  </p>
                  <button
                    onClick={handleRetryPackageSchedules}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-amber-600 text-white text-sm rounded-lg hover:opacity-90"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : currentPackageSchedules.length > 0 ? (
              <PackageSchedulesComponent
                schedules={currentPackageSchedules}
                packageName={selectedPackage?.packageName || ""}
                packageId={selectedPackage?.packageId || 1}
              />
            ) : (
              <SLTourDetailsSchedules schedules={tour.schedules} />
            )} */}
            <SLTourDetailsBookingSidebar
              tour={tour}
              selectedPackage={selectedPackage}
              assignUser={assignUser}
              assignUserLoading={assignUserLoading}
              assignUserError={assignUserError}
            />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {/* <ReviewsSection
        reviews={reviews}
        loading={reviewsLoading}
        error={reviewsError}
        onRetry={handleRetryReviews}
      /> */}
      <TourMapContainer tourId={Number.parseInt(tourId[0])} />
      {/* <TourHistorySection
        histories={histories}
        loading={historyLoading}
        error={historyError}
        onRetry={handleRetryHistory}
      /> */}
      {/* <TourHistoryGallery
        images={galleryImages}
        loading={galleryLoading}
        error={galleryError}
        onRetry={handleRetryGallery}
      /> */}
    </div>
  );
};
export default SriLankanTourDetailsPage;
