import { WHETHER_DETAILS } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "latitude and longitude are required" },
        { status: 400 },
      );
    }

    const lat = Number(latitude);
    const lon = Number(longitude);
    const isValidLatitude = Number.isFinite(lat) && lat >= -90 && lat <= 90;
    const isValidLongitude = Number.isFinite(lon) && lon >= -180 && lon <= 180;

    if (!isValidLatitude || !isValidLongitude) {
      return NextResponse.json(
        { error: "Invalid latitude/longitude values" },
        { status: 400 },
      );
    }

    const backendUrl = `${WHETHER_DETAILS}?latitude=${lat}&longitude=${lon}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend Weather API error:", text);

      return NextResponse.json(
        { error: "Failed to fetch weather data from backend" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Frontend Weather API error:", error);

    return NextResponse.json(
      { error: "Something went wrong in frontend API" },
      { status: 500 },
    );
  }
}
