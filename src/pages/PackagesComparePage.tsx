"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { DollarSign, Search } from "lucide-react";
import PackageComparisonHeaderSection from "@/components/package-comparison-components/PackageComparisonHeaderSection";
import SearchHeader from "@/components/package-comparison-components/SearchHeader";
import PackageSelection from "@/components/package-comparison-components/PackageSelection";
import PackageSummaryCard from "@/components/package-comparison-components/PackageSummaryCard";
import DayComparisonTable from "@/components/package-comparison-components/DayComparisonTable";
import ExtraDetailsComparison from "@/components/package-comparison-components/ExtraDetailsComparison";
import {
  PackageComparison as ComparisonPackage,
} from "@/types/package-comparison-types";
import { Tour } from "@/types/tour-types";
import { PackageService } from "@/services/packageService";
import { TourService } from "@/services/tourService";

const PackagesComparePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tourName, setTourName] = useState(searchParams?.get("tour-name") || "");
  const [tourId, setTourId] = useState(searchParams?.get("tour-id") || "");

  // States for API data
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [packages, setPackages] = useState<ComparisonPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTourDropdown, setShowTourDropdown] = useState(false);

  // States for comparison
  const [selectedPackage1, setSelectedPackage1] = useState<ComparisonPackage | null>(
    null
  );
  const [selectedPackage2, setSelectedPackage2] = useState<ComparisonPackage | null>(
    null
  );
  const [package1Id, setPackage1Id] = useState<string>("");
  const [package2Id, setPackage2Id] = useState<string>("");

  // States for extra details tabs
  const [activeTab, setActiveTab] = useState<
    "inclusions" | "exclusions" | "conditions" | "tips"
  >("inclusions");

  // Fetch all tours on component mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        
        // USING THE SERVICE INSTEAD OF DIRECT FETCH
        const { tours: fetchedTours, error } = await TourService.fetchAllToursBasicDetails();
        
        if (error) {
          console.error("Error fetching tours:", error);
        } else {
          setTours(fetchedTours);
          setFilteredTours(fetchedTours);
        }

        // If tourId is in URL params, find and select that tour
        if (tourId) {
          const foundTour = fetchedTours.find(
            (t) => t.tourDetails.tourId.toString() === tourId
          );
          if (foundTour) {
            setSelectedTour(foundTour);
            setTourName(foundTour.tourDetails.tourName);
            setSearchQuery(foundTour.tourDetails.tourName);
            fetchPackagesForTour(foundTour.tourDetails.tourId);
          }
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [tourId]);

  // Fetch packages for selected tour using the new API
  const fetchPackagesForTour = async (id: number) => {
    try {
      setLoading(true);
      
      // USING THE SERVICE INSTEAD OF DIRECT FETCH
      const { packages: fetchedPackages, error } = await PackageService.fetchPackagesForComparison(id);
      
      if (error) {
        console.error("Error fetching packages:", error);
      } else {
        setPackages(fetchedPackages);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tours based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter(
        (tour) =>
          tour.tourDetails.tourName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          tour.tourDetails.tourDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          tour.tourDetails.tourCategoryName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          tour.tourDetails.tourTypeName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredTours(filtered);
    }
  }, [searchQuery, tours]);

  // Handle tour selection
  const handleTourSelect = (tour: Tour) => {
    setSelectedTour(tour);
    setTourName(tour.tourDetails.tourName);
    setSearchQuery(tour.tourDetails.tourName);
    setShowTourDropdown(false);

    // Update URL params
    const params = new URLSearchParams(searchParams?.toString());
    params.set("tour-id", tour.tourDetails.tourId.toString());
    params.set("tour-name", tour.tourDetails.tourName);
    router.push(`?${params.toString()}`);

    // Fetch packages for selected tour using new API
    fetchPackagesForTour(tour.tourDetails.tourId);
  };

  // Handle package selection for comparison
  const handlePackageSelect = (packageId: string, isFirstPackage: boolean) => {
    const selectedPkg = packages.find(
      (p) => p.packageId.toString() === packageId
    );

    if (isFirstPackage) {
      setPackage1Id(packageId);
      setSelectedPackage1(selectedPkg || null);
    } else {
      setPackage2Id(packageId);
      setSelectedPackage2(selectedPkg || null);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Render package images gallery
  const renderPackageImages = (pkg: ComparisonPackage) => {
    if (!pkg.images || pkg.images.length === 0) return null;

    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Package Images
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {pkg.images.slice(0, 3).map((image) => (
            <div key={image.imageId} className="relative group cursor-pointer">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render comparison table
  const renderComparisonTable = () => {
    if (!selectedPackage1 || !selectedPackage2) return null;

    return (
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Package Comparison
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <PackageSummaryCard
            package={selectedPackage1}
            formatCurrency={formatCurrency}
            renderPackageImages={renderPackageImages}
          />
          <PackageSummaryCard
            package={selectedPackage2}
            formatCurrency={formatCurrency}
            renderPackageImages={renderPackageImages}
          />
        </div>

        {/* Day-by-Day Comparison Table */}
        <DayComparisonTable
          selectedPackage1={selectedPackage1}
          selectedPackage2={selectedPackage2}
        />

        {/* Extra Details Comparison */}
        <ExtraDetailsComparison
          selectedPackage1={selectedPackage1}
          selectedPackage2={selectedPackage2}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      {selectedTour && !loading && (
        <PackageComparisonHeaderSection tour={selectedTour} />
      )}

      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showTourDropdown={showTourDropdown}
        setShowTourDropdown={setShowTourDropdown}
        filteredTours={filteredTours}
        handleTourSelect={handleTourSelect}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Package Selection */}
        {selectedTour && !loading && packages.length > 0 && (
          <PackageSelection
            packages={packages}
            package1Id={package1Id}
            package2Id={package2Id}
            onPackageSelect={handlePackageSelect}
            formatCurrency={formatCurrency}
            selectedPackage1={selectedPackage1}
            selectedPackage2={selectedPackage2}
          />
        )}

        {/* Comparison Table */}
        {selectedTour && !loading && renderComparisonTable()}

        {/* No Packages Message */}
        {selectedTour && !loading && packages.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Packages Available
              </h3>
              <p className="text-gray-600">
                There are currently no packages available for this tour. Please
                check back later or contact support.
              </p>
            </div>
          </div>
        )}

        {/* Initial State - No Tour Selected */}
        {!selectedTour && !loading && tours.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Select a Tour to Begin
              </h3>
              <p className="text-gray-600 mb-6">
                Use the search bar above to find a tour from our extensive
                collection.
              </p>
              <div className="text-sm text-gray-500">
                Found {tours.length} tours available
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesComparePage;