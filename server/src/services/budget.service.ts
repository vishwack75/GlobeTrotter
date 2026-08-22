import { Trip } from "../models/Trip";

export class BudgetService {
  static async getTripBudgetSummary(tripId: string, userId?: string) {
    const trip = await Trip.findById(tripId).lean();
    if (!trip) {
      throw { status: 404, message: "Trip not found" };
    }

    if (!trip.isPublic && String(trip.userId) !== userId) {
      throw { status: 403, message: "Access denied" };
    }

    let activitiesTotal = 0;
    const dailyBreakdown: Record<string, number> = {};

    trip.stops.forEach((stop: any) => {
      const stopStartStr = stop.startDate ? new Date(stop.startDate).toISOString().split("T")[0] : "Date TBD";
      stop.activities.forEach((act: any) => {
        activitiesTotal += act.cost || 0;
        const dayKey = `Day ${act.dayNumber} (${stopStartStr})`;
        dailyBreakdown[dayKey] = (dailyBreakdown[dayKey] || 0) + (act.cost || 0);
      });
    });

    let totalCategorySpent = 0;
    const categoryBreakdown = trip.budgetCategories.map((cat: any) => {
      let spent = cat.spent || 0;
      if (cat.category === "Activities") {
        spent = Math.max(spent, activitiesTotal);
      }
      totalCategorySpent += spent;
      return {
        id: cat._id?.toString(),
        category: cat.category,
        allocated: cat.allocated,
        spent,
      };
    });

    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const tripDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)));
    const averageCostPerDay = Number((totalCategorySpent / tripDays).toFixed(2));
    const isOverBudget = trip.budgetLimit > 0 && totalCategorySpent > trip.budgetLimit;

    return {
      tripId: trip._id.toString(),
      tripName: trip.name,
      budgetLimit: trip.budgetLimit,
      totalSpent: totalCategorySpent,
      averageCostPerDay,
      tripDays,
      isOverBudget,
      overBudgetAmount: isOverBudget ? totalCategorySpent - trip.budgetLimit : 0,
      categories: categoryBreakdown,
      dailyBreakdown,
    };
  }

  static async updateBudgetCategories(tripId: string, userId: string, categories: { id?: string; category: string; allocated: number; spent?: number }[]) {
    const trip = await Trip.findOne({ _id: tripId, userId });
    if (!trip) {
      throw { status: 404, message: "Trip not found or unauthorized" };
    }

    for (const inputCat of categories) {
      if (inputCat.id && (trip.budgetCategories as any).id(inputCat.id)) {
        const cat = (trip.budgetCategories as any).id(inputCat.id);
        if (cat) {
          cat.allocated = inputCat.allocated;
          if (inputCat.spent !== undefined) cat.spent = inputCat.spent;
        }
      } else {
        trip.budgetCategories.push({
          category: inputCat.category,
          allocated: inputCat.allocated,
          spent: inputCat.spent || 0,
        } as any);
      }
    }

    await trip.save();
    return await this.getTripBudgetSummary(tripId, userId);
  }
}
