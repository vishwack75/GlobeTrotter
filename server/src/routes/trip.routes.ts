import { Router } from "express";
import { TripController } from "../controllers/trip.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
import { createTripValidator, updateTripValidator } from "../validations/trip.validator";
import { addStopValidator, updateStopValidator } from "../validations/stop.validator";

const router = Router();

router.get("/public/:shareCode", TripController.getPublicTrip);

router.use(authenticateToken);

router.get("/", TripController.getUserTrips);
router.post("/", validateRequest(createTripValidator), TripController.createTrip);
router.get("/:id", TripController.getTripById);
router.put("/:id", validateRequest(updateTripValidator), TripController.updateTrip);
router.delete("/:id", TripController.deleteTrip);
router.post("/copy/:shareCode", TripController.copyTrip);

router.post("/stops", validateRequest(addStopValidator), TripController.addStop);
router.put("/stops/:stopId", validateRequest(updateStopValidator), TripController.updateStop);
router.delete("/stops/:stopId", TripController.deleteStop);
router.put("/:tripId/stops/reorder", TripController.reorderStops);

export default router;
