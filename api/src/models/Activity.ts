import { Schema, model, Types } from "mongoose";
const ActivitySchema = new Schema({
  entity: { type: String, required: true },
  action: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  meta: { type: Object, default: {} }
}, { timestamps: true });
export const Activity = model("Activity", ActivitySchema);
