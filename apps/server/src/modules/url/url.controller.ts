import asyncHandler from "@/middlewares/async-handler.middleware";
import type { Request, Response } from "express";
import type { ICreateUrlRequest } from "./url.type";
import {
	createShortUrlService,
	deleteUrlService,
	getAllUrlsService,
	getOriginalUrlService,
	getUrlAnalyticsService,
	incrementClickCountService,
} from "./url.service";

/**
 * @desc    Create shortened URL
 * @route   POST /api/shorten
 * @access  Public
 */
export const createShortUrlHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const {
			url: originalUrl,
			customCode,
			expiresAt,
		}: ICreateUrlRequest = req.body;

		if (!originalUrl) {
			res.status(400).json({
				success: false,
				message: "URL is required",
			});
			return;
		}

		const urlDoc = await createShortUrlService(
			originalUrl,
			customCode,
			expiresAt,
		);

		res.status(201).json({
			success: true,
			data: {
				originalUrl: urlDoc.originalUrl,
				shortCode: urlDoc.shortCode,
				shortUrl: `${req.protocol}://${req.get("host")}/${urlDoc.shortCode}`,
				createdAt: urlDoc.createdAt,
				expiresAt: urlDoc.expiresAt,
			},
		});
	},
);

/**
 * @desc    Redirect to original URL
 * @route   GET /:shortCode
 * @access  Public
 */
export const redirectUrlHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { shortCode } = req.params;

		// Get original URL
		const urlDoc = await getOriginalUrlService(shortCode);

		if (!urlDoc) {
			res.status(404).json({
				success: false,
				message: "URL not found or expired",
			});
			return;
		}

		// Increment click count
		await incrementClickCountService(shortCode);

		// Redirect to original URL
		res.redirect(301, urlDoc.originalUrl);
	},
);

/**
 * @desc    Get URL analytics
 * @route   GET /api/analytics/:shortCode
 * @access  Public
 */
export const getUrlAnalyticsHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { shortCode } = req.params;

		const analytics = await getUrlAnalyticsService(shortCode);

		res.json({
			success: true,
			data: analytics,
		});
	},
);

/**
 * @desc    Get all URLs
 * @route   GET /api/urls
 * @access  Public
 */
export const getAllUrlsHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { limit = "50", skip = "0" } = req.query;

		const urls = await getAllUrlsService(
			parseInt(limit as string),
			parseInt(skip as string),
		);

		// Add full short URL to each item
		const urlsWithFullPath = urls.map((url: any) => ({
			...url.toObject(),
			shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`,
		}));

		res.json({
			success: true,
			data: urlsWithFullPath,
			count: urlsWithFullPath.length,
		});
	},
);

/**
 * @desc    Delete URL
 * @route   DELETE /api/urls/:shortCode
 * @access  Private
 */
export const deleteUrlHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { shortCode } = req.params;

		await deleteUrlService(shortCode);

		res.json({
			success: true,
			message: "URL deleted successfully",
		});
	},
);
