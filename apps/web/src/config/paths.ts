export const paths = {
	home: {
		path: "/",
		getHref: () => "/",
	},

	auth: {
		login: {
			path: "/login",
			getHref: (redirectTo?: string | null | undefined) =>
				`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
		},
	},

	app: {
		adminDashboard: {
			path: "",
			getHref: () => "/admin/dashboard",
		},
		users: {
			path: "users",
			getHref: () => "/admin/users",
		},
		urls: {
			path: "profile",
			getHref: () => "/admin/urls",
		},
	},
} as const;
