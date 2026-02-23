import { GET_BLOGS_DERAILS_BY_BLOG_ID_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!GET_BLOGS_DERAILS_BY_BLOG_ID_DATA) {
      throw new Error("Backend URL is not defined");
    }

    const body = await request.json();
    console.log("Blog Details API - Request body:", body);

    const response = await fetch(GET_BLOGS_DERAILS_BY_BLOG_ID_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: request.headers.get("cookie") || "",
      },
      credentials: "include",
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch blog details" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching blog details" },
      { status: 500 },
    );
  }
}
