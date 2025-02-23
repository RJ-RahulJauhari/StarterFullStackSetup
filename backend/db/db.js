import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();  

const MONGO_DB_URL = process.env.DB_URL;

if (!MONGO_DB_URL) {
    throw new Error("MongoDB URL is undefined. Check your .env file.");
}

// Connect to MongoDB using Mongoose
const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL);
        console.log("Connected to MongoDB successfully using Mongoose...");
    } catch (error) {
        console.error("Could not connect to MongoDB. Error:", error);
        process.exit(1);  // Exit process on failure
    }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB successfully...");
    } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
    }
};

export { connectToDB, disconnectDB };
