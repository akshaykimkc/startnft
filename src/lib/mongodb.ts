import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

declare global {
  var mongoose: { conn: mongoose.Mongoose | null; promise: Promise<mongoose.Mongoose> | null } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const currentCached = cached!; // Guaranteed by check above
  
  if (currentCached.conn) {
    return currentCached.conn;
  }

  if (!currentCached.promise) {
    const opts = {
      bufferCommands: false,
    };

    currentCached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  currentCached.conn = await currentCached.promise;
  return currentCached.conn;
}

export default dbConnect;
