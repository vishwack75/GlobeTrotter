import { Router } from "express";
import { BudgetController } from "../controllers/budget.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/:tripId", authenticateToken, BudgetController.getTripBudgetSummary);
router.put("/:tripId", authenticateToken, BudgetController.updateBudgetCategories);

export default router;
