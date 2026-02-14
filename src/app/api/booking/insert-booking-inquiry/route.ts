import { INSERT_BOOKINGS_INQUIRY_DETAILS_DATA } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(INSERT_BOOKINGS_INQUIRY_DETAILS_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);

      return NextResponse.json(
        { error: "Failed to create tour booking inquiry" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error creating tour booking inquiry:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
