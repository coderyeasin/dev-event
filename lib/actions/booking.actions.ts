"use server";

import { BookingModel } from "@/database/booking.model";
import connectToDatabase from "@/lib/mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectToDatabase();

    const booking = (
      await BookingModel.create({ eventId, slug, email })
    ).lean();
    return {
      success: true,
      booking,
    };
  } catch (e) {
    console.error("Create booking failed", e);
    return {
      success: false,
      e: e,
    };
  }
};
