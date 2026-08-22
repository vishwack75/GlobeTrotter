import { Router } from "express";
import { CityController } from "../controllers/city.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
import { createCityValidator } from "../validations/city.validator";

const router = Router();

router.get("/search", CityController.searchCities);
router.get("/:id", CityController.getCityById);

router.post("/", authenticateToken, requireAdmin, validateRequest(createCityValidator), CityController.createCity);
router.put("/:id", authenticateToken, requireAdmin, CityController.updateCity);
router.delete("/:id", authenticateToken, requireAdmin, CityController.deleteCity);

export default router;
