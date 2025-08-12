import type { UrlData } from "@/features/url/url.types";
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
import { Copy, ExternalLink, LoaderIcon } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/utils";

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
			<Card className="bg-gradient-card shadow-elegant">
				<CardContent className="flex items-center justify-center py-12">
					<div className="text-center space-y-4">
						<p className="text-red-500 text-lg font-medium">
							Failed to load URLs
						</p>
						<p className="text-muted-foreground">
							Please try refreshing the page
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="bg-gradient-card shadow-elegant">
			<CardHeader className="px-4 lg:px-6">
				<CardTitle className="text-lg lg:text-xl">All URLs</CardTitle>
				<CardDescription className="text-sm lg:text-base">
					Manage and monitor all your shortened URLs
				</CardDescription>
			</CardHeader>
			<CardContent className="px-0 lg:px-6">
				{isLoading ? (
					<div className="flex items-center justify-center py-12">
						<div className="text-center space-y-4">
							<LoaderIcon className="size-8 animate-spin mx-auto" />
							<p className="text-muted-foreground">Loading URLs...</p>
						</div>
					</div>
				) : (
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="min-w-[100px]">Short Code</TableHead>
									<TableHead className="min-w-[200px]">Original URL</TableHead>
									<TableHead className="min-w-[80px] text-center">
										Clicks
									</TableHead>
									<TableHead className="min-w-[140px]">Created</TableHead>
									<TableHead className="min-w-[80px] text-center">
										Status
									</TableHead>
									<TableHead className="min-w-[100px] text-center">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{urls.length === 0 ? (
									<TableRow>
										<TableCell colSpan={6} className="text-center py-12">
											<div className="space-y-2">
												<p className="text-muted-foreground text-lg">
													No URLs found
												</p>
												<p className="text-muted-foreground text-sm">
													URLs will appear here once they are created
												</p>
											</div>
										</TableCell>
									</TableRow>
								) : (
									urls.map((url) => (
										<TableRow key={url._id} className="hover:bg-muted/50">
											<TableCell className="font-mono font-medium">
												<div className="flex items-center space-x-2">
													<span className="truncate max-w-[80px]">
														{url.shortCode}
													</span>
													<Button
														variant="ghost"
														size="sm"
														className="h-6 w-6 p-0"
														onClick={() => copyToClipboard(url.shortUrl)}
													>
														<Copy className="h-3 w-3" />
													</Button>
												</div>
											</TableCell>
											<TableCell>
												<div
													className="max-w-[250px] truncate"
													title={url.originalUrl}
												>
													{url.originalUrl}
												</div>
											</TableCell>
											<TableCell className="text-center">
												<Badge
													variant="secondary"
													className="whitespace-nowrap"
												>
													{url.clickCount}
												</Badge>
											</TableCell>
											<TableCell className="text-muted-foreground text-sm">
												<div className="whitespace-nowrap">
													{format(url.createdAt, "MMM d, yyyy")}
												</div>
												<div className="text-xs text-muted-foreground/70">
													{format(url.createdAt, "hh:mm a")}
												</div>
											</TableCell>
											<TableCell className="text-center">
												<Badge
													variant="default"
													className="bg-green-500/10 text-green-700 border-green-500/20"
												>
													Active
												</Badge>
											</TableCell>
											<TableCell>
												<div className="flex items-center justify-center space-x-1">
													<Button
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0"
														onClick={() => window.open(url.shortUrl, "_blank")}
														title="Open shortened URL"
													>
														<ExternalLink className="h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
