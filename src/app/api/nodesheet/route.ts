import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entityId = searchParams.get("entity_id");

  if (!entityId) {
    return NextResponse.json(
      { error: "Entity ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/node_sheet?entity_id=${entityId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching node sheet:", error);
    return NextResponse.json(
      { error: "Failed to fetch node sheet" },
      { status: 500 }
    );
  }
}
