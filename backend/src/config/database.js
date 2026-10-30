import 'dotenv/config'
import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"])

// Non-fatal: contact form needs MongoDB, demo login does not.
const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.warn("MONGODB_URI not set - contact form disabled, demo login still works.");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB (server keeps running):", error.message);
    }
}
export default connectDB;