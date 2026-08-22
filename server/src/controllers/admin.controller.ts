import { Request, Response, NextFunction } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
  static async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const analytics = await AdminService.getAnalytics();
      res.json(analytics);
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const data = await AdminService.getUsers(page, limit);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
      const { role } = req.body;
      const updated = await AdminService.updateUserRole(userId, role);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
      const result = await AdminService.deleteUser(userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
