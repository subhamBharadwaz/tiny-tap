import { useQuery } from "@tanstack/react-query";
import type { UrlData } from "@/components/features/url/url.types";
import { env } from "@/config/env";

async function getAdminUrls(): Promise<UrlData[]> {
	const res = await fetch(`${env.SERVER_URL}/api/v1/admin/urls`, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch admin URLs: ${res.statusText}`);
	}

	const json = await res.json();

	if (!json.success || !json.data?.urls) {
		throw new Error("Invalid URLs response from server");
	}

	return json.data.urls as UrlData[];
}

export function useAdminUrls() {
	return useQuery<UrlData[]>({
		queryKey: ["admin-urls"],
		queryFn: getAdminUrls,
	});
}
