import { User } from "../models/User";
import { Trip } from "../models/Trip";
import { City } from "../models/City";
import { Activity } from "../models/Activity";

export class AdminService {
  static async getAnalytics() {
    const totalUsers = await User.countDocuments({ role: "USER" });
    const totalTrips = await Trip.countDocuments();
    const totalCities = await City.countDocuments();
    const totalActivities = await Activity.countDocuments();

    const topCities = await City.find().sort({ popularity: -1 }).limit(5).lean();

    const recentTrips = await Trip.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return {
      overview: {
        totalUsers,
        totalTrips,
        totalCities,
        totalActivities,
      },
      topCities,
      recentTrips,
    };
  }

  static async getUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find()
        .select("-passwordHash -refreshToken")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      User.countDocuments(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async updateUserRole(userId: string, role: "USER" | "ADMIN") {
    const updated = await User.findByIdAndUpdate(userId, { role }, { new: true })
      .select("-passwordHash -refreshToken")
      .lean();

    if (!updated) {
      throw { status: 404, message: "User not found" };
    }

    return updated;
  }

  static async deleteUser(userId: string) {
    await User.findByIdAndDelete(userId);
    await Trip.deleteMany({ userId });
    return { message: "User account deleted by admin" };
  }
}
