import mongoose, { Schema, Document } from "mongoose";

export interface IStopActivity {
  _id?: mongoose.Types.ObjectId;
  activityId?: mongoose.Types.ObjectId;
  customTitle?: string;
  cost: number;
  dayNumber: number;
  startTime?: string;
  notes?: string;
}

export interface ITripStop {
  _id?: mongoose.Types.ObjectId;
  cityId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  stopOrder: number;
  activities: IStopActivity[];
}

export interface IBudgetCategory {
  _id?: mongoose.Types.ObjectId;
  category: string;
  allocated: number;
  spent: number;
}

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  coverPhoto?: string;
  isPublic: boolean;
  shareCode: string;
  budgetLimit: number;
  stops: mongoose.Types.DocumentArray<ITripStop & Document>;
  budgetCategories: mongoose.Types.DocumentArray<IBudgetCategory & Document>;
  createdAt: Date;
  updatedAt: Date;
}

const StopActivitySchema = new Schema({
  activityId: { type: Schema.Types.ObjectId, ref: "Activity", default: null },
  customTitle: { type: String, default: null },
  cost: { type: Number, default: 0 },
  dayNumber: { type: Number, default: 1 },
  startTime: { type: String, default: null },
  notes: { type: String, default: null },
});

const TripStopSchema = new Schema({
  cityId: { type: Schema.Types.ObjectId, ref: "City", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  stopOrder: { type: Number, default: 0 },
  activities: [StopActivitySchema],
});

const BudgetCategorySchema = new Schema({
  category: { type: String, required: true },
  allocated: { type: Number, default: 0 },
  spent: { type: Number, default: 0 },
});

const TripSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    coverPhoto: { type: String, default: null },
    isPublic: { type: Boolean, default: false },
    shareCode: { type: String, unique: true, default: () => Math.random().toString(36).substring(2, 10) },
    budgetLimit: { type: Number, default: 0 },
    stops: [TripStopSchema],
    budgetCategories: [BudgetCategorySchema],
  },
  { timestamps: true }
);

export const Trip = mongoose.model<ITrip>("Trip", TripSchema);
