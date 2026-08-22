import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  cityId: mongoose.Types.ObjectId;
  title: string;
  category: string;
  cost: number;
  duration: number;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema(
  {
    cityId: { type: Schema.Types.ObjectId, ref: "City", required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    cost: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);
