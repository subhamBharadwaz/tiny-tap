import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db";
import env from "@/env";

export const auth = betterAuth({
	database: mongodbAdapter(client),
	user: {
		modelName: "user",
		additionalFields: {
			role: {
				type: "string",
				defaultValue: "user",
			},
		},
	},
	advanced: {
		crossSubDomainCookies: {
			enabled: true,
		},
		useSecureCookies: env.NODE_ENV === "production",
		cookies: {
			session_token: {
				attributes: {
					httpOnly: true,
					secure: env.NODE_ENV === "production",
					path: "/",
				},
			},
		},
		defaultCookieAttributes: {
			secure: env.NODE_ENV === "production",
			sameSite: "none",
		},
	},
	trustedOrigins: [
		env.CORS_ORIGIN,
		env.CORS_ORIGIN,
		"http://localhost:3000",
		"http://localhost:3001",
	],
	emailAndPassword: {
		enabled: true,
	},
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
