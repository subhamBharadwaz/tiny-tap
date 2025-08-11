import asyncHandler from "@/middlewares/async-handler.middleware";
import type { Request, Response } from "express";
import { deleteUrlService, getAllUrlsService } from "../url/url.service";
import {
	getAdminStatsService,
	getAllUsersService,
	updateUserRoleService,
} from "./admin.service";
import { Url } from "../url/url.model";

/**
 * @desc    Get all URLs for admin
 * @route   GET /api/admin/urls
 * @access  Private/Admin
 */
export const getAdminUrlsHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const {
			limit = "100",
			skip = "0",
			sortBy = "createdAt",
			sortOrder = "desc",
		} = req.query;

		const urls = await getAllUrlsService(
			parseInt(limit as string),
			parseInt(skip as string),
		);

		// Add full short URL to each item
		const urlsWithFullPath = urls.map((url: any) => ({
			...url.toObject(),
			shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`,
		}));

		const totalCount = await Url.countDocuments();

		res.json({
			success: true,
			data: {
				urls: urlsWithFullPath,
				pagination: {
					total: totalCount,
					limit: parseInt(limit as string),
					skip: parseInt(skip as string),
					hasMore:
						totalCount > parseInt(skip as string) + parseInt(limit as string),
				},
			},
		});
	},
);

/**
 * @desc    Get admin dashboard stats
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
export const getAdminStatsHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const stats = await getAdminStatsService();

		// Add full short URL to top URLs
		const topUrlsWithFullPath = stats.topUrls.map((url: any) => ({
			...url.toObject(),
			shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`,
		}));

		res.json({
			success: true,
			data: {
				...stats,
				topUrls: topUrlsWithFullPath,
			},
		});
	},
);

/**
 * @desc    Delete URL (admin)
 * @route   DELETE /api/admin/urls/:shortCode
 * @access  Private/Admin
 */
export const deleteAdminUrlHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { shortCode } = req.params;

		await deleteUrlService(shortCode);

		res.json({
			success: true,
			message: "URL deleted successfully",
		});
	},
);

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsersHandler = asyncHandler(async (_, res: Response) => {
	const users = await getAllUsersService();

	res.json({
		success: true,
		data: users,
	});
});

/**
 * @desc    Update user role
 * @route   PATCH /api/admin/users/:userId/role
 * @access  Private/Admin
 */
export const updateUserRoleHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { userId } = req.params;
		const { role } = req.body;

		const user = await updateUserRoleService(userId, role);

		res.json({
			success: true,
			data: user,
		});
	},
);
