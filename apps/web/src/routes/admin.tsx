import { Stats } from "@/features/admin/components/stats";
import { UrlTable } from "@/features/admin/components/table/url-table";
import { useAdminStats } from "@/features/admin/queries/useAdminStats";
import { useAdminUrls } from "@/features/admin/queries/useAdminUrls";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoaderIcon } from "lucide-react";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	const authSession = authClient.useSession();
	const adminStatsData = useAdminStats();
	const adminUrlsData = useAdminUrls();

	if (authSession.isPending) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center px-4">
				<div className="text-center space-y-4 max-w-md mx-auto">
					<LoaderIcon className="size-8 md:size-10 animate-spin text-primary mx-auto" />
					<p className="text-base md:text-lg text-muted-foreground">
						Loading admin dashboard...
					</p>
				</div>
			</div>
		);
	}

	if (!authSession?.data?.session) {
		redirect({ to: "/login" });
	}
	//@ts-ignore
	if (authSession?.data?.session?.user?.role !== "admin") {
		redirect({ to: "/not-found" });
	}

	if (!authSession?.data?.user) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center px-4">
				<div className="text-center space-y-4 max-w-md mx-auto">
					<LoaderIcon className="size-8 md:size-10 animate-spin text-primary mx-auto" />
					<p className="text-base md:text-lg text-muted-foreground">
						Loading user data...
					</p>
				</div>
			</div>
		);
	}

	return (
		<main className=" min-h-screen bg-background">
			<div className="container py-6 lg:py-8">
				{/* Header Section */}
				<div className="text-center space-y-3 mb-8 lg:mb-12">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
						Admin Dashboard
					</h1>
					<p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
						Manage your URL shortener platform
					</p>
				</div>

				{/* Stats Section */}
				{adminStatsData.data && (
					<section className="mb-8 lg:mb-12">
						<h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-6 lg:mb-8">
							Platform Statistics
						</h2>
						<Stats stats={adminStatsData.data} />
					</section>
				)}

				{/* Table Section */}
				<section>
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-6 lg:mb-8">
						URL Management
					</h2>
					<UrlTable
						urls={adminUrlsData.data ?? []}
						isLoading={adminUrlsData.isLoading}
						isError={adminUrlsData.isError}
					/>
				</section>
			</div>
		</main>
	);
}
