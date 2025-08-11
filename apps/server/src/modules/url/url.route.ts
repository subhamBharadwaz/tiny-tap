import { Router } from "express";
import {
	createShortUrlHandler,
	deleteUrlHandler,
	getAllUrlsHandler,
	getUrlAnalyticsHandler,
} from "./url.controller";

const router: Router = Router();

router.post("/shorten", createShortUrlHandler);
router.get("/all", getAllUrlsHandler);
router.get("/analytics/:shortCode", getUrlAnalyticsHandler);
router.delete("/:shortCode", deleteUrlHandler);

export default router;
