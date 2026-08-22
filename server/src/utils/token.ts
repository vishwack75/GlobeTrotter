import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateAccessToken = (user: { id: string; email: string; role: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET || "access_secret_15m",
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (user: { id: string; email: string; role: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.REFRESH_TOKEN_SECRET || "refresh_secret_1d",
    { expiresIn: "1d" }
  );
};

export const sendAuthCookies = (res: Response, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("refreshToken");
};
