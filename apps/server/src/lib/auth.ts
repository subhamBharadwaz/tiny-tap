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
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
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
