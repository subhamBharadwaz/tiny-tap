import { User } from "../auth/auth.model";
import { Url } from "../url/url.model";

export const getAdminStatsService = async () => {
	const [totalUrls, totalClicks, urlsToday, clicksToday, topUrls] =
		await Promise.all([
			Url.countDocuments(),

			// Total clicks across all URLs
			Url.aggregate([
				{ $group: { _id: null, totalClicks: { $sum: "$clickCount" } } },
			]),

			// URLs created today
			Url.countDocuments({
				createdAt: {
					$gte: new Date(new Date().setHours(0, 0, 0, 0)),
				},
			}),

			// Clicks today approximation
			Url.aggregate([
				{
					$match: {
						updatedAt: {
							$gte: new Date(new Date().setHours(0, 0, 0, 0)),
						},
					},
				},
				{ $group: { _id: null, clicksToday: { $sum: "$clickCount" } } },
			]),

			// Top 10 most clicked URLs
			Url.find({})
				.sort({ clickCount: -1 })
				.limit(10)
				.select("originalUrl shortCode clickCount createdAt"),
		]);

	return {
		totalUrls,
		totalClicks: totalClicks[0]?.totalClicks || 0,
		urlsToday,
		clicksToday: clicksToday[0]?.clicksToday || 0,
		topUrls,
	};
};

export const getAllUsersService = async () => {
	return await User.find({ isActive: true }).sort({ createdAt: -1 });
};

export const updateUserRoleService = async (userId: string, role: string) => {
	if (!["user", "admin"].includes(role)) {
		throw new Error("Invalid role. Must be user or admin");
	}

	const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

	if (!user) {
		throw new Error("User not found");
	}

	return user;
};
