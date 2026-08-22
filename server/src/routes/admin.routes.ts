import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateToken, requireAdmin);

router.get("/analytics", AdminController.getAnalytics);
router.get("/users", AdminController.getUsers);
router.put("/users/:userId/role", AdminController.updateUserRole);
router.delete("/users/:userId", AdminController.deleteUser);

export default router;
