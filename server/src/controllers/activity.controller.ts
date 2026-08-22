import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { ActivityService } from "../services/activity.service";

export class ActivityController {
  static async searchActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const { cityId, q, category, maxCost, maxDuration } = req.query;
      const activities = await ActivityService.searchActivities(
        cityId as string,
        q as string,
        category as string,
        maxCost ? Number(maxCost) : undefined,
        maxDuration ? Number(maxDuration) : undefined
      );
      res.json(activities);
    } catch (err) {
      next(err);
    }
  }

  static async addActivityToStop(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stopActivity = await ActivityService.addActivityToStop(req.user!.id, req.body);
      res.status(201).json(stopActivity);
    } catch (err) {
      next(err);
    }
  }

  static async removeActivityFromStop(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await ActivityService.removeActivityFromStop(id, req.user!.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async createCityActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const activity = await ActivityService.createCityActivity(req.body);
      res.status(201).json(activity);
    } catch (err) {
      next(err);
    }
  }
}
