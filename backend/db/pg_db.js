import dotenv from "dotenv";
dotenv.config();  
import { drizzle } from 'drizzle-orm/neon-http';
import {neon} from "@neondatabase/serverless";
import { usersTable } from "../schema/userSchema.js";


export const sql = neon(process.env.NEON_DB_URL);
export const pg_db = drizzle({client:sql});

export const test_neon_connection = async () => {
    console.log((await sql`select version()`)[0].version)
}

export const test_drizzle_integration = async () => {
    console.log(await pg_db.execute(""));
}

export async function createUser(data) {
    await pg_db.insert(usersTable).values(data);
  }