import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    //connect to database
    await connectToDatabase();
  } catch (e) {
    return NextResponse.json({
      message: "An Unknowen error occurred while connecting to the database.",
      status: 500,
    });
  }
}
