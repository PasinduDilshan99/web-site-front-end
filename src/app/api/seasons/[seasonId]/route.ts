import { GET_SEASONS_DETAILS_BY_SEASON_ID_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

interface SeasonParams {
  seasonId: string;
}

export async function GET(
  request: NextRequest,
  context: { params: SeasonParams | Promise<SeasonParams> },
) {
  // handle possible Promise
  const { seasonId } = await context.params;

  if (!seasonId) {
    return NextResponse.json({ error: "season ID is required" }, { status: 400 });
  }

  if (!GET_SEASONS_DETAILS_BY_SEASON_ID_DATA) {
    throw new Error("Backend URL is not defined");
  }

  const backendUrl = `${GET_SEASONS_DETAILS_BY_SEASON_ID_DATA}/${seasonId}`;

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
        { error: "Failed to fetch season details" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching season details:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
