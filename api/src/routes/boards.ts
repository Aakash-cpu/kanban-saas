import { Router } from "express";
import { z } from "zod";
import { Board } from "../models/Board";
import { List } from "../models/List";
import { Card } from "../models/Card";
import { requireAuth } from "../middleware/auth";
const router = Router();
router.get("/", requireAuth, async (_req, res, next) => {
  try { const boards = await Board.find().sort({ createdAt: -1 }); res.json(boards); }
  catch (e) { next(e); }
});
const CreateBoard = z.object({ title: z.string().min(1) });
router.post("/", requireAuth, async (req, res, next) => {
  try { const { title } = CreateBoard.parse(req.body); const board = await Board.create({ title, orgId: "000000000000000000000000" }); res.json(board); }
  catch (e) { next(e); }
});
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ error: "Not found" });
    const lists = await List.find({ boardId: board._id }).sort({ order: 1 });
    const cards = await Card.find({ listId: { $in: lists.map(l => l._id) } }).sort({ order: 1 });
    res.json({ board, lists, cards });
  } catch (e) { next(e); }
});
export default router;
