import { City } from "../models/City";
import { Activity } from "../models/Activity";

export class CityService {
  static async searchCities(query?: string, country?: string, region?: string, minCost?: number, maxCost?: number) {
    const filter: any = {};

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { region: { $regex: query, $options: "i" } },
      ];
    }

    if (country) filter.country = new RegExp(country, "i");
    if (region) filter.region = new RegExp(region, "i");
    if (minCost || maxCost) {
      filter.costIndex = {};
      if (minCost) filter.costIndex.$gte = Number(minCost);
      if (maxCost) filter.costIndex.$lte = Number(maxCost);
    }

    return await City.find(filter).sort({ popularity: -1 }).lean();
  }

  static async getCityById(cityId: string) {
    const city = await City.findById(cityId).lean();
    if (!city) {
      throw { status: 404, message: "City not found" };
    }

    const activities = await Activity.find({ cityId }).lean();
    return {
      ...city,
      activities,
    };
  }

  static async createCity(data: any) {
    const city = new City(data);
    await city.save();
    return city;
  }

  static async updateCity(cityId: string, data: any) {
    const city = await City.findByIdAndUpdate(cityId, data, { new: true });
    if (!city) {
      throw { status: 404, message: "City not found" };
    }
    return city;
  }

  static async deleteCity(cityId: string) {
    await City.findByIdAndDelete(cityId);
    await Activity.deleteMany({ cityId });
    return { message: "City deleted successfully" };
  }
}
