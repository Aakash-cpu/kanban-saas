import { Router } from "express";
import { z } from "zod";
import { List } from "../models/List";
import { requireAuth } from "../middleware/auth";
const router = Router();
const CreateList = z.object({ boardId: z.string(), title: z.string(), order: z.number().optional() });
router.post("/", requireAuth, async (req, res, next) => {
  try { const { boardId, title, order = Date.now() } = CreateList.parse(req.body); const list = await List.create({ boardId, title, order }); res.json(list); }
  catch (e) { next(e); }
});
export default router;
