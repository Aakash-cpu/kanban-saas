import { Router } from "express";
import { z } from "zod";
import { Card } from "../models/Card";
import { requireAuth } from "../middleware/auth";
const router = Router();
const CreateCard = z.object({ listId: z.string(), title: z.string(), order: z.number().optional() });
router.post("/", requireAuth, async (req, res, next) => {
  try { const { listId, title, order = Date.now() } = CreateCard.parse(req.body); const card = await Card.create({ listId, title, order }); res.json(card); }
  catch (e) { next(e); }
});
const MoveSchema = z.object({ cardId: z.string(), toListId: z.string(), toOrder: z.number() });
router.patch("/move", requireAuth, async (req, res, next) => {
  try { const { cardId, toListId, toOrder } = MoveSchema.parse(req.body); const card = await Card.findById(cardId); if (!card) return res.status(404).json({ error: "Not found" }); card.listId = toListId as any; card.order = toOrder; await card.save(); res.json(card); }
  catch (e) { next(e); }
});
export default router;
