import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { UserService } from "../services/user.service";

export class UserController {
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getProfile(req.user!.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const updatedUser = await UserService.updateProfile(req.user!.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAccount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await UserService.deleteAccount(req.user!.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async toggleSaveDestination(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { cityId } = req.body;
      const result = await UserService.toggleSaveDestination(req.user!.id, cityId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
