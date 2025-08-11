import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const copyToClipboard = (shortUrl: string) => {
	navigator.clipboard.writeText(shortUrl);
	toast("Copied!", { description: "Short URL copied to clipboard" });
};
