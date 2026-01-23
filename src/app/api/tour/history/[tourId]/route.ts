import { GET_TOURS_HISTORY_DETAILS_DATA } from "@/utils/backEndConstant";
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

    console.log("Tour history API - tourId:", tourId);

    if (!tourId) {
      return NextResponse.json(
        { error: "Tour ID is required" },
        { status: 400 }
      );
    }

    if (!GET_TOURS_HISTORY_DETAILS_DATA) {
      throw new Error("Backend URL is not defined");
    }

    const backendUrl = `${GET_TOURS_HISTORY_DETAILS_DATA}/${tourId}`;

    console.log("Backend URL:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch Tour history details" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Tour history data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
