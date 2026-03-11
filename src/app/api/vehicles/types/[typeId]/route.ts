import { GET_VEHICLE_TYPES_DETAILS_BY_ID_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

interface VehicleTypeParams {
  typeId: string;
}

export async function GET(
  request: NextRequest,
  context: { params: VehicleTypeParams | Promise<VehicleTypeParams> },
) {
  // handle possible Promise
  const { typeId } = await context.params;

  if (!typeId) {
    return NextResponse.json(
      { error: "vehicle type id is required" },
      { status: 400 },
    );
  }

  if (!GET_VEHICLE_TYPES_DETAILS_BY_ID_DATA) {
    throw new Error("Backend URL is not defined");
  }

  const backendUrl = `${GET_VEHICLE_TYPES_DETAILS_BY_ID_DATA}/${typeId}`;

  try {
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch vehicle type id details" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching vehicle type id details:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
