"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import ReviewsSection from "@/components/sri-lankan-tours-components/ReviewsSection";
import {
  TourHistory,
  TourHistoryImage,
  TourReview,
  Accommodation,
} from "@/types/sri-lankan-tour-types";
import TourMapContainer from "@/components/sri-lankan-tours-components/tour-map-components/TourMapContainer";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
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
import { DayDetails } from "@/types/sri-lankan-tour-types";
import { TourExtraDetails as TourExtraDetailsType } from "@/types/sri-lankan-tour-types";
import { Calendar } from "lucide-react";

// Add this interface near other interfaces
interface DayDetailsApiResponse {
  code: number;
  status: string;
  message: string;
  data: DayDetails[];
  timestamp: string;
}

interface Schedule {
  scheduleId: number;
  scheduleName: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationStart: number;
  durationEnd: number;
  specialNote: string;
  scheduleDescription: string;
}

interface Image {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
}

interface TourDetails {
  tourId: number;
  tourName: string;
  tourDescription: string;
  duration: number;
  latitude: number;
  longitude: number;
  startLocation: string;
  endLocation: string;
  tourTypeName: string;
  tourTypeDescription: string;
  tourCategoryName: string;
  tourCategoryDescription: string;
  seasonName: string;
  seasonDescription: string;
  statusName: string;
  schedules: Schedule[];
  images: Image[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourDetails;
  timestamp: string;
}

interface ReviewsApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourReview[];
  timestamp: string;
}

// Add Package Interfaces
interface PackageDayAccommodation {
  packageDayAccommodationId: number;
  dayNumber: number;
  breakfast: boolean;
  breakfastDescription: string | null;
  lunch: boolean;
  lunchDescription: string | null;
  dinner: boolean;
  dinnerDescription: string | null;
  morningTea: boolean;
  morningTeaDescription: string | null;
  eveningTea: boolean;
  eveningTeaDescription: string | null;
  snacks: boolean;
  snackNote: string | null;
  otherNotes: string | null;
  hotelId: number;
  hotelName: string;
  hotelDescription: string;
  hotelWebsite: string;
  hotelCategory: number;
  hotelType: string;
  hotelLocation: string;
  hotelLatitude: number;
  hotelLongitude: number;
  transportId: number;
  vehicleRegistrationNumber: string;
  vehicleTypeName: string;
  vehicleModel: string;
  seatCapacity: number;
  airCondition: boolean;
}

export interface Package {
  packageId: number;
  packageName: string;
  packageDescription: string;
  totalPrice: number;
  pricePerPerson: number;
  discount: number;
  color: string;
  hoverColor: string;
  packageDayByDayDtoList: PackageDayAccommodation[];
}

interface PackagesApiResponse {
  code: number;
  status: string;
  message: string;
  data: Package[];
  timestamp: string;
}

