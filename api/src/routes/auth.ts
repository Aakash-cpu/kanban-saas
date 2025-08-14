import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { hashPassword, verifyPassword } from "../utils/passwords";
import { ENV } from "../config/env";
const router = Router();
const RegisterSchema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = RegisterSchema.parse(req.body);
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already in use" });
    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (e) { next(e); }
});
const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ sub: String(user._id), email: user.email }, ENV.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) { next(e); }
});
export default router;
