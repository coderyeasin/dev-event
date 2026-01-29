import mongoose, { Connection } from "mongoose";

interface MongooseGlobal {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  var __mongooseCache: MongooseGlobal | undefined;
}

const cached: MongooseGlobal =
  globalThis.__mongooseCache ??
  (globalThis.__mongooseCache = { conn: null, promise: null });

export async function connectToDatabase(): Promise<Connection> {
  const MONGODB_URI = process.env.MONGODB_URI; // Moved inside the function
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local",
    );
  }
  if (cached.conn) {
    // Return cached connection if available
    return cached.conn;
  }
  if (!cached.promise) {
    // Create a new connection promise if not cached
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance.connection);
  }
  // Await the connection and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
