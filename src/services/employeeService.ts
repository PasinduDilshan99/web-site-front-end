import {
  TourAssignedEmployeeResponse,
  EmployeeApiResponse,
  CeoDetailsResponse,
  CeoDetailsApiResponse,
} from "@/types/employee-types";
import {
  GET_CEO_DETAILS_DATA_FE,
  GET_EMPLOYEE_DETAILS_BY_TOUR_ID_DATA_FE,
} from "@/utils/frontEndConstant";

export class EmployeeService {
  static async getAssignedEmployee(tourId: string): Promise<{
    data: TourAssignedEmployeeResponse | null;
    error: string | null;
  }> {
    try {
      const response = await fetch(
        `${GET_EMPLOYEE_DETAILS_BY_TOUR_ID_DATA_FE}/${tourId}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: EmployeeApiResponse = await response.json();

      if (data.code === 200) {
        return {
          data: data.data,
          error: null,
        };
      } else {
        return {
          data: null,
          error: data.message || "Failed to fetch employee details",
        };
      }
    } catch (err) {
      console.error("Error fetching employee details:", err);
      return {
        data: null,
        error:
          err instanceof Error ? err.message : "Failed to load assign user",
      };
    }
  }

  static async getCeoDetails(): Promise<{
    data: CeoDetailsResponse | null;
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_CEO_DETAILS_DATA_FE, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: CeoDetailsApiResponse = await response.json();

      if (result.code === 200) {
        return {
          data: result.data,
          error: null,
        };
      } else {
        return {
          data: null,
          error: result.message || "Failed to fetch CEO details",
        };
      }
    } catch (err) {
      console.error("Error fetching CEO details:", err);
      return {
        data: null,
        error:
          err instanceof Error ? err.message : "Failed to load CEO details",
      };
    }
  }
}
