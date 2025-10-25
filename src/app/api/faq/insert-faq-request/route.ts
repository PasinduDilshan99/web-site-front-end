import { 
  InsertFAQRequestType, 
  InsertFAQSuccessResponseType, 
  InsertFAQErrorResponseType,
  GenericErrorResponseType 
} from "@/types/faq-types";
import { INSERT_FAQ_REQUEST } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: InsertFAQRequestType = await request.json();

    const response = await fetch(INSERT_FAQ_REQUEST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      return handleErrorResponse(response, responseText);
    }

    const data: InsertFAQSuccessResponseType = JSON.parse(responseText);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error inserting FAQ request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

function handleErrorResponse(response: Response, responseText: string) {
  let errorData;
  try {
    errorData = JSON.parse(responseText);
  } catch {
    errorData = { error: responseText };
  }

  if ((response.status === 400 || response.status === 404) && 
      Array.isArray(errorData.data)) {
    const validationError: InsertFAQErrorResponseType = errorData;
    return NextResponse.json(validationError, { status: response.status });
  }

  if (errorData.code && errorData.status) {
    return NextResponse.json(errorData, { status: response.status });
  }

  const genericError: GenericErrorResponseType = {
    error: errorData.error || "Failed to insert FAQ request"
  };
  return NextResponse.json(genericError, { status: response.status });
}