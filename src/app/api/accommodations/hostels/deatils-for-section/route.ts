import { HostelSectionApiResponse } from "@/types/accommodations-types/hostel-types";
import { GET_HOSTEL_DETAILS_SECTION_BE } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<HostelSectionApiResponse | { error: string }>> {
  try {
    const response = await fetch(GET_HOSTEL_DETAILS_SECTION_BE, {
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

    const data: HostelSectionApiResponse = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching backend data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}