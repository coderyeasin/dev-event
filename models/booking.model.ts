import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { Event } from "./event.model";

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Mongoose schema
const BookingSchema: Schema<IBooking> = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (email: string): boolean {
          // Simple RFC 5322 compliant regex for demonstration
          const emailRegex = /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(\.[\w-]+)+$/;
          return emailRegex.test(email);
        },
        message: "please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook
 */
BookingSchema.pre<IBooking>("save", async function (next) {
  // Validate eventId references an existing Event
  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) {
    return next(new Error("Referenced event does not exist."));
  }
  next();
});

export const BookingModel: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
