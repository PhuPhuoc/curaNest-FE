import { NextResponse } from "next/server";

export async function GET(request: any) {
  const { user_id, amount } = await request.json();

  const finalData = {
    user_id,
    amount,
  };

  try {
    const response = await fetch(
      "https://api.curanest.com.vn/api/v1/payments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create payment URL" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 }); // Return the response from the third-party API
  } catch (error) {
    console.error("Error creating payment URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
