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

app.listen(port, "0.0.0.0", () => {
	logger.info(`Server is running at http://0.0.0.0:${port}`);
	console.log("✅ Server started successfully!");
});
