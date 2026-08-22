import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
import { updateProfileValidator } from "../validations/profile.validator";

const router = Router();

router.get("/profile", authenticateToken, UserController.getProfile);
router.put("/profile", authenticateToken, validateRequest(updateProfileValidator), UserController.updateProfile);
router.delete("/account", authenticateToken, UserController.deleteAccount);
router.post("/saved-destinations/toggle", authenticateToken, UserController.toggleSaveDestination);

export default router;
