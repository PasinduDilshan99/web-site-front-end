import { GET_TOUR_DETAILS_BY_ID_BE } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tourId } = await request.json();

    console.log('Tour API Route - Received tourId:', tourId);

    if (!tourId) {
      return NextResponse.json(
        { error: "Tour ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${GET_TOUR_DETAILS_BY_ID_BE}/${tourId}`;
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
        { error: "Failed to fetch tour details" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching tour details:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching tour details" },
      { status: 500 }
    );
  }
}