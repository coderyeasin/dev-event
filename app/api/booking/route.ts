import { BookingModel } from "@/database/booking.model";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Create a Booking
export async function POST(req: NextRequest) {
  try {
    //connect to database
    await connectToDatabase();
  } catch (e) {
    return NextResponse.json({
      message: "An Unknown error occurred while connecting to the database.",
      status: 500,
    });
  }
}

// Get All Bookings
export async function GET() {
  try {
    await connectToDatabase();
    const bookingEvent = await BookingModel.find().sort({ createdAt: -1 });
    return NextResponse.json({
      message: "User Booking Emails",
      status: 200,
      booking: bookingEvent,
    });
  } catch (e) {
    // Always log the full error internally
    console.error("Error fetching bookings:", e);
    // Return a sanitized error response
    return NextResponse.json(
      { message: "Something went wrong", status: 500 },
      { status: 500 }
    );
  }
}
