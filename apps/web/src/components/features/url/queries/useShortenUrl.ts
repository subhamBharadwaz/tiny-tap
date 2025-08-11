import { env } from "@/config/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ShortenResponse = {
	success: boolean;
	data?: {
		shortUrl?: string;
	};
};

async function shortenUrlRequest(originalUrl: string): Promise<string> {
	const res = await fetch(`${env.SERVER_URL}/api/v1/url/shorten`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ url: originalUrl }),
	});

	if (!res.ok) {
		throw new Error(`Failed to shorten URL: ${res.statusText}`);
	}

	const data: ShortenResponse = await res.json();

	if (data.success && data.data?.shortUrl) {
		return data.data.shortUrl;
	}
	throw new Error("Invalid response from server");
}

export function useShortenUrl() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: shortenUrlRequest,
		onSuccess: (shortUrl) => {
			toast("Success!", { description: "Your URL has been shortened" });

			queryClient.invalidateQueries({ queryKey: ["admin-urls"] });

			return shortUrl;
		},
		onError: () => {
			toast("Error", { description: "Failed to shorten URL" });
		},
	});
}
