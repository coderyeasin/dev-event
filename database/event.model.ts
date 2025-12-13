import mongoose, { Schema, Document, Model } from "mongoose";

// Event TypeScript interface
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Event Mongoose schema
const EventSchema: Schema<IEvent> = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

// Unique index for slug
EventSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save hook for slug generation, date normalization, and validation
 */
EventSchema.pre<IEvent>("validate", function (next) {
  // Generate slug only if title changed
  if (this.isNew || this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .substring(0, 50);
  }

  // Normalize date to ISO format
  if (this.isModified("date")) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      return next(new Error("Invalid date format."));
    }
    this.date = parsedDate.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  // Normalize time to HH:mm format
  if (this.isModified("time")) {
    const timeMatch = /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(this.time);
    if (!timeMatch) {
      return next(new Error("Time must be in HH:mm format."));
    }
    // Already normalized
  }

  // Validate required fields are non-empty
  const requiredFields: Array<keyof IEvent> = [
    "title",
    "description",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "agenda",
    "organizer",
    "tags",
  ];
  for (const field of requiredFields) {
    if (
      !this[field] ||
      (Array.isArray(this[field]) && this[field].length === 0)
    ) {
      return next(
        new Error(`Field '${field}' is required and cannot be empty.`)
      );
    }
  }
  next();
});

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
