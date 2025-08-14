import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { AuthedRequest, JwtClaims } from "../types";
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  const token = header.split(" ")[1];
  try { req.user = jwt.verify(token, ENV.JWT_SECRET) as JwtClaims; next(); }
  catch { return res.status(401).json({ error: "Invalid token" }); }
}
