import { Schema, model, Types } from "mongoose";
const BoardSchema = new Schema({
  orgId: { type: Types.ObjectId, ref: "Org", index: true, required: true },
  title: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Board = model("Board", BoardSchema);
