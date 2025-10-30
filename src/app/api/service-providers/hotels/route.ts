// app/api/service-provider/route.ts
import { ServiceProviderAPIResponse } from "@/types/accommodations-types/service-provider-types";
import { GET_SERVICE_PROVIDER_DETAILS } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

interface ErrorResponse {
  error: string;
}

export async function GET(request: Request): Promise<NextResponse<ServiceProviderAPIResponse | ErrorResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      );
    }

    const response = await fetch(GET_SERVICE_PROVIDER_DETAILS(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch data from backend" },
        { status: response.status }
      );
    }

    const data: ServiceProviderAPIResponse = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching backend data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}