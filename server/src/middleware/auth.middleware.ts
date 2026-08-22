import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: "USER" | "ADMIN";
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Extract token from Bearer header OR from HTTP-only cookie
  let token = req.cookies?.accessToken;

  if (!token) {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    res.status(401).json({ message: "Authentication required. No access token provided." });
    return;
  }

  const secret = process.env.ACCESS_TOKEN_SECRET || "access_secret_15m";

  try {
    const decoded = jwt.verify(token, secret) as {
      id: string;
      email: string;
      role: "USER" | "ADMIN";
    };
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Access token expired", code: "TOKEN_EXPIRED" });
      return;
    }
    res.status(403).json({ message: "Invalid access token" });
    return;
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }
  next();
};
