import { Stats } from "@/components/features/admin/components/stats";
import { UrlTable } from "@/components/features/admin/components/table/url-table";
import { useAdminStats } from "@/components/features/admin/queries/useAdminStats";
import { useAdminUrls } from "@/components/features/admin/queries/useAdminUrls";
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
		return <LoaderIcon className="size-6 animate-spin" />;
	}

	if (!authSession?.data?.session) {
		redirect({ to: "/login" });
	}
	//@ts-ignore
	if (authSession?.data?.session?.user?.role !== "admin") {
		redirect({ to: "/not-found" });
	}

	if (!authSession?.data?.user) {
		return <LoaderIcon className="size-6 animate-spin" />;
	}

	return (
		<div className="min-h-screen bg-background">
			{adminStatsData.data && <Stats stats={adminStatsData.data} />}
			<UrlTable
				urls={adminUrlsData.data ?? []}
				isLoading={adminUrlsData.isLoading}
				isError={adminUrlsData.isError}
			/>
		</div>
	);
}
