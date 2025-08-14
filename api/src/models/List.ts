import { Schema, model, Types } from "mongoose";
const ListSchema = new Schema({
  boardId: { type: Types.ObjectId, ref: "Board", index: true, required: true },
  title: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const List = model("List", ListSchema);
