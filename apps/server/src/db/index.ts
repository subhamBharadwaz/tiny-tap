import mongoose from "mongoose";

let client: any;

// Initialize database connection
const initializeDB = async () => {
  try {
    console.log("🔌 Connecting to database...");
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("✅ Database connected successfully");
    
    client = mongoose.connection.getClient().db("myDB");
    console.log("✅ Database client initialized");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    // Don't exit, let the app continue
  }
};

// Initialize database
initializeDB();

export { client };
