import "dotenv/config";
import cors from "cors";
import express, { type Express, type NextFunction } from "express";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import url from "./modules/url/url.route";
import admin from "./modules/admin/admin.routes";
import ErrorHandler from "./lib/utils/classes/errorHandler";
import logger from "./middlewares/logger.middleware";
import { redirectUrlHandler } from "./modules/url/url.controller";

import type BaseError from "./lib/utils/classes/baseError";
import { HttpStatusCode } from "./types/http.model";

const app: Express = express();
const errorHandler = new ErrorHandler(logger);

const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
	  if (!origin) return callback(null, true);
	  
	  const allowedOrigins = [
		process.env.CORS_ORIGIN,
		"http://localhost:3000",
		"http://localhost:3001",
		"http://127.0.0.1:3000",
		"http://127.0.0.1:3001"
	  ].filter(Boolean);
	  
	  if (allowedOrigins.includes(origin)) {
		callback(null, true);
	  } else {
		
		callback(new Error('Not allowed by CORS'));
	  }
	},
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
	credentials: true,
	optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));
app.all("/api/auth{/*path}", toNodeHandler(auth));

// Root endpoint for basic testing and Railway health checks
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Tiny Tap API is running", 
    timestamp: new Date().toISOString(),
    cors_origin: process.env.CORS_ORIGIN,
    status: "healthy"
  });
});



app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/url", url);
app.get("/:shortCode", redirectUrlHandler);
app.use("/api/v1/admin", admin);


//@ts-ignore
app.use(errorMiddleware);

process.on("uncaughtException", async (error: Error) => {
	await errorHandler.handleError(error);
	if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on("unhandledRejection", (reason: Error) => {
	throw reason;
});


async function errorMiddleware(
	err: BaseError,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (!errorHandler.isTrustedError(err)) {
		//@ts-ignore

		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			error: "Something went wrong, please try again later.",
			code: HttpStatusCode.INTERNAL_SERVER,
		});
		next(err);
		return;
	}
	await errorHandler.handleError(err);
	//@ts-ignore

	res.status(err.httpCode).json({
		error: err.message,
		code: err.httpCode,
	});
}

export default app;
