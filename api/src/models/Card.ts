import { Schema, model, Types } from "mongoose";
const CardSchema = new Schema({
  listId: { type: Types.ObjectId, ref: "List", index: true, required: true },
  title: { type: String, required: true },
  desc: String,
  assignees: [{ type: Types.ObjectId, ref: "User" }],
  labels: [String],
  due: Date,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Card = model("Card", CardSchema);
