"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ReviewsSection from "@/components/sri-lankan-tours-components/ReviewsSection";
import dynamic from "next/dynamic";

const TourMapContainer = dynamic(
  () =>
    import("@/components/sri-lankan-tours-components/tour-map-components/TourMapContainer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    ),
  },
);
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
  DestinationWithId,
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
import SriLankanTourDetailsLoading from "@/components/sri-lankan-tours-components/SriLankanTourDetailsLoading";
import PackageLoadingError from "@/components/sri-lankan-tours-components/tour-day-to-day-details-components/PackageLoadingError";
import { PACKAGE_COMPARE_PAGE_PATH, PACKAGE_DETAILS_PAGE_PATH } from "@/utils/urls";

const SriLankanTourDetailsPage = () => {
  const params = useParams();
  const sriLankanTourId = (params?.sriLankanTourId as string) || null;
  const tourId = sriLankanTourId || "1";

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
  // Add this with your other useState declarations
  const [distinctDestinations, setDistinctDestinations] = useState<
    DestinationWithId[]
  >([]);
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
        vehicleTypeId: packageAccommodation.vehicleTypeId,
        vehicleModel: packageAccommodation.vehicleModel,
        vehicleSpecificationId: packageAccommodation.vehicleSpecificationId,
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
          // reviewsResult,
          packagesResult,
          tourExtraDetailsResult,
          packageExtraDetailsResult,
          // packageSchedulesResult,
          employeeResult,
          // historyResult,
          // historyImagesResult,
          dayDetailsResult,
        ] = await Promise.all([
          TourService.getTourDetails(tourId),
          // TourService.getTourReviewsById(tourId),
          PackageService.getTourPackages(tourId),
          TourService.getTourExtraDetails(tourId),
          PackageService.getPackageExtraDetails(tourId),
          // PackageService.getPackageSchedules(tourId),
          EmployeeService.getAssignedEmployee(tourId),
          // TourService.getTourHistoryById(tourId),
          // TourService.getTourHistoryImagesById(tourId),
          TourService.getDayWiseDetails(tourId),
        ]);

        // Set tour details
        if (tourDetailsResult.data) setTour(tourDetailsResult.data);
        if (tourDetailsResult.error) setTourError(tourDetailsResult.error);

        // Set reviews
        // if (reviewsResult.data) setReviews(reviewsResult.data);
        // if (reviewsResult.error) setReviewsError(reviewsResult.error);

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
        // if (packageSchedulesResult.data)
        //   setPackageSchedules(packageSchedulesResult.data);
        // if (packageSchedulesResult.error)
        //   setPackageSchedulesError(packageSchedulesResult.error);

        // Set employee details
        if (employeeResult.data) setAssignUser(employeeResult.data);
        if (employeeResult.error) setAssignUserError(employeeResult.error);

        // Set history
        // if (historyResult.data) setHistories(historyResult.data);
        // if (historyResult.error) setHistoryError(historyResult.error);

        // Set history images
        // if (historyImagesResult.data)
        //   setGalleryImages(historyImagesResult.data);
        // if (historyImagesResult.error)
        //   setGalleryError(historyImagesResult.error);

        // Set day details
        if (dayDetailsResult.data) setDayDetails(dayDetailsResult.data);
        if (dayDetailsResult.error) setDayDetailsError(dayDetailsResult.error);
      } catch (err) {
        console.error("Error fetching data:", err);
        setTourError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setTourLoading(false);
        // setReviewsLoading(false);
        setPackagesLoading(false);
        setTourExtraDetailsLoading(false);
        setPackageExtraDetailsLoading(false);
        // setPackageSchedulesLoading(false);
        setAssignUserLoading(false);
        // setHistoryLoading(false);
        setGalleryLoading(false);
        setDayDetailsLoading(false);
      }
    };

    fetchAllData();
  }, [sriLankanTourId]);

  // Effect to update day details with accommodations when package changes
  useEffect(() => {
    if (dayDetails.length > 0) {
      // Extract distinct destinations
      const destinations = extractDistinctDestinations(dayDetails);
      setDistinctDestinations(destinations);

      // Merge with accommodations if package is selected
      if (selectedPackage) {
        const mergedDayDetails = mergeAccommodationsWithDayDetails(
          dayDetails,
          selectedPackage,
        );
        setDayDetailsWithAccommodations(mergedDayDetails);
      } else {
        setDayDetailsWithAccommodations(dayDetails);
      }
    } else {
      setDayDetailsWithAccommodations(dayDetails);
      setDistinctDestinations([]);
    }
  }, [dayDetails, selectedPackage]);

  // Handle package selection
  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  // Function to extract distinct destination names from day details in day order

  const extractDistinctDestinations = (
    dayDetails: DayDetails[],
  ): DestinationWithId[] => {
    const destinationsMap = new Map<string, DestinationWithId>(); // Map to store destination and the first day it appears
    const destinationsInOrder: DestinationWithId[] = [];

    // Sort day details by day number to ensure correct order
    const sortedDayDetails = [...dayDetails].sort(
      (a, b) => a.dayNumber - b.dayNumber,
    );

    sortedDayDetails.forEach((day) => {
      day.destinations.forEach((destWithActivities) => {
        const destinationName = destWithActivities.destination?.destinationName;
        const destinationId = destWithActivities.destination?.destinationId;

        if (
          destinationName &&
          destinationId &&
          !destinationsMap.has(destinationName)
        ) {
          const destination: DestinationWithId = {
            destinationId: destinationId,
            destinationName: destinationName,
          };

          // If it's a new destination, add to map with current day number
          destinationsMap.set(destinationName, destination);
          destinationsInOrder.push(destination);
        }
      });
    });

    return destinationsInOrder; // Returns destinations in the order they first appear with both id and name
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
        <PackageLoadingError
          onRetry={handleRetryPackages}
          message="Couldn't load the selected package."
        />
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
              className="cursor-pointer group flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 text-sky-600 font-medium border-2 border-sky-200 rounded-lg sm:rounded-xl hover:border-sky-600 hover:bg-sky-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md w-full md:w-auto text-sm sm:text-base"
              onClick={() =>
                router.push(
                  `${PACKAGE_COMPARE_PAGE_PATH}${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {packages.map((pkg) => {
            const isSelected = selectedPackage?.packageId === pkg.packageId;

            return (
              <div
                key={pkg.packageId}
                onClick={() => handlePackageSelect(pkg)}
                className={`relative flex flex-col rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? "shadow-lg shadow-[#0B7EA8]/20 scale-[1.02]"
                    : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
                }`}
                style={{
                  border: isSelected
                    ? "2px solid #0B7EA8"
                    : "2px solid #e5e7eb",
                  background: "#fff",
                }}
              >
                {/* ── Colored top accent bar ── */}
                <div
                  className="h-1 w-full flex-shrink-0"
                  style={{
                    background: isSelected
                      ? "linear-gradient(90deg, #0B7EA8, #0E9E8E)"
                      : pkg.color || "#e5e7eb",
                  }}
                />

                {/* ── Card body ── */}
                <div className="flex flex-col flex-1 p-4 sm:p-5">
                  {/* Header: name + selected indicator */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2 flex-1">
                      {pkg.packageName}
                    </h4>

                    {/* Selected radio indicator */}
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                      style={{
                        border: isSelected ? "none" : "2px solid #d1d5db",
                        background: isSelected
                          ? "linear-gradient(135deg, #0B7EA8, #0E9E8E)"
                          : "transparent",
                      }}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {pkg.packageDescription}
                  </p>

                  {/* ── Price block ── */}
                  <div
                    className="rounded-xl px-3 py-2.5 mb-4"
                    style={{
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(11,126,168,0.07), rgba(14,158,142,0.07))"
                        : "rgba(249,250,251,1)",
                      border: isSelected
                        ? "1px solid #b3e0f2"
                        : "1px solid #f3f4f6",
                    }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                      Starting From
                    </p>
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span
                        className="text-xl sm:text-2xl font-extrabold"
                        style={{ color: isSelected ? "#0B7EA8" : "#111827" }}
                      >
                        USD {pkg?.pricePerPerson?.toLocaleString() ?? "0"}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        / person
                      </span>
                    </div>

                    {pkg?.discount > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                          style={{
                            background: "rgba(14,158,142,0.12)",
                            color: "#0b7d70",
                          }}
                        >
                          <svg
                            className="w-2.5 h-2.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Save {Math.round(pkg.discount)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── CTA button ── */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`${PACKAGE_DETAILS_PAGE_PATH}/${selectedPackage?.packageId}?name=${selectedPackage?.packageName}`);
                    }}
                    className="cursor-pointer w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:shadow-md hover:-translate-y-px active:scale-95 flex items-center justify-center gap-1.5"
                    style={
                      isSelected
                        ? {
                            background:
                              "linear-gradient(135deg, #0B7EA8, #0E9E8E)",
                            color: "#fff",
                          }
                        : {
                            background: "transparent",
                            color: "#0B7EA8",
                            border: "1.5px solid #b3e0f2",
                          }
                    }
                  >
                    Show All Details
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
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
                  USD {selectedPackage.pricePerPerson.toLocaleString()}
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
    return <SriLankanTourDetailsLoading />;
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
            <SLTourDetailsOverview
              tour={tour}
              distinctDestinations={distinctDestinations}
            />

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
      <TourMapContainer tourId={Number.parseInt(tourId)} />
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
