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

    const topCities = await City.find().sort({ popularity: -1 }).limit(6).lean();

    const recentTrips = await Trip.find()
      .populate("userId", "name email avatarUrl")
      .sort({ createdAt: -1 })
      .limit(6)
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

  static async getUsers(page = 1, limit = 50) {
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

    // Attach trip counts for each user
    const usersWithTripCount = await Promise.all(
      users.map(async (u) => {
        const tripCount = await Trip.countDocuments({ userId: u._id });
        return { ...u, tripCount };
      })
    );

    return {
      users: usersWithTripCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getUserTrips(userId: string) {
    const trips = await Trip.find({ userId })
      .populate("stops.cityId")
      .sort({ createdAt: -1 })
      .lean();
    return trips;
  }

  static async getPopularCities() {
    const cities = await City.find().sort({ popularity: -1 }).lean();
    return cities;
  }

  static async getPopularActivities() {
    const activities = await Activity.find()
      .populate("cityId", "name country")
      .sort({ rating: -1 })
      .lean();
    return activities;
  }

  static async getUserTrends() {
    const totalUsers = await User.countDocuments();
    const totalTrips = await Trip.countDocuments();

    const trips = await Trip.find().select("budgetLimit startDate").lean();
    let totalBudgetSum = 0;
    trips.forEach((t) => {
      totalBudgetSum += t.budgetLimit || 0;
    });
    const avgBudget = trips.length ? Math.round(totalBudgetSum / trips.length) : 0;

    const recentSignups = await User.find()
      .select("name email createdAt role avatarUrl city country")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return {
      totalUsers,
      totalTrips,
      avgBudget,
      recentSignups,
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
