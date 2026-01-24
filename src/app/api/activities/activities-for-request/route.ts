import { GET_ACTIVITIES_DETAILS_BY_REQUEST_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!GET_ACTIVITIES_DETAILS_BY_REQUEST_DATA) {
      throw new Error("Backend URL is not defined");
    }

    const body = await request.json();
    console.log("Activities API - Request body:", body);

    const response = await fetch(GET_ACTIVITIES_DETAILS_BY_REQUEST_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch activities" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching activities" },
      { status: 500 }
    );
  }
}
