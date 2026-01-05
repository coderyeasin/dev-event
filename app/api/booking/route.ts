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
export async function GET() {}
