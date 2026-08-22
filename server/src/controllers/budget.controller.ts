import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { BudgetService } from "../services/budget.service";

export class BudgetController {
  static async getTripBudgetSummary(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tripId = Array.isArray(req.params.tripId) ? req.params.tripId[0] : req.params.tripId;
      const summary = await BudgetService.getTripBudgetSummary(tripId, req.user?.id);
      res.json(summary);
    } catch (err) {
      next(err);
    }
  }

  static async updateBudgetCategories(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tripId = Array.isArray(req.params.tripId) ? req.params.tripId[0] : req.params.tripId;
      const summary = await BudgetService.updateBudgetCategories(tripId, req.user!.id, req.body.categories);
      res.json(summary);
    } catch (err) {
      next(err);
    }
  }
}
