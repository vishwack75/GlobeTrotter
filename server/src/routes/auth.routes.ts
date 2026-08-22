import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { signupValidator, loginValidator, forgotPasswordValidator } from "../validations/auth.validator";

const router = Router();

router.post("/signup", validateRequest(signupValidator), AuthController.signup);
router.post("/login", validateRequest(loginValidator), AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.post("/forgot-password", validateRequest(forgotPasswordValidator), AuthController.forgotPassword);

export default router;
