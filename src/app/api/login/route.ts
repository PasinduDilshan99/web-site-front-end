import { LOGIN_DATA } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const backendResponse = await fetch(LOGIN_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await backendResponse.json();

    // Forward backend cookies to browser
    const res = NextResponse.json(data);

    // ⏬ Copy Set-Cookie headers from Spring Boot to Next.js response
    const cookies = backendResponse.headers.getSetCookie();
    if (cookies) {
      cookies.forEach((cookie: string) => {
        res.headers.append("Set-Cookie", cookie);
      });
    }

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
