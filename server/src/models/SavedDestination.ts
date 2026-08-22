import mongoose, { Schema, Document } from "mongoose";

export interface ISavedDestination extends Document {
  userId: mongoose.Types.ObjectId;
  cityId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const SavedDestinationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cityId: { type: Schema.Types.ObjectId, ref: "City", required: true },
  },
  { timestamps: true }
);

SavedDestinationSchema.index({ userId: 1, cityId: 1 }, { unique: true });

export const SavedDestination = mongoose.model<ISavedDestination>("SavedDestination", SavedDestinationSchema);
