import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log("MongoDB Connected!".cyan);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
