import { Event } from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    let event;
    let agenda;
    let tags;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json({
        message: "Invalid Form Data Format",
        status: 400,
      });
    }

    // image as file
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json({
        message: "Image file is required",
        status: 400,
      });
    }
    // convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "dev-event",
          },
          (error, result) => {
            if (error) return reject(error);

            resolve(result);
          }
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

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

export async function GET() {
  try {
    await connectToDatabase();

    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({
      message: "Events Fetched Successfully",
      status: 200,
      events: events,
    });
  } catch (e) {
    return NextResponse.json({
      message: "Event Fetching Failed",
      error: e,
      status: 500,
    });
  }
}
