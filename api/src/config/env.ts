import "dotenv/config";
export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/kanban",
  JWT_SECRET: process.env.JWT_SECRET || "change_me",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173"
};
