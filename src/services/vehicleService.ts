// Vehicle Service

import { ApiResponse } from "@/types/common-types";
import {
  Vehicle,
  VehicleFilters,
  VehicleSpecificationDetailsResponse,
  VehicleSpecificationFilterResponse,
  VehicleSpecificationSearchRequest,
  VehicleSpecificationSearchResponseData,
  VehicleType,
  VehicleTypeFilters,
  VehicleTypesResponse,
} from "@/types/vehicle-types";
import {
  GET_VEHICLE_SPECIFICATION_DETAILS_BY_ID_DATA_FE,
  GET_VEHICLE_SPECIFICATION_DETAILS_BY_REQUEST_DATA_FE,
  GET_VEHICLE_SPECIFICATION_FILTERS_DATA_FE,
  GET_VEHICLE_TYPES_DETAILS_BY_ID_DATA_FE,
  GET_VEHICLE_TYPES_DETAILS_DATA_FE,
} from "@/utils/frontEndConstant";

class VehicleService {
  async getVehicleSpecificationById(
    specificationId: number,
  ): Promise<VehicleSpecificationDetailsResponse> {
    const response = await fetch(
      `${GET_VEHICLE_SPECIFICATION_DETAILS_BY_ID_DATA_FE}/${specificationId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vehicle specification details");
    }

    return response.json();
  }

  async searchVehicleSpecifications(
    request: VehicleSpecificationSearchRequest,
  ): Promise<ApiResponse<VehicleSpecificationSearchResponseData>> {
    const response = await fetch(
      GET_VEHICLE_SPECIFICATION_DETAILS_BY_REQUEST_DATA_FE,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to search vehicle specifications");
    }

    return response.json();
  }

  async getVehicleFilters(): Promise<VehicleSpecificationFilterResponse> {
    const response = await fetch(GET_VEHICLE_SPECIFICATION_FILTERS_DATA_FE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch vehicle filters: ${response.statusText}`,
      );
    }

