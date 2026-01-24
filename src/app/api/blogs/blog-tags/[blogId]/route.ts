import { GET_BLOGS_TAG_BY_BLOG_ID_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    blogId: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { blogId } = params;

    console.log("blog tags API - blogId:", blogId);

    if (!blogId) {
      return NextResponse.json(
        { error: "blog ID is required" },
        { status: 400 }
      );
    }

    if (!GET_BLOGS_TAG_BY_BLOG_ID_DATA) {
      throw new Error("Backend URL is not defined");
    }

    const backendUrl = `${GET_BLOGS_TAG_BY_BLOG_ID_DATA}/${blogId}`;
    console.log("Backend URL:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch blog details" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
