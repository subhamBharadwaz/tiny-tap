import mongoose from "mongoose";

const { Schema, model } = mongoose;

const urlSchema = new Schema(
	{
		originalUrl: {
			type: String,
			required: true,
			trim: true,
		},
		shortCode: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		clickCount: {
			type: Number,
			default: 0,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		expiresAt: {
			type: Date,
			default: null, // null = never expires
		},
	},
	{
		timestamps: true,
		collection: "url",
	},
);

urlSchema.index({ createdAt: -1 });

export const Url = model("Url", urlSchema);
