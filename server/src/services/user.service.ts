import { User } from "../models/User";
import { SavedDestination } from "../models/SavedDestination";

export class UserService {
  static async getProfile(userId: string) {
    const user = await User.findById(userId).select("-passwordHash -refreshToken").lean();
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    const savedDestinations = await SavedDestination.find({ userId }).populate("cityId").lean();

    return {
      ...user,
      id: user._id.toString(),
      savedDestinations,
    };
  }

  static async updateProfile(userId: string, data: { name?: string; avatarUrl?: string | null; language?: string }) {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true })
      .select("-passwordHash -refreshToken")
      .lean();

    if (!updatedUser) {
      throw { status: 404, message: "User not found" };
    }

    return {
      ...updatedUser,
      id: updatedUser._id.toString(),
    };
  }

  static async deleteAccount(userId: string) {
    await User.findByIdAndDelete(userId);
    await SavedDestination.deleteMany({ userId });
    return { message: "Account successfully deleted" };
  }

  static async toggleSaveDestination(userId: string, cityId: string) {
    const existing = await SavedDestination.findOne({ userId, cityId });

    if (existing) {
      await SavedDestination.findByIdAndDelete(existing._id);
      return { saved: false, message: "Destination removed from saved list" };
    } else {
      await SavedDestination.create({ userId, cityId });
      return { saved: true, message: "Destination saved" };
    }
  }
}
