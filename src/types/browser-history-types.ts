//browser-history-types.ts
// Request type for adding browser history
export interface AddBrowserHistoryRequest {
  type: string;
  dataId: number;
  name: string;
}

// Backend response structure
export interface ApiResponse<AddBrowserHistoryResponse> {
  code: number;
  status: string;
  message: string;
  data: AddBrowserHistoryResponse;
  timestamp: string;
}

// Specific response for browser history insertion
export interface AddBrowserHistoryResponse {
  message: string;
}
