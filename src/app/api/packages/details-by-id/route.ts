import { GET_PACKAGE_DETAILS_BY_ID_BE } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { packageId } = await request.json();

    console.log('Package API Route - Received packageId:', packageId);

    if (!packageId) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${GET_PACKAGE_DETAILS_BY_ID_BE}/${packageId}`;
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
        { error: "Failed to fetch package details" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching package details:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching package details" },
      { status: 500 }
    );
  }
}