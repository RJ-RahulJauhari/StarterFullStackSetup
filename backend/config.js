import dotenv from "dotenv";
dotenv.config();

export const AccessTokenSecret = process.env.JWT_SECRET;
export const RefreshTokenSecret = process.env.JWT_REFRESH_SECRET