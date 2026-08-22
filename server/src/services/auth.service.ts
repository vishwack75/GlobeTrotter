import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export class AuthService {
  static async signup(data: { name: string; email: string; password: string; role?: "USER" | "ADMIN" }) {
    const existing = await User.findOne({ email: data.email.toLowerCase() });
    if (existing) {
      throw { status: 400, message: "User with this email already exists" };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = new User({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role || "USER",
    });

    const accessToken = generateAccessToken({ id: user._id.toString(), email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email, role: user.role });

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
        language: user.language,
      },
    };
  }

  static async login(data: { email: string; password: string }) {
    const user = await User.findOne({ email: data.email.toLowerCase() });
    if (!user) {
      throw { status: 401, message: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw { status: 401, message: "Invalid email or password" };
    }

    const accessToken = generateAccessToken({ id: user._id.toString(), email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email, role: user.role });

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
        language: user.language,
      },
    };
  }

  static async refreshTokens(incomingRefreshToken?: string) {
    if (!incomingRefreshToken) {
      throw { status: 401, message: "Refresh token missing" };
    }

    const secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret_1d";

    let payload: any;
    try {
      payload = jwt.verify(incomingRefreshToken, secret);
    } catch (err) {
      throw { status: 403, message: "Invalid or expired refresh token" };
    }

    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw { status: 403, message: "Refresh token revoked or invalid" };
    }

    const newAccessToken = generateAccessToken({ id: user._id.toString(), email: user.email, role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email, role: user.role });

    user.refreshToken = newRefreshToken;
    await user.save();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    };
  }

  static async logout(userId?: string) {
    if (userId) {
      await User.findByIdAndUpdate(userId, { refreshToken: null });
    }
    return { message: "Successfully logged out" };
  }

  static async forgotPassword(email: string) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return { message: "If an account exists with this email, reset instructions have been dispatched." };
    }
    return { message: "Password reset instructions sent to your email address." };
  }
}
