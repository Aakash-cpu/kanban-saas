import { Schema, model } from "mongoose";
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, index: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });
export const User = model("User", UserSchema);
