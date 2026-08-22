import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateToken, requireAdmin);

router.get("/analytics", AdminController.getAnalytics);
router.get("/users", AdminController.getUsers);
router.get("/users/:userId/trips", AdminController.getUserTrips);
router.get("/popular-cities", AdminController.getPopularCities);
router.get("/popular-activities", AdminController.getPopularActivities);
router.get("/user-trends", AdminController.getUserTrends);
router.put("/users/:userId/role", AdminController.updateUserRole);
router.delete("/users/:userId", AdminController.deleteUser);

export default router;
