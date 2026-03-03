// Vehicle Service

import { ApiResponse } from "@/types/common-types";
import {
  VehicleSpecificationDetailsResponse,
  VehicleSpecificationFilterResponse,
  VehicleSpecificationSearchRequest,
  VehicleSpecificationSearchResponseData,
} from "@/types/vehicle-types";
import {
  GET_VEHICLE_SPECIFICATION_DETAILS_BY_ID_DATA_FE,
  GET_VEHICLE_SPECIFICATION_DETAILS_BY_REQUEST_DATA_FE,
  GET_VEHICLE_SPECIFICATION_FILTERS_DATA_FE,
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
}

export const vehicleService = new VehicleService();
