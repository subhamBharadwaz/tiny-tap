import { nanoid } from "nanoid";
import { Url } from "./url.model";
import { isValidUrl } from "./url.utils";

export const generateShortCodeService = async (
	length: number = 6,
): Promise<string> => {
	let shortCode: string;
	let isUnique = false;
	let attemps = 0;
	const maxAttemps = 10;

	while (!isUnique && attemps < maxAttemps) {
		shortCode = nanoid(length);
		const existing = await Url.findOne({ shortCode });
		if (!existing) {
			isUnique = true;
			return shortCode;
		}
		attemps++;
	}
	throw new Error("Unable to genearte unique short code");
};

export const createShortUrlService = async (
	originalUrl: string,
	customCode?: string,
	expiresAt?: Date,
) => {
	if (!isValidUrl(originalUrl)) {
		throw new Error("Invalid URL format");
	}

	// check if url already exists
	const existingUrl = await Url.findOne({ originalUrl });
	if (existingUrl) {
		return existingUrl;
	}

	let shortCode = customCode;
	if (!shortCode) {
		shortCode = await generateShortCodeService();
	} else {
		// Check if custom code is already taken
		const existing = await Url.findOne({ shortCode: customCode });
		if (existing) {
			throw new Error("Custom short code already exists");
		}
	}

	//Create new URL document
	const urlDoc = new Url({
		originalUrl,
		shortCode,
		expiresAt,
	});
	return await urlDoc.save();
};

export const getOriginalUrlService = async (shortCode: string) => {
	const urlDoc = await Url.findOne({ shortCode });

	if (!urlDoc) {
		return null;
	}

	// Check if URL has expired
	if (urlDoc.expiresAt && urlDoc.expiresAt < new Date()) {
		return null;
	}

	return urlDoc;
};

export const incrementClickCountService = async (shortCode: string) => {
	return await Url.findOneAndUpdate(
		{ shortCode },
		{ $inc: { clickCount: 1 } },
		{ new: true },
	);
};

export const getUrlAnalyticsService = async (shortCode: string) => {
	const urlDoc = await Url.findOne({ shortCode });

	if (!urlDoc) {
		throw new Error("URL not found");
	}

	return {
		originalUrl: urlDoc.originalUrl,
		shortCode: urlDoc.shortCode,
		clickCount: urlDoc.clickCount,
		createdAt: urlDoc.createdAt,
		expiresAt: urlDoc.expiresAt,
	};
};

export const getAllUrlsService = async (
	limit: number = 50,
	skip: number = 0,
) => {
	return await Url.find({})
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(skip)
		.select("-__v");
};

export const deleteUrlService = async (shortCode: string) => {
	const result = await Url.findOneAndDelete({ shortCode });

	if (!result) {
		throw new Error("URL not found");
	}

	return result;
};
