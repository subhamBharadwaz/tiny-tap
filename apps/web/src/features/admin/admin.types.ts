import type { UrlData } from "../url/url.types";

export interface StatsData {
	totalUrls: number;
	totalClicks: number;
	urlsToday: number;
	clicksToday: number;
	topUrls: UrlData[];
}
