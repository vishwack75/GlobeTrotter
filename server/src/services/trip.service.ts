import { Trip } from "../models/Trip";

export class TripService {
  static async getUserTrips(userId: string) {
    return await Trip.find({ userId })
      .populate("stops.cityId")
      .populate("stops.activities.activityId")
      .sort({ startDate: 1 })
      .lean();
  }

  static async getTripById(tripId: string, userId?: string) {
    const trip = await Trip.findById(tripId)
      .populate("userId", "name email avatarUrl")
      .populate("stops.cityId")
      .populate("stops.activities.activityId")
      .lean();

    if (!trip) {
      throw { status: 404, message: "Trip not found" };
    }

    if (!trip.isPublic && String(trip.userId._id || trip.userId) !== userId) {
      throw { status: 403, message: "Access denied to private trip" };
    }

    return trip;
  }

  static async getPublicTripByShareCode(shareCode: string) {
    const trip = await Trip.findOne({ shareCode })
      .populate("userId", "name avatarUrl")
      .populate("stops.cityId")
      .populate("stops.activities.activityId")
      .lean();

    if (!trip) {
      throw { status: 404, message: "Shared itinerary not found" };
    }

    return trip;
  }

  static async createTrip(userId: string, data: any) {
    const trip = new Trip({
      userId,
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      coverPhoto: data.coverPhoto,
      budgetLimit: data.budgetLimit || 0,
      isPublic: data.isPublic || false,
      budgetCategories: [
        { category: "Transport", allocated: 0, spent: 0 },
        { category: "Stay", allocated: 0, spent: 0 },
        { category: "Activities", allocated: 0, spent: 0 },
        { category: "Meals", allocated: 0, spent: 0 },
        { category: "Misc", allocated: 0, spent: 0 },
      ],
    });

    await trip.save();
    return trip;
  }

  static async updateTrip(tripId: string, userId: string, data: any) {
    const trip = await Trip.findOne({ _id: tripId, userId });
    if (!trip) {
      throw { status: 404, message: "Trip not found or unauthorized" };
    }

    if (data.name) trip.name = data.name;
    if (data.description !== undefined) trip.description = data.description;
    if (data.startDate) trip.startDate = new Date(data.startDate);
    if (data.endDate) trip.endDate = new Date(data.endDate);
    if (data.coverPhoto !== undefined) trip.coverPhoto = data.coverPhoto;
    if (data.budgetLimit !== undefined) trip.budgetLimit = data.budgetLimit;
    if (data.isPublic !== undefined) trip.isPublic = data.isPublic;

    await trip.save();
    return trip;
  }

  static async deleteTrip(tripId: string, userId: string) {
    const result = await Trip.findOneAndDelete({ _id: tripId, userId });
    if (!result) {
      throw { status: 404, message: "Trip not found or unauthorized" };
    }
    return { message: "Trip deleted successfully" };
  }

  static async copyTrip(shareCode: string, userId: string) {
    const originalTrip = await Trip.findOne({ shareCode }).lean();
    if (!originalTrip) {
      throw { status: 404, message: "Original trip not found" };
    }

    const newTrip = new Trip({
      userId,
      name: `Copy of ${originalTrip.name}`,
      description: originalTrip.description,
      startDate: originalTrip.startDate,
      endDate: originalTrip.endDate,
      coverPhoto: originalTrip.coverPhoto,
      budgetLimit: originalTrip.budgetLimit,
      isPublic: false,
      stops: originalTrip.stops,
      budgetCategories: originalTrip.budgetCategories,
    });

    await newTrip.save();
    return newTrip;
  }
}
