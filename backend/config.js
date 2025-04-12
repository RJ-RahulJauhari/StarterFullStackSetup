import dotenv from "dotenv";
import { NeonDB } from "./db/pg_db.js";
dotenv.config();

export const DB = NeonDB;

export const AccessTokenSecret = process.env.JWT_SECRET;
export const RefreshTokenSecret = process.env.JWT_REFRESH_SECRET