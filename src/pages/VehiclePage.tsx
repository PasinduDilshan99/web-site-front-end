"use client";

import Footer from "@/app/components/footer/Footer";
import NavBar from "@/components/common-components/navBar/NavBar";
import ImagesTab from "@/components/vehicle-components/ImagesTab";
import OverviewTab from "@/components/vehicle-components/OverviewTab";
import Pagination from "@/components/vehicle-components/Pagination";
import SpecificationsTab from "@/components/vehicle-components/SpecificationsTab";
import UsageTab from "@/components/vehicle-components/UsageTab";
import VehicleCard from "@/components/vehicle-components/VehicleCard";
import VehicleFilterSection from "@/components/vehicle-components/VehicleFilterSection";
import VehicleTabs, {
  VehicleTab,
} from "@/components/vehicle-components/VehicleTabs";
import {
  PaginationState,
  Vehicle,
  VehicleFilters,
} from "@/types/vehicle-types";
import React, { useState, useEffect, useMemo } from "react";

const VehiclePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeTab, setActiveTab] = useState<VehicleTab>("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<VehicleFilters>({
    search: "",
    status: "",
    make: "",
    model: "",
    bodyType: "",
    yearRange: [2000, 2023],
    priceRange: [0, 100000],
    engineType: "",
    transmissionType: "",
    fuelType: "",
    minHorsepower: 0,
    maxHorsepower: 500,
  });

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  // Fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }

        const result = await response.json();
        if (result.data && result.data.length > 0) {
          setVehicles(result.data);
          setFilteredVehicles(result.data);
          setSelectedVehicle(result.data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = vehicles.filter((vehicle) => {
      const spec = vehicle.specification;

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchable = [
          vehicle.registrationNumber,
          spec.make,
          spec.model,
          spec.generation,
          spec.bodyType,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchable.includes(searchTerm)) return false;
      }

      // Status filter
      if (filters.status && vehicle.status !== filters.status) return false;

      // Make filter
      if (filters.make && spec.make !== filters.make) return false;

      // Body type filter
      if (filters.bodyType && spec.bodyType !== filters.bodyType) return false;

      // Engine type filter
      if (filters.engineType && spec.engineType !== filters.engineType)
        return false;

      // Year range filter
      if (spec.year < filters.yearRange[0] || spec.year > filters.yearRange[1])
        return false;

      // Price range filter
      if (
        spec.price < filters.priceRange[0] ||
        spec.price > filters.priceRange[1]
      )
        return false;

      // Horsepower filter
      if (
        spec.horsepowerHp < filters.minHorsepower ||
        spec.horsepowerHp > filters.maxHorsepower
      )
        return false;

      return true;
    });

    setFilteredVehicles(filtered);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.itemsPerPage),
    }));
  }, [vehicles, filters]);

  // Update pagination when items per page changes
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(filteredVehicles.length / prev.itemsPerPage),
      currentPage: 1,
    }));
  }, [filteredVehicles.length, pagination.itemsPerPage]);

  // Get current page vehicles
  const currentVehicles = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredVehicles.slice(startIndex, endIndex);
  }, [filteredVehicles, pagination.currentPage, pagination.itemsPerPage]);

  // Filter handlers
  const handleFilterChange = (filterName: keyof VehicleFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      status: "",
      make: "",
      model: "",
      bodyType: "",
      yearRange: [2000, 2023],
      priceRange: [0, 100000],
      engineType: "",
      transmissionType: "",
      fuelType: "",
      minHorsepower: 0,
      maxHorsepower: 500,
    });
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage,
      currentPage: 1,
      totalPages: Math.ceil(prev.totalItems / itemsPerPage),
    }));
  };

  const renderTabContent = () => {
    if (!selectedVehicle) return null;

    switch (activeTab) {
      case "overview":
        return <OverviewTab vehicle={selectedVehicle} />;
      case "specifications":
        return <SpecificationsTab vehicle={selectedVehicle} />;
      case "usage":
        return <UsageTab vehicle={selectedVehicle} />;
      case "images":
        return <ImagesTab vehicle={selectedVehicle} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Vehicles
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
        <div className="container mx-auto px-3 sm:px-4 py-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Vehicle Fleet Management
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Manage and monitor your vehicle fleet with detailed
              specifications, usage history, and maintenance tracking.
            </p>
          </div>

          {/* Filter Section */}
          <VehicleFilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            vehicles={vehicles}
          />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Vehicle List Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">🚗</span>
                    Vehicles ({filteredVehicles.length})
                  </h2>
                </div>

                {/* Mobile View - Horizontal Scroll */}
                <div className="xl:hidden">
                  <div className="flex space-x-3 overflow-x-auto pb-4 -mx-2 px-2">
                    {currentVehicles.map((vehicle) => (
                      <div
                        key={vehicle.vehicleId}
                        className="flex-shrink-0 w-64"
                      >
                        <VehicleCard
                          vehicle={vehicle}
                          isSelected={
                            selectedVehicle?.vehicleId === vehicle.vehicleId
                          }
                          onClick={() => {
                            setSelectedVehicle(vehicle);
                            setActiveTab("overview");
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop View - Vertical List */}
                <div className="hidden xl:block">
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {currentVehicles.map((vehicle) => (
                      <VehicleCard
                        key={vehicle.vehicleId}
                        vehicle={vehicle}
                        isSelected={
                          selectedVehicle?.vehicleId === vehicle.vehicleId
                        }
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setActiveTab("overview");
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                {filteredVehicles.length > 0 && (
                  <div className="mt-4">
                    <Pagination
                      pagination={pagination}
                      onPageChange={handlePageChange}
                      onItemsPerPageChange={handleItemsPerPageChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="xl:col-span-3">
              {selectedVehicle ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Vehicle Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                          {selectedVehicle.specification.make}{" "}
                          {selectedVehicle.specification.model}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {selectedVehicle.registrationNumber} •{" "}
                          {selectedVehicle.specification.year} •{" "}
                          {selectedVehicle.specification.bodyType}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full font-medium text-sm ${
                          selectedVehicle.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : selectedVehicle.status === "MAINTENANCE"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedVehicle.status}
                      </span>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="px-4 sm:px-6">
                    <VehicleTabs
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                    />
                  </div>

                  {/* Tab Content */}
                  <div className="p-4 sm:p-6">{renderTabContent()}</div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Vehicle Selected
                  </h3>
                  <p className="text-gray-600">
                    Select a vehicle from the list to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VehiclePage;
