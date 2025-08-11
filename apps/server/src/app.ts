import "dotenv/config";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import url from "./modules/url/url.route";
import admin from "./modules/admin/admin.routes";
import env from "./env";
import ErrorHandler from "./lib/utils/classes/errorHandler";
import logger from "./middlewares/logger.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { redirectUrlHandler } from "./modules/url/url.controller";

const app: Express = express();
const errorHandler = new ErrorHandler(logger);

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "",
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

// set security headers
app.use(helmet());

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
