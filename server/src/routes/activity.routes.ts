import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
import { addStopActivityValidator, createCityActivityValidator } from "../validations/activity.validator";

const router = Router();

router.get("/search", ActivityController.searchActivities);

router.post("/stop-activity", authenticateToken, validateRequest(addStopActivityValidator), ActivityController.addActivityToStop);
router.delete("/stop-activity/:id", authenticateToken, ActivityController.removeActivityFromStop);

router.post("/", authenticateToken, requireAdmin, validateRequest(createCityActivityValidator), ActivityController.createCityActivity);

export default router;
