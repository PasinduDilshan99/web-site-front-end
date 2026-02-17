import { ADD_BLOG_COMMENT_REACT_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!ADD_BLOG_COMMENT_REACT_DATA) {
      throw new Error("Backend URL is not defined");
    }

    const body = await request.json();
    console.log("Add Blog Comment React API - Request body:", body);

    const response = await fetch(ADD_BLOG_COMMENT_REACT_DATA, {
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
        { error: "Failed to add comment reaction" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding comment reaction:", error);
    return NextResponse.json(
      { error: "Something went wrong while adding comment reaction" },
      { status: 500 },
    );
  }
}
