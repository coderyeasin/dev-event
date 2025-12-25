import { Event } from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json({
        message: "Invalid Form Data Format",
        status: 400,
      });
    }
    const createdEvent = await Event.create(event);
    return NextResponse.json({
      message: "Event Created Successfully",
      status: 201,
      event: createdEvent,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Event Creation Failed",
      error: e instanceof Error ? e.message : "Unknown Error",
    });
  }
}
