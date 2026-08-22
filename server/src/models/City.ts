import mongoose, { Schema, Document } from "mongoose";

export interface ICity extends Document {
  name: string;
  country: string;
  region: string;
  costIndex: number;
  popularity: number;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const CitySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
    costIndex: { type: Number, required: true, min: 1, max: 5 },
    popularity: { type: Number, required: true, min: 0, max: 5 },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

CitySchema.index({ name: "text", country: "text", region: "text" });

export const City = mongoose.model<ICity>("City", CitySchema);
