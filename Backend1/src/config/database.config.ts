import mongoose from "mongoose";
import { config } from "./app.config";

const connectDatabase = async () => {
  try {
    if (!config.MONGO_URI) {
      console.log("MongoDB URI not provided. Skipping database connection.");
      return;
    }
    
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    // Don't exit in production to allow the API to still function
    if (config.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

export default connectDatabase;