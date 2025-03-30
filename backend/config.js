import dotenv from "dotenv";
dotenv.config();

export const AccessTokenSecret = process.env.JWT_SECRET;