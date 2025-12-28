//Define route params type for type safety

import { Event, IEvent } from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET /api/events/[slug]
 * Fetch a single event by its slug
 */

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const { slug } = await params;

    // validate slug
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json({
        message: "Invalid or missing slug parameter",
        status: 400,
      });
    }

    // Sanitize slug (remove any potential malicious input)
    const sanitizedSlug = slug.trim().toLocaleLowerCase();

    // Query event by slug
    const event = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json({
        message: `Event with slug ${sanitizedSlug} not found`,
        status: 404,
      });
    }

    // Return Successful response with event data
    return NextResponse.json({
      message: "Event fetched Successfully",
      status: 200,
      event: event,
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching event by slug:", e);
    }

    // Handle error from mongoDB or other sources
    if (e instanceof Error) {
      if (e.message.includes("MONGODB_URI")) {
        return NextResponse.json({
          message: "Database connection error",
          status: 500,
        });
      }
      return NextResponse.json({
        message: "Error fetching event",
        status: 500,
        error: e.message,
      });
    }

    return NextResponse.json({
      message: "An unexpected error occurred",
      status: 500,
      error: e,
    });
  }
}