const SriLankanTourDetailsPage = () => {
  const { sriLankanTourId } = useParams();
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
    null
  );
  const [extraDetails, setExtraDetails] = useState<TourExtraDetailsType | null>(
    null
  );
  const [extraDetailsLoading, setExtraDetailsLoading] = useState(false);
  const [extraDetailsError, setExtraDetailsError] = useState<string | null>(
    null
  );

  // Add package states
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [packagesError, setPackagesError] = useState<string | null>(null);
  const [dayDetailsWithAccommodations, setDayDetailsWithAccommodations] =
    useState<DayDetails[]>([]);

  // Function to convert PackageDayAccommodation to Accommodation
  const convertToAccommodation = (
    packageAccommodation: PackageDayAccommodation
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
    selectedPackage: Package
  ): DayDetails[] => {
    return dayDetails.map((day) => {
      const packageAccommodation = selectedPackage.packageDayByDayDtoList.find(
        (acc) => acc.dayNumber === day.dayNumber
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

  React.useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setTourLoading(true);
        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/tour/${sriLankanTourId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tour details");
        }

        const data: ApiResponse = await response.json();
        setTour(data.data);
      } catch (err) {
        setTourError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setTourLoading(false);
      }
    };

    const fetchExtraDetails = async () => {
      try {
        setExtraDetailsLoading(true);
        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/tour/tour-extra-details/${sriLankanTourId}`
        );
        const data = await response.json();
        console.log('====================================');
        console.log(data);
        console.log('====================================');

        if (data.code === 200) {
          setExtraDetails(data.data);
        } else {
          setExtraDetailsError("Failed to load additional details");
        }
      } catch (err) {
        setExtraDetailsError("Failed to load additional details");
      } finally {
        setExtraDetailsLoading(false);
      }
    };

    const fetchTourReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/tour/reviews/${sriLankanTourId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tour reviews");
        }

        const data: ReviewsApiResponse = await response.json();
        setReviews(data.data);
      } catch (err) {
        setReviewsError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setReviewsLoading(false);
      }
    };

    const fetchPackages = async () => {
      try {
        setPackagesLoading(true);
        const response = await fetch(
          `http://localhost:8080/felicita/v0/api/package/package-details/${sriLankanTourId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data: PackagesApiResponse = await response.json();
        setPackages(data.data);

        // Select first package by default
        if (data.data.length > 0) {
          setSelectedPackage(data.data[0]);
        }
      } catch (err) {
        setPackagesError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setPackagesLoading(false);
      }
    };

    if (sriLankanTourId) {
      fetchTourDetails();
      fetchTourReviews();
      fetchTourHistory();
      fetchTourHistoryImages();
      fetchDayWiseDetails();
      fetchExtraDetails();
      fetchPackages(); // Add this
    }
  }, [sriLankanTourId]);

  // Effect to update day details with accommodations when package changes
  React.useEffect(() => {
    if (dayDetails.length > 0 && selectedPackage) {
      const mergedDayDetails = mergeAccommodationsWithDayDetails(
        dayDetails,
        selectedPackage
      );
      setDayDetailsWithAccommodations(mergedDayDetails);
    } else {
      setDayDetailsWithAccommodations(dayDetails);
    }
  }, [dayDetails, selectedPackage]);

  const handleRetryDayDetails = () => {
    if (sriLankanTourId) {
      fetchDayWiseDetails();
    }
  };

  const handleRetryPackages = () => {
    if (sriLankanTourId) {
      setPackagesLoading(true);
      setPackagesError(null);
      fetch(
        `http://localhost:8080/felicita/v0/api/package/package-details/${sriLankanTourId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch packages");
          }
          return response.json();
        })
        .then((data: PackagesApiResponse) => {
          setPackages(data.data);
          if (data.data.length > 0) {
            setSelectedPackage(data.data[0]);
          }
        })
        .catch((err) => {
          setPackagesError(
            err instanceof Error ? err.message : "An error occurred"
          );
        })
        .finally(() => {
          setPackagesLoading(false);
        });
    }
  };

  const fetchTourHistory = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/tour/history/${sriLankanTourId}`
      );
      const result = await response.json();

      if (result.code === 200) {
        setHistories(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setHistoryError(
        err instanceof Error ? err.message : "Failed to load tour history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchDayWiseDetails = async () => {
    try {
      setDayDetailsLoading(true);
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/tour/tour-details/${sriLankanTourId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch day-wise details");
      }

      const data: DayDetailsApiResponse = await response.json();
      setDayDetails(data.data);
    } catch (err) {
      setDayDetailsError(
        err instanceof Error ? err.message : "An error occurred"
      );
    } finally {
      setDayDetailsLoading(false);
    }
  };

  const fetchTourHistoryImages = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8080/felicita/v0/api/tour/history-images/${sriLankanTourId}`
      );
      const result = await response.json();

      if (result.code === 200) {
        setGalleryImages(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setGalleryError(
        err instanceof Error ? err.message : "Failed to load tour images"
      );
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleRetryReviews = () => {
    if (sriLankanTourId) {
      setReviewsLoading(true);
      setReviewsError(null);
      fetch(
        `http://localhost:8080/felicita/v0/api/tour/reviews/${sriLankanTourId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch tour reviews");
          }
          return response.json();
        })
        .then((data: ReviewsApiResponse) => {
          setReviews(data.data);
        })
        .catch((err) => {
          setReviewsError(
            err instanceof Error ? err.message : "An error occurred"
          );
        })
        .finally(() => {
          setReviewsLoading(false);
        });
    }
  };

  const handleRetryTour = () => {
    if (sriLankanTourId) {
      setTourLoading(true);
      setTourError(null);
      fetch(`http://localhost:8080/felicita/v0/api/tour/${sriLankanTourId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch tour details");
          }
          return response.json();
        })
        .then((data: ApiResponse) => {
          setTour(data.data);
        })
        .catch((err) => {
          setTourError(
            err instanceof Error ? err.message : "An error occurred"
          );
        })
        .finally(() => {
          setTourLoading(false);
        });
    }
  };

  // Package selector component
  const PackageSelector = () => {
    if (packagesLoading) {
      return (
        <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl">
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-2 text-gray-600">Loading packages...</p>
          </div>
        </div>
      );
    }

    if (packagesError) {
      return (
        <div className="mb-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
          <div className="text-center">
            <p className="text-red-600 mb-2">Failed to load packages</p>
            <button
              onClick={handleRetryPackages}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-lg hover:opacity-90"
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
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-amber-50 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Select Your Package
        </h3>
        <p className="text-gray-600 mb-6">
          Choose the package that best suits your preferences and budget
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.packageId}
              onClick={() => setSelectedPackage(pkg)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedPackage?.packageId === pkg.packageId
                  ? "border-purple-600 bg-white transform scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-purple-300"
              }`}
              style={{
                borderLeftColor:
                  selectedPackage?.packageId === pkg.packageId
                    ? pkg.color
                    : undefined,
                borderLeftWidth: "6px",
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {pkg.packageName}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {pkg.packageDescription}
                  </p>
                </div>
                {selectedPackage?.packageId === pkg.packageId && (
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    LKR {pkg.pricePerPerson.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">per person</span>
                </div>
                {pkg.discount > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="line-through text-gray-400">
                      LKR {pkg.totalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Save {pkg.discount}%
                    </span>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-500">
                <div className="flex items-center gap-2 mb-1">
                  <span>•</span>
                  <span>
                    Hotel: {pkg.packageDayByDayDtoList[0]?.hotelName || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span>•</span>
                  <span>
                    Transport:{" "}
                    {pkg.packageDayByDayDtoList[0]?.vehicleTypeName || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>•</span>
                  <span>Days: {pkg.packageDayByDayDtoList.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="mt-6 p-4 bg-white rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">
                  Selected Package: {selectedPackage.packageName}
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedPackage.packageDescription}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">
                  LKR {selectedPackage.pricePerPerson.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">per person</div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
      <SLTourDetailsHeroSection tour={tour} />

      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <SLTourDetailsOverview tour={tour} />

            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-amber-600 rounded-2xl shadow-lg mb-6 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Detailed Tour Itinerary
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                extraDetails={extraDetails}
                extraDetailsLoading={extraDetailsLoading}
                extraDetailsError={extraDetailsError}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SLTourDetailsBookingSidebar
              tour={tour}
              selectedPackage={selectedPackage}
            />
            <SLTourDetailsSchedules schedules={tour.schedules} />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection
        reviews={reviews}
        loading={reviewsLoading}
        error={reviewsError}
        onRetry={handleRetryReviews}
      />
      <TourMapContainer tourId={sriLankanTourId} />
      <TourHistorySection
        histories={histories}
        loading={historyLoading}
        error={historyError}
        onRetry={fetchTourHistory}
      />
      <TourHistoryGallery
        images={galleryImages}
        loading={galleryLoading}
        error={galleryError}
        onRetry={fetchTourHistoryImages}
      />
    </div>
  );
};

export default SriLankanTourDetailsPage;
