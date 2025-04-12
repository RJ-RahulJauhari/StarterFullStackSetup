import { NeonDB } from "../db/pg_db.js"
import { usersTable } from "../schema/userSchema.js"
import { eq } from "drizzle-orm"
import { DB } from "../config.js"


export const doesUserExist = async (email) => {
    const existingUser = await DB.select({id:usersTable.id}).from(usersTable).where(eq(usersTable.email,email));
    console.log(existingUser);
    if(existingUser.length >= 1){
        return true;
    }
    return false;
}

export const getUserWithEmail = async (email) => {
    const user = await DB.select().from(usersTable).where(eq(usersTable.email,email));
    return user[0];
}