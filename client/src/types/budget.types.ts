export interface BudgetCategory {
  id?: string;
  category: string;
  allocated: number;
  spent: number;
}

export interface BudgetSummary {
  tripId: string;
  tripName: string;
  budgetLimit: number;
  totalSpent: number;
  averageCostPerDay: number;
  tripDays: number;
  isOverBudget: boolean;
  overBudgetAmount: number;
  categories: BudgetCategory[];
  dailyBreakdown: Record<string, number>;
}
