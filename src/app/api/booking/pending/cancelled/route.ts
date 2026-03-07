import { CANCELLED_PENDING_BOOKINGS_DETAILS_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!CANCELLED_PENDING_BOOKINGS_DETAILS_DATA) {
      throw new Error("Backend URL is not defined");
    }

    const body = await request.json();

    const cookieHeader = request.headers.get("cookie") || "";

    const response = await fetch(CANCELLED_PENDING_BOOKINGS_DETAILS_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to cancelled tour" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error cancelled tour:", error);
    return NextResponse.json(
      { error: "Something went wrong while cancelled tour" },
      { status: 500 }
    );
  }
}
