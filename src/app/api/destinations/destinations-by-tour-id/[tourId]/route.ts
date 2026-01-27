import { GET_DESTINATIONS_DETAILS_BY_TOUR_ID_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    tourId: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { tourId } = params;

    console.log("Destinations API Route - tourId:", tourId);

    if (!tourId) {
      return NextResponse.json(
        { error: "Tour ID is required" },
        { status: 400 }
      );
    }

    if (!GET_DESTINATIONS_DETAILS_BY_TOUR_ID_DATA) {
      throw new Error("Backend base URL is not defined");
    }

    const backendUrl = `${GET_DESTINATIONS_DETAILS_BY_TOUR_ID_DATA}/${tourId}`;
    console.log("Backend URL:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // optional but recommended for dynamic data
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching destinations" },
      { status: 500 }
    );
  }
}
