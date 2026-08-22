import { Trip } from "../models/Trip";
import { City } from "../models/City";

export class StopService {
  static async addStop(userId: string, data: { tripId: string; cityId: string; startDate: string; endDate: string; stopOrder?: number }) {
    const trip = await Trip.findOne({ _id: data.tripId, userId });
    if (!trip) {
      throw { status: 404, message: "Trip not found or unauthorized" };
    }

    const city = await City.findById(data.cityId);
    if (!city) {
      throw { status: 404, message: "City not found" };
    }

    const newStop = {
      cityId: data.cityId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      stopOrder: data.stopOrder ?? trip.stops.length,
      activities: [],
    };

    trip.stops.push(newStop as any);
    await trip.save();

    return trip.stops[trip.stops.length - 1];
  }

  static async updateStop(stopId: string, userId: string, data: any) {
    const trip = await Trip.findOne({ "stops._id": stopId, userId });
    if (!trip) {
      throw { status: 404, message: "Stop not found or unauthorized" };
    }

    const stop = (trip.stops as any).id(stopId);
    if (!stop) {
      throw { status: 404, message: "Stop not found" };
    }

    if (data.startDate) stop.startDate = new Date(data.startDate);
    if (data.endDate) stop.endDate = new Date(data.endDate);
    if (data.stopOrder !== undefined) stop.stopOrder = data.stopOrder;

    await trip.save();
    return stop;
  }

  static async deleteStop(stopId: string, userId: string) {
    const trip = await Trip.findOne({ "stops._id": stopId, userId });
    if (!trip) {
      throw { status: 404, message: "Stop not found or unauthorized" };
    }

    (trip.stops as any).pull(stopId);
    await trip.save();
    return { message: "Stop deleted successfully" };
  }

  static async reorderStops(tripId: string, userId: string, stopOrders: { id: string; stopOrder: number }[]) {
    const trip = await Trip.findOne({ _id: tripId, userId });
    if (!trip) {
      throw { status: 404, message: "Trip not found or unauthorized" };
    }

    const orderMap = new Map(stopOrders.map((s) => [s.id, s.stopOrder]));

    trip.stops.forEach((stop: any) => {
      if (orderMap.has(stop._id.toString())) {
        stop.stopOrder = orderMap.get(stop._id.toString())!;
      }
    });

    trip.stops.sort((a: any, b: any) => a.stopOrder - b.stopOrder);
    await trip.save();

    return { message: "Stops reordered successfully" };
  }
}
