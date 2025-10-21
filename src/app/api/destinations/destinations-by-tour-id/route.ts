import { GET_DESTINATIONS_DETAILS_BY_TOUR_ID_BE } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tourId } = await request.json();

    console.log('Destinations API Route - Received tourId:', tourId);

    if (!tourId) {
      return NextResponse.json(
        { error: "Tour ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${GET_DESTINATIONS_DETAILS_BY_TOUR_ID_BE}/tour-id/${tourId}`;
    console.log('Backend URL:', backendUrl);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch destinations" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching destinations" },
      { status: 500 }
    );
  }
}