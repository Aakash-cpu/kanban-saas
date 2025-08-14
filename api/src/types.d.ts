import { Request } from "express";
export interface JwtClaims { sub: string; email: string; }
export interface AuthedRequest extends Request { user?: JwtClaims; }
