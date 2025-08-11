import "dotenv/config";
import cors from "cors";
import express, { type Express } from "express";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import url from "./modules/url/url.route";
import admin from "./modules/admin/admin.routes";
import ErrorHandler from "./lib/utils/classes/errorHandler";
import logger from "./middlewares/logger.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { redirectUrlHandler } from "./modules/url/url.controller";

const app: Express = express();
const errorHandler = new ErrorHandler(logger);

const corsOptions = {
	origin: (
		origin: string | undefined,
		callback: (err: Error | null, allow?: boolean) => void,
	) => {
		if (!origin) return callback(null, true);

		const allowedOrigins = [
			process.env.CORS_ORIGIN,
			"http://localhost:3000",
			"http://localhost:3001",
			"http://127.0.0.1:3000",
			"http://127.0.0.1:3001",
		].filter(Boolean);
	},
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"Cookie",
		"X-Requested-With",
		"Accept",
		"Origin",
	],
	credentials: true,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(express.json());

app.use("/api/v1/url", url);
app.get("/:shortCode", redirectUrlHandler);
app.use("/api/v1/admin", admin);

// Handling errors - using the same pattern as your working app
app.use(errorMiddleware);

process.on("uncaughtException", async (error: Error) => {
	await errorHandler.handleError(error);
	if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on("unhandledRejection", (reason: Error) => {
	throw reason;
});

export default app;
