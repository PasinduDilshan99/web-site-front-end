import { GET_TOURS_HISTORY_IMAGES_DETAILS_DATA } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

interface TourParams {
  tourId: string;
}


export async function GET(
  request: Request,
  context: { params: TourParams | Promise<TourParams> }
) {
  try {
  const { tourId } = await context.params;

    const response = await fetch(
      `${GET_TOURS_HISTORY_IMAGES_DETAILS_DATA}/${tourId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);

      return NextResponse.json(
        { error: "Failed to fetch data from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error fetching backend data:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
