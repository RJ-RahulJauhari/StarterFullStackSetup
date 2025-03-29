import dotenv from "dotenv";
dotenv.config();  

import {neon} from "@neondatabase/serverless";

export const sql = neon(process.env.NEON_DB_URL);

export const test_neon_connection = async () => {
    console.log((await sql`select version()`)[0].version)
}
