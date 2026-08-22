import { Activity } from "../models/Activity";
import { Trip } from "../models/Trip";

export class ActivityService {
  static async searchActivities(cityId?: string, query?: string, category?: string, maxCost?: number, maxDuration?: number) {
    const filter: any = {};

    if (cityId) filter.cityId = cityId;
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }
    if (category) filter.category = category;
    if (maxCost) filter.cost = { $lte: Number(maxCost) };
    if (maxDuration) filter.duration = { $lte: Number(maxDuration) };

    return await Activity.find(filter).populate("cityId", "name country").sort({ cost: 1 }).lean();
  }

  static async addActivityToStop(userId: string, data: { stopId: string; activityId?: string; customTitle?: string; cost?: number; dayNumber?: number; startTime?: string; notes?: string }) {
    const trip = await Trip.findOne({ "stops._id": data.stopId, userId });
    if (!trip) {
      throw { status: 404, message: "Trip stop not found or unauthorized" };
    }

    const stop = (trip.stops as any).id(data.stopId);
    if (!stop) {
      throw { status: 404, message: "Stop not found" };
    }

    let cost = data.cost || 0;
    if (data.activityId && (!data.cost || data.cost === 0)) {
      const act = await Activity.findById(data.activityId);
      if (act) cost = act.cost;
    }

    const newActivity = {
      activityId: data.activityId || null,
      customTitle: data.customTitle || null,
      cost,
      dayNumber: data.dayNumber || 1,
      startTime: data.startTime || null,
      notes: data.notes || null,
    };

    stop.activities.push(newActivity as any);
    await trip.save();

    return stop.activities[stop.activities.length - 1];
  }

  static async removeActivityFromStop(stopActivityId: string, userId: string) {
    const trip = await Trip.findOne({ "stops.activities._id": stopActivityId, userId });
    if (!trip) {
      throw { status: 404, message: "Activity item not found or unauthorized" };
    }

    for (const stop of trip.stops) {
      if ((stop.activities as any).id(stopActivityId)) {
        (stop.activities as any).pull(stopActivityId);
        break;
      }
    }

    await trip.save();
    return { message: "Activity removed from stop" };
  }

  static async createCityActivity(data: any) {
    const activity = new Activity(data);
    await activity.save();
    return activity;
  }
}
