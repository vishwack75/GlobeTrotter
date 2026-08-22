import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import tripRoutes from "./trip.routes";
import cityRoutes from "./city.routes";
import activityRoutes from "./activity.routes";
import budgetRoutes from "./budget.routes";
import adminRoutes from "./admin.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/trips", tripRoutes);
router.use("/cities", cityRoutes);
router.use("/activities", activityRoutes);
router.use("/budget", budgetRoutes);
router.use("/admin", adminRoutes);

export default router;
