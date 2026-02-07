import { GET_ACTIVE_TOURS_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Forward cookies from the incoming request
    const cookieHeader = request.headers.get("cookie") || "";

    const response = await fetch(GET_ACTIVE_TOURS_DATA, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader, // forward cookies to backend
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

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error("Error fetching backend data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
