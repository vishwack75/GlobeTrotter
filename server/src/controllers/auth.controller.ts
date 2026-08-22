import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { sendAuthCookies, clearAuthCookies } from "../utils/token";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.signup(req.body);
      sendAuthCookies(res, result.accessToken, result.refreshToken);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      sendAuthCookies(res, result.accessToken, result.refreshToken);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
      const result = await AuthService.refreshTokens(incomingRefreshToken);
      sendAuthCookies(res, result.accessToken, result.refreshToken);
      res.json(result);
    } catch (err) {
      clearAuthCookies(res);
      next(err);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const result = await AuthService.logout(userId);
      clearAuthCookies(res);
      res.json(result);
    } catch (err) {
      clearAuthCookies(res);
      next(err);
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.forgotPassword(req.body.email);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
