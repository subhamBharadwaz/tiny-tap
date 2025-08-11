import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db";

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
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
	},
});
