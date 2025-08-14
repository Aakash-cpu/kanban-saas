import { Schema, model, Types } from "mongoose";
const OrgSchema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: Types.ObjectId, ref: "User", required: true },
  members: [{ userId: { type: Types.ObjectId, ref: "User", required: true }, role: { type: String, enum: ["owner","admin","member"], default:"member" } }]
}, { timestamps: true });
export const Org = model("Org", OrgSchema);
