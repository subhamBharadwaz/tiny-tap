import * as React from "react";

import Header from "@/components/header";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";
import { LoaderIcon } from "lucide-react";
import { MainErrorFallback } from "@/components/errors/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "tiny-tap",
			},
			{
				name: "description",
				content: "tiny-tap is a web application",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
});

function RootComponent() {
	const isFetching = useRouterState({
		select: (s) => s.isLoading,
	});

	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: queryConfig,
			}),
	);

	return (
		<React.Suspense
			fallback={
				<div className="flex h-screen w-screen items-center justify-center">
					<LoaderIcon className="size-6 animate-spin" />
				</div>
			}
		>
			<ErrorBoundary FallbackComponent={MainErrorFallback}>
				<HelmetProvider>
					<QueryClientProvider client={queryClient}>
						{import.meta.env.DEV && <ReactQueryDevtools />}
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							disableTransitionOnChange
							storageKey="vite-ui-theme"
						>
							<div className="grid grid-rows-[auto_1fr] h-svh">
								<Header />
								{isFetching ? <Loader /> : <Outlet />}
							</div>
							<Toaster richColors className="bg-background text-foreground" />
						</ThemeProvider>
					</QueryClientProvider>
				</HelmetProvider>
			</ErrorBoundary>
			<HeadContent />
			<TanStackRouterDevtools position="bottom-left" />
		</React.Suspense>
	);
}
