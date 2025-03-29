import dotenv from 'dotenv';
import { defineConfig } from "drizzle-kit";
dotenv.config();

export default defineConfig({
  schema: "./schema",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DB_URL,
  },
});
