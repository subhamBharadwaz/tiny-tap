import ErrorHandler from "@/lib/utils/classes/errorHandler";
import logger from "./logger.middleware";
import type { ErrorRequestHandler } from "express";
import { HttpStatusCode } from "@/types/http.model";
import type BaseError from "@/lib/utils/classes/baseError";

const errorHandler = new ErrorHandler(logger);

export const errorMiddleware: ErrorRequestHandler = async (err, req, res, next) => {
	if (!errorHandler.isTrustedError(err)) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			error: "Something went wrong, please try again later.",
			code: HttpStatusCode.INTERNAL_SERVER,
		});
		return next(err);
	}

	await errorHandler.handleError(err);
	res.status((err as BaseError).httpCode).json({
		error: (err as BaseError).message,
		code: (err as BaseError).httpCode,
	});
};

