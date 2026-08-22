export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  coverPhoto?: string;
  isPublic: boolean;
  shareCode: string;
  budgetLimit: number;
  stops?: any[];
  budgetCategories?: any[];
}
