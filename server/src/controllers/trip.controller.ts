import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { TripService } from "../services/trip.service";
import { StopService } from "../services/stop.service";

export class TripController {
  static async getUserTrips(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const trips = await TripService.getUserTrips(req.user!.id);
      res.json(trips);
    } catch (err) {
      next(err);
    }
  }

  static async getTripById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const trip = await TripService.getTripById(id, req.user?.id);
      res.json(trip);
    } catch (err) {
      next(err);
    }
  }

  static async getPublicTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const shareCode = Array.isArray(req.params.shareCode) ? req.params.shareCode[0] : req.params.shareCode;
      const trip = await TripService.getPublicTripByShareCode(shareCode);
      res.json(trip);
    } catch (err) {
      next(err);
    }
  }

  static async createTrip(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const trip = await TripService.createTrip(req.user!.id, req.body);
      res.status(201).json(trip);
    } catch (err) {
      next(err);
    }
  }

  static async updateTrip(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const trip = await TripService.updateTrip(id, req.user!.id, req.body);
      res.json(trip);
    } catch (err) {
      next(err);
    }
  }

  static async deleteTrip(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await TripService.deleteTrip(id, req.user!.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async copyTrip(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const shareCode = Array.isArray(req.params.shareCode) ? req.params.shareCode[0] : req.params.shareCode;
      const newTrip = await TripService.copyTrip(shareCode, req.user!.id);
      res.status(201).json(newTrip);
    } catch (err) {
      next(err);
    }
  }

  static async addStop(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stop = await StopService.addStop(req.user!.id, req.body);
      res.status(201).json(stop);
    } catch (err) {
      next(err);
    }
  }

  static async updateStop(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stopId = Array.isArray(req.params.stopId) ? req.params.stopId[0] : req.params.stopId;
      const stop = await StopService.updateStop(stopId, req.user!.id, req.body);
      res.json(stop);
    } catch (err) {
      next(err);
    }
  }

  static async deleteStop(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stopId = Array.isArray(req.params.stopId) ? req.params.stopId[0] : req.params.stopId;
      const result = await StopService.deleteStop(stopId, req.user!.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async reorderStops(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tripId = Array.isArray(req.params.tripId) ? req.params.tripId[0] : req.params.tripId;
      const result = await StopService.reorderStops(tripId, req.user!.id, req.body.stops);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
