import express from "express";

import authMiddleware from "../middleware/authmiddleware.js";

import { getMonthlyTrends, getCategorySummary,summary, overview } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/monthly-trends", authMiddleware, getMonthlyTrends);
router.get("/summary", authMiddleware, summary);
router.get("/category-summary", authMiddleware, getCategorySummary);
router.get("/overview", authMiddleware, overview);

export default router;