    const data: ApiResponse<VehicleSpecificationFilterResponse> =
      await response.json();
    return data.data;
  }

  async fetchVehicles(): Promise<{
    vehicles: Vehicle[];
    error: string | null;
  }> {
    try {
      const response = await fetch("/api/vehicles");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<Vehicle[]> = await response.json();
      const vehicles = data.data;
      return {
        vehicles,
        error: null,
      };
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      return {
        vehicles: [],
        error: err instanceof Error ? err.message : "Failed to load vehicles",
      };
    }
  }

  filterVehicles(
    vehicles: Vehicle[],
    filters: VehicleFilters,
    page: number,
    pageSize: number,
  ): {
    filteredVehicles: Vehicle[];
    totalFiltered: number;
    totalPages: number;
  } {
    let filtered = [...vehicles];

    // Search filter (search in make, model, registration number)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.specification.make.toLowerCase().includes(searchLower) ||
          v.specification.model.toLowerCase().includes(searchLower) ||
          v.registrationNumber.toLowerCase().includes(searchLower),
      );
    }

    // Make filter
    if (filters.make) {
      filtered = filtered.filter((v) => v.specification.make === filters.make);
    }

    // Body type filter
    if (filters.bodyType) {
      filtered = filtered.filter(
        (v) => v.specification.bodyType === filters.bodyType,
      );
    }

    // Year range filter
    if (filters.yearRange[0] > 0 || filters.yearRange[1] < 2030) {
      filtered = filtered.filter(
        (v) =>
          v.specification.year >= filters.yearRange[0] &&
          v.specification.year <= filters.yearRange[1],
      );
    }

    // Engine type filter
    if (filters.engineType) {
      filtered = filtered.filter(
        (v) => v.specification.engineType === filters.engineType,
      );
    }

    // Transmission filter (convert transmissionTypeId to string for filter)
    if (filters.transmission) {
      filtered = filtered.filter((v) => {
        const transmissionMap: Record<number, string> = {
          1: "Manual",
          2: "Automatic",
          3: "CVT",
          4: "DCT",
        };
        return (
          transmissionMap[v.specification.transmissionTypeId] ===
          filters.transmission
        );
      });
    }

    // Fuel type filter (convert fuelTypeId to string for filter)
    if (filters.fuelType) {
      filtered = filtered.filter((v) => {
        const fuelMap: Record<number, string> = {
          1: "Petrol",
          2: "Diesel",
          3: "Electric",
          4: "Hybrid",
          5: "Plugin Hybrid",
        };
        return fuelMap[v.specification.fuelTypeId] === filters.fuelType;
      });
    }

    // Horsepower range filter
    if (filters.horsepowerRange[0] > 0 || filters.horsepowerRange[1] < 1000) {
      filtered = filtered.filter(
        (v) =>
          v.specification.horsepowerHp >= filters.horsepowerRange[0] &&
          v.specification.horsepowerHp <= filters.horsepowerRange[1],
      );
    }

    // Seat capacity filter
    if (filters.seatCapacity) {
      const seats = parseInt(filters.seatCapacity);
      filtered = filtered.filter((v) => v.specification.seatCapacity === seats);
    }

    // Price range filter
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) {
      filtered = filtered.filter(
        (v) =>
          v.specification.price >= filters.priceRange[0] &&
          v.specification.price <= filters.priceRange[1],
      );
    }

    // Calculate pagination
    const totalFiltered = filtered.length;
    const totalPages = Math.ceil(totalFiltered / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedVehicles = filtered.slice(startIndex, startIndex + pageSize);

    return {
      filteredVehicles: paginatedVehicles,
      totalFiltered,
      totalPages,
    };
  }

  extractFilterOptions(vehicles: Vehicle[]): {
    makes: string[];
    bodyTypes: string[];
    engineTypes: string[];
    transmissions: string[];
    fuelTypes: string[];
    seatCapacities: number[];
    minYear: number;
    maxYear: number;
    minHorsepower: number;
    maxHorsepower: number;
    minPrice: number;
    maxPrice: number;
  } {
    const makes = new Set<string>();
    const bodyTypes = new Set<string>();
    const engineTypes = new Set<string>();
    const transmissions = new Set<string>();
    const fuelTypes = new Set<string>();
    const seatCapacities = new Set<number>();

    let minYear = Infinity;
    let maxYear = -Infinity;
    let minHorsepower = Infinity;
    let maxHorsepower = -Infinity;
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    vehicles.forEach((v) => {
      makes.add(v.specification.make);
      bodyTypes.add(v.specification.bodyType);
      engineTypes.add(v.specification.engineType);

      // Transmission type mapping
      const transmissionMap: Record<number, string> = {
        1: "Manual",
        2: "Automatic",
        3: "CVT",
        4: "DCT",
      };
      if (transmissionMap[v.specification.transmissionTypeId]) {
        transmissions.add(transmissionMap[v.specification.transmissionTypeId]);
      }

      // Fuel type mapping
      const fuelMap: Record<number, string> = {
        1: "Petrol",
        2: "Diesel",
        3: "Electric",
        4: "Hybrid",
        5: "Plugin Hybrid",
      };
      if (fuelMap[v.specification.fuelTypeId]) {
        fuelTypes.add(fuelMap[v.specification.fuelTypeId]);
      }

      seatCapacities.add(v.specification.seatCapacity);

      minYear = Math.min(minYear, v.specification.year);
      maxYear = Math.max(maxYear, v.specification.year);
      minHorsepower = Math.min(minHorsepower, v.specification.horsepowerHp);
      maxHorsepower = Math.max(maxHorsepower, v.specification.horsepowerHp);
      minPrice = Math.min(minPrice, v.specification.price);
      maxPrice = Math.max(maxPrice, v.specification.price);
    });

    return {
      makes: Array.from(makes).sort(),
      bodyTypes: Array.from(bodyTypes).sort(),
      engineTypes: Array.from(engineTypes).sort(),
      transmissions: Array.from(transmissions).sort(),
      fuelTypes: Array.from(fuelTypes).sort(),
      seatCapacities: Array.from(seatCapacities).sort((a, b) => a - b),
      minYear: minYear !== Infinity ? minYear : 2000,
      maxYear: maxYear !== -Infinity ? maxYear : 2024,
      minHorsepower: minHorsepower !== Infinity ? minHorsepower : 0,
      maxHorsepower: maxHorsepower !== -Infinity ? maxHorsepower : 1000,
      minPrice: minPrice !== Infinity ? minPrice : 0,
      maxPrice: maxPrice !== -Infinity ? maxPrice : 100000,
    };
  }

  async fetchVehicleTypes(): Promise<{
    vehicleTypes: VehicleType[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_VEHICLE_TYPES_DETAILS_DATA_FE, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: VehicleTypesResponse = await response.json();

      if (apiResponse.code === 200 && apiResponse.data) {
        const activeVehicleTypes = apiResponse.data.filter(
          (type) => type.status === "ACTIVE",
        );

        return {
          vehicleTypes: activeVehicleTypes,
          error: null,
        };
      } else {
        return {
          vehicleTypes: [],
          error: apiResponse.message || "Failed to fetch vehicle types",
        };
      }
    } catch (err) {
      console.error("Error fetching vehicle types:", err);
      return {
        vehicleTypes: [],
        error:
          err instanceof Error ? err.message : "Failed to load vehicle types",
      };
    }
  }

  filterVehicleTypes(
    vehicleTypes: VehicleType[],
    filters: VehicleTypeFilters,
    page: number,
    pageSize: number,
  ): {
    filteredVehicleTypes: VehicleType[];
    totalFiltered: number;
    totalPages: number;
  } {
    let filtered = [...vehicleTypes];

    // Search filter (search in name and description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (type) =>
          type.name.toLowerCase().includes(searchLower) ||
          type.description.toLowerCase().includes(searchLower),
      );
    }

    // Calculate pagination
    const totalFiltered = filtered.length;
    const totalPages = Math.ceil(totalFiltered / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedVehicleTypes = filtered.slice(
      startIndex,
      startIndex + pageSize,
    );

    return {
      filteredVehicleTypes: paginatedVehicleTypes,
      totalFiltered,
      totalPages,
    };
  }

  extractVehicleTypesFilterOptions(vehicleTypes: VehicleType[]): {
    names: string[];
  } {
    const names = new Set<string>();

    vehicleTypes.forEach((type) => {
      names.add(type.name);
    });

    return {
      names: Array.from(names).sort(),
    };
  }

  async getVehicleTypeById(typeId: number): Promise<ApiResponse<VehicleType>> {
    try {
      const response = await fetch(
        `${GET_VEHICLE_TYPES_DETAILS_BY_ID_DATA_FE}/${typeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for including cookies
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching vehicle type:", error);
      throw error;
    }
  }
}

export const vehicleService = new VehicleService();
