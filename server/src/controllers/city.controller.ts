import { Request, Response, NextFunction } from "express";
import { CityService } from "../services/city.service";

export class CityController {
  static async searchCities(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, country, region, minCost, maxCost } = req.query;
      const cities = await CityService.searchCities(
        q as string,
        country as string,
        region as string,
        minCost ? Number(minCost) : undefined,
        maxCost ? Number(maxCost) : undefined
      );
      res.json(cities);
    } catch (err) {
      next(err);
    }
  }

  static async getCityById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const city = await CityService.getCityById(id);
      res.json(city);
    } catch (err) {
      next(err);
    }
  }

  static async createCity(req: Request, res: Response, next: NextFunction) {
    try {
      const city = await CityService.createCity(req.body);
      res.status(201).json(city);
    } catch (err) {
      next(err);
    }
  }

  static async updateCity(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const city = await CityService.updateCity(id, req.body);
      res.json(city);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await CityService.deleteCity(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
