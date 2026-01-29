"use server";

import { EventModel } from "@/models";
import connectToDatabase from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();
    const event = await EventModel.findOne({ slug });

    return await EventModel.find({
      _id: { $ne: event?._id },
      tags: { $in: event?.tags },
    }).lean();
  } catch {
    return [];
  }
};
