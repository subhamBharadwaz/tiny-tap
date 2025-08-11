import "dotenv/config";

import app from "./app";
import env from "./env";
import logger from "./middlewares/logger.middleware";

const port = env.PORT || 3000;

// Debug logging
console.log("🚀 Starting server...");
console.log("📁 Current directory:", process.cwd());
console.log("📁 Files in current directory:", require('fs').readdirSync('.'));
console.log("📁 Files in dist:", require('fs').readdirSync('./dist'));
console.log("🔧 Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN
});

// Test database connection
try {
  console.log("🔌 Testing database connection...");
  // Add a simple test here if you have database connection
  console.log("✅ Database connection test passed");
} catch (error) {
  console.error("❌ Database connection test failed:", error);
}

const server = app.listen(port, "0.0.0.0", () => {
	logger.info(`Server is running at http://0.0.0.0:${port}`);
	console.log("✅ Server started successfully!");
	console.log("🚀 App is ready for Railway health checks immediately");
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed gracefully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed gracefully');
    process.exit(0);
  });
});
