import { ADD_CHAT_BOT_INQUIRY_DATA } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(ADD_CHAT_BOT_INQUIRY_DATA, {
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
        { error: "Failed to create inquiry" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error creating inquiry:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
