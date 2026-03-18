//save-images/route.ts

import { UPLOAD_IMAGE_TO_CLOUDINARY } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const uploadRateLimit = new Map<string, { count: number; windowStart: number }>();

const getClientIp = (req: NextRequest): string =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("x-real-ip") ||
  "unknown";

const isRateLimited = (clientIp: string): boolean => {
  const now = Date.now();
  const current = uploadRateLimit.get(clientIp);

  if (!current || now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
    uploadRateLimit.set(clientIp, { count: 1, windowStart: now });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  uploadRateLimit.set(clientIp, {
    count: current.count + 1,
    windowStart: current.windowStart,
  });
  return false;
};

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie");
    if (!cookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many upload requests. Please try again later." },
        { status: 429 },
      );
    }

    // Get the file from the request (assuming FormData from frontend)
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only image uploads are allowed." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Maximum allowed size is 5MB." },
        { status: 400 },
      );
    }

    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    if (!uploadPreset) {
      return NextResponse.json(
        { error: "Upload configuration missing" },
        { status: 500 },
      );
    }

    // Create FormData for Cloudinary
    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("upload_preset", uploadPreset);

    // Call Cloudinary API
    const cloudinaryRes = await fetch(UPLOAD_IMAGE_TO_CLOUDINARY, {
      method: "POST",
      body: cloudinaryForm,
    });

    const data = await cloudinaryRes.json();
    if (!cloudinaryRes.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
