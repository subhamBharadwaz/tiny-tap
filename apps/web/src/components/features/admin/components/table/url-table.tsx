import type { UrlData } from "@/components/features/url/url.types";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ExternalLink, LoaderIcon } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

type UrlTableProps = {
	urls: UrlData[];
	isLoading: boolean;
	isError: boolean;
};

export const UrlTable: React.FC<UrlTableProps> = ({
	urls,
	isLoading,
	isError,
}) => {
	if (isError) {
		return (
			<div className="text-center text-red-500 py-10">Failed to load URLs.</div>
		);
	}

	return (
		<Card className="bg-gradient-card shadow-elegant">
			<CardHeader>
				<CardTitle>All URLs</CardTitle>
				<CardDescription>
					Manage and monitor all your shortened URLs
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<div className="flex items-center justify-center py-8">
						<LoaderIcon className="size-6 animate-spin" />
					</div>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Short Code</TableHead>
								<TableHead>Original URL</TableHead>
								<TableHead>Clicks</TableHead>
								<TableHead>Created</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{urls.map((url) => (
								<TableRow key={url._id}>
									<TableCell className="font-mono font-medium">
										{url.shortCode}
									</TableCell>
									<TableCell className="max-w-xs truncate">
										{url.originalUrl}
									</TableCell>
									<TableCell>
										<Badge variant="secondary">{url.clickCount} clicks</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{format(url.createdAt, "MMM d, yyyy hh:mm a")}
									</TableCell>
									<TableCell>
										<Badge variant="default">Active</Badge>
									</TableCell>
									<TableCell>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => window.open(url.shortUrl, "_blank")}
										>
											<ExternalLink className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
};
