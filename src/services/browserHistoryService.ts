// browserHistoryService.ts

import {
  AddBrowserHistoryRequest,
  AddBrowserHistoryResponse,
  ApiResponse,
} from "@/types/browser-history-types";
import { ADD_BROWSER_HISTORY_REQUEST_DATA_FE } from "@/utils/frontEndConstant";

/**
 * Sends a POST request to add a browser history record
 * @param requestBody - { type, dataId }
 * @returns ApiResponse with AddBrowserHistoryResponse
 */
export async function addBrowserHistory(
  requestBody: AddBrowserHistoryRequest,
): Promise<ApiResponse<AddBrowserHistoryResponse>> {
  try {
    const response = await fetch(ADD_BROWSER_HISTORY_REQUEST_DATA_FE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(requestBody),
    });

    const data: ApiResponse<AddBrowserHistoryResponse> = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add browser history");
    }

    return data;
  } catch (error) {
    console.error("Error adding browser history:", error);
    throw new Error("Something went wrong while adding browser history");
  }
}
