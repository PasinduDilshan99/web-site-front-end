import { UPDATE_FAQ_VIEW_COUNT } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const requestBody = await req.json();
    console.log('=================requestBody===================');
    console.log(requestBody);
    console.log('====================================');
    const response = await fetch(UPDATE_FAQ_VIEW_COUNT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch data from backend", details: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error("Error fetching backend data:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: (error as Error).message },
      { status: 500 }
    );
  }
}
