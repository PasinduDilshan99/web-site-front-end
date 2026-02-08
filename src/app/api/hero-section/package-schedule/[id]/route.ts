import { GET_ACTIVE_PACKAGE_SCHEDULE_HERO_SECTION_DATA } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

interface PackageParams {
  id: string;
}

export async function GET(
  request: Request,
  context: { params: PackageParams | Promise<PackageParams> },
) {
  try {
    const { id } = await context.params; // handle possible Promise

    const response = await fetch(
      `${GET_ACTIVE_PACKAGE_SCHEDULE_HERO_SECTION_DATA}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch data from backend" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching backend data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
