import "dotenv/config";
import { connectDB } from "../src/db";
import { User } from "../src/models/User";
import { Board } from "../src/models/Board";
import { List } from "../src/models/List";
import { Card } from "../src/models/Card";
import { hashPassword } from "../src/utils/passwords";
async function run() {
  await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/kanban");
  await User.deleteMany({}); await Board.deleteMany({}); await List.deleteMany({}); await Card.deleteMany({});
  const passwordHash = await hashPassword("password123");
  const user = await User.create({ name: "Demo User", email: "demo@example.com", passwordHash });
  const board = await Board.create({ title: "Day 1 Kanban", orgId: "000000000000000000000000", order: 0 });
  const todo = await List.create({ boardId: board._id, title: "Todo", order: 1 });
  const doing = await List.create({ boardId: board._id, title: "Doing", order: 2 });
  const done = await List.create({ boardId: board._id, title: "Done", order: 3 });
  await Card.create({ listId: todo._id, title: "Set up repo", order: 1 });
  await Card.create({ listId: todo._id, title: "Create models", order: 2 });
  await Card.create({ listId: doing._id, title: "Build auth", order: 1 });
  await Card.create({ listId: done._id, title: "Write README", order: 1 });
  console.log("✅ Seed complete. Login with demo@example.com / password123"); process.exit(0);
}
run();
