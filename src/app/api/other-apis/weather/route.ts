import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    // Validate params
    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "latitude and longitude are required" },
        { status: 400 }
      );
    }

    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const response = await fetch(openMeteoUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Open-Meteo error:", text);

      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Weather API error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
