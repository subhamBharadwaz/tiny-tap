import { useQuery } from "@tanstack/react-query";
import type { StatsData } from "@/features/admin/admin.types";
import { env } from "@/config/env";

export async function fetchAdminStats(): Promise<StatsData> {
	const res = await fetch(`${env.SERVER_URL}/api/v1/admin/stats`, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch stats: ${res.statusText}`);
	}

	const json = await res.json();
	if (!json.success || !json.data) {
		throw new Error("Invalid stats response from server");
	}

	return json.data as StatsData;
}

export function useAdminStats() {
	return useQuery({
		queryKey: ["admin-stats"],
		queryFn: fetchAdminStats,
	});
}
