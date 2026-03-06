import { GET_VEHICLE_SPECIFICATION_DETAILS_BY_ID_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

interface VehicleSpecificationParams {
  specificationId: string;
}

export async function GET(
  request: NextRequest,
  context: {
    params: VehicleSpecificationParams | Promise<VehicleSpecificationParams>;
  },
) {
  // handle possible Promise
  const { specificationId } = await context.params;

  if (!specificationId) {
    return NextResponse.json(
      { error: "vehicle specification ID is required" },
      { status: 400 },
    );
  }

  if (!GET_VEHICLE_SPECIFICATION_DETAILS_BY_ID_DATA) {
    throw new Error("Backend URL is not defined");
  }

  const backendUrl = `${GET_VEHICLE_SPECIFICATION_DETAILS_BY_ID_DATA}/${specificationId}`;

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
        { error: "Failed to fetch vehicle specification details" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching vehicle specification details:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
