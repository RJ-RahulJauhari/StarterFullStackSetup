import dotenv from "dotenv";
dotenv.config();  
import { drizzle } from 'drizzle-orm/neon-http';
import {neon} from "@neondatabase/serverless";
import { usersTable } from "../schema/userSchema.js";


export const NeonPostGressSQLClient = neon(process.env.NEON_DB_URL);
export const NeonDB = drizzle({client:NeonPostGressSQLClient});

export const test_neon_connection = async () => {
    console.log((await NeonPostGressSQLClient`select version()`)[0].version)
}

export const test_drizzle_integration = async () => {
    console.log(await NeonDB.execute(""));
}

export async function createUser(data) {
    await NeonDB.insert(usersTable).values(data);
  }